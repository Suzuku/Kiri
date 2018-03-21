/**
 * Created by JAMES on 2017/3/3.
 */
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


//显示加载数据
    function ShowDiv() {
        $("#loading").show();
    }

//隐藏加载数据
    function HiddenDiv() {
        $("#loading").hide();
    } 

//分页插件
$.fn.pageList = function (arg, methodName) {
    if (typeof methodName === "string" && $.trim(methodName) != "") {
        switch (methodName) {
            case 'refresh'://刷新当前页,一般用于删除或者更新后
                $(this).each(function () {
                    var arg = $(this).data('pageListArg');
                    if (arg != null && typeof arg.clickCallback === "function") {
                        arg.clickCallback(arg.currentPage);
                    }
                });
                break;
        }
    }
    else {
        var defaultSettings = {
            prevText: 'Prev',//显示的前一页文本
            nextText: 'Next',//显示的下一页文本
            showGoLink: 'auto',//是否显示快速跳转，可能的值为auto 自动判断；true 永远显示；false 永不显示
            goInputType: 'select',//如何显示快速跳转输入，可能的值为select 下拉列表；text 输入框，默认值为select
            goText: 'Go',//显示的快速跳转文本
            recordText: '',//显示记录数，为空时不显示，否则按照占位符显示文本，{0}表示总页数，{1}表示总记录数
            clickCallback: function (currentPage) { },//链接被点击时触发的事件，currentPage表示当前点击的是第几页，索引从1开始
            renderPerCall: true,//是否每次点击都重新绘制，如果每次clickCallback事件中都会重新绘制pageList，此处请设置为false减少绘制消耗
            pageSize: 10,//每页显示的数据条数
            currentPage: 1,//当前第几页，索引从1开始
            totalCount: 0,//总记录数
            currentPageCenter: true,//当前页是否居中，true表示居中,false表示按showPageRange倍率范围显示,注意此值会导致完全不同的显示方式
            showPageRange: 5//允许最小值3，当currentPageCenter设置为true时，表示去除第一页，最后一页后，还需显示的页面数量；为false时,表示在倍率范围内应当显示的页面链接数量,
        };
        arg = $.extend({}, defaultSettings, arg);
        var totalPages = ~~(arg.totalCount / arg.pageSize) + (~~(arg.totalCount % arg.pageSize) == 0 ? 0 : 1);//获取总页数
        if (arg.currentPage < 1) {//修正当前页页码为第一页
            arg.currentPage = 1;
        }
        if (arg.currentPage > totalPages) {//修正当前页页码为最后一页
            arg.currentPage = totalPages;
        }
        if (!(arg.showPageRange > 2)) {
            arg.showPageRange = 3;
        }
        $(this).data('pageListArg', arg);
        $(this).each(function () {
            $(this).empty();//无数据
            if (totalPages > 0) {
                var ul = $('<ul class="pager"></ul>');
                var startPage = 2, endPage = totalPages - 1;//排除首页最后一页后显示的第一个超链接，最后一个超链接
                var prevS = false, nextS = false;//是否需要显示…对应的超链接
                if (arg.showPageRange + 4 < totalPages) {//因为页面链接最多包含arg.showPageRange + 4个，所以如果总页数大于时，才显示对应的…
                    if (!arg.currentPageCenter) {
                        var rangeIdx = ~~(arg.currentPage / arg.showPageRange) + (~~(arg.currentPage % arg.showPageRange) == 0 ? 0 : 1);
                        startPage = (rangeIdx - 1) * arg.showPageRange + 1;
                        endPage = rangeIdx * arg.showPageRange;
                        if (startPage < 2) { startPage = 2; }//修正
                        if (endPage >= totalPages) { endPage = totalPages - 1; }//修正
                        if (startPage >= endPage) { startPage = startPage - arg.showPageRange; }//修正
                        if (endPage == totalPages - 2) { endPage++; }//修正
                        prevS = startPage >= arg.showPageRange;
                        nextS = endPage < totalPages - 1;
                    }
                    else {
                        var prevReduce = ~~(arg.showPageRange / 2);
                        var nextAdd = prevReduce;
                        if (~~(arg.showPageRange % 2) == 0) {
                            prevReduce--;//showPageRange为偶数时，currentPage前面显示的页码链接数比后面显示的链接数少一个
                        }
                        if (prevReduce < 0) {//修正当showPageRange被设置为1导致的负数
                            prevReduce = 0;
                        }
                        startPage = arg.currentPage - prevReduce;
                        if (startPage < 2) { startPage = 2; }//修正startPage
                        endPage = arg.currentPage + nextAdd;
                        if (endPage - startPage < arg.showPageRange) { endPage = startPage + arg.showPageRange - 1; }//根据startPage修正endPage
                        if (endPage > totalPages - 1) { endPage = totalPages - 1; startPage = endPage - arg.showPageRange + 1; }//修正endPage,并同步修正startPage
                        if (startPage <= 3) {//再次修正startPage
                            startPage = 2;
                        }
                        if (endPage > totalPages - 3) {//再次修正endPage
                            endPage = totalPages - 1;
                        }
                        prevS = startPage - 1 > 1;
                        nextS = endPage + 1 < totalPages;
                    }
                }
                var li = renderDoms(arg.prevText, arg.currentPage == 1, false, arg.currentPage - 1, arg);//前一页
                li.addClass("prev");
                ul.append(li);
                ul.append(renderDoms("1", arg.currentPage == 1, arg.currentPage == 1, 1, arg));//第一页
                if (prevS) {
                    ul.append(renderDoms('…', false, false, startPage - 1, arg));//…页
                }
                for (var i = startPage; i <= endPage; i++) {
                    ul.append(renderDoms(i, arg.currentPage == i, arg.currentPage == i, i, arg));//第i页
                }
                if (nextS) {
                    ul.append(renderDoms('…', false, false, endPage + 1, arg));//…页
                }
                if (totalPages > 1) {
                    ul.append(renderDoms(totalPages, arg.currentPage == totalPages, arg.currentPage == totalPages, totalPages, arg));//最后一页
                }
                li = renderDoms(arg.nextText, arg.currentPage == totalPages, false, arg.currentPage + 1, arg);//下一页
                li.addClass("next");
                ul.append(li);
                var showGo;
                switch ((arg.showGoLink + '').toLowerCase()) {
                    case "true":
                        showGo = true; break;
                    case "false":
                        showGo = false; break;
                    default:
                        showGo = arg.showPageRange + 4 < totalPages; break;
                }
                if (showGo) {
                    li = $('<li class="text"><span class="go">' + arg.goText + '</span></li>');
                    var sel;
                    if (arg.goInputType.toLowerCase() != 'text') {
                        sel = $('<select class="go"></select>');//<input tyle="text" class="go" />
                        for (var i = 1; i <= totalPages; i++) {
                            sel.append('<option value="' + i + '">' + i + '</option>');
                        }
                        sel.val(arg.currentPage);
                    }
                    else {
                        sel = $('<input tyle="text" class="go" />');
                        sel.focus(function () {
                            $(this).val('');
                        }).change(function () {
                            var num = parseInt($(this).val());
                            if (num && num > 0) {
                                if (num > totalPages) {
                                    num = totalPages;
                                }
                                $(this).val(num);
                            }
                            else {
                                $(this).val('');
                            }
                        }).keyup(function () { $(this).change(); });
                    }
                    var sp = li.find('span');
                    sel.insertBefore(sp);
                    sp.click(function () {
                        var pageNumber = ~~$(this).parent().find('.go:eq(0)').val();
                        if (pageNumber > 0) {
                            clickEvent($(this).parent(), arg, pageNumber);
                        }
                    });
                    ul.append(li);
                }
                if (typeof arg.recordText === "string" && $.trim(arg.recordText) != "") {
                    ul.append('<li class="text">' + arg.recordText.replace(/\{0\}/g, totalPages).replace(/\{1\}/g, arg.totalCount) + '</li>');
                }
                $(this).append(ul);
            }
        });
    }
    function renderDoms(text, disable, active, pageNumber, arg) {
        var li = $('<li><a style="cursor:' + (disable ? "" : "pointer") + ';">' + text + '</a></li>');
        if (active) {
            li.addClass("active");
        }
        if (disable) {
            li.addClass("disable");
        }
        else {
            li.click(function () {
                clickEvent(this, arg, pageNumber);
            });
        }
        return li;
    }
    function clickEvent(dom, arg, pageNumber) {
        if (typeof arg.clickCallback === "function") {
            arg.clickCallback(pageNumber);
        }
        if (arg.renderPerCall) {
            arg.currentPage = pageNumber;
            $(dom).parent().parent().pageList(arg);
        }
    }
};

