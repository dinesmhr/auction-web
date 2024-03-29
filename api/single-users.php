<?php
/**
 * Generated users details list joining two table record "users" and "users details" json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';

if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['id'] ) ) {
        $id = $_GET['id'];
        $user_status_sql = 'SELECT status from aw_users WHERE id = "' .$id. '"';
        if( $CONNECTION->query( $user_status_sql ) ) {
            $user_status_datas = $CONNECTION->query( $user_status_sql );
            $user_status = $user_status_datas->fetch_all(MYSQLI_ASSOC);
            $user_status = $user_status[0]['status'];
        }
        if( $user_status !== 'not-verified' ) {
            $users_sql = 'SELECT * FROM aw_users JOIN aw_users_details ON aw_users.id=aw_users_details.user_id WHERE aw_users.id="' .$id.'"';
        } else {
            $users_sql = 'SELECT * FROM aw_users WHERE id="' .$id. '"';    
        }
    } else if( isset( $_GET['username'] ) ) {
        $username = $_GET['username'];
        $user_status_sql = 'SELECT status from aw_users WHERE username = "' .$username. '"';
        if( $CONNECTION->query( $user_status_sql ) ) {
            $user_status_datas = $CONNECTION->query( $user_status_sql );
            $user_status = $user_status_datas->fetch_all(MYSQLI_ASSOC);
            $user_status = $user_status[0]['status'];
        }
        if( $user_status === 'not-verified' ) {
            $users_sql = 'SELECT * FROM aw_users JOIN aw_users_details ON users.username=users_details.username WHERE users.username="' .$username.'"';
        } else {
            $users_sql = 'SELECT * FROM aw_users WHERE username="' .$username. '"';    
        }
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
            $structure['data'] = $users;
        }
    } else {
        $structure['status'] = false;
        $structure['message'] = mysqli_error($CONNECTION);
    }
} else {
    $structure['status'] = false;
    $structure['message'] = 'error';
}
echo json_encode( $structure );