/**
 * Created by chuiyuan on 16-9-6.
 */
$(document).ready(function(){
    //read token
    $('#bttoken').click(function(){
        alert($.cookie('token'));
    });
    //read session
    $('#btusername').click(function () {
        alert($.cookie('username'));
    });
    $('#btlogout').click(function () {
       $.ajax({
           url:'/logout',
           type:'POST',
           success:function (data) {
               if(data.meta.success){
                   console.log("logout success");
                   location.href = '/pages/login.html';
               }else {
                   console.log("logout failed");
                   location.href = '/pages/login.html';
               }
           },
           error: function (data, status, err) {
               console.log("logout failed");
               location.href = '/pages/login.html';
           }
       });
    });

});