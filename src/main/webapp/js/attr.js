/*添加属性*/
function newAttr(){
	$(".mask").show();
	$('#attrDialog').dialog({
		title: '添加属性',
		onClose: function() {
			$(".mask").hide();
		},
	});
	$('#attrDialog').dialog('open');
	$('#attrForm').form('reset');
	$('#save_btn').click(function(){
      	saveAttr("attr!add");
    });
}
/*验证属性值*/
function validateAttr(attrName, default_value){
	if(attrName==""){
		$$('attrname_input').focus();
		$("#attrname_input").next("span").html("不能为空");
		return false;
	}else{
		$("#attrname_input").next("span").html("");
	}
	if(default_value==""){
		$$('default_value_input').focus();
		$("#default_value_input").next("span").html("不能为空");
		return false;
	}else{
		$("#default_value_input").next("span").html("");
	}
	return true;
}
/*保存属性值并刷新属性列表*/
function saveAttr(url) {
    var attrName = $$('attrname_input').value;
    var default_value = $$('default_value_input').value;
    var required_value = $("#required_select").val();
	if(validateAttr(attrName, default_value)){
		var param = attrName + ";" + default_value + ";" + required_value + ";"
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) if (xmlhttp.status == 200) {
				var responsetxt = xmlhttp.responseText;
				var returnCode = parseInt(responsetxt.substr(0, responsetxt.indexOf("::")));
				if ( - 1 == returnCode) {
					alert(responsetxt.split("::")[1]);
				}
				$('#attrTable').datagrid('reload');
				$(".mask").hide();
				return;
			}
		};
		param = encodeURI(param);
		xmlhttp.open("POST", url, true);
		xmlhttp.send(param);
		$('#save_btn').unbind("click");
		$('#attrDialog').dialog('close');
	}
}

/*删除属性并刷新属性列表*/
function destroyAttr(){
	var row = $('#attrTable').datagrid('getSelected');
	if(row){
		$(".mask").show();
		$.messager.confirm('Confirm','您确定删除该属性吗?',function(r){  
            if (r){
				var param = row.attr_id;
				var xmlhttp=new XMLHttpRequest();
				xmlhttp.onreadystatechange= function() {
					if(xmlhttp.readyState==4)
						if(xmlhttp.status==200){
							$('#attrTable').datagrid('reload');
							$(".mask").hide();
							return;
						}	
					};
					param = encodeURI(param);
					xmlhttp.open("POST","attr!remove",true);
					xmlhttp.send(param);
						
            }else{
				$(".mask").hide();
			}
        });  
	}else{
		$.messager.alert('删除属性','请先选择要删除的属性','error');
	}
}

/*刷新属性列表*/
function reloadAttr(){
	$('#attrTable').datagrid('reload');
}

//批量操作信源
function batch_relate() {
    var rows = $("#attrRelationTable").datagrid("getSelections");
    var inhtml = "";
    var relateCids = "";
    $("#systemInfo tr").removeClass("selected");
    $("#systemInfo tr").unbind("click").removeAttr("onclick").click(function() {
        select(true, this)
    });
    for (var i = 0; i < rows.length; i++) {
        relateCids += rows[i].attr_id + ",";
        inhtml += "<tr><td>" + rows[i].attr_id + "</td>";
        inhtml += "<td>" + rows[i].name + "</td>";
        inhtml += "<td>" + rows[i].default_value + "</td>";
        inhtml += "<td>" + rows[i].required + "</td>";
        inhtml += "<td>" + rows[i].time_m + "</td>";
        inhtml += "</tr>";
    }
    $$("relateCids").value = relateCids.substr(0, relateCids.length - 1);
    $$("system_ids").value = ",";
    $$("sourceInfo").innerHTML = inhtml;
    $$("systems_selected").innerHTML = "";
	
    $$("sys_btns").innerHTML = '<button class="btn" onclick="set_relate()"><i class="fa fa-check green"></i>&nbsp;保存关联</button><button class="btn" onClick="unset_relate()"><i class="fa fa-ban red"></i>&nbsp;取消关联</button><button class="btn close-reveal-modal"><i class="fa fa-close red"></i>&nbsp;取消</button>';
    var a="{revealId:'relate_dialog',animation:\"none\"}";
	var obj=new Function("return "+a)();
	$("#relate_dialog").reveal(obj);
}

