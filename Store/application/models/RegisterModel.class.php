<?php
    //注册模型类
    class RegisterModel extends Model {
        private $_link;

        //构造函数
        public function __construct() {
            parent::__construct();
            $this -> _link = Database::getInstance($this -> _config);
        }

        //注册重名验证
        public function checkRegisterName($id) {
            $query = "select * from user where user_id = '{$id}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //用户注册
        public function register($id, $pwd, $mailbox) {
            $query = "insert into user (user_id, user_pwd, create_time, mailbox, balance, user_status) values ('{$id}', md5('{$pwd}'), now(), '{$mailbox}', 0, '使用')";

            $res = $this -> _link -> change($query);

            return $res;
        }
    }
?>