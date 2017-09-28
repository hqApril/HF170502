<?php
    abstract class Model {
        protected $_config;

        public function __construct() {
            require_once('./framework/libraries/Database.class.php');

            $this -> _config = require_once('./application/config/Database.config.php');
        }
    }
?>