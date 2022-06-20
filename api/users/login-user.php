<?php 
require('../api-cofig.php');

$userInfo = json_decode(file_get_contents("php://input"),true); 

$email = $userInfo['email'];
$password = md5($userInfo['password']);

$sql = "SELECT * FROM tbl_user WHERE email = '$email' AND password = '$password'";

$res = mysqli_query($conn, $sql) or die(mysqli_error($conn, $sql));

if ($res) {

    $count = mysqli_num_rows($res);
    if($count == 1) {
        $response = ['status' => true, 'message' => "Login successfully"];
        echo json_encode($response);


    }else{
        $response = ['status' => false, 'message' => 'Login failed'];
        echo json_encode($response);
        }
}else{
        $response = ['status' => false, 'message' => 'Request failed.'];
        echo json_encode($response);
}


?>