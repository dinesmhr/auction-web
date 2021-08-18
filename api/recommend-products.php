<?php
/**
 * Generated recommended products list json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';
if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['userBirthDate'] ) ) {
        $userBirthDate = $_GET['userBirthDate'];
        $products_sql = 'SELECT * FROM aw_products ORDER BY submission_date DESC';
    } else {
        $products_sql = 'SELECT * FROM aw_products ORDER BY submission_date DESC';
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