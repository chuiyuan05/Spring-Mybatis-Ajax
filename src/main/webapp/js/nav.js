/**
 * Created by chuiyuan on 16-9-4.
 */
function prepare_nav() {
    var poem_nav = document.getElementById("poem_nav");
    var blog_nav = document.getElementById('blog_nav');
    var others_nav = document.getElementById('others_nav');
    var home_nav = document.getElementById('home_nav');
    poem_nav.onclick = function () {
        window.location.href = 'poems_list.html';
    };
    blog_nav.onclick = function () {
        window.location.href = 'blogs_list.html';
    };
    others_nav.onclick = function () {
        window.location.href = 'about.html';
    };
    home_nav.onclick = function () {
        window.location.href = 'home.html';
    }
}

addLoadEvent(prepare_nav);