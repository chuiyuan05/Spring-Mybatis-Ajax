//定义是否全选的参数
var isCheckAll=0;//初始非全选
function init() {
    sys_username = getCookie('name');
    $.post("user!list", "",
    function(data) {
        var res = eval("(" + data + ")");
        for (var i = 0; i < res.total; i++) {
            if (1 == res.rows[i].id) continue;
            $("<option value='" + res.rows[i].id + "'>" + res.rows[i].username + "</option>").appendTo("#configer_select");
            $("<option value='" + res.rows[i].id + "'>" + res.rows[i].username + "</option>").appendTo("#allocate_configer_select");
			$("<option value='" + res.rows[i].id + "'>" + res.rows[i].username + "</option>").appendTo("#configer_dlg");
        }
    });
	//获取所有的系统信息
	getAllSystem();
}

//批量操作信源
/*function batch_relate() {
    var rows = $("#sysRelationTable").datagrid("getSelections");
    var inhtml = "";
    var relateCids = "";
    $("#systemInfo tr").removeClass("selected");
    $("#systemInfo tr").unbind("click").removeAttr("onclick").click(function() {
        select(true, this)
    });
    for (var i = 0; i < rows.length; i++) {
        relateCids += rows[i].board_id + ",";
        inhtml += "<tr><td>" + rows[i].board_id + "</td>";
        inhtml += "<td>" + rows[i].board_name + "</td>";
        inhtml += "<td>" + rows[i].state + "</td>";
        inhtml += "<td>" + rows[i].time_m + "</td>";
        inhtml += "</tr>";
    }
    $$("relateCids").value = relateCids.substr(0, relateCids.length - 1);
    $$("system_ids").value = ",";
    $$("sourceInfo").innerHTML = inhtml;
    $$("systems_selected").innerHTML = "";

    $$("sys_btns").innerHTML = '<button class="btn" onclick="set_relate()"><i class="fa fa-check green"></i>&nbsp;保存关联</button><button class="btn" onClick="unset_relate()"><i class="fa fa-ban red"></i>&nbsp;取消关联</button><button class="btn close-reveal-modal"><i class="fa fa-close red"></i>&nbsp;取消</button>';
    var a = "{revealId:'relate_dialog',animation:\"none\"}";
    var obj = new Function("return " + a)();
    $("#relate_dialog").reveal(obj);
}

//编辑单条信源
function edit_relate() {
    var system_ids = ",";
    var row = $("#sysRelationTable").datagrid("getSelected");
    $$("sourceInfo").innerHTML = "<tr><td>" + row.board_id + "</td><td>" + row.board_name + "</td><td>" + row.state + "</td><td>" + row.time_m + "</td></tr>";
    var inhtml = "";
    $("#systemInfo tr").removeClass("selected");
    $("#systemInfo tr").unbind("click").removeAttr("onclick").click(function() {
        select(true, this)
    });
    $$("systems_selected").innerHTML = "";
    //获取信源关联的系统
    var param = "cid=" + row.board_id;
    $.post("boardSystem!listByCid", encodeURI(param),
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
    $$("relateCids").value = row.board_id;

    $$("sys_btns").innerHTML = '<button class="btn" onclick="save()"><i class="fa fa-check green"></i>&nbsp;保存</button><button class="btn close-reveal-modal"><i class="fa fa-close red"></i>&nbsp;取消</button>';
    var a = "{revealId:'relate_dialog',animation:\"none\"}";
    var obj = new Function("return " + a)();
    $("#relate_dialog").reveal(obj);
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
        var params = "cid=" + relateCids + "&system_ids=" + system_ids;
        console.log("保存的参数------" + params);
        $.post("boardSystem!save", encodeURI(params),
        function(data) {
            var res = eval("(" + data + ")");
            if (res.success) {
                alert("保存成功");
                $("#relate_dialog").trigger('reveal:close');
                var paramsVal = encodeURI(searchParams);
                paramsVal = "boardConfig!search" + '?' + paramsVal;
                $('#sysRelationTable').datagrid('options').url = paramsVal;
                $("#sysRelationTable").datagrid("clearSelections");
                $('#sysRelationTable').datagrid('reload');
            } else {
                alert("保存失败");
            }
        });

    }
}*/

