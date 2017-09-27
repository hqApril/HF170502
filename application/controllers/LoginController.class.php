<?php
class LoginController extends Controller {
    private $_model;

    public function __construct() {
        require_once('./application/models/LoginModel.class.php');

        $this -> _model = new LoginModel();
    }

    public function toLoginView() {
        include_once('./application/views/login.html');
    }

    public function login() {
        session_start();

        $_POST = json_decode(file_get_contents('php://input'),true);
        $employeeId = $_POST['employeeId'];
        $employeePwd = $_POST['employeePwd'];
        $captcha = $_SESSION['loginCaptcha'];

        
    }
}
?>