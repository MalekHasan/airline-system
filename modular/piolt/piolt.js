'use strict'
const eventsPool=require('../eventspool');


eventsPool.on("new-flight", (payload) => {
    setTimeout(() => {
        console.log(`Pilot: Flight with ID '${payload.details.flightID}' took-off`);
        eventsPool.emit('took-off', payload);
    }, 4000);
    setTimeout(() => {
        console.log(`Pilot: Flight with ID '${payload.details.flightID}' arrived`);
        eventsPool.emit('arrived', payload);
    }, 7000);
});