/*function searchSource() {
    //获取检索项信息
    var board_id = $$('board_id_input').value;
    var board_name = $$('board_name_input').value;
    var config_status = $$('config_status_select').value;
    var configer_select = $$('configer_select').value;
    var import_time_from = $$('create_start_time').value;
    var import_time_to = $$('create_end_time').value;
    var modify_time_from = $$('modify_start_time').value;
    var modify_time_to = $$('modify_end_time').value;
    var site_name = "";
    var board_url = "";

    var deli = "&";
    var param = 'site_name=' + site_name + deli + 'board_id=' + board_id + deli + 'board_name=' + board_name + deli + 'board_url=' + board_url + deli + 'import_time_from=' + import_time_from + deli + 'import_time_to=' + import_time_to + deli + 'modify_time_from=' + modify_time_from + deli + 'modify_time_to=' + modify_time_to + deli + 'configer=' + configer_select + deli + 'config_status=' + config_status;
    searchParams = param;
    param = encodeURI(param);
    param = "boardConfig!search" + '?' + param;
    $('#sysRelationTable').datagrid({
        url: param,
        method: 'post'
    });
}*/



/*-----查询修改页面的函数------*/
/*查询函数*/
/*function searchBoard() {
		var site_name = $$('sitename_input').value;
		var board_id = $$('boardid_input').value;
		var board_name = $$('boardname_input').value;
		var board_url = $$('boardUrl_input').value;
		var import_time_from = $$('import_time_from_input').value;
		var import_time_to = $$('import_time_to_input').value;
		var modify_time_from = $$('modify_time_from_input').value;
		var modify_time_to = $$('modify_time_to_input').value;
		var configer = $$('configer_select').value;
		var config_status = $$('configstatus_select').value;
		var deli = "&";
		var param = 'site_name=' + site_name + deli + 'board_id=' + board_id
				+ deli + 'board_name=' + board_name + deli + 'board_url='
				+ board_url + deli + 'import_time_from=' + import_time_from
				+ deli + 'import_time_to=' + import_time_to + deli
				+ 'modify_time_from=' + modify_time_from + deli
				+ 'modify_time_to=' + modify_time_to + deli + 'configer='
				+ configer + deli + 'config_status=' + config_status;
		param = encodeURI(param);

		param = "boardConfig!search" + '?' + param;
		$('#boardTable').datagrid({
			url : param,
			method : 'post'
		});
	}*/

/*-----------------------------------------------------------
-------------------------------------------------------------
-------------------------------------------------------------*/
/*------信源管理页面------*/

/*导入信源*/			
function importSource(){
	alert("导入信源");
}

/*导出信源*/
function exportSource(){
	alert("导出信源");
}

/*新增信源*/
function addSource(){
	$(".mask").show();
    $('#addBoardDialog').dialog({
        onClose: function() {
            $(".mask").hide();
        },
    });
    $('#addBoardDialog').dialog('open');
	$(".mask").click(function(){
		$('#addBoardDialog').dialog('close');
		$(".mask").hide();
	});
}

