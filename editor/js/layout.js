/** Layout
 *
 * Write the elements and add the styles
 * loadStructure
 * loadStyles
 */
var Layout = function () {
	this.loadStructure = loadStructure;
	var templates;

	function loadStructure(id, actionData, templatesData) {
		templates = templatesData;

		// loop action array
		actionData.map(action => {
			var elements = filter(templates, 'element', action['template']);
			// loop structure array
			elements.map(element => {
				var actionIds = action.ids;
				writeElements($(id), element.template.structure, actionIds, element.template.styles);
			});
		});
	}

	/** load the array of HTML elements */
	function writeElements(obj, structureData, actionData, stylesData) {
		if (!obj || !structureData) return;
		structureData.map(structure => {
			// get name from the actionData
			// events only, if id is available
			var nextActionData = actionData;
			var nextStylesData = stylesData;
			var action = filter(actionData, 'name', structure.name)[0]; // unique value

			if (action && action.id) {
				structure.id = action.id;
			} else {
				console.log('No id found for: ' + structure.name);
			}
			if (action && action.template) {
				var element = filter(templates, 'element', action.template)[0]; // unique value
				structure.childNodes = element.template.structure;
				// use inner action list as actionData
				nextActionData = action.ids;
				// read the styles from the template
				nextStylesData = element.template.styles;
			}
			var item = writeElement(obj, structure, stylesData);
			// handle all childNodes in a loop
			if (structure.childNodes) {
				writeElements(item, structure.childNodes, nextActionData, nextStylesData);
			}
		});
	}

	/** write one HTML element and attach to parent */
	function writeElement(obj, element, stylesData) {
		var item = dCE(element.nodeName);
		if (element.id) item.id = element.id;
		// search style by element.name
		var itemStyles = filter(stylesData, 'name', element.name)[0]; // unique value
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
