/**
 * Created by chuiyuan on 16-9-4.
 */
function setActive() {
    var about = document.getElementById('poem_nav');
    addClass(about, 'active');
}

addLoadEvent(setActive);