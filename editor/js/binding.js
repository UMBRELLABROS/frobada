// Databinding

// * Receives an Object

/** Binds an object to en alement (element.attribute)
 * @param {Object} obj
 *
 * Call: new SingleBinding({
 * object: obj,
 * property: "a",
 * element: myElement,
 * attribute: "innerHTML"
 * })
 * var obj={a:123}
 */
var SingleBinding = function(obj) {
	var _this = this;
	this.element = obj.element;
	this.value = obj.object[obj.property];
	this.attribute = obj.attribute;

	this.valueGetter = function() {
		return _this.value;
	};
	this.valueSetter = function(value) {
		_this.value = value;
		_this.element[_this.attribute] = value;
	};

	Object.defineProperty(obj.object, obj.property, {
		get: this.valueGetter,
		set: this.valueSetter
	});
	obj.object[obj.property] = this.value;

	this.element[this.attribute] = this.value;
};

/**
 * Binds an object to an alement (element.attribute)
 * and vice versa
 * @param {*} obj
 *
 * new TwoWayBinding({
 * object: obj,
 * property: "a"
 * })
 * .addBinding(myInputElement1, "value", "keyup")
 * .addBinding(myInputElement2, "value", "keyup")
 * .addBinding(myDOMElement, "innerHTML")
 */
var TwoWayBinding = function(obj) {
	var _this = this;
	this.elementBindings = [];
	this.value = obj.object[obj.property];

	this.valueGetter = function() {
		return _this.value;
	};

	this.valueSetter = function(value) {
		_this.value = value;
		for (var i = 0; i < _this.elementBindings.length; i++) {
			// inform all bindings
			var binding = _this.elementBindings[i];
			var attributes = binding.attribute.split('.');
			if (attributes.length == 2) {
				binding.element[attributes[0]][attributes[1]] = value;
			} else {
				binding.element[attributes[0]] = value;
			}
			//binding.element[binding.attribute] = value;
		}
	};

	/** add binding to the object */
	this.addBinding = function(element, attribute, event) {
		var binding = {
			element: element,
			attribute: attribute
			// event: event;
		};
		if (event) {
			// create a function and store it
			binding.handler = function(event) {
				_this.valueSetter(element[attribute]);
			};

			element.addEventListener(event, binding.handler);
			binding.event = event;
		}
		this.elementBindings.push(binding);
		element[attribute] = _this.value;
		return _this;
	};

	/** remove all bindings */
	this.clearBinding = function() {
		while (_this.elementBindings.length > 0) {
			try {
				var binding = this.elementBindings.pop();
			} catch (error) {
				console.log(error);
				break;
			}
			if (binding.event) {
				binding.element.removeEventListener(binding.event, binding.handler);
			}
		}
	};

	Object.defineProperty(obj.object, obj.property, {
		get: this.valueGetter,
		set: this.valueSetter
	});

	obj.object[obj.property] = this.value;
};

/**
 * Binds an object to en alement (element.attribute)
 * and vice versa
 * @param {*} obj
 *
 * new TwoWayExtendedBinding({
 * object: obj,
 * property: "a"
 * })
 * .addBinding(myInputElement1, "value", "keyup")
 * .addBinding(myInputElement2, "value", "keyup")
 * .addBinding(myDOMElement, "innerHTML")
 */
var TwoWayExtendedBinding = function(obj) {
	var _this = this;
	this.elementBindings = [];
	this.value = obj.object[obj.property];

	this.valueGetter = function() {
		return _this.value;
	};

	this.valueSetter = function(value, binding) {
		if (binding && binding.elements.length == 2) {
			// link the element back together
			_this.value = binding.elements[0].value + binding.elements[1].value;
		} else {
			_this.value = value;
		}

		for (var i = 0; i < _this.elementBindings.length; i++) {
			// inform all bindings
			var binding = _this.elementBindings[i];
			var attributes = binding.attribute.split('.');
			var actValue = _this.value;

			for (var j = 0; j < binding.elements.length; j++) {
				if (binding.special) {
					actValue = binding.elements[j].value;
				}
				if (attributes.length == 2) {
					binding.elements[j][attributes[0]][attributes[1]] = actValue;
				} else {
					binding.elements[j][attributes[0]] = actValue;
				}
			}
		}
	};

	/** add binding to the object[s] */
	this.addBinding = function(elements, attribute, events, special) {
		var binding = {
			elements: elements,
			attribute: attribute,
			handler: [],
			events: null,
			special: null
		};
		console.log('Elements:');
		console.log(elements);
		if (events) {
			binding.events = events;
			binding.special = special;
			// loop over all events
			for (var i = 0; i < events.length; i++) {
				var event = events[i];
				// create a function and store it
				binding.handler[i] = function(event) {
					_this.valueSetter(event.target[attribute], binding);
				};

				elements[i].addEventListener(event, binding.handler[i]);
			}
		}
		this.elementBindings.push(binding);
		// set initial values here
		for (var i = 0; i < elements.length; i++) {
			if (binding.special) {
				var arr = _this.value.match(binding.special);
				elements[i][attribute] = arr[i + 1];
			} else {
				elements[i][attribute] = _this.value;
			}
		}
		return _this;
	};

	/** remove all bindings */
	this.clearBinding = function() {
		while (_this.elementBindings.length > 0) {
			try {
				var binding = this.elementBindings.pop();
			} catch (error) {
				console.log(error);
				break;
			}
			if (binding.event) {
				binding.element.removeEventListener(binding.event, binding.handler);
			}
		}
	};

	Object.defineProperty(obj.object, obj.property, {
		get: this.valueGetter,
		set: this.valueSetter
	});

	obj.object[obj.property] = this.value;
};
