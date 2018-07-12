$(document).ajaxStart(function () {
    //开启进度条
    NProgress.start();
});
$(document).ajaxStop(function () {
    //开启进度条
    setTimeout(function () {
        //ajax请求之后
        NProgress.done();
    }, 500);
});

// 二级菜单栏隐藏 与显示 
//点击 一级菜单 跳出二级菜单
//通过获取 second这个类名给他的上一个兄弟元素 a 注册事件

$('.second').prev().on('click', function(){
    $(this).next().slideToggle();
});



$(".icon_menu").on("click", function () {
    $(".lt_aside").toggleClass("active");
    $("body").toggleClass("active");
  });


  //退出功能 点击图标 显示模态框

$('.icon_logout').on('click', function(){
    $('#logoutModal').modal("show");
})

$('.btn_logout').on('click', function(){
    $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        success: function(info){
          if(info.success) {
            location.href = "login.html";
          }
        }
    });
})