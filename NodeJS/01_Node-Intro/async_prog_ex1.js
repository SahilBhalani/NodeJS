const fs = require('fs');

fs.readFile('package.json', (err, data) => {
    if(err) { 
        console.error("");
    return;
    }

console.log('File Content" ' + data);
});

console.log('Reading File... (This runs first)');
