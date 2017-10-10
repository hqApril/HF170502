<?php
    //主页面模型类
    class MainModel extends Model {
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
        public function getGoodNum($classifyId) {
            if ($classifyId == 0) {
                $query = "select * from good where post_type = '普通'";
            } else {
                $query = "select * from good where post_type = '普通' and classify_id = '{$classifyId}'";
            }

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取商品信息
        public function getGood($classifyId, $start) {
            if ($classifyId == 0) {
                $query = "select good.*, img.img_path from good, img where good.good_id = img.good_id and img.img_type = 'common' and post_type = '普通' limit {$start}, 4";
            } else {
                $query = "select good.*, img.img_path from good, img where good.good_id = img.good_id and img.img_type = 'common' and post_type = '普通' and classify_id = '{$classifyId}' limit {$start}, 4";
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
    }
?>