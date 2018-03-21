/**
 * Created by xt on 2017/3/21.
 */
$(document).ready(function () {
    var info = "";
    var map = new BMap.Map("container1");          // 创建地图实例
    map.centerAndZoom('成都', 12);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("成都");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);
    map.setDefaultCursor("Crosshair");//鼠标样式
    var Geo = new BMap.Geocoder();//创建一个地址解析器的实例
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            var mOption = {
                poiRadius: 500,           //半径为1000米内的POI,默认100米
                numPois: 3                //列举出50个POI,默认10个
            }
            map.addOverlay(mk);
            map.panTo(r.point);
            Geo.getLocation(r.point,      //对指定的坐标点进行反地址解析，如果解析成功，则回调函数的参数为GeocoderResult对象
                function mCallback(rs) {
                    var allPois = rs.surroundingPois;//获取全部POI（该点半径为100米内有6个POI点）
                    console.log(allPois);
                    $("#panel1").empty();
                    for (i = 0; i < allPois.length; ++i) {
                        subgo = function (event) {
                            document.getElementById("map-input1").value = event.target.text;
                        }
                        document.getElementById("panel1").innerHTML += "<li class='weui_actionsheet_cell' ><a href='javascript:void(0)' onclick='subgo(event)' style='font-size:14px;color:black;font-family='微软雅黑''>" + allPois[i].title + " " + allPois[i].address + "</a></li>";

                        map.addOverlay(new BMap.Marker(allPois[i].point));
                    }
                }, mOption
            );
        }
        else {
            alert('failed' + this.getStatus());
        }
    }, {enableHighAccuracy: true})


    function displayPOI() {
        var address1;
        var myGeo = new BMap.Geocoder();
        address1 = document.getElementById("map-input1").value;
        myGeo.getPoint(address1, function (point) {
            if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
            } else {
                alert("您选择地址没有解析到结果!");
            }
            var mOption = {
                poiRadius: 500,           //半径为1000米内的POI,默认100米
                numPois: 3               //列举出50个POI,默认10个
            }
            map.addOverlay(new BMap.Circle(point, 500));        //添加一个圆形覆盖物
            myGeo.getLocation(point,
                function mCallback(rs) {
                    var allPois = rs.surroundingPois;//获取全部POI（该点半径为100米内有6个POI点
                    $("#panel1").empty();
                    for (i = 0; i < allPois.length; ++i) {
                        subgo = function (event) {
                            document.getElementById("map-input1").value = event.target.text;
                        }
                        document.getElementById("panel1").innerHTML += "<li class='weui_actionsheet_cell' ><a href='javascript:void(0)' onclick='subgo(event)' style='font-size:14px;color:black;' title='" + allPois[i].point + "' id='" + i + "'>" + allPois[i].title + " " + allPois[i].address + "</a></li>";
                        map.addOverlay(new BMap.Marker(allPois[i].point));
                    }
                }, mOption
            )
        }, "成都市");

    }

    function G(id) {
        return document.getElementById(id);
    }

    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": "map-input1"
            , "location": map
        });
    var input = document.getElementById("map-input1");
    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel1").innerHTML = str;
    });

    var myValue;
    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel1").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        setPlace();

        displayPOI();
    });

    function setPlace() {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }

        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }


    $("#changeInfo").click(function () {
        var address1;
        var myGeo = new BMap.Geocoder();
        address1 = $("#map-input1").val();
        myGeo.getPoint(address1, function (point) {
            if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
            } else {
                alert("您选择地址没有解析到结果!");
            }
            var mOption = {
                poiRadius: 500,           //半径为1000米内的POI,默认100米
                numPois: 3               //列举出50个POI,默认10个
            }
            /*map.addOverlay(new BMap.Circle(point, 500));*/        //添加一个圆形覆盖物
            myGeo.getLocation(point,
                function mCallback(rs) {
                    var allPois = rs.surroundingPois;//获取全部POI（该点半径为100米内有6个POI点
                    /*$("#panel").empty();
                     for (i = 0; i < allPois.length; ++i) {
                     subgo = function (event) {
                     document.getElementById("map-input").value = event.target.text;
                     }
                     document.getElementById("panel").innerHTML += "<li class='weui_actionsheet_cell' ><a href='javascript:void(0)' onclick='subgo(event)' style='font-size:14px;color:black;' title='" + allPois[i].point + "' id='" + i + "'>" + allPois[i].title + " " + allPois[i].address + "</a></li>";
                     map.addOverlay(new BMap.Marker(allPois[i].point));
                     }*/
                    var province = rs.addressComponents.province;
                    var city = rs.addressComponents.city;
                    var area = rs.addressComponents.district;
                    var street = rs.addressComponents.street;
                    var detail = $("#streetNumber1").val();
                    $.ajax({
                        url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_updateAddress.json",
                        dataType: "JSON",
                        type: "POST",
                        data: {
                            addressId: clickId,
                            province: province,
                            city: city,
                            area: area,
                            street: street,
                            detail: detail,
                        },
                        success: function (data) {
                            if (data.success) {
                                alert(data.msg);
                            }
                            else {
                                alert(data.msg);
                            }
                        }
                    })
                }, mOption
            )
        }, "成都市");
    })
    $("#deleteInfo").click(function () {
        $.ajax({
            url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_deleteBuildingInfo.json",
            dataType: "JSON",
            type: "POST",
            data: {
                addressId: clickId
            },
            success: function (data) {
                if (data.success) {
                    alert(data.msg);
                }
                else {
                    alert(data.msg);
                }
            }
        })
    })


    $.ajax({
        type: "post",
        url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAndAddress.json",
        dateType: "json",
        data: {startPage: "1", pageSize: "5"},
        success: function (data) {
            if (data.success) {
                $.each(data.list, function (index, item) {
                    $("tbody").append(
                        "<tr class='list_1'>"
                        + "<td>" + item.buildingName + "</td><td>"
                        + item.housePropertyAddress.province
                        + item.housePropertyAddress.city
                        + item.housePropertyAddress.area
                        + item.housePropertyAddress.street
                        + item.housePropertyAddress.detail + "</td>"
                        + "<td class='button-flex'><button type='button' name='changgebutton' class='btn btn-primary' id='" + item.id + "' data-toggle='modal' data-target='#companyDel' value='"+item.housePropertyAddress.street+item.housePropertyAddress.detail+"'>编辑</button>" + "</td></tr>"
                    );
                })

                /*分页实现*/
                var pageNum = data.pageNum;
                for (var i = 1; i <= pageNum; i++) {
                    var attrId = i;
                    $(".pagination").append(
                        "<li><a href='#' id='" + attrId + "'>" + i + "</a></li>"
                    )
                }
                $(".pagination").on("click", "a", function () {
                    $(".table-striped tbody tr").remove();
                    var pageId = $(this).attr("id");
                    $.ajax({
                            url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAndAddress.json",
                            type: "POST",
                            dataType: "json",
                            data: {pageSize: "5", startPage: pageId},
                            success: function (data) {
                                if (data.success) {
                                    $.each(data.list, function (index, item) {
                                        $("tbody").append(
                                            "<tr class='list_1'>"
                                            + "<td>" + item.buildingName + "</td><td>"
                                            + item.housePropertyAddress.province
                                            + item.housePropertyAddress.city
                                            + item.housePropertyAddress.area
                                            + item.housePropertyAddress.street
                                            + item.housePropertyAddress.detail + "</td>"
                                            + "<td class='button-flex'><button type='button' name='changgebutton' class='btn btn-primary' id='" + item.id + "' value='"+item.housePropertyAddress.detail+"'>编辑</button>" + "</td></tr>"
                                        );
                                    })
                                }
                            }
                        }
                    )
                })
            }
        }
    });


    /*点击编辑后的事件*/

    var clickId;
    $(document).on("click", "button[name='changgebutton']", function () {
        clickId = $(this).attr("id");
        var detail = $(this).attr("value");
        /*获取信息并填入*/
        $.ajax({
            type: "post",
            url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAddress.json",
            dateType: "json",
            data: {parentId: "0"},
            success: function (data) {
                console.log(data);
                $.each(data.buildingInformations, function (index, item) {
                    if (item.id == clickId) {
                        $("#delChooseBuilding option").remove();
                        $("#delChooseBuilding").append(
                            "<option>" + item.buildingName + "</option>"
                        )
                        $("#streetNumber1").empty();
                        $("#streetNumber1").attr("value",detail)
                        $("#buildName1").empty();
                        $("#buildName1").attr("value",item.buildingName);
                        $("#delChsBuilding2 option").remove();
                        $("#delChsBuilding2").append(
                            "<option>" + item.buildingName + "</option>"
                        )
                    }
                })
                $.each(data.buildingInformations, function (index, item) {

                    $("#delChooseBuilding").append(
                        "<option value='" + item.id + "'>" + item.buildingName + "</option>"
                    )
                    $("#delChsBuilding2").append(
                        "<option value='" + item.id + "'>" + item.buildingName + "</option>"
                    )
                })
                $.ajax({
                    url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAddress.json",
                    type: "POST",
                    dataType: "JSON",
                    data: {parentId: clickId},
                    success: function (data) {
                        console.log(data);
                        $("#delChooseRoom option").remove();
                        $("#delBuildingList li").remove();
                        $("#delChooseRoom").append(
                            "<option>" + "..." + "</option>"
                        )
                        $.each(data.buildingInformations, function (index, item) {
                            $("#delChooseRoom").append(
                                "<option value='" + item.id + "'>" + item.buildingName + "</option>"
                            )
                            $("#delBuildingList").append(
                                "<li class='list-group-item' value='" + item.id + "'>"
                                + "<input type='text' class='inputv' value='" + item.buildingName + "'>"
                                + "<button type='button' class='button-span' >"
                                + "<span class='glyphicon glyphicon-ok' aria-hidden='true'></span></button>"
                                + "<button type='button' class='button-span' >"
                                + "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></li>"
                            )
                        })
                    }
                })
            }
        })
        var selectId;
        $("#delChsBuilding2").change(function () {
            selectId = $("#delChsBuilding2 option:selected").attr("value");
            $.ajax({
                url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAddress.json",
                type: "POST",
                dataType: "JSON",
                data: {parentId: selectId},
                success: function (data) {
                    console.log(data);
                    $("#delChooseRoom option").remove();
                    $.each(data.buildingInformations, function (index, item) {
                        $("#delChooseRoom").append(
                            "<option value='" + item.id + "'>" + item.buildingName + "</option>"
                        )
                    })
                }
            })
        })
        var selectId2;
        $("#delChooseRoom").change(function () {
            selectId2 = $("#delChooseRoom option:selected").attr("value");
            $.ajax({
                url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAddress.json",
                type: "POST",
                dataType: "JSON",
                data: {parentId: selectId2},
                success: function (data) {
                    console.log(data);
                    $("#delRoomList li").remove();
                    $.each(data.buildingInformations, function (index, item) {
                        $("#delRoomList").append(
                            "<li class='list-group-item'value='" + item.id + "'>"
                            + "<input type='text' class='inputv' value='" + item.buildingName + "'>"
                            + "<button type='button' class='button-span'>"
                            + "<span class='glyphicon glyphicon-ok' aria-hidden='true'></span></button>"
                            + "<button type='button' class='button-span' >"
                            + "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></li>"
                        )
                    })
                }
            })
        })
    })

    $(document).on("click", ".glyphicon-ok", function () {
        var beselected;
        var value;
        beselected = $(this).parent().parent().val();
        value = $(this).parent().prev().val();
        $.ajax({
            url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_updateBuildingInfo.json",
            type: "POST",
            dataType: "JSON",
            data: {id: beselected, buildingName: value},
            success: function (data) {
                alert(data.msg);
            }
        })
    })
    $(document).on("click", ".glyphicon-remove", function () {
        var beselected;
        beselected = $(this).parent().parent().val();
        $.ajax({
            url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_deleteBuildingInfo.json",
            type: "POST",
            dataType: "JSON",
            data: {id: beselected},
            success: function (data) {
                alert(data.msg);
                if (data.msg=="操作成功") {
                    $(this).parent().parent().remove();
                }
            }
        })
    })
})