/*声明getjson封装为函数*/
function showjson()
{
    $("td").empty();
    $("td").remove();
    $("#show_number").empty();
    $(".pagination").empty();

    $.ajax({
        url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryAllRepairUnit.json",
        type:"POST",
        dataType:"json",
        data:{pageSize:"5",startPage:"1"},
        success:function (data) {
            if(data.success){
                $(".pager-list").pageList({
                    prevText: '前一页',
                    nextText: '下一页',
                    recordText: '共{0}页，{1}条记录',
                    totalCount: data.size,
                    goInputType: 'text',
                    //showGoLink: true,
                    showPageRange: 5,
                    pageSize:5,
                    renderPerCall: true,
                    clickCallback: function (currentPage) {
                        $("td").remove();
                        $.ajax({
                                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryAllRepairUnit.json",
                                type:"POST",
                                dataType:"json",
                                data:{pageSize:"5",startPage:currentPage},
                                success:function (data) {
                                    if(data.success){
                                        $.each(data.repairUnit,function (index,item) {
                                            var ind=index+1;
                                            $("tbody").append(
                                                "<tr class='list_1'><td><input name='subBox' type='checkbox' id='"+ item.id + "'>"
                                                +"</td><td>" +item.unitName+ "</td><td>"
                                                +item.headerName+"</td><td>"
                                                +item.headerTel+"</td><td>"
                                                +item.userName+"</td><td>"
                                                +item.userTel+"</td><td>"
                                                +item.unitAddress+"</td>"
                                                +"<td class='button-flex' style='width:20%'><button type='button' name='surf' class='btn btn-primary' data-toggle='modal' id='" +item.id+ "' style='margin-right:5px;'>查看</button>"+"<button type='button' class='btn btn-primary' name='edit' data-toggle='modal' id='" +item.id+ "' style='margin-right:5px'>编辑</button>"+ "<button type='button' class='btn btn-primary' name='dis'  data-toggle='modal' id='" +item.id+ "' >委派</button></td></tr>"
                                            )
                                        })
                                    }
                                }
                            }
                        )
                    }
                })
                $.each(data.repairUnit,function (index,item) {
                    $("tbody").append(
                        "<tr class='list_1'><td><input name='subBox' type='checkbox' id='"+ item.id + "'>"
                        +"</td><td>" +item.unitName+ "</td><td>"
                        +item.headerName+"</td><td>"
                        +item.headerTel+"</td><td>"
                        +item.userName+"</td><td>"
                        +item.userTel+"</td><td>"
                        +item.unitAddress+"</td>"
                        +"<td class='button-flex' style='width:20%'><button type='button' name='surf' class='btn btn-primary' data-toggle='modal' id='" +item.id+ "' style='margin-right:5px;'>查看</button>"+"<button type='button' class='btn btn-primary' name='edit' data-toggle='modal' id='" +item.id+ "' style='margin-right:5px'>编辑</button>"+ "<button type='button' class='btn btn-primary' name='dis'  data-toggle='modal' id='" +item.id+ "' >委派</button></td></tr>"
                    );

                })

            }
        }




    })
 


}









