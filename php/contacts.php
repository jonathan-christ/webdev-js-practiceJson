<?php

class Contact extends ContactList{
    private $fname;
    private $lname;
    private $email;
    private $contNum;
    private $id;

    public function __construct($fname, $lname, $email, $contNum, $id = -1){
        $this->fname = $fname;
        $this->lname = $lname;
        $this->email = $email;
        $this->contNum = $contNum;
        $this->id = $id;
    }

    public function addContact(){
        if(!$this->userExists($this->email)){
            return($this->insertContact($this->fname, $this->lname, $this->email, $this->contNum));
        } else{
            return array(
                "message" => "userExists"
            );
        }
    }

    public function editContact(){
        if(!$this->userExists($this->email, $this->id)){ 
            return($this->updateContact($this->lname, $this->fname, $this->email, $this->contNum, $this->id));
        } else{
            return array(
                "message" => "userExists"
            );
        }
    }

    public function removeContact(){
        if($this->userExists($this->email)){
            return($this->deleteContact($this->id));
        }else{
            return array(
                "message" => "failure",
                "email" => $this->email
            );
        }
    }

    public function getContacts(){
        return ($this->retrieveContacts());
    }

}
