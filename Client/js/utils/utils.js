function loadHtml(file, call) {
    $.get({
        url: file,
        cache: false
    }, function (data) {
        $("#ui").append(data);
        if (typeof (call) == "function")
            call();
    });
}

function formatBigNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}