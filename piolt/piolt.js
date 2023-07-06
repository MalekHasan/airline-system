'use strict'
require('dotenv').config();
const io=require('socket.io-client')
const port =process.env.PORT || 8000;
let host = `http://localhost:${port}/`;
const socketClient=io.connect(host);


socketClient.on("new-flight", (payload) => {
    setTimeout(() => {
        console.log(`Pilot: Flight with ID '${payload.details.flightID}' took-off`);
        socketClient.emit('took-off', payload);
    }, 4000);
    setTimeout(() => {
        console.log(`Pilot: Flight with ID '${payload.details.flightID}' arrived`);
        socketClient.emit('arrived', payload);
    }, 7000);
});





