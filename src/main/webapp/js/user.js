/*添加用户*/
function newUser(){
	$(".mask").show();
	$('#userDialog').dialog({
		title: '添加用户',
		onClose: function() {
			$(".mask").hide();
		},
	});
	$('#userDialog').dialog('open');
	$('#userForm').form('reset');
	$('#save_btn').click(function(){
      	saveUser("user!add");
    });
}

/*编辑用户*/
function editUser(){
	var row = $('#userTable').datagrid('getSelected');
	if(row){
		$(".mask").show();
		$('#userDialog').dialog({
			title: '编辑用户',
			onClose: function() {
				$(".mask").hide();
			},
		});
		$('#userDialog').dialog('open');
		$$("username_input").value = row.username;
		$$("password_input").value = row.passwd;
		$$("name_input").value = row.name;
		$$("email_input").value = row.email;
		$$("phone_input").value = row.phone;
		//$$("permission_input").value = row.permission;
		var permissions=document.getElementsByName("permission_input");
		var perNum=Number(row.permission);
		for(var i=0;i<4;i++){
			console.log("perNum=="+perNum);
			if(perNum%2==1){
				permissions[i].checked=true;
			}else
				permissions[i].checked=false;
			perNum=parseInt(perNum/2);
		}
		selected_id = row.id;
		$('#save_btn').click(function(){
      		saveUser("user!update");
      	});
	}else{
		$.messager.alert('编辑用户','请先选择要编辑的用户','error');
	}
}

/*删除用户*/
function destroyUser(){
	var row = $('#userTable').datagrid('getSelected');
	if(row){
		$(".mask").show();
		$.messager.confirm('Confirm','您确定删除该用户吗?',function(r){  
            if (r){
				var param = row.id;
				var xmlhttp=new XMLHttpRequest();
				xmlhttp.onreadystatechange= function() {
					if(xmlhttp.readyState==4)
						if(xmlhttp.status==200){
							$('#userTable').datagrid('reload');
							$(".mask").hide();
							return;
						}	
					};
					param = encodeURI(param);
					xmlhttp.open("POST","user!remove",true);
					xmlhttp.send(param);
						
            }else{
				$(".mask").hide();
			}
        });  
	}else{
		$.messager.alert('删除用户','请先选择要删除的用户','error');
	}
}

/*刷新*/
function reloadUser(){
	 $('#userTable').datagrid('reload');
}

/*用户输入信息验证*/
function validateInputUserInfo(userName, password, name, email, phone, permission){
	if(userName==""){
		$$('username_input').focus();
		$("#username_input").next("span").html("不能为空");
		return false;
	}else{
		$("#username_input").next("span").html("");
	}
	if(password==""){
		$$('password_input').focus();
		$("#password_input").next("span").html("不能为空");
		return false;
	}else{
		$("#password_input").next("span").html("");
	}
	if(name==""){
		$$('name_input').focus();
		$("#name_input").next("span").html("不能为空");
		return false;
	}else{
		$("#name_input").next("span").html("");
	}
	if(email==""){
		$$('email_input').focus();
		$("#email_input").next("span").html("不能为空");
		return false;
	}else{
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!filter.test(email)){
			$$('email_input').focus();
			$("#email_input").next("span").html("邮箱格式不正确");
			return false
		}else{
			$("#email_input").next("span").html("");
		}
	}
	if(phone==""){
		$$('phone_input').focus();
		$("#phone_input").next("span").html("不能为空");
		return false;
	}else{
		var filter  = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$)/;
		if(!filter.test(phone)){
			$$('phone_input').focus();
			$("#phone_input").next("span").html("号码格式不正确");
			return false;
		}else{
			$("#phone_input").next("span").html("");
		}
	}
	var checkNum=0;
	for(var i=0;i<permission.length;i++){
		if(permission[i].checked)
			checkNum++;
	}
	if(checkNum==0){
		$(".checks").next("span").html("不能为空");
		return false;
	}else
		$(".checks").next("span").html("");	
	return true;
}


/*保存用户信息*/
function saveUser(url) {
    var userName = $$('username_input').value;
    var password = $$('password_input').value;
    var name = $$("name_input").value;
    var email = $$("email_input").value;
    var phone = $$("phone_input").value;
    var permission = document.getElementsByName("permission_input");
	if(validateInputUserInfo(userName, password, name, email, phone, permission)){
		var permissionValue=0;
		for(var i=0;i<permission.length;i++){
		if(permission[i].checked)
			permissionValue+=Number(permission[i].value);
		}
		var param = userName + ";" + password + ";" + name + ";" + email + ";" + phone + ";" + permissionValue + ";" + selected_id;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) if (xmlhttp.status == 200) {
				var responsetxt = xmlhttp.responseText;
				var returnCode = parseInt(responsetxt.substr(0, responsetxt.indexOf("::")));
				if ( - 1 == returnCode) {
					alert(responsetxt.split("::")[1]);
				}
				$('#userTable').datagrid('reload');
				return;
			}
		};
		param = encodeURI(param);
		xmlhttp.open("POST", url, true);
		xmlhttp.send(param);
		$('#save_btn').unbind("click");
		$('#userDialog').dialog('close');
		$(".mask").hide();
	}
}  