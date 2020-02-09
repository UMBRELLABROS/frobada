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

	/** add new DOM element to parent */
	function addElementToParent(destination) {
		// New element
		div = dCE('div');
		div.id = 'cfbd5'; // get next ID
		div.style.width = '90px';
		div.style.height = '100px';
		div.style.backgroundColor = '#d00';
		div.addEventListener('click', showDOMAttributes);
		destination.appendChild(div);
	}

	/** links the attributes to the editor object */
	function showDOMAttributes(event) {
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
				switch (style) {
					case 'width':
						domAttributes.width = div.style.width;
						twbWidth = new TwoWayBinding({ object: domAttributes, property: 'width' })
							.addBinding($('fbd106'), 'value', 'keyup')
							.addBinding(div, 'style.width');
						break;
					case 'height':
						domAttributes.height = div.style.height;
						twbHeight = new TwoWayBinding({ object: domAttributes, property: 'height' })
							.addBinding($('fbdStyleHeight'), 'value', 'keyup')
							.addBinding(div, 'style.height');
						break;
				}
			}
		});
		event.cancelBubble = true;
	}

	function saveDOM(event) {}
};
