<?php
require('../api-cofig.php');

$_POST = json_decode(file_get_contents("php://input"),true);

if (isset($_POST['email']) && isset($_POST['full_name']) &&  isset($_POST['password']) 
&& !empty($_POST['email']) && !empty($_POST['full_name']) && !empty($_POST['password']))

{
// 1. Get data from form
$full_name = $_POST['full_name'];
$email = $_POST['email'];
$password = md5($_POST['password']); // encrypted password

//2. SQL query to save data into database
$sql = "INSERT INTO tbl_user SET full_name='$full_name', email='$email', password='$password' ";
// execute the query into database
$res = mysqli_query($conn, $sql) or die(mysqli_error($conn));


if ($res) {
  // Create session variable display message
  // name the var of session (add)
  $response = ['status' => true, 'message' => 'Record created successfully.'];
} else {
  $response = ['status' => false, 'message' => 'Failed to create record.'];
}
    echo json_encode($response);
}
else
{
    $response = ['status' => false, 'message' => 'Failed to create record.'];
    echo json_encode($response);
}
