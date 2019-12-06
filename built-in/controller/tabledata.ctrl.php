<?php
$method = $_SERVER['REQUEST_METHOD'];

// Read data from matches (see router.json)
//echo($matches['name']);


// get the data from put, post, get, delete
include("Request.php");
$ctrl = new Request();

// get server class for database
include ("services/table.service.php");

$table = new Table($matches['database'], $matches['table']);

// if method ="PUT"
switch($ctrl->getMethod()){
    case "POST":
        // create database with database-name=name               
        $table->insert($ctrl->object);
    break;
    case "PUT":
        // create database with database-name=name               
        $table->create($ctrl->object);
    break;
    case "DELETE":
        // delete database with database-name=name       
        $table->delete();
    break;
    case "GET":
        
    break;
}

// go to service depending on method
// print_r($ctrl->object);


?>