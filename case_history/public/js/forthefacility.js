function navbarHtml_admin(email)
{
    /**
     * 上面页眉
     * 输入：<nav id="facilityNav" class="nav navbar-default navbar-mystyle navbar-fixed-top"></nav>
     * @type {string}
     */
    let html=
        '    <div class="navbar-header">\n' +
        '        <button class="navbar-toggle" data-target=".navbar-collapse" data-toggle="collapse">\n' +
        '            <span class="icon-bar"></span>\n' +
        '            <span class="icon-bar"></span>\n' +
        '            <span class="icon-bar"></span>\n' +
        '        </button>\n' +
        '        <a class="navbar-brand mystyle-brand" href="/home"><span class="glyphicon glyphicon-home"></span></a></div>\n' +
        '    <div class="collapse navbar-collapse">\n' +
        '        <ul class="nav navbar-nav pull-right">\n' +
        '            <li class="li-border dropdown">' +
        '               <a class="mystyle-color" target="_blank" href="http://192.168.191.197:8080/#/">\n' +
        '                <span class="glyphicon glyphicon-search"></span> 查看区块链详情</a>\n' +
        '            </li>\n' +
        '            <li class="dropdown li-border"><a class="dropdown-toggle mystyle-color" data-toggle="dropdown" href="#">'+email+'<span\n' +
        '                    class="caret"></span></a>\n' +
        '                <ul class="dropdown-menu">\n' +
        '                    <li><a href="/logout">退出</a></li>\n' +
        '                </ul>\n' +
        '            </li>\n' +
        '            <li class="dropdown"><a class="dropdown-toggle mystyle-color" data-toggle="dropdown" href="#">换肤<span\n' +
        '                    class="caret"></span></a>\n' +
        '                <ul class="dropdown-menu changecolor">\n' +
        '                    <li id="blue"><a href="#">蓝色</a></li>\n' +
        '                    <li class="divider"></li>\n' +
        '                    <li id="green"><a href="#">绿色</a></li>\n' +
        '                    <li class="divider"></li>\n' +
        '                    <li id="orange"><a href="#">橙色</a></li>\n' +
        '                </ul>\n' +
        '            </li>\n' +
        '        </ul>\n' +
        '    </div>\n';
    return html;
}
function leftSelect_admin()
{
    /**
     * 左边选择栏
     * 输入：<div id="leftSelect" class="left-main left-full"></div>
     */
    return '<div class="sidebar-fold"><span class="glyphicon glyphicon-menu-hamburger"></span></div>\n' +
        '        <div class="subNavBox">\n' +
        '            <div class="sBox">\n' +
        '                <div class="subNav sublist-down"><span class="title-icon glyphicon glyphicon-chevron-down"></span><span\n' +
        '                        class="sublist-title">用户中心</span>\n' +
        '                </div>\n' +
        '                <ul  class="navContent" style="display:block">\n' +
        '                    <li id="li3">\n' +
        '                        <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>信息管理</div>\n' +
        '                        <a href="/home/identify"><span class="sublist-icon glyphicon glyphicon-credit-card"></span><span\n' +
        '                                class="sub-title">信息管理</span></a></li>\n' +
        // '                    <li id="li1">\n' +
        // '                        <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>策略审核</div>\n' +
        // '                        <a href="/home/access"><span class="sublist-icon glyphicon glyphicon-user"></span><span\n' +
        // '                                class="sub-title">策略审核</span></a></li>\n' +
        '                    <li id="li2">\n' +
        '                        <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>用户管理</div>\n' +
        '                        <a href="/home/caseNotes"><span class="sublist-icon glyphicon glyphicon-envelope"></span><span\n' +
        '                                class="sub-title">用户管理</span></a></li>\n' +
        '                </ul>\n' +
        '            </div>\n'

}
function navbarHtml_hospital(email)
{
    /**
     * 上面页眉
     * 输入：<nav id="facilityNav" class="nav navbar-default navbar-mystyle navbar-fixed-top"></nav>
     * @type {string}
     */
    let html=
        '    <div class="navbar-header">\n' +
        '        <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n' +
        '            <span class="icon-bar"></span>\n' +
        '            <span class="icon-bar"></span>\n' +
        '            <span class="icon-bar"></span>\n' +
        '        </button>\n' +
        '        <a class="navbar-brand mystyle-brand" href="/home"><span class="glyphicon glyphicon-home"></span></a> </div>\n' +
        '    <div class="collapse navbar-collapse">\n' +
        '        <ul class="nav navbar-nav pull-right">\n' +
        '            <li class="dropdown li-border"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">'+email+'<span class="caret"></span></a>\n' +
        '                <ul class="dropdown-menu">\n' +
        '                    <li><a href="/logout">退出</a></li>\n' +
        '                </ul>\n' +
        '            </li>\n' +
        '            <li class="dropdown"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">换肤<span class="caret"></span></a>\n' +
        '                <ul class="dropdown-menu changecolor">\n' +
        '                    <li id="blue"><a href="#">蓝色</a></li>\n' +
        '                    <li class="divider"></li>\n' +
        '                    <li id="green"><a href="#">绿色</a></li>\n' +
        '                    <li class="divider"></li>\n' +
        '                    <li id="orange"><a href="#">橙色</a></li>\n' +
        '                </ul>\n' +
        '            </li>\n' +
        '        </ul>\n' +
        '    </div>\n'
    return html;
}
function leftSelect_hospital()
{
    /**
     * 左边选择栏
     * 输入：<div id="leftSelect" class="left-main left-full"></div>
     */
    return '<div class="sidebar-fold"><span class="glyphicon glyphicon-menu-hamburger"></span></div>\n' +
        '        <div class="subNavBox">\n' +
        '            <div class="sBox">\n' +
        '                <div class="subNav sublist-down"><span class="title-icon glyphicon glyphicon-chevron-down"></span><span\n' +
        '                        class="sublist-title">用户中心</span>\n' +
        '                </div>\n' +
        '                <ul class="navContent" style="display:block">\n' +
        '                    <li id="li4">\n' +
        '                        <div class="showtitle" style="width:100px;">\n' +
        '                            <img src="../img/leftimg.png"/>信息管理\n' +
        '                        </div>\n' +
        '                        <a href="/home/identify">\n' +
        '                            <span class="sublist-icon glyphicon glyphicon-credit-card"></span>\n' +
        '                            <span class="sub-title">信息管理</span></a></li>\n' +
        '                    <li id="li2">\n' +
        '                        <div class="showtitle" style="width:100px;">\n' +
        '                            <img src="../img/leftimg.png"/>医生管理\n' +
        '                        </div>\n' +
        '                        <a href="/home/accessRecord">\n' +
        '                            <span class="sublist-icon glyphicon glyphicon-envelope"></span>\n' +
        '                            <span class="sub-title">医生管理</span></a></li>\n' +
        '                    <li id="li3">\n' +
        '                        <div class="showtitle" style="width:100px;">\n' +
        '                            <img src="../img/leftimg.png"/>药物管理\n' +
        '                        </div>\n' +
        '                        <a href="/home/caseNotes">\n' +
        '                            <span class="sublist-icon glyphicon glyphicon-bullhorn"></span>\n' +
        '                            <span class="sub-title">药物管理</span></a></li>\n' +
        '                </ul>\n' +
        '            </div>\n'
}
function navbarHtml_patient(email)
{
    /**
     * 上面页眉
     * 输入：<nav id="facilityNav" class="nav navbar-default navbar-mystyle navbar-fixed-top"></nav>
     * @type {string}
     */
    let html=
        '    <div class="navbar-header">\n' +
        '        <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n' +
        '            <span class="icon-bar"></span>\n' +
        '            <span class="icon-bar"></span>\n' +
        '            <span class="icon-bar"></span>\n' +
        '        </button>\n' +
        '        <a class="navbar-brand mystyle-brand" href="/home"><span class="glyphicon glyphicon-home"></span></a> </div>\n' +
        '    <div class="collapse navbar-collapse">\n' +
        '        <ul class="nav navbar-nav pull-right">\n' +
        '            <li class="dropdown li-border"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">'+email+'<span class="caret"></span></a>\n' +
        '                <ul class="dropdown-menu">\n' +
        '                    <li><a href="/logout">退出</a></li>\n' +
        '                </ul>\n' +
        '            </li>\n' +
        '            <li class="dropdown"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">换肤<span class="caret"></span></a>\n' +
        '                <ul class="dropdown-menu changecolor">\n' +
        '                    <li id="blue"><a href="#">蓝色</a></li>\n' +
        '                    <li class="divider"></li>\n' +
        '                    <li id="green"><a href="#">绿色</a></li>\n' +
        '                    <li class="divider"></li>\n' +
        '                    <li id="orange"><a href="#">橙色</a></li>\n' +
        '                </ul>\n' +
        '            </li>\n' +
        '        </ul>\n' +
        '    </div>\n'
    return html;
}
function leftSelect_patient()
{
    /**
     * 左边选择栏
     * 输入：<div id="leftSelect" class="left-main left-full"></div>
     */
    return '        <div class="sidebar-fold"><span class="glyphicon glyphicon-menu-hamburger"></span></div>\n' +
        '        <div class="subNavBox">\n' +
        '            <div class="sBox">\n' +
        '                <div class="subNav sublist-down"><span class="title-icon glyphicon glyphicon-chevron-down"></span><span\n' +
        '                        class="sublist-title">用户中心</span>\n' +
        '                </div>\n' +
        '                <ul class="navContent" style="display:block">\n' +
        '                    <li id="li4">\n' +
        '                        <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>信息管理</div>\n' +
        '                        <a href="/home/identify"><span class="sublist-icon glyphicon glyphicon-credit-card"></span><span\n' +
        '                                class="sub-title">信息管理</span></a></li>\n' +
        '                    <li id="li2">\n' +
        '                        <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>访问记录</div>\n' +
        '                        <a href="/home/accessRecord"><span class="sublist-icon glyphicon glyphicon-envelope"></span><span\n' +
        '                                class="sub-title">访问记录</span></a></li>\n' +
        '                    <li id="li3">\n' +
        '                        <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>病例记录</div>\n' +
        '                        <a href="/home/caseNotes"><span class="sublist-icon glyphicon glyphicon-bullhorn"></span><span\n' +
        '                                class="sub-title">病例记录</span></a></li>\n' +
        '                    <li id="li1">\n' +
        '                        <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>访问控制</div>\n' +
        '                        <a href="/home/access"><span class="sublist-icon glyphicon glyphicon-user"></span><span\n' +
        '                                class="sub-title">访问控制</span></a></li>\n' +
        '                </ul>\n' +
        '            </div>\n'
}
function navbarHtml_doctor(email)
{
    /**
     * 上面页眉
     * 输入：<nav id="facilityNav" class="nav navbar-default navbar-mystyle navbar-fixed-top"></nav>
     * @type {string}
     */
    let html=
        '    <div class="navbar-header">\n' +
        '        <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n' +
        '            <span class="icon-bar"></span>\n' +
        '            <span class="icon-bar"></span>\n' +
        '            <span class="icon-bar"></span>\n' +
        '        </button>\n' +
        '        <a class="navbar-brand mystyle-brand" href="/home"><span class="glyphicon glyphicon-home"></span></a> </div>\n' +
        '    <div class="collapse navbar-collapse">\n' +
        '        <ul class="nav navbar-nav pull-right">\n' +
        '            <li class="dropdown li-border"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">'+email+'<span class="caret"></span></a>\n' +
        '                <ul class="dropdown-menu">\n' +
        '                    <li><a href="/logout">退出</a></li>\n' +
        '                </ul>\n' +
        '            </li>\n' +
        '            <li class="dropdown"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">换肤<span class="caret"></span></a>\n' +
        '                <ul class="dropdown-menu changecolor">\n' +
        '                    <li id="blue"><a href="#">蓝色</a></li>\n' +
        '                    <li class="divider"></li>\n' +
        '                    <li id="green"><a href="#">绿色</a></li>\n' +
        '                    <li class="divider"></li>\n' +
        '                    <li id="orange"><a href="#">橙色</a></li>\n' +
        '                </ul>\n' +
        '            </li>\n' +
        '        </ul>\n' +
        '    </div>\n'
    return html;
}
function leftSelect_doctor()
{
    /**
     * 左边选择栏
     * 输入：<div id="leftSelect" class="left-main left-full"></div>
     */
    return '    <div class="sidebar-fold"><span class="glyphicon glyphicon-menu-hamburger"></span></div>\n' +
        '    <div class="subNavBox">\n' +
        '      <div class="sBox">\n' +
        '       <div class="subNav sublist-down"><span class="title-icon glyphicon glyphicon-chevron-down"></span><span class="sublist-title">用户中心</span>\n' +
        '        </div>\n' +
        '          <ul class="navContent" style="display:block">\n' +
        '              <li id="li3">\n' +
        '                  <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>信息管理</div>\n' +
        '                  <a href="/home/identify"><span class="sublist-icon glyphicon glyphicon-credit-card"></span><span\n' +
        '                          class="sub-title">信息管理</span></a></li>\n' +
        '              <li id="li2">\n' +
        '                  <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>添加病历</div>\n' +
        '                  <a href="/home/caseNotes"><span class="sublist-icon glyphicon glyphicon-bullhorn"></span><span\n' +
        '                          class="sub-title">添加病历</span></a></li>\n' +
        '              <li id="li1">\n' +
        '                  <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>访问病历</div>\n' +
        '                  <a href="/home/accessRecord"><span class="sublist-icon glyphicon glyphicon-envelope"></span><span\n' +
        '                          class="sub-title">访问病历</span></a></li>\n' +
        '          </ul>\n' +
        '      </div>\n'
}
function navbarHtml_visitor(email)
{
    /**
     * 上面页眉
     * 输入：<nav id="facilityNav" class="nav navbar-default navbar-mystyle navbar-fixed-top"></nav>
     * @type {string}
     */
    let html=
        '    <div class="navbar-header">\n' +
        '        <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n' +
        '            <span class="icon-bar"></span>\n' +
        '            <span class="icon-bar"></span>\n' +
        '            <span class="icon-bar"></span>\n' +
        '        </button>\n' +
        '        <a class="navbar-brand mystyle-brand" href="/home"><span class="glyphicon glyphicon-home"></span></a> </div>\n' +
        '    <div class="collapse navbar-collapse">\n' +
        '        <ul class="nav navbar-nav pull-right">\n' +
        '            <li class="dropdown li-border"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">'+email+'<span class="caret"></span></a>\n' +
        '                <ul class="dropdown-menu">\n' +
        '                    <li><a href="/logout">退出</a></li>\n' +
        '                </ul>\n' +
        '            </li>\n' +
        '            <li class="dropdown"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">换肤<span class="caret"></span></a>\n' +
        '                <ul class="dropdown-menu changecolor">\n' +
        '                    <li id="blue"><a href="#">蓝色</a></li>\n' +
        '                    <li class="divider"></li>\n' +
        '                    <li id="green"><a href="#">绿色</a></li>\n' +
        '                    <li class="divider"></li>\n' +
        '                    <li id="orange"><a href="#">橙色</a></li>\n' +
        '                </ul>\n' +
        '            </li>\n' +
        '        </ul>\n' +
        '    </div>\n'
    return html;
}
function leftSelect_visitor()
{
    /**
     * 左边选择栏
     * 输入：<div id="leftSelect" class="left-main left-full"></div>
     */
    return ' <div class="left-main left-full">\n' +
        '        <div class="sidebar-fold"><span class="glyphicon glyphicon-menu-hamburger"></span></div>\n' +
        '        <div class="subNavBox">\n' +
        '            <div class="sBox">\n' +
        '                <div class="subNav sublist-down"><span class="title-icon glyphicon glyphicon-chevron-down"></span><span\n' +
        '                        class="sublist-title">用户中心</span>\n' +
        '                </div>\n' +
        '                <ul class="navContent" style="display:block">\n' +
        '                    <li id="li2">\n' +
        '                        <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>信息管理</div>\n' +
        '                        <a href="/home/identify"><span class="sublist-icon glyphicon glyphicon-credit-card"></span><span\n' +
        '                                class="sub-title">信息管理</span></a></li>\n' +
        '                    <li id="li1">\n' +
        '                        <div class="showtitle" style="width:100px;"><img src="../img/leftimg.png"/>访问病例</div>\n' +
        '                        <a href="/home/caseNotes"><span class="sublist-icon glyphicon glyphicon-bullhorn"></span><span\n' +
        '                                class="sub-title">访问病例</span></a></li>\n' +
        '                </ul>\n' +
        '            </div>\n'
}
function timeTip()
{
    /**
     * 放在首页的时间控件
     */
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var h = myDate.getHours();//获取当前小时数(0-23)
    var m = myDate.getMinutes();//获取当前分钟数(0-59)
    var s = myDate.getSeconds();//获取当前秒
    var week = myDate.getDay();
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    $("#week").text(weeks[week]);
    $("#moonDay").html(
        '<span>'+year+'</span>年'+mon+'月'+date+'日')
    if(m<10)
    {
        $("#hour").text(h+":0"+m)
    }else
    {
        $("#hour").text(h+":"+m)
    }

}
function sendForQr()
{
    $.ajax({
        type: "GET",
        url: '/home/create_qrcode',
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            $("#qr").html(re_data);
        },
        error: function () {
            console.log(this.error);
        }
    });
}