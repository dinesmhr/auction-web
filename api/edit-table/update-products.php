<?php
/**
 * Edits -  create, update, modify and delete users w.r.t GET parameters
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
  extract( $GLOBALS );
  $id       = isset( $decoded_data["id"] ) ? $decoded_data["id"] : '';
  $title    = isset( $decoded_data["title"] ) ? $decoded_data["title"] : '';
  $description  = isset( $decoded_data["description"] ) ? $decoded_data["description"] : '';
  $specifications = isset( $decoded_data["specifications"] ) ? serialize( $decoded_data["specifications"] ) : '';
  $details  = isset( $decoded_data["details"] ) ? htmlspecialchars($decoded_data["details"]) : '';
  $initialBid     = isset( $decoded_data["initialBid"] ) ? $decoded_data["initialBid"] : '';
  $maxBid         = isset( $decoded_data["maxBid"] ) ? $decoded_data["maxBid"] : '';
  $deadlineDate   = isset( $decoded_data["deadlineDate"] ) ? $decoded_data["deadlineDate"] : '';
  $images         = isset( $decoded_data["images"] ) ? $decoded_data["images"] : '';
  $tags = ( isset( $decoded_data["tags"] ) && !empty($decoded_data["tags"]) ) ? $decoded_data["tags"] : '';
  $categories = ( isset( $decoded_data["categories"] ) && !empty($decoded_data["categories"]) ) ? $decoded_data["categories"] : '';
  $status         = isset( $decoded_data["status"] ) ? $decoded_data["status"] : 'draft';

  function is_base64_encoded( $data ) {
    if (preg_match('%^[a-zA-Z0-9/+]*={0,2}$%', $data)) {
       return TRUE;
    } else {
       return FALSE;
    }
};

  foreach( $images as $image ) :
    if( isset( $image['dataUrl'] ) ) {
      if( !empty($image['dataUrl']) ) {
        $image_parts = explode(";base64,", $image['dataUrl']);
        if(isset($image_parts[1])) {
          $image_base64 = base64_decode($image_parts[1]);
          $filedir = '../../uploads/' .date("Y"). '/';
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
          $images_path[] = $file;
        } else {
          $images_path[] = $image['dataUrl'];
        }
      } else {
        $images_path[] = '';
      }
    } else {
      $images_path[] = '';
    }
  endforeach;
  $product_sql = "UPDATE aw_products SET title = '" .$title. "', description = '" .$description. "', specifications = '" .$specifications. "', details = '" .$details. "', initial_bid = '" .$initialBid. "', max_bid = '" .$maxBid. "', deadline_date = '" .$deadlineDate. "', images_path = '" .serialize($images_path). "', status = '" .$status. "' WHERE id = '" .$id. "'";
  if ( $CONNECTION->query( $product_sql ) === TRUE ) {
        // add new selected categories 
        if(!empty($decoded_data["categories"]["add"])) {
          foreach( $decoded_data["categories"]["add"] as $add ) {
            $add_sql = "INSERT INTO aw_product_meta( term_id, product_id, meta_key ) VALUES( $add, $id, 'cat' )";
            $CONNECTION->query( $add_sql );
          }
        }

        // delete old unselect categories
        if(!empty($decoded_data["categories"]["delete"])) {
          foreach( $decoded_data["categories"]["delete"] as $del ) {
            $del_sql = "DELETE FROM aw_product_meta WHERE term_id = $del AND product_id = $id AND meta_key = 'cat'";
            $CONNECTION->query( $del_sql );
          }
        }

        // add new selected tags
        if(!empty($decoded_data["tags"]["add"])) {
          foreach( $decoded_data["tags"]["add"] as $add ) {
            $add_sql = "INSERT INTO aw_product_meta( term_id, product_id, meta_key ) VALUES( $add, $id, 'tag' )";
            $CONNECTION->query( $add_sql );
          }
        }

        // delete old unselect tags
        if(!empty($decoded_data["tags"]["delete"])) {
          foreach( $decoded_data["tags"]["delete"] as $del ) {
            $del_sql = "DELETE FROM aw_product_meta WHERE term_id = $del AND product_id = $id AND meta_key = 'tag'";
            $CONNECTION->query( $del_sql );
          }
        }

    $structure['status'] = true;
    $structure['message'] = 'Your product form is updated';
  } else {
    $structure['status'] = false;
    $structure['message'] = 'Error in creating new record';
  }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );