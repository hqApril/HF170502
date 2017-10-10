<?php
    //登录模型类
    class LoginModel extends Model {
        private $_link;

        public function __construct() {
            parent::__construct();
            $this -> _link = Database::getInstance($this -> _config);
        }

        //登录验证
        public function loginValidation($id, $pwd) {
            $query = "select * from employee where employee_id = '{$id}' and employee_pwd = md5('{$pwd}')";

            $res = $this -> _link -> select($query);

            return $res;
        }
    }
?>