//编辑单条信源
function edit_relate() {
    var system_ids = ",";
    var row = $("#attrRelationTable").datagrid("getSelected");
    $$("sourceInfo").innerHTML = "<tr><td>" + row.attr_id + "</td><td>" + row.name + "</td><td>" + row.default_value + "</td><td>" + row.required + "</td><td>" + row.time_m + "</td></tr>";
    var inhtml = "";
    $("#systemInfo tr").removeClass("selected");
    $("#systemInfo tr").unbind("click").removeAttr("onclick").click(function() {
        select(true, this)
    });
    $$("systems_selected").innerHTML = "";
    //获取信源关联的系统
    var param = "attrId=" + row.attr_id;
    $.post("attrSystem!listByAttId", encodeURI(param),
    function(data) {
        console.log("返回系统信息" + data + "等等");
        if (data != "[]") {
            var dataArr = eval('(' + data + ')');
            for (var i = 0; i < dataArr.length; i++) {
                system_ids += dataArr[i] + ",";
                $("#systemInfo tr[for=system-" + dataArr[i] + "]").addClass("selected");
                $("#systemInfo tr[for=system-" + dataArr[i] + "]").unbind("click").removeAttr("onclick").click(function() {
                    select(false, this)
                });
                inhtml += "<div class='system-item' id='" + dataArr[i] + "'>" + $("#systemInfo tr[for=system-" + dataArr[i] + "]").attr("value") + "<a href=\"javascript:deleteSystem(" + dataArr[i] + ",'" + $("#systemInfo tr[for=system-" + dataArr[i] + "]").attr("value") + "')\">&#215;</a></div>";

            }
        }
        $$("systems_selected").innerHTML = inhtml;
        $$("system_ids").value = system_ids;
    });
    $$("relateCids").value = row.attr_id;

    $$("sys_btns").innerHTML = '<button class="btn" onclick="save()"><i class="fa fa-check green"></i>&nbsp;保存</button><button class="btn close-reveal-modal"><i class="fa fa-close red"></i>&nbsp;取消</button>';
    var a="{revealId:'relate_dialog',animation:\"none\"}";
	var obj=new Function("return "+a)();
	$("#relate_dialog").reveal(obj);
}

//批量关联
function set_relate() {
    var relateCids = $$("relateCids").value;
    var system_ids = $$("system_ids").value;
    console.log("relateCids==" + relateCids + "system_ids==" + system_ids);
    relateCids = relateCids.replace(/(^\s*)|(\s*$)/g, "");
    system_ids = system_ids.replace(/(^\s*)|(\s*$)/g, "");
    if (system_ids == ",") {
        alert("选择要关联的系统");
        return false;
    } else {
        system_ids = system_ids.substr(0, system_ids.length - 1);
        system_ids = system_ids.substr(1, system_ids.length);
        var params = "relateAttrIds=" + relateCids + "&system_ids=" + system_ids;
        console.log("批量关联的参数------" + params);
        $.post("attrSystem!relateBatch", encodeURI(params),
        function(data) {
            var res = eval("(" + data + ")");
            if (res.success) {
                alert("关联成功");
                $("#relate_dialog").trigger('reveal:close');
                var paramsVal = encodeURI(searchParams);
                paramsVal = "attr!search" + '?' + paramsVal;
                $('#attrRelationTable').datagrid('options').url = paramsVal;
                $("#attrRelationTable").datagrid("clearSelections");
                $('#attrRelationTable').datagrid('reload');
            } else {
                alert("关联失败");
            }
        });

    }
}

