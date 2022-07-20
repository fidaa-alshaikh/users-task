<?php 

require('../api-cofig.php');

$sql = 'SELECT tbl_user.*, tbl_city.city_name, tbl_city.state_id, tbl_state.state_name, tbl_state.country_id, tbl_country.country_name 
From tbl_user
LEFT OUTER JOIN tbl_city ON tbl_city.city_id = tbl_user.city_id 
LEFT OUTER JOIN tbl_state ON tbl_state.state_id = tbl_city.state_id 
LEFT OUTER JOIN tbl_country ON tbl_country.country_id = tbl_state.country_id ORDER BY tbl_user.id DESC;';
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
