<?php 

/**
 * Handle table access
 */
class Table{
    private $databaseName;    
    private $table;    
    private $conn;
    private $params;

    public function __construct($databaseName, $table)
    {        
        $this->databaseName = $databaseName;
        $this->table = $table;       
        // get structure from JSON: $table."tablestructure.json" 
        // load an parse the JSON file
		// check existance

        $paramsJsonFileContents = file_get_contents("tablestructures/".$table.".tablestructure.json");
        $this->params = json_decode($paramsJsonFileContents, true);      
    }

    /**
     * create a new table 
     * params : [{"label":label, "type":type, "initValue":initial value}, {...}, ...]
     */
    public function create( $tabledata ){
        $this->connect();
		$message="";
		$error=null;
        try {    
			if(!$this->params){
				if(!$tabledata){
					$error = $this->table.".tablestructure.json not could not be created";					
				}
				else{
					// generate the structure from $tabeldata (json)	
					include ("services/jsonfile.service.php");
					$file = $this->table.".tablestructure";
					$jsonfile = new JSONFile("tablestructures");	
					$jsonfile->setSilent(true);			     
					$jsonfile->write($file , $tabledata);
					$this->params = json_decode($jsonfile->read($file ), true);										
					$message="";					
				}
			}		
			
			if($this->params){
				// setting the PDO error mode to exception
				$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				// sql to create table
				$sql = "CREATE TABLE $this->table (
				id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,";
				// loop over params
				foreach($this->params as $param ){
					$sql.=$param['label']." ".$param['type']." ".$param['default'].",";
				}    
				$sql.="timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
				)";
			
				// use exec() because no results are returned
				$this->conn->exec($sql);

				$message = "Table $this->table created successfully in database $this->databaseName";
			}
            $ret = array('message' => $message, "error"=>$error);
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
            // ****************************************                       
            $sql = "DROP TABLE $this->table";
            // use exec() because no results are returned
            $this->conn->exec($sql);

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