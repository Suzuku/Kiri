/**
 * Created by xt on 2017/3/15.
 */
$(document).ready(function () {
    var chooseProvince = $("#choose-province");
    var chooseCity = $("#choose-city");
    var chooseLocal = $("#choose-local");
    var chooseStreet = $("#choose-street");
    var selectId;
    $.ajax({
            url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryAddress.json",
            type: "POST",
            dataType: "JSON",
            data: {parentId: "0"},
            success: function (data) {
                console.log(data);
                if (data.success) {
                    $(chooseProvince).empty();
                    $(chooseProvince).append(
                        "<option>" + "..." + "</option>"
                    )
                    $.each(data.addresses, function (index, item) {
                        $(chooseProvince).append(
                            "<option value='" + item.id + "'>" + item.name + "</option>"
                        )
                    })
                }
                $(chooseProvince).change(function () {
                    $.ajax({
                        url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryAddress.json",
                        type: "POST",
                        dataType: "JSON",
                        data: {parentId: data.addresses[0].id},
                        success: function (data) {
                            if (data.success) {
                                console.log(data);
                                $(chooseCity).empty();
                                $(chooseCity).append(
                                    "<option>" + "..." + "</option>"
                                )
                                $.each(data.addresses, function (index, item) {
                                    $(chooseCity).append(
                                        "<option value='" + item.id + "'>" + item.name + "</option>"
                                    )
                                })
                            }
                            $(chooseCity).change(function () {
                                $.ajax({
                                    url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryAddress.json",
                                    type: "POST",
                                    dataType: "JSON",
                                    data: {parentId: data.addresses[0].id},
                                    success: function (data) {
                                        console.log(data);
                                        if (data.success) {
                                            $(chooseLocal).empty();
                                            $(chooseLocal).append(
                                                "<option>" + "..." + "</option>"
                                            )
                                            $.each(data.addresses, function (index, item) {
                                                $(chooseLocal).append(
                                                    "<option value='" + item.id + "'>" + item.name + "</option>"
                                                )
                                            })
                                        }
                                        $(chooseLocal).change(function () {
                                            var localId = $("#choose-local option:selected").val();
                                            $.ajax({
                                                url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryAddress.json",
                                                type: "POST",
                                                dataType: "JSON",
                                                data: {parentId: localId},
                                                success: function (data) {
                                                    console.log(data);
                                                    if (data.success) {
                                                        $(chooseStreet).empty();
                                                        $.each(data.addresses, function (index, item) {
                                                            $(chooseStreet).append(
                                                                "<option value='" + item.id + "'>" + item.name + "</option>"
                                                            )
                                                        })
                                                    }
                                                }
                                            })
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })

    $.ajax({
        type:"post",
        url:"http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAddress.json",
        dateType: "json",
        data:{parentId:"1"},
        success:function (data) {
            console.log(data);
            $("#choosebuilding option").remove();
            $("#choosebuilding").append(
                "<option>" + "..." + "</option>"
            )
            $.each(data.buildingInformations, function (index, item) {
                $("#choosebuilding").append(
                    "<option value='" + item.id + "'>" + item.buildingName + "</option>"
                )
                $("#choosebuilding2").append(
                    "<option value='" + item.id + "'>" + item.buildingName + "</option>"
                )
            })
        }
})

    $("#choosebuilding2").change(function () {
        selectId = $("#choosebuilding2 option:selected").attr("value");
                $.ajax({
                    url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAddress.json",
                    type: "POST",
                    dataType: "JSON",
                    data: {parentId: selectId},
                    success: function (data) {
                            console.log(data);
                            $("#chooseroom option").remove();
                        $("#chooseroom").append(
                            "<option>" + "..." + "</option>"
                        )
                            $.each(data.buildingInformations, function (index, item) {
                                $("#chooseroom").append(
                                    "<option value='" + item.id + "'>" + item.buildingName + "</option>"
                                )
                            })
                    }
                })
            })

    $(document).on("click",".button-span",function () {
        $(this).parent().remove();
    })

    $("#danyuanadd").click(function () {
        var a=$("#danyuanname").val();
        /*var b=$("#chooseloup option:selected").val();*/
        $("#danyuanlist").append(
            "<li class='list-group-item listdisplay'>" + a
            + "<button type='button' class='button-span' >"
            + "<span class='glyphicon glyphicon-minus-sign' aria-hidden='true'></span>"
            +"</button></li>"
        )
    })

    $("#roomadd").click(function () {
        var a=$("#roomname").val();
        /*var b=$("#chooseloup option:selected").val();*/
        $("#roomlist").append(
            "<li class='list-group-item listdisplay'>" + a
            + "<button type='button' class='button-span' >"
            + "<span class='glyphicon glyphicon-minus-sign' aria-hidden='true'></span>"
            +"</button></li>"
        )
    })

    $("#danyuansubmit").click(function () {
        var buildingslist =new Array ();
        var index = 0;
        selectId = $("#choosebuilding option:selected").attr("value");
        $("#danyuanlist").find("li").each(function () {
            /* alert($(this).text());*/
            buildingslist[index]=$(this).text();
            index++;
        })
        $.ajax({
            type:"post",
            url:"http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_addBuildingInfo.json",
            dateType: "json",
            data:{parentId:selectId,buildings:buildingslist.join(",")},
            success:function (data) {
                alert(data.msg);
            }
        })
    })

    $("#roomsubmit").click(function () {
        var roomlist =new Array ();
        var index = 0;
        selectId = $("#chooseroom option:selected").attr("value");
        $("#roomlist").find("li").each(function () {
            /* alert($(this).text());*/
            roomlist[index]=$(this).text();
            index++;
        })
        $.ajax({
            type:"post",
            url:"http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_addBuildingInfo.json",
            dateType: "json",
            data:{parentId:selectId,buildings:roomlist.join(",")},
            success:function (data) {
                alert(data.msg);
            }
        })
    })

    $("#building-submit").click(function () {
        var province = $("#choose-province option:selected").text();
        var city = $("#choose-city option:selected").text();
        var area = $("#choose-local option:selected").text();
        var street = $("#choose-street option:selected").text();
        var detail = $("#detail").val();
        var buildingName = $("#buildingName").val();
        console.log(province);
        console.log(city);
        console.log(area);
        console.log(street);
        console.log(buildingName);
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_addBuildingInfoAndHousePropertyAddr.json",
            type:"POST",
            dataType:"JSON",
            data:{province:province,city:city,area:area,street:street,detail:detail,buildingName:buildingName},
            success:function (data) {
                if(data.success){
                    alert("提交成功！");
                }
                else{
                    alert("提交失败！");
                }
            }
        })
    })
})

