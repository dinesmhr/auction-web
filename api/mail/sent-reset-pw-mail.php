<?php
/**
 * Send password reset link email to the user
 * 
 */
header("Access-Control-Allow-Origin: *");

// get posted input data
$decoded_data = json_decode(file_get_contents("php://input"), true );
$receiver_email = $decoded_data["email"];
$username       = $decoded_data["username"];
$sender_email   = $decoded_data["sender_email"];

$to = "somebody@example.com";
$subject = "Auction Password Reset Confirmation";
$txt = 'Your pasword reset link for username = ' .$username. ' is given below: Click the link to reset password: <br/><a href="localhost:3000/reset-password.js/' .$username. '">localhost:3000/reset-password.js/' .$username. '</a>';
$headers = "From: auctionweb@auction.com" . "\r\n" . "CC: $sender_email";

if( mail( $receiver_email, $subject, $txt, $headers) ) {
    $structure['status'] = true;
    $structure['message'] = 'Email sent successfully!!';
} else {
    $structure['status'] = false;
    $structure['message'] = 'Error in email transfer';
};
echo json_encode( $structure );