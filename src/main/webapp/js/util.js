/*根据id值获取js元素*/
function $$(id){
	return document.getElementById(id);
}

/*设置cookie值*/
function setCookie(name,value,expireHours){
	var cookieString=name+"="+escape(value);
	//判断是否设置过期时间
	if(expireHours>0){
		var date=new Date();
		date.setTime(date.getTime+expireHours*3600*1000);
		cookieString=cookieString+"; expire="+date.toGMTString();
	}
	document.cookie=cookieString;
}

/*获得cookie*/
function getCookie(name){
	var strCookie=document.cookie;
	var arrCookie=strCookie.split("; ");
	for(var i=0;i<arrCookie.length;i++){
		var arr=arrCookie[i].split("=");
		if(arr[0]==name)
			return arr[1];
	}
	return "";
}
/*判断用户是否登录*/
function checkLogin(){
	var notLogin=1;
	var strCookie=document.cookie;
	var arrCookie=strCookie.split("; ");
	var qxian;
	var name;
	//遍历cookie数组，处理每个cookie对
	for(var i=0;i<arrCookie.length;i++){
		var arr=arrCookie[i].split("=");
		//找到名称为userId的cookie，并返回它的值
		if("qxian"==arr[0]){
			qxian=arr[1];
		}
		if("name"==arr[0]){
			name=arr[1];
			break;
		}
	}
	if(qxian==1 || qxian==2)
		notLogin=0;
	if(notLogin==1)
		window.location.href = "./test.html";
}

/*设置导航处用户信息*/
function setLoginInfo(){
	var strCookie=document.cookie;
	var arrCookie=strCookie.split("; ");
	var name;
	//遍历cookie数组，处理每个cookie对
	for(var i=0;i<arrCookie.length;i++){
		var arr=arrCookie[i].split("=");
		//找到名称为name的cookie，并返回它的值
		if("name"==arr[0]){
			name=arr[1];
			break;
		}
	}
	$$("login_info").innerHTML="欢迎您: "+name+"  "+"| <a href='javascript:logout()'>退出</a>";
}

/*登出*/
function logout(){
	var date=new Date();
	date.setTime(date.getTime()-10000);
	document.cookie="qxian=v; expire="+date.toGMTString();
	document.cookie="name=v; expire="+date.toGMTString();
	window.location.href="./test.html";
}

/*解析字符串获得参数*/
function get_params_from_encode_str(str, deli)
{
	str = base64_decode(str);
	str = decodeURI(str);
	var params = str.split(deli);
	var m = new HashMap();
	for(var i=0;i<params.length;i++)
	{
		var pos = params[i].indexOf('=');
		if(pos!=-1)
		{
			m.put(params[i].substr(0,pos), params[i].substr(pos+1));
		}
	}
	return m;
}

/*base64编码*/
function base64_encode (data) {
	// http://kevin.vanzonneveld.net
	// + original by: Tyler Akins (http://rumkin.com)
	// + improved by: Bayron Guevara
	// + improved by: Thunder.m
	// + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// + bugfixed by: Pellentesque Malesuada
	// + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// + improved by: Rafał Kukawski (http://kukawski.pl)
	// * example 1: base64_encode('Kevin van Zonneveld');
	// * returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
	// mozilla has this native
	// - but breaks in 2.0.0.12!
	//if (typeof this.window['btoa'] === 'function') {
	// return btoa(data);
	//}
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			enc = "",
			tmp_arr = [];

	if (!data) {
		return data;
	}

	do { // pack three octets into four hexets
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);

		bits = o1 << 16 | o2 << 8 | o3;

		h1 = bits >> 18 & 0x3f;
		h2 = bits >> 12 & 0x3f;
		h3 = bits >> 6 & 0x3f;
		h4 = bits & 0x3f;

		// use hexets to index into b64, and append result to encoded string
		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);

	enc = tmp_arr.join('');

	var r = data.length % 3;

	return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

}

/*base64解码*/
function base64_decode (data) {
	// http://kevin.vanzonneveld.net
	// + original by: Tyler Akins (http://rumkin.com)
	// + improved by: Thunder.m
	// + input by: Aman Gupta
	// + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// + bugfixed by: Onno Marsman
	// + bugfixed by: Pellentesque Malesuada
	// + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// + input by: Brett Zamir (http://brett-zamir.me)
	// + bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// * example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
	// * returns 1: 'Kevin van Zonneveld'
	// mozilla has this native
	// - but breaks in 2.0.0.12!
	//if (typeof this.window['atob'] === 'function') {
	// return atob(data);
	//}
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			dec = "",
			tmp_arr = [];

	if (!data) {
		return data;
	}

	data += '';

	do { // unpack four hexets into three octets using index points in b64
		h1 = b64.indexOf(data.charAt(i++));
		h2 = b64.indexOf(data.charAt(i++));
		h3 = b64.indexOf(data.charAt(i++));
		h4 = b64.indexOf(data.charAt(i++));

		bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

		o1 = bits >> 16 & 0xff;
		o2 = bits >> 8 & 0xff;
		o3 = bits & 0xff;

		if (h3 == 64) {
			tmp_arr[ac++] = String.fromCharCode(o1);
		} else if (h4 == 64) {
			tmp_arr[ac++] = String.fromCharCode(o1, o2);
		} else {
			tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
		}
	} while (i < data.length);

	dec = tmp_arr.join('');

	return dec;
}


