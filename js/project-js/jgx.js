$(function () {
    var $username = $("#username");
    var $userTel = $("#userTel");
    var $buildingName = $("#buildingName");
    var $buildingNum = $("#buildingNum");
    var $buildingHouseNum = $("#buildingHouseNum");
    var $questionOne = $("#questionOne");
    var $questionTwo = $("#questionTwo");
    var $describe = $("#describe");
    var $buildingId = "";
    var parentId = 0;

    $.getJSON("../RepairOrder_queryRepairQuestion.json", function(data){
        if(data.success){
            for(var i in data.problem){
                $questionOne.append("<option>" + data.problem[i].name + "</option>");
            }
            $questionOne.change(function(){
                $questionTwo.html("<option></option>");
                for(var i in data.problem){
                    if(data.problem[i].name === $questionOne.val()){
                        for(var j in data.problem[i].detail) {
                            $questionTwo.append("<option>" + data.problem[i].detail[j].name + "</option>");
                        }
                    }
                }
            });
        }
    });

    $.getJSON("../houseAndAddress_queryHouseAddress.json", {parentId: parentId}, function(data){
        if(data.success){
            for(var i in data.buildingInformations){
                $buildingName.append("<option>" + data.buildingInformations[i].buildingName + "</option>");
            }
            $buildingName.change(function(){
                $buildingNum.html("<option></option>");
                $buildingHouseNum.html("<option></option>");
                for(var i in data.buildingInformations){;
                    if(data.buildingInformations[i].buildingName === $buildingName.val()){
                        parentId = data.buildingInformations[i].id;
                        $buildingName.attr("data-id", data.buildingInformations[i].id);
                    }
                }
                $.getJSON("../houseAndAddress_queryHouseAddress.json", {parentId: parentId}, function(data){
                    for(var i in data.buildingInformations){
                        $buildingNum.append("<option>" + data.buildingInformations[i].buildingName + "</option>");
                    }
                    $buildingNum.change(function(){
                        $buildingHouseNum.html("<option></option>");
                        for(var i in data.buildingInformations){
                            if(data.buildingInformations[i].buildingName === $buildingNum.val()){
                                parentId = data.buildingInformations[i].id;
                            }
                        }
                        $.getJSON("../houseAndAddress_queryHouseAddress.json", {parentId: parentId}, function(data){
                            for(var i in data.buildingInformations){
                                $buildingHouseNum.append("<option>" +  data.buildingInformations[i].buildingName + "</option>");
                            }
                        });
                    })
                });
            })
        }
    })

    $("#save").click(function(){
        $.getJSON("../RepairOrder_addRepairOrderByPhone.json",
            {
                username: $username.val(),
                userTel: $userTel.val(),
                buildingName: $buildingName.val(),
                buildingNum: $buildingNum.val(),
                buildingHouseNum: $buildingHouseNum.val(),
                questionOne: $questionOne.val(),
                questionTwo: $questionTwo.val(),
                describe: $describe.val(),
                buildingId: $buildingName.attr("data-id")
            },
            function (data) {
                alert(data.msg);
            }
        );
    });

})



//修改密码交互
$(function () {
	$("#savepwd").click(function () {
        getPassword();
        $("input[name=former]").val("");
        $("input[name=newpwd]").val("");
        $("input[name=surepwd]").val("");
    });

})
function getPassword() {
    var OldPwd = $("input[name=former]").val();
    var NewPwd = $("input[name=newpwd]").val();
    var ConFirmPwd = $("input[name=surepwd]").val();
    if(OldPwd == ""){
        alert("原密码不能为空!")
    }else if(NewPwd == ""){
        alert("新密码不能为空!")
    }else if(ConFirmPwd == ""){
        alert("确认密码不能为空!")
    } else if(OldPwd == NewPwd  ){
        alert("新密码不能与原密码相同!")
    } else if(ConFirmPwd !== NewPwd  ){
        alert("确认密码输入错误!")
    } else {
        $.getJSON("../technician_techUserUpdatePassword.json",{"oldPassword":OldPwd,"newPassword":NewPwd},function (data){
                alert(data.msg);
        });
    }
}

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

window.alert = function(str)
{
    var alertFram = document.createElement("DIV");
    alertFram.id="alertFram";
    alertFram.style.position = "absolute";
    alertFram.style.left = "50%";
    alertFram.style.top = "50%";
    alertFram.style.borderRadius = "10px";
    alertFram.style.marginLeft = "-250px";
    alertFram.style.marginTop = "-88px";
    alertFram.style.width = "400px";
    alertFram.style.height = "280px";
    alertFram.style.textAlign = "center";
    alertFram.style.lineHeight = "280px";
    alertFram.style.zIndex = "10000000";
    strHtml = "<ul style=\"border-radius: 10px;list-style:none;margin:0px;padding:0px;width:100%;box-shadow: #666 0px 0px 10px\">\n";
    strHtml += " <li style=\"border-top-left-radius: 10px;border-top-right-radius: 10px;background:#ffffff;text-align:left;padding-left:20px;font-size:18px;color:#555555;font-family:微软雅黑;font-weight:normal;height:30px;line-height:30px;border:1px solid #d9d9d9;\">提 示</li>\n";
    strHtml += " <li style=\"background:#fff;text-align:center;font-size:16px;height:120px;line-height:120px;border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9;\">"+str+"</li>\n";
    strHtml += " <li style=\"border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;background:#ffffff;text-align:center;font-weight:bold;height:35px;line-height:35px; border:1px solid #d9d9d9;\">" +
        "<input style=\"border-radius: 3px;height:32px;width: 55px;margin-left:320px;color:#FFFFFF;font-weight:normal;background: #337ab7;border:1px solid #dddddd\"type=\"button\" value=\"确 定\" onclick=\"doOk()\" /></li>\n";
    strHtml += "</ul>\n";
    alertFram.innerHTML = strHtml;
    document.body.appendChild(alertFram);
    this.doOk = function(){
        alertFram.style.display = "none";
    }
    alertFram.focus();
    document.body.onselectstart = function(){return true;};
}