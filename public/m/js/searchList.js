$(function () {
    //获取地址栏的参数
    function getSearch() {
        //获取搜索的字符串 localtion.search
        var search = location.search;
        //把字符串解码 得到中文格式
        search = decodeURI(search)
        //把第一个问号去掉
        search = search.slice(1);
        //把字符串转换成数组
        var arr = search.split("$");
        var obj = {};
        arr.forEach(function (item) {
            var k = item.split("=")[0];
            var v = item.split("=")[1];
            obj[k] = v;
        })
        return obj;
    }

    //渲染页面 发送ajax 
    function render() {
        var obj = {
            page: 1,
            pageSize: 5,
            proName: key
        }
        // var $active = $('.lt_sort a[data-type]');
        // if ($active.length === 1) {
        //     var type = $active.data['type'];
        //     var value = $active.find('.fa').hasClass('fa-angle-down') ? 2 : 1;
        //     obj[type] = value;
            

        // }

        var $checked = $(".lt_sort a.active");
        if($checked.length === 1){
          //获取type
          var type = $checked.data("type");
          //获取value
          var value = $checked.find(".fa").hasClass("fa-angle-up")?1:2;
    
          //给obj增加第四个属性
          obj[type] = value;
          console.log(obj);
          
        }
        //排序功能
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: obj,
            success: function (info) {
                $('.lt_product').html(template('tpl', info));
            }
        })
    }
 
    
    //1. 页面已进入就需要渲染  
    //1.1 获取地址栏中所传的参数
    getSearch();
    var key = getSearch().key; //获取key的值添加到input文本中
    $(".search_text").val(key);
    render();
    //点击搜索按钮再次进行渲染发送ajax
    $('.search_btn').on('click', function () {
        //获取文本值
        var key = $('.search_text').val();
        //获取到值之后 重新进入这个页面
        location.href = "searchList.html?key="+key;
    })

    //排序功能 先把给lt_sort 中有data-type自定义属性 添加一个active的类名
    //点击事件
    $('.lt_sort a[data-type]').on('click', function () {

        if ($(this).hasClass('active')) {
            $(this).find('.fa').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            $(this).addClass('active').siblings().removeClass('active');
            $(".lt_sort .fa").removeClass("fa-angle-up").addClass("fa-angle-down");
        }

        render();
    })

})