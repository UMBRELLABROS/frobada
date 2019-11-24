<?php
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Origin: *");


include "Request.php";
$req= new Request(); // read the Parameters

$arr= array('METHOD' => $req->getMethod());

print_r($req->object);
echo json_encode($arr);

$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";


?>