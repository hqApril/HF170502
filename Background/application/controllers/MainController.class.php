<?php
    //主页面控制器类
    class MainController extends Controller {
        private $_model;

        //构造函数
        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            $this -> _model = new MainModel();
        }

        //跳转到主页面，做验证
        public function toMainView() {
            if (isset($_SESSION['loginNow'])) {
                include_once('./application/views/main.html');
            } else {
                echo '<script>alert("非法登录");window.location.href="./index.php";</script>';
            }
        }

        //获取当前登录的用户的信息
        public function getInfo() {
            $id = $_SESSION['loginNow'];

            $res = $this -> _model -> getInfo($id);

            echo json_encode($res);
        }

        //退出登录状态
        public function exitLogin() {
            unset($_SESSION['loginNow']);

            echo 1;
        }

        //获取菜单信息
        public function getMenu() {
            $id = $_SESSION['loginNow'];

            $res = $this -> _model -> getMenu($id);

            echo json_encode($res);
        }

        //主页面iframe条状相应的页面
        public function iframeHtml() {
            $u_name = $_GET['n'];

            $u_path = './application/views/'.$u_name.'.html';

            if (file_exists($u_path)) {
                include_once($u_path);
            }
        }

        //获取角色列表
        public function getRole() {
            $res = $this -> _model -> getRole();

            echo json_encode($res);
        }

        //添加新角色
        public function addRole() {
            $name = $_POST['name'];
            $describe = $_POST['describe'];

            $res = $this -> _model -> getOneRole($name);

            if (count($res)) {
                echo 0;
            } else {
                $res = $this -> _model -> addRole($name, $describe);

                if ($res) {
                    echo 1;
                } else {
                    echo 2;
                }
            }
        }

        //删除角色
        public function deleteRole() {
            $id = $_POST['id'];

            $res = $this -> _model -> checkRole($id);

            if (count($res)) {
                echo 0;
            } else {
                $res = $this -> _model -> deleteRole($id);

                if ($res) {
                    echo 1;
                } else {
                    echo 2;
                }
            }
        }

        //修改角色相关信息
        public function changeRole() {
            $id = $_POST['id'];
            $name = $_POST['name'];
            $describe = $_POST['describe'];

            $res = $this -> _model -> checkRoleName($id, $name);

            if (count($res)) {
                echo 0;
            } else {
                $res = $this -> _model -> changeRole($id, $name, $describe);

                if ($res) {
                    echo 1;
                } else {
                    echo 2;
                }
            }
        }

        //获取权限列表
        public function getPower() {
            $res = $this -> _model -> getPower();

            echo json_encode($res);
        }

        //获取当前角色的权限列表
        public function getRolePower() {
            $id = $_POST['id'];

            $res = $this -> _model -> getRolePower($id);

            echo json_encode($res);
        }

        //修改当前角色的权限
        public function changeRolePower() {
            $id = $_POST['id'];
            $arr = $_POST['arr'];

            $this -> _model -> deleteRolePower($id);

            for ($i = 0; $i < count($arr); $i++) {
                $this -> _model -> addRolePower($id, $arr[$i]);

                $res = $this -> _model -> getFRolePower($arr[$i]);
                $this -> _model -> addRolePower($id, $res[0]['menu_fid']);
            }

            echo 1;
        }

        //获取员工列表
        public function getEmployee() {
            $res = $this -> _model -> getEmployee();

            echo json_encode($res);
        }

        //修改员工使用和锁定状态
        public function changeStatus() {
            $arr = $_POST['arr'];
            $status = $_POST['status'];

            for ($i = 0; $i < count($arr); $i++) {
                $this -> _model -> changeStatus($arr[$i], $status);
            }

            echo 1;
        }

        //删除员工
        public function deleteEmployee() {
            $id = $_POST['id'];

            $res = $this -> _model -> deleteEmployee($id);

            if ($res) {
                echo 0;
            } else {
                echo 1;
            }
        }

        //获取一个员工的信息
        public function getOneEmployee() {
            $id = $_POST['id'];

            $res = $this -> _model -> getOneEmployee($id);

            echo json_encode($res);
        }

        //修改员工名字
        public function changeEmployeeName() {
            $id = $_POST['id'];
            $name = $_POST['name'];

            $res = $this -> _model -> changeEmployeeName($id, $name);

            if ($res) {
                echo 0;
            } else {
                echo 1;
            }
        }

        //修改员工密码
        public function changeEmployeePwd() {
            $id = $_POST['id'];
            $pwd = $_POST['pwd'];

            $res = $this -> _model -> changeEmployeePwd($id, $pwd);

            if ($res) {
                echo 0;
            } else {
                echo 1;
            }
        }

        //修改员工角色
        public function changeEmployeeRole() {
            $id = $_POST['id'];
            $roleId = $_POST['roleId'];

            $res = $this -> _model -> changeEmployeeRole($id, $roleId);

            if ($res) {
                echo 0;
            } else {
                echo 1;
            }
        }

        //添加员工
        public function addEmployee() {
            $id = $_POST['id'];
            $pwd = $_POST['pwd'];
            $name = $_POST['name'];
            $roleId = $_POST['roleId'];
            
            $res = $this -> _model -> checkEmployeeId($id);

            if (count($res)) {
                echo 0;
            } else {
                $res = $this -> _model -> addEmployee($id, $pwd, $name, $roleId);

                if ($res) {
                    echo 1;
                } else {
                    echo 2;
                }
            }
        }

        //添加商品
        public function addGood() {
            $postType = $_POST['postType'];
            $goodName = $_POST['goodName'];
            $timeIntervalId = $_POST['timeSelect'];
            $classifyId = $_POST['classifySelect'];
            $originalPrice = $_POST['originalPrice'];
            $discountPrice = $_POST['discountPrice'];
            $goodRest = $_POST['rest'];
            $goodLimit = $_POST['limit'];
            $goodSummary = $_POST['summary'];
            
            $res = $this -> _model -> addGood($goodName, $goodRest, $goodLimit, $goodSummary, $discountPrice, $originalPrice, $classifyId, $timeIntervalId, $postType);

            $res = $this -> _model -> getLastGoodId();

            echo json_encode($res);
        }

        //添加商品对应的图片
        public function addImg() {
            $id = $_GET['id'];
            $file=$_FILES['images'];
            $name=rand(0,500000).dechex(rand(0,10000)).".jpg";
            move_uploaded_file($file['tmp_name'],"../Upload/".$name);

            $res = $this -> _model -> addImg($id, "../Upload/".$name);

            echo $res;
        }

        //获取当前页的商品信息
        public function showGood() {
            $classifyId = $_POST['classifyId'];
            $goodStatus = $_POST['goodStatus'];
            $inquireInfo = isset($_POST['inquireInfo']) ? $_POST['inquireInfo'] : "";
            $pageNow = $_POST['pageNow'];

            $start = $pageNow * 4;

            $res = $this -> _model -> showGood($classifyId, $goodStatus, $inquireInfo,  $start);

            echo json_encode($res);
        }

        //获取某一类商品的数量
        public function getGoodNum() {
            $classifyId = $_POST['classifyId'];
            $goodStatus = $_POST['goodStatus'];
            $inquireInfo = isset($_POST['inquireInfo']) ? $_POST['inquireInfo'] : "";

            $res = $this -> _model -> getGoodNum($classifyId, $goodStatus, $inquireInfo);

            echo $res;
        }

        //获取某个商品的信息
        public function getOneGood() {
            $id = $_POST['id'];

            $res = $this -> _model -> getOneGood($id);

            echo json_encode($res);
        }

        //修改某个商品的上架/下架状态
        public function changeGoodStatus() {
            $id = $_POST['id'];

            $res = $this -> _model -> getOneGood($id);

            if ($res[0]['good_status'] == '上架') {
                $res = $this -> _model -> changeGoodStatus($id, '下架');
            } else {
                $res = $this -> _model -> changeGoodStatus($id, '上架');
            }
        }

        //修改商品详情
        public function changeDetail() {
            $id = $_POST['id'];
            $goodName = $_POST['goodName'];
            $originalPrice = $_POST['originalPrice'];
            $discountPrice = $_POST['discountPrice'];
            $goodRest = $_POST['goodRest'];
            $goodLimit = $_POST['goodLimit'];
            $goodSummary = $_POST['goodSummary'];

            $res = $this -> _model -> changeDetail($id, $goodName, $originalPrice, $discountPrice, $goodRest, $goodLimit, $goodSummary);

            return $res;
        }

        //获取已支付订单的数量
        public function getPayedNum() {
            $res = $this -> _model -> getTotalPayedOrder();

            echo count($res);
        }

        //获取已支付订单的信息
        public function getPayedOrder() {
            $pageNow = $_POST['pageNow'];
            $start = $pageNow * 8;

            $res = $this -> _model -> getPayedOrder($start);

            echo json_encode($res);
        }

        //获取订单详情
        public function getOrderDetail() {
            $id = $_POST['id'];

            $res = $this -> _model -> getorderDetail($id);

            echo json_encode($res);
        }

        //商品发货
        public function shipment() {
            $id = $_POST['id'];

            $res = $this -> _model -> shipment($id);

            echo $res;
        }

        //获取未支付订单的数量
        public function getUnpayedNum() {
            $res = $this -> _model -> getToalUnpayedNum();

            echo count($res);
        }

        //获取未支付订单的信息
        public function getUnpayedOrder() {
            $pageNow = $_POST['pageNow'];
            $start = $pageNow * 8;

            $res = $this -> _model -> getUnpayedOrder($start);

            echo json_encode($res);
        }

        //获取当前页的用户的信息
        public function getUser() {
            $userName = isset($_POST['userName']) ? $_POST['userName'] : '';
            $pageNow = $_POST['pageNow'];
            $start = $pageNow * 6;
            
            $res = $this -> _model -> getUser($userName, $start);

            echo json_encode($res);
            
        }

        //修改用户的使用/锁定状态
        public function changeUserStatus() {
            $arr = $_POST['arr'];

            for ($i = 0; $i < count($arr); $i++) {
                $this -> _model -> changeUserStatus($arr[$i]['id'], $arr[$i]['status']);

                echo $arr[$i]['id'];
            }

            echo 1;
        }

        //获取用户的数量
        public function getUserNum() {
            $userName = isset($_POST['userName']) ? $_POST['userName'] : '';

            $res = $this -> _model -> getUserNum($userName);

            echo count($res);
        }

        //获取用户的状态信息，作用户统计
        public function getUserStatistics() {
            $res = $this -> _model -> getUserStatistics();

            echo json_encode($res);
        }

        //获取订单的状态信息，作营销统计
        public function getMarketingStatistics() {
            $res = $this -> _model -> getMarketingStatistics();

            echo json_encode($res);
        }
    }
?>