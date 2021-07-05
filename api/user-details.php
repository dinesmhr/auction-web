<?php
/**
 * Generated aw_users and aw-users_details joint list json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';

if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['id'] ) ) {
        $id = $_GET['id'];
        $users_sql = 'Select * FROM aw_users INNER JOIN aw_user_details WHERE aw_users.id = "' .$id. '" && aw_user_details.user_id = "' .$id. '"';
    } else {
        $users_sql = 'Select * FROM aw_users INNER JOIN aw_user_details WHERE aw_users.id = aw_user_details.user_id';
    }
    $datas = $CONNECTION->query( $users_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            if( $_GET['id'] ) {
                $users_sql = 'SELECT * FROM aw_users WHERE id="' .$id. '"';
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
                }
            } else {
                $structure['status'] = false;
                $structure['message'] = 'Empty table';
            }
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            $users = $datas->fetch_all(MYSQLI_ASSOC);
            foreach( $users as $key => $user ) {
                foreach( $user as $userKey => $userr ) {
                    if( @unserialize( $user[$userKey] ) ) {
                        $user[$userKey] = unserialize( $user[$userKey] );
                    }
                }
                $users[$key] = $user;
            }
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