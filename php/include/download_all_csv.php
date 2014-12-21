<?php
if (isset ( $_GET ["ans_id"] )) {
	include_once ('includes.php');
	$answer = new Answer($_GET ["ans_id"]);
	$recipient = $answer->getRecipient();
	$idform = $answer->getFormId();
	$form = new Form($idform);
	$ans = $form->getListRecipient ( [ ], 1 );
	
	// $outputCsv : Variable qui va contenir les données CSV
	$outputCsv = '';
	
	// Entéte de notre fichier
	$outputCsv .= "Exemple Simple d'exportation des donnees en CSV";
	
	// des espaces pour separer l'entete du contenu
	$outputCsv .= "\n\n\n";
	
	// $fileName : c'est le nom du fichier .csv (Form_AnswerID_Answers_date_et_heure_actuel.csv
	$fileName = "Form_" . $_GET["ans_id"] . "Answers";
	$fileName .= date ( 'Y-m-d_H:i:s' );
	$fileName .= ".csv";
	
	// Ajouter dans la variable $outputCsv les noms des colonnes
	$outputCsv .= "No formulaire; Destinataire; Status; Answers value";
	$outputCsv .= "\n";
	
	// ici on parcour le resultat de $ans
	// trim — Supprime les espaces (ou d'autres caractères ex : ";") en début et fin de chaîne 
	foreach ( $ans as $key => $value ) {
			$outputCsv .= trim($value["Answer"]->getFormId()) . ';';
			$outputCsv .= trim($value["User"]->getName()) . ';';
			$outputCsv .= trim($value["Status"]) . ';';
			foreach ( $value["Answer"]->getAnswers() as $k => $v ) {
				$outputCsv .= trim($v["value"]) . ';';
			}
			$outputCsv = rtrim($outputCsv, ';');
			$outputCsv .= "\n";
	}
	// Entêtes (headers) PHP qui vont bien pour la création d'un fichier Excel CSV
	header ( "Content-disposition: attachment; filename=" . $fileName );
	header ( "Content-Type: application/force-download" );
	header ( "Content-Transfer-Encoding: application/vnd.ms-excel\n" );
	header ( "Pragma: no-cache" );
	header ( "Cache-Control: must-revalidate, post-check=0, pre-check=0, public" );
	header ( "Expires: 0" );
	
	// ecriture du contenu de la variable $outputCsv dans le fchier $fileName
	echo $outputCsv;
	exit ();
}
?>