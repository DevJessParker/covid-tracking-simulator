'use strict';

const io = require('socket.io')(3000);
const hub = io.of('/hub');
const Log = require('../lib/log-generator.js');
const Email = require('../lib/email-generator.js');
const { app } = require('faker/lib/locales/en');
let locations = [];

//Global Connection
hub.on('connection', socket => {
  console.log('Initializing Setup for Covid Vaccine Simulation...');
  // console.log(socket.id);

  socket.on('join-room', async (payload) => {  
    let room = `${payload.centerNUM}`;
    try {
    await socket.join(room);
    locations.push(payload.centerNUM);
    console.log('location list', locations);
    console.log('__ROOMS__', socket.rooms);
    } catch {
      console.log('___ERROR___ROOM NOT CREATED');
    }
  })  
  socket.on('order-received', (payload) => {
    let log = new Log('order received', payload);
    console.log(log);
    hub.emit('order-received', payload);
  });
  socket.on('pickup', payload => {
    new Log('pickup', payload);
    hub.emit('pickup', payload);
  })
  socket.on('vaccine-requested', (payload) => {
    let log = new Log('pickup scheduled', payload);
    console.log(log);
    hub.emit('vaccine-requested', payload);
  });
  socket.on('in-transit', (payload) => {
    let log = new Log('in-transit', payload);
    console.log(log);
    hub.emit('in-transit', payload);
  });
  socket.on('delivered', (payload) => {
    let log = new Log('delivered', payload);
    console.log(log);
    hub.emit('delivery-confirmed', payload);
  });
  socket.on('delayed', (payload) => {
    let log = new Log('order-delayed', payload);
    console.log(log);
    hub.emit('order-delayed', payload);
  });
  socket.on('unable-to-fulfill', (payload) => {
    let log = new Log('returned-to-vendor', payload);
    console.log(log);
    hub.emit('order-delayed', payload);
  });
  socket.on('send-email', (payload) => {
    const email = new Email(payload);
    console.log('CRISIS CENTER: Confirmation of delivery email sent to origin center.', email);
  })
})