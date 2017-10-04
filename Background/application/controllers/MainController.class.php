<?php
    class MainController extends Controller {
        private $_model;

        public function __construct() {
            session_start();
            $_POST = json_decode(file_get_contents('php://input'),true);
            $this -> _model = new MainModel();
        }

        public function toMainView() {
            if (isset($_SESSION['loginNow'])) {
                include_once('./application/views/main.html');
            } else {
                echo '<script>alert("非法登录");window.location.href="./index.php";</script>';
            }
        }

        public function getInfo() {
            $id = $_SESSION['loginNow'];

            $res = $this -> _model -> getInfo($id);

            echo json_encode($res);
        }

        public function exitLogin() {
            unset($_SESSION['loginNow']);

            echo 1;
        }

        public function getMenu() {
            $id = $_SESSION['loginNow'];

            $res = $this -> _model -> getMenu($id);

            echo json_encode($res);
        }

        public function iframeHtml() {
            $u_name = $_GET['n'];

            $u_path = './application/views/'.$u_name.'.html';

            if (file_exists($u_path)) {
                include_once($u_path);
            }
        }

        public function getRole() {
            $res = $this -> _model -> getRole();

            echo json_encode($res);
        }

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

        public function getPower() {
            $res = $this -> _model -> getPower();

            echo json_encode($res);
        }

        public function getRolePower() {
            $id = $_POST['id'];

            $res = $this -> _model -> getRolePower($id);

            echo json_encode($res);
        }

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

        public function getEmployee() {
            $res = $this -> _model -> getEmployee();

            echo json_encode($res);
        }

        public function changeStatus() {
            $arr = $_POST['arr'];
            $status = $_POST['status'];

            for ($i = 0; $i < count($arr); $i++) {
                $this -> _model -> changeStatus($arr[$i], $status);
            }

            echo 1;
        }

        public function deleteEmployee() {
            $id = $_POST['id'];

            $res = $this -> _model -> deleteEmployee($id);

            if ($res) {
                echo 0;
            } else {
                echo 1;
            }
        }

        public function getOneEmployee() {
            $id = $_POST['id'];

            $res = $this -> _model -> getOneEmployee($id);

            echo json_encode($res);
        }

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

            echo $res;
        }

        public function addImg() {
            $name = isset($_POST['name'])? $_POST['name'] : '';  
            $gender = isset($_POST['gender'])? $_POST['gender'] : '';  
  
            $filename = time().substr($_FILES['images']['name'], strrpos($_FILES['images']['name'],'.'));
  
            $response = array();  
  
            if(move_uploaded_file($_FILES['images']['tmp_name'], $filename)){  
                $response['isSuccess'] = true;  
                $response['name'] = $name;  
                $response['gender'] = $gender;  
                $response['images'] = $filename;  
            }else{  
                $response['isSuccess'] = false;  
            }  
  
           echo json_encode($response); 
        }

        public function showGood() {
            $classifyId = $_POST['classifyId'];
            $goodStatus = $_POST['goodStatus'];
            $inquireInfo = isset($_POST['inquireInfo']) ? $_POST['inquireInfo'] : "";
            $pageNow = $_POST['pageNow'];

            $start = $pageNow * 4;

            $res = $this -> _model -> showGood($classifyId, $goodStatus, $inquireInfo,  $start);

            echo json_encode($res);
        }

        public function getGoodNum() {
            $classifyId = $_POST['classifyId'];
            $goodStatus = $_POST['goodStatus'];
            $inquireInfo = isset($_POST['inquireInfo']) ? $_POST['inquireInfo'] : "";

            $res = $this -> _model -> getGoodNum($classifyId, $goodStatus, $inquireInfo);

            echo $res;
        }

        public function getOneGood() {
            $id = $_POST['id'];

            $res = $this -> _model -> getOneGood($id);

            echo json_encode($res);
        }

        public function changeGoodStatus() {
            $id = $_POST['id'];

            $res = $this -> _model -> getOneGood($id);

            if ($res[0]['good_status'] == '上架') {
                $res = $this -> _model -> changeGoodStatus($id, '下架');
            } else {
                $res = $this -> _model -> changeGoodStatus($id, '上架');
            }
        }

        public function changeDetail() {
            $id = $_POST['id'];
            $goodName = $_POST['goodName'];
            $originalPrice = $_POST['originalPrice'];
            $discountPrice = $_POST['discountPrice'];
            $goodRest = $_POST['goodRest'];
            $goodLimit = $_POST['goodLimit'];
            $goodSummary = $_POST['goodSummary'];

            $res = $this -> _model -> changeDetail($id, $goodName, $originalPrice, $discountPrice, $goodRest, $goodLimit, $goodSummary);
        }
    }
?>