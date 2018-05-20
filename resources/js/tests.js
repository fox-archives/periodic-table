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

// @returns the index (which is exactly the same as the atomic number) of the Element object that is being hovered over ()
// -1 because array starts at 0 and element atomic numbers start at 0
function getIndexOfElementInElements(e)
{
  var elementObjectIndex;
  if(isNumber(e.target.parentNode.children[0].innerHTML) || atomicNumIsRange(e.target.parentNode.children[0].innerHTML))
  {
    return e.target.parentNode.children[0].innerHTML - 1;
  }
  else if (e.target.classList[0] == "element-outer")
  {
    return e.target.firstChild.children[0].innerHTML - 1;
  }
  else if (e.target.classList[0] == "element-inner")
  {
    return e.target.children[0].innerHTML - 1;
  }
  else
  {
    console.log("Unexpected event passed through getIndexOfElementOnElements method in tests.js.");
  }
}
