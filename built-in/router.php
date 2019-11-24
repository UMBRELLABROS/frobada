<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// php -S localhost:1234 router.php


chdir(__DIR__);
$path=ltrim($_SERVER["REQUEST_URI"], '/');
$filePath = realpath($path);


echo($path."\n");
echo($filePath."\n");

if ($filePath && is_dir($filePath)){
    // attempt to find an index file
    foreach (['index.php', 'index.html'] as $indexFile){
        if ($filePath = realpath($filePath . DIRECTORY_SEPARATOR . $indexFile)){
            echo("found");
            break;
        }
    }
}

if ($filePath && is_file($filePath)) {
    echo("-2a");
    // 1. check that file is not outside of this directory for security
    // 2. check for circular reference to router.php
    // 3. don't serve dotfiles
    if (strpos($filePath, __DIR__ . DIRECTORY_SEPARATOR) === 0 &&
        $filePath != __DIR__ . DIRECTORY_SEPARATOR . 'router.php' &&
        substr(basename($filePath), 0, 1) != '.'
    ) {
        if (strtolower(substr($filePath, -4)) == '.php') {
            // php file; serve through interpreter
            include $filePath;
        } else {
            // asset file; serve from filesystem
            return false;
        }
    } else {
        // disallowed file
        header("HTTP/1.1 404 Not Found");
        echo "404 Not Found";
    }
} else {
    echo($filePath."\n");
    // rewrite to our index file
    include __DIR__ . DIRECTORY_SEPARATOR . 'index.php';
    $_GET['path']=$path;
    router($routes);
    
}
?>