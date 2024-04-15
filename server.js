// Elastic Beginner's guide to creating a Node.js server notes
// 4/1/5/2024 Beau Lee

// There are several core modules in Node.js
// The http core module has the ability to launch a server.
// To use the features of http module, import it into the server.js by using the
// require() keyword

// Import http module in server.js
const http = require('http')

// To pass routes as an argument, import routes.js into server.js
// just like the http core module, use the require() keyword to import routes
// however by providing the file path

// Import routes.js in server.js
const routes = require('./routes')

// This method creates a server and accepts a requestListener function that has two
// parameters, HTTP request (req) and response (res)
// Since the requestListener function is defined in routes.js , routes is passed

// Use the http createServer method to import routes into server.js and create a server
const server = http.createServer(routes)

// Now that we have imported the http core module, routes.js, and implemented the create
// server method, we need a way to listen to request from the browers.
// The listen() method can be used. 

// Use the server.listen() method and pass 3000 as an argument
server.listen(3000);