$(document).ready(function () {
    showTime();
})

$(function() {

    
    /*动态获取分页的页数*/


    /*分页功能*/
 /*   $(".pagination").on("click","a",function () {
            $("td").remove();
            var pageId = $(this).attr("id");
            $.ajax({
                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryAllRepairUnit.json",
                type:"POST",
                dataType:"json",
                data:{pageSize:"5",startPage:pageId},
                success:function (data) {
                    if(data.success){
                        $.each(data.repairUnit,function (index,item) {
                            $("tbody").append(
                                "<tr class='list_1'><td><input name='subBox' type='checkbox' id='"+ item.id + "'>"
                                +item.id+"</td><td>" +item.unitName+ "</td><td>"
                                +item.headerName+"</td><td>"
                                +item.headerTel+"</td><td>"
                                +item.userName+"</td><td>"
                                +item.userTel+"</td><td>"
                                +item.unitAddress+"</td>"
                                +"<td class='button-flex' style='width:20%'><button type='button' name='surf' class='btn btn-primary' data-toggle='modal' id='" +item.id+ "' style='margin-right:5px;'>查看</button>"+"<button type='button' class='btn btn-primary' name='edit' data-toggle='modal' id='" +item.id+ "' style='margin-right:5px'>编辑</button>"+ "<button type='button' class='btn btn-primary' name='dis'  data-toggle='modal' id='" +item.id+ "' >委派</button></td></tr>"
                            );

                        })

                    }
                }
            })
        }
    )*/
    /*全选功能的实现*/
    $("#checkAll").click(function() {
        $('input[name="subBox"]').attr("checked",this.checked);
    });
    var $subBox = $("input[name='subBox']");

    /*刷新获取*/
    showjson();


   






    /*给编辑按钮绑定事件*/
    $(document).on("click","button[name='edit']",function()
    {

        var id2=$(this).attr("id");
        /*编辑时获取原有信息*/
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryRepairUnitById.json",
            data:
                {
                    id:id2
                },
            dataType:"json",
            type:"POST",
            success:function(data)
            {
                $("#edit-unitName").val(data.repairUnit.unitName);
                $("#edit-unitDesc").val(data.repairUnit.unitDesc)
                $("#edit-userTel").val(data.repairUnit.userTel);
                $("#edit-userName").val(data.repairUnit.userName)
                $("#edit-headerName").val(data.repairUnit.headerName)
                $("#edit-weixin").val(data.repairUnit.weixin)
                $("#edit-email").val(data.repairUnit.email)
                $("#edit-unitAddress").val(data.repairUnit.unitAddress)
                $("#edit-headerTel").val(data.repairUnit.headerTel)


            }





        })
        $("#editCompany").modal();


        $("#edit-sure").unbind("click").bind("click",function()
        {

            $.ajax({
                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_updateRepairUnitById.json",
                data:
                    {
                        unitName:$("#edit-unitName").val(),
                        unitDesc:$("#edit-unitDesc").val(),
                        userTel:$("#edit-userTel").val(),
                        userName:$("#edit-userName").val(),
                        headerName:$("#edit-headerName").val(),
                        headerTel:$("#edit-headerTel").val(),
                        weixin:$("#edit-weixin").val(),
                        email:$("#edit-email").val(),
                        unitAddress:$("#edit-unitAddress").val(),
                        id:id2
                    },
                dataType:"json",
                type:"POST",
                success:function()
                {
                      alert("编辑单位成功！")
                    showjson();
                },
                beforeSend: function () {
                ShowDiv();
            },
            complete: function () {
                HiddenDiv();
            },
                error:function() {
              alert("编辑单位失败！")
              /* Act on the event */
            }

                   



            })
        });

    })

