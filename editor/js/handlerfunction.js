/** store all editor event functions  */
var HandlerFunction = function() {
	this.Functions = [];
	this.Functions['addContainer'] = addContainer;
	this.Functions['saveDOM'] = saveDOM;
	// internal static variables
	var counter = 0;
	var bindings = [];
	// [Object] binding DOM to the attributes
	var domAttributes = { width: null, height: null }; // [Object] binding DOM to the attributes

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
		div.id = 'cfbd' + (counter++).toString(); // get next ID
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

		// release old bindings
		bindings.forEach(binding => {
			binding.clearBinding();
			binding = null;
		});
		bindings = [];

		// Read from file
		var bindingData = [
			{ attribute: 'width', id: 'fbd106' },
			{ attribute: 'height', id: 'fbdStyleHeight' }
		];

		// Loop for the styles
		Object.keys(styles).forEach(style => {
			// new styles without the number-list
			if (styles[style] && !reg.test(style)) {
				console.log(style + ' : ' + styles[style]); // key : value
				var bindData = filter(bindingData, 'attribute', style);
				// only known attributes
				if (bindData) {
					domAttributes[bindData.attribute] = div.style[bindData.attribute];
					bindings.push(
						new TwoWayBinding({ object: domAttributes, property: bindData.attribute })
							.addBinding($(bindData.id), 'value', 'keyup')
							.addBinding(div, 'style.' + bindData.attribute)
					);
				}
			}
		});
		event.cancelBubble = true;
	}

	/** find the object by attribute in an array */
	function filter(data, attribute, match) {
		for (var i = 0; i < data.length; i++) {
			if (data[i][attribute] == match) {
				return data[i];
			}
		}
		return null;
	}

	function saveDOM(event) {}
};
