<?php 

/**
 * Handle database access
 */
class database{
    private $databaseName;    
    private $conn;

    public function __construct($databaseName)
    {        
        $this->databaseName = $databaseName;
    }

    /**
     * create a new db with credentials from JSON file
     */
    public function create(){
        $this->connect();
        $message="";
        try {
            // setting the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "CREATE DATABASE $this->databaseName";
            // using exec() because no results are returned
            $this->conn->exec($sql);
            $message = "Database created successfully with the name $this->databaseName";
            $ret = array('message' => $message, "error"=>null);  
        }
        catch(PDOException $e){
            $ret = array('message' => $message, "error"=>$e->getMessage());          
        }    
        echo(json_encode($ret)   );         
        $this->conn=null;
    }

    /**
     * delete an existing database 
     */
    public function delete(){
        $this->connect();
        $message="";
        try {
            // setting the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "DROP DATABASE $this->databaseName";
            // using exec() because no results are returned
            $this->conn->exec($sql);
            $message = "Database $this->databaseName deleted successfully";
            $ret = array('message' => $message, "error"=>null);                        
        }
        catch(PDOException $e){            
            $ret = array('message' => $message, "error"=>$e->getMessage());           
        }   
        echo(json_encode($ret)   );         
        $this->conn=null;
    }

    /**
     * get the status of the database (tables) 
     * null, if it does not exists
     */
    public function listTables(){
        $this->connect();
        $message="";
        try {
            // switch to database
            $sql = "USE $this->databaseName";
            $this->conn->exec($sql);

            //Our SQL statement, which will select a list of tables from the current MySQL database.
            $sql = "SHOW TABLES";
            
            //Prepare our SQL statement,
            $statement = $this->conn->prepare($sql);
            
            //Execute the statement.
            $statement->execute();
            
            //Fetch the rows from our statement.
            $tables = $statement->fetchAll(PDO::FETCH_NUM);

            if(count($tables)==0){
                $message = "The database has no tables";
            }
                       
            $ret = array('message' => $message, 'tables'=>$tables);                        

        }
        catch(PDOException $e){
            $ret = array('message' => $message, "error"=>$e->getMessage());                       
        }            
        echo(json_encode($ret)   );
        $this->conn=null;
    }

    /**
     * establish a connection
     */
    private function connect(){         
        require_once("DB.php");
        $db= new db();
        $this->conn = $db->connect();
    }

}


?>