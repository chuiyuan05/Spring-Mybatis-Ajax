/**
 * Created by chuiyuan on 16-9-6.
 */
$(document).ready(function(){
    //read token
    $("button1").click(function(){
        var username = $('#username').val();
        var passwd = $('#passwd').val();
        var user = {username:username, passwd:passwd};
        $.ajax({
            url:'/rest/login',
            type:'POST',
            dataType:'json',
            contentType: "application/json; charset=utf-8",
            timeout:1000,
            data:JSON.stringify(user),
            mimeType:'application/json',
            success: function (data) {
                alert('success:'+data);
                location.href = 'home.html';
            },
            error:function (data, status, er) {
                alert('error:'+data);
            }

        });
    });
    //read session

});