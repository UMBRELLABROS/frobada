// basic editor functions
function d() {
  return document;
}
function $(id) {
  return d().getElementById(id);
}
function dCE(element) {
  return d().createElement(element);
}

/**
 * Get all the div elements from the html file
 */
function getDivElements() {
  var allElements = d().getElementsByTagName("div");
  var allIds = [];
  for (var i = 0, n = allElements.length; i < n; ++i) {
    if (allElements[i].id) {
      allIds.push(allElements[i].id);
    }
  }
  return allIds;
}

/**
 * Initial function
 */
function initElements() {
  fbdDivData = JSON.parse(fbdDivDataRaw);
  // get all Ids
  elements = getDivElements(this.document.body);
  setAttributes(elements, fbdDivData);
  setInnerHTML(elements, fbdDivData);
  setEventHandler(elements, fbdDivData);
}

/**
 * Set all attributes to all divs
 * @param {Array} elements
 * @param {Object} fbdDivData
 */
function setAttributes(elements, fbdDivData) {
  elements.map(element => {
    attributes = fbdDivData.find(x => {
      if (x.div === element) return x;
    }).attributes;
    if (attributes) {
      setAttribute($(element), attributes);
    }
  });
}

/**
 *
 * @param {HTMLElement} element
 * @param {Object} attributes
 */
function setAttribute(element, attributes) {
  for ([key, value] of Object.entries(attributes)) {
    if (typeof value === "object") {
      setAttribute(element[key], value);
    } else {
      element[key] = value;
    }
  }
}

function setEvents(element, events) {
  for ([key, value] of Object.entries(events)) {
    if (typeof value === "object") {
      setEvents(element, value);
    } else {
      element.addEventListener(key, value);
    }
  }
}

function setEventHandler(elements, fbdDivData) {
  elements.map(element => {
    events = fbdDivData.find(x => {
      if (x.div === element) return x;
    }).events;
    if (events) {
      setEvents($(element), events);
    }
  });
}

/**
 * set the inner HTML (Text, form elements)
 * @param {Array} elements
 * @param {Object} fbdDivData
 */
function setInnerHTML(elements, fbdDivData) {
  elements.map(element => {
    innerHTML = fbdDivData.find(x => {
      if (x.div === element) return x;
    }).innerHTML;
    if (innerHTML) {
      $(element).innerHTML = innerHTML;
    }
  });
}
