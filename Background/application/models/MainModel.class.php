<?php
    //主页面模型类
    class MainModel extends Model {
        private $_link;

        //构造函数
        public function __construct() {
            parent::__construct();
            $this -> _link = Database::getInstance($this -> _config);
        }

        //获取当前登录用户的信息
        public function getInfo($id) {
            $query = "select employee_name, role_name, employee_img from employee, role, employee_role where employee.employee_id = employee_role.employee_id and role.role_id = employee_role.role_id and employee.employee_id = '{$id}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取菜单信息
        public function getMenu($id) {
            $query = "select * from employee_role, role_menu, menu where employee_role.role_id = role_menu.role_id and role_menu.menu_id = menu.menu_id and employee_role.employee_id = '{$id}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取角色列表
        public function getRole() {
            $query = "select * from role";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取某个角色的信息
        public function getOneRole($name) {
            $query = "select * from role where role_name = '{$name}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //添加角色
        public function addRole($name, $describe) {
            $query = "insert into role values (null, '{$name}', '$describe')";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //验证角色是否拥有员工
        public function checkRole($id) {
            $query = "select * from employee_role where role_id = {$id}";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //删除角色
        public function deleteRole($id) {
            $query = "delete from role where role_id = {$id}";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //验证角色名是否重复
        public function checkRoleName($id, $name) {
            $query = "select * from role where role_id != {$id} and role_name = '{$name}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //修改角色相关信息
        public function changeRole($id, $name, $describe) {
            $query = "update role set role_name = '{$name}', role_describe = '$describe' where role_id = {$id}";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //获取权限列表
        public function getPower() {
            $query = "select * from menu";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取角色的权限表
        public function getRolePower($id) {
            $query = "select * from menu, role_menu where menu.menu_id = role_menu.menu_id and menu.menu_fid != 0 and role_menu.role_id = {$id}";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //删除角色的权限
        public function deleteRolePower($id) {
            $query = "delete from role_menu where role_id = {$id}";

            $this -> _link -> change($query);
        }

        //添加角色的权限
        public function addRolePower($id, $menuId) {
            $query = "insert into role_menu values ({$id}, {$menuId})";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //获取父角色的权限
        public function getFRolePower($menuId) {
            $query = "select menu_fid from menu where menu_id = {$menuId}";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取员工列表
        public function getEmployee() {
            $query = "select employee.employee_id, employee.employee_name, role.role_name, employee.employee_status from employee, employee_role, role where employee.employee_id = employee_role.employee_id and employee_role.role_id = role.role_id";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //修改员工的使用/锁定状态
        public function changeStatus($id, $status) {
            $query = "update employee set employee_status = '{$status}' where employee_id = '{$id}'";

            $this -> _link -> change($query);
        }

        //删除员工
        public function deleteEmployee($id) {
            $query = "delete from employee_role where employee_id = '{$id}'";

            $res = $this -> _link -> change($query);

            if ($res) {
                $query = "delete from employee where employee_id = '{$id}'";

                $res = $this -> _link -> change($query);

                return $res;
            }

            return $res;
        }

        //获取一个员工的信息
        public function getOneEmployee($id) {
            $query = "select * from employee, employee_role where employee.employee_id = employee_role.employee_id and employee.employee_id = '{$id}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //修改员工名字
        public function changeEmployeeName($id, $name) {
            $query = "update employee set employee_name = '{$name}' where employee_id = '{$id}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //修改员工密码
        public function changeEmployeePwd($id, $pwd) {
            $query = "update employee set employee_pwd = md5('{$pwd}') where employee_id = '{$id}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //修改员工角色
        public function changeEmployeeRole($id, $roleId) {
            $query = "update employee_role set role_id = {$roleId} where employee_id = '{$id}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //验证员工id是否存在
        public function checkEmployeeId($id) {
            $query = "select * from employee where employee_id = '{$id}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //添加员工
        public function addEmployee($id, $pwd, $name, $roleId) {
            $query = "insert into employee values ('{$id}', md5('{$pwd}'), '{$name}', '使用', './application/views/images/default_head_img.jpg')";

            $res = $this -> _link -> change($query);

            if ($res) {
                $query = "insert into employee_role values ('{$id}', {$roleId})";

                $res = $this -> _link -> change($query);

                return $res;
            }

            return $res;
        }

        //添加商品
        public function addGood($goodName, $goodRest, $goodLimit, $goodSummary, $discountPrice, $originalPrice, $classifyId, $timeIntervalId, $postType) {
            $query = "insert into good values (null, '{$goodName}', '{$goodRest}', '{$goodLimit}', '{$goodSummary}', '{$discountPrice}', '{$originalPrice}', '{$classifyId}', '{$timeIntervalId}', '{$postType}', '上架', '".date('Y-m-d H:i:s', time())."')";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //获取新添加商品id
        public function getLastGoodId() {
            $query = "select LAST_INSERT_ID() as last_id";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //新增商品添加对应图片
        public function addImg($id, $path) {
            $query = "insert into img values (null, '{$id}', '{$path}', 'common')";

            $res = $this -> _link -> change($query);

            return $path;
        }

        //获取当前页的商品信息
        public function showGood($classifyId, $goodStatus, $inquireInfo, $start) {
            if ($classifyId == 0) {
                if ($goodStatus === "0") {
                    $query = "select * from good, img where img.good_id =good.good_id and img.img_type = 'common' and good_name like '%{$inquireInfo}%' limit {$start}, 4";
                } else {
                    $query = "select * from good, img where img.good_id =good.good_id and img.img_type = 'common' good_name like '%{$inquireInfo}%' and good_status = '{$goodStatus}' limit {$start}, 4";
                }
            } else {
                if ($goodStatus === "0") {
                    $query = "select * from good, img where img.good_id =good.good_id and img.img_type = 'common' good_name like '%{$inquireInfo}%' and classify_id = '{$classifyId}' limit {$start}, 4";
                } else {
                    $query = "select * from good, img where img.good_id =good.good_id and img.img_type = 'common' good_name like '%{$inquireInfo}%' and classify_id = '{$classifyId}' and good_status = '{$goodStatus}' limit {$start}, 4";
                }
            }

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取某一分类和某一状态的商品的信息
        public function getGoodNum($classifyId, $goodStatus, $inquireInfo) {
            if ($classifyId == 0) {
                if ($goodStatus === "0") {
                    $query = "select * from good where good_name like '%{$inquireInfo}%'";
                } else {
                    $query = "select * from good where good_name like '%{$inquireInfo}%' and good_status = '{$goodStatus}'";
                }
            } else {
                if ($goodStatus === "0") {
                    $query = "select * from good where good_name like '%{$inquireInfo}%' and classify_id = '{$classifyId}'";
                } else {
                    $query = "select * from good where good_name like '%{$inquireInfo}%' and classify_id = '{$classifyId}' and good_status = '{$goodStatus}'";
                }
            }

            $res = $this -> _link -> select($query);

            return count($res);
        }

        //获取一个商品的信息
        public function getOneGood($id) {
            $query = "select * from good, classify where good.classify_id = classify.classify_id and good_id = '{$id}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //修改商品的上架/下架状态
        public function changeGoodStatus($id, $goodStatus) {
            $query = "update good set good_status = '{$goodStatus}' where good_id = '{$id}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //修改商品详情
        public function changeDetail($id, $goodName, $originalPrice, $discountPrice, $goodRest, $goodLimit, $goodSummary) {
            $query = "update good set good_name = '{$goodName}', original_price = '{$originalPrice}', discount_price = '{$discountPrice}', good_rest = '{$goodRest}', good_limit = '{$goodLimit}', good_summary = '{$goodSummary}' where good_id = '{$id}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //获取所有已支付订单列表
        public function getTotalPayedOrder() {
            $query = "select * from order_list where ol_status = 'payed'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取当前也已支付订单信息
        public function getPayedOrder($start) {
            $query = "select order_list.*, good.discount_price, good.post_type from order_list, good where ol_status = 'payed' and order_list.good_id = good.good_id order by order_list.create_time desc limit {$start}, 8";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取某个订单详情
        public function getorderDetail($id) {
            $query = "select order_list.*, good.discount_price, good.post_type from order_list, good where order_list.good_id = good.good_id and order_list.order_list_id = '{$id}'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //订单发货
        public function shipment($id) {
            $query = "update order_list set shipped_status = true where order_list_id = '{$id}'";

            $res = $this -> _link -> change($query);

            return $res;
        }

        //获取所有未支付订单的数量
        public function getToalUnpayedNum() {
            $query = "select * from order_list where ol_status != 'payed'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取当前页的订单信息
        public function getUnpayedOrder($start) {
            $query = "select order_list.*, good.discount_price, good.post_type from order_list, good where ol_status != 'payed' and order_list.good_id = good.good_id order by order_list.create_time desc limit {$start}, 8";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取当前页的用户信息
        public function getUser($userName, $start) {
            $query = "select * from user where nick_name like '%{$userName}%' limit {$start}, 6";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //修改用户使用/锁定状态
        public function changeUserStatus($id, $status) {
            $query = "update user set user_status = '{$status}' where user_id = '{$id}'";

            $this -> _link -> change($query);
        }

        //模糊搜索用户名
        public function getUserNum($userName) {
            $query = "select * from user where nick_name like '%{$userName}%'";

            $res = $this -> _link -> select($query);

            return $res;
        }

        //获取用户信息作用户统计
        public function getUserStatistics() {
            $query = "select substr(create_time, 6, 2) as monthly, count(*) as num from user group by substr(create_time, 6, 2) order by substr(create_time, 6, 2)";

            $res = $this -> _link -> select($query);

            return $res;
        }
        
        //获取订单信息作营销统计
        public function getMarketingStatistics() {
            $query = "select substr(create_time, 6, 2) as monthly, count(*) as num from order_list group by substr(create_time, 6, 2) order by substr(create_time, 6, 2)";

            $res = $this -> _link -> select($query);

            return $res;
        }
    }
?>