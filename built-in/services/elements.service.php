<?php 
require_once ("services/tabledata.service.php");

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
		print_r($elementData);		
		// read line from templates table
		$templateData = $this->tableTemplate->read("id", $elementData['template'])['message'][0];
		print_r($templateData);
	}
}