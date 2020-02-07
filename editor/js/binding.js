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
function SingleBinding(obj) {
	_this = this;
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
}

/**
 * Binds an object to en alement (element.attribute)
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
function TwoWayBinding(obj) {
	_this = this;
	this.elementBindings = [];
	this.value = obj.object[obj.property];

	this.valueGetter = function() {
		return _this.value;
	};

	this.valueSetter = function(value) {
		_this.value = value;
		for (var i = 0; i < _this.elementBindings.length; i++) {
			var binding = _this.elementBindings[i];
			binding.element[binding.attribute] = value;
		}
	};

	this.addBinding = function(element, attribute, event) {
		var binding = {
			element: element,
			attribute: attribute
		};
		if (event) {
			element.addEventListener(event, function(event) {
				_this.valueSetter(element[attribute]);
			});
			binding.event = event;
		}
		this.elementBindings.push(binding);
		element[attribute] = _this.value;
		return _this;
	};

	this.clearBinding = function() {
		for (var i = 0; i < _this.elementBindings.length; i++) {
			var binding = this.elementBindings.pop();
			if (binding.event) {
				binding.element.removeEventListener(binding.event, function(event) {
					_this.valueSetter(binding.element[attribute]);
				});
			}
		}
	};

	Object.defineProperty(obj.object, obj.property, {
		get: this.valueGetter,
		set: this.valueSetter
	});

	obj.object[obj.property] = this.value;
}
