<?php
/**
 * Edits -  create, update, modify and delete users details "KYC" details w.r.t GET parameters
 * 
 * @package Auction Web
 */
header("Access-Control-Allow-Origin: *");
if( !isset( $_GET['submit'] ) ) {
    $structure['status'] = false;
    $structure['message'] = 'Insufficient parameters';
    echo json_encode( $structure );
    return;
}

require_once '../functions.php';
if( is_db_connected() ) {
    $id = isset( $_GET['id'] ) ? $_GET['id'] : '';
    $fullname = isset( $_GET['fullname'] ) ? $_GET['fullname'] : 'Dummy';
    $parent_name = isset( $_GET['parent_name'] ) ? $_GET['parent_name'] : '';
    $profession  = isset( $_GET['profession'] ) ? $_GET['profession'] : '';
    $contact_number = isset( $_GET['contact_number'] ) ? $_GET['contact_number'] : '';
    $birth_date     = isset( $_GET['birth_date'] ) ? $_GET['birth_date'] : '';
    $current_address   = isset( $_GET['current_address'] ) ? $_GET['current_address'] : '';
    $permanent_address   = isset( $_GET['permanent_address'] ) ? $_GET['permanent_address'] : '';
    $pphoto   = isset( $_GET['pphoto'] ) ? $_GET['pphoto'] : '';
    $document_type   = isset( $_GET['document_type'] ) ? $_GET['document_type'] : '';
    $document_image_one   = isset( $_GET['document_image_one'] ) ? $_GET['document_image_one'] : '';
    $document_image_two   = isset( $_GET['document_image_two'] ) ? $_GET['document_image_two'] : '';
    echo '<pre>';
      print_r( $_GET );
    echo '</pre>';
    $users_sql = 'INSERT INTO users_details( id, fullname, parent_name, profession, contact_number, birth_Date, current_address, permanent_address, pphoto, document_type, document_image_one, document_image_two ) VALUES( "' .$id. '", "' .$fullname. '", "' .$parent_name. '", "' .$profession. '", "' .$contact_number. '", "' .$birth_date. '", "' .$current_address. '", "' .$permanent_address. '". ' .$pphoto .', "' .$document_type. '", ' .$document_image_one. ', ' .$document_image_two .' )';
    if ( $CONNECTION->query( $users_sql ) === TRUE ) {
        // update users status as under-verification
        $users_status_update_sql = 'UPDATE users SET status = "under-verification" WHERE id = $id';
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