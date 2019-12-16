var dto = new Ajax();
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
	const URL = 'http://localhost:1234/jsonfile/repository/editorstructure';
	dto.URL = URL;
	dto.returnFunction(callbackStructure);
	dto.get();
}

/** load the structure */
function callbackStructure(result) {
	console.log(result);
	layout.loadStructure('fbdEditor', result);
	const URL = 'http://localhost:1234/jsonfile/repository/editorproperties';
	dto.URL = URL;
	dto.returnFunction(callbackProperties);
	dto.get();
}

/** add the styles */
function callbackProperties(result) {
	console.log(result);
	layout.loadStyles(result);
	inner.loadHTML(result);
	func.loadFunctions(result);
	attr.loadAttributes(result);
}
