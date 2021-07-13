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
            $categories = $datas->fetch_all(MYSQLI_ASSOC);
            foreach( $categories as $key => $category ) {
                foreach( $category as $catKey => $cat ) {
                    if( @unserialize( $category[$catKey] ) ) {
                        $category[$catKey] = unserialize( $category[$catKey] );
                    }
                }
                $categories[$key] = $category;
            }
            $structure['data'] = $categories;
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