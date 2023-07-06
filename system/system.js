'use strict'
require('dotenv').config();
const port =process.env.PORT || 8000;
const ioSocket=require('socket.io')(port);

ioSocket.on('connection',(socket)=>{
    console.log("hi from system");
    
    socket.on('new-flight',(payload)=>{
        console.log('flight');
        payload.event='new-flight'
        console.log(payload);
        socket.emit('new-flight',payload)
    })
    socket.on('took-off',(payload)=>{
        console.log('flight');
        payload.event='took-off'
        console.log(payload);
        
    })
    socket.on('arrived',(payload)=>{
        console.log('flight');
        payload.event='arrived'
        console.log(payload);
    })
    // console.log(socket._events);
    // console.log(socket._events['arrived']);
})


