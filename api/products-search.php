<?php
/**
 * Generated products list with condition that matched the paramter search_key json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';
if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['products'] ) ) {
        $search_key = $_GET['search_key'];
        $products_search_sql = 'SELECT * FROM aw_products WHERE title LIKE "%'.$search_key.'%"';
    } else {
        $products_search_sql = 'SELECT * FROM aw_products WHERE 1';
    }
    $datas = $CONNECTION->query( $products_search_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            $structure['status'] = false;
            $structure['message'] = 'Empty table';
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            $products = $datas->fetch_all(MYSQLI_ASSOC);
            foreach( $products as $key => $product ) {
                foreach( $product as $prodKey => $prod ) {
                    if( @unserialize( $product[$prodKey] ) ) {
                        $product[$prodKey] = unserialize( $product[$prodKey] );
                    }
                }
                $products[$key] = $product;
            }
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