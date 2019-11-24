<?php
header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods 'GET, POST, PUT, DELETE'");
   
 // start server here with
 // php -S localhost:1324

// router for URL
// http://www.stephan-romhart.de/artikel/performantes-url-routing-php-regex

$routes = array(
	array(
		'path_pattern' => '/^index$/',
		'controller'   => 'controler/index.ctrl.php'
	),	
	array(
		'path_pattern' => '/^user\/(?P<user_id>\d+)$/',
		'controller'   => 'controler/user.ctrl.php'
	),
	array(
		'path_pattern' => '/^database$/',
		'controller'   => 'controler/database.ctrl.php'
	),
	array(
		'path_pattern' => '/^company\/search\/autocomplete\/(?P<filter>[a-z_]+)$/',
		'controller'   => 'controler/company-search-autocomplete.ctrl.php'
	)
);

function router($routes)
{

	$route_match = false;
	$url_path    = 'index';
	$url_params  = array();
		
	
	if(isset($_GET['path']))
	{
		echo($_GET['path']);	
		$url_path = $_GET['path'];
		if(substr($url_path,-1) == '/')
		{
			$url_path = substr($url_path,0,-1);
		}		
	}else{
		echo("no path");
	}
		
	foreach($routes as $route)
	{
		if(preg_match($route['path_pattern'],$url_path,$matches))
		{
			$url_params  = array_merge($url_params,$matches);
			$route_match = true;
			echo($route['controller']);
			break;
		}
	}

}

router($routes);
?>