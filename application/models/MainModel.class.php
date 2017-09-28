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
        $query = "select * from employee_role, role_menu, menu where employee_role.role_id = role_menu.role_id and role_menu.menu_id = menu.menu_id and employee_role.employee_id = {$id}";

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

        $res = $this -> _link -> insert($query);

        return $res;
    }

    public function checkRole($id) {
        $query = "select * from employee_role where role_id = {$id}";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function deleteRole($id) {
        $query = "delete from role where role_id = {$id}";

        $res = $this -> _link -> delete($query);

        return $res;
    }

    public function checkRoleName($id, $name) {
        $query = "select * from role where role_id != {$id} and role_name = '{$name}'";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function changeRole($id, $name, $describe) {
        $query = "update role set role_name = '{$name}', role_describe = '$describe' where role_id = {$id}";

        $res = $this -> _link -> update($query);

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
}
?>