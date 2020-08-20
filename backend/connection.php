<?php
/**
 * MySQL database connection
 * 
 * @package Auction Web
 * @since 1.0.0
 */
$hostname = 'localhost';
$database = 'auction-web';
$username = 'root';
$password = '';

$mysqli = new mysqli( $hostname, $username, $password, $database );
if( $mysqli->connect_errno ) {
    echo 'Connection Error!! Cannot connect to the  database';
    exit;
} else {
    echo 'Connection established successfully!!';
}