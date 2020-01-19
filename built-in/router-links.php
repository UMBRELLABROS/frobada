<?php 

// load an parse the JSON file
// standard
$routerJsonFileContents = file_get_contents("router.json");
// DOM data (combined functions)
$routerDomJsonFileContents = file_get_contents("routerDom.json");

$routesDefault = json_decode($routerJsonFileContents, true);
$routesDom = json_decode($routerDomJsonFileContents, true);

$routes = array_merge($routesDefault,$routesDom);


?>