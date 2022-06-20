<?php
require('../api-cofig.php');

$userInfo = json_decode(file_get_contents("php://input"),true); // convert JSON to associative array

if (isset($userInfo['email']) && isset($userInfo['full_name']) &&  isset($userInfo['password']) 
&& !empty($userInfo['email']) && !empty($userInfo['full_name']) && !empty($userInfo['password']))

{
// 1. Get data from form
$full_name = $userInfo['full_name'];
$email = $userInfo['email'];
$password = md5($userInfo['password']); // encrypted password

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
    echo json_encode($response); // convert associative array to json
}
