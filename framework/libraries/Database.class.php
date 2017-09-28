<?php
    class Database {
        private static $_instance;
        private $_res;
        private $_link;
        private $_file;

        private function __construct($config) {
            @ $this -> _link = new mysqli($config['host'], $config['id'], $config['pwd'], $config['dbName']);

            $this -> _file = fopen('./framework/libraries/mysqlLog.txt', 'a');

            if (mysqli_connect_error()) {
                echo '数据库连接失败<br/>';
			    echo mysqli_connect_error().'<br/>';
			    echo mysqli_connect_errno().'<br/>';
            }
        }

        public function __clone() {
            trigger_error("Clone is not allowed!", E_USER_ERROR);
        }

        public static function getInstance($config) {
            if (!(self::$_instance instanceof self)) {
			    self::$_instance = new self($config);
		    }

		    return self::$_instance;
        }

        public function __destruct() {
            $this -> _link -> close();
            //fclose($this -> _file);
        }
        
        public function dealQuery($query) {
            $this -> _res = $this -> _link -> query($query);

            $log = [
                'time' => date('Y-m-d H:m:s', time()),
                'query' => $query
            ];

            $str = json_encode($log)."\r\n";
            fwrite($this -> _file, $str);
        }

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

        public function insert($query) {
            $this -> dealQuery($query);

            return $this -> _res;
        }

        public function delete($query) {
            $this -> dealQuery($query);

            return $this -> _res;
        }

        public function update($query) {
            $this -> dealQuery($query);

            return $this -> _res;
        }
    }
?>