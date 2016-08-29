/**
 * jQuery plugin for Pretty looking right click context menu.
 *
 * Requires popup.js and popup.css to be included in your page. And jQuery, obviously.
 *
 * Usage:
 *
 *   $('.something').contextPopup({
 *     title: 'Some title',
 *     items: [
 *       {label:'My Item', icon:'/some/icon1.png', action:function() { alert('hi'); }},
 *       {label:'Item #2', icon:'/some/icon2.png', action:function() { alert('yo'); }},
 *       null, // divider
 *       {label:'Blahhhh', icon:'/some/icon3.png', action:function() { alert('bye'); }, isEnabled: function() { return false; }},
 *     ]
 *   });
 *
 * Icon needs to be 16x16. I recommend the Fugue icon set from: http://p.yusukekamiyamane.com/ 
 *
 * - Joe Walnes, 2011 http://joewalnes.com/
 *   https://github.com/joewalnes/jquery-simple-context-menu
 *
 * MIT License: https://github.com/joewalnes/jquery-simple-context-menu/blob/master/LICENSE.txt
 */
jQuery.fn.contextPopup = function(menuData) {
	// Define default settings
	var settings = {
		contextMenuClass: 'right-menu',
		linkClickerClass: 'sub-item',
		items: [],
	};
	// merge them
	$.extend(settings, menuData);

  // Build popup menu HTML
  function createMenu(e,hid,parent_hid,has_child,name) {
    var menu = $('<div class="' + settings.contextMenuClass + '"></div>')
      .appendTo(document.body);
    
    settings.items.forEach(function(item) {
      if (item) {
        var rowCode = '<div class="'+settings.linkClickerClass+'" data-hid="'+hid+'" data-parent-hid="'+parent_hid+'" data-has-child="'+has_child+'" data-name="'+name+'"><i class="'+item.icon+'"></i>&nbsp;<span class=\'itemTitle\'></span></div>';
        var row = $(rowCode).appendTo(menu);
        row.find('.itemTitle').text(item.label);
          
        if (item.isEnabled != undefined && !item.isEnabled()) {
            row.addClass('disabled');
        } else if (item.action) {
            row.find('.'+settings.linkClickerClass).click(function () { item.action; });
        }

      }
    });
    return menu;
  }

  // On contextmenu event (right click)
  this.on('contextmenu', function(e) {
    var hid=$(this).data("hid");
	var parent_hid=$(this).data("parent-hid");
	var has_child=$(this).data("has-child");
	var name=$(this).data("name");
    var menu = createMenu(e,hid,parent_hid,has_child,name).show();
    var left = e.clientX + 5, /* nudge to the right, so the pointer is covering the title */
        top = e.clientY;
    if (top + menu.height() >= $(window).height()) {
        top -= menu.height();
    }
    if (left + menu.width() >= $(window).width()) {
        left -= menu.width();
    }
	//如果增加、修改、删除对话框显示，则隐藏
	if($("#add_subclass_dialog").is(":visible")==true){
			$("#add_subclass_dialog").hide();
		}
		if($("#mod_subclass_dialog").is(":visible")==true){
			$("#mod_subclass_dialog").hide();
		}
		if($("#del_subclass_dialog").is(":visible")==true){
			$("#del_subclass_dialog").hide();
		}
    // Create and show menu
    menu.css({zIndex:2, left:left, top:top})
      .on('contextmenu', function() { return false; });

    // Cover rest of page with invisible div that when clicked will cancel the popup.
    var bg = $('<div></div>')
      .css({left:0, top:0, width:'100%', height:'100%', position:'absolute', zIndex:1})
      .appendTo(document.body)
      .on('contextmenu click', function() {
        // If click or right click anywhere else on page: remove clean up.
        bg.remove();
        menu.remove();
		
        return false;
      });

    // When clicking on a link in menu: clean up (in addition to handlers on link already)
    menu.find('div').click(function(e) {
		var menuTop=menu.offset().top-120;
		var menuLeft=menu.offset().left-10;console.log("menuTop="+menuTop);
		bg.remove();
		menu.remove();
		var hid=$(this).data("hid");
		var parent_hid=$(this).data("parent-hid");
		var has_child=$(this).data("has-child");
		var name=$(this).data("name");
		var subMenuName=$(this).find("span.itemTitle").text();
		if(subMenuName=="增加"){
			addDialog(hid, has_child, menuLeft, menuTop);	
		}else if(subMenuName=="删除"){
			deleteDialog(hid, has_child, menuLeft, menuTop);
		}else if(subMenuName=="修改"){
			modDialog(hid, parent_hid, has_child, name, menuLeft, menuTop);
		}
      
    });

    // Cancel event, so real browser popup doesn't appear.
    return false;
  });
	this.on("click",function(){
		var children = $(this).parent('li').find(' > ul > li');
			if (children.is(":visible")) {
					children.hide('fast');
					$(this).find(' > i').addClass('fa-plus-circle').removeClass('fa-minus-circle');
				} else {
					children.show('fast');
					$(this).find(' > i').addClass('fa-minus-circle').removeClass('fa-plus-circle');
				}
			
	})
  return this;
};

