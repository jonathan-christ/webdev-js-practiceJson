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
        if($this->insertContact($this->fname, $this->lname, $this->email, $this->contNum)){
        }
    }

}