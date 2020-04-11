<?php 
require_once ("services/tabledata.service.php");
require_once ("services/jsonfile.service.php");

/**
 * Handle a complete object with style, action, template
 */
class Elements{
    private $databaseName;    
    private $table;    
    // private $conn;
	// private $params;
	// private $tabledata;	
	private $styles=[]; // array of all styles

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
		// get all templates from within the json file
		$templates =$this->getTemplates(json_decode($actionJSON,true));
		
		// check for includes
		// cascade the structures
		// $structureJSON = $this->checkForIncludes($structureJSON);

		$ret =  array("action"=> json_decode($actionJSON), 			
					  "templates"=>$templates
			) ;
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

	/**
	 * Check, if there are includes 
	 */
	private function checkForIncludes($structureJSON){
		// convert to arrays (, true)
		$elements= json_decode($structureJSON,true);		
		for ($i=0; $i <count($elements); $i++) { 
			$object=$elements[$i];					
			if(isset($object['template'])){
				$template= $object['template'];
				// read structure and styles					
				$styles= $this->readJSONFile("repository/styles",$template['styles']);	
				array_push($this->styles,(json_decode($styles,true))[0]);
				
				$includeJSON = $this->readJSONFile("repository/structure",$template['structure']);								
				// recursive
				// code for recursive
				// ###
				$elements[$i] = json_decode($includeJSON,true);
			}			
		}
		return json_encode($elements);
	}

	/**
	 * Find the templates in the file and load them to templates
	 */
	private function getTemplates($elements){
		// $elements= json_decode($actionJson,true);	
		$templates=[];	
		for ($i=0; $i <count($elements); $i++) { 
			$object=$elements[$i];	
			if(isset($object['template'])){ 
				// get structure and styles from the database
				// read line from templates table
				$templateData = $this->tableTemplate->read("id", $object['template'])['message'][0];
				//print_r($templateData);
				$structureJSON = $this->readJSONFile("repository/structure",$templateData['structure']);
				$stylesJSON = $this->readJSONFile("repository/styles",$templateData['styles']);
				
				$template = array("element" =>$object['template'] ,"template"=> array(
					"structure"=>json_decode($structureJSON), 
					"styles"=> json_decode($stylesJSON)));
				array_push($templates,$template);
			}
			if(isset($object['ids'])){
				// recursive call
				$subTemplates = $this->getTemplates($object['ids']);
				foreach ($subTemplates as $template) {					
					array_push($templates,$template);
				}				
			} 
		}
		return $templates;
	}
	
}

?>