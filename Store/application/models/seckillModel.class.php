<?php
    //主页面模型类
    class SeckillModel extends Model {
        private $_link;

        //构造函数
        public function __construct() {
            parent::__construct();
            $this -> _link = Database::getInstance($this -> _config);
        }

        //获取banner图片列表
        public function getBannerImg() {
            $query = "select * from banner_img";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取分类列表
        public function getClassify() {
            $query = "select * from classify";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取商品数量
        public function getGoodNum($classifyId, $timeIntervalId) {
            if ($classifyId == 0) {
                $query = "select * from good where post_type = '秒杀' and time_interval_id = '{$timeIntervalId}'";
            } else {
                $query = "select * from good where post_type = '秒杀' and classify_id = '{$classifyId}' and time_interval_id = '{$timeIntervalId}'";
            }

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取商品信息
        public function getGood($classifyId, $timeIntervalId, $start) {
            if ($classifyId == 0) {
                $query = "select good.*, img.img_path from good, img where good.good_id = img.good_id and img.img_type = 'common' and post_type = '秒杀' and time_interval_id = '{$timeIntervalId}' limit {$start}, 4";
            } else {
                $query = "select good.*, img.img_path from good, img where good.good_id = img.good_id and img.img_type = 'common' and post_type = '秒杀' and classify_id = '{$classifyId}' and time_interval_id = '{$timeIntervalId}' limit {$start}, 4";
            }

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取荣誉墙信息
        public function getHonor() {
            $query = "select user_id from order_list order by create_time desc";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取时间段信息
        public function getTimeInterval() {
            $query = "select * from time_interval";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取某个时间段的开始与结束时间
        public function getStartAndEnd($timeIntervalId) {
            $query = "select * from time_interval where time_interval_id = '{$timeIntervalId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }
    }
?>