ServerIo = require("./init");
RequestManager = require("./request");
var request = require('request');
var parseString = require('xml2js').parseString;

ServerIo.on('connection', function (client) {
    console.log('Client connected...');

    client.on('login', function (data) {
        RequestManager.login(data.login, data.password, function (data) {
            client.emit('login_response', data);
        });
    });

    client.on('register', function (data) {
        RequestManager.register(data.login, data.password, data.email, function (data) {
            client.emit('register_response', data);
        });
    });

    client.on('get_territories_info', function (data) {
        request('http://maps.googleapis.com/maps/api/geocode/xml?latlng=' + data.gps.lat + ',' + data.gps.lon + '&sensor=true', function (error, response, body) {
            parseString(body, function (err, result) {
                if (result == null)
                    return client.emit('get_territories_info_response', {id: data.id, info: null});
                result.GeocodeResponse.result.forEach(function(element) {
                    if (element.type.indexOf("locality") > -1)
                    {
                        var city = element.formatted_address[0].split(",")[0];
                        if (city.match(/^\d/))
                            city = city.substr(city.indexOf(" ") + 1);
                        city = city.replace("St-", "Saint-");
                        console.log(element.formatted_address);
                        console.log(city);
                        console.log(element);
                        RequestManager.get_city_info(city, function (info){
                            client.emit('get_territories_info_response', {id: data.id, info: info});
                        });
                    }
                }, this);
            });
        });
    });

});