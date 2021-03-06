# Node.js session leaking 

See [this blog post](https://www.michaelehead.com/2020/01/08/bug-case-studies.html#session-leaking-in-nodejs-processes) for some more background.

In the `/node-ipc` directory, there are 3 scripts:

- parent.js: the parent script that will start an HTTP server and spawn a child process
- child.js: the child script that will pull a session based on the URL query parameter and send it back to the parent process
- request.js: a test script for sending multiple requests and checking their responses for correctness

To recreate the bug:

1. From the `node-ipc` directory, start the parent process with `npm start` in one terminal
1. In a separate terminal, run the requests script via `node requests.js`
1. Output should show that some URLs requested returned the wrong results such as:

    ```
    Did not find the right user! Requested /?user=4 but received <!doctype html><html><title></title><body><h1>Hello User 1</h1></body></html>
    ```

1. Stop parent.js script and uncomment the lines that start with "Part of solution", but comment out the `res.end` line
1. Start the parent process again with `npm start`
1. Run the requests script again
1. All the responses should be associated with the correct requests