/**
 * Module to enable editor functions
 */
var DataHandling = function() {
	this.fbdHandler = [];
	this.fbdHandler['addContainer'] = addContainer;
	this.fbdHandler['saveDOM'] = saveDOM;

	function addContainer(event) {
		// put new container to display
		var destination = event.target.getAttribute('data-destination');
		addElementToParent($(destination));
	}

	function addElementToParent(destination) {
		// New element
		div = dCE('div');
		div.id = 'fdb5';
		div.style.width = '100px';
		div.style.height = '100px';
		div.style.backgroundColor = '#d00';

		// test child
		divChild = dCE('div');
		divChild.id = 'fdb7';
		divChild.style.width = '50px';
		divChild.style.height = '10px';
		div.appendChild(divChild);

		// test child
		divChild2 = dCE('div');
		divChild2.id = 'fdb8';
		divChild2.style.width = '50px';
		divChild2.style.height = '10px';
		div.appendChild(divChild2);

		destination.appendChild(div);
	}

	function saveDOM(event) {
		var source = event.target.getAttribute('data-source');
		var elements = [];
		var structure = [];
		elements = scanDOM($(source), elements);
		structure = scanDOMStructure($(source), structure);
		console.log(JSON.stringify(structure));

		// string has only numbers
		// ^ start [0-9] numbers + more of that kind $ end
		var reg = new RegExp('^[0-9]+$');

		// for each DIV scan the style properties !=""
		// get the id
		// get the data-attributes
		// get the functions
		// get the innerHTML
		elements.forEach(element => {
			styles = element.style; // read the inline styles
			Object.keys(styles).forEach(style => {
				// new styles without the number-list
				if (styles[style] && !reg.test(style)) {
					console.log(style); // key
					console.log(styles[style]); // value
				}
			});
		});
	}

	function scanDOM(source, elements) {
		var nodes = source.childNodes;
		nodes.forEach(element => {
			if (element.nodeName == 'DIV') {
				elements.push(element);
				if (element.childNodes.length > 0) {
					elements = scanDOM(element, elements);
				}
			}
		});
		return elements;
	}

	function scanDOMStructure(source, structure) {
		var nodes = source.childNodes;
		nodes.forEach(element => {
			if (element.nodeName == 'DIV') {
				var objDIV = {
					nodeName: 'DIV',
					id: element.id,
					childNodes: []
				};
				structure.push(objDIV);
				if (element.childNodes.length > 0) {
					objDIV.childNodes = scanDOMStructure(element, []);
				}
			}
		});
		return structure;
	}

	function colorToHex(color) {
		// Convert any CSS color to a hex representation
		// Examples:
		// colorToHex('red')            # '#ff0000'
		// colorToHex('rgb(255, 0, 0)') # '#ff0000'
		var rgba = colorToRGBA(color);
		var hex = [0, 1, 2]
			.map(function(idx) {
				return byteToHex(rgba[idx]);
			})
			.join('');
		return '#' + hex;
	}
};
