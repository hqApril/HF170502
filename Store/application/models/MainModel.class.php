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

    public function getClassify() {
        $query = "select * from classify";

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function getGoodNum($classifyId) {
        if ($classifyId == 0) {
            $query = "select * from good where post_type = '普通'";
        } else {
            $query = "select * from good where post_type = '普通' and classify_id = '{$classifyId}'";
        }

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function getGood($classifyId, $start) {
        if ($classifyId == 0) {
            $query = "select good.*, img.img_path from good, img where good.good_id = img.good_id and img.img_type = 'common' and post_type = '普通' limit {$start}, 4";
        } else {
            $query = "select good.*, img.img_path from good, img where good.good_id = img.good_id and img.img_type = 'common' and post_type = '普通' and classify_id = '{$classifyId}' limit {$start}, 4";
        }

        $res = $this -> _link -> select($query);

        return $res;
    }

    public function getHonor() {
        $query = "select user_id from order_list order by create_time desc";

        $res = $this -> _link -> select($query);

        return $res;
    }
}
?>