<?php
$method = $_SERVER['REQUEST_METHOD'];

// Read data from matches
echo($matches['user_id']);


// get the data from put, post, get, delete
include("Request.php");
$ctrl = new Request();

// go to service depending on method
print_r($ctrl->object);


?>