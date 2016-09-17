// ================ Base Setup ======================== 
// Include Hapi package 
var Hapi = require('hapi'),
    Routes = require('./routes'),
    Config = require('./config/config'),
    Inert = require('inert');
const Path = require('path');
var app = {};
app.config = Config;

// Create Server Object 
var server = new Hapi.Server(
    {
        connections: {
            routes: {
                files: {
                    relativeTo: Path.join(__dirname, '../')
                }
            }
        }
    }
); 

// Define PORT number 

server.connection({ port: app.config.server.port });
//server.route(Routes.endpoints);
server.register(Inert, function(err){
    if(err){
        throw err;
    }
    server.route(Routes.endpoints);
});

// =============== Start our Server ======================= 
// Lets start the server 
server.start(function () { 
    console.log('Server running at:', server.info.uri); 
}); 