/*HashMap的定义*/
function HashMap() {
	this.elements = new Array();

	//获取MAP元素个数
	this.size = function() {
		return this.elements.length;
	}

	//判断MAP是否为空
	this.isEmpty = function() {
		return (this.elements.length < 1);
	}

	//删除MAP所有元素
	this.clear = function() {
		this.elements = new Array();
	}

	//向MAP中增加元素（key, value) 
	this.put = function(_key, _value) {

		for(i=0;i<this.elements.length;i++)
		{
			if(this.elements[i].key==_key)
			{
				this.elements[i].value = _value;
				return;
			}
		}

		this.elements.push( {
			key : _key,
			value : _value
		});
	}

	//删除指定KEY的元素，成功返回True，失败返回False
	this.remove = function(_key) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					this.elements.splice(i, 1);
					return true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	}

	//获取指定KEY的元素值VALUE，失败返回NULL
	this.get = function(_key) {
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					return this.elements[i].value;
				}
			}
		} catch (e) {
			return null;
		}
	}

	//获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
	this.element = function(_index) {
		if (_index < 0 || _index >= this.elements.length) {
			return null;
		}
		return this.elements[_index];
	}

	//判断MAP中是否含有指定KEY的元素
	this.containsKey = function(_key) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	}

	//判断MAP中是否含有指定VALUE的元素
	this.containsValue = function(_value) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].value == _value) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	}

	//获取MAP中所有VALUE的数组（ARRAY）
	this.values = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].value);
		}
		return arr;
	}

	//获取MAP中所有KEY的数组（ARRAY）
	this.keys = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].key);
		}
		return arr;
	}

	this.cp = function()
	{
		var cm = new HashMap();
		var props = this.keys();
		for(i=0;i<props.length;i++)
		{
			var attr = props[i];
			cm.put(attr,this.get(attr));
		}
		return cm;
	}

	this.tostring = function(){
		var str = '';
		var props = this.keys();
		for(i=0;i<props.length;i++)
		{
			var prop = props[i];
			str += '&&' + prop + '=' + this.get(prop);
		}
		return str;
	}
}

/*根据id值和百分比获得宽度*/
function getWidth(id,percent){
	return document.getElementById(id).offsetWidth*percent;
}

/*根据url获取信息*/
function get_sys_arg(url)
{
	var obj = new Object();
	args = url.split('?');
	if(args.length==1)
	{
		obj.user_name = '';
		obj.quan_xian = '0000';
		obj.user_manage_right = '0';
		obj.allocate_right = '0';
		obj.check_right = '0';
		obj.config_right = '0';
	}
	else
	{
		params = base64_decode(args[1]).split('::');
		obj.user_name = params[1];
		obj.quan_xian = params[0];
		obj.user_manage_right = params[0].charAt(0);
		obj.allocate_right = params[0].charAt(1);
		obj.check_right = params[0].charAt(2);
		obj.config_right = params[0].charAt(3);
	}
	return obj;
}

/*获取select的text值*/
function getSelectText(selid){
	var sel = document.getElementById(selid);
	return sel.options[sel.selectedIndex].text;
}
/*获取select的value值*/
function getSelectValue(selid){
	var sel = document.getElementById(selid);
	return sel.options[sel.selectedIndex].value;
}

/*获取所有的系统信息*/
function getAllSystem() {
    $.post("sys!list", "",
    function(data) {
        var res = eval("(" + data + ")");
        //填充系统表格
        var inhtml = "";
        if (res.total > 0) {
            for (var i = 0; i < res.total; i++) {
                inhtml += "<tr for='system-" + res.rows[i].system_id + "' value='" + res.rows[i].name + "'>";
                inhtml += "<td>" + res.rows[i].system_id + "</td>";
                inhtml += "<td>" + res.rows[i].name + "</td>";
                inhtml += "</tr>"
            }
            $$("systemInfo").innerHTML = inhtml;
            $("#systemInfo tr").click(function() {
                select(true, this);
            });
        } else {
            $$("systemInfo").innerHTML = "无数据";
        }
    });
}