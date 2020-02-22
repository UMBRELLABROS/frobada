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

	this.valueSetter = function(value) {
		console.log('VALUE:' + value);
		_this.value = value;
		console.log('After:' + _this.value);
		console.log('Length Bindings:' + _this.elementBindings.length);
		for (var i = 0; i < _this.elementBindings.length; i++) {
			// inform all bindings
			var binding = _this.elementBindings[i];
			var attributes = binding.attribute.split('.');

			for (var i = 0; i < binding.elements.length; i++) {
				if (attributes.length == 2) {
					binding.elements[i][attributes[0]][attributes[1]] = value;
				} else {
					binding.elements[i][attributes[0]] = value;
				}
			}

			if (binding.special) {
				//alert(binding.special);
			}
		}
	};

	/** add binding to the object[s] */
	this.addBinding = function(elements, attribute, events, special) {
		var binding = {
			elements: elements,
			attribute: attribute
			// handler: [],
			// events: events,
			// special: special
		};
		console.log('Elements:');
		console.log(elements);
		if (events) {
			binding.handler = [];
			binding.events = events;
			binding.special = special;
			// loop over all events
			for (var i = 0; i < events.length; i++) {
				var event = events[i];
				var element = elements[i];
				// create a function and store it
				binding.handler[i] = function(event) {
					_this.valueSetter(element[attribute]);
				};
				elements[i].addEventListener(event, binding.handler[i]);
			}
		}
		this.elementBindings.push(binding);
		for (var i = 0; i < elements.length; i++) {
			elements[i][attribute] = _this.value;
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
