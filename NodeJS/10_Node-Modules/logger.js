// ? 2. Exporting a Single Item
//To export a single item(function , object, etc. ) assign it to module.exports:

class Logger{
    constructor(name) {
        this.name = name;
    }

    log(message) {
        console.log(`[${this.name}] ${message}`);
    }

    error(error) {
        console.error(`[${this.name}] ERROR:` , error.message);
    }
}

//Exporting a single class
module.exports = Logger;