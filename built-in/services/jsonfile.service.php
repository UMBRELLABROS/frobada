<?php 

/**
 * Handle table access
 */
class JSONFile{
	private $repository;    // folder
	private $silent = false; // silent mode
   

    public function __construct($repository)
    {        
        $this->repository = $repository;	   
	}

	/** change the silent mode */
	public function setSilent($mode){
		$this->silent = $mode;
	}
	
	/**
	 * read a json file from a repository
	 */
	public function read($jsonfile){
		// load an parse the JSON file        
		$jsonFileContents = file_get_contents("$this->repository/$jsonfile.json");
		if(!$this->silent){
			echo( $jsonFileContents);  
		}
		else{
			return $jsonFileContents;
		}
	}

	/**
	 * write the json file
	 */
   	public function write($jsonfile, $content){
		$error = null;
		$file = "$this->repository/$jsonfile.json";							
		if(!file_put_contents($file, json_encode($content))){
			$error= "Error writing $file";
		}
		if(!$this->silent)
			echo(json_encode( array('error'=>$error)));   
	}

	/**
	 * append to the file
	 */
	public function append($jsonfile, $content){
		$error = null;
		$file = "$this->repository/$jsonfile.json";	
		$jsonFileContents = file_get_contents($file);
		$items = json_decode($jsonFileContents, true);  
		
		if(is_array($items)){
			array_push($items,$content);
			if(!file_put_contents($file, json_encode($items))){
				$error= "Error appending to  $file";
			}
		}
		else{
			$error= "No array found in $file";
		}	
		if(!$this->silent)						
			echo(json_encode( array('error'=>$error)));   
	}

	/**
	 * delete the file
	 */
	public function delete($jsonfile){
		$file = "$this->repository/$jsonfile.json";	
		$error = null;
		if (!unlink($file)) {
			$error= "Error deleting $file";
		} 
		if(!$this->silent)
			echo(json_encode( array('error'=>$error)));   
	}
}


?>