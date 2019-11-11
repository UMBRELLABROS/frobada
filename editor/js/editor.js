/**
 * Module to enable editor functions
 */

var fbdHandler = [];
fbdHandler['addContainer'] = addContainer;

function addContainer(event) {
  // put new container to display
  destination = event.target.getAttribute('data-destination');
  addElementToParent(destination);
}

function addElementToParent(destination) {
  div = dCE("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.backgroundColor = "#d00";
  $(destination).appendChild(div);
}
