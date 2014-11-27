<?php
class Form {
	// Form id (form_id)
	private $id;
	// Form creator
	private $creator;
	// Form dest list
	private $dest;
	// Form answers list
	private $ans;
	// Form status
	private $state;
	
	/*
		Constructor
	 */
	public function __construct() {
		switch(func_num_args()){
            case 0: // new Form();
                break;
            case 1: // new Form(id);
                $this->id = func_get_arg(0);

				$q = mysql_query("SELECT user_id, status FROM form WHERE form_id = " . $this->id);
				$line = mysql_fetch_array($q);
				$this->creator = new User($line["user_id"]);
				$this->state = $line["status"] == 1 ? TRUE : FALSE;

				$q = mysql_query("SELECT user_id FROM formdest WHERE form_id = " . $this->id);
				$this->dest = [];
				while($line = mysql_fetch_array($q)){
					$this->dest[] = new User($line["user_id"]);
				}

				$q = mysql_query("SELECT formans_id FROM formdest JOIN formans ON formdest.formdest_id = formans.formdest_id AND formdest.form_id = " . $this->id);
				$this->ans = [];
				while($line = mysql_fetch_array($q)){
					$this->ans[] = new Answer($line["formans_id"]);
				}
                break;
            default:
            	break;
        }
	}

	/*
		id
		Returns form's id
	 */
	public function getId(){
		return $this->id;
	}

	/*
		state
		Returns form's status
	 */
	public function getState(){
		return $this->state;
	}

	/*
		getCreator
		Returns form's creator
	 */
	public function getCreator(){
		return $this->creator;
	}

	/*
		getDest
		Returns form's dest list
	 */
	public function getDestinataire(){
		return $this->dest;
	}

	/*
		getAns
		Returns form's answers list
	 */
	public function getAnswer(){
		return $this->ans;
	}

	/*
		setCreator
		Sets form's creator
	 */
	public function setCreator($user){
		$this->creator = $user;
	}

	/*
		setDest
		Sets form's dest list
	 */
	public function setDestinataire($destList){
		$this->dest = $destList;
	}

	/*
		save
		TODO verif attr!=NULL
	 */
	public function save(){
		// Clean
		mysql_query("DELETE FROM formdest WHERE form_id = ".$this->id);
		// Insert dest
		foreach ($this->dest as $d){
			mysql_query("INSERT INTO formdest(form_id, user_id, status) VALUES (".$this->id.",".$d->id().", 0)") or die('SQL Error<br>'.mysql_error());
		}
	}

	/*
		send
	 */
	public function send(){
		save();
		$this->state = TRUE;
		// Update status
		mysql_query("UPDATE form SET status = 1 WHERE form_id = ".$this->id);
	}
}
?>
