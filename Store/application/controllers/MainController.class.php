<?php
    class MainController extends Controller {
        private $_model;

        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            $this -> _model = new MainModel();
        }

        public function toMainView() {
            include_once('./application/views/main.html');
        }

        public function getBannerImg() {
            $res = $this -> _model -> getBannerImg();

            echo json_encode($res);
        }

        public function getClaasify() {
            $res = $this -> _model -> getClassify();

            echo json_encode($res);
        }

        public function getGoodNum() {
            $classifyId = $_POST['classifyId'];

            $res = $this -> _model -> getGoodNum($classifyId);

            echo count($res);
        }

        public function getGood() {
            $classifyId = $_POST['classifyId'];
            $pageNow = $_POST['pageNow'];
            $start = $pageNow * 4;

            $res = $this -> _model -> getGood($classifyId, $start);

            echo json_encode($res);
        }

        public function getHonor() {
            $res = $this -> _model -> getHonor();

            echo json_encode($res);
        }
    }
?>