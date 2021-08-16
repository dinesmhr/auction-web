<?php
/**
 * Send bidder confirmation email to the bidder
 * 
 */
header("Access-Control-Allow-Origin: *");

// get posted input data
$decoded_data = json_decode(file_get_contents("php://input"), true );
$receiver_email = $decoded_data["email"];
$fullname       = $decoded_data["fullname"];
$sender_email   = $decoded_data["sender_email"];
$product_id     = $decoded_data["product_id"];

$subject = "AuctionWeb - Product Bid Confirmation";
$txt = 'Dear Bidder,
            Congratulations! You are the highest bidder. You can contact the seller or AuctionWeb to deliver the product.
            Product Link : http://localhost:3000/product/' .$product_id. '
            Seller Information can be found at the product page.
        Sincerely yours,
        AuctionWeb Team';
$headers = "From: auctionweb@auction.com" . "\r\n" . "CC: $sender_email";

if( mail( $receiver_email, $subject, $txt, $headers) ) {
    $structure['status'] = true;
    $structure['message'] = 'Email sent successfully!!';
} else {
    $structure['status'] = false;
    $structure['message'] = 'Error in email transfer';
};
echo json_encode( $structure );