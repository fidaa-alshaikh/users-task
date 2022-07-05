<?php 
require('../api-cofig.php');

//USE PATH
$method = $_SERVER['REQUEST_METHOD'];

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
        $countryInfo = json_decode(file_get_contents("php://input"),true);
        $country_name = $countryInfo['country_name'];

        $sql = "INSERT INTO tbl_country (country_name) VALUES ('$country_name')";
        $res = mysqli_query($conn, $sql);

        if ($res) {
        $response = ['status' => true, 'message' => 'Country added successfully.'];
        } else {
        $response = ['status' => false, 'message' => 'Failed to add country.'];
        }
        echo json_encode($response);
        
        break;

    case 'PUT':
        $countryInfo = json_decode(file_get_contents("php://input"),true);
        $country_name = $countryInfo['country_name'];
        $id = $countryInfo['id'];

        $sql =  "UPDATE tbl_country SET country_name='$country_name' WHERE id='$id'";
        $res = mysqli_query($conn, $sql);
        if ($res) {
          $response = ['status' => true, 'message' => 'Country updated successfully.'];
        } else {
          $response = ['status' => false, 'message' => 'Failed to update country.'];
        }
            echo json_encode($response);


        
        break;
    case 'DELETE':
        $countryInfo = json_decode(file_get_contents("php://input"),true);
        $id = $countryInfo['id'];

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

