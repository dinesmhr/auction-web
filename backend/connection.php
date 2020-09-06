<?php
/**
 * MySQL database connection
 * 
 * @package Auction Web
 * @since 1.0.0
 */

class Connect_Database {
    /**
     * name of the Host server
     * 
     */
    protected $hostname = 'localhost';

    /**
     * name of the database
     * 
     */
    protected $database = 'auction-web';

    /**
     * name of the database username
     * 
     */
    protected $username = 'root';

    /**
     * value of the database password
     * 
     */
    protected $password = '';
    /**
     * Connection variable
     * 
     */
    public $connect;
    
    /**
     * Instance run
     * 
     */
    public function __construct() {
        $this->mysqli_connect();
    }

    /**
     * Get connection variable
     * 
     */
    public function mysqli_connect() {
        $connection = new mysqli( $this->hostname, $this->username, $this->password, $this->database );
        $this->connect = $connection;
    }

    /**
     * check the connectio status
     * 
     */
    function is_db_connected() {
        $connection = $this->connect;
        if( $connection->connect_errno ) {
            $status['status'] = false;
            $status['message'] = $connection->connect_error;
        } else {
            $status['status'] = true;
            $status['message'] = 'Connection established';
        }
        return $status;
    }
}