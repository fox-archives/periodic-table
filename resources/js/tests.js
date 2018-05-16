function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function atomicNumIsRange(value)
{
  if(value > 0)
  {
    return false;
  }
  else if (value == "57-71")
  {
    return true;
  }
  else if (value == "89-103")
  {
    return true;
  }
  else {
    // Actual HTML snippets will be passed in this function as "value'. This is because
    // they are not individually tested for (similar to testing for class of "element-outer" and
    // "elemnet-inner of event)
    // Could potentially be solved by testing if the "element-outer" class is in a certain part of the tree
    // BEFORE the if statement that contains this function is called (in main.vue). However, this
    // will decrease performance non number of range values are passed through this function rarely (relative
    // to when actual numbers or ranges are passed through this function)
    //console.log("Unexpected value passed through displayNumber function in tests.js");
  }
}

function getPropertyOneHoverEvent(event, property)
{
  // Should not be "atomicNumberDiv", but rather "elementObject"
  var elementObject;
  if(isNumber(event.srcElement.parentNode.children[0].innerHTML) || atomicNumIsRange(event.srcElement.parentNode.children[0].innerHTML))
  {
    elementObject = event.srcElement.parentNode.children[0];
    console.log(event);
  }
  else if (event.srcElement.classList[0] == "element-outer")
  {
    elementObject = event.srcElement.firstChild.children[0];
  }
  else if (event.srcElement.classList[0] == "element-inner")
  {
    elementObject = event.srcElement.children[0]
  }
  else
  {
    console.log("updateElementInfo method in main.vue returned an event not accounted for.");
  }
  console.log(elementObject);
}
