#! /usr/bin/env node

console.log('This script populates some test components and categories to your sff part database.');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Category = require('./models/category')
var Component = require('./models/component')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = []
var components = []

function categoryCreate(title, description, cb) {
  categorydetail = { title: title }
  if (description != false) categorydetail.description = description
  
  var category = new Category(categorydetail);
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}

function componentCreate(
    name,
    description,
    category,
    price,
    stock,
    link,
    cb
    ) {
  var component = new Component({ 
    name: name,
    description: description,
    category: category,
    price: price,
    stock: stock,
    link: link
    });
       
  component.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Component: ' + component);
    components.push(component)
    cb(null, component);
  }   );
}

function createCategories(cb) {
    async.parallel([
        function(callback) {
          categoryCreate(
            'CPU', 
            'The CPU is the brain of a computer, containing all the circuitry needed to process input, store data, and output results.', 
            callback
          );
        },
        function(callback) {
            categoryCreate(
              'CPU Cooler', 
              'A component that draws heat away from a CPU chip.', 
              callback
            );
          },
          function(callback) {
            categoryCreate(
              'Motherboard', 
              'A motherboard is the main circuit board inside a computer that connects the different parts of a computer together.', 
              callback
            );
          },
          function(callback) {
            categoryCreate(
              'Memory', 
              'Memory (RAM) is a hardware component that is used to store temporary data for the programs running on computers.', 
              callback
            );
          },
          function(callback) {
            categoryCreate(
              'Storage', 
              'Storage is the component of your computer that allows you to store and access data on a long-term basis.', 
              callback
            );
          },
          function(callback) {
            categoryCreate(
              'Video Card', 
              'A video card is an expansion card which generates a feed of output images to a display device.', 
              callback
            );
          },
          function(callback) {
            categoryCreate(
              'Case', 
              'A computer case, also known as a computer chassis, is the enclosure that contains most of the components of a personal computer.', 
              callback
            );
          },
          function(callback) {
            categoryCreate(
              'Power Supply', 
              'A power supply is a hardware component of a computer that supplies all other components with power.', 
              callback
            );
          },
        ],
        // optional callback
        cb);
}


function createComponents(cb) {
    async.parallel([
        function(callback) {
          componentCreate(
              'Intel Core i9-12900K',  
              'Core Count: 16, Core Clock: 3.2 GHz, Boost Clock: 5.2 GHz, Integrated Graphics: Intel UHD Graphics 770',
              categories[0],
              599.99,
              420,
              'https://www.amazon.com/Intel-i9-12900K-Desktop-Processor-Unlocked/dp/B09FXDLX95',
              callback
              );
        },
        ],
        // optional callback
        cb);
}

async.series([
    createCategories,
    createComponents
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Components: '+components);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



