<?php 
require_once ("services/tabledata.service.php");
require_once ("services/jsonfile.service.php");

/**
 * Handle a complete object with style, action, template
 */
class Elements{
    private $databaseName;    
    private $table;    
    private $conn;
	private $params;
	private $tabledata;	

    public function __construct($databaseName, $table)
    {        
        $this->databaseName = $databaseName;
        $this->table = $table;       
        // get structure from JSON: $table."tablestructure.json" 
        // load an parse the JSON file
        // check existance         
		$this->tableElement = new TableData($databaseName, $table);
		$this->tableElement->setSilent(true);
		$this->tableTemplate = new TableData($databaseName, "templates");
		$this->tableTemplate->setSilent(true);
		
	}

	public function read($where, $what){
		// read line from the elements table		
		$elementData = $this->tableElement->read($where, $what)['message'][0];
		// error handling
		// read action.json		
		$actionJSON = $this->readJSONFile("repository/actions",$elementData['action']);
		//print_r($actionJSON);	

		// read line from templates table
		$templateData = $this->tableTemplate->read("id", $elementData['template'])['message'][0];
		//print_r($templateData);
		$structureJSON = $this->readJSONFile("repository/structure",$templateData['structure']);
		$stylesJSON = $this->readJSONFile("repository/styles",$templateData['styles']);
		// print_r($structureJSON);
		// print_r($stylesJSON);

		$ret =  array("action"=> json_decode($actionJSON), 
		"template"=> array(
			"structure"=>json_decode($structureJSON), 
			"styles"=>json_decode($stylesJSON))) ;
		// print_r(json_encode($ret));
		echo json_encode($ret);
	}

	
	/**
	 * Read the JSON file
	 */
	private function readJSONFile($repository, $filename){
		// file exists
		$jsonFile = new JSONFile($repository);
		$jsonFile->setSilent(true);
		if($filename){
			return  $jsonFile->read($filename);
		}
		else{
			echo("No file ".$repository." ".$filename);
		}
		
	}
}