/*给查看按钮绑定事件*/
    $(document).on("click","button[name='surf']",function()
    {
        $("#surf-build").val("");

        var id2=$(this).attr("id");
        /*点击查看发送ID*/
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryRepairUnitById.json",
            data:
                {
                    id:id2
                },
            dataType:"json",
            type:"POST",
            success:function(data)
            {
                $("#surf-email").val(data.repairUnit.email);
                $("#surf-weixin").val(data.repairUnit.weixin)
                $("#surf-unitDesc").val(data.repairUnit.unitDesc)

            }





        })
       
      /*查看该单位负责的楼盘*/
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryRepairUnitBuilding.json",
            data:
                {
                    id:id2
                },
            dataType:"json",
            type:"POST",
            success:function(data)
            {

                
                $.each(data.buildingInformationList,function(index,item)
                {
                            
                    $("#surf-build").val($("#surf-build").val()+item.buildingName+'、');

                })


            }
        })
               /*遍历该单位的负责楼盘并显示*/
        $("#buildSurf").modal();
    })

    /*给委派按钮绑定事件*/

    /*获取楼盘种类*/
    $(document).on("click","button[name='dis']",function()

    {
       var iddis=$(this).attr("id");
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAddress.json",
            data:
                {

                    parentId:0
                },
            dataType:"json",
            type:"POST",
            success:function(data)
            {
                $("#buildis-page").empty();
                $.each(data.buildingInformations,function(index, item) {

                    $("#buildis-page").append(
                        "<input type='checkbox'  name='rd' id='"+item.id+"'  />"+"&nbsp"+item.buildingName+"<br>"

                    )})


                    /*获取已委派的楼盘，默认选中*/
                    $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryRepairUnitBuilding.json",
            data:
                {
                    id:iddis
                },
            dataType:"json",
            type:"POST",
            success:function(data)
            {
                 $.each(data.buildingInformationList,function(index,item)


                {
                  $("input:checkbox[name='rd']").each(function(index, el)
            {

                
                  
                  if($(this).attr("id")==item.id)
                      {
                          $(this).attr("checked","true");

                      }

                /*获取到点击的ID数组，并传给后台添加楼盘*/
            });
                    

                })

               
            }
        })




                }
              });
            





      



        $("#buildDis").modal();

        /*发送委派的楼盘*/
        $("#buildis-sure").unbind("click").bind("click",function()
        {

            var idArr=new Array();

            $("input:checkbox[name='rd']").each(function(index, el)
            {

                if(this.checked)
                {
                    var idBuild=$(this).attr("id");
                    idArr.push(idBuild);
                }

                /*获取到点击的ID数组，并传给后台添加楼盘*/
            });
            var idArrBuild=idArr.join(",");

            $.ajax({
                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_updateRepairUnitBuilding.json",
                data:
                    {

                        id:iddis,
                        ids:idArrBuild
                    },
                dataType:"json",
                type:"POST",
                success:function()
                {
                    alert("委派楼盘成功！")
                },
                beforeSend: function () {
                ShowDiv();
            },
            complete: function () {
                HiddenDiv();
            },
                error:function() {
              alert("委派楼盘失败！")
              /* Act on the event */
            }






            })
    })
    })

    /*增加单位*/

    /*加载增加楼盘的种类*/
    $("#unitAdd").click(function()
    {
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAddress.json",
            data:
                {

                    parentId:0
                },
            dataType:"json",
            type:"POST",
            success:function(data)
            {

                $("#addbuild-page").empty();
                $.each(data.buildingInformations,function(index, item) {

                    $("#addbuild-page").append(
                        "<input type='checkbox'  name='233' style='margin-left:30px' id='"+item.id+"'  />"+"&nbsp"+item.buildingName+"<br>"

                    );



                });
            }





        })


    })




    $("#addUnit-save").click(function(event)
    {
        if(!$("#add-unitName").val()){
            alert("公司名称不能为空！");
            return false;
        }
        if(!$("#add-unitDesc").val()){
            alert("公司介绍不能为空！");
            return false;
        }
        if(!$("#add-userTel").val()){
            alert("联系人电话不能为空！");
            return false;
        }
        if(!$("#add-userName").val()){
            alert("联系人名称不能为空！");
            return false;
        }
        if(!$("#add-headerName").val()){
            alert("负责人姓名不能为空！");
            return false;
        }
        if(!$("#add-headerTel").val()){
            alert("负责人电话不能为空！");
            return false;
        }
        if(!$("#add-weixin").val()){
            alert("微信不能为空！");
            return false;
        }
        if(!$("#add-email").val()){
            alert("邮箱不能为空！");
            return false;
        }
        if(!$("#add-unitAddress").val()){
            alert("单位地址不能为空！");
            return false;
        }


        var idArr=new Array();

        $("input:checkbox[name='233']").each(function(index, el)
        {

            if(this.checked)
            {
                var idBuild=$(this).attr("id");
                idArr.push(idBuild);
            }

            /*获取到点击的ID数组，并传给后台添加楼盘*/
        });
        var idArrStr=idArr.join(",");
        $.ajax({
            url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_addRepairUnit.json",
            data:
                {
                    unitName:$("#add-unitName").val(),
                    unitDesc:$("#add-unitDesc").val(),
                    userTel:$("#add-userTel").val(),
                    userName:$("#add-userName").val(),
                    headerName:$("#add-headerName").val(),
                    headerTel:$("#add-headerTel").val(),
                    weixin:$("#add-weixin").val(),
                    email:$("#add-email").val(),
                    unitAddress:$("#add-unitAddress").val(),
                    ids:idArrStr
                },
            dataType:"json",
            type:"POST",
            success:function()
            {

                $("td").remove();
                  alert("增加单位成功！")
                showjson();
            },

            beforeSend: function () {
                ShowDiv();
            },
            complete: function () {
                HiddenDiv();
            },
            error:function() {
              alert("增加单位失败！")
              /* Act on the event */
            }

        })
        $("input").val("");
        $("select").val("");
        $("textarea").val("");
    })





    /*遍历复选框进行删除*/
    $("#unitDelete").unbind("click").bind("click",function()
    {
        var id=new Array();

        $("input[name='subBox']").each(function(index, el)
        {

            if(this.checked)
            {
                var idss=$(this).attr("id");
                id.push(idss);
            }

            /*获取到点击的ID值，并传给后台进行删除操作*/




        });

        var idstr=id.join(",");

        $.ajax(
            {
                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_deleteRepairUnit.json",
                data:
                    {
                        ids:idstr
                    },
                dataType:"JSON",
                type:"POST",
                success:function(data)
                  {
                    if(data.success)
                    {
                    if(idstr.length==0)
                    {
                        alert("未选中单位！")
                    }
                    else
                    {
                          alert("删除单位成功！")
                    showjson();
                    }
                }

                else 
                {
                    alert(data.msg);
                }

                },
                beforeSend: function () {
                ShowDiv();
            },
            complete: function () {
                HiddenDiv();
            },
                error:function() {
              alert("删除单位失败！")
              /* Act on the event */
            }


            })

    })

});
