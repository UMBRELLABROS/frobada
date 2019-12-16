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
