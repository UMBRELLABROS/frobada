<?php
$method = $_SERVER['REQUEST_METHOD'];


switch($method){
    case "GET":
        $arr = array('Type' => $method, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
        echo json_encode($arr);
    break;
    case "POST":
        // read data
        $arr = array('Type' => $method, 'Key' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
        if(isset($_POST["Key"])){
            $arr = array('Type' => $method, 'Key' => $_POST["Key"], 'c' => 3, 'd' => 4, 'e' => 5);
        }
        echo json_encode($arr);
    break;
}

?>