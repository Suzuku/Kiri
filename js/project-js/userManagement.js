
function showTime() {
    var today = new Date();
    var y = today.getFullYear();
    var M = today.getMonth() + 1;
    var d = today.getDate();
    var w = today.getDay();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    $('#TIME').html(y + '年' + M + '月' + d + "日 " + '&nbsp;' + week[w] + '&nbsp;&nbsp;' + h + ':' + m + ':' + s);//可改变格式
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    setTimeout("showTime()", 1000);
}

function formatTime (strTime) {
    if(strTime == null)
        return "";
    var date = new Date(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}


$(document).ready(function() {
    showTime();
    //全选
    $(function () {
        $(".checkAll").click(function () {
            $('input[name="subBox"]').attr("checked", this.checked);
        });
        var $subBox = $("input[name='subBox']");
        $subBox.click(function () {
            $("#checkAll").attr("checked", $subBox.length == $("input[name='subBox']:checked").length ? true : false);
        });
    });

    //点击用户 查阅用户资料
    $(function () {
        $("#wechat").click(function () {
            $.ajax({
                url: "http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryUser.json",
                type: 'POST',
                data:{
                    startPage:1,
                    pageSize:2,

                },
                success: function (data) {
                    if (data.success) {
                        var sex = "";
                        $(".list_1").empty();
                        $.each(data.user, function (index, item) {
                            if (item.gender == 0) {
                                sex = "男";
                            }
                            else if (item.gender == 1) {
                                sex = "女";
                            }
                            $("tbody").append(
                                "<tr class='list_1'><td><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td>" + item.userName + "</td><td>"
                                + sex + "</td><td>"
                                + formatTime(item.regDate) + "</td><td>"
                                + item.cellphone+ "</td></tr>"
                            );

                        })
                        $(".user_page").empty();
                        for(var i=1;i<=data.pageNum;i++){
                            $(".user_page").append(" <li><a id='"+i+"'>"+i+"</a></li>");
                        }

                    }
                }

            })
        })
    })

    //分页用户
    $(function () {
        $(document).on("click",".user_page a",function () {
            var edit_button_id=$(this).attr("id");
            $.ajax({
                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryUser.json",
                type:'POST',
                data:{
                    startPage:edit_button_id,
                    pageSize:2,
                },
                success: function (data) {
                    if (data.success) {
                        var sex = "";
                        $(".list_1").empty();
                        $.each(data.user, function (index, item) {
                            if (item.gender == 0) {
                                sex = "男";
                            }
                            else if (item.gender == 1) {
                                sex = "女";
                            }
                            $("tbody").append(
                                "<tr class='list_1'><td><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td>" + item.userName + "</td><td>"
                                + sex + "</td><td>"
                                + formatTime(item.regDate) + "</td><td>"
                                + item.cellphone+ "</td></tr>"
                            );

                        })
                        $(".user_page").empty();
                        for(var i=1;i<=data.pageNum;i++){
                            $(".user_page").append(" <li><a id='"+i+"'href='#'>"+i+"</a></li>");
                        }

                    }
                }
            })

        })
    })
    //点击技师，查询技师资料
    $(function () {
        $("#technician").click(function () {
            $.ajax({
                url: "http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryTechnican.json",
                type: 'POST',
                data:{
                    startPage:1,
                    pageSize:2,

                },
                success: function (data) {
                    if (data.success) {
                        var sex = "";
                        $(".list_1").empty();
                        $.each(data.user, function (index, item) {
                            if (item.gender == 0) {
                                sex = "男";
                            }
                            else if (item.gender == 1) {
                                sex = "女";
                            }
                            $("tbody").append(
                                "<tr class='list_1'><td><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td>" + item.userName + "</td><td>"
                                + sex + "</td><td>"
                                + formatTime(item.regDate) + "</td><td>"
                                + item.cellphone+ "</td><td>"
                                +item.goodAtWork+"</td>"
                                +"<td class='button-flex'><button type='button' class='btn btn-primary'>查看</td>"
                                +"<td>"+item.repairUnitUser.unitName +"</td>"
                                +"<td>"+item.remark +"</td>"
                                +"<td class='button-flex edit_td'><button type='button' class='btn btn-primary' id='"+item.id+"' data-toggle='modal'>编辑</button><button type='button' class='btn btn-primary'>修改密码</button></td></tr>"

                            );

                        })
                        $(".user_page_Technican").empty();
                        for(var i=1;i<=data.pageNum;i++){
                            $(".user_page_Technican").append("<li><a id='"+i+"'href='#'>"+i+"</a></li>");
                        }

                    }
                }


            })
        })
    })

    //分页技师
    $(function () {
        $(document).on("click",".user_page_Technican a",function () {
            var edit_button_id=$(this).attr("id");
            $.ajax({
                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryTechnican.json",
                type:'POST',
                data:{
                    startPage:edit_button_id,
                    pageSize:2,
                },
                success: function (data) {
                    if (data.success) {
                        var sex = "";
                        $(".list_1").empty();
                        $.each(data.user, function (index, item) {
                            if (item.gender == 0) {
                                sex = "男";
                            }
                            else if (item.gender == 1) {
                                sex = "女";
                            }
                            $("tbody").append(
                                "<tr class='list_1'><td><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td>" + item.userName + "</td><td>"
                                + sex + "</td><td>"
                                + formatTime(item.regDate) + "</td><td>"
                                + item.cellphone+ "</td><td>"
                                +item.goodAtWork+"</td>"
                                +"<td class='button-flex'><button type='button' class='btn btn-primary'>查看</td>"
                                +"<td>"+item.repairUnitUser.unitName +"</td>"
                                +"<td>"+item.remark +"</td>"
                                +"<td class='button-flex edit_td'><button type='button' class='btn btn-primary' id='"+item.id+"' data-toggle='modal'>编辑</button><button type='button' class='btn btn-primary'>修改密码</button></td></tr>"
                            );

                        })
                        $(".user_page_Technican").empty();
                        for(var i=1;i<=data.pageNum;i++){
                            $(".user_page_Technican").append(" <li><a id='"+i+"'>"+i+"</a></li>");
                        }

                    }
                }
            })

        })
    })




    //点击增加按钮后，单位自动列出
    $(function () {
        $("#dropdown_select_unit").click(function () {
            $.ajax({
                url: "http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryAllRepairUnit.json",
                type: 'GET',
                success: function (data) {
                    if (data.success) {
                        $.each(data.repairUnit, function (index, item) {
                            $("#technician_unit_sect").append(
                                "<option value='"+item.id+"'>" + item.unitName + "</option>"
                            );

                        })

                    }
                }

            })
        })
    })
//楼盘下拉
    $(function () {
        $("#dropdown_select_administrator").click(function () {
            $.ajax({
                url: "http://xihashao.tunnel.2bdata.com/JGX/houseAndAddress_queryHouseAddress.json",
                type: 'POST',
                data:{
                    parentId:0
                },
                success: function (data) {
                    if (data.success) {
                        $.each(data.buildingInformations, function (index, item) {
                            $("#administrator_sect").append(
                                "<option value='"+item.id+"'>" + item.buildingName + "</option>"
                            );

                        })

                    }
                }

            })
        })
    })
    //增加技师
    $(function () {
        $("#save_technician").click(function () {
            var all=$("#technician_unit_sect").find("option:selected").attr("value");
            alert(all);
            $.ajax({
                url: "http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_addTechnician.json",
                type: 'POST',
                dataType:'JSON',
                data: {
                    userName: $("#technician_name").val(),
                    cellphone:$("#technician_cellphone").val(),
                    repairUnitUser:all,
                    loginName:$("#technician_account").val(),
                },
                success: function(data) {
                    if (data.success) {
                        alert(data.msg);
                    }
                },
                error:function (data) {
                    if(data.error){
                        alert(data.msg)
                    }

                },

            })
        })
    })

    //增加派单员
    $(function () {
        $("#save_administrator").click(function () {
            var all = "";
            $("#administrator_sect").find("option:selected").each(function() {
                all += $(this).attr("value")+",";
            });
            all=all.substring(0,all.length-1);
            $.ajax({
                url: "http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_addDevelopUser.json",
                type: 'POST',
                data: {
                    buildingIds: all,
                    loginName:$("#administrator_account").val(),
                    developInfo:$("#administrator_developName").val(),
                    userName:$("#administrator_username").val(),
                },
                success: function(data) {
                    if (data.success) {
                        alert(data.msg);
                    }
                },
                error:function (data) {
                    if(data.error){
                        alert(data.msg)
                    }

                },

            })
        })
    })

    //下拉列表列出所有单位
    $(function () {
        $("#select_unit").click(function () {
            $.ajax({
                url: "http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryAllRepairUnit.json",
                type: 'GET',
                success: function (data) {
                    if (data.success) {
                        $(".list_3").empty();
                        $.each(data.repairUnit, function (index, item) {
                            $(".list_3").append(
                                "<li> <a href='#'>"
                                + item.unitName+ "</a></li>"

                            );

                        })

                    }
                }

            })
        })
    })




    //点击派单员，查询所有派单员资料
    $(function () {
        $("#administrator").click(function () {
            $.ajax({
                url: "http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryDevelopUser.json",
                type: 'POST',
                data:{
                    startPage:1,
                    pageSize:2,
                },
                success: function (data) {
                    if (data.success) {
                        var sex = "";
                        $(".list_1").empty();
                        $.each(data.user, function (index, item) {
                            if (item.gender == 0) {
                                sex = "男";
                            }
                            else if (item.gender == 1) {
                                sex = "女";
                            }
                            $("tbody").append(
                                "<tr class='list_1'><td><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td>" + item.developInfo + "</td><td>"
                                + item.loginName + "</td><td>"
                                + item.userName + "</td><td>"
                                + item.cellphone + "</td><td>"
                                + formatTime(item.regDate)+ "</td>"
                                +"<td class='button-flex edit_td_1'><button type='button' class='btn btn-primary' data-toggle='modal'>查看</button><button type='button' class='btn btn-primary'>派单</button></td></tr>"
                            );

                        })
                        $(".user_page_ad").empty();
                        for(var i=1;i<=data.pageNum;i++){
                            $(".user_page_ad").append(" <li><a id='"+i+"'>"+i+"</a></li>");
                        }

                    }
                }

            })
        })
    })

    //分页派单员
    $(function () {
        $(document).on("click",".user_page_ad a",function () {
            var edit_button_id=$(this).attr("id");
            $.ajax({
                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryDevelopUser.json",
                type:'POST',
                data:{
                    startPage:edit_button_id,
                    pageSize:2,
                },
                success: function (data) {
                    if (data.success) {
                        var sex = "";
                        $(".list_1").empty();
                        $.each(data.user, function (index, item) {
                            if (item.gender == 0) {
                                sex = "男";
                            }
                            else if (item.gender == 1) {
                                sex = "女";
                            }
                            $("tbody").append(
                                "<tr class='list_1'><td><input name='subBox' type='checkbox' value='1'>"
                                + "</td><td>" + item.developInfo + "</td><td>"
                                + item.loginName + "</td><td>"
                                + item.userName + "</td><td>"
                                + item.cellphone + "</td><td>"
                                + formatTime(item.regDate)+ "</td>"
                                +"<td class='button-flex edit_td_1'><button type='button' class='btn btn-primary' data-toggle='modal'>查看</button><button type='button' class='btn btn-primary'>派单</button></td></tr>"
                            );

                        })
                        $(".user_page_ad").empty();
                        for(var i=1;i<=data.pageNum;i++){
                            $(".user_page_ad").append(" <li><a id='"+i+"'>"+i+"</a></li>");
                        }

                    }
                }
            })

        })
    })


    //点击弹出技师编辑事件
    $(function () {
        $(document).on("click",".edit_td button:first-child",function () {
            var edit_button_id=$(this).attr("id");
            $.ajax({
                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryTechnican.json",
                type:'GET',
                success:function (data) {
                    if(data.success){
                        $.each(data.user, function (index, item) {
                            if(item.id==edit_button_id){
                                $("#technician_cellphone_edit").val(item.cellphone),
                                    $("#technician_unit_sect_edit").find("option:selected").text(item.repairUnitUser.unitName),
                                    $("#technician_account_edit").val(item.loginName),
                                    $("#technician_name_edit").val(item.userName)

                            }

                        })
                    }
                }
            })
            $("#technician_pop_up_edit").modal();

        })
    })



//点击确定，编辑成功技师
    $(function () {
        $(document).on("click","#save_technician_edit",function () {
            $.ajax({
                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryTechnican.json",
                type:'POST',
                data:{
                    loginName:$("#technician_account_edit").value,
                    userName:$("#technician_name_edit").value,
                    cellphone:$("#technician_cellphone_edit").value,
                },
                success:function (data) {
                    if(data.success){
                        alert(data.msg);
                    }
                }
            })

        })
    })

    //点击弹出派单员编辑事件
    $(function () {
        $(document).on("click",".edit_td_1 button:first-child",function () {
            var edit_button_id=$(this).attr("id");
            $.ajax({
                url:"http://xihashao.tunnel.2bdata.com/JGX/repairUnitAndTechnician_queryDevelopUser.json",
                type:'GET',
                success:function (data) {
                    if(data.success){
                        $.each(data.user, function (index, item) {
                            if(item.id==edit_button_id){
                                $("#administrator_cellphone_edit").val(item.cellphone),
                                    $("#administrator_unit_sect_edit").find("option:selected").text(item.repairUnitUser.unitName),
                                    $("#administrator_account_edit").val(item.loginName),
                                    $("#administrator_name_edit").val(item.userName)

                            }

                        })
                    }
                }
            })
            $("#administrator_pop_up_edit").modal();

        })
    })


})