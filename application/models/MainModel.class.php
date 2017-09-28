<?php
class MainModel extends Model {
    private $_link;

    public function __construct() {
        parent::__construct();
        $this -> _link = Database::getInstance($this -> _config);
    }

    public function getInfo($id) {
        $query = "select employee_name, role_name, employee_img from employee, role, employee_role where employee.employee_id = employee_role.employee_id and role.role_id = employee_role.role_id and employee.employee_id = '{$id}'";

        $res = $this -> _link -> select($query);

        return $res;
    }
}
?>