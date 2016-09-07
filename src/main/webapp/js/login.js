/**
 * Created by chuiyuan on 16-9-5.
 */
$(document).ready(function(){
    $("button").click(function(){
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
                if(data.meta.success){
                    var token = data.data.token ;
                    var username = data.data.username;
                    console.log('token:'+token+' ,username:'+username);
                    // save to cookie and then jump to home
                    $.cookie('token',token,{expires:1});
                    $.cookie('username',username, { expires:1});
                    location.href = 'home.html';
                }else {
                    var msg = data.meta.message;
                    console.log('fail msg:'+msg);
                }
            },
            error:function (data, status, er) {
                console.log('http error:'+data);
            }

        });
    });

});