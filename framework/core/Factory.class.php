<?php
    class Factory {
        private static $_instance;

        private function __construct() {
            require_once("./framework/core/controller.class.php");
            require_once("./framework/core/model.class.php");

            spl_autoload_register([__CLASS__, 'loadController']);
        }

        public function __clone() {
            trigger_error('Clone is not allowd.', E_USER_ERROR);
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)) {
                self::$_instance = new self;
            }

            return self::$_instance;
        }

        public function loadController ($c_name) {  
            $c_path = './application/controllers/'.$c_name.'.class.php';
            
            if (file_exists($c_path)) {
                 require($c_path);
            }
        }

        public function run() {
            $c_str = isset($_GET['c']) ? $_GET['c'] : "Login";
            $method = isset($_GET['a']) ? $_GET['a'] : "toLoginView";
            $c_name = $c_str.'Controller';
            $controller = new $c_name();
            $controller -> $method();
        }
    }
?>
