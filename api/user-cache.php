<?php
/**
 * Return all cookie data in the form of json
 * 
 */
$structure['status'] = false;
$structure['message'] = 'No data';
if( isset( $_GET['id'] ) ) {
    $id = $_GET['id'];
    var_dump( $_COOKIE );
    if( isset( $_COOKIE['auction_web_' .$id] ) ) {
        $structure['data'] = unserialize($_COOKIE['auction_web_' .$id]);
        $structure['status'] = true;
        $structure['message'] = 'Cookie found';
    }
}

echo json_encode( $structure );