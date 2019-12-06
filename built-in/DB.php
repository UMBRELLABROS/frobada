<?php

class DB{
    private $existingDatabase="mysql";  
    private $sourcePath="database.json";   
    private $params;
    private $conn;

    public function __construct($databaseName = null)
    {
        if($databaseName){
            $this->existingDatabase = $databaseName;
        }        
        // load an parse the JSON file
        $paramsJsonFileContents = file_get_contents($this->sourcePath);
        $this->params = json_decode($paramsJsonFileContents, true);
    }

    /**
     * Connect to the default database or use given name
     */
    public function connect(){       
        try {            
            $this->conn = new PDO('mysql:host='.$this->params['servername'].';dbname='.$this->existingDatabase,
            $this->params['username'], 
            $this->params['password']);            
            return $this->conn;
        }
        catch(PDOException $e) {            
            $ret = array('message' => 'Unable to connect Database.', "error"=>$e->getMessage());   
            echo(json_encode($ret));   
            exit;                                 
        }        
    }

}
        

?>