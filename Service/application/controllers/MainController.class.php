<?php
    //主页面控制器类
    class MainController extends Controller {
        private $_model;

        //构造函数
        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            $this -> _model = new MainModel();
        }

        //跳转到主页面
        public function toMainView() {
            if (isset($_SESSION['serviceLogin'])) {
                include_once('./application/views/main.html');
            } else {
                include_once('./application/views/login.html');
            }
        }

        public function getServiceNow() {
            $serviceNow = $_SESSION['serviceLogin'];

            echo $serviceNow;
        }
    }
?>