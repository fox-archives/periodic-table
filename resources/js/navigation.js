
// This moves the navigtion elements left and right depending on a swipe left or right
var navElement = document.getElementById("navigation");
var mc = new Hammer(navElement);

mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });

mc.on("panleft panright", function(ev) {
  // Get nav content bar DOM element
  var navigationDOM = document.getElementById("nav-content");
  //console.log(navigationDOM);
  // Get current margin-left of navigation bar (as a fllat)
  var navMargin = parseFloat(window.getComputedStyle(navigationDOM).getPropertyValue("margin-left"));

  var velocityMultiplier = 25;
  var windowWidth = document.documentElement.clientWidth;
  var navBarWidth = navigationDOM.clientWidth;
  console.log("window " + windowWidth);
  console.log("nav bar " + navBarWidth);

  // Only allow movement of nav if nav bar length is greater than window width
  if(navBarWidth > windowWidth) {
    var newNavMargin = navMargin + (velocityMultiplier * ev.velocityX);


        document.getElementById("nav-content").style.marginLeft = newNavMargin + "px";
  }
  else {
    // Window width is greatr than nav bar, which means we don't need to move nav bar
  }
})
