const https = require('https')
const { URL } = require('url')

//parse the target url
const apiUrl = new URL('https://api.example.com/data')

//request options
const options = {
    hostname: apiUrl.hostname,
    port: 443,
    path: apiUrl.pathname + apiUrl.search,
    method: 'GET',
    headers: {
        'User-Agent': 'MySecureApp/1.0',
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
    },

    //security setings
    rejectUnauthorized: true,

    //timeout in milliseconds
    timeout: 10000,
}

console.log(`Making request to: https://${options.hostname}${options.path}`)

//Make the https request
const req = https.request(options, (res) => {
    const { statusCode, statusMessage, headers } = res
    const contentType = headers['content-type'] || ''

    console.log(`Status: ${statusCode} ${statusMessage}`)
    console.log('Headers:', headers)

    //Handle redirects
    if (statusCode >= 300 && statusCode < 400 && headers.location) {
        console.log(`Redirecting to: ${headers.location}`)

        //In a real app, you'd handle the redirect
        res.resume()
        return
    }

    //Check for successful response
    let error
    if (statusCode !== 200) {
        error = new Error(`Request Failed. \n Status Code: ${statusCode}`)
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
            `Invalid content-type .\n Expected application/json but received ${contentType}`
        )
    }
    if (error) {
        console.error(error.message)
        res.resume()
        return
    }

    //process the response
    let rawData = ''
    res.setEncoding('utf8')

    res.on('data', (chunk) => {
        rawData += chunk
    })

    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData)
            console.log('Response data:', parsedData)
        } catch (error) {
            console.error('Error Parsing JSON:', e.message)
        }
    })
})

//Handle request errors
req.on('error', (e) => {
    console.error(`Request error: ${e.message}`)
    if (e.code === 'ECONNRESET') {
        console.error('Connection was reset by the server')
    } else if (e.code === 'ETIMEDOUT') {
        console.error('Request timed out')
    }
})

// Set a timeout for the entire request (including DNS lookup, TCP connect, etc.)
req.setTimeout(15000, () => {
    req.destroy(new Error('Request timeout after 15 seconds'))
})

//Handle socket errors (network-level errors)
req.on('socket', (socket) => {
    socket.on('error', (error) => {
        console.error('Socket error:', error.message)
        req.destroy(error)
    })

    socket.setTimeout(5000, () => {
        req.destroy(new Error('Socket timeout after 5 seconds'))
    })
})

//End the request (required to send it)
req.end();
