<?php

class ContactList extends Dbh{
    private function userExists($email){
        $stmt = $this->connect()->prepare('SELECT * FROM `contacts` WHERE email = "'.$email.'"');
        if(!$stmt->execute()){
            $stmt = NULL;
            exit();
        }

        if($stmt->rowCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    private function retrieveContacts(){
        $stmt = $this->connect()->prepare('SELECT * FROM contacts');
        if(!$stmt->execute()){
            $stmt = NULL;
            return false;
        }

        //return arr (probably in jquery)
    }

    public function insertContact($fname, $lname, $email, $contNum){
        if($this->userExists($email)){
            return false;
        }
        return true;
        $stmt = $this->connect()->prepare('INSERT INTO contacts (lname, fname, email, contNum) VALUES (?,?,?,?);');
        if(!$stmt->execute(array($lname, $fname, $email, $contNum))){
            $stmt = NULL;
            return false;
        }
        return true;
    }

    public function updateContact(){

    }

    public function deleteContact(){

    }
}