/**
 * Created by JAMES on 2017/3/17.
 */
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
                "<div class='item active'>"+"<img src="+"http://xihashao.tunnel.2bdata.com/JGX"+imglist[btnId]+"> </div>"
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
                        $(".pagination").append(
                            "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                        )
                    }
                    $(".pagination").on("click","a",function () {
                        $(".table-striped tbody tr").remove();
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
                                                + "<td><input name='subBox' type='checkbox' value='1'>"
                                                + "</td><td>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td>"
                                                + item.userName + "</td><td>"
                                                + item.userTel + "</td><td>"
                                                +item.questionOne +item.questionTwo + "</td><td>"
                                                + time + "</td><td>"
                                                + "正常单" + "</td>"
                                                + "<td class='button-flex'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
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
                            + "<td><input name='subBox' type='checkbox' value='1'>"
                            + "</td><td>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td>"
                            + item.userName + "</td><td>"
                            + item.userTel + "</td><td>"
                            +item.questionOne +item.questionTwo + "</td><td>"
                            + time + "</td><td>"
                            + "正常单" + "</td>"
                            + "<td class='button-flex'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
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
                                                    + "<td><input name='subBox' type='checkbox' value='1'>"
                                                    + "</td><td>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td>"
                                                    + item.userName + "</td><td>"
                                                    + item.userTel + "</td><td>"
                                                    +item.questionOne +item.questionTwo + "</td><td>"
                                                    + time + "</td><td>"
                                                    + "正常单" + "</td>"
                                                    + "<td class='button-flex'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
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
                                + "<td ><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td >" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td >"
                                + item.userName + "</td><td >"
                                + item.userTel + "</td><td>"
                                +item.questionOne +item.questionTwo + "</td><td >"
                                + time + "</td><td>"
                                + "转单" + "</td>"
                                + "<td class='button-flex' ><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
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
                                                + "<td ><input name='subBox' type='checkbox' value='1'>"
                                                + "</td><td >" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td>"
                                                + item.userName + "</td><td>"
                                                + item.userTel + "</td><td >"
                                                +item.questionOne +item.questionTwo + "</td><td >"
                                                + time + "</td><td >"
                                                + "正常单" + "</td>"
                                                + "<td class='button-flex'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
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
                                + "<td ><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td >"
                                + item.userName + "</td><td >"
                                + item.userTel + "</td><td >"
                                +item.questionOne +item.questionTwo + "</td><td >"
                                + time + "</td><td >"
                                + "异常单" + "</td>"
                                + "<td class='button-flex' ><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
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
                                                + "<td ><input name='subBox' type='checkbox' value='1'>"
                                                + "</td><td>" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td >"
                                                + item.userName + "</td><td>"
                                                + item.userTel + "</td><td>"
                                                +item.questionOne +item.questionTwo + "</td><td>"
                                                + time + "</td><td >"
                                                + "正常单" + "</td>"
                                                + "<td class='button-flex'><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
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
                                + "<td ><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td >" + item.buildingName + item.buildingNum + item.buildingHouseNum + "</td><td >"
                                + item.userName + "</td><td >"
                                + item.userTel + "</td><td >"
                                +item.questionOne +item.questionTwo + "</td><td>"
                                + time + "</td><td >"
                                + "正常单" + "</td>"
                                + "<td class='button-flex' ><button type='button' name='imgbutton' class='btn btn-primary' id='"+item.id+"' data-toggle='modal' data-target='#myModal'>查看</button>" + "<button type='button' class='btn btn-primary'>派单</button></td></tr>"
                            );
                        })
                    }
                }
            })
        })
    }
)

function showTime(){
    var today = new Date();
    var y = today.getFullYear();
    var M = today.getMonth()+1;
    var d = today.getDate();
    var w = today.getDay();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var week=['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    $('#TIME').html(y+'年'+M+'月'+d+"日 "+'&nbsp;'+week[w]+'&nbsp;&nbsp;'+h+':'+m+':'+s);//可改变格式
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    setTimeout("showTime()",1000);
}
$(document).ready(function () {
    showTime();
})