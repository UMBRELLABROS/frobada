<?php
$method = $_SERVER['REQUEST_METHOD'];


/**
 * Table data  operations
 * 
 * Funtions:
 * create a new entry PUT 'tabledata/<data base>/<table>'
 * update an entry PUT 'tabledata/<data base>/<table>/<column>/<identifier>'
 * delete an entry DELETE 'tabledata/<data base>/<table>/<column>/<identifier>'
 * read an entry GET 'tabledata/<data base>/<table>/<column>/<identifier>'
 */


// Read data from matches (see router.json)
//echo($matches['name']);


// get the data from put, post, get, delete
include("Request.php");
$ctrl = new Request();

// get server class for database
include ("services/tabledata.service.php");

$tabledata = new TableData($matches['database'], $matches['table']);

// if method ="PUT"
switch($ctrl->getMethod()){
    case "POST":
        // create new entry           
        $tabledata->insert($ctrl->object);
    break;
    case "PUT":
        // update table          
        $tabledata->update($matches['where'], $matches['what'], $ctrl->object);
    break;
    case "DELETE":
        // delete entry      
        $tabledata->delete($matches['where'], $matches['what']);
    break;
    case "GET":
		// read the data from the line
		$tabledata->read($matches['where'], $matches['what']);
    break;
}

// go to service depending on method
// print_r($ctrl->object);


?>