/*添加应用系统*/
function newSys(){
	$(".mask").show();
	$('#sysDialog').dialog({
		title: '添加系统',
		onClose: function() {
			$(".mask").hide();
		},
	});
	$('#sysDialog').dialog('open');
	$('#sysForm').form('reset');
	$('#save_btn').click(function(){
		saveSys("sys!save");	
    });
	$(".mask").click(function(){
		$('#sysDialog').dialog('close');
		$(".mask").hide();
	});
}

/*验证系统信息*/
function validateSys(sysName, ipCtrl){
	if(sysName==""){
		$$('sysname_input').focus();
		$("#sysname_input").next("span").html("不能为空");
		return false;
	}else{
		$("#sysname_input").next("span").html("");
	}
	if(ipCtrl==""){
		$$('ip_input').focus();
		$("#ip_input").next("span").html("不能为空");
		return false;
	}else{
		$("#ip_input").next("span").html("");
	}
	return true;
}

/*保存新增系统的信息*/
function saveSys(url) {
    var sysName = $$('sysname_input').value;
    var ipCtrl = $$('ip_input').value;
    var comment = $$('comment_input').value;
    var state = $("#state_select").val();
	if(validateSys(sysName, ipCtrl)){
		var param = sysName + ";" + ipCtrl + ";" + comment + ";" + state;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4)
				if (xmlhttp.status == 200) {
					var responsetxt = xmlhttp.responseText;
					var returnCode = parseInt(responsetxt.substr(0, responsetxt.indexOf("::")));
					if ( - 1 == returnCode) {
						alert(responsetxt.split("::")[1]);
					}
					$('#sysTable').datagrid('reload');
					return;
				}
			};
		param = encodeURI(param);
		xmlhttp.open("POST", url, true);
		xmlhttp.send(param);
		$('#save_btn').unbind("click");
		$('#sysDialog').dialog('close');
	}
}
		
/*删除应用系统*/
function destroySys(){
	var row = $('#sysTable').datagrid('getSelected');
	if(row){
		$(".mask").show();
		$.messager.confirm('Confirm','您确定删除该应用系统吗?',function(r){  
            if (r){
				var param = row.system_id;
				var xmlhttp=new XMLHttpRequest();
				xmlhttp.onreadystatechange= function() {
					if(xmlhttp.readyState==4)
						if(xmlhttp.status==200){
							$('#sysTable').datagrid('reload');
							$(".mask").hide();
							return;
						}	
					};
					param = encodeURI(param);
					xmlhttp.open("POST","sys!remove",true);
					xmlhttp.send(param);
						
            }else{
				$(".mask").hide();
			}
        });  
	}else{
		$.messager.alert('删除应用系统','请先选择要删除的应用系统','error');
	}
}

/*刷新*/
function reloadSys(){
	$('#sysTable').datagrid('reload');
}