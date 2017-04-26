var get_territories_info_id = 0;
var selected_city = [];

function initNewPlayerProccess() {
    $(document).click(function () {
        get_territories_info_id = request_id;
        request_id++;
        if (Client_Socket.connected)
            Client_Socket.emit('get_territories_info', { gps: getCoordGpsMouse(), id: get_territories_info_id });
    });

    Client_Socket.on('get_territories_info_response', function (data) {
        console.log(data);
        if (data.id == get_territories_info_id && data.info != null) {
            console.log("try to draw  : " + data.info.name);
            selected_city.forEach(function (element) {
                world._engine._scene.remove(element);
            }, this);
            selected_city = [];

            data.info.geometry.forEach(function (element) {
                selected_city.push(addCityBorder(element[0], "color"));
            }, this);

            loadHtml("ui/info_bar.html");
            loadTerritoryInfo(data.info);
        }
    });
}