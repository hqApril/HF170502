<?php
    //登录控制器类
    class LoginController extends Controller {
        private $_model;

        //构造函数
        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);

            $this -> _model = new LoginModel();
        }

        //跳转到登录页面
        public function toLoginView() {
            if (isset($_SESSION['serviceLogin'])) {
                include_once('./application/views/main.html');
            } else {
                include_once('./application/views/login.html');
            }
        }

        //登录各项验证
        public function login() {
            $serviceId = isset($_POST['serviceId']) ? $_POST['serviceId'] : '';
            $servicePwd = isset($_POST['servicePwd']) ? $_POST['servicePwd'] : '';
            $loginCaptcha = isset($_POST['loginCaptcha']) ? $_POST['loginCaptcha'] : '';
            $captcha = $_SESSION['serviceLoginCaptcha'];

            if (strtolower($loginCaptcha) != $captcha) {
                echo 0;
            } else {
                $res = $this -> _model -> loginValidation($serviceId, $servicePwd);

                if (count($res)) {
                    $_SESSION['serviceLogin'] = $serviceId;

                    echo 1;
                } else {
                    echo 2;
                }
            }
        }
    }
?>