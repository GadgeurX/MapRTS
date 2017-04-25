var currentMousePos = { x: -1, y: -1 };
var MoveSpeed = 20;

function initControl() {
    VIZI.Controls.orbit().addTo(world);
    world._controls[0]._controls.mouseButtons.ORBIT = 2;
    world._controls[0]._controls.mouseButtons.PAN = null;
    world._controls[0]._controls.enableDamping = true;
    world._controls[0]._controls.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
    };


    document.onmousemove = handleMouseMove;

    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event;
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                (doc && doc.clientTop || body && body.clientTop || 0);
        }
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    }
}

function handleControl() {
    if (currentMousePos.x <= 0 + ($(window).width() / 100 * 0.5)) {
        world._controls[0]._controls.pan(MoveSpeed, 0);
        world._controls[0]._controls.update();
    } if (currentMousePos.x >= $(window).width() - ($(window).width() / 100 * 0.5)) {
        world._controls[0]._controls.pan(-MoveSpeed, 0);
        world._controls[0]._controls.update();
    } if (currentMousePos.y <= 0 + ($(window).height() / 100 * 0.5)) {
        world._controls[0]._controls.pan(0, MoveSpeed);
        world._controls[0]._controls.update();
    } if (currentMousePos.y >= $(window).height() - ($(window).height() / 100 * 0.5)) {
        world._controls[0]._controls.pan(0, -MoveSpeed);
        world._controls[0]._controls.update();
    }
}

function getCoordGpsMouse()
{
    var picking = world._engine._picking;
    var normalisedPoint = world._originPoint.clone();
    normalisedPoint.x = (currentMousePos.x / picking._width) * 2 - 1;
    normalisedPoint.y = -(currentMousePos.y / picking._height) * 2 + 1;
    picking._update();
    //var index = currentMousePos.x + (picking._pickingTexture.height - currentMousePos.y) * picking._pickingTexture.width;
    //var id = (picking._pixelBuffer[index * 4 + 2] * 255 * 255) + (picking._pixelBuffer[index * 4 + 1] * 255) + (picking._pixelBuffer[index * 4 + 0]);
    picking._raycaster.setFromCamera(normalisedPoint, picking._camera);
    var intersects = picking._raycaster.intersectObjects(world._engine._scene.children, true);
    var _point3d;
    if (intersects.length > 0) {
      _point3d = intersects[1].point.clone();
    }
    return world.pointToLatLon([_point3d.x, _point3d.z, _point3d.y]);
}