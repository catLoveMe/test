/**
 * 主页模块
 */
/*var request=new XMLHttpRequest();
request.open("post","/login.do",true);
request.onreadystatechange=function () {
    if(request.readyState==4&&request.status==200){
        $(".adminName").text(request.responseText);
    }
};
request.send(null);*/
//request.send(null);
/*左侧下拉菜单*/
$(".jc-manage").click(function () {
   $(".nav-two").slideToggle();
});
/*人员管理*/
$(".perManager").click(function () {
   $("#frame1").attr("src","perManager.html");
});
/*日历管理*/
$(".rl-manage").click(function () {
    $("#frame1").attr("src","./Calendar_files/Calendar.html");
});
/*学生管理*/
$(".stu-manage").click(function () {
    $("#frame1").attr("src","stuMan.html")
});
/*角色管理*/
$(".js-manage").click(function () {
    $("#frame1").attr("src","roleMan.html")
});
$(".bm-manage").click(function () {
    $("#frame1").attr("src","DerpManager.html");
});
/*排课管理*/
$(".pcrs-manage").click(function () {
    $("#frame1").attr("src","paike.html");
});
/*班级管理*/
$(".class-manage").click(function () {
    $("#frame1").attr("src","classGl.html");
});
$(".crs-manage").click(function () {
    $("#frame1").attr("src","course");
});
/*退出登录*/
$(".close").click(function () {
   window.location.href="Login.html"
});
//获取login传过来的值
var username=$.query.get("username");
var year=$.query.get("year");
var month=$.query.get("month");
var day=$.query.get("day");
var hours=$.query.get("hours");
var minute=$.query.get("minute");
var seconds=$.query.get("seconds");
/*显示账号信息*/
for(var i=0;i<peopleArr.length;i++){
    var zhanghao=peopleArr[i].peopleAcount;
    if(username==zhanghao){
        $(".username").text(peopleArr[i].roleName);
    }
    $(".adminName").text(username);
}
/*判断用户权限*/
quanxian();
function quanxian() {
    if($(".adminName").text()=="zoujie"||$(".adminName").text()=="zhangjie"){
        $(".jc-manage").unbind("click")
    }
}
/*登录时间存储*/
var timesArrs={"year":year,"month":month,"day":day,"hours":hours,"minute":minute,"seconds":seconds};
/*登录时间*/
Times();
function Times() {
    $(".date").text(timesArrs.year+"/"+(timesArrs.month+1)+"/"+timesArrs.day);
    $(".time").text(timesArrs.hours+":"+timesArrs.minute+":"+timesArrs.seconds)
}
/*用户头像*/
Imguser();
function Imguser() {
    if(username=="zoujie"){
      $(".imguser").attr("src","images/admin.jpg");
    }else if(username=="zhangjie"){
        $(".imguser").attr("src","images/admin1.jpg");
    }else{
        $(".imguser").attr("src","images/admin2.jpg")
    }
}

//头像下的用户
$.ajax({
   url:"/getUsername.do",
    success:function (data) {
        $(".worlcome").text(data);
    }
});
//上传头像
    $(".imguser").click(function () {
       $("#djHeader").click()
    });
