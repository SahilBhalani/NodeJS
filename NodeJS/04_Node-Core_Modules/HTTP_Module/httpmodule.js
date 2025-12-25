//* Working with HTTP Headers
//HTTP headers let you send additional information with your response.
//The res.writehead() method is used to set the status code and response headers.

//* EX. Setting Multiple Headers
const http = require('http')

const server = http.createServer((req, res) => {
    //Set status code and multiple headers
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'X-Powered-By': 'Node.js',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': 'sessionid=abc123; HttpOnly',
    })
    res.end('<h1>Hello, There</h1>')
})

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/')
})

//!------------------------------------------------------------------
//* Reading Request Headers
//You can access request headers using the req.headers object:

const server2 = http.createServer((req, res) => {
    // log all request headers
    console.log('Request Headers:', req.headers)

    // Get specific headers(case-insensitive)
    const userAgent = req.headers['user-agent']
    const acceptLanguage = req.headers['accept-language']

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`User-Agent: ${userAgent}\nAccept-language: ${acceptLanguage}`)
})

server2.listen(5000)

//!------------------------------------------------------------------

//* Working with URLs and Query Strings
//Node.js provides built-in modules to work with urls and query strings, making it easy to handle different parts of a URL and parse query params

//ex. basic URL Handling
const server3 = http.createServer((req, res) => {
    //get the URL and HTTP method
    const { url, method } = req

    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end(`You made a ${method} request to ${url}`)
})

server3.listen(4000, () => {
    console.log(`Server Running at http://localhost:4000/`)
})

//!------------------------------------------------------------------

//* Parsing URLs with the URL Module
//The url module provides utilities for URL resolution and parsing
//it can parse a URL string into a URL object with properties for each part of the URL
//Ex. Parsing URLs
const url = require('url')
const server4 = http.createServer((req, res) => {
    //parse the url
    const parsedUrl = url.parse(req.url, true)

    //Get different  parts of the URL
    const pathname = parsedUrl.pathname // the path without query string
    const query = parsedUrl.query // the  query string as an object

    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(
        JSON.stringify(
            {
                pathname,
                query,
                fullUrl: req.url,
            },
            null,
            2
        )
    )
})

server4.listen(8000, () => {
    console.log(`Server Running at http://localhost:8000/`)
})

//!------------------------------------------------------------------

//* Working with Query Strings
//for more advanced query string handling, you can use the queryString module:
const { URL } = require('url')
const queryString = require('querystring')

const server5 = http.createServer((req, res) => {
    //USing the newer URL API (Node js 10+)
    const baseURL = 'http://' + req.headers.host + '/'
    const parsedUrl2 = new URL(req.url, baseURL)

    //get query parameters
    const params = Object.fromEntries(parsedUrl2.searchParams)

    //Example of building a query string
    const queryObj = {
        name: 'Sahil Patel',
        age: 30,
        interests: ['programming', 'music'],
    }
    const queryStr = queryString.stringify(queryObj)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
        JSON.stringify(
            {
                path: parsedUrl2.pathname,
                params,
                exampleQueryString: queryStr,
            },
            null,
            2
        )
    )
})

server5.listen(1000)

//!------------------------------------------------------------------

//* Handling Different HTTP Methods
//Restful APIs commonly use different HTTP Methods (GET,POST,PUT,DELETE, ETC.) to perform different operations on resources
//Here's how to handle difeerent HTTP methods in Node.js HTTP server:

//In-memory data store(for demonstration)
let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build an API', completed: false },
]

const server6 = http.createServer((req, res) => {
    const { method, url } = req
    const parsedUrl3 = new URL(url, `http://${req.headers.host}`)
    const pathname = parsedUrl3.pathname

    //Set CORS headers(for developement)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    //Handle preflight requests
    if (method == 'OPTIONS') {
        res.writeHead(204)
        res.end()
        return
    }

    //Route: GET /todos
    if (method === 'GET' && pathname === '/todos') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(todos))
    }

    //Routw: POST /todos
    else if (method === 'POST' && pathname === '/todos') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })

        req.on('end', () => {
            try {
                const newTodo = JSON.parse(body)
                newTodo.id =
                    todos.length > 0
                        ? Math.max(...todos.map((t) => t.id)) + 1
                        : 1
                todos.push(newTodo)
                res.writeHead(201, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(newTodo))
            } catch (error) {
                res.writeHead(400, { 'content-type': 'application/json' })
                res.end(JSON.stringify({ error: 'Invalid JSON' }))
            }
        })
    }

    //Route: PUT /todos/:id
    else if (method === 'PUT' && pathname.startsWith('/todos/')) {
        const id = parseInt(pathname.split('/')[2])
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            try {
                const updatedTodo = JSON.parse(body)
                const index = todos.findIndex((t) => t.id === id)

                if (index === -1) {
                    res.writeHead(404, { 'content-type': 'application/json' })
                    res.end(JSON.stringify({ error: 'Todo not found' }))
                } else {
                    todos[index] = { ...todos[index], ...updatedTodo }
                    res.writeHead(200, { 'content-type': 'application/json' })
                    res.end(JSON.stringify(todos[index]))
                }
            } catch (error) {
                res.writeHead(400, { 'content-type': 'application/json' })
                res.end(JSON.stringify({ error: 'Invalid JSON' }))
            }
        })
    }

    //Route: DELETE /todos/:id
    else if (method === 'DELETE' && pathname.startsWith('/todos/')) {
        const id = parseInt(pathname.split('/')[2])
        const index = todos.findIndex((t) => t.id === id)

        if (index === -1) {
            res.writeHead(404, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'Todo not found' }))
        } else {
            todos = todos.filter((t) => t.id !== id)
            res.writeHead(204)
            res.end()
        }
    }

    //404 Not found
    else {
        res.writeHead(404, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: 'Not Found' }))
    }
})

const PORT = 7777
server6.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})
