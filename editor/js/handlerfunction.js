/** store all editor event functions  */
var HandlerFunction = function() {
	this.Functions = [];
	this.Functions['addContainer'] = addContainer;
	this.Functions['saveDOM'] = saveDOM;

	/** add a div element */
	function addContainer(event) {
		// put new container to display
		var destination = event.target.getAttribute('data-destination');
		addElementToParent($(destination));
	}

	function addElementToParent(destination) {
		// New element
		div = dCE('div');
		div.id = 'cfdb5'; // get next ID
		div.style.width = '100px';
		div.style.height = '100px';
		div.style.backgroundColor = '#d00';
		div.addEventListener('click', showInfo);
		destination.appendChild(div);
	}

	function showInfo(event) {
		// string has only numbers
		// ^ start [0-9] numbers + more of that kind $ end
		var reg = new RegExp('^[0-9]+$');
		var div = event.target;

		console.log('ID: ' + div.id);
		var styles = div.style; // read the inline styles
		Object.keys(styles).forEach(style => {
			// new styles without the number-list
			if (styles[style] && !reg.test(style)) {
				console.log(style + ' : ' + styles[style]); // key : value
			}
		});
		event.cancelBubble = true;
	}

	function saveDOM(event) {}
};
