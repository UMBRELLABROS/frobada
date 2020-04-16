<?php
$method = $_SERVER['REQUEST_METHOD'];


/**
 * json file operations
 *
 * Funtions:
 * create a json file [] PUT 'jsonfile/<repository>/<folder>/<filename (no extension)>'
 * append an item to a json file POST 'jsonfile/<repository>/<folder>/<filename (no extension)>'
 * delete a json file DELETE 'jsonfile/<repository>/<folder>/<filename (no extension)>'
 * get a json file GET 'jsonfile/<repository>/<folder>/<filename (no extension)>'
 */


// Read data from matches (see router.json)
// echo($matches['filename']);


// get the data from put, post, get, delete
include("Request.php");
$ctrl = new Request();

// get server class for database
include ("services/jsonfile.service.php");

// manage subfolders
if(isset($matches['folder']) && isset($matches['filename'])){
	$matches['repository'] .= "/".$matches['folder'];
}

$jsonfile = new JSONFile($matches['repository']);

// if method ="PUT"
switch($ctrl->getMethod()){
    case "PUT":
        // create file           
        $jsonfile->write($matches['filename'], $ctrl->object);
	break;
	case "POST":
        // append to file     
        $jsonfile->append($matches['filename'], $ctrl->object);
    break;
    case "DELETE":
        // delete file     
        $jsonfile->delete($matches['filename']);
    break;
    case "GET":
        $jsonfile->read($matches['filename']);
    break;
}

// go to service depending on method
// print_r($ctrl->object);


?>