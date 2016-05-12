var RestClient = require('./RestClient');

//Shorthand to automatically create a RestClient
function initializer(options) {
    return new RestClient(options);
}

//Main functional components of the module
initializer.RestClient = RestClient;

//public module interface is a function, which passes through to RestClient constructor
module.exports = initializer;
