/*window.addEventListener("resize", resizeWindow);

function resizeWindow() {

  var titleHeight = document.getElementById("title").offsetHeight;
  var navigationHeight = document.getElementById("navigation").offsetHeight;
  var displayOptionsHeight = document.getElementById("display-options").offsetHeight;
  var gridContainerHeight = document.getElementById("grid-container-outer").offsetHeight;
  var heightFooter = document.getElementById("footer").offsetHeight;

  console.log("individual");
  console.log(titleHeight);
  console.log(navigationHeight);
  console.log(displayOptionsHeight);
  console.log(gridContainerHeight);
  console.log(heightFooter);
  console.log("individual");


  console.log("document elements below");
  console.log(window.innerWidth);
  console.log(document.documentElement.clientWidth);

  console.log(window.innerHeight);
  console.log(document.documentElement.clientHeight);
  console.log("document elements above");

  var roomLeftHeight = document.documentElement.clientHeight - titleHeight - navigationHeight - displayOptionsHeight - heightFooter;
  console.log("Extra room left" + roomLeftHeight);

  console.log("height of each grid element" + document.getElementById(""))
}

function getWindowAspectRatio(dimension, isHeight) {
  var widthAspect = 1;
  var heightAspect = 1.25;

  // If given height, calculate the width; 0.8 = 1/1.25
  if(isHeight == "true") {
    return dimension * (1 / heightAspect);
  }
  // If given width, calculate the height
  else if(isHeight == "false") {
    return dimension * heightAspect;
  }
  else {
    console.log("Unexpected parameter isHeight passed through getWindowAspectRatio in window.js");
  }
}
*/
