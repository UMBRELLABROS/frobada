<?php 

/**
 * Handle database access
 */
class database{
    private $databaseName;
    private $params;
    private $conn;

    public function __construct($databaseName)
    {
        // load database parameters
        // load an parse the JSON file
        $paramsJsonFileContents = file_get_contents("database.json");
        $this->params = json_decode($paramsJsonFileContents, true);
        $this->databaseName = $databaseName;
    }

    /**
     * create a new db with credentials from JSON file
     */
    public function create(){
        $this->connect();
        try {
            // setting the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "CREATE DATABASE $this->databaseName";
            // using exec() because no results are returned
            $this->conn->exec($sql);
            echo "Database created successfully with the name $this->databaseName";
        }
        catch(PDOException $e){
            echo $e->getMessage();            
        }            
        $this->conn=null;
    }

    /**
     * delete an existing database 
     */
    public function delete(){
        $this->connect();
        try {
            // setting the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "DROP DATABASE $this->databaseName";
            // using exec() because no results are returned
            $this->conn->exec($sql);
            echo "Database $this->databaseName deleted successfully";
        }
        catch(PDOException $e){
            echo $e->getMessage();            
        }            
        $this->conn=null;
    }

    /**
     * get the status of the database (tables) 
     * null, if it does not exists
     */
    public function get(){

    }

    private function connect(){         
        $existingDatabase="umbrella";     
        try {
            try {
                $this->conn = new PDO('mysql:host='.$this->params['servername'].';dbname='.$existingDatabase,
                $this->params['username'], 
                $this->params['password']);
            }
            catch(PDOException $e){
                $this->conn = new PDO('mysql:host='.$this->params['servername'].';dbname='.$existingDatabase,
                $this->params['username'], 
                $this->params['password']);
            }
        }
        catch(PDOException $e) {
            echo($e);
            exit('Unable to connect Database.');
        }
    }

}


?>