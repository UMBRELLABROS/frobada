<?php
$method = $_SERVER['REQUEST_METHOD'];

// Read data from matches (see router.json)
// echo($matches['filename']);


// get the data from put, post, get, delete
include("Request.php");
$ctrl = new Request();

// get server class for database
include ("services/jsonfile.service.php");
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