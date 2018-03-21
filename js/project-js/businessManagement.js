/**
 * Created by weiaohan on 2017/3/6.
 */

//时间戳转换函数
function formatTime (strTime){
    if(strTime == null)
        return "";
    var date = new Date(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
<<<<<<< HEAD
=======
/**
 * Created by JAMES on 2017/3/3.
 */
>>>>>>> 6730b8da274153d69c50effb94f523db3f82f890

$(document).ready(function(){
    var buttRedispatch = $("#buttRedispatch");
    var dispatchOver = $("#dispatchOver");
    var dispatchPause = $("#dispatchPause");
    var dispatchGoOn = $("#dispatchGoOn");
    //实现全选功能
    $("#allChoose").click(function () {
        if($(this).prop("checked")==true){
            $("tbody :checkbox").each(function () {
                $("tbody :checkbox").prop("checked",true);
            })
        }
        else{
            $("tbody :checkbox").each(function () {
                $("tbody :checkbox").prop("checked",false);
            })
        }
    })
    //4个筛选器操作
    //待派单
<<<<<<< HEAD
        $("#waitOrder").click(function () {
            if($(this).attr("checked")=="checked"){
                $(this).removeAttr("checked");
                $(".pagination-lg li").remove();
                $(".table-striped tbody tr").remove();
                buttRedispatch.css("visibility","visible");
                dispatchGoOn.css("visibility","visible");
            }
            else {
                $(this).attr("checked","checked");
                buttRedispatch.css("visibility","hidden");
                dispatchGoOn.css("visibility","hidden");
                $.ajax({
                    type:"POST",
                    url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                    dataType:"json",
                    data:{orderStatus:"1"},
                    success:function (data) {
                        console.log(data);
                        if(data.success){
                            //动态生成分页页码
                            var pageNum = data.pageNum;
                            for(var i = 1;i <=  pageNum;i ++){
                                var attrId = i;
                                $(".pagination-lg").append(
                                    "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                                )
                            }
                            //遍历返回的数据动态生成数据列表
                            $.each(data.repairOrderList,function (index,item) {
                                var ind=index;
                              $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+1+"</label></div></td>"+
=======
    $("#waitOrder").click(function () {
        if($(this).attr("checked")=="checked"){
            $(this).removeAttr("checked");
            $(".pagination-lg li").remove();
            $(".table-striped tbody tr").remove();
            buttRedispatch.css("visibility","visible");
            dispatchGoOn.css("visibility","visible");
        }
        else {
            $(this).attr("checked","checked");
            buttRedispatch.css("visibility","hidden");
            dispatchGoOn.css("visibility","hidden");
            $.ajax({
                type:"POST",
                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dataType:"json",
                data:{orderStatus:"1"},
                success:function (data) {
                    console.log(data);
                    if(data.success){
                        //动态生成分页页码
                        var pageNum = data.pageNum;
                        for(var i = 1;i <=  pageNum;i ++){
                            var attrId = i;
                            $(".pagination-lg").append(
                                "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                            )
                        }
                        //遍历返回的数据动态生成数据列表
                        $.each(data.repairOrderList,function (index,item) {
                            var ind=index;
                            $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+1+"</label></div></td>"+
>>>>>>> 6730b8da274153d69c50effb94f523db3f82f890
                                "<td>"+item.orderNumber+"</td>"+
                                "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                "<td>"+formatTime(item.grabTime)+"</td>"+
                                "<td>"+item.userName+"</td>"+
                                "<td>"+item.userTel+"</td>"+
                                "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+"<td>"+item.exceptionRemark+"</td>"
                                +"</tr>")
<<<<<<< HEAD
                            })
                            //实现分页跳转
                            $(".pagination-lg").on("click","a",function () {
                                $(".table-striped tbody tr").remove();
                                var pageId = $(this).attr("id");
                                $.ajax({
                                        url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                        type:"POST",
                                        dataType:"json",
                                        data:{orderStatus:"8",pageSize:"5",startPage:pageId},
                                        success:function (data) {
                                            if(data.success){
                                                $.each(data.repairOrderList,function (index,item) {
                                                    var ind=index+1;
                                                    $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                                        "<td>"+item.orderNumber+"</td>"+
                                                        "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                                        "<td>"+formatTime(item.grabTime)+"</td>"+
                                                        "<td>"+item.userName+"</td>"+
                                                        "<td>"+item.userTel+"</td>"+
                                                        "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                                        "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+
                                                        "<td>"+item.exceptionRemark+"</td>"
                                                        +"</tr>")
                                                })
                                            }
                                        }
                                    }
                                )
                            })
                        }
                    }
                })
            }
        })
=======
                        })
                        //实现分页跳转
                        $(".pagination-lg").on("click","a",function () {
                            $(".table-striped tbody tr").remove();
                            var pageId = $(this).attr("id");
                            $.ajax({
                                    url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                    type:"POST",
                                    dataType:"json",
                                    data:{orderStatus:"8",pageSize:"5",startPage:pageId},
                                    success:function (data) {
                                        if(data.success){
                                            $.each(data.repairOrderList,function (index,item) {
                                                var ind=index+1;
                                                $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                                    "<td>"+item.orderNumber+"</td>"+
                                                    "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                                    "<td>"+formatTime(item.grabTime)+"</td>"+
                                                    "<td>"+item.userName+"</td>"+
                                                    "<td>"+item.userTel+"</td>"+
                                                    "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                                    "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+
                                                    "<td>"+item.exceptionRemark+"</td>"
                                                    +"</tr>")
                                            })
                                        }
                                    }
                                }
                            )
                        })
                    }
                }
            })
        }
    })
>>>>>>> 6730b8da274153d69c50effb94f523db3f82f890
    //已派单
    $("#ordered").click(function () {
        if($(this).attr("checked")=="checked"){
            $(this).removeAttr("checked");
            $(".pagination-lg li").remove();
            $(".table-striped tbody tr").remove();
            buttRedispatch.css("visibility","visible");
            dispatchGoOn.css("visibility","visible");
        }
        else {
            $(this).attr("checked","checked");
            buttRedispatch.css("visibility","hidden");
            dispatchGoOn.css("visibility","hidden");
            $.ajax({
                type:"POST",
                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dataType:"json",
                data:{orderStatus:"2"},
                success:function (data) {
                    var pageNum = data.pageNum;
                    for(var i = 1;i <=  pageNum;i ++){
                        var attrId = i;
                        $(".pagination-lg").append(
                            "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                        )
                    }
                    console.log(data);
                    if(data.success){
                        $.each(data.repairOrderList,function (index,item) {
                            var ind=index+1;
                            $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                "<td>"+item.orderNumber+"</td>"+
                                "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                "<td>"+formatTime(item.grabTime)+"</td>"+
                                "<td>"+item.userName+"</td>"+
                                "<td>"+item.userTel+"</td>"+
                                "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+"<td>"+item.exceptionRemark+"</td>"
                                +"</tr>")
                        })
                        $(".pagination-lg").on("click","a",function () {
                            $(".table-striped tbody tr").remove();
                            var pageId = $(this).attr("id");
                            $.ajax({
                                    url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                    type:"POST",
                                    dataType:"json",
                                    data:{orderStatus:"8",pageSize:"5",startPage:pageId},
                                    success:function (data) {
                                        if(data.success){
                                            $.each(data.repairOrderList,function (index,item) {
                                                var ind=index+1;
                                                $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                                    "<td>"+item.orderNumber+"</td>"+
                                                    "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                                    "<td>"+formatTime(item.grabTime)+"</td>"+
                                                    "<td>"+item.userName+"</td>"+
                                                    "<td>"+item.userTel+"</td>"+
                                                    "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                                    "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+
                                                    "<td>"+item.exceptionRemark+"</td>"
                                                    +"</tr>")
                                            })
                                        }
                                    }
                                }
                            )
                        })
                    }
                }
            })
        }
    })
    //维修中
    $("#fixing").click(function () {
        if($(this).attr("checked")=="checked"){
            $(this).removeAttr("checked");
            $(".table-striped tbody tr").remove();
            $(".pagination-lg li").remove();
            buttRedispatch.css("visibility","visible");
            dispatchGoOn.css("visibility","visible");
        }
        else {
            $(this).attr("checked","checked");
            buttRedispatch.css("visibility","hidden");
            dispatchGoOn.css("visibility","hidden");
            $.ajax({
                type:"POST",
                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dataType:"json",
                data:{orderStatus:"4"},
                success:function (data) {
                    console.log(data);
                    if(data.success){
                        var pageNum = data.pageNum;
                        for(var i = 1;i <=  pageNum;i ++){
                            var attrId = i;
                            $(".pagination-lg").append(
                                "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                            )
                        }
                        $.each(data.repairOrderList,function (index,item) {
                            var ind=index+1;
                            $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                "<td>"+item.orderNumber+"</td>"+
                                "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                "<td>"+formatTime(item.grabTime)+"</td>"+
                                "<td>"+item.userName+"</td>"+
                                "<td>"+item.userTel+"</td>"+
                                "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+"<td>"+item.exceptionRemark+"</td>"
                                +"</tr>")
                        })
                        $(".pagination-lg").on("click","a",function () {
                            $(".table-striped tbody tr").remove();
                            var pageId = $(this).attr("id");
                            $.ajax({
                                    url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                    type:"POST",
                                    dataType:"json",
                                    data:{orderStatus:"8",pageSize:"5",startPage:pageId},
                                    success:function (data) {
                                        if(data.success){
                                            $.each(data.repairOrderList,function (index,item) {
                                                var ind=index+1;
                                                $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                                    "<td>"+item.orderNumber+"</td>"+
                                                    "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                                    "<td>"+formatTime(item.grabTime)+"</td>"+
                                                    "<td>"+item.userName+"</td>"+
                                                    "<td>"+item.userTel+"</td>"+
                                                    "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                                    "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+
                                                    "<td>"+item.exceptionRemark+"</td>"
                                                    +"</tr>")
                                            })
                                        }
                                    }
                                }
                            )
                        })
                    }
                }
            })
        }
    })
    //派单成功
    $("#successOrder").click(function () {
        if($(this).attr("checked")=="checked"){
            $(this).removeAttr("checked");
            $(".table-striped tbody tr").remove();
            $(".pagination-lg li").remove();
            buttRedispatch.css("visibility","visible");
            dispatchGoOn.css("visibility","visible");
        }
        else {
            $(this).attr("checked","checked");
            buttRedispatch.css("visibility","hidden");
            dispatchGoOn.css("visibility","hidden");
            $.ajax({
                type:"POST",
                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dataType:"json",
                data:{orderStatus:"3"},
                success:function (data) {
                    console.log(data);
                    if(data.success){
                        var pageNum = data.pageNum;
                        for(var i = 1;i <=  pageNum;i ++){
                            var attrId = i;
                            $(".pagination-lg").append(
                                "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                            )
                        }
                        $.each(data.repairOrderList,function (index,item) {
                            var ind=index+1;
                            $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                "<td>"+item.orderNumber+"</td>"+
                                "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                "<td>"+formatTime(item.grabTime)+"</td>"+
                                "<td>"+item.userName+"</td>"+
                                "<td>"+item.userTel+"</td>"+
                                "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+"<td>"+item.exceptionRemark+"</td>"
                                +"</tr>")
                        })
                        $(".pagination-lg").on("click","a",function () {
                            $(".table-striped tbody tr").remove();
                            var pageId = $(this).attr("id");
                            $.ajax({
                                    url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                    type:"POST",
                                    dataType:"json",
                                    data:{orderStatus:"8",pageSize:"5",startPage:pageId},
                                    success:function (data) {
                                        if(data.success){
                                            $.each(data.repairOrderList,function (index,item) {
                                                var ind=index+1;
                                                $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                                    "<td>"+item.orderNumber+"</td>"+
                                                    "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                                    "<td>"+formatTime(item.grabTime)+"</td>"+
                                                    "<td>"+item.userName+"</td>"+
                                                    "<td>"+item.userTel+"</td>"+
                                                    "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                                    "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+
                                                    "<td>"+item.exceptionRemark+"</td>"
                                                    +"</tr>")
                                            })
                                        }
                                    }
                                }
                            )
                        })
                    }
                }
            })
        }
    })
    //点击待评价复选框
    $("#wait").click(function () {
        if($(this).attr("checked")=="checked"){
            $(this).removeAttr("checked");
            $(".table-striped tbody tr").remove();
            $(".pagination-lg li").remove();
            buttRedispatch.css("visibility","visible");
            dispatchPause.css("visibility","visible");
            dispatchGoOn.css("visibility","visible");
        }
        else{
            $(this).attr("checked","checked");
            buttRedispatch.css("visibility","hidden");
            dispatchPause.css("visibility","hidden");
            dispatchGoOn.css("visibility","hidden");
            $.ajax({
                type:"POST",
                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dataType:"json",
                data:{orderStatus:"5"},
                success:function (data) {
                    console.log(data);
                    if(data.success){
                        var pageNum = data.pageNum;
                        for(var i = 1;i <=  pageNum;i ++){
                            var attrId = i;
                            $(".pagination-lg").append(
                                "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                            )
                        }
                        $.each(data.repairOrderList,function (index,item) {
                            var ind=index+1;
                            $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                "<td>"+item.orderNumber+"</td>"+
                                "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                "<td>"+formatTime(item.grabTime)+"</td>"+
                                "<td>"+item.userName+"</td>"+
                                "<td>"+item.userTel+"</td>"+
                                "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+"<td>"+item.exceptionRemark+"</td>"
                                +"</tr>")
                        })
                        $(".pagination-lg").on("click","a",function () {
                            $(".table-striped tbody tr").remove();
                            var pageId = $(this).attr("id");
                            $.ajax({
                                    url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                    type:"POST",
                                    dataType:"json",
                                    data:{orderStatus:"8",pageSize:"5",startPage:pageId},
                                    success:function (data) {
                                        if(data.success){
                                            $.each(data.repairOrderList,function (index,item) {
                                                var ind=index+1;
                                                $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                                    "<td>"+item.orderNumber+"</td>"+
                                                    "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                                    "<td>"+formatTime(item.grabTime)+"</td>"+
                                                    "<td>"+item.userName+"</td>"+
                                                    "<td>"+item.userTel+"</td>"+
                                                    "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                                    "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+
                                                    "<td>"+item.exceptionRemark+"</td>"
                                                    +"</tr>")
                                            })
                                        }
                                    }
                                }
                            )
                        })
                    }
                }
            })
        }
    })
    //转单时的按钮隐藏
    $("#transDispatch").click(function () {
        var transDispatch = $("#transDispatch");
        if(transDispatch.attr("checked")=="checked"){
            transDispatch.removeAttr("checked");
            $(".table-striped tbody tr").remove();
            $(".pagination-lg li").remove();
            dispatchGoOn.css("visibility","visible");
        }
        else{
            transDispatch.attr("checked","checked");
            dispatchGoOn.css("visibility","hidden");
            $.ajax({
                type:"POST",
                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dataType:"json",
                data:{orderStatus:"6"},
                success:function (data) {
                    console.log(data);
                    if(data.success){
                        var pageNum = data.pageNum;
                        for(var i = 1;i <=  pageNum;i ++){
                            var attrId = i;
                            $(".pagination-lg").append(
                                "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                            )
                        }
                        $.each(data.repairOrderList,function (index,item) {
                            var ind=index+1;
                            $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                "<td>"+item.orderNumber+"</td>"+
                                "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                "<td>"+formatTime(item.grabTime)+"</td>"+
                                "<td>"+item.userName+"</td>"+
                                "<td>"+item.userTel+"</td>"+
                                "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+"<td>"+item.exceptionRemark+"</td>"
                                +"</tr>")
                        })
                        $(".pagination-lg").on("click","a",function () {
                            $(".table-striped tbody tr").remove();
                            var pageId = $(this).attr("id");
                            $.ajax({
                                    url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                    type:"POST",
                                    dataType:"json",
                                    data:{orderStatus:"8",pageSize:"5",startPage:pageId},
                                    success:function (data) {
                                        if(data.success){
                                            $.each(data.repairOrderList,function (index,item) {
                                                var ind=index+1;
                                                $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                                    "<td>"+item.orderNumber+"</td>"+
                                                    "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                                    "<td>"+formatTime(item.grabTime)+"</td>"+
                                                    "<td>"+item.userName+"</td>"+
                                                    "<td>"+item.userTel+"</td>"+
                                                    "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                                    "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+
                                                    "<td>"+item.exceptionRemark+"</td>"
                                                    +"</tr>")
                                            })
                                        }
                                    }
                                }
                            )
                        })
                    }
                }
            })
        }
    })
    //异常订单
    $("#unusualDispatch").click(function () {
        if($(this).attr("checked")=="checked"){
            $(this).removeAttr("checked");
            $(".table-striped tbody tr").remove();
            $(".pagination-lg li").remove();
        }
        else{
            $(this).attr("checked","checked");
            $.ajax({
                type:"POST",
                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dataType:"json",
                data:{orderStatus:"7"},
                success:function (data) {
                    console.log(data);
                    if(data.success){
                        var pageNum = data.pageNum;
                        for(var i = 1;i <=  pageNum;i ++){
                            var attrId = i;
                            $(".pagination-lg").append(
                                "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                            )
                        }
                        $.each(data.repairOrderList,function (index,item) {
                            var ind=index+1;
                            $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                "<td>"+item.orderNumber+"</td>"+
                                "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                "<td>"+formatTime(item.grabTime)+"</td>"+
                                "<td>"+item.userName+"</td>"+
                                "<td>"+item.userTel+"</td>"+
                                "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+"<td>"+item.exceptionRemark+"</td>"
                                +"</tr>")
                        })
                        $(".pagination-lg").on("click","a",function () {
                            $(".table-striped tbody tr").remove();
                            var pageId = $(this).attr("id");
                            $.ajax({
                                    url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                    type:"POST",
                                    dataType:"json",
                                    data:{orderStatus:"8",pageSize:"5",startPage:pageId},
                                    success:function (data) {
                                        if(data.success){
                                            $.each(data.repairOrderList,function (index,item) {
                                                var ind=index+1;
                                                $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                                    "<td>"+item.orderNumber+"</td>"+
                                                    "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                                    "<td>"+formatTime(item.grabTime)+"</td>"+
                                                    "<td>"+item.userName+"</td>"+
                                                    "<td>"+item.userTel+"</td>"+
                                                    "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                                    "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+
                                                    "<td>"+item.exceptionRemark+"</td>"
                                                    +"</tr>")
                                            })
                                        }
                                    }
                                }
                            )
                        })
                    }
                }
            })

        }
    })
    //结束订单状态
    $("#stopDispatch").click(function () {
        var stopDispatch = $("#stopDispatch");
        if(stopDispatch.attr("checked")=="checked"){
            stopDispatch.removeAttr("checked");
            $(".table-striped tbody tr").remove();
            buttRedispatch.css("visibility","visible");
            dispatchOver.css("visibility","visible");
            dispatchPause.css("visibility","visible");
            dispatchGoOn.css("visibility","visible");
            $(".pagination-lg li").remove();
        }
        else{
            stopDispatch.attr("checked","checked");
            buttRedispatch.css("visibility","hidden");
            dispatchOver.css("visibility","hidden");
            dispatchPause.css("visibility","hidden");
            dispatchGoOn.css("visibility","hidden");
            $.ajax({
                type:"POST",
                url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                dataType:"json",
                data:{orderStatus:"8",pageSize:"5",startPage:"1"},
                success:function (data) {
                    console.log(data.repairOrderList[0].exceptionRemark);
                    if(data.success){
                        var pageNum = data.pageNum;
                        for(var i = 1;i <=  pageNum;i ++){
                            var attrId = i;
                            $(".pagination-lg").append(
                                "<li><a href='#' id='"+attrId+"'>"+i+"</a></li>"
                            )
                        }
                        $.each(data.repairOrderList,function (index,item) {
                            var ind=index+1;
                            $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                "<td>"+item.orderNumber+"</td>"+
                                "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                "<td>"+formatTime(item.grabTime)+"</td>"+
                                "<td>"+item.userName+"</td>"+
                                "<td>"+item.userTel+"</td>"+
                                "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+
                                "<td>"+item.exceptionRemark+"</td>"
                                +"</tr>")
                        })
                        $(".pagination-lg").on("click","a",function () {
                            $(".table-striped tbody tr").remove();
                            var pageId = $(this).attr("id");
                            $.ajax({
                                    url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_queryRepairOrder.json",
                                    type:"POST",
                                    dataType:"json",
                                    data:{orderStatus:"8",pageSize:"5",startPage:pageId},
                                    success:function (data) {
                                        if(data.success){
                                            $.each(data.repairOrderList,function (index,item) {
                                                var ind=index+1;
                                                $("tbody").append("<tr>"+ "<td><div class='checkbox'><label><input type='checkbox' name='checkbox' value='"+item.id+"'>"+0+ind+"</label></div></td>"+
                                                    "<td>"+item.orderNumber+"</td>"+
                                                    "<td>"+formatTime(item.sendOrderTime)+"</td>"+
                                                    "<td>"+formatTime(item.grabTime)+"</td>"+
                                                    "<td>"+item.userName+"</td>"+
                                                    "<td>"+item.userTel+"</td>"+
                                                    "<td>"+"1."+item.questionOne+"<br>"+"2."+item.questionTwo+"</td>"+
                                                    "<td>"+item.buildingName+item.buildingNum+item.buildingHouseNum+"</td>"+
                                                    "<td>"+item.exceptionRemark+"</td>"
                                                    +"</tr>")
                                            })
                                        }
                                    }
                                }
                            )
                        })
                    }
                }
            })
        }
    })
    //实现复选框单选功能
    $(function () {
        var checkBox = $("#oneCheck input[type=checkbox]");
        checkBox.click(function () {
            if($(this).attr("checked")=="checked"){
                checkBox.attr("disabled","disabled");
                $(this).removeAttr("disabled");
            }
            else{
                checkBox.removeAttr("disabled");
            }
        })
    })
    //重新派单
    $("#buttRedispatch").click(function () {
        var checkedItems = new Array();
        var index = 0;
        $("tbody td input:checkbox").each(function () {
            if($(this).prop("checked")==true){
                var item = $(this).val();
                checkedItems[index] = item;
                index ++;
            }
        })
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_developUser_ReOrder.json",
            dataType:"JSON",
            type:"POST",
            data:{ids:checkedItems.join(",")},
            success:function (data) {
                if(data.success){
                    alert(data.msg);
                    location.reload();
                }
                else{
                    alert(data.msg);
                }
            }
        })
    })
    //结束按钮
    $("#confirmStop").click(function () {
        var checkedItems = new Array();
        var index = 0;
        $("tbody td input:checkbox").each(function () {
            if($(this).prop("checked")==true){
                var item = $(this).val();
                checkedItems[index] = item;
                index ++;
            }
        })
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_endRepairOrder.json",
            dataType:"JSON",
            type:"POST",
            data:{ids:checkedItems.join(",")},
            success:function (data) {
                if(data.success){
                    alert(data.msg);
                    location.reload();
                }
                else{
                    alert(data.msg);
                }
            }
        })
    })
    //继续按钮
    $("#dispatchGoOn").click(function () {
        var checkedItems = new Array();
        var index = 0;
        $("tbody td input:checkbox").each(function () {
            if($(this).prop("checked")==true){
                var item = $(this).val();
                checkedItems[index] = item;
                index ++;
            }
        })
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_continueOrder.json",
            dataType:"JSON",
            type:"POST",
            data:{ids:checkedItems.join(",")},
            success:function (data) {
                if(data.success){
                    alert(data.msg);
                    location.reload();
                }
                else{
                    alert(data.msg);
                }
            }
        })
    })
    //暂停按钮
    $("#dispatchPause").click(function () {
        var checkedItems = new Array();
        var index = 0;
        var exceptionRemark = $("tbody td:last").text()
        $("tbody td input:checkbox").each(function () {
            if($(this).prop("checked")==true){
                var item = $(this).val();
                checkedItems[index] = item;
                index ++;
            }
        })
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/RepairOrder_adminTurnException.json",
            dataType:"JSON",
            type:"POST",
            data:{roId:checkedItems.join(","),exceptionRemark:exceptionRemark},
            success:function (data) {
                if(data.success){
                    alert(data.msg);
                    location.reload();
                }
                else{
                    alert(data.msg);
                }
            }
        })
    })
})
<<<<<<< HEAD
    //实现搜索功能
    /*$("#btn_search").click(function () {
        $(".table-striped tbody tr").remove();
        $.ajax({
            type:"GET",
            url:"../data-weiaohan.json",
            dataType:"json",
            success:function (data) {
                var name=$(this).val();
                var phone=$(this).val();
                for(i=0;i<8;i++){
                    if(data.data[i].username==name||data.data[i].phone==phone){
                        $("tbody").append("<tr>"+
                            "<td><div class='checkbox'><label><input type='checkbox' name='checkbox'>"+"0"+i+"</label></div></td>"+
                            "<td>"+data.data[i].orderId+"</td>"+
                            "<td>"+$.myTime.UnixToDate(data.data[i].date)+"</td>"+
                            "<td></td>"+
                            "<td>"+data.data[i].username+"</td>"+
                            "<td>"+data.data[i].phone+"</td>"+
                            "<td>"+"1."+data.data[i].problem[0].one+"<br>"+"2."+data.data[i].problem[1].two+"</td>"+
                            "<td>"+data.data[i].address+"</td>"+"<td></td>"
                            +"</tr>")
                    }
                }
            }
        })
    })*/
=======
//实现搜索功能
/*$("#btn_search").click(function () {
 $(".table-striped tbody tr").remove();
 $.ajax({
 type:"GET",
 url:"../data-weiaohan.json",
 dataType:"json",
 success:function (data) {
 var name=$(this).val();
 var phone=$(this).val();
 for(i=0;i<8;i++){
 if(data.data[i].username==name||data.data[i].phone==phone){
 $("tbody").append("<tr>"+
 "<td><div class='checkbox'><label><input type='checkbox' name='checkbox'>"+"0"+i+"</label></div></td>"+
 "<td>"+data.data[i].orderId+"</td>"+
 "<td>"+$.myTime.UnixToDate(data.data[i].date)+"</td>"+
 "<td></td>"+
 "<td>"+data.data[i].username+"</td>"+
 "<td>"+data.data[i].phone+"</td>"+
 "<td>"+"1."+data.data[i].problem[0].one+"<br>"+"2."+data.data[i].problem[1].two+"</td>"+
 "<td>"+data.data[i].address+"</td>"+"<td></td>"
 +"</tr>")
 }
 }
 }
 })
 })*/
>>>>>>> 6730b8da274153d69c50effb94f523db3f82f890
