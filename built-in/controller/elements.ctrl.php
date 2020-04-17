<?php
// get all infos for one dom element
$method = $_SERVER['REQUEST_METHOD'];

/**
 * Element operations
 * 
 * Funtions:
 *
 * get a specified element from the database and load the complete json stucture
 * with action, structure and styles
 * GET 'elements/<data base>/<table>/<column>/<identifier>'
 * 
 * missing functions:
 * save an element to the data base and to json folders
 */

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
		$elements->write($matches['where'], $matches['what'], $ctrl->object);
    break;
    case "DELETE":       
    break;
    case "GET":
		// read the data from the database / json files
		$elements->read($matches['where'], $matches['what']);
    break;
}

?>