/*修改信源*/
function modSource(){
	var rows = $('#boardTable').datagrid('getSelections');
    if (rows.length==1) {
        $(".mask").show();
        $('#boardDialog').dialog({
            onClose: function() {
                $(".mask").hide();
            },
        });
		var row=rows[0];
        $('#boardDialog').dialog('open');
        $('#boardForm').form('reset');
		/*填充表单中各项值*/
		$$("board_id_titile").innerHTML=row.board_id;
		$$("boardname_dlg").value=row.board_name;
		$$("boardentry_dlg").value=row.board_entry;
		$$("siteid_dlg").value=row.site_id;
		$$("sitename_dlg").value=row.site_name;
		$$("sitedomain_dlg").value=row.site_domain;
		$$("siteentry_dlg").value=row.site_entry;
		$$("channelid_dlg").value=row.channel_id;
		$$("version_dlg").value=row.version;
		if (row.state == "无效") {
			$("#state_dlg").val(0);
		}
		if (row.state == "未指派") {
			$("#state_dlg").val(1);
		}
		if (row.state == "已指派") {
			$("#state_dlg").val(2);
		}
		if (row.state == "配置中") {
			$("#state_dlg").val(3);
		}
		if (row.state == "正常") {
			$("#state_dlg").val(4);
		}
		if (row.state == "停用") {
			$("#state_dlg").val(5);
		}
		if (row.state == "失效") {
			$("#state_dlg").val(6);
		}
		$("#configer_dlg").val(row.user_id);
		$$("modifytime_dlg").value=row.time_m;
		$$("createtime_dlg").value=row.time_c;
		$$("schedule_dlg").value=row.schedule;
		$$("config_dlg").value=row.config;
		$$("comment_dlg").value=row.comment;
		$$("classify_dlg").value=row.f_class;
    } else if(rows.length==0){
        $.messager.alert('编辑信源', '请先选择要编辑的信源', 'error');
    }else{
		$.messager.alert('编辑信源', '一次只能修改一条信源', 'error');
	}
	$(".mask").click(function(){
		$('#boardDialog').dialog('close');
		$(".mask").hide();
	});
}

/*保存信源修改*/
function saveBoard() {
    var board_id = $('#board_id_titile').text();
    var board_name = $('#boardname_dlg').val();
    var board_entry = $('#boardentry_dlg').val();
    var site_id = $('#siteid_dlg').val();
    var site_name = $('#sitename_dlg').val();
    var site_domain = $('#sitedomain_dlg').val();
    var site_entry = $('#siteentry_dlg').val();
    var channel_id = $('#channelid_dlg').val();
    var version = $('#version_dlg').val();
    var state = $('#state_dlg').val();
    var user_id = $('#configer_dlg').val();
    var time_m = $('#modifytime_dlg').val();
    var time_c = $('#createtime_dlg').val();
    var schedule = $('#schedule_dlg').val();
    var config = $('#config_dlg').val();
    var comment = $('#comment_dlg').val();
    var classify = $('#classify_dlg').val();
    var params = 'board_id=' + board_id + '&' + 'board_name=' + board_name + '&' + 'board_entry=' + board_entry + '&' + 'site_id=' + site_id + '&' + 'site_name=' + site_name + '&' + 'site_domain=' + site_domain + '&' + 'site_entry=' + site_entry + '&' + 'channel_id=' + channel_id + '&' + 'version=' + version + '&' + 'state=' + state + '&' + 'user_id=' + user_id + '&' + 'time_m=' + time_m + '&' + 'time_c=' + time_c + '&' + 'schedule=' + schedule + '&' + 'config=' + config + '&' + 'comment=' + comment + '&' + 'classify=' + classify;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) if (xmlhttp.status == 200) {
            var responsetxt = xmlhttp.responseText;
            $('#boardTable').datagrid('reload');
			$(".mask").hide();
            return;
        }
    };
    params = encodeURI(params);
    xmlhttp.open("POST", "boardConfig!save", true);
    xmlhttp.send(params);
    $('#boardDialog').dialog('close');
}

/*全部选择*/
function allSelect(){
	$('#boardTable').datagrid('checkAll');
	$$("allSelectBtn").innerHTML="<i class='fa fa-list-ul'></i>&nbsp;取消全选";
	$("#allSelectBtn").unbind().removeAttr("onclick").bind("click",function(){
		unAllSelect();
	});
	isCheckAll=1;
	$$("checkAllInfo").innerHTML="所有信源都被选中";
}
function unAllSelect(){
	$('#boardTable').datagrid('uncheckAll');
	$$("allSelectBtn").innerHTML="<i class='fa fa-list-ul'></i>&nbsp;全部选择";
	$("#allSelectBtn").unbind().removeAttr("onclick").bind("click",function(){
		allSelect();
	});
	isCheckAll=0;
	$$("checkAllInfo").innerHTML="";
}

