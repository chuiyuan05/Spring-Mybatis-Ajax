/*增加新的类别*/
	function addClassDialog(){
		$(".mask").show();
		$('#categoryDialog').dialog({
			title: '添加类别',
			onClose: function() {
				$(".mask").hide();
			},
		});console.log("增加类别");
		$('#categoryDialog').dialog('open');
		$('#categoryForm').form('reset');
		$('#save_btn').click(function(){
			saveCategory("class!saveClass",true);
		});
	}
	
	/*修改某个类别的名称和摘要*/
	function modClassDialog(){
		var row=$("#categoryTable").datagrid("getSelected");
		if(row){
			$$("cate_name").value=row.name;
			$$("cate_abstract").value=row.abstracts;
			$('#categoryDialog').dialog({
				title: '添加类别',
				onClose: function() {
					$(".mask").hide();
				},
			});
			$('#categoryDialog').dialog('open');
			$('#save_btn').click(function(){
				saveCategory("class!saveClass",false);
			});
		}else{
			$(".mask").hide();
			$.messager.alert('修改类别','请先选择要修改的类别','error');
		}
	}
	/*验证类别*/
	function validateCate(name, abstracts){
		if(name==""){
			$$('cate_name').focus();
			$("#cate_name").next("span").html("不能为空");
			return false;
		}else{
			$("#cate_name").next("span").html("");
		}
		if(abstracts==""){
			$$('cate_abstract').focus();
			$("#cate_abstract").next("span").html("不能为空");
			return false;
		}else{
			$("#cate_abstract").next("span").html("");
		}
		return true;
	}
	/*保存类别*/
	function saveCategory(url,flag){console.log("进入到保存函数");
		var name=$$("cate_name").value;
		var abstracts=$$("cate_abstract").value;
		if(validateCate(name, abstracts)){
			var param="";
			if(flag){
				param="name="+name+"&abstracts="+abstracts;
			}else{
				var row=$("#categoryTable").datagrid("getSelected");
				var class_id=row.class_id;
				param="class_id="+class_id+"&name="+name+"&abstracts="+abstracts;
			}
			$.post(url, encodeURI(param),function(data){
				console.log("保存类别=="+data);
				var res = eval("(" + data + ")");
				if(res.error){
					$$("add-class-err").innerHTML=res.error;
					$("#add-class-err").show();
					return;
				}
				$("#add-class-err").hide();
				$('#categoryTable').datagrid('reload');
				$('#save_btn').unbind("click");
				$('#categoryDialog').dialog('close');
				$(".mask").hide();
			});	
		}
	}
	
	/*编辑类别的内容*/
	function editClass(){
		var row=$("#categoryTable").datagrid("getSelected");
		if(row){
			window.location.href="category_edit.html?classId="+row.class_id+"&name="+row.name;  
		}else{
			$(".mask").hide();
			$.messager.alert('编辑类别','请先选择要编辑的类别','error');
		}
	}
	
	/*删除某个类别*/
	function deleteClass(){
		var row=$("#categoryTable").datagrid("getSelected");
		if(row){
			$.messager.confirm('Confirm','您确定删除该类别吗?',function(r){  
            if (r){
				var param="class_id="+row.class_id;
				console.log("param==="+param);
					$.post("class!delClass", encodeURI(param),function(data){
						console.log("shanchu"+data);
						$(".mask").hide();
						$('#categoryTable').datagrid('reload');
					});
						
            }else{
				$(".mask").hide();
			}
        });  
		}else{
			$(".mask").hide();
			$.messager.alert('删除类别','请先选择要删除的类别','error');
		}
	}
	//获取url中参数
	function GetRequest() {   
		var url = location.search; //获取url中"?"符后的字串 
		var theRequest = new Object();   
		if (url.indexOf("?") != -1) {   
			var str = url.substr(1);   
			strs = str.split("&");   
			for(var i = 0; i < strs.length; i ++) {   
				theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);   
			}   
		}   
	   return theRequest;   
	}  
	
	//显示获取到的的分类结构
	function listClassHier(data){
		if(data=="{}"){
			$$("tree").innerHTML="<font color='#ee4105'>无子类内容</font>";
			$("#add_new_cate").show();
			return;
		}
		$("#add_new_cate").hide();
		var res=eval("("+data+")");
		if(res.error){
			$$("tree").innerHTML="<font color='#ee4105'>"+res.error+"</font>";
			return;
		}
		treeHtml="<ul>";
		relateClass="[";
		createTree(res,0);
		treeHtml+="</ul>";
		relateClass+="]";
		$$("tree").innerHTML=treeHtml;
		$('.tree li span').contextPopup({
			id: $(this).data("hid"),
			items: [
				{label:'增加', icon:'glyphicon glyphicon-plus'},
				{label:'删除', icon:'glyphicon glyphicon-trash'},
				{label:'修改', icon:'glyphicon glyphicon-pencil'},
			]
		});
		
		var relateClassArr = eval('('+relateClass+')');
		console.log("relateClassArr=="+relateClassArr);
		$("#autocomplete").autocomplete({
			source: relateClassArr,
			delay: 0,
			focus: function (event, ui) {
				$("#autocomplete").val(ui.item.label);
				return false;
			},
			select: function(event,ui){
				$("#autocomplete").val(ui.item.label);
				$("#default_class_hid").val(ui.item.value);
				return false;
			}
		});
	}
	//递归创建树
	function createTree(cateList, parent_hid){
		relateClass+="{'label':'"+cateList.name+"','value':"+cateList.id+"},";
		if(cateList.son.length==0){
			treeHtml+="<li><span data-hid='"+cateList.id+"' data-parent-hid='"+parent_hid+"' data-has-child=0 data-name='"+cateList.name+"'><i class='fa fa-leaf'></i>&nbsp;"+cateList.name+"</span></li>";
		}else{
			treeHtml+="<li><span data-hid='"+cateList.id+"' data-parent-hid='"+parent_hid+"' data-has-child=1 data-name='"+cateList.name+"'><i class='fa fa-minus-circle'></i>&nbsp;"+cateList.name+"</span>";
			treeHtml+="<ul>";
			
			for(var i=0;i<cateList.son.length;i++){
				createTree(cateList.son[i],cateList.id);
			}
			treeHtml+="</li></ul>";
		}
	}
	
	//设置默认值
	function saveSetDefault(){
		var input_value=$("#autocomplete").val();
		if(!defaultExist(input_value)){
			$$("set_default_error").innerHTML="该类别不存在,请重新输入";
			$("#set_default_error").show();
			return;
		}
		$("#set_default_error").hide();
		var default_value=$("#default_class_hid").val();
		var params="class_id="+classId+"&default_value="+default_value;
		console.log("设置默认值==="+params);
		$.post("class!setDefaultValue", encodeURI(params),function(data){
			console.log("设置默认值的返回值==="+data);
			var res=eval("("+data+")");
			if(res.error){
				$$("set_default_error").innerHTML=res.error;
				$("#set_default_error").show();
			}
			else{
				$("#set_default_error").hide();
				hideAllClassDialog();
			}
		});
	}
	
	//判断输入的默认值是否存在
	function defaultExist(default_value){
		var relateArr = eval('('+relateClass+')');
		for(var i=0;i<relateArr.length;i++){
			if(relateArr[i].label==default_value){
				$("#default_class_hid").val(relateArr[i].value);
				return true;
			}
		}
		return false;
	}
	
	//当分类体系为空时，点击添加子类按钮
	function addNewCate(object){
		var top=object.offsetTop;
		var left=object.offsetLeft;
		var height=object.offsetHeight;
		addDialog("", 0, left-60, top+height+10);
	}
	
	//弹出框中删除选中的系统
	function deleteSystem(id,name){
		$("#"+id).hide();
		$("#systemInfo tr[for=system-"+id+"]").unbind("click").removeAttr("onclick").click(function(){select(true, this)});
		$("#systemInfo tr[for=system-"+id+"]").removeClass("selected");
		$$("system_ids").value=$$("system_ids").value.replace(","+id+",",",");
	}
	
	function select(flag, obj){
		var name=$(obj).attr("value");
		var id=$(obj).attr("for").split("-")[1];
		if(flag){
			var selectHTML=document.getElementById("systems_selected").innerHTML;
			if($$(id)){
				$("#"+id).show();	
			}else{
				selectHTML+="<div class='system-item' id='"+id+"'>"+name+"<a href=\"javascript:deleteSystem("+id+",'"+name+"')\">&#215;</a></div>";
				$$("systems_selected").innerHTML=selectHTML;
			}
			$(obj).addClass("selected");
			$(obj).unbind("click").removeAttr("onclick").click(function(){select(false, this)});
			$$("system_ids").value=$$("system_ids").value+id+",";
		}else{
			deleteSystem(id,name);
		}
	}
	
	function getAllSystem(){
		$.post("sys!list", "",function(data){
			console.log("系统信息"+data);
			var res = eval("(" + data + ")");
			//填充系统表格
			var inhtml="";
			if(res.total>0){
				for(var i=0; i<res.total; i++){
					inhtml+="<tr for='system-"+res.rows[i].system_id+"' value='"+res.rows[i].name+"'>";
					inhtml+="<td>"+res.rows[i].system_id+"</td>";
					inhtml+="<td>"+res.rows[i].name+"</td>";
					inhtml+="</tr>"
				}
				$$("systemInfo").innerHTML=inhtml;
				$("#systemInfo tr").click(function(){
					select(true,this);
				})
			}else{
				$$("systemInfo").innerHTML="无数据";
			}	
		});
	}
	
	//批量操作信源
	function batch_relate(){
		var rows = $("#cateRelationTable").datagrid("getSelections");
		var inhtml="";
		var relateCids="";
		$("#systemInfo tr").removeClass("selected");
		$("#systemInfo tr").unbind("click").removeAttr("onclick").click(function(){select(true,this)});
		for(var i=0; i<rows.length; i++){
			relateCids+=rows[i].class_id+",";
			inhtml+="<tr><td>"+rows[i].class_id+"</td>";
			inhtml+="<td>"+rows[i].name+"</td>";
			inhtml+="<td>"+rows[i].abstracts+"</td>";
			inhtml+="<td>"+rows[i].default_value+"</td>";
			inhtml+="<td>"+rows[i].time_m+"</td>";
			inhtml+="</tr>";			
		}
		$$("relateCids").value=relateCids.substr(0,relateCids.length-1);
		$$("system_ids").value=",";
		$$("sourceInfo").innerHTML=inhtml;
		$$("systems_selected").innerHTML="";
		$$("sys_btns").innerHTML = '<button class="btn" onclick="set_relate()"><i class="fa fa-check green"></i>&nbsp;保存关联</button><button class="btn" onClick="unset_relate()"><i class="fa fa-ban red"></i>&nbsp;取消关联</button><button class="btn close-reveal-modal"><i class="fa fa-close red"></i>&nbsp;取消</button>';
		 var a = "{revealId:'relate_dialog',animation:\"none\"}";
		var obj = new Function("return " + a)();
		$("#relate_dialog").reveal(obj);	
	}
	
	//编辑单条信源
	function edit_relate(){
		var system_ids=",";
		var row = $("#cateRelationTable").datagrid("getSelected");
		$$("sourceInfo").innerHTML="<tr><td>"+row.class_id+"</td><td>"+row.name+"</td><td>"+row.abstracts+"</td><td>"+row.default_value+"</td><td>"+row.time_m+"</td></tr>";
		var inhtml="";
		$("#systemInfo tr").removeClass("selected");
		$("#systemInfo tr").unbind("click").removeAttr("onclick").click(function(){select(true,this)});
		$$("systems_selected").innerHTML="";
		//获取信源关联的系统
		var param="class_id="+row.class_id;
		console.log("编辑单条信源传递参数=="+param);
		$.post("classSystem!listByClassId", encodeURI(param),function(data){
			console.log("返回系统信息"+data+"等等");
			if(data!="[]"){
				var dataArr=eval('('+data+')');
				for(var i=0; i<dataArr.length; i++){
					system_ids+=dataArr[i]+",";
					$("#systemInfo tr[for=system-"+dataArr[i]+"]").addClass("selected");
					$("#systemInfo tr[for=system-"+dataArr[i]+"]").unbind("click").removeAttr("onclick").click(function(){select(false, this)});
					inhtml+="<div class='system-item' id='"+dataArr[i]+"'>"+$("#systemInfo tr[for=system-"+dataArr[i]+"]").attr("value")+"<a href=\"javascript:deleteSystem("+dataArr[i]+",'"+$("#systemInfo tr[for=system-"+dataArr[i]+"]").attr("value")+"')\">&#215;</a></div>";
					
				}
			}
			$$("systems_selected").innerHTML=inhtml;
			$$("system_ids").value=system_ids;
		});
		$$("relateCids").value=row.class_id;

		$$("sys_btns").innerHTML = '<button class="btn" onclick="save()"><i class="fa fa-check green"></i>&nbsp;保存</button><button class="btn close-reveal-modal"><i class="fa fa-close red"></i>&nbsp;取消</button>';
		 var a = "{revealId:'relate_dialog',animation:\"none\"}";
		var obj = new Function("return " + a)();
		$("#relate_dialog").reveal(obj);
	}
	
	//批量关联
	function set_relate(){
		var relateCids=$$("relateCids").value;
		var system_ids=$$("system_ids").value;
		console.log("relateCids=="+relateCids+"system_ids=="+system_ids);
		relateCids=relateCids.replace(/(^\s*)|(\s*$)/g,"");
		system_ids=system_ids.replace(/(^\s*)|(\s*$)/g,"");
		if(system_ids == ","){
			alert("选择要关联的系统");
			return false;
		}else{
			system_ids=system_ids.substr(0,system_ids.length-1);
			system_ids=system_ids.substr(1,system_ids.length);
			var params="relateClassIds="+relateCids+"&system_ids="+system_ids;
			console.log("批量关联的参数------"+params);
			$.post("classSystem!relateBatch", encodeURI(params),function(data){
				console.log("批量关联返回结果=="+data);
				var res = eval("(" + data + ")");
				if(res.error){
					alert("批量关联失败,"+res.error);
				}
				else{
					alert("关联成功");
					$("#relate_dialog").trigger('reveal:close');
					paramsVal = "class!listClass";
					$('#cateRelationTable').datagrid('options').url=paramsVal;
					$("#cateRelationTable").datagrid("clearSelections");
					$('#cateRelationTable').datagrid('reload');
				}
				
			});
			
		}
	}
	
	//批量取消关联
	function unset_relate(){
		var relateCids=$$("relateCids").value;
		var system_ids=$$("system_ids").value;
		console.log("relateCids=="+relateCids+"system_ids=="+system_ids);
		relateCids=relateCids.replace(/(^\s*)|(\s*$)/g,"");
		system_ids=system_ids.replace(/(^\s*)|(\s*$)/g,"");
		console.log("---system_ids---"+system_ids);
		if(system_ids == ","){
			alert("选择要关联的系统");
			return false;
		}else{
			system_ids=system_ids.substr(0,system_ids.length-1);
			system_ids=system_ids.substr(1,system_ids.length);
			var params="relateClassIds="+relateCids+"&system_ids="+system_ids;
			console.log("批量取消关联的参数------"+params);
			$.post("classSystem!unrelateBatch", encodeURI(params),function(data){
				console.log("批量取消关联的返回结果==="+data);
				var res = eval("(" + data + ")");
				if(res.error){
					alert("批量取消关联失败,"+res.error);
				}else{
					alert("取消关联成功");
					$("#relate_dialog").trigger('reveal:close');
					paramsVal = "class!listClass";
					$('#cateRelationTable').datagrid('options').url=paramsVal;
					$("#cateRelationTable").datagrid("clearSelections");
					$('#cateRelationTable').datagrid('reload');
				}
				
			});
			
		}
	}
	
	//单条信源编辑保存
	function save(){
		var relateCids=$$("relateCids").value;
		var system_ids=$$("system_ids").value;
		console.log("relateCids=="+relateCids+"system_ids=="+system_ids);
		relateCids=relateCids.replace(/(^\s*)|(\s*$)/g,"");
		system_ids=system_ids.replace(/(^\s*)|(\s*$)/g,"");
		if(system_ids == ","){
			alert("选择要关联的系统");
			return false;
		}else{
			system_ids=system_ids.substr(0,system_ids.length-1);
			system_ids=system_ids.substr(1,system_ids.length);
			var params="class_id="+relateCids+"&system_ids="+system_ids;
			console.log("保存的参数------"+params);
			$.post("classSystem!save", encodeURI(params),function(data){
				console.log("保存的返回结果===="+data);
				var res = eval("(" + data + ")");
				if(res.error){
					alert("保存失败,"+res.error);
				}else{
					alert("保存成功");
					$("#relate_dialog").trigger('reveal:close');
					paramsVal = "class!listClass";
					$('#cateRelationTable').datagrid('options').url=paramsVal;
					$("#cateRelationTable").datagrid("clearSelections");
					$('#cateRelationTable').datagrid('reload');
				}
			});
			
		}
	}