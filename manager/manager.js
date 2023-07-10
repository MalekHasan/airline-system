'use strict'
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const io=require('socket.io-client')
const port =process.env.PORT || 8000;
let host = `http://localhost:${port}/`;
const socketClient=io.connect(host);


setInterval(()=>{
  const flight= createRandomUser();
  flight.event='new-flight'
  console.log(`Manager: new flight with ID ‘${flight.details.flightID}’ have been scheduled`);
  socketClient.emit('new-flight',flight)
  },10000);

socketClient.on('arrived',(id,payload)=>{
        console.log(`Manager: We're greatly thankful for the amazing flight, ${id}`);
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