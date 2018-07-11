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