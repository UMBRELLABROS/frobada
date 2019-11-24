<?php 


$routes = array(
	array(
		'path_pattern' => '/^index$/',
		'controller'   => 'controller/index.ctrl.php'
	),	
	array(
		'path_pattern' => '/^user\/(?P<user_id>\d+)$/',
		'controller'   => 'controller/user.ctrl.php'
	),
	array(
		'path_pattern' => '/^database$/',
		'controller'   => 'controller/database.ctrl.php'
	),
	array(
		'path_pattern' => '/^company\/search\/autocomplete\/(?P<filter>[a-z_]+)$/',
		'controller'   => 'controller/company-search-autocomplete.ctrl.php'
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
	}

	
	foreach($routes as $route)
	{
		if(preg_match($route['path_pattern'],$url_path,$matches))
		{
            // $matches contains () values like '/^user\/(?P<user_id>\d+)$/' : user_id 
			$url_params  = array_merge($url_params,$matches);
            $route_match = true;
            print_r($matches);
			break;
		}
	}
	
	if(!$route_match)
	{
		exit('Der Url-Pfad "'.$url_path.'" ist nicht definiert.');
	}
	
	if(file_exists($route['controller']))
	{
		echo($route['controller']);
        include($route['controller']);
        
        // set $matches here
        
	}
	else
	{
		exit('Der Controller "'.$route['controller'].'" existiert nicht.');
	}
}



?>