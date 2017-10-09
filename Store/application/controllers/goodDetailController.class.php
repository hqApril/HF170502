<?php
    class goodDetailController extends Controller {
        private $_model;

        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            require_once('./application/models/LoginModel.class.php');

            $this -> _model = new GoodDetailModel();
        }

        public function toGoodDetailView() {
            $goodId = $_GET['g'];

            echo '<script>var goodId = '.$goodId.'</script>';

            include_once('./application/views/goodDetail.html');
        }

        public function getGoodDetail() {
            $goodId = $_POST['goodId'];

            $res = $this -> _model -> getGoodDetail($goodId);

            echo json_encode($res);
        }

        public function getDetailImg() {
            $goodId = $_POST['goodId'];

            $res = $this -> _model -> getDetailImg($goodId);

            echo json_encode($res);
        }

        public function getBuyedRecord() {
            $goodId = $_POST['goodId'];

            $res = $this -> _model -> getBuyedRecord($goodId);

            echo json_encode($res);
        }

        public function getComment() {
            $goodId = $_POST['goodId'];

            $res = $this -> _model -> getComment($goodId);

            echo json_encode($res);
        }

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
    }
?>