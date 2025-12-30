const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rooms
const rooms = new Set(['general', 'random']);
const usersInRooms = new Map();
const typingUsers = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.username = 'Anonymous';

    // Chat message
    socket.on('chat message', (msg) => {
        const room = [...socket.rooms].find(r => r !== socket.id) || 'general';
        io.to(room).emit('chat message', {
            username: socket.username,
            message: msg,
            timeStamp: new Date().toISOString(),
            room
        });
    });

    // Set username
    socket.on('set username', (username) => {
        const oldUsername = socket.username;
        socket.username = username || 'Anonymous';
        io.emit('user joined', { oldUsername, newUsername: socket.username });
    });

    // Join room (SINGLE handler)
    socket.on('join room', (room) => {
        // Leave previous rooms
        [...socket.rooms].forEach(r => {
            if (r !== socket.id) {
                socket.leave(r);
                usersInRooms.get(r)?.delete(socket.id);
                typingUsers.get(r)?.delete(socket.username);
                updateUserList(r);
            }
        });

        socket.join(room);

        if (!usersInRooms.has(room)) {
            usersInRooms.set(room, new Map());
            typingUsers.set(room, new Set());
        }

        usersInRooms.get(room).set(socket.id, {
            id: socket.id,
            username: socket.username
        });

        socket.emit('joined room', room);

        socket.to(room).emit('room message', {
            username: 'System',
            message: `${socket.username} joined the room`,
            timeStamp: new Date().toISOString()
        });

        updateUserList(room);
    });

    // Create room
    socket.on('create room', (roomName) => {
        if (!rooms.has(roomName)) {
            rooms.add(roomName);
            io.emit('room created', roomName);
        }
    });

    // Typing indicator
    socket.on('typing', (isTyping) => {
        const room = [...socket.rooms].find(r => r !== socket.id);
        if (!room || !typingUsers.has(room)) return;

        if (isTyping) {
            typingUsers.get(room).add(socket.username);
        } else {
            typingUsers.get(room).delete(socket.username);
        }

        io.to(room).emit('typing users', [...typingUsers.get(room)]);
    });

    // Disconnect (SINGLE handler)
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        usersInRooms.forEach((users, room) => {
            if (users.has(socket.id)) {
                users.delete(socket.id);
                typingUsers.get(room)?.delete(socket.username);
                updateUserList(room);
                socket.to(room).emit('user left', { username: socket.username });
            }
        });
    });

    function updateUserList(room) {
        const users = [...(usersInRooms.get(room)?.values() || [])];
        io.to(room).emit('user list', {
            room,
            users: users.map(u => ({
                username: u.username,
                isTyping: typingUsers.get(room)?.has(u.username) || false
            }))
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
