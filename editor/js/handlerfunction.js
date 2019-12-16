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
		div.id = 'fdb5'; // get next ID
		div.style.width = '100px';
		div.style.height = '100px';
		div.style.backgroundColor = '#d00';
		destination.appendChild(div);
	}

	function saveDOM(event) {}
};
