<?php
class MainModel extends Model {
    private $_link;

    public function __construct() {
        parent::__construct();
        $this -> _link = Database::getInstance($this -> _config);
    }

    public function getBannerImg() {
        $query = "select * from banner_img";

        $res = $this -> _link -> select($query);

        return $res;
    }
}
?>