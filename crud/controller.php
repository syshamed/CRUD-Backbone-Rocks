<?php
function __autoload($className){
    include_once('models/'.$className.'.php');
}
 
$employees=new Employee('localhost','root','','directory');
 
if(!isset($_POST['action'])) {
    print json_encode(0);
    return;
}
 
switch($_POST['action']) {
	
	case 'get_employees':
    print $employees->getEmployees();
	break;
	
	case 'add_employee':
    $employee = new stdClass;
    $employee = json_decode($_POST['employee']);
    print $employees->addEmp($employee);
	break;
	
	case 'delete_employee':
    $employee = new stdClass;
    $employee = json_decode($_POST['employee']);
    print $employees->delete($employee);
	break;
	
	case 'update_field_data':
    $employee = new stdClass;
    $employee = json_decode($_POST['employee']);
    print $employees->updateValue($employee);
break;
}
 
exit();