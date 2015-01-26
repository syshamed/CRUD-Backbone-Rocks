$(function() {
    $(document).on("click", "a#employee_list", function(){ getEmployeeList(this); });
	$(document).on("click", "a#create_employee_form", function(){ getCreateForm(this); });
    $(document).on("click", "button#add_employee", function(){ addEmployee(this); });
	$(document).on("click", "a.delete_confirm", function(){ deleteConfirmation(this); });
    $(document).on("click", "button.delete", function(){ deleteEmployee(this); });
	$(document).on("dblclick", "td.edit", function(){ makeEditable(this); });
    $(document).on("blur", "input#editbox", function(){ removeEditable(this) });
});

function removeEditable(element) {
 
    $('#indicator').show();
 
    var Employee = new Object();
    Employee.id = $('.current').attr('employee_id');
    Employee.field = $('.current').attr('field');
    Employee.newvalue = $(element).val();
 
    var employeeJson = JSON.stringify(Employee);
 
    $.post('controller.php',
    {
    action: 'update_field_data',
    employee: employeeJson
    },
    function(data, textStatus) {
    $('td.current').html($(element).val());
    $('.current').removeClass('current');
    $('#indicator').hide();
    },
    "json"
    );
}
 
function makeEditable(element) {
    $(element).html('<input id="editbox" size="'+  $(element).text().length +'" type="text" value="'+ $(element).text() +'">');
    $('#editbox').focus();
    $(element).addClass('current');
}

function deleteConfirmation(element) {
    $("#delete_confirm_modal").modal("show");
    $("#delete_confirm_modal input#employee_id").val($(element).attr('employee_id'));
}
 
function deleteEmployee(element) {
 
    var Employee = new Object();
    Employee.id = $("#delete_confirm_modal input#employee_id").val();
 
    var employeeJson = JSON.stringify(Employee);
 
    $.post('controller.php',
    {
    action: 'delete_employee',
    employee: employeeJson
    },
    function(data, textStatus) {
    getEmployeeList(element);
    $("#delete_confirm_modal").modal("hide");
    },
    "json"
    );
}

function addEmployee(element) {
 
    $('#indicator').show();
 
    var Employee = new Object();
    Employee.firstname = $('input#firstname').val();
    Employee.email = $('input#email').val();
    Employee.cellphone = $('input#cellphone').val();
    Employee.city = $('textarea#city').val();
 
    var employeeJson = JSON.stringify(Employee);
 
    $.post('controller.php',
        {
        action: 'add_employee',
        employee: employeeJson
		},
		function(data, textStatus) {
			getEmployeeList(element);
			$('#indicator').hide();
		},
		"json"
    );
}
 
function getCreateForm(element) {
    var form = '<div class="input-prepend">';
    form += '<span class="add-on"><i class="icon-user icon-black"></i> First Name</span>';
    form += '<input type="text" id="firstname" name="firstname" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';
 
    form += '<div class="input-prepend">';
    form += '<span class="add-on"><i class="icon-envelope icon-black"></i> Email</span>';
    form += '<input type="text" id="email" name="email" value="" class="input-xlarge" >';
    form += '</div><br/><br/>';
 
    form += '<div class="input-prepend">';
    form += '<span class="add-on"><i class="icon-headphones icon-black"></i> Mobile</span>';
    form += '<input type="text" id="cellphone" name="cellphone" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';
 
    form += '<div class="input-prepend">';
    form += '<span class="add-on add-on-area "><i class="icon-home icon-black"></i> City</span>';
    form += '<textarea row="5" id="city" name="city" class="input-xlarge"></textarea>';
    form += '</div><br/><br/>';
 
    form += '<div class="control-group">';
    form += '<div class="">';
    form += '<button type="button" id="add_employee" class="btn btn-primary"><i class="icon-ok icon-white"></i> Add Employee</buttonv';
    form += '</div>';
    form += '</div>';
 
    $('div#content').html(form);
}

function getEmployeeList(element) {
 
    $('#indicator').show();
 
    $.post('controller.php',
        {
            action: 'get_employees'
        },
        function(data, textStatus) {
        renderEmployeeList(data);
        $('#indicator').hide();
        },
        "json"
    );
}
 
function renderEmployeeList(jsonData) {
 
    var table = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">FirstName</th><th scope="col">Email</th><th scope="col">Mobile</th><th scope="col">City</th><th scope="col"></th></tr></thead><tbody>';
 
    $.each( jsonData, function( index, employee){
    table += '<tr>';
    table += '<td class="edit" field="firstname" employee_id="'+employee.id+'">'+employee.firstName+'</td>';
    table += '<td class="edit" field="email" employee_id="'+employee.id+'">'+employee.email+'</td>';
    table += '<td class="edit" field="cellphone" employee_id="'+employee.id+'">'+employee.cellPhone+'</td>';
    table += '<td class="edit" field="city" employee_id="'+employee.id+'">'+employee.city+'</td>';
    table += '<td><a href="javascript:void(0);" employee_id="'+employee.id+'" class="delete_confirm btn btn-danger"><i class="icon-remove icon-white"></i></a></td>';
    table += '</tr>';
    });
 
    table += '</tbody></table>';
 
    $('div#content').html(table);
}