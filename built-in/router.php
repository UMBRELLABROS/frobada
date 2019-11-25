<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// php -S localhost:1234 router.php

// Send routes to index.php without .htaccess

chdir(__DIR__);
$path=ltrim($_SERVER["REQUEST_URI"], '/');
$filePath = realpath($path);

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
    // rewrite to the index file
    $_GET['path']=$path;
    include __DIR__ . DIRECTORY_SEPARATOR . 'index.php';
    
      
}
?>