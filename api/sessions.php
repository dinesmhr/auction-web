<?php
/**
 * Return all session data in the form of json
 * 
 */
session_start();
$_SESSION['username'] = 'Dinesh Maharjan';

var_dump( $_SESSION );