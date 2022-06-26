<?php 

require('../api-cofig.php');

$sql = 'SELECT id, full_name, email FROM tbl_user';
$res = mysqli_query($conn, $sql);

if ($res) {

    $count = mysqli_num_rows($res);
    if($count > 0) {

        $users = mysqli_fetch_all($res, MYSQLI_ASSOC);
        $response = ['status' => true, 'users' => $users];
        echo json_encode($response);


    }else{
        $response = ['status' => false, 'message' => 'No users were found.'];
        echo json_encode($response);
        }
}else{
        $response = ['status' => false, 'message' => 'Request failed.'];
        echo json_encode($response);
}
