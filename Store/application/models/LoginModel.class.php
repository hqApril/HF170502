<?php
    class LoginModel extends Model {
        private $_link;

        public function __construct() {
            parent::__construct();
            $this -> _link = Database::getInstance($this -> _config);
        }

        public function loginValidation($id, $pwd) {
            $query = "select * from user where user_id = '{$id}' and user_pwd = md5('{$pwd}')";

            $res = $this -> _link -> select($query);

            return $res;
        }
    }
?>