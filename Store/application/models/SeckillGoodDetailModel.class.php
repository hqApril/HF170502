<?php
    //商品详情模型
    class SeckillGoodDetailModel extends Model {
        private $_link;

        //构造函数
        public function __construct() {
            parent::__construct();
            $this -> _link = Database::getInstance($this -> _config);
        }

        //获取商品详情
        public function getGoodDetail($goodId) {
            $query = "select * from good, img where good.good_id = img.good_id and img.img_type = 'common' and good.good_id = '{$goodId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取详情图片
        public function getDetailImg($goodId) {
            $query = "select * from img where img_type = 'detail' and good_id = '{$goodId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取已购买记录
        public function getBuyedRecord($goodId) {
            $query = "select order_list.user_id, order_list.total, good.original_price, order_list.create_time from order_list, good where order_list.good_id = good.good_id and order_list.good_id = '{$goodId}' and order_list.ol_status = 'payed'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取评论列表
        public function getComment($goodId) {
            $query = "select * from comment where good_id ='{$goodId}' order by create_time desc";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取某个商品已购买的记录
        public function checkPayed($goodId, $userLogin) {
            $query = "select * from order_list where good_id = '{$goodId}' and user_id = '{$userLogin}' and ol_status = 'payed'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //检查是否已评论过
        public function checkComment($goodId, $userLogin) {
            $query = "select * from comment where good_id = '{$goodId}' and user_id = '{$userLogin}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //添加评论
        public function addComment($goodId, $userLogin, $content) {
            $query = "insert into comment values (null, '{$userLogin}', '{$goodId}', now(), '{$content}')";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //添加商品至购物车
        public function addToSc($goodId, $userId) {
            $query = "insert into shopping_car values (null, '{$userId}', '{$goodId}')";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //添加商品至订单
        public function addToOl($userId, $goodId) {
            $query = "insert into order_list values (null, '{$userId}', '{$goodId}', now(), date_add(now(), interval 30 minute), 1, 1, 'nopay', 0)";

            $res = $this -> _link -> change($query);

            return $res;
        }
    }
?>