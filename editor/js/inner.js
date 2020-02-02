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
				$(element.id).innerHTML = element.innerHTML;
			}
		});
	}
};
