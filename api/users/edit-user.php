<?php 
require('../api-cofig.php');

//USE PATH
$method = $_SERVER['REQUEST_METHOD'];
// GET ONE USER
switch ($method) {
    case 'GET':
      $path = explode('/', $_SERVER['REQUEST_URI']);
      if(isset($path[5])){

        $id = $path[5];
        $sql = 'SELECT tbl_user.*, tbl_city.city_name, tbl_city.state_id, tbl_state.state_name, tbl_state.country_id, tbl_country.country_name 
        From tbl_user 
        LEFT OUTER JOIN tbl_city ON tbl_city.city_id=tbl_user.city_id 
        LEFT OUTER JOIN tbl_state ON tbl_state.state_id= tbl_city.state_id 
        LEFT OUTER JOIN tbl_country ON tbl_country.country_id= tbl_state.country_id
         WHERE tbl_user.id = '. $id;
  
        $res = mysqli_query($conn, $sql);
  
  if ($res) {
      $user = mysqli_fetch_assoc($res);
      $response = ['status' => true, 'user' => $user];
     
    } else {
      $response = ['status' => false, 'user' => 'Failed.'];
    }
        echo json_encode($response);

      }

      break;
  // EDIT ONE USER
    case 'PUT':
      $inputs = json_decode(file_get_contents("php://input"),true);
      $imageUrl = $inputs['imageUrl'];
      $DIR = "./images/";
      if(isset($imageUrl)){
       //check if image exists
       //$existingFile = explode("http://localhost/users-task/api/users/images/", $imageUrl);
       $existingFileName = substr($imageUrl, 45); // http://localhost/users-task/api/users/images/ is 45 characters long
        if (file_exists("./images/".$existingFileName)) {
          $image_name = $existingFileName;
        }
        else{
         
          $file_chunks = explode(";base64,", $imageUrl);
          $base64Img = base64_decode($file_chunks[1]);
          if($base64Img != "")
         {
          $image_name = uniqid() . '.png';
          $file_path = $DIR . $image_name;
          file_put_contents($file_path, $base64Img); 
          }
        }

      }
      else
      {
        $image_name = null;
      }
      $id = $inputs["id"];
      $full_name = $inputs["full_name"];
      $gender = $inputs["gender"];
      $city_id = $inputs["city_id"];
      $street = $inputs["street"];
      $gender? $gender= "'".$gender."'" : $gender = 'NULL';
      $street? $street= "'".$street."'" : $street = 'NULL';
      $image_name? $image_name= "'".$image_name."'" : $image_name = 'NULL';
      $sql =  "UPDATE tbl_user SET full_name = '$full_name', gender  = $gender , image_name = $image_name, city_id = '$city_id' , street= $street  WHERE id = '$id'";
      $res = mysqli_query($conn, $sql);
      if ($res) {
        $response = ['status' => true, 'message' => 'Record updated successfully.'];
      } else {
        $response = ['status' => false, 'message' => 'Failed to update record.'];
      }
         echo json_encode($response);

      break;
}

// USE Params

//$inputs = json_decode(file_get_contents("php://input"),true); // 

// $method = $_SERVER['REQUEST_METHOD'];
// switch ($method) {
//     case 'POST':
//       $id=$inputs['id'];
//       $sql = 'SELECT id, full_name, email, city, gender, country FROM tbl_user WHERE id = '. $id;

//       $res = mysqli_query($conn, $sql);

// if ($res) {
//     $user = mysqli_fetch_assoc($res);
//     $response = ['status' => true, 'user' => $user];
//   } else {
//     $response = ['status' => false, 'user' => 'Failed.'];
//   }
//       echo json_encode($response);
//       break;
//     case 'PUT':
//       $id = $inputs["id"];
//       $full_name = $inputs["full_name"];
//       $country = $inputs["country"];
//       $gender = $inputs["gender"];
//       $city = $inputs["city"];
//       $sql =  "UPDATE tbl_user SET full_name='$full_name', gender='$gender',city='$city',country='$country'  WHERE id='$id'";
//       $res = mysqli_query($conn, $sql);
//       if ($res) {
//         $response = ['status' => true, 'message' => 'Record updated successfully.'];
//       } else {
//         $response = ['status' => false, 'message' => 'Failed to update record.'];
//       }
//           echo json_encode($response);

//       break;
// }
?>