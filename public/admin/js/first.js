$(function () {

    var page = 1;
    var pageSize = 5;

    render();



    //添加按钮
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');

    })

    //2. 表单校验的功能
    $("form").bootstrapValidator({
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类的名称不能为空'
                    }
                }
            }
        },
        //配置小图标的规则
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    $('.btn-primary').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('form').serialize(),
            success: function (info) {
                console.log(info);
                $('#addModal').modal('hide');
                page = 1;
                render()
                $('form').data('bootstrapValidator').resetForm(true);
            }
        })
    })

    //封装ajax 
    function render() {
        //发送ajax请求
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $("tbody").html(template("tpl", info));

                //分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        //渲染p对应的页面即可
                        page = p;
                        render();
                    }
                });

            }
        });
    }
})