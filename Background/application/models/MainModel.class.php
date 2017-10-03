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

    public function getMenu($id) {
        $query = "select * from employee_role, role_menu, menu where employee_role.role_id = role_menu.role_id and role_menu.menu_id = menu.menu_id and employee_role.employee_id = '{$id}'";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function getRole() {
        $query = "select * from role";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function getOneRole($name) {
        $query = "select * from role where role_name = '{$name}'";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function addRole($name, $describe) {
        $query = "insert into role values (null, '{$name}', '$describe')";

        $res = $this -> _link -> change($query);

        return $res;
    }

    public function checkRole($id) {
        $query = "select * from employee_role where role_id = {$id}";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function deleteRole($id) {
        $query = "delete from role where role_id = {$id}";

        $res = $this -> _link -> change($query);

        return $res;
    }

    public function checkRoleName($id, $name) {
        $query = "select * from role where role_id != {$id} and role_name = '{$name}'";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function changeRole($id, $name, $describe) {
        $query = "update role set role_name = '{$name}', role_describe = '$describe' where role_id = {$id}";

        $res = $this -> _link -> change($query);

        return $res;
    }

    public function getPower() {
        $query = "select * from menu";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function getRolePower($id) {
        $query = "select * from menu, role_menu where menu.menu_id = role_menu.menu_id and menu.menu_fid != 0 and role_menu.role_id = {$id}";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function deleteRolePower($id) {
        $query = "delete from role_menu where role_id = {$id}";

        $this -> _link -> change($query);
    }

    public function addRolePower($id, $menuId) {
        $query = "insert into role_menu values ({$id}, {$menuId})";

        $res = $this -> _link -> change($query);

        return $res;
    }

    public function getFRolePower($menuId) {
        $query = "select menu_fid from menu where menu_id = {$menuId}";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function getEmployee() {
        $query = "select employee.employee_id, employee.employee_name, role.role_name, employee.employee_status from employee, employee_role, role where employee.employee_id = employee_role.employee_id and employee_role.role_id = role.role_id";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function changeStatus($id, $status) {
        $query = "update employee set employee_status = '{$status}' where employee_id = '{$id}'";

        $this -> _link -> change($query);
    }

    public function deleteEmployee($id) {
        $query = "delete from employee_role where employee_id = '{$id}'";

        $res = $this -> _link -> change($query);

        if ($res) {
            $query = "delete from employee where employee_id = '{$id}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        return $res;
    }

    public function getOneEmployee($id) {
        $query = "select * from employee, employee_role where employee.employee_id = employee_role.employee_id and employee.employee_id = '{$id}'";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function changeEmployeeName($id, $name) {
        $query = "update employee set employee_name = '{$name}' where employee_id = '{$id}'";

        $res = $this -> _link -> change($query);

        return $res;
    }

    public function changeEmployeePwd($id, $pwd) {
        $query = "update employee set employee_pwd = md5('{$pwd}') where employee_id = '{$id}'";

        $res = $this -> _link -> change($query);

        return $res;
    }

    public function changeEmployeeRole($id, $roleId) {
        $query = "update employee_role set role_id = {$roleId} where employee_id = '{$id}'";

        $res = $this -> _link -> change($query);

        return $res;
    }

    public function checkEmployeeId($id) {
        $query = "select * from employee where employee_id = '{$id}'";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function addEmployee($id, $pwd, $name, $roleId) {
        $query = "insert into employee values ('{$id}', md5('{$pwd}'), '{$name}', '使用', './application/views/images/default_head_img.jpg')";

        $res = $this -> _link -> change($query);

        if ($res) {
            $query = "insert into employee_role values ('{$id}', {$roleId})";

            $res = $this -> _link -> change($query);

            return $res;
        }

        return $res;
    }

    public function addGood($goodName, $goodRest, $goodLimit, $goodSummary, $discountPrice, $originalPrice, $classifyId, $timeIntervalId, $postType) {
        $query = "insert into good values (null, '{$goodName}', '{$goodRest}', '{$goodLimit}', '{$goodSummary}', '{$discountPrice}', '{$originalPrice}', '{$classifyId}', '{$timeIntervalId}', '{$postType}', '".date('Y-m-d H:i:s', time())."')";

        $res = $this -> _link -> change($query);

        return $res;
    }
}
?>