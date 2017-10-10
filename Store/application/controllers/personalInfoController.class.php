<?php
    //登录控制器类
    class PersonalInfoController extends Controller {
        private $_model;

        //构造函数
        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            require_once('./application/models/PersonalInfoModel.class.php');

            $this -> _model = new PersonalInfoModel();
        }

        //跳转到个人中心页面
        public function toPersonalInfoView() {
            if (isset($_SESSION['userLogin'])) {
                include_once('./application/views/personalInfo.html');
            } else {
                echo '<script>alert("未登录无法进入个人中心");window.location.href="./index.php"</script>';
            }
        }

        public function getLoginNowInfo() {
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> getLoginNowInfo($userId);

            echo json_encode($res);
        }

        public function getAddress() {
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> getAddress($userId);

            echo json_encode($res);
        }

        public function getSc() {
            $userId = $_SESSION['userLogin'];
            $scPageNow = $_POST['scPageNow'];
            $start = $scPageNow * 3;

            $res = $this -> _model -> getSc($userId, $start);

            echo json_encode($res);
        }

        public function getScNum() {
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> getScNum($userId);

            echo count($res);
        }

        public function changeDefaultAdd() {
            $addressId = $_POST['addressId'];
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> changeDefaultAdd($userId, $addressId);

            echo $res;
        }

        public function addAdd() {
            $addr = $_POST['addr'];
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> checkAdd($userId);

            if (count($res)) {
                $res = $this -> _model -> addAdd($userId, $addr, 0);
            } else {
                $res = $this -> _model -> addAdd($userId, $addr, 1);
            }

            echo $res;
        }

        public function changeNickname() {
            $nickname = $_POST['nickname'];
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> changeNickname($userId, $nickname);

            echo $res;
        }

        public function changePhoneNum() {
            $phoneNum = $_POST['phoneNum'];
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> changePhoneNum($userId, $phoneNum);

            echo $res;
        }

        public function changeMailbox() {
            $mailbox = $_POST['mailbox'];
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> changeMailbox($userId, $mailbox);

            echo $res;
        }

        public function addToOl() {
            $scId = $_POST['scId'];
            $goodId = $_POST['goodId'];
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> getDefaultAdd($userId);

            if (count($res)) {
                $defaultAdd = $res[0]['address_id'];

                $res = $this -> _model -> addToOl($scId, $goodId, $defaultAdd, $userId);

                if ($res) {
                    echo 2;

                    $this -> _model -> deleteFromSc($scId);
                } else {
                    echo 3;
                }
            } else {
                echo 1;
            }
        }

        public function deleteFromSc() {
            $scId = $_POST['scId'];
 
            $res = $this -> _model -> deleteFromSc($scId);

            if ($res) {
                echo 1;
            } else {
                echo 2;
            }
        }

        public function getNoPayOl() {
            $userId = $_SESSION['userLogin'];
            $npPageNow = $_POST['npPageNow'];
            $start = $npPageNow * 3;

            $res = $this -> _model -> getNoPayOl($userId, $start);

            echo json_encode($res);
        }

        public function getNoPayOlNum() {
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> getNoPayOlNum($userId);

            echo count($res);
        }

        public function deleteOl() {
            $orderListId = $_POST['orderListId'];

            $res = $this -> _model -> deleteOl($orderListId);

            echo $res;
        }

        public function payOl() {
            $orderListId = $_POST['orderListId'];
            $postType = $_POST['postType'];
            $userId = $_SESSION['userLogin'];
            $ol = $this -> _model -> getOneOl($orderListId);
            $loginNowInfo = $this -> _model -> getLoginNowInfo($userId);
            

            if ($postType == '普通') {
                if ($ol[0]['original_price'] > $loginNowInfo[0]['balance']) {
                    echo 1;
                } else {
                    $this -> _model -> changeBalance($userId, $loginNowInfo[0]['balance'] - $ol[0]['original_price']);
                    $this -> _model -> changeOlStatus($orderListId);

                    echo 2;
                }
            } else if ($postType == '秒杀') {
                if ($ol[0]['discount_price'] > $loginNowInfo[0]['balance']) {
                    echo 1;
                } else {
                    $this -> _model -> changeBalance($userId, $loginNowInfo[0]['balance'] - $ol[0]['discount_price']);
                    $this -> _model -> changeOlStatus($orderListId);
                    
                    echo 2;
                }
            }
        }

        public function getPayedOl() {
            $userId = $_SESSION['userLogin'];
            $pdPageNow = $_POST['pdPageNow'];
            $start = $pdPageNow * 3;

            $res = $this -> _model -> getPayedOl($userId, $start);

            echo json_encode($res);
        }

        public function getPayedOlNum() {
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> getPayedOlNum($userId);

            echo count($res);
        }

        public function getBalance() {
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> getBalance($userId);

            echo $res[0]['balance'];
        }

        public function addRecharge() {
            $userId = $_SESSION['userLogin'];
            $recharge = $_POST['recharge'];
            $res = $this -> _model -> getBalance($userId);
            $balance = $res[0]['balance'];

            $res = $this -> _model -> addRecharge($userId, $recharge + $balance);

            if ($res) {
                echo 1;
            } else {
                echo 2;
            }
        }
    }
?>