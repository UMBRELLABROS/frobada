/** store all editor event functions  */
var HandlerFunction = function () {
	this.Functions = [];
	this.Functions['addContainer'] = addContainer;
	this.Functions['saveDOM'] = saveDOM;
	this.Functions['loadDOM'] = loadDOM;
	// internal static variables
	var counter = 0;
	var bindings = [];
	// [Object] binding DOM to the attributes
	var domAttributes = { width: null, height: null }; // [Object] binding DOM to the attributes

	/** add a div element */
	function addContainer(event) {
		// put new container to display
		var destination = event.target.getAttribute('data-destination');
		// error message
		addElementToParent($(destination));
	}

	/** add new DOM element to parent */
	function addElementToParent(destination) {
		// New element
		div = dCE('div');
		div.id = 'csfbd' + (counter++).toString(); // get next ID for ids
		div.name = 'cnfbd' + (counter++).toString(); // get next ID for names
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

		// Read from file [todo]
		var bindingData = [
			{
				attribute: 'width',
				ids: [$('fbdWidthInput'), $('fbdWidthSelect')],
				events: ['keyup', 'change'],
				regex: /([0-9]*)(px|pt|em|%|vw)/,
				join: [0, 1]
			},
			{
				attribute: 'height',
				ids: [$('fbdHeightInput'), $('fbdHeightSelect')],
				events: ['keyup', 'change'],
				regex: /([0-9]*)(px|pt|em|%|vh)/,
				join: [0, 1]
			}
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
						new TwoWayExtendedBinding({ object: domAttributes, property: bindData.attribute })
							.addBinding(bindData.ids, 'value', bindData.events, bindData.regex, bindData.join)
							.addBinding([div], 'style.' + bindData.attribute)
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

	/**
	 * Save the Elements in the editor playfield
	 * saves action, structure and styles
	 * @param {} event
	 */
	function saveDOM(event) {
		var source = event.target.getAttribute('data-source');
		var destinationElement = event.target.getAttribute('data-destination');
		var destination = $(destinationElement).value;
		var templateElement = event.target.getAttribute('data-template');
		var template = $(templateElement).value;
		var elements = [];
		var structure = [];
		elements = scanDOM($(source), elements);
		structure = scanDOMStructure($(source), structure);
		var styles = scanDOMStyles(elements);
		var action = scanDOMAction(elements);

		// save to element (action & structure & styles)
		var dtoElement = new Ajax('http://localhost:1234/elements/editor/elements/name/' + destination, serverResponse);
		// build action
		// template (style & structure)
		var dto = { action: action, template: { element: template, styles: styles, structure: structure } };
		dtoElement.put(JSON.stringify(dto));

		event.cancelBubble = true;
	}

	/**
	 * Response from the server
	 * @param {*} result
	 */
	function serverResponse(result) {
		console.log(result);
	}

	/**
	 * reload the selected DOM structure
	 * @param {*} event
	 */
	function loadDOM(event) {}

	/**
	 * Scan for DOM elements
	 * @param {*} source
	 * @param {*} elements
	 */
	function scanDOM(source, elements) {
		var nodes = source.childNodes;
		nodes.forEach(element => {
			if (element.nodeName == 'DIV') {
				elements.push(element);
				if (element.childNodes.length > 0) {
					elements = scanDOM(element, elements);
				}
			}
			// add more elements
		});
		return elements;
	}

	/**
	 *
	 * @param {*} source
	 * @param {*} structure
	 */
	function scanDOMStructure(source, structure) {
		var nodes = source.childNodes;
		nodes.forEach(element => {
			// list all known elements
			var objDIV = {
				nodeName: element.nodeName.toUpperCase(), // DIVV, INPUT, SELECT, ...
				name: element.name
			};
			structure.push(objDIV);
			if (element.childNodes.length > 0) {
				objDIV.childNodes = scanDOMStructure(element, []);
			}
		});
		return structure;
	}

	/**
	 * scan the DIVs for programmed styles
	 * @param {*} elements
	 */
	function scanDOMStyles(elements) {
		// string has only numbers
		// ^ start [0-9] numbers + more of that kind $ end
		var reg = new RegExp('^[0-9]+$');
		var divStyles = [];

		// for each DIV scan the style properties !=""
		elements.forEach(element => {
			var newObj = {};
			newObj.name = element.name;
			newObj.attributes = {};
			if (element.value) {
				newObj.attributes.value = element.valeu;
			}
			newObj.attributes.style = {};
			var styles = element.style; // read the inline styles
			Object.keys(styles).forEach(style => {
				// new styles without the number-list
				if (styles[style] && !reg.test(style)) {
					var value = styles[style];
					value = convertStyles(style, value);
					newObj.attributes.style[style] = value; // store to object
					//console.log(style + ' : ' + value); // key + value
				}
			});
			divStyles.push(newObj);
		});
		return divStyles;
	}

	/**
	 * scan the elements for actions
	 * @param {*} elements
	 */
	function scanDOMAction(elements) {
		var divActions = [];
		// get the id
		// get the data-attributes
		// get the functions
		// get the innerHTML
		elements.forEach(element => {
			var newObj = {};
			newObj.name = element.name;
			newObj.id = element.id;
			if (element.innerHTML) {
				newObj.innerHTML = element.innerHTML;
			}
			divActions.push(newObj);
		});
		return divActions;
	}

	/**
	 * special for some styles
	 * @param {} style
	 * @param {*} value
	 */
	function convertStyles(style, value) {
		if (style == 'backgroundColor' || style == 'color') {
			value = colorToHex(value);
		}
		return value;
	}

	/**
	 * convert rgb() to HEX
	 * @param {*} color
	 */
	function colorToHex(color) {
		// Convert any CSS color to a hex representation
		// Examples:
		// colorToHex('red')            # '#ff0000'
		// colorToHex('rgb(255, 0, 0)') # '#ff0000'
		var rgba = colorToRGBA(color);
		var hex = [0, 1, 2]
			.map(function (idx) {
				return byteToHex(rgba[idx]);
			})
			.join('');
		return '#' + hex;
	}
	function colorToRGBA(color) {
		// Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
		// color must be a valid canvas fillStyle. This will cover most anything
		// you'd want to use.
		// Examples:
		// colorToRGBA('red')  # [255, 0, 0, 255]
		// colorToRGBA('#f00') # [255, 0, 0, 255]
		var cvs, ctx;
		cvs = document.createElement('canvas');
		cvs.height = 1;
		cvs.width = 1;
		ctx = cvs.getContext('2d');
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, 1, 1);
		return ctx.getImageData(0, 0, 1, 1).data;
	}

	function byteToHex(num) {
		// Turns a number (0-255) into a 2-character hex number (00-ff)
		return ('0' + num.toString(16)).slice(-2);
	}
};
