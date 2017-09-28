<?php
    class MainController extends Controller {
        private $_model;

        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            $this -> _model = new MainModel();
        }

        public function toMainView() {
            if (isset($_SESSION['loginNow'])) {
                include_once('./application/views/main.html');
            } else {
                echo '<script>alert("非法登录");window.location.href="./index.php";</script>';
            }
        }

        public function getInfo() {
            $id = $_SESSION['loginNow'];

            $res = $this -> _model -> getInfo($id);

            echo json_encode($res);
        }

        public function exitLogin() {
            unset($_SESSION['loginNow']);

            echo 1;
        }
    }
?>