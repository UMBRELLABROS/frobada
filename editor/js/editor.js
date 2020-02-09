var dto = new Ajax();
//var links = new Links();
var layout = new Layout();
var func = new Handler();
var attr = new DataAttribute();
var inner = new Inner();

// internal variables
var domAttributes = { width: null, height: null }; // [Object] binding DOM to the attributes
var twbWidth;
var twbHeight;
/**
 * Initialize the editor
 *
 * load structure and styles
 */
function initEditor() {
	const URL = 'http://localhost:1234/elements/editor/elements/name/1_element';
	dto.URL = URL;
	dto.returnFunction(callbackId);
	dto.get();
}

/** load the ids  */
function callbackId(result) {
	var element = JSON.parse(result);
	console.log(element);
	// build structure and add id to names
	layout.loadStructure('fbdEditor', element.action, element.template.structure);
	layout.loadStyles(element.action, element.template.styles);
	inner.loadHTML(element.action);
	attr.loadAttributes(element.action);
	func.loadFunctions(element.action);
}
