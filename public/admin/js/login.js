$(function () {

    // bootstrap-validator插件会在表单提交的时候进行校验 验证事变就会阻止表单的提交
    //使用表单校验插件  对表单提交的进行验证 
    $("form").bootstrapValidator({
        //1 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在3到12之间'
                    },
                    callback: {
                        message: "用户名不存在"
                      }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在3到12之间'
                    },
                    callback: {
                        message:"密码错误"
                    }
                }
            }
        },
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

    });

    //给表单注册一个校验成功的 发送ajax请求

    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $("form").serialize(),  //表单序列化 jquery中有一个方法会将表单中带有name属性 将他们拼接成带有& 的字符串 
            success: function(info){
                //提交数据 进行判断 用户名和密码 如果
                if(info.error === 1000) {
                    $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
                }
                if(info.error === 1001) {
                    $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
                }
                if(info.success) {
                    location.href = "index.html";
                }
            }
        })
    });

    //重置表单 图片
    $('[type = reset]').on('click',function(){
        $("form").data("bootstrapValidator").resetForm(true);
    })

})