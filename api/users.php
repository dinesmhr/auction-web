<?php
/**
 * Generated users listings json file
 * 
 * @package Auction Web
 */
header("Access-Control-Allow-Origin: *");
require_once 'functions.php';

if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['username'] ) ) {
        $username = $_GET['username'];
        $users_sql = 'SELECT * FROM users WHERE username="'.$username.'"';
    } else {
        $users_sql = 'SELECT * FROM users WHERE 1';
    }
    $datas = $CONNECTION->query( $users_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            $structure['status'] = false;
            $structure['message'] = 'Empty table';
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            $users = $datas->fetch_all(MYSQLI_ASSOC);
            $structure['data'] = $users;
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