<?php 

// load an parse the JSON file
$routerJsonFileContents = file_get_contents("router.json");
$routes = json_decode($routerJsonFileContents, true);

?>