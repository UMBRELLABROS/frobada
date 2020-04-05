/** add content to DIV
 *
 * get and set the innerHTML value
 */
var Inner = function() {
	this.loadHTML = loadHTML;

	function loadHTML(data) {
		writeHTML(data);
	}

	function writeHTML(elements) {
		elements.map(element => {
			if (element.innerHTML) {
				// direct elements
				$(element.id).innerHTML = element.innerHTML;
			}
			if (element.ids) {
				// cascaded elements
				writeHTML(element.ids);
			}
		});
	}
};
