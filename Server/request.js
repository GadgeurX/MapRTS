var monk = require("monk");
var sha512 = require('js-sha512').sha512;
var This;

class Request {
    constructor(ip) {
        this.db = monk(ip + '/' + "MapRTS");
        this.Users = this.db.get("Users");
        this.Territories = this.db.get("Territories");
        This = this;
    }

    register(username, password, email, callback) {
        this.Users.findOne({'username': username}, function(e, docs) {
            if (docs != null)
                return callback(false);
            This.Users.findOne({'email': email}, function(e, docs) {
                if (docs != null)
                    return callback(false);
                This.Users.insert(
                    {
                        'username': username,
                        'pwd': (password == null) ? null : sha512(password),
                        'email': email,
                        'exp': 0,
                        'level' : 1,
                        'picture': "https://www.buira.org/assets/images/shared/default-profile.png"
                    }
                );
                console.log("[INFO] : User " + username + " registed");
                callback(true);
            });
        });
    }

    login(username, password, callback) {
        this.Users.findOne({ 'username': username, 'pwd': sha512(password) }, function (e, docs) {
            if (docs == null) {
                return callback({state: false, id: null});
            }
            callback({state: true, id: docs._id});
        });
    }

    get_city_info(city_name, callback) {
        this.Territories.findOne({'name':city_name}, function(e, doc){
            return callback(doc);
        });
    }

}

module.exports = new Request("127.0.0.1");