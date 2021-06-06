<?php
/**
 * Return all session data in the form of json
 * 
 */
header("Access-Control-Allow-Origin: *");
$_POST = json_decode( file_get_contents("php://input"), true );
return var_dump( $_POST );
//session_start();
//$_SESSION['auction_web_user'] = $_POST;

//return json_decode( $_SESSION );