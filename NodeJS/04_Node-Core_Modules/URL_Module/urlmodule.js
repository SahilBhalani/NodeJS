//* The Built-in URL Module
const url = require('url');

//Split a web address into readable parts:
const  adr = 'http://localhost:8080/default.htm?year=2017&month=february';
const  q = url.parse(adr,true);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);


const qdata = q.query;
console.log(qdata.month);

//* Legacy API vs WHATWG URL API
const { URL } = require('url');

//Using the WHATWG URL API (recommended for new code)
const myURL = new URL('https://example.org:8080/p/a/t/h?query=string#hash');
console.log(myURL.hostname);
console.log(myURL.pathname);
console.log(myURL.searchParams.get('query'));

// Using the legacy API
const parsedURL = require('url').parse('https://example.org:8080/p/a/t/h?string#hash');
console.log(parsedURL.host);
console.log(parsedURL.query);

//* URLSearchParams API
const { URLSearchParams } = require('url')

const myURL2 = new URL('https://example.com/?name=Kai&age=30');
const params = new URLSearchParams(myURL2.search);

//Get a paramter
console.log(params.get('name'));

//Add a parameter
params.append('city', 'Stavanger')
//Delete a paramter
params.delete('age');
//Convert to string
console.log(params.toString());


//* Node.js File Server
//Now we know how to parse the query string and in a previous chapter we learned how to make behave as a file server.

//TODO: Create a Node.js file that open the requested file and returns the content to the client. If anything goes wrong, throw a 404 Error;

const http = require('http');
const fs = require('fs');

http.createServer(function (req,res) {
    const q = url.parse(req.url, true);
    const filename = "." + q.pathname;

    fs.readFile(filename, function (err, data) {
        if(err) {
            res.writeHead(404, {'content-type' : 'text/html'})
            return res.end('404 Not Found!')
        }

        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
      });
  }).listen(8080);


//* Best Practices
// ? 1. Always Validate and Sanitize URLs
function isValidHttpUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (error) {
        return false
    }
}

console.log(isValidHttpUrl('https://example.com'));
console.log(isValidHttpUrl('ftp://example.com'));

//? 2. Constructing URLs Safely
//Safe way to construct URLs
function createProfileUrl(domain, username){
    return new URL(`/users/${encodeURIComponent(username)}`, domain).href
}

console.log(createProfileUrl('https://example.com', 'johndoe'));

//? 3. Handling Query Parameters
// Parse  URL  with query paramters
const urll = new URL('https://example.com/search?node.js&lang=en')

//Get all parameter
console.log(urll.searchParams.toString());

// Get specific parameter
console.log(urll.searchParams.get('q'));

//Check if parameter exists
console.log(urll.searchParams.has ('lang'));

//Add new parameter
urll.searchParams.append('page', '2');
console.log(urll.href);
