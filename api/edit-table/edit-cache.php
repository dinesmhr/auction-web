<?php
/**
 * Set all cookie data in the form of json
 * 
 */
$structure['status'] = false;
$structure['message'] = 'No data';
if( isset( $_GET['id'] ) ) {
    $id = $_GET['id'];
    if( isset($_GET['product_id']) ) {
        $product_id = $_GET['product_id'];
        if( isset( $_COOKIE['auction_web_' .$id] ) ) {
            $value = unserialize($_COOKIE['auction_web_' .$id]);
            if( !in_array( $product_id, $value ) ) {
                $value[] = $product_id;
            }
            $structure['data'] = $_COOKIE['auction_web_' .$id];
            $structure['status'] = true;
            $structure['message'] = 'Cookie set';
        } else {
            $value = [$product_id];
        }
        setcookie( 'auction_web_' .$id, serialize( $value ), time()+86400, '/', 'localhost' );
    } else {
        if( isset( $_COOKIE['auction_web_' .$id] ) ) {
            $structure['data'] = unserialize($_COOKIE['auction_web_' .$id]);
            $structure['status'] = true;
            $structure['message'] = 'Cookie found';
        }
    }
}

echo json_encode( $structure );