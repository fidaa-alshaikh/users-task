<?php 
require('../api-cofig.php');

$inputs = json_decode(file_get_contents("php://input"),true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
      $id=$inputs['id'];
      $sql = 'SELECT id, full_name, email, city, gender, country FROM tbl_user WHERE id = '. $id;

      $res = mysqli_query($conn, $sql);

if ($res) {
    $user = mysqli_fetch_assoc($res);
    $response = ['status' => true, 'user' => $user];
  } else {
    $response = ['status' => false, 'user' => 'Failed.'];
  }
      echo json_encode($response);
      break;
    case 'PUT':
      $id = $inputs["id"];
      $full_name = $inputs["full_name"];
      $country = $inputs["country"];
      $gender = $inputs["gender"];
      $city = $inputs["city"];
      $sql =  "UPDATE tbl_user SET full_name='$full_name', gender='$gender',city='$city',country='$country'  WHERE id='$id'";
      $res = mysqli_query($conn, $sql);
      if ($res) {
        $response = ['status' => true, 'message' => 'Record updated successfully.'];
      } else {
        $response = ['status' => false, 'message' => 'Failed to update record.'];
      }
          echo json_encode($response);

      break;
}
?>