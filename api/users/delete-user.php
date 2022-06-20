<?php

require('../api-cofig.php');
$inputs = json_decode(file_get_contents("php://input"),true);
$id = $inputs["id"];
$sql =  "DELETE FROM tbl_user WHERE id='$id'";
$res = mysqli_query($conn, $sql);

if ($res) {
  $response = ['status' => true, 'message' => 'Record deleted successfully.'];
} else {
  $response = ['status' => false, 'message' => 'Failed to delete record.'];
}
    echo json_encode($response);

?>