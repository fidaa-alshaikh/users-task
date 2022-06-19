<?php
// ADD TRY CATCH !!

header('Access-Control-Allow-Origin:*'); // Allow to uses 2 localhost 
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


define('LOCALHOST', 'localhost');
define('USERNAME', 'root');
define('PASSWORD', '');

define('DB_NAME', 'users-task');

$conn = mysqli_connect(LOCALHOST, USERNAME, PASSWORD, DB_NAME);
//$db_select = mysqli_select_db($conn, DB_NAME);

function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}

?>