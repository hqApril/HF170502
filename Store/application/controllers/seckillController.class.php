<?php
    //秒杀主页面控制器类
    class SeckillController extends Controller {
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
            $timeIntervalId = $_POST['timeIntervalId'];

            $res = $this -> _model -> getGoodNum($classifyId, $timeIntervalId);

            echo count($res);
        }

        //获取当前页商品信息
        public function getGood() {
            $classifyId = $_POST['classifyId'];
            $timeIntervalId = $_POST['timeIntervalId'];
            $pageNow = $_POST['pageNow'];
            $start = $pageNow * 4;

            $res = $this -> _model -> getGood($classifyId, $timeIntervalId, $start);

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
            $now = date('H', time());

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

        public function getBackTime() {
            $timeIntervalId = $_POST['timeQuantumNow'];

            $res = $this -> _model -> getStartAndEnd($timeIntervalId);
            $start = strtotime($res[0]['time_start'].':00:00');
            $end = strtotime($res[0]['time_end'].':00:00');
            $now = strtotime('now');

            if ($start <= $now && $end > $now ) {
                $res = ['status' => 'in', 'time' => ($end - $now) * 1000];
            } else if ($end < $now) {
                $res = ['status' => 'left', 'time' => 0];
            } else if ($start >= $now) {
                $res = ['status' => 'right', 'time' => ($start - $now) * 1000];
            }

            echo json_encode($res);
        }
    }
?>