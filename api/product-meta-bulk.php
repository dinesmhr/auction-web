<?php
/**
 * Generated product meta json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';
if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['term_id'] ) ) {
        $term_id = $_GET['term_id'];
        $meta_key = isset($_GET['meta_key']) ? $_GET['meta_key'] : 'cat';
        $count = isset($_GET['count']) ? $_GET['count'] : 6;
        if( $_GET['product_id'] ) {
            $product_id = $_GET['product_id'];
            $product_meta_sql = 'SELECT * FROM aw_product_meta WHERE term_id IN(' .$term_id. ') AND meta_key = "' .$meta_key. '" AND product_id <> ' .$product_id. ' GROUP BY product_id LIMIT ' .$count;
        } else {
            $product_meta_sql = 'SELECT * FROM aw_product_meta WHERE term_id IN(' .$term_id. ') AND meta_key = "' .$meta_key. '" LIMIT ' .$count;
        }
    } else {
        $product_meta_sql = 'SELECT * FROM aw_product_meta WHERE 1';
    }
    $datas = $CONNECTION->query( $product_meta_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            $structure['status'] = false;
            $structure['message'] = 'Empty table';
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            if( isset($_GET['count']) ) {
                $product_meta = $datas->fetch_all();
            } else {
                $product_meta = $datas->fetch_all(MYSQLI_ASSOC);
            }
            $structure['data'] = $product_meta;
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