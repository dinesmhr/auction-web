<?php
/**
 * Edits -  create, update, modify and delete users details "KYC" details w.r.t POST parameters
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
    $id = !empty( $data->id ) ? $data->id : '';
    $fullname = !empty( $data->fullname ) ? $data->fullname : 'Dummy';
    $parent_name = !empty( $data->parent_name ) ? $data->parent_name : '';
    $profession  = !empty( $data->profession ) ? $data->profession : '';
    $contact_number = !empty( $data->contact_number ) ? $data->contact_number : '';
    $birth_date     = !empty( $data->birth_date ) ? $data->birth_date : '';
    $current_address   = !empty( $data->current_address ) ? $data->current_address : '';
    $permanent_address   = !empty( $data->permanent_address ) ? $data->permanent_address : '';
    $pphoto   = !empty( $data->pphoto ) ? $data->pphoto : '';
    $document_type   = !empty( $data->document_type ) ? $data->document_type : '';
    $document_image_one   = !empty( $data->document_image_one ) ? $data->document_image_one : '';
    $document_image_two   = !empty( $data->document_image_two ) ? $data->document_image_two : '';
    $users_sql = 'INSERT INTO users_details( id, fullname, parent_name, profession, contact_number, birth_Date, current_address, permanent_address, pphoto, document_type, document_image_one, document_image_two ) VALUES( "' .$id. '", "' .$fullname. '", "' .$parent_name. '", "' .$profession. '", "' .$contact_number. '", "' .$birth_date. '", "' .$current_address. '", "' .$permanent_address. '", "' .$pphoto .'", "' .$document_type. '", "' .$document_image_one. '", "' .$document_image_two .'" )';
    if ( $CONNECTION->query( $users_sql ) === TRUE ) {
        // update users status as under-verification
        $users_status_update_sql = 'UPDATE users SET status = "under-verification" WHERE id = "' .$id. '"';
        $CONNECTION->query( $users_status_update_sql );
        $structure['status'] = false;
        $structure['message'] = 'Your KYC form is submitted. Your account is under verification!! Thank you for your patience';
      } else {
        $structure['status'] = false;
        $structure['message'] = 'Error in creating new record';
      }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );