function addCityBorder(geometryJson, color) {
    const material =
        new THREE.MeshPhongMaterial(
            {
                color: 0xCC0000,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.25
            });
    var Shape = new THREE.Shape();
    geometryJson.forEach(function (element) {
        Shape.moveTo(world.latLonToPoint([element[1], element[0]]).x, world.latLonToPoint([element[1], element[0]]).y);
    }, this);

    var geom = new THREE.ShapeGeometry(Shape);
    var object = new THREE.Mesh(geom, material);
    object.position = new THREE.Vector3(0, 0, 0);
    object.rotation.x = 1.5708;
    world._engine._scene.add(object);
    object.renderOrder = 1;
    object.position.y = 1;
    return object;
}