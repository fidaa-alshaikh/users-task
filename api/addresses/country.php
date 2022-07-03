<?php 
require('../api-cofig.php');

//USE PATH
$method = $_SERVER['REQUEST_METHOD'];

$countryInfo = json_decode(file_get_contents("php://input"),true);
$name = $countryInfo['name'];
$id = $countryInfo['id'];

switch ($method) {
    case 'GET':
        $sql = 'SELECT * FROM tbl_country';
        $res = mysqli_query($conn, $sql);

    if ($res) {

    $count = mysqli_num_rows($res);
    if($count > 0) {

        $countries = mysqli_fetch_all($res, MYSQLI_ASSOC);
        $response = ['status' => true, 'countries' => $countries];

    }else{
        $response = ['status' => false, 'message' => 'No countries were found.'];
        }
    }else{
        $response = ['status' => false, 'message' => 'Request failed.'];
    }
        echo json_encode($response);
        break;
    case 'POST':

        $sql = "INSERT INTO tbl_country (name) VALUES ('$name')";
        $res = mysqli_query($conn, $sql);

        if ($res) {
        $response = ['status' => true, 'message' => 'Country added successfully.'];
        } else {
        $response = ['status' => false, 'message' => 'Failed to add country.'];
        }
        echo json_encode($response);
        
        break;

    case 'PUT':

        $sql =  "UPDATE tbl_country SET name='$name' WHERE id='$id'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
          $response = ['status' => true, 'message' => 'Country updated successfully.'];
        } else {
          $response = ['status' => false, 'message' => 'Failed to update country.'];
        }
            echo json_encode($response);


        
        break;
    case 'DELETE':

        $sql =  "DELETE FROM tbl_country WHERE id='$id'";
        $res = mysqli_query($conn, $sql);

        if ($res) {
         $response = ['status' => true, 'message' => 'Country deleted successfully.'];
        } else {
         $response = ['status' => false, 'message' => 'Failed to delete country.'];
        }
         echo json_encode($response);

        break;
    }

