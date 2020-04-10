/** data-attributes
 *
 * get and set the data-attributes
 */
var DataAttribute = function () {
	this.loadAttributes = loadAttributes;

	function loadAttributes(data) {
		writeAttributes(data);
	}

	/** load the data-attributes if available */
	function writeAttributes(elements) {
		elements.map(element => {
			if (element.data) {
				writeAttribute($(element.id), element.data);
			}
			if (element.ids) {
				// cascaded elements
				writeAttributes(element.ids);
			}
		});
	}

	/** add data-attributes to the element */
	function writeAttribute(element, data) {
		for ([key, value] of Object.entries(data)) {
			if (typeof value === 'object') {
				setDataAttribute(element[key], value);
			} else {
				element.setAttribute('data-' + key, value);
			}
		}
	}
};
