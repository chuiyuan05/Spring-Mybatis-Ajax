/**
 * Created by chuiyuan on 16-9-5.
 */
function submit () {
    alert('submit username');
    var username = $$('username').value;
    var password = $$('password').value;
    params = username+";"+password ;
    var xmlhttp = getHttpObject();
    xmlhttp.open("POST", "http://localhost:8080/sign.htm", true);
    xmlhttp.send(params) ;
}

$$('sign').addEventListener('click',submit);