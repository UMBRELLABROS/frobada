// Transfer data to server and read infos

var Ajax = function() {
  // private
  var client = null;
  var callbackFunction; // callback
  var async = true;
  var responseType = "";
  // public
  this.PHPPath = ""; // path to server

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
    this.PHPPath = arguments[0];
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
    client.open("post", this.PHPPath, async);
    client.send(formData); /* Send to server */
  }

  // put request
  function putData(formData) {
    client.open("put", this.PHPPath, async);
    client.send(formData); /* Send to server */
  }

  // get request
  function getData() {
    client.open("get", this.PHPPath, async);
    client.send(); /* Send to server */
  }

  // delete request
  function deleteData(formData) {
    client.open("delete", this.PHPPath, async);
    client.send(); /* Send to server */
  }

  // store callback
  function setCallback(callback) {
    callbackFunction = callback;
  }
};
