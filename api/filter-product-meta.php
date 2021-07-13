<?php
/**
 * Generated product meta json file filtering the parameter meta_key, count, order
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';
if( is_db_connected() ) {
    $count = isset( $_GET['count'] ) ? $_GET['count'] : 5;
    $meta_key = isset( $_GET['meta_key'] ) ? $_GET['meta_key'] : 'cat';
    $order = isset( $_GET['order'] ) ? $_GET['order'] : 'DESC';
    $product_meta_sql = "SELECT term_id, meta_key, COUNT(`term_id`) AS value_occurrence FROM `aw_product_meta` WHERE meta_key='" .$meta_key. "' GROUP BY `term_id` ORDER BY `value_occurrence` $order LIMIT $count";
    $datas = $CONNECTION->query( $product_meta_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            $structure['status'] = false;
            $structure['message'] = 'Empty table';
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            $product_meta = $datas->fetch_all(MYSQLI_ASSOC);
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