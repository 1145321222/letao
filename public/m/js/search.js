$(function () {
    //1. 渲染页面
    render();
    //2. 清空功能
    $('.lt_history').on('click', '.btn_empty', function () {
        //提示框
        mui.confirm("你确定要删除吗?", "温馨提示", ["否", "是"], function (e) {
            if (e.index === 1) { //index = 1 就是是  0 就是否
                //清空localStorage里历史数据 的 方法 removeItem('hcc_history') 
                localStorage.removeItem('hcc_history');
                //重新渲染页面
                render();
            }
        })

    })
    //3. 单个删除的功能 给每一个li里面的span注册点击委托事件
    $('.lt_history').on('click', '.btn-delete', function () {
        mui.confirm("你确定要删除吗?", "温馨提示", ["否", "是"], function (e) {
            if (e.index === 1) {
                //获取到他里面的数据 
                var local = getHistory();
                //删除谁就把他的下标获取到 删除数组对应的下标
                var index = $(this).data('index');
                console.log(index);
                //删除数组中下标为index的
                local.splice(index, 1);
                console.log(local);
                //在把数组重新加入进去 把数组变成json字符串  JSON.stringify()将数组转换成json字符串
                localStorage.setItem('hcc_history', JSON.stringify(local))
                //在重新渲染页面
                render();
            }
        })

    })

    //4. 

    // 搜索功能 获取input中的文本 跳转到 searchList页面
    $('.search_btn').on('click', function () {

        var value = $('.search_text').val();
        if (value === "") {
            mui.toast("请输入搜索的内容");
            return;
        }
        console.log(value);
        //增加功能 每写一个就往数组中添加一个然后就重新渲染 unshift() 向数组开头加入一新的元素
        var history = getHistory();
        var index = history.indexOf(value); //检索字符串在数组中是否有出现 如果没出现就会返回 -1
        if (index != -1) {
            //不等于 -1的话就说明他在数组中存在 删除他
            history.splice(index, 1); //裁切数组 第一个值是裁切的下标

        }
        //因为历史记录不能超过10条 所以在大于9 的时候就删除最早的那条数据
        if (index > 9) {
            history.pop();
        }
        //每一次输入就往最前面添加一个数据
        history.unshift(value);
        //在重新往localStorage添加数据
        localStorage.setItem('hcc_history', JSON.stringify(history));
        //重新渲染
        render();
        location.href = "searchList.html?key="+value;
        // location.href = "searchList.html?key="+val;
    })

    //获取本地存储的localStorage 里面的数据
    function getHistory() {
        var result = localStorage.getItem("hcc_history"); //结果是一个字符串  
        // 把他变成 一个数组 如果没有历史记录的话就是为空 就返回一个空数组
        return JSON.parse(result) || [];
    }

    function render() {
        var history = getHistory();
        console.log(history);
        $('.lt_history').html(template('tpl', {
            list: history
        }));
    }
})