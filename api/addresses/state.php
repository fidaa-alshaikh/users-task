<?php 
require('../api-cofig.php');

//USE PATH
$method = $_SERVER['REQUEST_METHOD'];

$stateInfo = json_decode(file_get_contents("php://input"),true);
$name = $stateInfo['name'];
$id = $stateInfo['id'];
$country_id = $stateInfo['country_id'];


switch ($method) {
    case 'GET':
        $sql = 'SELECT * FROM tbl_state WHERE country_id = ' . $country_id; 
        $res = mysqli_query($conn, $sql);

    if ($res) {

    $count = mysqli_num_rows($res);
    if($count > 0) {

        $states = mysqli_fetch_all($res, MYSQLI_ASSOC);
        $response = ['status' => true, 'states' => $states];
    }else{
        $response = ['status' => false, 'message' => 'No states were found.'];
        }
    }else{
        $response = ['status' => false, 'message' => 'Request failed.'];
    }
        echo json_encode($response);

        break;
    case 'POST':

        $sql = "INSERT INTO tbl_state (name, country_id) VALUES ('$name', '$country_id')";
        $res = mysqli_query($conn, $sql);

        if ($res) {
        $response = ['status' => true, 'message' => 'State added successfully.'];
        } else {
        $response = ['status' => false, 'message' => 'Failed to add state.'];
        }
        echo json_encode($response);
        
        break;

    case 'PUT':

        $sql =  "UPDATE tbl_state SET name='$name' WHERE id='$id'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
          $response = ['status' => true, 'message' => 'State updated successfully.'];
        } else {
          $response = ['status' => false, 'message' => 'Failed to update state.'];
        }
            echo json_encode($response);


        
        break;
    case 'DELETE':

        $sql =  "DELETE FROM tbl_state WHERE id='$id'";
        $res = mysqli_query($conn, $sql);

        if ($res) {
         $response = ['status' => true, 'message' => 'State deleted successfully.'];
        } else {
         $response = ['status' => false, 'message' => 'Failed to delete state.'];
        }
         echo json_encode($response);

        break;
    }

