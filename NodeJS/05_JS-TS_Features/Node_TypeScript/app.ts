// * Using TypeScript with Express
import express, { Request, Response } from 'express';
interface User {
    id: number;
    name: string;
}

const app = express();
app.use(express.json());

//In-memory database
let users: User[] = [];

//Get all users
app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

//Add new user
app.post('/users', (req: Request, res: Response) => {
    const user: User = req.body;
    users.push(user);
    res.status(201).json(user);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
