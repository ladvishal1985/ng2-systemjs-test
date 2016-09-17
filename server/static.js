'use strict';


exports.getLibs = {
    handler:{
        directory: {
            path: './node_modules'
        }
    }
};

exports.getStatic = {
    handler:{
        directory: {
            path: './client',
            redirectToSlash:true, 
            index: true
        }
    }
};



