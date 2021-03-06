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
            if (isset($_SESSION['loginNow'])) {
                include_once('./application/views/main.html');
            } else {
                include_once('./application/views/login.html');
            }
        }

        //登录各项验证
        public function login() {
            $employeeId = isset($_POST['employeeId']) ? $_POST['employeeId'] : '';
            $employeePwd = isset($_POST['employeePwd']) ? $_POST['employeePwd'] : '';
            $loginCaptcha = isset($_POST['loginCaptcha']) ? $_POST['loginCaptcha'] : '';
            $captcha = $_SESSION['loginCaptcha'];

            if (strtolower($loginCaptcha) != $captcha) {
                echo 0;
            } else {
                $res = $this -> _model -> loginValidation($employeeId, $employeePwd);

                if (count($res)) {
                    if ($res[0]['employee_status'] == '锁定') {
                        echo 1;
                    } else {
                        $_SESSION['loginNow'] = $employeeId;

                        echo 2;
                    }
                } else {
                    echo 3;
                }
            }
        }
    }
?>