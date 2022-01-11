'use strict';

const faker = require('faker');

class Center {
  constructor(num) {
    this.centerNUM = `CRISIS CENTER #${num}`,
    this.location = faker.address.cityName
  }
}

module.exports = Center