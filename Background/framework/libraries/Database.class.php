<?php
    //数据库类
    class Database {
        private static $_instance;
        private $_res;
        private $_link;
        private $_file;

        //构造函数
        private function __construct($config) {
            @ $this -> _link = new mysqli($config['host'], $config['id'], $config['pwd'], $config['dbName']);

            $this -> _file = fopen('./framework/libraries/mysqlLog.txt', 'a');

            if (mysqli_connect_error()) {
                echo '数据库连接失败<br/>';
			    echo mysqli_connect_error().'<br/>';
			    echo mysqli_connect_errno().'<br/>';
            }
        }

        //防止克隆
        public function __clone() {
            trigger_error("Clone is not allowed!", E_USER_ERROR);
        }

        //单例模式
        public static function getInstance($config) {
            if (!(self::$_instance instanceof self)) {
			    self::$_instance = new self($config);
		    }

		    return self::$_instance;
        }

        //析构函数
        public function __destruct() {
            $this -> _link -> close();
        }
        
        //query语句处理，记录
        public function dealQuery($query) {
            $this -> _res = $this -> _link -> query($query);

            $log = [
                'time' => date('Y-m-d H:m:s', time()),
                'query' => $query
            ];

            $str = json_encode($log)."\r\n";
            fwrite($this -> _file, $str);
        }

        //从数据库获取数据
        public function select($query) {
            $this -> dealQuery($query);

            if ($this -> _res) {
                $arr = [];

                while ($row = $this -> _res -> fetch_assoc()) {
                    array_push($arr, $row);
                }

                return $arr;
            } 

            return 'error';
        }

        //修改数据库数据
        public function change($query) {
            $this -> dealQuery($query);

            return $this -> _res;
        }
    }
?>