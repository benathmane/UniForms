<?php
class form {

	public $formId;
	
	// Constructor 
	public function __construct($id) {
		$this->formId = $id;
	}

	// Returns all forms receivers
	public function getAllFormsReceivers() {
		return mysql_query("SELECT * FROM user JOIN formdest ON user.user_id = formdest.user_id");
	}
	
	// Returns all forms
	public static function getAllForms() {
		return mysql_query("SELECT * FROM form");
	}
	
	// $listDest must be a list of IDs of the receivers. Save all elements of listDest in the table form_dest.
	public function addDest($listDest = array()){
		mysql_query("DELETE FROM formdest WHERE form_id = ".$this->formId);
		foreach ($listDest as $destId){
			mysql_query("INSERT INTO formdest(form_id, user_id, status) VALUES (".$this->formId.",".$destId.", 0)") or die('SQL Error<br>'.mysql_error());
		}
	}
}
?>