<?php
    //主页面模型类
    class MainModel extends Model {
        private $_link;

        //构造函数
        public function __construct() {
            parent::__construct();
            $this -> _link = Database::getInstance($this -> _config);
        }
    }
?>