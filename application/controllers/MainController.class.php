<?php
    class MainController extends Controller {
        private $_model;

        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            require_once('./application/models/MainModel.class.php');

            //$this -> _model = new LoginModel();
        }

        public function toMainView() {
            include_once('./application/views/main.html');
        }
    }
?>