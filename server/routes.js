// Load modules

var Login  = require('./controllers/login'),
    Static    = require('./static');

// API Server Endpoints
exports.endpoints = [
    { method: 'GET',  path: '/node_modules/{param*}', config: Static.getLibs },
    { method: 'GET',  path: '/{param*}', config: Static.getStatic },
    { method: 'GET',  path: '/api/login', config: Login.authenticate}
];