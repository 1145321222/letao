$(function () {

  var page = 1;
  var pageSize = 5;
  var imgs = [];
  render()

  $('.btn_add').on('click', function () {
    $('#addModal').modal('show');
    //发送ajax 获取 二级分类名称 
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        
        $('.dropdown-menu').html(template('tpl2', info));
      }

    })
  });
  //点击ul 获取data-id 数据 并把它给input
  $('.dropdown-menu').on('click', 'a', function () {
    //获取到点击的id
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);
    //获取文本内容  添加到哪dropdown-text 上去
    $('#dropdown-text').text($(this).text());
  })

  //文件上传

  $("#fileupload").fileupload({

    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      if (imgs.length == 3) {
        return;
      }
      console.log(data.result);
      imgs.push(data.result);
      console.log(imgs);
      
      $('.img-box').append('<img src="' + data.result.picAddr + '" width="100" height="100">');
      if (imgs.length === 3) {
        $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      } else {
        $("form").data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
      }
    }
  });
  //校验 
  //使用表单校验插件
  $('form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类 '
          }
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d{0,4}$/,
            message: '请输入正确库存(0-999)'
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入鞋子尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入正确的尺码"
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品价格'
          }
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入三张图片'
          }
        }
      },
    }

  });


  //注册表单校验成功实践
  $("form").on('success.form.bv', function (e) {
    //阻止默认事件
    e.preventDefault();
    //使用ajax提交逻辑

    //只能拿八个参数  还要图片的额名字和地址
    var param = $("form").serialize();
    //拼接图片名字和地址
    param += "&picName1=" + imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
    param += "&picName2=" + imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
    param += "&picName3=" + imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;

    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: param,
      success: function (info) {
        
        if (info.success) {
          $('#addModal').modal('hide');
        
          page = 1;
          render();
          //重置表单
          $('form').data('bootstrapValidator').resetForm(true);
          $('.img-box img').remove();
          imgs = [];
          $('#dropdown-text').text("请选择二级分类");
        }
      }
    })
  });

  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        
        $('tbody').html(template('tpl', info));


        //分页 新版
        $("#paginator").bootstrapPaginator({
          //声明版本 
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          itemTexts: function (type, page, current) {
            //console.log(type, page, current);
            switch (type) {
              case "first":
                return "第一页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "最后一页";
              case "page":
                return page + "页";
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "first":
                return "第一页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "最后一页";
              case "page":
                return page + "页";
            }
          },
          useBootstrapTooltip: true,
          bootstrapTooltipOptions: {
            placement: "bottom"
          },
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    })
  }
})