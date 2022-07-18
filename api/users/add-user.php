<?php
require('../api-cofig.php');

$userInfo = json_decode(file_get_contents("php://input"),true); // convert JSON to associative array


if (isset($userInfo['email']) && isset($userInfo['full_name']) &&  isset($userInfo['password']) 
&& !empty($userInfo['email']) && !empty($userInfo['full_name']) && !empty($userInfo['password']))

{
// 1. Get data from form
$full_name = $userInfo['full_name'];
$email = strtolower($userInfo['email']);
$password = md5($userInfo['password']); // encrypted password

// Check if email exists
$sql_1 = "SELECT email FROM tbl_user WHERE email = '$email'";
$res_1 = mysqli_query($conn, $sql_1);

if(mysqli_num_rows($res_1)) {

  $response = ['status' => false, 'message' => 'This email address is already used!'];
  echo json_encode($response);
}
else
{
//2. SQL query to save data into database
      $imageUrl = $userInfo['imageUrl'];
      $DIR = "./images/";
      if(isset($imageUrl)){
        $file_chunks = explode(";base64,", $imageUrl);
        $base64Img = base64_decode($file_chunks[1]);
        if($base64Img != "")
       {
        $image_name = uniqid() . '.png';
        $file_path = $DIR . $image_name;
        file_put_contents($file_path, $base64Img); 
        }
      }
      else
      {
        $image_name = null;
      }
      $gender = $userInfo["gender"];
      $city_id = $userInfo["city_id"];
      $street = $userInfo["street"];

$gender? $gender= "'".$gender."'" : $gender = 'NULL';
$street? $street= "'".$street."'" : $street = 'NULL';
$image_name? $image_name= "'".$image_name."'" : $image_name = 'NULL';
$sql_2 = "INSERT INTO tbl_user SET full_name='$full_name', email='$email', password='$password', image_name = $image_name, gender  = $gender ,city_id = '$city_id' , street= $street";
// execute the query into database
$res = mysqli_query($conn, $sql_2) or die(mysqli_error($conn));


if ($res) {
  $response = ['status' => true, 'message' => 'Record created successfully.'];
} else {
  $response = ['status' => false, 'message' => 'Failed to create record.'];
}
    echo json_encode($response);
}


}
else
{
    $response = ['status' => false, 'message' => 'Failed to create record.'];
    echo json_encode($response); // convert associative array to json
}
