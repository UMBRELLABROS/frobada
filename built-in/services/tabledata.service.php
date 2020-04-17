<?php 

/**
 * Handle tabledata
 */
class TableData{
    private $databaseName;    
    private $table;    
    private $conn;
	private $params;
	private $silent = false; // silent mode

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
	
	/** change the silent mode */
	public function setSilent($mode){
		$this->silent = $mode;
	}

    /**
     * insert a new line to a table 
     * params : Tabledata, but not id and timestamp
     */
    public function insert( $itemdata ){
        $this->connect();
		$message="";
		$newId=null;
        try {            
            // setting the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // READ data from structure
            $labelArray = ArrayUtils::objArraySelect($this->params, "label");
            $lables = implode($labelArray, ", ");
            $qs = implode(array_fill(0,count($this->params),"?"),", "); // ?, ?, ? ,...

            // Get the values (in the same order as $labelArray)
            $values = ArrayUtils::getOrderedValues($itemdata, $labelArray);            
            
            $sql = "INSERT INTO $this->table ($lables) VALUES ($qs)";
			$this->conn->prepare($sql)->execute($values);
			$newId = $this->conn->lastInsertId();

            $message = "Item successfully added to table $this->table in database $this->databaseName";
            $ret = array('message' => $message, "error"=>null, "id"=>$newId);
        }
        catch(PDOException $e){
            $ret = array('message' => $message, "error"=>$e->getMessage(), "id"=>null);          
		} 
		if(!$this->silent){
			echo(json_encode($ret)   );
			}
		else{
			return $ret;         
		}   
        $this->conn = null;
    }

    /**
     * delete an existing table by where ...
     */
    public function delete($where, $what){
        $this->connect();
        $message="";
        try {
             // setting the PDO error mode to exception
			 $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			 
			 $sql = "DELETE FROM $this->table WHERE $where = '$what'";			
			 $this->conn->exec($sql);

            $message = "Entry $what was deletes from $this->table in database $this->databaseName";
            $ret = array('message' => $message, "error"=>null);
        }
        catch(PDOException $e){            
            $ret = array('message' => $message, "error"=>$e->getMessage());           
		}  
		if(!$this->silent){ 
			echo(json_encode($ret) );         
		}
		else{
			return $ret;
		}
        $this->conn = null;
	}
	
	/**
	 * Change the rows provided by itemdata
	 */
	public function update($where, $what, $itemdata){
		$this->connect();
		$message="";
		$error=null;
        try {
			// setting the PDO error mode to exception
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$keys = array_keys($itemdata);
			$values = array_values($itemdata);

			// verify keys
			$labelArray = ArrayUtils::objArraySelect($this->params, "label");
			$ret = ArrayUtils::objArrayVerify($labelArray, $keys);
			
			if($ret){
				$error = "invalid key: ".$ret;
			}
			else{
				$set = "";
				for($i=0;$i<count($keys);$i++){
					$set .= $keys[$i]."='".$values[$i]."',";
				}
				$set = substr($set, 0, -1);				
				$sql = "UPDATE $this->table SET $set WHERE $where = '$what'";			
				$this->conn->exec($sql);
				$message = "Entry $what was updated from $this->table in database $this->databaseName";
			}
            
            $ret = array('message' => $message, "error"=>$error);
        }
        catch(PDOException $e){            
            $ret = array('message' => $message, "error"=>$e->getMessage());           
		}   
		if(!$this->silent){ 
			echo(json_encode($ret) );  
		}
		else{
			return $ret;
		}
        $this->conn = null;
	}
	
	/**
     * read data by where & what 
     */
    public function read($where, $what){
        $this->connect();
		$message="";
		$error=null;
        try {
			// setting the PDO error mode to exception
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			$sql = "SELECT * FROM $this->table WHERE $where = '$what'";			
			
			$geta=array();  
			$result = $this->conn->query($sql);
			if(!$result)
				$error="Syntax error: ".$sql;
			
			while($row = $result->fetch(PDO::FETCH_ASSOC)) {
				while(list($key,$value) = each($row)){
					$getr[$key]=$value;
				}
				array_push($geta,$getr);
			}

            $message = $geta;
            $ret = array('message' => $message, "error"=>$error);
        }
        catch(PDOException $e){            
            $ret = array('message' => $message, "error"=>$e->getMessage());           
		}   
		if(!$this->silent){ 
			echo(json_encode($ret) );         
		}
		else{
			return $ret;
		}
        $this->conn = null;
	}

	/**
     * count the rows by where & what 
     */
    public function count($where, $what){
        $this->connect();
		$message="";
		$error=null;
        try {
			// setting the PDO error mode to exception
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			$sql = "SELECT * FROM $this->table WHERE $where = '$what'";		
			if(!$this->conn->query($sql))
				$error="Syntax error: ".$sql;

            $message = $this->conn->query($sql)->rowCount();
            $ret = array('message' => $message, "error"=>$error);
        }
        catch(PDOException $e){            
            $ret = array('message' => $message, "error"=>$e->getMessage());           
		}   
		if(!$this->silent){ 
			echo(json_encode($ret) );         
		}
		else{
			return $ret;
		}
        $this->conn = null;
	}

    /**
     * read only the labels from the structure
     */
    private function labelFilter($item){
        return $item['label'];
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

class ArrayUtils
{
	/**
	 * get only key parameters form array of objects
	 */
    public static function objArraySelect($array, $keyComparer)
    {
        $ret=[];    
        foreach($array as $item){           
            foreach ($item as $key => $value){
                if($key == $keyComparer){
                    array_push($ret,$value);
                }
            }
        }
       return $ret;
	}
	
	/**
	 * order the source array according to the order array and return the values
	 */
	public static function getOrderedValues($sourceArray, $orderArray){
		$ret=[];
		foreach($orderArray as $comparer){
			foreach ($sourceArray as $key => $value){
				if($key == $comparer){
					array_push($ret,$value);
				}
			}
		}
		return $ret;
	}

	/**
	 * test if elements of the test array are in the source array
	 */
	public static function objArrayVerify($sourceArray, $testArray){
		foreach($testArray as $test){
			if(!in_array($test, $sourceArray)){
				return $test;	
			}			
		}
		return null;
	}

}

?>