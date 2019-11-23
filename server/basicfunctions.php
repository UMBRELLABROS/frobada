<?php
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Origin: *");


$method = $_SERVER['REQUEST_METHOD'];
$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

switch($method){
    case "GET":
        $arr = array('Type' => $method, 'site' => $actual_link);
        echo json_encode($arr);
    break;
    case "POST":
        // read data
        $arr = array('Type' => $method,  'site' => $actual_link);
        if(isset($_POST["Key"])){
            $arr = array('Type' => $method, 'Key' => $_POST["Key"], 'site' => $actual_link);
        }
        echo json_encode($arr);
    break;
    case "PUT":
        // read data
        $decoded_input = json_decode(file_get_contents("php://input"), true);
        $arr = array('Type' => $method,  'site' => $actual_link);
        if(isset($decoded_input["Key"])){
            $arr = array('Type' => $method, 'Key' => $decoded_input["Key"], 'site' => $actual_link);
        }
        print_r($decoded_input);
        echo json_encode($arr);
    break;
    case "DELETE":
        $arr = array('Type' => $method, 'site' => $actual_link);
        echo json_encode($arr);
    break;
}

?>