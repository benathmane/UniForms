<?php
class DBSingleton {
	private static $instance;
	private function __construct() {
		self::$instance = mysql_connect ( 'localhost', 'root', 'root' ) or die ( "Impossible de se connecter au serveur - " . mysql_error () );
		mysql_select_db ( 'uniforms', self::$instance ) or die ( "Impossible de se connecter à la base " . mysql_error () );
	}
	public static function getInstance() {
		if (! isset ( self::$instance ) || self::$instance == null) {
			new DBSingleton ();
		}
		return self::$instance;
	}
}
?>