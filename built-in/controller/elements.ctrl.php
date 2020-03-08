<?php
// get all infos for one dom element
$method = $_SERVER['REQUEST_METHOD'];

// Read data from matches (see router.json)
//


// get the data from put, post, get, delete
include("Request.php");
$ctrl = new Request();

// get server class for database
include ("services/elements.service.php");

$elements = new Elements($matches['database'], $matches['table']);

// if method ="PUT"
switch($ctrl->getMethod()){
    case "POST":       
    break;
	case "PUT":       
		// write the element
    break;
    case "DELETE":       
    break;
    case "GET":
		// read the data from the database / json files
		$elements->read($matches['where'], $matches['what']);
    break;
}

?>
