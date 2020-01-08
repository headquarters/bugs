const request = require('request');

const sessions = {
    "/?user=1": "Hello User 1", 
    "/?user=2": "Hello User 2", 
    "/?user=3": "Hello User 3", 
    "/?user=4": "Hello User 4", 
};


console.log("Making requests...")

for (const url in sessions) {
    const session = sessions[url];

    makeRequest(url, session);
    // break;
}

function makeRequest(url, user) {
    request(`http://localhost:4111${url}`, function (error, response, body) {
        if (error) {
            console.error(error);
            throw new Error(error);
        }

        if (body.indexOf(user) < 0) {
            console.warn(`Did not find the right user! Requested ${url} but received ${body}`);
        } else {
            console.log("Found the right user.");
        }
    });
}