<?php
/**
 * Edits -  create, update, modify and delete users w.r.t GET parameters
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';
if( is_db_connected() ) {
    $fullname = $_POST['fullname'];
    $username = $_POST['username'];
    $email    = $_POST['email'];
    $password = $_POST['password'];
    $role     = isset( $_POST['role'] ) ? $_POST['role'] : 'subscriber';
    $status   = isset( $_POST['status'] ) ? $_POST['status'] : 'nnot-verified';
} else {
    $structure['status'] = false;
    $structure['message'] = 'error';
}
echo json_encode( $structure );