<?php
    class GoodDetailModel extends Model {
        private $_link;

        public function __construct() {
            parent::__construct();
            $this -> _link = Database::getInstance($this -> _config);
        }

        public function getGoodDetail($goodId) {
            $query = "select * from good, img where good.good_id = img.good_id and img.img_type = 'common' and good.good_id = '{$goodId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function getDetailImg($goodId) {
            $query = "select * from img where img_type = 'detail' and good_id = '{$goodId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function getBuyedRecord($goodId) {
            $query = "select order_list.user_id, order_list.total, good.original_price, order_list.create_time from order_list, good where order_list.good_id = good.good_id and order_list.good_id = '{$goodId}' and order_list.ol_status = 'payed'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function getComment($goodId) {
            $query = "select * from comment where good_id ='{$goodId}' order by create_time desc";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function checkPayed($goodId, $userLogin) {
            $query = "select * from order_list where good_id = '{$goodId}' and user_id = '{$userLogin}' and ol_status = 'payed'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function checkComment($goodId, $userLogin) {
            $query = "select * from comment where good_id = '{$goodId}' and user_id = '{$userLogin}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function addComment($goodId, $userLogin, $content) {
            $query = "insert into comment values (null, '{$userLogin}', '{$goodId}', now(), '{$content}')";

            $res = $this -> _link -> change($query);

            return $res;
        }
    }
?>