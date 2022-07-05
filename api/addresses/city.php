<?php 
require('../api-cofig.php');

//USE PATH
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $path = explode('/', $_SERVER['REQUEST_URI']);
      if(isset($path[5])){

        $state_id = $path[5];
        $sql = 'SELECT * FROM tbl_city WHERE state_id = ' . $state_id;
        $res = mysqli_query($conn, $sql);

    if ($res) {

    $count = mysqli_num_rows($res);
    if($count > 0) {

        $cities = mysqli_fetch_all($res, MYSQLI_ASSOC);
        $response = ['status' => true, 'cities' => $cities];
    }else{
        $response = ['status' => false, 'message' => 'No cities were found.'];
        }
    }else{
        $response = ['status' => false, 'message' => 'Request failed.'];
    }
        echo json_encode($response);
           }

        break;
    case 'POST':
        $cityInfo = json_decode(file_get_contents("php://input"),true);
        $city_name = $cityInfo['city_name'];
        $state_id = $cityInfo['state_id'];

        $sql = "INSERT INTO tbl_city (city_name, state_id) VALUES ('$city_name', '$state_id')";
        $res = mysqli_query($conn, $sql);

        if ($res) {
        $response = ['status' => true, 'message' => 'City added successfully.'];
        } else {
        $response = ['status' => false, 'message' => 'Failed to add city.'];
        }
        echo json_encode($response);
        
        break;

    case 'PUT':
        $cityInfo = json_decode(file_get_contents("php://input"),true);
        $city_name = $cityInfo['city_name'];
        $id = $cityInfo['id'];

        $sql =  "UPDATE tbl_city SET city_name='$city_name' WHERE id='$id'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
          $response = ['status' => true, 'message' => 'City updated successfully.'];
        } else {
          $response = ['status' => false, 'message' => 'Failed to update city.'];
        }
            echo json_encode($response);


        
        break;
    case 'DELETE':
        $cityInfo = json_decode(file_get_contents("php://input"),true);
        $id = $cityInfo['id'];

        $sql =  "DELETE FROM tbl_city WHERE id='$id'";
        $res = mysqli_query($conn, $sql);

        if ($res) {
         $response = ['status' => true, 'message' => 'City deleted successfully.'];
        } else {
         $response = ['status' => false, 'message' => 'Failed to delete city.'];
        }
         echo json_encode($response);

        break;
    }

