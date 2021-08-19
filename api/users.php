<?php
/**
 * Generated users list json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';

if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['id'] ) ) {
        $id = $_GET['id'];
        $users_sql = 'SELECT * FROM aw_users WHERE ID="'.$id.'" && status != "draft"';
    } else if( isset( $_GET['username'] ) ) {
        $username = $_GET['username'];
        $users_sql = 'SELECT * FROM aw_users WHERE username="'.$username.'" && status != "draft"';
    } else if( isset( $_GET['email'] ) ) {
        $email = $_GET['email'];
        $users_sql = 'SELECT * FROM aw_users WHERE email="'.$email.'" && status != "draft"';
    } else {
        $users_sql = 'SELECT * FROM aw_users WHERE status != "draft"';
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
        $structure['message'] = mysqli_error( $CONNECTION );
    }
} else {
    $structure['status'] = false;
    $structure['message'] = 'error';
}
echo json_encode( $structure );