<?php
/**
 * Edits -  create, update, modify and delete users w.r.t GET parameters
 * 
 * @package Auction Web
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: multipart/form-data");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get posted input data
$decoded_data = json_decode(file_get_contents("php://input") );
$data = $decoded_data->params;
if( empty( $data->submit ) ) {
    $structure['status'] = false;
    $structure['message'] = 'Insufficient parameters';
    echo json_encode( $structure );
    return;
}

require_once '../functions.php';
if( is_db_connected() ) {
  $images = !empty( $data->images ) ? serialize( json_encode( $data->images ) ) : '';
  $name = !empty( $data->name ) ? $data->name : '';
  $slug = str_replace(' ', '-', strtolower($name));
  $status = 'under-verification';
  $description = !empty( $data->description ) ? $data->description : '';
  $specification  = !empty( $data->specification ) ? $data->specification : '';
  $initial_price = !empty( $data->initial_price ) ? $data->initial_price : '';
  $email     = !empty( $data->email ) ? $data->email : '';
  $contact_number   = !empty( $data->contact_number ) ? $data->contact_number : '';
  $seller_id   = !empty( $data->seller_id ) ? $data->seller_id : '';
  $category_ids   = !empty( $data->category_ids ) ? serialize( json_encode( $data->category_ids ) ) : '';
  $tags   = !empty( $data->tags ) ? $data->tags : '';
  $bid_deadline   = !empty( $data->bid_deadline ) ? $data->bid_deadline : '';
  $address   = !empty( $data->address ) ? $data->address : '';
  $product_sql = 'INSERT INTO products ( name, slug, images, description, specification, status, initial_price, email, contact_number, address, seller_id, category_ids, tags, bid_deadline ) VALUES( "' .$name. '", "' .$slug. '", "' .$images. '", "' .$description. '", "' .$specification. '", "' .$status. '", "' .$initial_price. '", "' .$email. '", "' .$contact_number. '", "' .$address. '", "' .$seller_id. '", "' .$category_ids. '", "' .$tags. '", "' .$bid_deadline. '" )';
  if( !$CONNECTION->query( $product_sql ) ) {
    var_dump( mysqli_error( $CONNECTION ) );
    return;
  }
  if ( $CONNECTION->query( $product_sql ) === TRUE ) {
    $structure['status'] = false;
    $structure['message'] = 'Your product form is submitted. Your product is under verification!! Thank you for your patience';
  } else {
    $structure['status'] = false;
    $structure['message'] = 'Error in creating new record';
  }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );