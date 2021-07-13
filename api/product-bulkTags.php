<?php
/**
 * Generated products tags list json file
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once 'functions.php';

if( is_db_connected() ) {
    extract( $GLOBALS );
    if( isset( $_GET['id'] ) ) {
        $id = $_GET['id'];
        $product_tags_sql = 'SELECT * FROM aw_tags WHERE id IN(' .$id. ')';
    } else {
        $product_tags_sql = 'SELECT * FROM aw_tags WHERE 1';
    }
    $datas = $CONNECTION->query( $product_tags_sql );
    if( $datas ) {
        if( $datas->num_rows == 0 ) {
            $structure['status'] = false;
            $structure['message'] = 'Empty table';
        } else {
            $structure['status'] = true;
            $structure['message'] = 'success';
            $tags = $datas->fetch_all(MYSQLI_ASSOC);
            foreach( $tags as $key => $tag ) {
                foreach( $tag as $tagKey => $ta ) {
                    if( @unserialize( $tag[$tagKey] ) ) {
                        $tag[$tagKey] = unserialize( $tag[$tagKey] );
                    }
                }
                $tags[$key] = $tag;
            }
            $structure['data'] = $tags;
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