<?php

header('Access-Control-Allow-Origin:*'); // Allow to uses 2 localhost 

define('LOCALHOST', 'localhost');
define('USERNAME', 'root');
define('PASSWORD', '');

define('DB_NAME', 'users-tasks');

$conn = mysqli_connect(LOCALHOST, USERNAME, PASSWORD, DB_NAME);
//$db_select = mysqli_select_db($conn, DB_NAME);



?>