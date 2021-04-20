<?php
/**
 * Generated products details list joining two table record "products" and "products details" json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';

if( is_db_connected() ) {
    if( isset( $_GET['id'] ) ) {
        $id = $_GET['id'];
        $user_status_sql = 'SELECT status from products WHERE id = "' .$id. '"';
        if( $CONNECTION->query( $user_status_sql ) ) {
            $user_status_datas = $CONNECTION->query( $user_status_sql );
            $user_status = $user_status_datas->fetch_all(MYSQLI_ASSOC);
            $user_status = $user_status[0]['status'];
        }
        $products_sql = 'SELECT * FROM aw_products WHERE id="' .$id. '"';
    } else {
        $products_sql = 'SELECT * FROM aw_products WHERE 1';
    }
    $datas = $CONNECTION->query( $products_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            $structure['status'] = false;
            $structure['message'] = 'Empty table';
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            $products = $datas->fetch_all(MYSQLI_ASSOC);
            if( isset( $_GET['id'] ) ) {
                $products[0]['images'] = unserialize( htmlspecialchars_decode( $products[0]['images'] ) );
            }
            $structure['data'] = $products;
        }
    } else {
        $structure['status'] = false;
        $structure['message'] = mysqli_error($CONNECTION);
    }
} else {
    $structure['status'] = false;
    $structure['message'] = 'error';
}
echo json_encode( $structure );