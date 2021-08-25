<?php
/**
 * Generated bids list json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';
if( is_db_connected() ) {
    if( isset( $_GET['user_id'] ) ) {
        $user_id = $_GET['user_id'];
        if( isset( $_GET['product_id'] ) ) {
            $product_id = $_GET['product_id'];
            $bids_sql = 'SELECT * FROM aw_bids WHERE user_id="'.$user_id.'" AND product_id ="' .$product_id. '" AND status != "draft" ORDER BY bid_date DESC';
        } else {
            $bids_sql = 'SELECT * FROM aw_bids WHERE user_id="'.$user_id.'" AND status != "draft" ORDER BY bid_date DESC';
        }
    } else if( isset($_GET['product_id']) ) {
        $product_id = $_GET['product_id'];
        if( isset( $_GET['return_type'] ) ) {
            if( $_GET['return_type'] === 'highest_bid' )
            $bids_sql = 'SELECT * FROM aw_bids WHERE bid_amount = ( SELECT MAX(bid_amount) FROM aw_bids WHERE product_id="'.$product_id.'" )';
        } else {
            $bids_sql = 'SELECT * FROM aw_bids WHERE product_id="'.$product_id.'" AND status != "draft" ORDER BY bid_date DESC';
        }
    } else {
        $bids_sql = 'SELECT * FROM aw_bids WHERE status != "draft" ORDER BY bid_date DESC';
    }
    $datas = $CONNECTION->query( $bids_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            $structure['status'] = false;
            $structure['message'] = 'Empty table';
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            $bids = $datas->fetch_all(MYSQLI_ASSOC);
            $structure['data'] = $bids;
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