/*指派配置人*/
function allocateConfiger(){
	var rows = $('#boardTable').datagrid('getSelections');console.log("rows.length=="+rows.length);
	var sourceIds="";
	if(rows.length==0){
		$.messager.alert('指派配置人', '请先选择要指派的信源', 'error');
	}else{
		$(".mask").show();
        $('#configerDialog').dialog({
            onClose: function() {
                $(".mask").hide();
            },
        });
		$('#configerDialog').dialog('open');
		for(var i=0;i<rows.length;i++){
			sourceIds+=rows[i].board_id+"  ";
		}
		$$("sourceId").innerHTML="将要把信源 <font color='#f00000'>"+sourceIds+"</font>";
	}
	$(".mask").click(function(){
		$('#configerDialog').dialog('close');
		$(".mask").hide();
	});
}

/*保存指派联系人的配置信息*/
function saveAllocateConfig() {
    /*var strConfigING = "";
    var configState;
    var pos1;
    var deli = '&';
    var param = 'id=';
    var rows = $('#attrRelationTable').datagrid('getSelections');
    var range = getSelectText('allocate_category_select') == '应用于本版块' ? 0 : 1;

    if (rows.length == 0) {
        $.messager.alert('错误', '至少选中一个版块', 'warning');
        return;
    }

    for (var i = 0; i < rows.length; i++) {
        configState = rows[i].state;
        pos1 = configState.indexOf("配置中");
        if (pos1 != -1) {
            //配置中的版块不允许分发
            strConfigING = strConfigING + "," + rows[i].board_id;

        } else {
            if (range == 0) param += rows[i].board_id + ",";
            else param += rows[i].site_id + ",";
        }
    }
    param = param.substring(0, param.length - 1);

    var allc_configer = $('#allocate_configer_select').val();
    if (allc_configer == '') {
        $.messager.alert('错误', '配置人不能为空', 'warning');
        return;
    }

    var finish_time = $$('allocate_finish_time_input').value;
    if (finish_time == '') {
        $.messager.alert('错误', '预期完成时间不能为空', 'warning');
        return;
    }

    param += '' + deli + 'configer_id=' + allc_configer + deli + 'range=' + range + deli + 'finish_time=' + finish_time + deli + 'user=' + sys_username;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) if (xmlhttp.status == 200) {
            $('#relateDialog').dialog('close');
            $('#attrRelationTable').datagrid('reload');
            $(".mask").hide();

            if (strConfigING != "") {
                $.messager.alert('错误', '“配置中”的版块不允许分发：' + strConfigING.substr(1), 'warning');
            }
        }
    };

    param = encodeURI(param);
    xmlhttp.open("POST", "boardConfig!allocate", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xmlhttp.send(param);*/
}

/*关联系统*/
function relateSystem(){
	var rows = $('#boardTable').datagrid('getSelections');
    var relateCids = "";
    $("#systemInfo tr").removeClass("selected");
    $("#systemInfo tr").unbind("click").removeAttr("onclick").click(function() {
        select(true, this);
    });
	if(rows.length==0){
		$.messager.alert('关联系统', '请先选择要关联的信源', 'error');
	}else{
		$(".mask").show();
        $('#relateSystemDialog').dialog({
            onClose: function() {
                $(".mask").hide();
            },
        });
		$$("selectedBoard").innerHTML="已选中<font color='#f00000'>"+rows.length+"</font>条信源,请选择要关联或取消关联的系统</p>";
		$('#relateSystemDialog').dialog('open');
		for (var i = 0; i < rows.length; i++) {
			relateCids += rows[i].board_id + ",";
		}
		$$("relateCids").value = relateCids.substr(0, relateCids.length - 1);
		$$("system_ids").value = ",";
		$$("systems_selected").innerHTML = "";
	}
	$(".mask").click(function(){
		$('#relateSystemDialog').dialog('close');
		$(".mask").hide();
	});
}

/*选中某个系统*/
function select(flag, obj) {
    console.log("flag==" + flag + " obj==" + obj);
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
        console.log("操作前systemids=" + $$("system_ids").value);
        $$("system_ids").value = $$("system_ids").value + id + ",";
    } else {
        deleteSystem(id, name);
    }
}

