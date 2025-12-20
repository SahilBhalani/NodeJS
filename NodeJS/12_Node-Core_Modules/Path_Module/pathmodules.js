//* USing The path Module
//The path module is a core module in Node.js so no installation is needed.
//You can import it using either CommonJS or ESModules syntax:

const path = require('path')

//desturcture specific methods if needed
const { join, resolve, basename } = require('path');

//* Path Module Methods
// ? path.basename()
//returns the last portion of a path, similar to the unix basename command.

//get filename from a path
const filename = path.basename('C:\Node\large-file.txt')
console.log(filename);

//get filename without extension
const filenamewWithoutExt = path.basename('C:\Node\large-file.txt', '.txt');
console.log(filenamewWithoutExt);

//!------------------------------------------------------------------

//* __dirname and __filename
//In nodejs __dirname and __filename are special variables available in CommonJS modules that provides the directory name and filename of the current module.

//Ex. Using __dirname and __filename in CommonJS

//Get the directory name of the current module
console.log('Directory name:', __dirname);

//Get the file name of the current module 
console.log('File name:', __filename);

//Building paths relative to the current module
const configPath = path.join(__dirname, 'config', 'app-config.json');
console.log('Config file path:' , configPath);

//getiing the directory name using path.dirname()
console.log('Directory using path.dirname():', path.dirname(__filename));


//!------------------------------------------------------------------
//* path.extname()
//Returns the extension of a path, from the last occurrence of the . character to the end of the string

const extension = path.extname('myfile.txt');
console.log(extension);

console.log(path.extname('index.html'));
console.log(path.extname('index.coffee.md'));
console.log(path.extname('index.'));
console.log(path.extname('index'));
console.log(path.extname('.index'));

//!-------------------------------------------------------------------
//* path.join()
//joins all given path segements together using the platform-specific separator as a delimiter, then normalize the resulting path.

//? Basic path joining

//join path segments
const fullPath = path.join('/users', 'docs', 'file.txt');
console.log(fullPath);


//Handle relative paths and navigation 
console.log(path.join('/users','.../system', './logs', 'file.txt'));

//Handle multiple slashes
console.log(path.join('users','//docs','file.txt')); // normalize slashes

//* path.resolve()
//Resolve a sequence of paths or path segements into an absolute path, processing from right to left until an absolute path is constucted.

//ex. resolving path
console.log(path.resolve('file.txt'));
console.log(path.resolve('/users', 'docs', 'file.txt'));
console.log(path.resolve('/first', '/second', 'third'));
console.log(path.resolve(__dirname, 'config', 'app.json'));

//* path.parse()
//Returns an object whose properties represent significant elements of the path
//ex. Parsing a file path
console.log('Parse.path()------------------------------------------');
const pathInfo = path.parse('/users/docs/file.txt');
console.log(pathInfo);

//Accessing parsed components
console.log('Directory:',pathInfo.dir);
console.log('Filename:', pathInfo.base);
console.log('Name only:', pathInfo.name);
console.log('Extension:', pathInfo.ext);

//* path.format
//returns a path string from an object, which is the opposite of path.parse()

//Method 1: Using dir and base
console.log('path.format()-----------------------------------------');
const pathString1 = path.format({
    dir: '/users/docs',
    base: 'file.txt'
});
console.log(pathString1);

//Method 2: Using root,dir,name and ext
const pathString = path.format({
    root: '/',
    dir: '/users/docs',
    name: 'file',
    ext: '.txt'
});
console.log(pathString);

//practical example: Modify and reconstruct a path
const parsedPath = path.parse('/users/docs/old-file.txt');
parsedPath.base = 'new-file.md';

const newPath = path.format(parsedPath);
console.log(newPath);

//* path.normalize()
//Normalizes the given path, resolving .. and . segments and removing redundant separators.

//ex. Normalizing paths
console.log('path.normalize()--------------------------------------');

console.log(path.normalize('/users/./docs/../data/file.txt'));
console.log(path.normalize('/users//docs///file.txt'));
console.log(path.normalize('C:\\users\\docs\\..\\file.txt'));
console.log(path.normalize('.'));
console.log(path.normalize('..'));
console.log(path.normalize('/..'));

//* path.relative()
//Return the relative path from the first path the second path, or an empty string if the path is same.

//Ex. FInding relative paths
console.log('path.relative()---------------------------------------');
console.log(path.relative('/users/docs/file.txt', '/users/images/photo.jpg'));

console.log(path.relative('/users/docs/file1.txt', '/users/docs/file2.txt'));

console.log(path.relative('/users/docs/file.txt', '/users/docs/file.txt'));

