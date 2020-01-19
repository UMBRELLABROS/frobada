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
	// const URL = 'http://localhost:1234/jsonfile/repository/editormaster';
	// dto.URL = URL;
	// dto.returnFunction(callbackId);
	// dto.get();
	const URL = 'http://localhost:1234/elements/editor/elements/name/1_element';
	dto.URL = URL;
	dto.returnFunction(callbackId);
	dto.get();
}

/** load the ids  */
function callbackId(result) {
	console.log(result);
	//links.loadIds(result);
	inner.loadHTML(result);
	func.loadFunctions(result);
	attr.loadAttributes(result);
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

/** add the properties */
function callbackProperties(result) {
	console.log(result);
	layout.loadStyles(result);
}
