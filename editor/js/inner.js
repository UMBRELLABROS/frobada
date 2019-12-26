/** add content to DIV
 *
 * get and set the innerHTML value
 */
var Inner = function() {
	this.loadHTML = loadHTML;

	function loadHTML(json) {
		var data = JSON.parse(json);
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
