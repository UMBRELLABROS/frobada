/** Layout
 *
 * Write the elements and add the styles
 * loadStructure
 * loadStyles
 */
var Layout = function() {
	this.loadStructure = loadStructure;
	this.loadStyles = loadStyles;

	function loadStructure(id, json) {
		var data = JSON.parse(json);
		writeElements($(id), data);
	}

	function loadStyles(json) {
		var data = JSON.parse(json);
		writeStyles(data);
	}

	/** load the array of HTML elements */
	function writeElements(obj, elements) {
		elements.map(element => {
			writeElement(obj, element);
			// handle childNodes
			writeElements($(element.id), element.childNodes);
		});
	}

	/** write one HTML element and attach to parent */
	function writeElement(obj, element) {
		var item = dCE(element.nodeName);
		item.id = element.id;
		obj.appendChild(item);
	}

	/** load the array of styles */
	function writeStyles(elements) {
		elements.map(element => {
			writeStyle($(element.id), element.attributes);
		});
	}

	/** write the style */
	function writeStyle(element, styles) {
		for ([key, value] of Object.entries(styles)) {
			if (typeof value === 'object') {
				// key == style
				writeStyle(element[key], value);
			} else {
				// key == style attribute
				element[key] = value;
			}
		}
	}
};
