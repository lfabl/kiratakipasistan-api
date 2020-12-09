const RETHINKDB_ADDRESS = "localhost";
const RETHINKDB_PORT = 28015;
export var r = require('rethinkdbdash')({
    servers: [{
        host: RETHINKDB_ADDRESS,
        port: RETHINKDB_PORT
    }]
});