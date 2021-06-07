<?php
/**
 * Return all session data in the form of json
 * 
 */
header("Access-Control-Allow-Origin: *");
$_POST = json_decode( file_get_contents("php://input"), true );
if( $_POST['login'] === 'true' ) {
    $auction_web_session['login'] = true;
    $auction_web_session['userId'] = $_POST['userId'];
} else {
    $auction_web_session['login'] = false;
}
session_start();
$_SESSION['auction_web_session'] = $auction_web_session;
echo json_encode( $auction_web_session );