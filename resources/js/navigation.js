
// This moves the navigtion elements left and right depending on a swipe left or right
var navElement = document.getElementById("navigation");
var mc = new Hammer(navElement);

mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
mc.on("panleft panright", function(ev) {
  // Get nav content bar DOM element
  var navigationDOM = document.getElementById("nav-content");

  // Get current margin-left of navigation bar (as a fllat)
  var currentNavMargin = parseFloat(window.getComputedStyle(navigationDOM).getPropertyValue("margin-left"));

  var velocityMultiplier = 20;
  var windowWidth = document.documentElement.clientWidth;

  // Alternate way of measuring width of nav bar: var navBarWidth = navigationDOM.clientWidth;
  var navBarWidth = navigationDOM.getBoundingClientRect().width;

  // Only allow movement of nav if nav bar length is greater than window width
  if(navBarWidth > windowWidth) {
    var newNavLeft = currentNavMargin + (velocityMultiplier * ev.velocityX);
    var newNavRight = currentNavMargin + navBarWidth + (velocityMultiplier * ev.velocityX);

    // Only change margin of narbar if the new nav margin is calculated to be less than zero
    if(newNavLeft <= 0 && newNavRight >= windowWidth) {
      document.getElementById("nav-content").style.marginLeft = newNavLeft + "px";
    }
    else if (newNavLeft > 0) {
      newNavLeft = 0;
      document.getElementById("nav-content").style.marginLeft = newNavLeft + "px";
    }
    else if (newNavRight < windowWidth) {
      // The margin of the element is equal to the length of the div element minus window length
      newNavLeft = -(navBarWidth - windowWidth);
      document.getElementById("nav-content").style.marginLeft = newNavLeft + "px";
    }
  }
  else {
  }
})
