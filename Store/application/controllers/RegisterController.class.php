<?php
    //注册控制器类
    class RegisterController extends Controller {
        private $_model;

        //构造函数
        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);

            $this -> _model = new RegisterModel();
        }

        //跳转到注册页面
        public function toRegisterView() {
            if (isset($_SESSION['userNow'])) {
                include_once('./application/views/main.html');
            } else {
                include_once('./application/views/register.html');
            }
        }

        //注册重名验证
        public function checkRegisterName() {
            $id = $_POST['id'];

            $res = $this -> _model -> checkRegisterName($id);

            if (count($res)) {
                echo 1;
            } else {
                echo 2;
            }
        }

        //用户注册
        public function register() {
            $id = $_POST['id'];
            $pwd = $_POST['pwd'];
            $mailbox = $_POST['mailbox'];

            $res = $this -> _model -> register($id, $pwd, $mailbox);

            echo $res;
        }
    }
?>