function fileSelected() {
	var file = $$('fileToUpload').files[0];
	var fileName = file.name;
	var file_typename = fileName.substring(fileName.lastIndexOf('.'),
			fileName.length);

	if (file_typename == '.xlsx' || file_typename == '.xls') {// 这里限定上传文件文件类型
		if (file) {

			$("#uploadFile").show();

			$$('file_name').innerHTML = '文件名称： ' + fileName.substring(fileName.lastIndexOf('\\')+1,fileName.length);;
			$$('file_type').innerHTML = '文件类型：' + 'Microsoft Office Excel';
			$$('file_size').innerHTML = '文件大小：' + sizeChange(parseInt(file.size));

		}

	} else {

		$("#uploadFile").hide();
		$$('file_name').innerHTML = "<span style='color:Red'>错误提示:上传文件应该是.xls或 .xlsx后缀而不应该是"
				+ file_typename + ",请重新选择文件</span>"
		$$('file_type').innerHTML = "";
		$$('file_size').innerHTML = "";

	}
}

function uploadFile() {
	$("#upload_info").show();
	var fd = new FormData();
	fd.append("board",$$('fileToUpload').files[0]);
	var xhr = new XMLHttpRequest();
	xhr.upload.addEventListener("progress", uploadProgress, false);
	xhr.addEventListener("load", uploadComplete, false);
	xhr.addEventListener("error", uploadFailed, false);
	xhr.addEventListener("abort", uploadCanceled, false);
	xhr.open("POST", "upload!upload");
	xhr.send(fd);
}

function uploadProgress(evt) {
	if (evt.lengthComputable) {
		var percent = Math.round(evt.loaded * 100 / evt.total);
		$('#uploadProgress').progressbar('setValue', percent);
		if(percent == 100)
			$$('finishUpload').innerHTML = "<font style='font-size:15px;color:Red'>文件上传成功，等待导入信源... </font>";
	} else {
		$$('uploadProgress').innerHTML = '无法计算';
	}
}

function uploadComplete(evt) {
	/* 服务器返回数据 */
	var message = evt.target.responseText;
	$$('finishImport').innerHTML = "<font style='font-size:15px;color:Red'>"+message+"</font>";
	//window.location.href='http://172.22.0.24/wde-ie-sys-news/login.html';
	//alert(message);

}

function uploadFailed(evt) {
	alert("上传出错.");
}

function uploadCanceled(evt) {
	alert("上传已由用户或浏览器取消删除连接.");
}

function sizeChange(size){
	var num="";
	if(size/Math.pow(1024,1) > 1024){
		size=size/Math.pow(1024,1);
		if(size/Math.pow(1024,2) > 1024){
			size=size/Math.pow(1024,2);
			if(size/Math.pow(1024,3)>1024){
				size=size/Math.pow(1024,3);
				num=size/Math.pow(1024,4)+"GB";
			}else{
				num=size/Math.pow(1024,1)+"MB";
			}
		}else{
			num=size/Math.pow(1024,1)+"KB";
		}
	}else{
		num=size/Math.pow(1024,1)+"B";
	}
	return num;
}