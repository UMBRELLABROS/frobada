var dto = new Ajax();
//var links = new Links();
var layout = new Layout();
var func = new Handler();
var attr = new DataAttribute();
var inner = new Inner();

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
	layout.loadStructure('fbdEditor', element.action, element.templates);
	// load all action data
	inner.loadHTML(element.action);
	attr.loadAttributes(element.action);
	func.loadFunctions(element.action);
}
