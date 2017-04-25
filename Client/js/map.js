var world;

function initMap() {
    var coords = [46.751647, 2.179177];
    world = VIZI.world('map', {
        skybox: true,
        postProcessing: false
    }).setView(coords);

    world._environment._skybox.setInclination(0.1);
    console.log(world);

    VIZI.imageTileLayer('http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(world);

    world._layers[1]._options.distance = 3000000;
    world._engine._camera.far = 30000000000;
    world._engine._camera.updateProjectionMatrix();
    world._engine._camera.position.z = 150000;
    world._engine._camera.position.y = 1500000;

    VIZI.topoJSONTileLayer('https://tile.mapzen.com/mapzen/vector/v1/buildings/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw', {
        interactive: false,
        style: function (feature) {
            var height;

            if (feature.properties.height) {
                height = feature.properties.height;
            } else {
                height = 10 + Math.random() * 10;
            }


            return {
                height: height,
                color: "#FFFFFF"
            };
        },
        filter: function (feature) {
            // Don't show points
            return feature.geometry.type !== 'Point';
        },
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
    }).addTo(world);
}