/*删除已经选中的某个系统*/
function deleteSystem(id, name) {
    $("#" + id).hide();
    $("#systemInfo tr[for=system-" + id + "]").unbind("click").removeAttr("onclick").click(function() {
        select(true, this)
    });
    $("#systemInfo tr[for=system-" + id + "]").removeClass("selected");
    $$("system_ids").value = $$("system_ids").value.replace("," + id + ",", ",");
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
        var params = "relateCids=" + relateCids + "&system_ids=" + system_ids;
        console.log("批量关联的参数------" + params);
        $.post("boardSystem!relateBatch", encodeURI(params),
        function(data) {
            var res = eval("(" + data + ")");
            if (res.success) {
                alert("关联成功");
                $("#relate_dialog").trigger('reveal:close');
                var paramsVal = encodeURI(searchParams);
                paramsVal = "boardConfig!search" + '?' + paramsVal;
                $('#sysRelationTable').datagrid('options').url = paramsVal;
                $("#sysRelationTable").datagrid("clearSelections");
                $('#sysRelationTable').datagrid('reload');
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
	console.log("---system_ids++"+system_ids);
    if (system_ids == ",") {
        alert("选择要关联的系统");
        return false;
    } else {
        system_ids = system_ids.substr(0, system_ids.length - 1);
        system_ids = system_ids.substr(1, system_ids.length);
        var params = "relateCids=" + relateCids + "&system_ids=" + system_ids;
        console.log("批量取消关联的参数------" + params);
        $.post("boardSystem!unrelateBatch", encodeURI(params),
        function(data) {
            var res = eval("(" + data + ")");
            if (res.success) {
                alert("取消关联成功");
                $("#relate_dialog").trigger('reveal:close');
                var paramsVal = encodeURI(searchParams);
                paramsVal = "boardConfig!search" + '?' + paramsVal;
                $('#sysRelationTable').datagrid('options').url = paramsVal;
                $("#sysRelationTable").datagrid("clearSelections");
                $('#sysRelationTable').datagrid('reload');
            } else {
                alert("取消关联失败");
            }
        });

    }
}

/*清空检索条件*/
function emptyCond(){
	//清空input的输入值
	$$("boardid_input").value="";
	$$("boardname_input").value="";
	$$("boardUrl_input").value="";
	$$("siteid_input").value="";
	$$("sitename_input").value="";
	$$("siteUrl_input").value="";
	$$("import_time_input").value="";
	$$("allocate_time_input").value="";
	//select的值恢复到初始值
	$("#priority_select").val("0");
	$("#channel_select").val("0");
	$("#class_select").val("0");
	$("#system_select").val("0");
	$("#configer_select").val("0");
	$("#configstatus_select").val("-1");
}

/*检索*/
function search(){
	//获取检索项信息
    var board_id = $$('board_id_input').value;
    var board_name = $$('board_name_input').value;
    var board_url = $$('board_url_input').value;
    var site_id = $$('site_id_input').value;
    var site_name = $$('site_name_input').value;
    var site_url = $$('site_url_input').value;
    var import_time = $$('import_time_input').value;
    var allocate_time = $$('allocate_time_input').value;
    var priority=getSelectValue("priority_select");
	var channel=getSelectValue("channel_select");
	var classValue=getSelectValue("class_select");
	var systemValue=getSelectValue("system_select");
	var configer=getSelectValue("configer_select");
	var configstatus=getSelectValue("configstatus_select");

    var deli = "&";
    var param = 'site_name=' + site_name + deli + 'board_id=' + board_id + deli + 'board_name=' + board_name + deli + 'board_url=' + board_url + deli + 'import_time_from=' + import_time_from + deli + 'import_time_to=' + import_time_to + deli + 'modify_time_from=' + modify_time_from + deli + 'modify_time_to=' + modify_time_to + deli + 'configer=' + configer_select + deli + 'config_status=' + config_status;
    searchParams = param;
    param = encodeURI(param);
    param = "boardConfig!search" + '?' + param;
    $('#boardTable').datagrid({
        url: param,
        method: 'post'
    });
}