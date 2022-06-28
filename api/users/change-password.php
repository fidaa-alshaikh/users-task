<?php
require('../api-cofig.php');
$info = json_decode(file_get_contents("php://input"),true); 

$id = $info['id'];
$current_password = md5($info['currentPassword']);
$new_password = md5($info['newPassword']);

$sql = "SELECT * FROM tbl_user WHERE id = '$id' AND password = '$current_password'";

$res = mysqli_query($conn, $sql) or die(mysqli_error($conn, $sql));

if($res) { 

    $count = mysqli_num_rows($res);

    if($count == 1){

        $sql2 = "UPDATE tbl_user SET password = '$new_password' WHERE id = '$id'";

        $res2 = mysqli_query($conn, $sql2) or die(mysqli_error($conn, $sql2));
        if($res){
            $response = ['status' => true, 'message' => 'Password updated successfully'];
        }
        else{
            $response = ['status' => true, 'message' => 'Failed to update password'];
        }
        echo json_encode($response);


    }else{
       $response = ['status' => false, 'message' => 'incorrect password!'];
       echo json_encode($response);
    }
}else{
    $response = ['status' => false, 'message' => 'Failed to update password'];
    echo json_encode($response);
}
