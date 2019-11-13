/**
 * Module to enable editor functions
 */

var fbdHandler = [];
fbdHandler['addContainer'] = addContainer;
fbdHandler['saveDOM'] = saveDOM;

function addContainer(event) {
  // put new container to display
  var destination = event.target.getAttribute('data-destination');
  addElementToParent(destination);
}

function addElementToParent(destination) {
  div = dCE("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.backgroundColor = "#d00";
  $(destination).appendChild(div);
}

function saveDOM(event) {
  var source = event.target.getAttribute('data-source');
  elements = [];
  elements = scanDOM(source, elements);
  // string has only numbers
  // ^ start [0-9] numbers + more of that kind $ end
  var reg = new RegExp('^[0-9]+$');
  // for each DIV scan the style properties !=""
  // get the id
  // get the data-attributes
  // get the functions
  // get the innerHTML
  elements.forEach(element => {
    styles = element.style;  // read the inline styles
    Object.keys(styles).forEach(style => {
      // new styles without the number-list
      if (styles[style] && !reg.test(style)) {
        console.log(style); // key
        console.log(styles[style]); // value
      }
    });
  });
}

function scanDOM(source, elements) {

  nodes = $(source).childNodes;
  nodes.forEach(element => {
    if (element.nodeName == "DIV") {
      elements.push(element);
    }
  });
  return elements;
}

function colorToHex(color) {
  // Convert any CSS color to a hex representation
  // Examples:
  // colorToHex('red')            # '#ff0000'
  // colorToHex('rgb(255, 0, 0)') # '#ff0000'
  var rgba = colorToRGBA(color);
  var hex = [0, 1, 2].map(
    function (idx) { return byteToHex(rgba[idx]); }
  ).join('');
  return "#" + hex;
}