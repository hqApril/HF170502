<?php
    //登录控制器类
    class LoginController extends Controller {
        private $_model;

        //构造函数
        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            require_once('./application/models/LoginModel.class.php');

            $this -> _model = new LoginModel();
        }

        //跳转到登录页面
        public function toLoginView() {
            if (isset($_SESSION['userLogin'])) {
                include_once('./application/views/main.html');
            } else {
                include_once('./application/views/login.html');
            }
        }

        //用户登录
        public function login() {
            $userId = isset($_POST['userId']) ? $_POST['userId'] : '';
            $userPwd = isset($_POST['userPwd']) ? $_POST['userPwd'] : '';
            $loginCaptcha = isset($_POST['loginCaptcha']) ? $_POST['loginCaptcha'] : '';
            $captcha = $_SESSION['userLoginCaptcha'];

            if (strtolower($loginCaptcha) != $captcha) {
                echo 0;
            } else {
                $res = $this -> _model -> loginValidation($userId, $userPwd);

                if (count($res)) {
                    $_SESSION['userLogin'] = $userId;

                    echo 1;
                } else {
                    echo 2;
                }
            }
        }
    }
?>