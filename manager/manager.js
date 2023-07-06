'use strict'
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const io=require('socket.io-client')
const port =process.env.PORT || 8000;
let host = `http://localhost:${port}/`;
const socketClient=io.connect(host);



socketClient.on('new-flight',(payload)=>{
    console.log("Manager: ",`new flight with ID ‘${payload.details.flightID}’ have been scheduled`);
})

setInterval(()=>{
  const detailes= createRandomUser();
  detailes.event='new-flight'
  socketClient.emit('new-flight',detailes)
  },10000);

socketClient.on('arrived',(payload)=>{
        console.log(`Manager: We're greatly thankful for the amazing flight, ${payload.details.pilot}`);
});




    function createRandomUser(){
      return {
        event: '',
        time: faker.date.past(),
        details: {
        airLine:'Royal Jordanian Airlines',
        flightID: faker.string.uuid(),
        pilot: faker.internet.userName(),
        destination: faker.location.city()  }
      };
    }