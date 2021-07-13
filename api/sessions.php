<?php
/**
 * Return all session data in the form of json
 * 
 */
session_start();

echo json_encode( $_SESSION['auction_web_session'] );