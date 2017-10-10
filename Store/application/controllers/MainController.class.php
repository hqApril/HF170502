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
            include_once('./application/views/main.html');
        }

        //获取banner图片
        public function getBannerImg() {
            $res = $this -> _model -> getBannerImg();

            echo json_encode($res);
        }

        //获取分类列表
        public function getClaasify() {
            $res = $this -> _model -> getClassify();

            echo json_encode($res);
        }

        //获取商品数量
        public function getGoodNum() {
            $classifyId = $_POST['classifyId'];

            $res = $this -> _model -> getGoodNum($classifyId);

            echo count($res);
        }

        //获取当前页商品信息
        public function getGood() {
            $classifyId = $_POST['classifyId'];
            $pageNow = $_POST['pageNow'];
            $start = $pageNow * 4;

            $res = $this -> _model -> getGood($classifyId, $start);

            echo json_encode($res);
        }

        //获取荣誉墙信息
        public function getHonor() {
            $res = $this -> _model -> getHonor();

            echo json_encode($res);
        }
    }
?>