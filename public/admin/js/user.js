$(function () {

    //在页面渲染时就发送ajax 
    var currentPage = 1;
    var pageSize = 5;
    
  
    render();


    //点击按钮 获取每一个按钮上的自定义属性  data-id 获取id
    var id;
    var isDelete;
    $('tbody').on('click', '.btn', function(){
        $('#userModal').modal("show");
        // 获取到启用或者是禁用，  如果有btn-success类，说明是启用，1    没有就是禁用，0
        id = $(this).parent().data('id');
        console.log(id);
        isDelete = $(this).hasClass("btn-success") ? 1 : 0;
        console.log(isDelete);
       
        
    })
    $('.btn_confirm').on('click', function(){
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function(info){
               if(info.success){
                $('#userModal').modal("hide");
                    render();
                }
            }
        })
    })

//封装ajax  
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                // 准备末班引擎
                $('tbody').html(template('tpl', info));
                
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3, //bootstrap版本
                    currentPage: currentPage, //当前页面 
                    totalPages: Math.ceil(info.total / pageSize),
                    onPageClicked: function (event, originalEvent, type, page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }
})