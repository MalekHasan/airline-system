'use strict'
const eventsPool=require('../eventspool')
const { faker } = require('@faker-js/faker');
eventsPool.on('new-flight',(payload)=>{
    console.log("Manager: ",`new flight with ID ‘${payload.details.flightID}’ have been scheduled`);

})
eventsPool.on('arrived',(payload)=>{
        console.log(`Manager: We're greatly thankful for the amazing flight, ${payload.details.pilot}`);
});

    setInterval(()=>{
    const detailes= createRandomUser();
    detailes.event='new-flight'
    eventsPool.emit('new-flight',detailes)
    },10000);






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
