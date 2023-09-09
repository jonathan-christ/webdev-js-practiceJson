<?php

class ContactList extends Dbh{
    protected function userExists($email, $id = -1){
        $stmt = $this->connect()->prepare('SELECT * FROM `contacts` WHERE email = ?');
        if(!$stmt->execute(array($email))){
            $stmt = NULL;
            exit();
        }

        
        if($stmt->rowCount() > 0){
            $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($id != -1 && $arr[0]["id"] == $id){
                return false;
            }
            return true;
        }else{
            return false;
        }
    }

    protected function retrieveContacts(){
        $stmt = $this->connect()->prepare('SELECT * FROM contacts ORDER BY lastName');
        if(!$stmt->execute()){
            $stmt = NULL;
            return array(
                'message' => 'error'
            );
        }
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        //return arr (probably in jquery)
    }

    protected function insertContact($fname, $lname, $email, $contNum){
        $stmt = $this->connect()->prepare('INSERT INTO contacts (lastName, firstName, email, contNum) VALUES (?,?,?,?);');
        if(!$stmt->execute(array($lname, $fname, $email, $contNum))){
            $stmt = NULL;
            return array(
                'message' => 'error'
            );
        }
        return array(
            'message' => 'success'
        );
    }

    protected function updateContact($lname, $fname, $email, $contNum, $id){
        $stmt = $this->connect()->prepare('UPDATE contacts SET lastName=?,firstName=?,email=?,contNum = ? WHERE id = ?;');
        if(!$stmt->execute(array($lname, $fname, $email, $contNum, $id))){
            $stmt = NULL;
            return array(
                'message' => 'error'
            );
        }

        return array(
            'message' => 'success'
        );
    }

    protected function deleteContact($id){
        $stmt = $this->connect()->prepare('DELETE FROM contacts WHERE id = ?');
        if(!$stmt->execute(array($id))){
            $stmt = NULL;
            return array(
                'message' => 'error'
            );
        }

        return array(
            'message' => 'success'
        );
    }
}
