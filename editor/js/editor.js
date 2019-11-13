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
  // for each DIV scan the style properties !=""
  elements.forEach(element => {
    styles = element.style;
    Object.keys(styles).forEach(style => {
      if (styles[style]) {
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