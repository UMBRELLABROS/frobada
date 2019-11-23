<?php
$method = $_SERVER['REQUEST_METHOD'];

// generate a new Database
switch($method){
    case "PUT":
        // read database parameters
        //include("service/database.php");

        
        echo json_encode($_PUT);
        //generateDatabase($_PUT);

        
    break;
    }




?>