// Importing the File System Module
const fs = require('fs')

//Promeise-based API
//Node js provides promise-based versions of the file system API in the fs/promises namespace
const { readFile, writeFile } = require('fs').promises

//* Reading Files
//with callbacks
{
    fs.readFile('myfile.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err)
            return
        }
        console.log('File content_ex1:', data)
    })

    //For binary data (like image), omit the encoding
    fs.readFile('image.webp', (err, data) => {
        if (err) throw err
        console.log('Image size:', data.length, 'bytes')
    })
}


//* Reading Files with Promises (Modern Approach)
{
    const fs = require('fs').promises;
    async function readFileExample() {
        try {
            const data = await fs.readFile('myfile.txt','utf-8');
            console.log('File Content_ex2:', data);
        } catch (error) {
            console.error('Error Reading file:', error);
        }
    }

    readFileExample();
}

{
    //* Reading a file synchronously
    const fs = require('fs');
    try {
        //Read file synchronously
        const data = fs.readFileSync('myfile.txt', 'utf8');
        console.log('File Content_ex3:' , data);
    } catch (error) {
        console.error('Error reading file:', err);
    }
}

//* Creating and Writing Files
//Nodejs provides several methods for creating and writing to files

{
    //* ex. Writing to a file
    const fs = require('fs').promises;

    async function writeFileExample() {
        try {
            //Write text to a file 
            await fs.writeFile('myfile.txt', "Hello, World!", 'utf8');

            //Write JSON data
            const data = {name: 'John', age: 30, city: 'New York'};
            await fs.writeFile('data.json', JSON.stringify(data,null,2), 'utf8');

            console.log('Files created successfully');
        } catch (error) {
            console.error('Error writing files:', err);
        }
    }

    writeFileExample();
}


{
    //* ex. Using fs.appendFile()
    //appends content to a file , creating th file if it doesn't exist:
    const fs = require('fs').promises;
    
    async function apppendToFile() {
        try {
            //Append a timestamped log entry
            const logEntry = `${new Date().toISOString()} : Application started\n`;
            await fs.appendFile('app.log', logEntry, 'utf8');
            console.log('Log entry added');
        } catch (error) {
            console.error('Error appending to file:', error);
        }
    }

    apppendToFile();
}

{
    //* Using File Handles
    const fs = require('fs').promises;

    async function writeWithFileHandle() {
        let fileHandle;

        try {
            //open a file for writitng(creates if doesn't exist)
            fileHandle = await fs.open('output.txt', 'w');

            await fileHandle.write('First line\n');
            await fileHandle.write('Second line\n');
            await fileHandle.write('Third line\n');

            console.log('Content written successfully');
        } catch (error) {
            console.error('Error writing to file:', err);
        } finally {
            //always close the file handle
            if(fileHandle){
                await fileHandle.close()
            }
        }
    }

    writeWithFileHandle();
}
{
    //* Using Streams for Large Files
    const fs = require('fs');
    const { pipeline } = require('stream/promises');
    const { Readable } = require('stream');

    async function writeLargeFile() {
        //Create a readable stream (could be from HTTP request, etc.)
        const data = Array(1000).fill().map((_,i) => `Line ${i + 1}:${'x'.repeat(100)}\n`);
        const readable = Readable.from(data);

        //create a writeable stream to a file
        const writeable = fs.createWriteStream('large-file.txt');

        try {
            //pipe the data from readable to writeable
            await pipeline(readable, writeable);
            console.log('Large file Written successfully');
        } catch (error) {
            console.error('Error writing file: ', err);
        }
    }

    writeLargeFile();
}
{
    //* Deleting a Single File
    const fs = require('fs').promises;

    async function deleteFile() {
        const filePath = 'app.log';

        try {
            await fs.access(filePath);

            await fs.unlink(filePath);
            console.log('File Deleted successfully');
        } catch (error) {
            if(error.code === 'ENOENT') {
                console.log('File does not exist');
            } else {
                console.error('Error deleting file:',error);
            }
        }
    }

    deleteFile();
}

{
    //* Basic File Renaming
    //To rename a file in the same directory

    const fs = require('fs').promises;

    async function renameFile() {
        const oldPath = 'output.txt';
        const newPath = 'new-name.txt';

        try {
            await fs.access(oldPath);

            try{
                await fs.access(newPath);
                console.log('Destination File already exists');
                return;
            } catch(err) {
                //destination doesn't exist, safe to proceed
            }

            //perform the rename
            await fs.rename(oldPath, newPath)
            console.log('File renamed successfully');
        } catch (error) {
            if(err.code === 'ENOENT') {
                console.log('Source File does not exist');
            } else {
             console.error('Error renaming file:', err);   
            }
        }
    }

    //Usage
    renameFile();
}