<?php 

/**
 * Handle tabledata
 */
class Table{
    private $databaseName;    
    private $table;    
    private $conn;

    public function __construct($databaseName, $table)
    {        
        $this->databaseName = $databaseName;
        $this->table = $table;        
    }

    /**
     * insert a new line to a table 
     * params : Tabledata, but not id and timestamp
     */
    public function insert( $params){
        $this->connect();
        $message="";
        try {            
            // setting the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // READ data from structure
            
            $sql = "INSERT INTO users (firstname, lastname) VALUES (?,?)";
            $this->conn->prepare($sql)->execute([$firstname, $lastname]);

            $message = "Item successfully added to table $this->table in database $this->databaseName";
            $ret = array('message' => $message, "error"=>null);
        }
        catch(PDOException $e){
            $ret = array('message' => $message, "error"=>$e->getMessage());          
        }    
        echo(json_encode($ret)   );         
        $this->conn = null;
    }

    /**
     * delete an existing table 
     */
    public function delete(){
        $this->connect();
        $message="";
        try {
             // setting the PDO error mode to exception
             $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $message = "Table $this->table was deleted successfully in database $this->databaseName";
            $ret = array('message' => $message, "error"=>null);
        }
        catch(PDOException $e){            
            $ret = array('message' => $message, "error"=>$e->getMessage());           
        }   
        echo(json_encode($ret)   );         
        $this->conn = null;
    }
    
    /**
     * establish a connection
     */
    private function connect(){         
        require_once("DB.php");
        $db = new DB($this->databaseName);
        $this->conn = $db->connect();        
    }

}


?>