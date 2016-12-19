var path = require("path"),
    rootPath = path.normalize(__dirname + "/.."),
    env = process.env.NODE_ENV || "development";

var config = {
    development: {
        root: rootPath,
        app: {
            name: "Angular 2 Messenger",
            port: 3000
        },
        mongo: {
            user: "tani",
            password: "",
            host: "localhost",
            port: 27017,
            db: "node-angular",
            urlConnection: function(user, password, host, port, db) {
                return host + ':' + port + '/' + db;
            }
        }
    },
    production: {
        root: rootPath,
        app: {
            name: "Angular 2 Messenger",
            port: process.env.PORT
        },
        mongo: {
            user: "tani",
            password: "tanidev",
            host: "ds139438.mlab.com",
            port: 39438,
            db: "node-angular",
            urlConnection: function(user, password, host, port, db) {
                return user + ':' + password + '@' + host + ':' + port + '/' + db; 
            }
        }
    }
}

module.exports = config[env];
