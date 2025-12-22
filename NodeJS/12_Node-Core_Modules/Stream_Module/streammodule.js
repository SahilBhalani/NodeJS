// * Stream Mpdule

// * Basic Stream Example
const fs = require('fs');


//Create a readable stream from a file
const readableStream = fs.createReadStream('C:\\Node\\myfile.txt', 'utf8');

//Create a writeable stream to a file
const writableStream = fs.createWriteStream('C:\\Node\\output.txt')

//Pipe the data from readable to writeable
readableStream.pipe(writableStream);

//Handle completion and errors
writableStream.on('finish', () => {
    console.log('File copy completed');
});

readableStream.on('error', (err) => {
    console.error('Error reading file:', err);
})

writableStream.on('error', (err) => {
    console.error('Error writing file:', err);
});


//* Readable Streams
//readable streams let you read data from a source.
// ~ Reading from a file
// ~ HTTP responses on the client
// ~ HTTP requests on the server
// ~ process.stdin 

// TODO: Creating a Readable Stream
{
    //Create a readable stream from a file
    const readableStream = fs.createReadStream('C:\\Node\\data.json', {
        encoding : 'utf8',
        highWaterMark: 64 * 1024 // 64KB Chunks
    });
    
    readableStream.on('end', () => {
        console.log('No more data to read.');
    });

    readableStream.on('error', (err) => {
        console.error('Error reading from stream:', err);
    });
}

//*  Writable Streams
// Writable streams let you write data to a destination 
// ~ Writing a file
// ~ HTTP requests on the client
// ~ HTTP responses on the server
// ~ process.stdout

//TODO: Create a Writeable Stream
{
    const writableStream = fs.createWriteStream('C:\\Node\\output.txt')

    //Write Data to the stream
    writableStream.write("Hello, ");
    writableStream.write('World!');
    writableStream.write('\nWriting to a stream is easy');

    // End the stream
    writableStream.end();

    //Events for writable streams
    writableStream.on('finish', () => {
        console.log('All data has been written to the file');
    });

    writableStream.on('error',(err) => {
        console.error('Error writing to stream:' , err);
    });
}

//* Handling Backpressure
//When writing to a stream, if the data is being written faster than it can be processed, backpressured occurs.
// The write() method returns a boolean indicating if it's safe to continue writing.
{
    const writableStream = fs.createWriteStream('C:\\Node\\output.txt');

    function writeData() {
        let i = 100;
        function write() {
            let ok = true;
            do{
                i--;
                if(i === 0) {
                    //Last time, close the stream
                    writableStream.write('Last chunk!\n');
                    writableStream.end();
                } else {
                    const data = `Data chunk ${i}\n`;

                    ok = writableStream.write(data);
                }
            } while (i > 0 && ok);

            if(i > 0) {
                writableStream.once('drain', write)
            }
        }
        write();
    }

    writeData();
    writableStream.on('finish', () => {
        console.log('All data written successfully.');
    });

}


