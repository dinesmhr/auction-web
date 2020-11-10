<?php
/**
 * Edits -  create, update, modify and delete users w.r.t GET parameters
 * 
 * @package Auction Web
 */
header("Access-Control-Allow-Origin: *");
if( !isset( $_GET['submit'] ) ) {
    $structure['status'] = false;
    $structure['message'] = 'Insufficient parameters';
    echo json_encode( $structure );
    return;
}

require_once 'functions.php';
if( is_db_connected() ) {
    $fullname = isset( $_GET['fullname'] ) ? $_GET['fullname'] : 'Dummy';
    $username = isset( $_GET['username'] ) ? $_GET['username'] : 'dummy';
    $email    = isset( $_GET['email'] ) ? $_GET['email'] : 'dummy@gmail.com';
    $password = isset( $_GET['password'] ) ? $_GET['password'] : 'dummy';
    $role     = isset( $_GET['role'] ) ? $_GET['role'] : 'subscriber';
    $status   = isset( $_GET['status'] ) ? $_GET['status'] : 'not-verified';
    $users_sql = 'INSERT INTO users ( fullname, username, email, password, role, status ) VALUES( $fullname, $username, $email, $password, $role, $status )';
    if ( $CONNECTION->query( $users_sql ) === TRUE ) {
        $structure['status'] = false;
        $structure['message'] = 'New record created successfully';
      } else {
        $structure['status'] = false;
        $structure['message'] = 'Error in creating new record';
      }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );