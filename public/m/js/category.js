$(function () {


    //渲染一级分类

    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        success: function (info) {
            $('.category_left ul').html(template('tpl', info));
            var id = 1;
            //渲染二级分类 页面
            setSecond(id);
        }
    })

    //点击事件  事件委托
    $('.category_left ul').on('click', 'li', function(){
        var id =  $(this).data('id');
        $(this).addClass('active').siblings().removeClass('active');
        setSecond(id);
    })
    

    //封装2级分类 ajax
    function setSecond(id) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function (info) {
                $('.category_right ul').html(template('tpl2', info));
            }
        })
    }
})