<?php
$method = $_SERVER['REQUEST_METHOD'];

/**
 * only for testing purposes
 */

switch($method){
    case "GET":
        $arr = array('Type' => $method, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 'index');
        echo json_encode($arr);
    break;
    case "POST":
        // read data
        $arr = array('Type' => $method, 'Key' => 2, 'c' => 3, 'd' => 4, 'e' => 'index');
        if(isset($_POST["Key"])){
            $arr = array('Type' => $method, 'Key' => $_POST["Key"], 'c' => 3, 'd' => 4, 'e' => 'index');
        }
        echo json_encode($arr);
    break;
}

?>