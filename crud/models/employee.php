<?php
 
class Employee {
 
    public $dbh;
 
    public function __construct($host,$user,$pass,$db)  {
    $this->dbh = new PDO("mysql:host=".$host.";dbname=".$db,$user,$pass);
    }
	
	public function getEmployees(){
    $sth = $this->dbh->prepare("SELECT * FROM employee");
    $sth->execute();
	return json_encode($sth->fetchAll());
	}
	
	public function addEmp($employee){
    $sth = $this->dbh->prepare("INSERT INTO employee(firstname, email, cellphone, city) VALUES (?, ?, ?, ?)");
    $sth->execute(array($employee->firstname, $employee->email, $employee->cellphone, $employee->city));
    return json_encode($this->dbh->lastInsertId());
	}
	
	public function delete($employee){
    $sth = $this->dbh->prepare("DELETE FROM employee WHERE id=?");
    $sth->execute(array($employee->id));
    return json_encode(1);
	}
	
	public function updateValue($employee){
    $sth = $this->dbh->prepare("UPDATE employee SET ". $employee->field ."=? WHERE id=?");
    $sth->execute(array($employee->newvalue, $employee->id));
    return json_encode(1);
	}

}