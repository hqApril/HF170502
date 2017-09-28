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

        public function getMenu() {
            $id = $_SESSION['loginNow'];

            $res = $this -> _model -> getMenu($id);

            echo json_encode($res);
        }

        public function iframeHtml() {
            $u_name = $_GET['n'];

            $u_path = './application/views/'.$u_name.'.html';

            if (file_exists($u_path)) {
                include_once($u_path);
            }
        }

        public function getRole() {
            $res = $this -> _model -> getRole();

            echo json_encode($res);
        }

        public function addRole() {
            $name = $_POST['name'];
            $describe = $_POST['describe'];

            $res = $this -> _model -> getOneRole($name);

            if (count($res)) {
                echo 0;
            } else {
                $res = $this -> _model -> addRole($name, $describe);

                if ($res) {
                    echo 1;
                } else {
                    echo 2;
                }
            }
        }

        public function deleteRole() {
            $id = $_POST['id'];

            $res = $this -> _model -> checkRole($id);

            if (count($res)) {
                echo 0;
            } else {
                $res = $this -> _model -> deleteRole($id);

                if ($res) {
                    echo 1;
                } else {
                    echo 2;
                }
            }
        }

        public function changeRole() {
            $id = $_POST['id'];
            $name = $_POST['name'];
            $describe = $_POST['describe'];

            $res = $this -> _model -> checkRoleName($id, $name);

            if (count($res)) {
                echo 0;
            } else {
                $res = $this -> _model -> changeRole($id, $name, $describe);

                if ($res) {
                    echo 1;
                } else {
                    echo 2;
                }
            }
        }

        public function getPower() {
            $res = $this -> _model -> getPower();

            echo json_encode($res);
        }

        public function getRolePower() {
            $id = $_POST['id'];

            $res = $this -> _model -> getRolePower($id);

            echo json_encode($res);
        }
    }
?>