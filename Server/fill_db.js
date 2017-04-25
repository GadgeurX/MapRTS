var monk = require("monk");
var db = monk('127.0.0.1/' + "MapRTS");
var TerritoriesColl = db.get("Territories");
var JSONStream = require('JSONStream');
var xml2object = require('xml2object');
var CityProp = {};

var fs = require('fs')
var readerStream = fs.createReadStream(process.argv[2]);
readerStream.setEncoding('UTF8');

var parseStream = JSONStream.parse('features.*');

parseStream.on('data', function (data) {
    console.log("save : " + data.name);
    console.log(CityProp[data.name]);
    var Territory = {
        name: data.name,
        postcode: data.properties["addr:postcode"],
        geometry: data.geometry.coordinates,
        owner: null,
        pop: (CityProp[data.name] == undefined) ? null : CityProp[data.name].pop,
        center: (CityProp[data.name] == undefined) ? null : CityProp[data.name].center
    }
    TerritoriesColl.insert(Territory);
});

var parser = new xml2object('table', 'villes_france.xml');

parseStream.on('end', function () {
    console.log("end of the save !!!!!");
});

parser.start();

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');



parser.on('object', function (name, obj) {
    //console.log('Found an object: %s', name);
    CityProp[obj.column[5]["$t"]] = { pop: obj.column[16]["$t"], center: [obj.column[19]["$t"], obj.column[20]["$t"]] };
    console.log("parse : " + obj.column[5]["$t"]);
});

// Bind to the file end event to tell when the file is done being streamed
parser.on('end', function () {
    console.log('Finished parsing xml!');
    console.log( Object.keys(CityProp).length);
    process.stdin.on('data', function (text) {
        readerStream.pipe(parseStream);
    });
});