//批量取消关联
function unset_relate() {
    var relateCids = $$("relateCids").value;
    var system_ids = $$("system_ids").value;
    console.log("relateCids==" + relateCids + "system_ids==" + system_ids);
    relateCids = relateCids.replace(/(^\s*)|(\s*$)/g, "");
    system_ids = system_ids.replace(/(^\s*)|(\s*$)/g, "");
    if (system_ids == ",") {
        alert("选择要关联的系统");
        return false;
    } else {
        system_ids = system_ids.substr(0, system_ids.length - 1);
        system_ids = system_ids.substr(1, system_ids.length);
        var params = "relateAttrIds=" + relateCids + "&system_ids=" + system_ids;
        console.log("批量取消关联的参数------" + params);
        $.post("attrSystem!unrelateBatch", encodeURI(params),
        function(data) {
            var res = eval("(" + data + ")");
            if (res.success) {
                alert("取消关联成功");
                $("#relate_dialog").trigger('reveal:close');
                /*$.post("attr!search", encodeURI(searchParams),function(data){
						$('#dg').datagrid('reload');
					});*/
                var paramsVal = encodeURI(searchParams);
                paramsVal = "attr!search" + '?' + paramsVal;
                $('#attrRelationTable').datagrid('options').url = paramsVal;
                $("#attrRelationTable").datagrid("clearSelections");
                $('#attrRelationTable').datagrid('reload');
            } else {
                alert("取消关联失败");
            }
        });

    }
}

//单条信源编辑保存
function save() {
    var relateCids = $$("relateCids").value;
    var system_ids = $$("system_ids").value;
    console.log("relateCids==" + relateCids + "system_ids==" + system_ids);
    relateCids = relateCids.replace(/(^\s*)|(\s*$)/g, "");
    system_ids = system_ids.replace(/(^\s*)|(\s*$)/g, "");
    if (system_ids == ",") {
        alert("选择要关联的系统");
        return false;
    } else {
        system_ids = system_ids.substr(0, system_ids.length - 1);
        system_ids = system_ids.substr(1, system_ids.length);
        var params = "attrId=" + relateCids + "&system_ids=" + system_ids;
        console.log("保存的参数------" + params);
        $.post("attrSystem!save", encodeURI(params),
        function(data) {
            console.log(data);
            var res = eval("(" + data + ")");
            if (res.success) {
                alert("保存成功");
                $("#relate_dialog").trigger('reveal:close');
                var paramsVal = encodeURI(searchParams);
                paramsVal = "attr!search" + '?' + paramsVal;
                $('#attrRelationTable').datagrid('options').url = paramsVal;
                $("#attrRelationTable").datagrid("clearSelections");
                $('#attrRelationTable').datagrid('reload');
            } else {
                alert("保存失败");
            }
        });

    }
}

function search() {
    //获取检索项信息
    var attr_id = $$('attr_id_input').value;
    var attr_name = $$('attr_name_input').value;
    var attr_required = $$('attr_required').value;
    var modify_time_from = $$('modify_start_time').value;
    var modify_time_to = $$('modify_end_time').value;

    var deli = "&";
    var param = 'attr_id=' + attr_id + deli + 'name=' + attr_name + deli + 'required=' + attr_required + deli + 'time_m_from=' + modify_time_from + deli + 'time_m_to=' + modify_time_to;
    searchParams = param;
    param = encodeURI(param);
    param = "attr!search" + '?' + param;
    $('#attrRelationTable').datagrid({
        url: param,
        method: 'post'
    });
}

function select(flag, obj) {
    var name = $(obj).attr("value");
    var id = $(obj).attr("for").split("-")[1];
    if (flag) {
        var selectHTML = $$("systems_selected").innerHTML;
        if ($$(id)) {
            $("#" + id).show();
        } else {
            selectHTML += "<div class='system-item' id='" + id + "'>" + name + "<a href=\"javascript:deleteSystem(" + id + ",'" + name + "')\">&#215;</a></div>";
            $$("systems_selected").innerHTML = selectHTML;
        }
        $(obj).addClass("selected");
        $(obj).unbind("click").removeAttr("onclick").click(function() {
            select(false, this)
        });
        $$("system_ids").value = $$("system_ids").value + id + ",";
    } else {
        deleteSystem(id, name);
    }
}

function deleteSystem(id, name) {
    $("#" + id).hide();
    $("#systemInfo tr[for=system-" + id + "]").unbind("click").removeAttr("onclick").click(function() {
        select(true, this)
    });
    $("#systemInfo tr[for=system-" + id + "]").removeClass("selected");
    $$("system_ids").value = $$("system_ids").value.replace("," + id + ",", ",");
}