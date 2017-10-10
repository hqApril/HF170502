<?php
    //商品详情控制器类
    class goodDetailController extends Controller {
        private $_model;

        //构造函数
        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            require_once('./application/models/LoginModel.class.php');

            $this -> _model = new GoodDetailModel();
        }

        //转到商品详情页面
        public function toGoodDetailView() {
            $goodId = $_GET['g'];

            echo '<script>var goodId = '.$goodId.'</script>';

            include_once('./application/views/goodDetail.html');
        }

        //获取商品详情
        public function getGoodDetail() {
            $goodId = $_POST['goodId'];

            $res = $this -> _model -> getGoodDetail($goodId);

            echo json_encode($res);
        }

        //获取商品详情图片
        public function getDetailImg() {
            $goodId = $_POST['goodId'];

            $res = $this -> _model -> getDetailImg($goodId);

            echo json_encode($res);
        }

        //获取已购买的记录
        public function getBuyedRecord() {
            $goodId = $_POST['goodId'];

            $res = $this -> _model -> getBuyedRecord($goodId);

            echo json_encode($res);
        }

        //获取评论列表
        public function getComment() {
            $goodId = $_POST['goodId'];

            $res = $this -> _model -> getComment($goodId);

            echo json_encode($res);
        }

        //添加评论
        public function addComment() {
            $goodId = $_POST['goodId'];
            $content = $_POST['content'];
            $userLogin = isset($_SESSION['userLogin']) ? $_SESSION['userLogin'] : '';

            $res = $this -> _model -> checkPayed($goodId, $userLogin);

            if (count($res)) {
                $res = $this -> _model -> checkComment($goodId, $userLogin);

                if (count($res)) {
                    echo 1;
                } else {
                    $res = $this -> _model -> addComment($goodId, $userLogin, $content);

                    echo 2;
                }
            } else {
                echo 0;
            }
        }

        //添加商品至购物车
        public function addToSc() {
            $goodId = $_POST['goodId'];
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> addToSc($goodId, $userId);

            if ($res) {
                echo 1;
            } else {
                echo 2;
            }
        }

        //添加商品至订单
        public function addToOl() {
            $goodId = $_POST['goodId'];
            $userId = $_SESSION['userLogin'];

            $res = $this -> _model -> addToOl($goodId, $userId);

            if ($res) {
                echo 1;
            } else {
                echo 2;
            }
        }
    }
?>