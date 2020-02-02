/** Layout
 *
 * Write the elements and add the styles
 * loadStructure
 * loadStyles
 */
var Layout = function() {
	this.loadStructure = loadStructure;
	this.loadStyles = loadStyles;

	function loadStructure(id, actionData, structureData) {
		writeElements($(id), actionData, structureData);
	}

	function loadStyles(actionData, stylesData) {
		writeStyles(actionData, stylesData);
	}

	/** load the array of HTML elements */
	function writeElements(obj, actionData, structureData) {
		structureData.map(element => {
			// get the id from the actionData
			var action = filter(actionData, 'name', element.name);
			if (action) {
				element.id = action.id;
				writeElement(obj, element);
				// handle childNodes
				writeElements($(element.id), actionData, element.childNodes);
			}
		});
	}

	/** write one HTML element and attach to parent */
	function writeElement(obj, element) {
		var item = dCE(element.nodeName);
		item.id = element.id;
		obj.appendChild(item);
	}

	/** load the array of styles */
	function writeStyles(actionData, stylesData) {
		stylesData.map(element => {
			var action = filter(actionData, 'name', element.name);
			if (action) {
				element.id = action.id;
				writeStyle($(element.id), element.attributes);
			}
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

	/** find the object by attribute */
	function filter(data, attribute, match) {
		for (var i = 0; i < data.length; i++) {
			if (data[i][attribute] == match) {
				return data[i];
			}
		}
		return null;
	}
};
