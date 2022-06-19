<?php 
require('../api-cofig.php');
// $sql = 'SELECT id, full_name, email FROM tbl_user WHERE id = ';
$path = explode('/', $_SERVER['REQUEST_URI']);
debug_to_console($path);

?>
