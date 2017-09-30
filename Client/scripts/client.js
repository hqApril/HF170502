//客户端收到服务器数据处理

//连接服务器
var client = new WebSocket("ws://localhost:8181");

client.onmessage = function(msg) {
    var msgObj = JSON.parse(msg.data);

    if (msgObj.type == "login") {   //登录
        if (msgObj.content.success == "yes") {
            alert("登录成功");
            if (msgObj.content.nickname == null) {
                logined(msgObj.content.id);
                chatForUsers.changeWho(msgObj.content.id);
            } else {
                logined(msgObj.content.nickname);
                chatForUsers.changeWho(msgObj.content.id, msgObj.content.nickname);
            }

            $loginInterface.children('input[value = "X"]').click();
            sessionStorage.HF170502_nowLogin = msgObj.content.id;
        } else if (msgObj.content.success == "logined") {
            alert("该用户已登录");
        } else {
            alert("登录失败");
        }
    } else if (msgObj.type == "refreshLoginInfo") {     //刷新登录信息
        if (msgObj.content.nickname == null) {
            logined(msgObj.content.id);
            chatForUsers.changeWho(msgObj.content.id);
        } else {
            logined(msgObj.content.nickname);
            chatForUsers.changeWho(msgObj.content.id, msgObj.content.nickname);
        }
    } else if (msgObj.type == "checkRegisterId") {  //验证注册名重复性
        if (msgObj.content.success) {
            $registerId.next().html("*该用户名已存在");
        } else {
            $registerId.next().html("*该用户名可用");
            $registerId.next().css("color", "green");
        }
    } else if (msgObj.type == "register") {   //注册
        if (msgObj.content.success) {
            alert("注册成功");

            $("#registerInterface").hide();
            $("#transMask").hide();
        } else {
            alert("请检查您的注册信息");
        }
    } else if (msgObj.type == "getBannerImg") {    //获取banner图片
        var sliderImgArr = [];
        for (var i = 0; i < msgObj.content.res.length; i++) {
            sliderImgArr.push(msgObj.content.res[i].path);
        }

        var slider = new BannerSlider("#bannerSlider", "#previousPageBtn", "#nextPageBtn", "#sliderDot", 980, sliderImgArr);

        slider.addDot("sliderDotUnselected", "sliderDotSelected");
        slider.autoSlider();
    } else if (msgObj.type == "getClassify") {    //获取首页商品分类信息
        $("#floatClassify").empty();

        var $li = $("<li>全部</li>");
        $li.css("background-color", "rgb(135, 0, 0)");

        $li.attr("classify_id", "all");
        $li.click(function() {
            classifyNow = $(this).attr("classify_id");

            $(this).css("background-color", "rgb(135, 0, 0)");
            $(this).siblings().css("background-color", "rgb(185, 0, 0)");

            pagination = 0;
            changeGoods();
        });

        $li.appendTo($("#floatClassify"));

        for (var i = 0; i < msgObj.content.res.length; i++) {
            var $li = $("<li>" + msgObj.content.res[i].name + "</li>");
            $li.attr("classify_id", msgObj.content.res[i].classify_id);
            $li.click(function() {
                classifyNow = $(this).attr("classify_id");

                $(this).css("background-color", "rgb(135, 0, 0)");
                $(this).siblings().css("background-color", "rgb(185, 0, 0)");

                pagination = 0;
                changeGoods();
            });

            $li.appendTo($("#floatClassify"));
        }
    } else if (msgObj.type == "getTimeQuantum") {    //获取首页时间段信息
        $("#timeQuantum").empty();

        if (msgObj.content.i == "noSeckill") {
            timeSelectedNow = 0;
            timeQuantumNow = "tq1";

            var $ul = $("<ul></ul>");

            for (var i = 0; i < msgObj.content.res.length; i++) {
                var $li = $("<li>" + msgObj.content.res[i].start_time + ":00<br/>即将开抢</li>");
                $li.attr("time_quantum_id", msgObj.content.res[i].time_quantum_id);

                $li.appendTo($ul);
            }

            $ul.appendTo($("#timeQuantum"));
        } else {
            timeSelectedNow = msgObj.content.i;
            timeQuantumNow = "tq" + (parseInt(msgObj.content.i) + 1);

            var $ul = $("<ul></ul>");

            for (var i = 0; i < msgObj.content.i; i++) {
                var $li = $("<li>" + msgObj.content.res[i].start_time + ":00<br/>秒杀结束</li>");
                $li.attr("time_quantum_id", msgObj.content.res[i].time_quantum_id);

                $li.appendTo($ul);
            }

            var $li = $("<li>" + msgObj.content.res[msgObj.content.i].start_time + ":00<br/>正在秒杀</li>");
            $li.attr("time_quantum_id", msgObj.content.res[msgObj.content.i].time_quantum_id);

            $li.appendTo($ul);

            for (var i = msgObj.content.i + 1; i < msgObj.content.res.length; i++) {
                var $li = $("<li>" + msgObj.content.res[i].start_time + ":00<br/>即将开抢</li>");
                $li.attr("time_quantum_id", msgObj.content.res[i].time_quantum_id);

                $li.appendTo($ul);
            }

            $ul.appendTo($("#timeQuantum"));
        }

        changeGoods();
        changeBackTime();

        var timeQuantum = new TimeQuantum("#timeQuantum", timeSelectedNow);
        $("#timeQuantum").children("input").eq(0).click(function() {

            if (timeSelectedNow > 0) {
                timeSelectedNow--;
                timeQuantumNow = $("#timeQuantumDiv1").children("div").eq(0).children().eq(timeSelectedNow).attr("timequantumid");

                pagination = 0;
                changeGoods();
                changeBackTime();
            }
        })

        $(".timeQuantumTab").each(function() {
            $(this).click(function() {
                timeSelectedNow = $(this).attr("idx");
                timeQuantumNow = $("#timeQuantumDiv1").children("div").eq(0).children().eq(timeSelectedNow).attr("timequantumid");

                pagination = 0;
                changeGoods();
                changeBackTime();
            });
        });

        $("#timeQuantum").children("input").eq(1).click(function() {

            if (timeSelectedNow < 8) {
                timeSelectedNow++;
                timeQuantumNow = $("#timeQuantumDiv1").children("div").eq(0).children().eq(timeSelectedNow).attr("timequantumid");

                pagination = 0;
                changeGoods();
                changeBackTime();
            }
        })
    } else if (msgObj.type == "getlastetOl") {    //获取最新订单信息
        var $showHonors = $("#showHonors");

        for (var i = 0; i < msgObj.content.res.length; i++) {
            var $li = $("<li>" + msgObj.content.res[i].user_id + "成功秒杀</li>");

            $li.appendTo($showHonors);
        }

        if ($showHonors.children().length > 11) {
            $showHonors.children().clone().appendTo($showHonors);
            var showHonorsTop = 0;

            var timer3 = setInterval(function() {
                showHonorsTop -= 1;

                if (parseInt($showHonors.css("top")) <= -parseInt($showHonors.css("height")) / 2) {
                    showHonorsTop = 0;
                }

                $showHonors.css("top", showHonorsTop + "px");
            }, 15);
        }
    } else if (msgObj.type == "getGoodInfo") {    //首页获取商品详情
        $("#showGoods").empty();

        for (var i = 0; i < msgObj.content.res.length; i++) {
            var $fdiv = $("<div class='showGoodInfo'></div>");
            $fdiv.attr("goodId", msgObj.content.res[i].good_id);
            $fdiv.click(function() {
                sessionStorage.HF170502_goodNow = $(this).attr("goodId");
                window.location.href = "goodDetails.html";
            });
            var $img = $("<img src='" + msgObj.content.res[i].path + "'>");

            var $sdiv = $("<div></div>");
            var $div1 = $("<div>" + msgObj.content.res[i].name + "</div>");
            var $div2 = $("<div></div>");
            var $span1 = $("<span>秒杀价：￥</span>");
            var $span2 = $("<span>" + msgObj.content.res[i].discount_price + "</span>");

            $div2.append($span1, $span2);
            $sdiv.append($div1, $div2);
            $fdiv.append($img, $sdiv);
            $fdiv.appendTo($("#showGoods"));
        }
    } else if (msgObj.type == "getPageNum") {    //获取商品分页信息
        $("#showBtn").empty();

        var $input = $("<input type='button' value='上一页'>");
        $input.click(function() {
            if (pagination > 0) {
                pagination--;

                changeGoods();
            }
        });

        $input.appendTo($("#showBtn"));

        for (var i = 0; i < msgObj.content.res; i++) {
            var $input = $("<input type='button' value='" + (i + 1) + "'>");
            $input.click(function() {
                pagination = $(this).val() - 1;

                changeGoods();
            });

            $input.appendTo($("#showBtn"));
        }

        var $input = $("<input type='button' value='下一页'>");

        $input.click(function() {
            if (pagination < $("#showBtn").children().length - 3) {
                pagination++;

                changeGoods();
            }
        });

        $input.appendTo($("#showBtn"));
    } else if (msgObj.type == "getBackTime") {    //获取首页倒计时信息
        if (msgObj.content.res == "wait") {
            $("#backTimeClock").prev().html("距离本场开始：");
        } else if (msgObj.content.res == "now") {
            $("#backTimeClock").prev().html("距离本场结束：");
        } else if (msgObj.content.res == "pass") {
            $("#backTimeClock").prev().html("本场秒杀已结束");
        }

        backTime.changeTime(msgObj.content.ms);
    } else if (msgObj.type == "getGoodDetails") {    //获取商品详情
        $("#productName").text(msgObj.content.res[0].name);
        $("#productIntroduction").text(msgObj.content.res[0].reduce);
        $(".lightSize:eq(0)").text(msgObj.content.res[0].original_price);
        $(".lightSize:eq(1)").text(msgObj.content.res[0].rest + " 件");
        $(".lightSize:eq(2)").text(msgObj.content.res[0].limit_num + " 件");
        $(".boldSize:eq(0)").text(msgObj.content.res[0].discount_price);
    } else if (msgObj.type == "getGoodImgs") {
        $("#showGoodImg").children(":eq(0)").attr("src", msgObj.content.res[0].path);
        $("#pageDetail").children("img:eq(0)").attr("src", msgObj.content.res[1].path);

        setTimeout(function() {
            $("#aboutGoods").css("height", (parseInt($("#pageDetail").height()) + 80) + "px");
        }, 10)
    } else if (msgObj.type == "secKill") {    //秒杀
        $("#waitingInterface").hide();
        $("#transMask").hide();
        canvasGame.reset();

        if (msgObj.content.res == "wait") {
            alert("该场秒杀还没开始");
        } else if (msgObj.content.res == "end") {
            alert("该场秒杀已经结束了");
        } else if (msgObj.content.res == "noAdd") {
            alert("您还没有默认地址，请到个人中心添加");
        } else if (msgObj.content.res == "buyed") {
            alert("您已经秒杀过该商品了，给别人留点机会吧");
        } else if (msgObj.content.res == "noRest") {
            alert("该商品已经秒杀完了");
        } else if (msgObj.content.res == "success") {
            alert("恭喜您秒杀成功了");
            if (confirm("是否前往我的订单付款？")) {
                sessionStorage.fromMyOrder = "true";
                window.location.href = "personalInfo.html";
            }
        }
    } else if (msgObj.type == "getMyInfo") {    //进入个人中心更新个人信息
        var $myInfoTab = $("#myInfoTab");
        var $muPurse = $("#myPurse");

        $myInfoTab.children(":eq(0)").children(":eq(0)").children(":eq(1)").html(msgObj.content.res[0].user_id);
        $myInfoTab.children(":eq(0)").children(":eq(1)").children(":eq(1)").children(":eq(0)").attr("value", msgObj.content.res[0].nickname);
        $myInfoTab.children(":eq(0)").children(":eq(2)").children(":eq(1)").children(":eq(0)").attr("value", msgObj.content.res[0].phone_num);
        $myInfoTab.children(":eq(0)").children(":eq(3)").children(":eq(1)").children(":eq(0)").attr("value", msgObj.content.res[0].mailbox);
        $muPurse.children(":eq(0)").text("当前钱包余额： ￥" + msgObj.content.res[0].balance);

    } else if (msgObj.type == "changeNickName") {
        if (msgObj.content.res == "success") {
            alert("修改成功");
            window.location.reload();
        }
    } else if (msgObj.type == "changePhoneNum") {
        if (msgObj.content.res == "success") {
            alert("修改成功");
            window.location.reload();
        }
    } else if (msgObj.type == "changeMailbox") {
        if (msgObj.content.res == "success") {
            alert("修改成功");
            window.location.reload();
        }
    } else if (msgObj.type == "getMyAdd") {    //获取个人地址信息
        $myInfoTab1 = $("#myInfoTab1");
        if (msgObj.content.res.length == 0) {
            $myInfoTab1.children(":eq(0)").children(":eq(0)").children(":eq(1)").text("您还未添加地址");
        } else {
            for (var i = 0; i < msgObj.content.res.length; i++) {
                if (msgObj.content.res[i].is_default == "true") {
                    $myInfoTab1.children(":eq(0)").children(":eq(0)").children(":eq(1)").text(msgObj.content.res[i].address);
                } else {
                    var $option = $("<option>" + msgObj.content.res[i].address + "</option>");
                    $option.attr("idx", msgObj.content.res[i].id)
                    $option.appendTo($("#restAddress"));
                }
            }
        }
    } else if (msgObj.type == "changeAddDefault") {    //修改默认地址
        if (msgObj.content.res == "success") {
            alert("修改默认地址成功");
            window.location.reload();
        }
    } else if (msgObj.type == "addNewAdd") {    //添加地址
        if (msgObj.content.res == "owned") {
            alert("该地址已存在");
        } else if (msgObj.content.res == "success") {
            alert("地址添加成功");
            window.location.reload();
        }
    } else if (msgObj.type == "recharge") {    //充值金额
        if (msgObj.content.res != "failed") {
            alert("充值成功");
            $("#myPurse").children(":eq(0)").text("当前钱包余额： ￥" + msgObj.content.res);
            $("#transMask").hide();
            $("#recharge").hide();
        }
    } else if (msgObj.type == "getMyNopayOl") {    //获取未付款订单
        if (msgObj.content.res.length != 0) {
            $("#nopayOl").empty();
        }

        for (var i = 0; i < msgObj.content.res.length; i++) {
            var $fdiv = $("<div class='olObj'></div>");
            var $img = $("<img src='" + msgObj.content.res[i].path + "'>");
            var $sdiv1 = $("<div></div>");
            var $ssdiv1 = $("<div>" + msgObj.content.res[i].name + "</div>");
            var $ssdiv2 = $("<div></div>");
            var $sssdiv1 = $("<div>原价： ￥" + msgObj.content.res[i].original_price + "</div>");
            var $sssdiv2 = $("<div>需支付： ￥" + msgObj.content.res[i].discount_price + "</div>");
            var $sssdiv3 = $("<div>数量： 1</div>");

            var $sdiv2 = $("<div></div>");
            var $input1 = $("<input type = 'button' value='支付'><br/>");
            $input1.attr("idx", msgObj.content.res[i].id);
            $input1.click(function() {
                var obj = {
                    type: "payment",
                    sender: "client",
                    receiver: "server",
                    content: {
                        olId: $(this).attr("idx")
                    }
                }

                client.send(JSON.stringify(obj));
            });

            var $input2 = $("<input type = 'button' value='取消订单'>");
            $input2.attr("idx", msgObj.content.res[i].id);
            $input2.click(function() {
                var obj = {
                    type: "cancalOl",
                    sender: "client",
                    receiver: "server",
                    content: {
                        olId: $(this).attr("idx")
                    }
                }

                client.send(JSON.stringify(obj));
            });
            $ssdiv2.append($sssdiv1, $sssdiv2, $sssdiv3);
            $sdiv2.append($input1, $input2);
            $sdiv1.append($ssdiv1, $ssdiv2);
            $fdiv.append($img, $sdiv1, $sdiv2);

            $fdiv.appendTo($("#noPayOl"));
        }
    } else if (msgObj.type == "getNoPayPageNum") {    //获取未付款订单分页信息
        $olNoPayPageBtn = $("#olNoPayPageBtn");
        $olNoPayPageBtn.empty();

        if (msgObj.content.res != 0) {
            var $input = $("<input type='button' value='上一页'>");
            $input.click(function() {
                if (noPayOlPageNow > 0) {
                    noPayOlPageNow--;

                    changeNoPay();
                }
            });
            $input.appendTo($olNoPayPageBtn);

            for (var i = 0; i < msgObj.content.res; i++) {
                var $input = $("<input type='button' value='" + (i + 1) + "'>");
                $input.click(function() {
                    noPayOlPageNow = $(this).val() - 1;

                    changeNoPay();
                });
                $input.appendTo($olNoPayPageBtn);
            }

            var $input = $("<input type='button' value='下一页'>");
            $input.click(function() {
                if (noPayOlPageNow < $olNoPayPageBtn.children().length - 3) {
                    noPayOlPageNow++;

                    changeNoPay();
                }
            });
            $input.appendTo($olNoPayPageBtn);
        }
    } else if (msgObj.type == "getMyPayedOl") {    //获取已付款订单信息
        if (msgObj.content.res.length != 0) {
            $("#payedOl").empty();
        }

        for (var i = 0; i < msgObj.content.res.length; i++) {
            var $fdiv = $("<div class='olObj1'></div>");
            var $img = $("<img src='" + msgObj.content.res[i].path + "'>");
            var $sdiv1 = $("<div></div>");
            var $ssdiv1 = $("<div>" + msgObj.content.res[i].name + "</div>");
            var $ssdiv2 = $("<div></div>");
            var $sssdiv1 = $("<div>价格： ￥" + msgObj.content.res[i].discount_price + "</div>");
            var $sssdiv2 = $("<div>数量： 1</div>");

            var $sdiv2 = $("<div></div>");
            var $input1 = $("<input type = 'button' value='继续购物'><br/>");
            $input1.click(function() {
                window.location.href = "homePage.html";
            });

            $ssdiv2.append($sssdiv1, $sssdiv2);
            $sdiv2.append($input1);
            $sdiv1.append($ssdiv1, $ssdiv2);
            $fdiv.append($img, $sdiv1, $sdiv2);
            $fdiv.appendTo($("#payedOl"));
        }
    } else if (msgObj.type == "getPayedPageNum") {    //获取已付款分页信息
        $olPayedPageBtn = $("#olPayedPageBtn");
        $olPayedPageBtn.empty();

        if (msgObj.content.res != 0) {
            var $input = $("<input type='button' value='上一页'>");
            $input.click(function() {
                if (payedOlPageNow > 0) {
                    payedOlPageNow--;

                    changePayed();
                }
            });

            $input.appendTo($olPayedPageBtn);

            for (var i = 0; i < msgObj.content.res; i++) {
                var $input = $("<input type='button' value='" + (i + 1) + "'>");
                $input.click(function() {
                    payedOlPageNow = $(this).val() - 1;

                    changePayed();
                });

                $input.appendTo($olPayedPageBtn);
            }

            var $input = $("<input type='button' value='下一页'>");

            $input.click(function() {
                if (payedOlPageNow < $olPayedPageBtn.children().length - 3) {
                    payedOlPageNow++;

                    changePayed();
                }
            });

            $input.appendTo($olPayedPageBtn);
        }
    } else if (msgObj.type == "payment") {    //商品购买
        if (msgObj.content.res == "overDue") {
            alert("该商品已过期");
        } else if (msgObj.content.res == "noMoney") {
            alert("您的余额不足");
        } else if (msgObj.content.res == "success") {
            alert("购买成功");

            sessionStorage.fromMyOrder = "true";
            window.location.reload();
        }
    } else if (msgObj.type == "cancalOl") {    //删除订单
        if (msgObj.content.res == "overDue") {
            alert("该商品已过期");
        } else if (msgObj.content.res == "success") {
            alert("取消成功");

            sessionStorage.fromMyOrder = "true";
            window.location.reload();
        }
    } else if (msgObj.type == "getBuyedRecords") {    //获取购买记录
        if (msgObj.content.res.length > 0) {
            var $pageRecord = $("#pageRecord");

            $pageRecord.children(":eq(2)").remove();

            var $table = $("<table id='bodyTable'></table>");

            for (var i = 0; i < msgObj.content.res.length; i++) {
                var $tr = $("<tr></tr>");
                var $td1 = $("<td>" + msgObj.content.res[i].user_id + "</td>");
                var $td2 = $("<td>" + msgObj.content.res[i].total + "</td>");
                var $td3 = $("<td>" + msgObj.content.res[i].discount_price + "</td>");
                var $td4 = $("<td>" + new Date(parseInt(msgObj.content.res[i].create_time)).toLocaleString().replace(/:\d{1,2}$/, ' ') + "</td>");

                $tr.append($td1, $td2, $td3, $td4);
                $table.append($tr);
            }

            $pageRecord.append($table);
        }
    } else if (msgObj.type == "getComment") {    //获取评论信息
        if (msgObj.content.res.length > 0) {
            var $pageComment = $("#pageComment");
            var $showComment = $("#showComment");

            $pageComment.children("p").remove();
            $showComment.empty();

            for (var i = 0; i < msgObj.content.res.length; i++) {
                var $fdiv = $("<div class='commentObj'></div>");
                var $sdiv1 = $("<div>" + msgObj.content.res[i].user_id + "</div>");
                var $sdiv2 = $("<div>" + (msgObj.content.len - commentPageNow * 15 - i) + "#</div>");
                var $sdiv3 = $("<div>" + msgObj.content.res[i].content + "</div>");
                var $sdiv4 = $("<div>发表于： " + new Date(parseInt(msgObj.content.res[i].create_time)).toLocaleString().replace(/:\d{1,2}$/, ' ') + "</div>");

                $fdiv.append($sdiv1, $sdiv2, $sdiv3, $sdiv4);
                $("#showComment").append($fdiv);
            }
        }
    } else if (msgObj.type == "getCommentPageNum") {    //获取评论分页信息
        if (msgObj.content.res > 0) {
            var $pageCommentBtn = $("#pageCommentBtn");
            $pageCommentBtn.empty();
            var $input = $("<input type='button' value='上一页'>");
            $input.click(function() {
                if (commentPageNow > 0) {
                    commentPageNow--;

                    changeComment();
                }
            });

            $input.appendTo($pageCommentBtn);

            for (var i = 0; i < msgObj.content.res; i++) {
                var $input = $("<input type='button' value='" + (i + 1) + "'>");
                $input.click(function() {
                    commentPageNow = $(this).val() - 1;

                    changeComment();
                });

                $input.appendTo($pageCommentBtn);
            }

            var $input = $("<input type='button' value='下一页'>");
            $input.click(function() {
                if (commentPageNow < $pageCommentBtn.children().length - 3) {
                    commentPageNow++;

                    changeComment();
                }
            });

            $input.appendTo($pageCommentBtn);

            $pageCommentBtn.children().click(function() {
                setTimeout(function() {
                    $("#aboutGoods").css("height", (parseInt($("#pageComment").height()) + 80) + "px");
                }, 10);
            });
        }
    } else if (msgObj.type == "sendComment") {    //发送评论
        if (msgObj.content.res == "nopay") {
            alert("您还没购买该商品（或尚未付款），无法发表评论");
        } else if (msgObj.content.res == "sended") {
            alert("您已经评论过了，请不要重复评论");
        } else if (msgObj.content.res == "tooShort") {
            alert("评论太短");
        } else if (msgObj.content.res == "tooLong") {
            alert("评论太长");
        } else if (msgObj.content.res == "success") {
            alert("评论成功");
            commentPageNow = 0;
            changeComment();
            addCommentBtn();
        } else {
            alert("nothing");
        }
    } else if (msgObj.type == "sendMsgToClient") {    //发送消息到客户端
        var $div = $("<div class='oneMsg'></div>");
        var $p = $("<p>客服" + msgObj.sender + "</p>");
        var $sdiv1 = $("<div>" + msgObj.content.content + "</div>");

        $div.append($p, $sdiv1);
        $("#showChatInfo").append($div);

        var div = document.getElementById('showChatInfo');
        div.scrollTop = div.scrollHeight;
    } else if (msgObj.type == "noService") {    //验证客服是否在线
        alert("很抱歉，暂时没有客服在线");
    } else if (msgObj.type == "getChatRecord") {    //获取聊天记录
        var $showMyChatRecord = $("#showMyChatRecord");

        if (msgObj.content.res.length != 0) {
            $showMyChatRecord.empty();

            for (var i = 0; i < msgObj.content.res.length; i++) {
                var $fdiv = $("<div class='chatRecordObj'></div>");
                var $sdiv1 = $("<div>客服号：" + msgObj.content.res[i].service_id + "</div>");
                var $sdiv2 = $("<div>" + msgObj.content.res[i].content + "</div>");
                var $sdiv3 = $("<div>" + new Date(parseInt(msgObj.content.res[i].create_time)).toLocaleString().replace(/:\d{1,2}$/, ' ') + "</div>");

                $fdiv.append($sdiv1, $sdiv2, $sdiv3);
                $showMyChatRecord.append($fdiv);
            }
        }
    } else if (msgObj.type == "getChatPageNum") {    //获取聊天记录分页
        var $chatRecordBtn = $("#chatRecordBtn");
        $chatRecordBtn.empty();

        if (msgObj.content.res != 0) {
            var $input = $("<input type='button' value='上一页'>");
            $input.click(function() {
                if (chatRecordPageNow > 0) {
                    chatRecordPageNow--;

                    changeChatRecord();
                }
            });
            $input.appendTo($chatRecordBtn);

            for (var i = 0; i < msgObj.content.res; i++) {
                var $input = $("<input type='button' value='" + (i + 1) + "'>");
                $input.click(function() {
                    chatRecordPageNow = $(this).val() - 1;

                    changeChatRecord();
                });
                $input.appendTo($chatRecordBtn);
            }

            var $input = $("<input type='button' value='下一页'>");
            $input.click(function() {
                if (chatRecordPageNow < $chatRecordBtn.children().length - 3) {
                    chatRecordPageNow++;

                    changeChatRecord();
                }
            });
            $input.appendTo($chatRecordBtn);
        }
    }
};
