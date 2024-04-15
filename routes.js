// Goal: Create the requestListener function that takes in the client 
// request and server response as arguments. 

// Build routes to handle various client request and send an appropriate response
// to the browser.

// The fs package required to access files
const fs = require("fs");
const requestListener = (req, res) => {
    // // The request object contains a ton of information (key,value)
    // // To visualize a request from the browers in the terminal
    // console.log(req)

    // The request is dependent on the url
    // Grab a url from the request object
    const url = req.url;
    // Grab  a method from the request object
    const method = req.method;
    if (url === "/") { // '/' is indicative of localhost:3000, so if '/' then send the following html code as a response
        // A header lets the browser know what type of content is in the response object. 
        // Create the header to the response with a Content-Type of text/html
        res.setHeader("Content-Type", 'text/html')
        // The .write method is a method used to write data going to be sent in a response
        // The html code for the form with a title using the res.write() method

        // Display a greeting message and a from where the user can submit their mood
        res.write("<html>");
        res.write("<head><titel>All the Feels</title></head>");
        res.write('<body><h1>Hey there, welcome to the mood tracker!</h1><p>Enter your mood below and hit send to save your mood.</p><form action = "/mood" method="POST"><input type = "text" name="mood"><button type = "submit">Send</button></body>');
        res.write("</html>");
        // To delcare the response conclusions
        return res.end();
    }
    // The if statement is to be run specifically under the conditions of the html form action and method
    // If the url and method of the incoming request are /mood and post, then save the user input in a separate file
    if (url == "/mood" && method === "POST") {
        // Since node.js handles data in chunks, this can be accomplished through the usage of event listeners, listening for data
        // The array body signifies the data gathered from the request body. 
        // An event listener (req.on()) listens for incoming data, as soon as a chunk of data is detected, 
        // it is pushed into the body array.
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        // End listener that is fired once the incoming request data is parsed
        return req.on("end", () => {
            // To interact with the chunks of data in the body array, group the chunks into a buffer
            // .toString() is used inorder for the code to be able to interact with the data
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            // Because we only want the emotions to be saved in the file, the .split() method is used
            const mood = parsedBody.split("=")[1];

            // Using the fs package, the write file method can be used to create a file and add information
            // Using the writeFile() method, the mood was saved in a file called user_mood.txt
            fs.writeFile("user_mood.txt", mood, () => { });
            return res.end();
        });
    }
};

// Knowing that the createServer method created in server.js passed routes
// as an argument, we need to export the routes file so routes can be imported into server.js

// Use the module.exports keyword to import routes into server.js
module.exports = requestListener;



