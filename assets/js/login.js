$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        var data = {
            username: $('#form-reg [name=uname]').val(),
            password: $('#form-reg [name=password]').val()
        };
        $.post('http://ajax.frontend.itheima.net/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layui.msg('注册成功，请登录！')
                //模拟人点击
                $('#link-login').click()
            })
    })
    // 监听登录表单事件
    $('#form-login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'post',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
                layer.msg('登陆成功');
                //将登录成功得到 token 字符串，保存到 localStorage中
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href='/index.html';
            }
        })
    })







})