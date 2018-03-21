/**
 * Created by xt on 2017/3/9.
 */
$(document).ready(
    function() {
        var btnId;
        var imglist = new Array();
        $(document).on("click","button[name='imgbutton']",function () {
            btnId=$(this).attr("id");
            $("#imgquestion").empty();
            $("#imgquestion").append(
                "<div class='item active'>"+"<img src="+imglist[btnId]+"> </div>"
            )
        })
        function formatTime (strTime) {
            if(strTime == null)
                return "";
            var date = new Date(strTime);
            return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        }

        $.ajax({
            type: "post",
            url: "http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
            dateType: "json",
            data:{orderStatus:"5"},
            success: function (data) {
                if (data.success) {
                    /*分页实现*/
                    var pageNum = data.pageNum;
                    for(var i = 1;i <=  pageNum;i ++){
                        var attrId = i;
                        $(".pagination-lg").append(
                            "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                        )
                    }
                    $(".pagination-lg").on("click","a",function () {
                        $(".table-scroll tr").remove();
                        var pageId = $(this).attr("id");
                        $.ajax({
                                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                type:"POST",
                                dataType:"json",
                                data:{orderStatus:"5",pageSize:"5",startPage:pageId},
                                success:function (data) {
                                    if(data.success){
                                        $.each(data.repairOrderList,function (index,item) {
                                            var time=formatTime(item.createDate);
                                            var ind=index+1;
                                            $("tbody").append(
                                                "<tr class='list_1'>"
                                                + "<td style='width:5%'><input name='subBox' type='checkbox' value='1'>"
                                                + "</td><td style='width: 15%'>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td style='width:10%'>"
                                                + item.userName + "</td><td style='width:21%'>"
                                                + item.userTel + "</td><td style='width:10%'>"
                                                +item.questionOne +item.questionTwo + "</td><td style='width:15%'>"
                                                + time + "</td><td style='width:10%'>"
                                                + "正常单" + "</td>"
                                                + "<td class='button-flex' style='width:14%'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
                                            );
                                        })
                                    }
                                }
                            }
                        )
                    })
                    $.each(data.repairOrderList, function (index, item) {
                        /*加入数据*/
                        imglist[item.id]=item.rapairPicUrls;
                            var time=formatTime(item.createDate);
                            $("tbody").append(
                                "<tr class='list_1'>"
                                + "<td style='width:5%'><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td style='width: 15%'>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td style='width:10%'>"
                                + item.userName + "</td><td style='width:21%'>"
                                + item.userTel + "</td><td style='width:10%'>"
                                +item.questionOne +item.questionTwo + "</td><td style='width:15%'>"
                                + time + "</td><td style='width:10%'>"
                                + "正常单" + "</td>"
                                + "<td class='button-flex' style='width:14%'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
                            );
                        })
                }
            }
        });
        $("#changeDispatch").click(function () {
            $.ajax({
                type: "post",
                url: "http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dateType: "json",
                data:{orderStatus:"6"},
                success:function (data) {
                    if (data.success) {
                        /*分页实现*/
                        var pageNum = data.pageNum;
                        for(var i = 1;i <=  pageNum;i ++){
                            var attrId = i;
                            $(".pagination-lg li").remove();
                            $(".pagination-lg").append(
                                "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                            )
                        }
                        $(".pagination-lg").on("click","a",function () {
                            $(".table-scroll tr").remove();
                            var pageId = $(this).attr("id");
                            $.ajax({
                                    url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                    type:"POST",
                                    dataType:"json",
                                    data:{orderStatus:"6",pageSize:"5",startPage:pageId},
                                    success:function (data) {
                                        if(data.success){
                                            $.each(data.repairOrderList,function (index,item) {
                                                var time=formatTime(item.createDate);
                                                var ind=index+1;
                                                $("tbody").append(
                                                    "<tr class='list_1'>"
                                                    + "<td style='width:5%'><input name='subBox' type='checkbox' value='1'>"
                                                    + "</td><td style='width: 15%'>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td style='width:10%'>"
                                                    + item.userName + "</td><td style='width:21%'>"
                                                    + item.userTel + "</td><td style='width:10%'>"
                                                    +item.questionOne +item.questionTwo + "</td><td style='width:15%'>"
                                                    + time + "</td><td style='width:10%'>"
                                                    + "正常单" + "</td>"
                                                    + "<td class='button-flex' style='width:14%'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
                                                );
                                            })
                                        }
                                    }
                                }
                            )
                        })
                        $("tbody").empty();
                        $.each(data.repairOrderList, function (index, item) {
                            imglist[item.id]=item.rapairPicUrls;
                            var time=formatTime(item.createDate);
                            $("tbody").append(
                                "<tr class='list_1'>"
                                + "<td style='width:5%'><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td style='width: 15%'>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td style='width:10%'>"
                                + item.userName + "</td><td style='width:21%'>"
                                + item.userTel + "</td><td style='width:10%'>"
                                +item.questionOne +item.questionTwo + "</td><td style='width:15%'>"
                                + time + "</td><td style='width:10%'>"
                                + "转单" + "</td>"
                                + "<td class='button-flex' style='width:14%'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
                            );
                        })
                    }
                }
            })
        })
        $("#abnormalDispatch").click(function () {
            $.ajax({
                type: "post",
                url: "http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dateType: "json",
                data:{orderStatus:"7"},
                success:function (data) {
                    /*分页实现*/
                    var pageNum = data.pageNum;
                    for(var i = 1;i <=  pageNum;i ++){
                        var attrId = i;
                        $(".pagination-lg li").remove();
                        $(".pagination-lg").append(
                            "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                        )
                    }
                    $(".pagination-lg").on("click","a",function () {
                        $(".table-scroll tr").remove();
                        var pageId = $(this).attr("id");
                        $.ajax({
                                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                type:"POST",
                                dataType:"json",
                                data:{orderStatus:"7",pageSize:"5",startPage:pageId},
                                success:function (data) {
                                    if(data.success){
                                        $.each(data.repairOrderList,function (index,item) {
                                            var time=formatTime(item.createDate);
                                            var ind=index+1;
                                            $("tbody").append(
                                                "<tr class='list_1'>"
                                                + "<td style='width:5%'><input name='subBox' type='checkbox' value='1'>"
                                                + "</td><td style='width: 15%'>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td style='width:10%'>"
                                                + item.userName + "</td><td style='width:21%'>"
                                                + item.userTel + "</td><td style='width:10%'>"
                                                +item.questionOne +item.questionTwo + "</td><td style='width:15%'>"
                                                + time + "</td><td style='width:10%'>"
                                                + "正常单" + "</td>"
                                                + "<td class='button-flex' style='width:14%'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
                                            );
                                        })
                                    }
                                }
                            }
                        )
                    })
                    if (data.success) {
                        $("tbody").empty();
                        $.each(data.repairOrderList, function (index, item) {
                            imglist[item.id]=item.rapairPicUrls;
                            var time=formatTime(item.createDate);
                            $("tbody").append(
                                "<tr class='list_1'>"
                                + "<td style='width:5%'><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td style='width: 15%'>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td style='width:10%'>"
                                + item.userName + "</td><td style='width:21%'>"
                                + item.userTel + "</td><td style='width:10%'>"
                                +item.questionOne +item.questionTwo + "</td><td style='width:15%'>"
                                + time + "</td><td style='width:10%'>"
                                + "异常单" + "</td>"
                                + "<td class='button-flex' style='width:14%'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
                            );
                        })
                    }
                }
            })
        })
        $("#normalDispatch").click(function () {
            $.ajax({
                type: "post",
                url: "http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dateType: "json",
                data:{orderStatus:"5"},
                success:function (data) {
                    /*分页实现*/
                    var pageNum = data.pageNum;
                    for(var i = 1;i <=  pageNum;i ++){
                        var attrId = i;
                        $(".pagination-lg li").remove();
                        $(".pagination-lg").append(
                            "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                        )
                    }
                    $(".pagination-lg").on("click","a",function () {
                        $(".table-scroll tr").remove();
                        var pageId = $(this).attr("id");
                        $.ajax({
                                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                type:"POST",
                                dataType:"json",
                                data:{orderStatus:"5",pageSize:"5",startPage:pageId},
                                success:function (data) {
                                    if(data.success){
                                        $.each(data.repairOrderList,function (index,item) {
                                            var time=formatTime(item.createDate);
                                            var ind=index+1;
                                            $("tbody").append(
                                                "<tr class='list_1'>"
                                                + "<td style='width:5%'><input name='subBox' type='checkbox' value='1'>"
                                                + "</td><td style='width: 15%'>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td style='width:10%'>"
                                                + item.userName + "</td><td style='width:21%'>"
                                                + item.userTel + "</td><td style='width:10%'>"
                                                +item.questionOne +item.questionTwo + "</td><td style='width:15%'>"
                                                + time + "</td><td style='width:10%'>"
                                                + "正常单" + "</td>"
                                                + "<td class='button-flex' style='width:14%'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
                                            );
                                        })
                                    }
                                }
                            }
                        )
                    })
                    if (data.success) {
                        $("tbody").empty();
                        $.each(data.repairOrderList, function (index, item) {
                            imglist[item.id]=item.rapairPicUrls;
                            var time=formatTime(item.createDate);
                            $("tbody").append(
                                "<tr class='list_1'>"
                                + "<td style='width:5%'><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td style='width: 15%'>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td style='width:10%'>"
                                + item.userName + "</td><td style='width:21%'>"
                                + item.userTel + "</td><td style='width:10%'>"
                                +item.questionOne +item.questionTwo + "</td><td style='width:15%'>"
                                + time + "</td><td style='width:10%'>"
                                + "正常单" + "</td>"
                                + "<td class='button-flex' style='width:14%'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
                            );
                        })
                    }
                }
            })
        })
    }
    )