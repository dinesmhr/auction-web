<?php
/**
 * checks user's password
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';
if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['username'] ) ) {
        $username = $_GET['username'];
        $users_sql = 'SELECT * FROM aw_users WHERE username="'.$username.'"';
    } else if( isset( $_GET['email'] ) ) {
        $email = $_GET['email'];
        $users_sql = 'SELECT * FROM aw_users WHERE email="'.$email.'"';
    } else {
        $users_sql = 'SELECT * FROM aw_users WHERE 1';
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
            if( isset( $_GET['password'] ) ) :
                foreach( $users as $key => $user ) {
                    $pass_hash = $user['password'];
                    $users[$key]['password_status'] = password_verify( $_GET['password'], $pass_hash );
                }
            endif;
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