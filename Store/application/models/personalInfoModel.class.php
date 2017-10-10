<?php
    //个人中心模型类
    class PersonalInfoModel extends Model {
        private $_link;

        //构造函数
        public function __construct() {
            parent::__construct();
            $this -> _link = Database::getInstance($this -> _config);
        }

        public function getLoginNowInfo($userId) {
            $query = "select * from user where user_id = '{$userId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function getAddress($userId) {
            $query = "select * from address where user_id = '{$userId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function getSc($userId, $start) {
            $query = "select shopping_car.*, good.good_name, good.original_price, img.img_path from shopping_car, good, img where shopping_car.good_id = good.good_id and good.good_id = img.good_id and img.img_type = 'common' and user_id = '{$userId}' limit {$start}, 3";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function getScNum($userId) {
            $query = "select shopping_car.*, good.good_name, good.original_price, img.img_path from shopping_car, good, img where shopping_car.good_id = good.good_id and good.good_id = img.good_id and img.img_type = 'common' and user_id = '{$userId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function changeDefaultAdd($userId, $addressId) {
            $query = "update address set is_default = false where user_id = '{$userId}'";

            $res = $this -> _link -> change($query);

            $query = "update address set is_default = true where address_id = '{$addressId}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        public function checkAdd($userId) {
            $query = "select * from address where user_id = '{$userId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function addAdd($userId, $addr, $bool) {
            $query = "insert into address values (null, '{$userId}', '{$addr}', {$bool})";

            $res = $this -> _link -> change($query);

            return $res;
        }

        public function changeNickname($userId, $nickname) {
            $query = "update user set nick_name = '{$nickname}' where user_id = '{$userId}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        public function changePhoneNum($userId, $phoneNum) {
            $query = "update user set phone_num = '{$phoneNum}' where user_id = '{$userId}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        public function changeMailbox($userId, $mailbox) {
            $query = "update user set mailbox = '{$mailbox}' where user_id = '{$userId}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        public function getDefaultAdd($userId) {
            $query = "select * from address where user_id = '{$userId}' and is_default = 1";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function addToOl($scId, $goodId, $defaultAdd, $userId) {
            $query = "insert into order_list values (null, '{$userId}', '{$goodId}', now(), date_add(now(), interval 30 minute), 1, '{$defaultAdd}', 'nopay', 0)";

            $res = $this -> _link -> change($query);

            return $res;
        }

        public function deleteFromSc($scId) {
            $query = "delete from shopping_car where sc_id = '{$scId}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        public function getNoPayOl($userId, $start) {
            $query = "select * from order_list, good, img where order_list.good_id = good.good_id and good.good_id = img.good_id and img.img_type = 'common' and user_id = '{$userId}' and ol_status = 'nopay' limit {$start}, 3";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function getNoPayOlNum($userId) {
            $query = "select * from order_list, good, img where order_list.good_id = good.good_id and good.good_id = img.good_id and img.img_type = 'common' and user_id = '{$userId}' and ol_status = 'nopay'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function deleteOl($orderListId) {
            $query = "update order_list set ol_status = 'menualOverDue' where order_list_id = '{$orderListId}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        public function getOneOl($orderListId) {
            $query = "select * from order_list, good where good.good_id = order_list.good_id and order_list_id = '{$orderListId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function changeBalance($userId, $balance) {
            $query = "update user set balance = '{$balance}' where user_id = '{$userId}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        public function changeOlStatus($orderListId) {
            $query = "update order_list set ol_status = 'payed' where order_list_id = '{$orderListId}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        public function getPayedOl($userId, $start) {
            $query = "select * from order_list, good, img where order_list.good_id = good.good_id and good.good_id = img.good_id and img.img_type = 'common' and user_id = '{$userId}' and ol_status = 'payed' limit {$start}, 3";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function getPayedOlNum($userId) {
            $query = "select * from order_list, good, img where order_list.good_id = good.good_id and good.good_id = img.good_id and img.img_type = 'common' and user_id = '{$userId}' and ol_status = 'payed'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function getBalance($userId) {
            $query = "select * from user where user_id = '{$userId}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        public function addRecharge($userId, $recharge) {
            $query = "update user set balance = '{$recharge}' where user_id = '{$userId}'";

            $res = $this -> _link -> change($query);

            return $res;
        }
    }
?>