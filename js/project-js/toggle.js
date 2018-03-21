/**
 * Created by JAMES on 2017/3/14.
 */
$(document).ready(function(){
    var businessDispatch = function () { $("iframe").attr("src","businessDispatch.html")},
        businessManagement = function () { $("iframe").attr("src","businessManagement.html")},
        unitManagement = function () { $("iframe").attr("src","unitManagement.html")},
        estateManagement = function () { $("iframe").attr("src","estateManagement.html")},
        fixManagement = function () { $("iframe").attr("src","fixManagement.html")},
        quotePriceManagement = function () { $("iframe").attr("src","quotePriceManagement.html")},
        userManagement = function () { $("iframe").attr("src","userManagement.html")},
        allroutes = function() {
            var route = window.location.hash.slice(2)
        };

    var routes = {
        '/management_station/unitManagement': unitManagement,
        '/management_station/estateManagement':estateManagement,
        '/management_station/fixManagement':fixManagement,
        '/management_station/quotePriceManagement':quotePriceManagement,
        '/management_station/userManagement':userManagement,
        '/dispatch_station/businessDispatch': businessDispatch,
        '/dispatch_station/businessManagement':businessManagement,
    };

    var router = Router(routes);

    router.configure({
        on: allroutes
    });
    router.init();
});