<?php

class Contact extends ContactList{
    private $fname;
    private $lname;
    private $email;
    private $contNum;

    public function __construct($fname, $lname, $email, $contNum){
        $this->fname = $fname;
        $this->lname = $lname;
        $this->email = $email;
        $this->contNum = $contNum;
    }

    public function addContact(){
        if(!$this->userExists($this->email)){
            return($this->insertContact($this->fname, $this->lname, $this->email, $this->contNum));
        }
    }

    public function getContacts(){
        return ($this->retrieveContacts());
    }

}
