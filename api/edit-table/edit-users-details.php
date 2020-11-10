<?php
/**
 * Edits -  create, update, modify and delete users w.r.t GET parameters
 * 
 * @package Auction Web
 */
header("Access-Control-Allow-Origin: *");
if( !isset( $_POST['submit'] ) ) {
    $structure['status'] = false;
    $structure['message'] = 'Insufficient parameters';
    echo json_encode( $structure );
    return;
}

require_once 'functions.php';
if( is_db_connected() ) {
    $fullname = isset( $_POST['fullname'] ) ? $_POST['fullname'] : 'Dummy';
    $username = isset( $_POST['username'] ) ? $_POST['username'] : 'dummy';
    $email    = isset( $_POST['email'] ) ? $_POST['email'] : 'dummy@gmail.com';
    $password = isset( $_POST['password'] ) ? $_POST['password'] : 'dummy';
    $role     = isset( $_POST['role'] ) ? $_POST['role'] : 'subscriber';
    $status   = isset( $_POST['status'] ) ? $_POST['status'] : 'not-verified';
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