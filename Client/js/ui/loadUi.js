function loadTerritoryInfo(info) {
    $("#info_territory_panel").remove();
    loadHtml("ui/info_territory.html", function () {
        $("#info_territory_panel .panel-title").text(info.name);
        var population = (info.pop == null) ? "?" : formatBigNumber(info.pop)
        $("#info_territory_panel #popValue").append(population);
        var username = (info.owner == null) ? "Neutral" : info.owner;
        $("#info_territory_panel #ownerValue").append(username);
    });
}