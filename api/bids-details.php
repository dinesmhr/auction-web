<?php
/**
 * Generated aw_bids, aw_users and aw_products joint list json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';

if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['id'] ) ) {
        $id = $_GET['id'];
        $bids_sql = 'Select * FROM aw_bids INNER JOIN aw_users ON aw_bids.user_id = aw_users.id INNER JOIN aw_products ON aw_bids.product_id = aw_products.id WHERE aw_bids.bid_id = "' .$id. '" ';
    } else {
        $bids_sql = 'Select * FROM aw_bids INNER JOIN aw_users ON aw_bids.user_id = aw_users.id INNER JOIN aw_products ON aw_bids.product_id = aw_products.id';
    }
    $datas = $CONNECTION->query( $bids_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            $structure['status'] = false;
            $structure['message'] = 'Empty table';
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            $users = $datas->fetch_all(MYSQLI_ASSOC);
            foreach( $users as $key => $user ) {
                foreach( $user as $userKey => $userr ) {
                    if( @unserialize( $user[$userKey] ) ) {
                        $user[$userKey] = unserialize( $user[$userKey] );
                    }
                }
                $users[$key] = $user;
            }
            $structure['data'] = $users;
        }
    } else {
        $structure['status'] = false;
        $structure['message'] = mysqli_error( $CONNECTION );
    }
} else {
    $structure['status'] = false;
    $structure['message'] = 'error';
}
echo json_encode( $structure );