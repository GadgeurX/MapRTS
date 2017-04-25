var Client_Socket = io.connect('http://127.0.0.1:8370');
var request_id = 0;

initMap();
initControl();
initGame();

setInterval(handleControl, 50);