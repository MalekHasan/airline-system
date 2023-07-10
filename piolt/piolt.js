'use strict'
require('dotenv').config();
const io=require('socket.io-client')
const port =process.env.PORT || 8000;
let host = `http://localhost:${port}/`;
let airlineHost = `http://localhost:${port}/airline`;
const socketClient=io.connect(host);
const airlineSocket=io.connect(airlineHost);


socketClient.emit('get-all')
socketClient.on('flight',(flight)=>{
    console.log(`Pilot:Sorry i didn't catch this flight ID ${flight.flightID}`);
})
socketClient.on("new-flight",(id,payload) => {
    setTimeout(() => {
        airlineSocket.emit('took-off',id,payload);
        console.log(`Pilot: Flight with ID '${id}' took-off`);
    }, 4000);
    setTimeout(() => {
        console.log(`Pilot: Flight with ID '${id}' arrived`);
        socketClient.emit('arrived',id, payload);
            socketClient.emit('deleted',id,payload)
        
    }, 7000);

});







