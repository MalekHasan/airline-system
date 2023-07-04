'use strict'
const eventsPool=require('../eventspool')

eventsPool.on('new-flight',(payload)=>{
    console.log('flight');
    payload.event='new-flight'
    console.log(payload);
    
})
eventsPool.on('took-off',(payload)=>{
    console.log('flight');
    payload.event='took-off'
    console.log(payload);
    
})
eventsPool.on('arrived',(payload)=>{
    console.log('flight');
    payload.event='arrived'
    console.log(payload);
})
