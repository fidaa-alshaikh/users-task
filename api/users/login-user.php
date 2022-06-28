<?php 
require('../api-cofig.php');
require "../vendor/autoload.php";
use \Firebase\JWT\JWT;

$userInfo = json_decode(file_get_contents("php://input"),true); 

$email = strtolower($userInfo['email']);
$password = md5($userInfo['password']);

$sql = "SELECT * FROM tbl_user WHERE email = '$email' AND password = '$password'";

$res = mysqli_query($conn, $sql) or die(mysqli_error($conn, $sql));

if ($res) {

    $count = mysqli_num_rows($res);
    
    if($count == 1) {
        $user = mysqli_fetch_assoc($res);
        $iss = 'localhost'; // issuer name
        $iat = time(); // issuer time // current time
        $nbf = $iat ; // not before // after 10 sec
        $exp = time() + 10; // expired
        $aud = 'users'; // audience 
        $user_data = array(
            'id' => $user['id'],
            'full_name' => $user['full_name'],
            'email' => $user['email'],
            // 'gender' => $user['gender'],
            // 'city' => $user['city'],
            // 'country' => $user['country'],
        );
       
        $payload = array(
            'iss' => $iss,
            'iat' => $iat,
            'nbf' => $nbf,
            'exp' => $exp,
            'aud' => $aud,
            'data' => $user_data)
        ;
        $secret_key = 'FIDAA';
        $jwt = JWT::encode($payload, $secret_key, 'HS256');
        $response = ['status' => true, 'message' => "Login successfully",
        'access_token' => $jwt];
        echo json_encode($response);


    }else{
        $response = ['status' => false, 'message' => 'Login failed'];
        echo json_encode($response);
        }
}else{
        $response = ['status' => false, 'message' => 'Request failed.'];
        echo json_encode($response);
}
