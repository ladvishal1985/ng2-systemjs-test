'use strict';
exports.authenticate = {
    handler: function (request, reply) {
        // Response JSON object 
        reply({ 
            statusCode: 200, 
            message: 'Getting All User Data', 
            data: [ 
                { name:'Kashish', age:24 }, 
                { name:'Shubham', age:21 }, 
                { name:'Jasmine', age:24 } 
            ] 
        }); 
    }
}