//增加类别
function addDialog(hid, has_child, mouseX, mouseY){
	$("#add_subclass_dialog").css({
		top: mouseY,
		left: mouseX
	});
	$("#add-err").hide();
	$("#add_parent_hid").val(hid);
	$("#add_has_child").val(has_child);
	$("#add_subclass_dialog").show();
	
}

//删除类别
function deleteDialog(hid, has_child, mouseX, mouseY){
	//$("#edit_menu").hide();
	$("#del_subclass_dialog").css({
			top: mouseY,
			left: mouseX
		});
	$("#del_hid").val(hid);
	$("#del_has_child").val(has_child);
	$("#del_subclass_dialog").show();
}

//修改类别
function modDialog(hid, parent_hid, has_child, name, mouseX, mouseY){
	$("#mod_subclass_dialog").css({
			top: mouseY,
			left: mouseX
		});
	$("#mod-err").hide();
	$("#mod_hid").val(hid);
	$("#mod_parent_hid").val(parent_hid);
	$("#mod_has_child").val(has_child);
	$("#mod_name").val(name);	
	$("#mod_subclass_dialog").show();
	$("#mod_name")[0].focus();
}

//隐藏对话框
function hideDialog(id){
	$("#"+id).hide();
}

//显示或隐藏选择默认关联类的对话框
function showAllClassDialog(){
	$("#set_default_error").hide();
	if($(".all-class").is(":visible")==true)
		$(".all-class").slideUp("slow");
	else
		$(".all-class").slideDown("slow");
}

//隐藏选择默认关联类的对话框
function hideAllClassDialog(){
	$(".all-class").slideUp("slow");
}

//保存添加结果
function saveAdd(){
	var parent_hid=$("#add_parent_hid").val();
	var has_child=$("#add_has_child").val();
	var name=$("#add_name").val();
	console.log("增加：parent_hid"+parent_hid+" has_child="+has_child+" name="+name);
	var params="class_id="+classId+"&parent_hid="+parent_hid+"&has_child="+has_child+"&name="+name;
	$.post("class!saveClassHier", encodeURI(params),function(data){
		console.log("增加结果:"+data);
		var res=eval("("+data+")");
		if(res.error){
			$$("add-err").innerHTML=res.error;
			$("#add-err").show();
			return;
		}
		$("#add-err").hide();
		$("#add_subclass_dialog").hide();
		listClassHier(data);
	});
}

//保存修改结果
function saveMod(){
	var hid=$("#mod_hid").val();
	var parent_hid=$("#mod_parent_hid").val();
	var has_child=$("#mod_has_child").val();
	var name=$("#mod_name").val();
	console.log("修改：hid="+hid+" parent_hid"+parent_hid+" has_child="+has_child+" name="+name);
	var params="class_id="+classId+"&hid="+hid+"&parent_hid="+parent_hid+"&has_child="+has_child+"&name="+name;
	$.post("class!saveClassHier", encodeURI(params),function(data){
		var res=eval("("+data+")");
		if(res.error){
			$$("mod-err").innerHTML=res.error;
			$("#mod-err").show();
			return;
		}
		$("#mod-err").hide();
		$("#mod_subclass_dialog").hide();
		listClassHier(data);
	});
}

//保存删除结果
function saveDel(){ 
	var hid=$("#del_hid").val();
	var has_child=$("#del_has_child").val();
	console.log("删除：hid="+hid);
	var params="class_id="+classId+"&has_child="+has_child+"&hid="+hid;
	console.log("shanchu=="+params);
	$.post("class!delClassHier", encodeURI(params),function(data){
		console.log(data);
		$("#del_subclass_dialog").hide();
		listClassHier(data);
	});
}