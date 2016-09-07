/**
 * Created by chuiyuan on 16-9-6.
 */
$(document).ready(function(){
    //
    var token = $.cookie('token');
    if(!token || !token.length)
        location.href = 'login.js';

    //read token
    $('#bttoken').click(function(){
        console.log($.cookie('token'));
    });
    //read session
    $('#btusername').click(function () {
        console.log($.cookie('username'));
    })

});