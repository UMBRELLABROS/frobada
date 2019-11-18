// Transfer data to server and read infos

var Ajax = function() {
  // private
  var client = null;
  var callbackFunction; // callback
  var async = true;
  var responseType = "";
  // public
  this.URL = ""; // path to server

  // pupblic functions
  this.post = postData; //post request
  this.get = getData; //get request
  this.put = putData; //put request
  this.delete = deleteData; //delete request

  this.returnFunction = setCallback; // callback setzen

  // call with 2 parameters
  if (this instanceof arguments.callee) {
    init.apply(this, arguments);
  }
  function init() {
    this.URL = arguments[0];
    this.returnFunction(arguments[1]);
  }

  if (window.XMLHttpRequest) {
    client = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    client = new ActiveXObject("Microsoft.XMLHTTP");
  }
  client.responseType = responseType;

  // request and error handling
  client.onreadystatechange = function() {
    if (client.readyState == 4 && client.status == 200) {
      res = client.responseText; // result
      callbackFunction(res); // send data to callback
    }
  };

  // definition
  // https://www.mediaevent.de/javascript/XmlHttp-Request-Methoden-Eigenschaften.html

  // post request
  function postData(formData) {
    send(this.URL, "post", formData);
  }

  // put request
  function putData(formData) {
    send(this.URL, "put", formData);
  }

  // get request
  function getData() {
    send(this.URL, "get");
  }

  // delete request
  function deleteData() {
    send(this.URL, "delete");
  }

  function send(url, type, payload) {
    client.open(type, url, async);
    if (payload) {
      client.send(payload);
    } else {
      client.send();
    } /* Send to server */
  }

  // store callback
  function setCallback(callback) {
    callbackFunction = callback;
  }
};
