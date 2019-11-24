<?php
$method = $_SERVER['REQUEST_METHOD'];

print_r($_REQUEST);

$user=-1;
if(isset($_GET['user_id'])){
    $user=$_GET['user_id'];
}


switch($method){
    case "GET":
        $arr = array('Type' => $method, 'b' => 2, 'c' => 3, 'd' => 4, 'USER' => $user);
        echo json_encode($arr);
    break;
    case "POST":
        // read data
        $arr = array('Type' => $method, 'Key' => 2, 'c' => 3, 'd' => 4, 'e' => $user);
        if(isset($_POST["Key"])){
            $arr = array('Type' => $method, 'Key' => $_POST["Key"], 'c' => 3, 'd' => 4, 'USER' => $user);
        }
        echo json_encode($arr);
    break;
}

?>