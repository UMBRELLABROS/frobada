/** Layout
 *
 * Write the elements and add the styles
 * loadStructure
 * loadStyles
 */
var Layout = function() {
	this.loadStructure = loadStructure;
	var styles;

	function loadStructure(id, actionData, structureData, stylesData) {
		styles = stylesData;
		writeElements($(id), actionData, structureData);
	}

	/** load the array of HTML elements */
	function writeElements(obj, actionData, structureData) {
		if (!obj || !structureData) return;
		actionData.map(action => {
			// get name from the actionData
			// events only, if id is available
			var structures = filter(structureData, 'name', action.name);
			structures.map(structure => {
				if (action.id) {
					structure.id = action.id;
				}
				var item = writeElement(obj, structure);
				// handle childNodes
				writeElements(item, actionData, structure.childNodes);
			});
		});
	}

	/** write one HTML element and attach to parent */
	function writeElement(obj, element) {
		var item = dCE(element.nodeName);
		if (element.id) item.id = element.id;
		// search style by element.name
		var itemStyles = filter(styles, 'name', element.name)[0];
		if (itemStyles) writeStyle(item, itemStyles.attributes);
		obj.appendChild(item);
		return item;
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

	/** find the objects by attribute */
	function filter(data, attribute, match) {
		result = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i][attribute] == match) {
				result.push(data[i]);
			}
		}
		return result;
	}
};
