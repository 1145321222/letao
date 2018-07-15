$(function () {

    var page = 1;
    var pageSize = 7
    render();

    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                $('.dropdown-menu').html(template('tpl2', info));

            }
        })
    });
    $('.dropdown-menu').on('click', 'a', function () {
        $('#dropdown-text').text($(this).text());
        //3.2 获取到id id 是传给后台
        var id = $(this).data("id");
        $("[name='categoryId']").val(id);

        //3.3 修改categoryId的校验状态，通过
        $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    $("#fileupload").fileupload({

        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            //显示 img 图片 
            $('.img-box').attr('src', data.result.picAddr);
            //将图片地址给隐藏域
            $('[name="brandLogo"]').val(data.result.picAddr);
            // 让brandLogo校验通过该
            $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });
    //校验表单状态
    $("form").bootstrapValidator({
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类的名字不能为空'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传一张品牌的图片'
                    }
                }
            }

        },
        //配置不做校验的类型
        excluded: [],
        //配置小图标的规则
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        }
    });



    //表单校验成功实践
    $('form').on('success.form.bv', function(e){
        e.preventDefault();//阻止默认事件
        //校验一成功就可以发送ajax 
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $("form").serialize(),
            success: function(info){
                if(info.success){
                    $('#addModal').modal('hide');
                    page = 1;
                    render();
                    //重置表单  
                    $("form").data("bootstrapValidator").resetForm(true);
                    $('.img-box').attr('src', './images/0707.gif');
                    $('#dropdown-text').text('请选择一级分类'); 
                }
            }
        })
        
    })
    function render() {
        //发送ajax请求
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
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