//Different roots(windows)
console.log(path.relative('C:\\user\\test\\aaa', "C:\\user\\impl\\bbb"));

//PRactical example: Creating a relative path for web
const absolute = '/var/www/static/images/logo.png';
const webroot = '/var/www';
const webPath = path.relative(webroot,absolute).replace(/\\/g, '/');
console.log(webPath);

//* path.isAbsolute()
//Determines if the given path is an absolute path. An absolute path will be always resolve to the same location, regardless of the working directory

console.log('path.isAbsolute()-------------------------------------');

//Windows
console.log(path.isAbsolute('C://temp'));
console.log(path.isAbsolute('temp'));

//UNC paths
console.log(path.isAbsolute('\\\\server\\share'));

//Practucal example: ensure absolute path for config files
function ensureAbsolute(configPath){
    return path.isAbsolute(configPath) ? configPath : path.resolve(process.cwd(), configPath);
}

console.log(ensureAbsolute('config.json'));
console.log(ensureAbsolute('/etc/app/config.json'));

//!===================================================================

//* Path Properties

//* path.sep
//provides the platform-specific path segment separator
//This is a read-only property that returns the default path segment seperator for the current operating system

console.log('path.sep----------------------------------------------');
//Get the platform-specific seperator
console.log(`Path seperator: ${JSON.stringify(path.sep)}`);

//Building path safely across platform
const parts = ['users','docs','file.txt'];
const filePath = parts.join(path.sep);
console.log('Build path:', filePath);

//Splitting paths correctly
const pathToSplit = process.platform === 'win32' ? 'C:\\Users\\docs\\file.txt' : '/users/docs/file.txt';
const pathParts = pathToSplit.split(path.sep);
console.log('Split path:', pathParts);

//Normalizing paths with the correct seperator
const normalized = path.normalize(`users${path.sep}docs${path.sep}..${path.sep}file.txt`);
console.log('Normalized path:', normalized);

//* path.delimiter
//provides the platform-specific path delimiter used to sepeerate path in environment variables like PATH

//ex. Working with PATH environment variable
console.log('path.delimiter----------------------------------------');

//Get the platform-specific delimiter
console.log(`Path deliiter: ${JSON.stringify(path.delimiter)}`);

//Working with PATH environment varibles
function findInPath(executable) {
    if(!process.env.PATH) return null;

    const pathDirs = process.env.PATH.split(path.delimiter)

    //Check each directory for the executable
    for (const dir of pathDirs) {
        try {
            const fullPath = path.join(dir, executable);
            require('fs').accessSync(fullPath,require('fs').constants.X_OK);
            return fullPath;
        } catch (error) {
            continue;
        }
    }
    return null;
}

const nodePath = findInPath(process.platform === 'win32' ? 'node.exe' : 'node');
console.log('Node.js path:', nodePath || 'Not found in PATH');


// * path.win32
//Provides access to windows-specific path methods, allowing you to work with Windows-style paths regardless of the operating system you're running on

console.log('path.win32--------------------------------------------');

//ex.Working with Windows paths on any platform

//Always use Windows-style path handling
const winPath = "C:\\Users\\user\\Documents\\file.txt";
console.log('Windows basename:', path.win32.basename(winPath));
console.log('Windows dirname:', path.win32.dirname(winPath));

//Normalize Windows paths
console.log('Normalized path:', path.win32.normalize('C:\\\\temp\\\\foo\\..\\bar\\file.txt'));

//Convert between forward and backward slashes
const mixedPath = "C://Users/User/Document//file.txt";
console.log('Normalized mixed slashes:', path.win32.normalize(mixedPath));

//Working with UNC paths
const uncPath = '\\\\server\\share\\folder\\file.txt';
console.log('UNC path components:', path.win32.parse(uncPath));

//* path.posix
//Provides access to POSIX-compliant path methods, ensuring consistent forward-slash path handling across all platforms

console.log('path.posix--------------------------------------------');
//Ex. Working with POSIX paths on any platform

const posixPath = '/home/user/document/file.txt';
console.log('POSIX basename:' , path.posix.basename(posixPath));
console.log('POSIX dirname:', path.posix.dirname(posixPath));

console.log('Normalized Path:', path.posix.normalize('/usr/local/bin/../lib/file.txt'));

//Working with relative paths
console.log('Relative path:', path.posix.relative('/data/test/aaa', '/data/impl/bbb'));

//Joining paths with POSIX seperators
const urlPath = ['static', 'images', 'logo.png'].join(path.posix.sep);
console.log('URL path:', urlPath);