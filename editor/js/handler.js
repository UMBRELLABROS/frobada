/**
 * handle events of the element
 */
var Handler = function() {
	var funcs = new HandlerFunction();
	this.loadFunctions = loadFunctions;

	function loadFunctions(json) {
		var data = JSON.parse(json);
		writeFunctions(data);
	}

	/** load the function if available */
	function writeFunctions(elements) {
		elements.map(element => {
			writeFunction($(element.id), element.events);
		});
	}

	/** add a function to the element */
	function writeFunction(element, events) {
		for ([key, value] of Object.entries(events)) {
			if (typeof value === 'object') {
				writeFunction(element, value);
			} else {
				// use existing functions
				func = funcs.Functions[value];
				element.addEventListener(key, func);
			}
		}
	}
};
