<?php
/**
 * Generated users listings json file
 * 
 */
require_once 'functions.php';

if( is_db_connected() ) {
    extract( $GLOBALS );
    $users_sql = 'SELECT * FROM users WHERE 1';
    $datas = $CONNECTION->query( $users_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            var_dump( $datas );
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
        $structure['message'] = mysql_error();
    }
} else {
    $structure['status'] = false;
    $structure['message'] = 'error';
}

echo json_encode( $structure );