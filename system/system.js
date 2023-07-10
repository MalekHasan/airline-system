'use strict'
require('dotenv').config();
const {v4:uuid}=require('uuid');
const port =process.env.PORT || 8000;
const ioSocket=require('socket.io')(port);
let msgQueue={
    flights:{

    }
}
// local host empty
ioSocket.on('connection',(socket)=>{

    socket.on('get-all',()=>{
        Object.keys(msgQueue.flights).forEach((flight)=>{
            socket.emit('flight',flight)
        })
    })  
    
    socket.on('new-flight',(payload)=>{
        const id=uuid();
        console.log('flight');
        payload.event='new-flight'
        msgQueue.flights[id]=payload
        console.log(msgQueue.flights[id]);
        ioSocket.emit('new-flight',id,msgQueue)
    })

    socket.on('arrived',(id,payload)=>{
        ioSocket.emit('arrived',id,payload)
        console.log('flight');
        payload.flights[id].event='arrived'
        console.log(payload.flights[id]);
    })

    socket.on('deleted',(id,payload)=>{
        delete msgQueue.flights[id];
        console.log('deleted msgQueue',msgQueue);
    })

})

// local host airline

const ioAirline= ioSocket.of('/airline')

ioAirline.on('connection',(socket)=>{
    socket.on('took-off',(id,payload)=>{
        console.log('flight');
        payload.flights[id].event='took-off'
        console.log(payload);
    })
})

