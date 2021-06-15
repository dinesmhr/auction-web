<?php
/**
 * Generated products categories list json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';

if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['id'] ) ) {
        $id = $_GET['id'];
        $product_categories_sql = 'SELECT * FROM aw_categories WHERE id="'.$id.'"';
    } else {
        $product_categories_sql = 'SELECT * FROM aw_categories WHERE 1';
    }
    $datas = $CONNECTION->query( $product_categories_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            $structure['status'] = false;
            $structure['message'] = 'Empty table';
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            $products = $datas->fetch_all(MYSQLI_ASSOC);
            $structure['data'] = $products;
        }
    } else {
        $structure['status'] = false;
        $structure['message'] = mysql_error();
    }
} else {
    $structure['status'] = false;
    $structure['message'] = 'error';
}
echo json_encode( $structure );