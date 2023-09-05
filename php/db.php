<?php

public class Dbh{
    $servername = "localhost";
    $username = "";
    $password = "";
    $dbname = "contactlist";

    protected function connect(){
        try{
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password, $dbname);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected successfully";
            return $conn;
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }

            
        }
    }
}