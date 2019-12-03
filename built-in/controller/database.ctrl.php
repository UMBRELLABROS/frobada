<?php
$method = $_SERVER['REQUEST_METHOD'];

// Read data from matches (see router.json)
//echo($matches['name']);


// get the data from put, post, get, delete
include("Request.php");
$ctrl = new Request();

// get server class for database
include ("services/database.service.php");
$db = new database($matches['name']);

// if method ="PUT"
switch($ctrl->getMethod()){
    case "PUT":
        // create database with database-name=name               
        $db->create();
    break;
    case "DELETE":
        // delete database with database-name=name       
        $db->delete();
    break;
    case "GET":
        $db->listTables();
    break;
}

// go to service depending on method
print_r($ctrl->object);


?>