<?php
	if(isset($_GET["form_id"]) AND !isset($_GET["user_id"])){
		$user = new User($_SESSION["user_id"]);
		$form = new Form($_GET["form_id"]);
?>
<div class="panel panel-primary">
	<div class="panel-heading text-center text-capitalize"><strong>Personnes ayant soumis le formulaire <?php echo $_GET["form_id"] ?></strong></div>

	<table class="table table-hover"><!-- table-hover vs table-striped -->
		<thead>
			<tr>
				<th>Destinataires</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<?php
				</tr>
			<?php 
				//}
			?>
		</tbody>
	</table>
</div>
<?php
	}
?>