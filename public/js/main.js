/**
 * Created by pc on 2017/10/24.
 */
$(function() {

    $('.registerBtn').on('click', function() {
        $('.register').show();
        $('.login').hide();
    })

    $('.loginBtn').on('click', function() {
        $('.register').hide();
        $('.login').show();
    })

    $('#submitForm').on('click', function() {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/api/user/register',
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
                repassword: $('#rePassword').val()
            },
            success: function(data) {
                if (!data.code) {
                    $('.register').hide();
                    $('.login').show();
                }
            }
        })
    });

    $('#submitForm_login').on('click', function() {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/api/user/login',
            data: {
                username: $('#username_login').val(),
                password: $('#password_login').val()
            },
            success: function(data) {
                if (!data.code) {
                   window.location.reload();
                }
            }
        })
    })
    $('.loginOut').on('click', function() {
        $.get('/api/user/logout', function(data) {
            if (!data.code) {
                window.location.reload();
            }
        })
    });
});