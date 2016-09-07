/**
 * Created by chuiyuan on 16-9-6.
 */
$(document).ready(function(){
    //read token
    $('#bttoken').click(function(){
        console.log($.cookie('token', {path:'/xygl'}));
    });
    //read session
    $('#btusername').click(function () {
        console.log($.cookie('username',{path:'/xygl'}));
    })

});