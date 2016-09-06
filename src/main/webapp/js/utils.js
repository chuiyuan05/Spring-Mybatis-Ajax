/**
 * Created by chuiyuan on 16-9-3.
 */
function $$(id){
    return document.getElementById(id);
}

function addLoadEvent(func){
    var oldonload = window.onload;
    if( typeof window.onload != 'function'){
        window.onload = func;
    }else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if(!element.className){
        element.className = value;
    }else {
        newClassName = element.className;
        newClassName += ' ';
        newClassName += value;
        element.className = newClassName;
    }
}

function getHttpObject() {
    if(typeof XMLHttpRequest == 'undefined')
        XMLHttpRequest = function () {
            try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
            catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
            catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP"); }
            catch (e) {}
            return false;
        };
    return new XMLHttpRequest();
}

var Cookie = {
    TOKEN: 'cookie.token',
    USERNAME: 'cookie.username',
    THEME: 'cookie.theme'
};

var RequestHeader = {
    TOKEN: 'X-Token',
    USERNAME: 'X-Username'
};

var Ajax = {
    get: function (options) {
        $.ajax({
            url: options.url,
            type: 'GET',
            contentType : 'application/json',
            success: options.success,
            error: options.error
        });
    },
    post: function (options) {
        $.ajax({
            url: options.url,
            type: 'POST',
            contentType : 'application/json',
            data: JSON.stringify(options.data),
            beforeSend: options.beforeSend,
            success: options.success,
            error: options.error
        });
    },
    postForm: function (options) {
        $.ajax({
            url: options.url,
            type: 'POST',
            contentType : 'application/x-www-form-urlencoded',
            data: options.data,
            beforeSend: options.beforeSend,
            success: options.success,
            error: options.error
        });
    },
    put: function (options) {
        $.ajax({
            url: options.url,
            type: 'PUT',
            contentType : 'application/json',
            data: JSON.stringify(options.data),
            beforeSend: options.beforeSend,
            success: options.success,
            error: options.error
        });
    },
    delete: function (options) {
        $.ajax({
            url: options.url,
            type: 'DELETE',
            contentType : 'application/json',
            beforeSend: options.beforeSend,
            success: options.success,
            error: options.error
        });
    }
};
