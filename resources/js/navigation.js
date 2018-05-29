
// This moves the navigtion elements left and right depending on a swipe left or right
var navElement = document.getElementById("navigation");
var mc = new Hammer(navElement);

mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });

mc.on("panleft panright", function(ev) {
  //console.log(ev);
  var navigationDOM = document.getElementById("nav-content");
  var navMargin = window.getComputedStyle(navigationDOM).getPropertyValue("margin-left");
  //if(parseFloat(navMargin) >= 0) {
    console.log(navMargin);
    var newNavMargin = parseFloat(navMargin) + (10 * ev.velocityX) + "px";
    document.getElementById("nav-content").style.marginLeft = newNavMargin;
    //navElement.textContent = ev.type + " gesture detected.";
  //}
})
