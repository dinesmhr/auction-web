<?php
/**
 * Edits -  update category w.r.t GET parameters
 * 
 * @package Auction Web
 */
header("Access-Control-Allow-Origin: *");

// get posted input data
$decoded_data = json_decode(file_get_contents("php://input"), true );
if( !isset( $decoded_data["submit"] ) ) {
    $structure['status'] = false;
    $structure['message'] = 'Insufficient parameters';
    echo json_encode( $structure );
    return;
}

require_once '../functions.php';
if( is_db_connected() ) {
  $title    = isset( $decoded_data["title"] ) ? $decoded_data["title"] : '';
  $description  = isset( $decoded_data["description"] ) ? $decoded_data["description"] : '';
  $image         = isset( $decoded_data["image"] ) ? $decoded_data["image"] : '';

    if( isset( $image['dataUrl'] ) ) {
      if( !empty($image['dataUrl']) ) {
        $image_parts = explode(";base64,", $image['dataUrl']);
        if(isset($image_parts[1])) {
            $image_base64 = base64_decode($image_parts[1]);
            $filedir = '../../uploads/categories/';
            if( !is_dir( $filedir ) ) {
            mkdir($filedir);
            }
            if( !defined('UPLOAD_DIR') ) {
            define( 'UPLOAD_DIR', $filedir );
            }
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $file = UPLOAD_DIR . uniqid() . '.' .$image_type;
            file_put_contents( $file, $image_base64 );
            $image_path[] = $file;
        } else {
            $image_path[] = $image['dataUrl'];
        }
      }
    } else {
      $image_path[] = '';
    }
  $category_sql = "UPDATE aw_categories SET title = '" .$title. "', description = '" .$description. "', image_path = '" .serialize($image_path). "'";
  if ( $CONNECTION->query( $category_sql ) === TRUE ) {
    $structure['status'] = true;
    $structure['message'] = 'Your category details update';
  } else {
    $structure['status'] = false;
    $structure['message'] = 'Error in creating new record';
  }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );