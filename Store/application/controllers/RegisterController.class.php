<?php
class RegisterController extends Controller {
    private $_model;

    public function __construct() {
        session_start();
        $_POST = json_decode(file_get_contents('php://input'),true);
        //require_once('./application/models/LoginModel.class.php');

        $this -> _model = new RegisterModel();
    }

    public function toRegisterView() {
        if (isset($_SESSION['userNow'])) {
            include_once('./application/views/main.html');
        } else {
            include_once('./application/views/register.html');
        }
    }

    public function checkRegisterName() {
        $id = $_POST['id'];

        $res = $this -> _model -> checkRegisterName($id);

        if (count($res)) {
            echo 1;
        } else {
            echo 2;
        }
    }

    public function register() {
        $id = $_POST['id'];
        $pwd = $_POST['pwd'];
        $mailbox = $_POST['mailbox'];

        $res = $this -> _model -> register($id, $pwd, $mailbox);

        echo $res;
    }
}
?>