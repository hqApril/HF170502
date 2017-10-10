<?php
    //控制器基类
     abstract class Controller {
        public function getLoginNow() {
            if (isset($_SESSION['userLogin'])) {
                echo $_SESSION['userLogin'];
            } else {
                echo "";
            }
        }
    }
?>