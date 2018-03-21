/**
 * Created by JAMES on 2017/3/13.
 */

$(function () {
    $(document).keydown(function(event){
        if(event.keyCode==13){
            $(".loginBtn").click();
        }
    });
    $(".loginBtn").click(function () {
        getUserInfo();
    });
});
// 回车点击事件
function getUserInfo() {
    var loginName = $("input[name=userName]").val();
    var password = $("input[name=userPwd]").val();
    var mark=$("input[name=Mark]:checked").val();
    if(loginName == ""){
        alert("用户名不能为空")
    }else if(password == ""){
        alert("密码不能为空")
    }else{
        $.getJSON("http://xihashao.tunnel.2bdata.com/JGX/user_webLogin.json",{"loginName":loginName,"password":password,"mark":mark},function (data){
            if(data.success==true) {
                console.log(data);
                role=(data.mark);
                alert(data.msg);
                window.location.href="jgx.html";
            }
        });
    }
}
