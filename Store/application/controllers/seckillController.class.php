<?php
    //秒杀主页面控制器类
    class seckillController extends Controller {
        private $_model;

        //构造函数
        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            $this -> _model = new seckillModel();
        }

        //跳转到主页面
        public function toSeckillView() {
            include_once('./application/views/seckill.html');
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

        // ---------------------------------------------------------------------------

        //获取时间段信息
        public function getTimeInterval() {
            $res = $this -> _model -> getTimeInterval();

            echo json_encode($res);
        }

        //获取当前时间段
        public function getTimeIntervalNow() {
            $now = date('h', time());

            $res = $this -> _model -> getTimeInterval();

            for ($i = 0; $i < count($res); $i++) {
                if ($res[$i]['time_start'] <= $now && $res[$i]['time_end'] > $now) {
                    break;
                }
            }

            if ($i == count($res)) {
                echo 'noSeckill';
            } else {
                echo $i;
            }
        }
    }
?>