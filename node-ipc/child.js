const sessions = {
    "/?user=1": "Hello User 1", 
    "/?user=2": "Hello User 2", 
    "/?user=3": "Hello User 3", 
    "/?user=4": "Hello User 4", 
};

process.on('message', (msg) => {
    console.log('Message from parent:', msg.user);
    if (sessions[msg.user]) {
        process.send({ session: sessions[msg.user], guid: msg.guid });
    }    
});