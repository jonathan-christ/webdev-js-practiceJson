<?php

class ContactList extends Dbh{
    protected function userExists($email){
        $stmt = $this->connect()->prepare('SELECT * FROM `contacts` WHERE email = ?');
        if(!$stmt->execute(array($email))){
            $stmt = NULL;
            exit();
        }

        if($stmt->rowCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    protected function retrieveContacts(){
        $stmt = $this->connect()->prepare('SELECT * FROM contacts');
        if(!$stmt->execute()){
            $stmt = NULL;
            return false;
        }

        //return arr (probably in jquery)
    }

    protected function insertContact($fname, $lname, $email, $contNum){
        $stmt = $this->connect()->prepare('INSERT INTO contacts (lastName, firstName, email, contNum) VALUES (?,?,?,?);');
        if(!$stmt->execute(array($lname, $fname, $email, $contNum))){
            $stmt = NULL;
            return false;
        }
        return true;
    }

    protected function updateContact(){

    }

    protected function deleteContact(){

    }
}
