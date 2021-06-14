<?php
/**
 * Edits -  create, update, modify and delete users details "KYC" details w.r.t POST parameters
 * 
 * @package Auction Web
 */
header("Access-Control-Allow-Origin: *");

// get posted input data
$decoded_data = json_decode(file_get_contents("php://input"), true );
if( !isset( $decoded_data['submit'] ) ) {
    $structure['status'] = false;
    $structure['message'] = 'Insufficient parameters';
    echo json_encode( $structure );
    return;
}

require_once '../functions.php';
if( is_db_connected() ) {
    $id           = isset( $decoded_data["userid"] ) ? $decoded_data["userid"] : '';
    $fullname     = isset( $decoded_data["fullname"] ) ? $decoded_data["fullname"] : 'Dummy';
    $email        = isset( $decoded_data["email"] ) ? $decoded_data["email"] : '';
    $profession   = isset( $decoded_data["profession"] ) ? $decoded_data["profession"] : '';
    $contact_number = isset( $decoded_data["contactNumber"] ) ? serialize( $decoded_data["contactNumber"] ) : '';
    $birth_date     = isset( $decoded_data["birthdate"] ) ? serialize($decoded_data["birthdate"]) : '';
    $current_address   = isset( $decoded_data["currentAddress"] ) ? serialize( $decoded_data["currentAddress"]) : '';
    $permanent_address   = isset( $decoded_data["permanentAddress"] ) ? serialize( $decoded_data["permanentAddress"]) : '';
    $document_type   = isset( $decoded_data["documentType"] ) ? $decoded_data["documentType"] : '';
    $document_image   = isset( $decoded_data["documentImage"] ) ? $decoded_data["documentImage"] : '';
    $document_image_one   = isset( $decoded_data["documentImageOne"] ) ? $decoded_data["documentImageOne"] : '';
    
    if( isset( $document_image['dataUrl'] ) ) {
      if( !empty($document_image['dataUrl']) ) {
        $image_parts = explode(";base64,", $document_image['dataUrl']);
        $image_base64 = base64_decode($image_parts[1]);
        $filedir = '../../uploads/users/' .$id. '/';
        if( !is_dir( $filedir ) ) {
          mkdir($filedir);
        }
        define( 'UPLOAD_DIR', $filedir );
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $file = UPLOAD_DIR . uniqid() . '.' .$image_type;
        file_put_contents( $file, $image_base64 );
        $document_image_path = $file;
      }
    } else {
      $document_image_path = '';
    }

    if( isset( $document_image_one['dataUrl'] ) ) {
      if( !empty($document_image_one['dataUrl']) ) {
        $image1_parts = explode(";base64,", $document_image_one['dataUrl']);
        $image1_base64 = base64_decode($image1_parts[1]);
        $filedir1 = '../../uploads/users/' .$id. '/';
        if( !is_dir( $filedir1 ) ) {
          mkdir($filedir1);
        }
        define( 'UPLOAD_DIR', $filedir1 );
        $image_type_aux1 = explode("image/", $image1_parts[0]);
        $image_type1 = $image_type_aux1[1];
        $file1 = UPLOAD_DIR . uniqid() . '.' .$image_type1;
        file_put_contents( $file1, $image1_base64 );
        $document_image_one_path = $file1;
      }
    } else {
      $document_image_one_path = '';
    }

    $users_sql = "INSERT INTO aw_user_details( user_id, birthdate, profession, contact_num, current_ad, permanent_ad, document_type, document_image_path, document_image_two_path ) VALUES( '" .$id. "', '" .$birth_date. "','" .$profession. "', '" .$contact_number. "', '" .$current_address. "', '" .$permanent_address. "', '" .$document_type. "', '" .$document_image_path. "', '" .$document_image_one_path. "' )";
    if ( $CONNECTION->query( $users_sql ) === TRUE ) {
        // update users status as under-verification
        $users_status_update_sql = 'UPDATE aw_users SET status = "under-verification" WHERE id = "' .$id. '"';
        $CONNECTION->query( $users_status_update_sql );
        $structure['status'] = true;
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