/**
 * Created by JAMES on 2017/3/14.
 */
$(function () {
    getUserInfo();
});



//取得url的参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
function createCustomNavByRole(role) {
    // manager slide nav管理员侧栏
    // 业务管理
    // var businessmanagement ="<li class='active'>" +
    //     "<a href='jgx.html#/management_station/businessManagement'>" +
    //      +"<span>业务管理</span>" + "</a></li>";
    // 楼盘管理
    var estatemanagement = "<li class='active'>" +
        "<a href='jgx.html#/management_station/estateManagement'>"+"<span id='a1' value='1'>楼盘管理</span>" + "</a></li>";
    // 单位管理
    var unitmanagement = "<li class='active'>" +
        "<a href='jgx.html#/management_station/unitManagement'>"+"<span>单位管理</span>" + "</a></li>";
    // 客户管理
    var usermanagement = "<li class='active'>" +
        "<a href='jgx.html#/management_station/userManagement'>"+"<span>客户管理</span>" + "</a></li>";
    // 维修知识库管理
    var fixmanagement = "<li class='active'>" +
        "<a href='jgx.html#/management_station/fixManagement'>"+"<span>维修知识库管理</span>" + "</a></li>";
    // 报价知识库管理
    var quotepricemanagement = "<li class='active'>" +
        "<a href='jgx.html#/management_station/quotePriceManagement'>" +"<span>报价知识库管理</span>" + "</a></li>";

    // dispatch slide nav 派单员侧栏
    // 业务派单
    var businessdispatch = "<li class='active'>" +
        "<a href='jgx.html#/dispatch_station/businessDispatch'>" +"<span>业务派单</span>" + "</a></li>";
    // 业务管理
    var businessmanagement = "<li class='active'>" +
        "<a href='jgx.html#/dispatch_station/businessManagement'>"+"<span>业务管理</span>" + "</a></li>";
    // // 单位管理
    // var unitmanagement  ="<li class='active'>" +
    //     "<a href='jgx.html#/dispatch_station/unitManagement'>" +
    //     +"<span>单位管理</span>" + "</a></li>";
    // 维修知识库管理
    if (role == 1) {
        $(".custom-nav").append(estatemanagement, unitmanagement, usermanagement, fixmanagement, quotepricemanagement);
        $(".image img").attr("src","../img/管理员.png" );
    } else if (role == 0){
        $(".custom-nav").append(businessdispatch, businessmanagement, fixmanagement, quotepricemanagement);
        $(".image img").attr("src","../img/派单员.png" );
    }
}


function getUserInfo() {
    $.getJSON("http://xihashao.tunnel.2bdata.com/JGX/user_me.json",function (data){
        if(data.success==true) {
            var role = data.user.roles[0];
            createCustomNavByRole(role);
        }
        });
}
