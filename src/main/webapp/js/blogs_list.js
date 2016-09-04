/**
 * Created by chuiyuan on 16-9-4.
 */
function setActive() {
    var about = document.getElementById('blog_nav');
    addClass(about, 'active');
}

addLoadEvent(setActive);