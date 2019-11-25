<?php


class Request{
    private $method;
    public $object;

    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->selectMethod();
    }

    public function getMethod(){return $this->method;}

    private function selectMethod(){
        switch($this->method){
            case "DELETE":                
            break;
            case "GET":               
            break;
            case "POST":
                // read data
                $this->object = $_POST;                
            break;
            case "PUT":
                // read data
                $this->object = json_decode(file_get_contents("php://input"), true);
                $arr = array('Type' => $method,  'site' => $actual_link);               
            break;
            
        }
    }    
}

?>