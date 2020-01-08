const { fork } = require('child_process');
const http = require('http');

const forked = fork('child.js');

const server = http.createServer();

// Part of solution: use an object that can store the key/value pairs of 
// a request's "guid" with its expected response
// const requests = {};

server.on('request', (req, res) => {
    console.log("Server received request", req.url);
    
    // Part of solution: associate a "guid"* to the request and set its response object as its value
    // *pseudo-random string guid, good enough for testing purposes here
    const guid = Math.random().toString().replace(".", "");
    // requests[guid] = res;
    
    forked.send({ user: req.url, guid: guid });

    forked.on('message', (msg) => {
        console.log('Message from child', msg);

        // Using the response for the current request, we might send back the wrong session
        res.end(`<!doctype html><html><title></title><body><h1>${msg.session}</h1></body></html>`);

        // Part of solution: get *this* request's response object to send back for the appropriate session
        // const thisResponse = requests[msg.guid];
        // thisResponse.end(`<!doctype html><html lang="en"><title>Homepage</title><body><h1>${msg.session}</h1>`);
    });
});

server.listen("4111");