<?php
// 验证码插件

class Captcha {
        private $charset = 'abcdefghkmnprstuvwxyz23456789';     //验证码中出现的字符
        private $code;  //当前验证码
        private $codeLen;   //验证码长度
        private $width;    //验证码图片宽度
        private $height;    //验证码图片长度
        private $font = './TektonPro.otf';    //字体文件引用
        private $fontSize;    //字体大小
        private $fontColor;    //字体颜色
        private $img;    //图片句柄

        //初始化字符数量、图片长宽、文字大小
        public function __construct($codeLen, $width, $height) {
            $this -> codeLen = $codeLen;
            $this -> width = $width;
            $this -> height = $height;
            $this -> fontSize = $height / 2;
        }

        //创建验证码
        private function createCode() {
            $_len = strlen($this -> charset) - 1;

            for ($i = 0; $i < $this -> codeLen; $i++) {
                $this -> code .= $this -> charset[mt_rand(0, $_len)];
            }
        }

        //添加创建背景
        private function createBg() {
            $this -> img = imagecreatetruecolor($this -> width, $this -> height);
            $color = imagecolorallocate($this -> img, mt_rand(200, 255), mt_rand(200, 255), mt_rand(200, 255));
            imagefilledrectangle($this -> img, 0, $this -> height, $this -> width, 0, $color);
        }

        //添加字符
        private function createFont() {
            $_x = $this -> width / $this -> codeLen;

            for ($i = 0; $i < $this -> codeLen; $i++) {
                $this -> fontColor = imagecolorallocate($this -> img, mt_rand(0, 100), mt_rand(0, 100), mt_rand(0, 100));

                imagettftext($this -> img, $this -> fontSize, mt_rand(-20, 20), $_x * $i + mt_rand(1, 5), $this -> height / 1.33, $this -> fontColor, $this -> font, $this -> code[$i]);
            }
        }

        //添加线条、雪花
        private function createLine() {
            for ($i = 0; $i < 6; $i++) {
                $color = imagecolorallocate($this -> img, mt_rand(0, 156), mt_rand(0, 156), mt_rand(0, 156));

                imageline($this -> img, mt_rand(0, $this -> width), mt_rand(0, $this -> height), mt_rand(0, $this -> width), mt_rand(0, $this -> height), $color);
            }

            for ($i = 0; $i < 100; $i++) {
                $color = imagecolorallocate($this -> img, mt_rand(200, 255), mt_rand(200, 255), mt_rand(200, 255));

                imagestring($this -> img, mt_rand(1, 5), mt_rand(0, $this -> width), mt_rand(0, $this -> height), "*", $color);
            }
        }

        //输出图片
        private function outPut() {
            header("Content-type:image/png");
            imagepng($this -> img);
            imagedestroy($this -> img);
        }

        //生成验证码图片
        public function getImg() {
            $this -> createBg();
            $this -> createCode();
            $this -> createLine();
            $this -> createFont();
            $this -> outPut();
        }

        //获取验证码
        public function getCode() {
            return strtolower($this -> code);
        }
    }

    session_start();

    $captcha = new Captcha(4, 90, 44);
    $captcha -> getImg();
    $_SESSION['loginCaptcha'] = $captcha -> getCode();
?>
