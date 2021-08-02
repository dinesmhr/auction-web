<?php
/**
 * Generated feedbacks list json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';

if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['count'] ) ) {
        $count = $_GET['count'];
        $feedbacks_sql = 'SELECT * FROM aw_feedbacks LIMIT ' . $count;
    } else {
        $feedbacks_sql = 'SELECT * FROM aw_feedbacks WHERE 1';
    }
    $datas = $CONNECTION->query( $feedbacks_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            $structure['status'] = false;
            $structure['message'] = 'Empty table';
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            $feedbacks = $datas->fetch_all(MYSQLI_ASSOC);
            $structure['data'] = $feedbacks;
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