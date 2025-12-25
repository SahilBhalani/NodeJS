//* HTTPS Module
const https = require('https')
const fs = require('fs')
const path = require('path')

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),

    minVersion: 'TLSv1.2',
    secureOptions:
        require('constants').SSL_OP_NO_SSLv3 |
        require('constants').SSL_OP_NO_TLSv1 |
        require('constants').SSL_OP_NO_TLSv1_1,
}

const server = https.createServer(sslOptions, (req, res) => {
    res.setHeader(
        'Strict-Transport-Security',
        'max-age=315300:includeSubdomains'
    )
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'SAMEORIGIN')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

    //Handle different routes
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(
            '<h1>Welcome to the Secure Server</h1><p>Your Connection is encrypted!</p>'
        )
    } else if (req.url === '/api/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
            JSON.stringify({ status: 'ok', time: new Date().toISOString() })
        )
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('404 Not Found')
    }
})

//Handle server error
server.on('error', (error) => {
    console.error('Server Error:', error)
})

//Start the server on port 3000 (HTTP defualt is 443 but requires root)
const PORT = process.env.PORT || 3000
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Running at https://localhost:${PORT}`)
    console.log('Press CTRL+C to stop the server')
})

//!-------------------------------------------------------------------

{
    //*  Advance Server Configuration
    const tls = require('tls')
    const https = require('https')
    const fs = require('fs')
    const path = require('path')

    // Path to your SSL/TLS files
    const sslOptions = {
        // Certificate and key
        key: fs.readFileSync(path.join(__dirname, 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
        // ca: [fs.readFileSync(path.join(__dirname, 'chain.pem'))],

        // Recommended security settings
        minVersion: 'TLSv1.2',
        maxVersion: 'TLSv1.3',
        ciphers: [
            'TLS_AES_256_GCM_SHA384',
            'TLS_CHACHA20_POLY1305_SHA256',
            'TLS_AES_128_GCM_SHA256',
            'ECDHE-ECDSA-AES256-GCM-SHA384',
            'ECDHE-RSA-AES256-GCM-SHA384',
            'ECDHE-ECDSA-CHACHA20-POLY1305',
            'ECDHE-RSA-CHACHA20-POLY1305',
            'ECDHE-ECDSA-AES128-GCM-SHA256',
            'ECDHE-RSA-AES128-GCM-SHA256',
        ].join(':'),
        honorCipherOrder: true,

        // // Enable OCSP Stapling
        // requestCert: true,
        // rejectUnauthorized: true,

        // Enable session resumption
        sessionTimeout: 300, // 5 minutes
        sessionIdContext: 'my-secure-app',

        // Enable HSTS preload
        hsts: {
            maxAge: 63072000, // 2 years in seconds
            includeSubDomains: true,
            preload: true,
        },

        // Enable secure renegotiation
        secureOptions:
            require('constants').SSL_OP_LEGACY_SERVER_CONNECT |
            require('constants').SSL_OP_NO_SSLv3 |
            require('constants').SSL_OP_NO_TLSv1 |
            require('constants').SSL_OP_NO_TLSv1_1 |
            require('constants').SSL_OP_CIPHER_SERVER_PREFERENCE,
    }

    //create a server
    const server1 = https.createServer(sslOptions, (req, res) => {
        const securityHeaders = {
            'Strict-Transport-Security':
                'max-age=63072000; includeSubDomains; preload',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Content-Security-Policy': "default-src 'self'",
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
        }

        Object.entries(securityHeaders).forEach(([key, value]) => {
            res.setHeader(key,value);
        })

        //Handle requests
        if(req.url === '/'){
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            res.end('<h1>Secure Node.js Server</h1><p>Your connection is secure!</p>');
        } else {
            res.writeHead(404, {'content-type' : 'text:plain'});
            res.end('404 Not Found')
        }
    });

    //Handle Server Errors
    server.on('error', (error) => {
        console.error('Server Error' , error);
    });

    //Handle uncaught Exceptions
    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception', error);

        //perform graceful shutdown
        server.close1(() => process.exit(1))
    });

    //Handle unhandled promise rejection
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejections at: ', promise, "reason:" , reason);
    });

    //handle graceful shutdown
    const gracefulShutdown= () => {
        console.log('Shutting down gracefully...');
        server.close(() => {
            console.log('Server Closed');
            process.exit(0);
        });

    setTimeout(() => {
        console.error('Forcing Shutdown...');
        process.exit(1)
    }, 10000);
    };

    //Listen for shutdown signals
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

    //Start the server
    const PORT = process.env.PORT || 4000;
    const HOST = process.env.HOST || '0.0.0.0';

    server1.listen(PORT,HOST, () => {
        const {address, port} = server1.address();
        console.log(`Server running at https://${address}:${port}`);

        //Output server information
        console.log('Node.js Version:', process.version);
        console.log('Environment:', process.env.NODE_ENV || 'development');
        console.log('PID:', process.pid);
    });
}
