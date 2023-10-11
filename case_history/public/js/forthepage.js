/**
 * 专属于admin首页动态渲染
 */
function getAll(){
    $.ajax({
        type: "POST",
        url: '/home/accessRecord/getAll',
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            if(json_data.flag) {
                $("#need1").text(json_data.data.hospital);
                $("#need2").text(json_data.data.doctor);
                $("#need3").text(json_data.data.patient);
                $("#need4").text(json_data.data.accessor);
            } else alert("出错了");
            var chart = Highcharts.chart('container',{
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: ['医院','医生','病人','访问者'],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '注册数（个）'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        borderWidth: 0
                    }
                },
                series: [{
                    name: '注册用户',
                    data: [json_data.data.hospital,json_data.data.doctor,json_data.data.patient,json_data.data.accessor]
                }]
            });
        },
        error: function () {
            console.log(this.error);
        }
    });
}
/**
 * 专属于admin管理用户信息用的
 */
function sendForPage(user_type) {
    /**
     * 发送POST请求，请求的是第一页的数据
     */
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/get_data',
        data: {
            userType: user_type
        },
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            Get_data(json_data);
            Nav_data(json_data, user_type);
        },
        error: function () {
            console.log(this.error);
        }
    });
}

function Get_data(json_data) {
    /**
     * 渲染列表数据
     * @type {string}
     */
    $("input[type='checkbox']").prop("checked", false);
    $("#email_input").val("");
    $("#dataString").html("");
    html = "";
    for (i in json_data) {
        if (json_data[i].id != undefined) {
            html += '<tr>';
            html += "<td><input value='" + json_data[i].id + "' class='singleClick' type='checkbox' /></td>"
            // html += "<td>" + json_data[i].id + "</td>"
            html += "<td>" + json_data[i].email + "</td>"
            html += "<td>" + json_data[i].username + "</td>"
            // html += "<td>" + json_data[i].password + "</td>"
            html += "<td>" + json_data[i].tel + "</td>"
            html += "</tr>";
        }
    }
    $("#dataString").html(html);
}

function Nav_data(json_data, user_) {
    /**
     * 渲染下方分页
     * @type {string}
     */

    let navhtml = `<li><a onclick="navOneClick('` + user_ + `',1)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
    for (let i = 1; json_data["total"] >= i; ++i) {
        navhtml += `<li><a onclick="navOneClick('` + user_ + `',` + i.toString() + `)">` + i.toString() + `</a></li>`;
    }
    navhtml += `<li><a onclick="navOneClick('` + user_ + `',` + json_data["total"] + `)" aria-label="Next"><span aria-hidden="true">&raquo;</span></li>`;
    $("#nav").html(navhtml);
}

function navOneClick(user_, page) {
    /**
     * 设置分页动作
     */
    $.ajax({
        type: "GET",
        url: '/home/caseNotes',
        data: {
            page: page,
            userType: user_
        },
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            Get_data(json_data);
            Nav_data(json_data, user_);
        },
        error: function () {
            console.log(this.error);
        }
    });
}

function getUser() {
    let user_;
    switch ($("#title").text()) {
        case "患者记录":
            user_ = "patient";
            break;
        case "访问者记录":
            user_ = "accessor";
            break;
        default:
            user_ = "hospital";
            break;
    }
    return user_;
}

function searchEmail() {
    /**
     * 搜索部分的
     */
    let user_ = getUser();
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/searchEmail',
        data: {
            email: $("#email_input").val()
        },
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            console.log(json_data)
            if(json_data.flag)
            {
                Get_data(json_data.data);
                Nav_data(json_data.data, user_);
            }else
            {
                alert("查无此人")
            }

        },
        error: function () {
            console.log(this.error);
        }
    });
}

function checkBox() {
    $("#checkBoxAll").click(function () {
        let arr = $("input[class='singleClick']");
        if (arr.prop("checked")) {
            arr.prop("checked", false);
            $("#checkBoxAll").prop("checked", false);
        } else {
            arr.prop("checked", true);
            $("#checkBoxAll").prop("checked", true);
        }
    })
}

function getEachChick() {
    var $elements = $('.singleClick');
    let idArr = [];
    $elements.each(function () {
        var $this = $(this);
        if ($this.prop('checked')) {
            idArr.push($this.prop('value'))
        }
    });
    return idArr
}

function deleteUser() {
    let user_ = getUser()
    if ($("#checkBoxAll").prop('checked')) {
        /**
         * 全部删除
         */
        $.ajax({
            type: "POST",
            url: '/home/caseNotes/deleteUser',
            data: {
                user_type: user_
            },
            dataType: "html",
            cache: false,
            async: true,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (re_data) {
                console.log(re_data)
                if (user_ == "hospital") {
                    alert("成功删除" + JSON.parse(re_data).status + "条数据");
                } else {
                    alert("成功删除" + JSON.parse(re_data).status / 2 + "条数据");
                }
                sendForPage(user_);
                $("input[type='checkbox']").prop("checked", false);
            },
            error: function () {
                console.log(this.error);
            }
        });
    } else {
        /**
         * 一条一条删除
         */
        let idArr = getEachChick();
        $.ajax({
            type: "POST",
            url: '/home/caseNotes/deleteUserOne',
            data: {
                idList: idArr
            },
            dataType: "html",
            cache: false,
            async: true,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (re_data) {
                alert("成功删除" + JSON.parse(re_data).status + "条数据");
                sendForPage(user_);
                $("input[type='checkbox']").prop("checked", false);
            },
            error: function () {
                console.log(this.error);
            }
        });
    }
}

function getConstentHtml(idList) {
    let user_ = getUser();
    let html = "出错了";
    let data;
    $.ajax({
        type: "POST",
        url: '/home/access/getData',
        data: {
            user_type: user_,
            user_id: idList[0]
        },
        dataType: "html",
        cache: false,
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            data = JSON.parse(re_data);
        },
        error: function () {
            console.log(this.error);
        }
    });
    let height,width,title;
    if (data.flag) {
        switch (user_) {
            case "hospital": {
                html = '<table class="b">\n' +
                    '        <tr><td class="t">名称:</td><td class="v">' +
                    '           <input style="margin-bottom: 5px;" class="form-control ro_" name="change_name" type="text" value="' + data.username + '"></td></tr>\n' +
                    '        <tr><td class="t">邮箱:</td><td class="v">' +
                    '           <input style="margin-bottom: 5px;" class="form-control ro_" name="change_email" type="text" value="' + data.email + '"></td></tr>\n' +
                    '        <tr><td class="t">电话:</td><td class="v">' +
                    '           <input style="margin-bottom: 5px;" class="form-control ro_" name="change_tel" type="text" value="' + data.tel + '"></td></tr>\n' +
                    '    </table>' +
                    '<style>' +
                    '.dialog-btn{ padding: 0px;} ' +
                    '.t{ width: 10%;} ' +
                    '.v{width: 60%} ' +
                    '.b tr{ margin-bottom: 20px}' +
                    '</style>'
                height = 250;
                width = 280;
                title="医院信息";
                break;
            }
            case "patient": {
                html = '<table class="b">\n' +
                    '        <tr><td class="t">姓名:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_name" type="text" value="' + data.username + '"></td></tr>\n' +
                    '        <tr><td class="t">年龄:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_age" type="text" value="' + data.age + '"></td></tr>\n' +
                    '        <tr><td class="t">性别:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_sex" type="text" value="' + data.sex + '"></td></tr>\n' +
                    '        <tr><td class="t">联系电话:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_tel" type="text" value="' + data.tel + '"></td></tr>\n' +
                    '        <tr><td class="t">居住地:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_r" type="text" value="' + data.residence + '"></td></tr>\n' +
                    '        <tr><td class="t">工作单位:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_c" type="text" value="' + data.company + '"></td></tr>\n' +
                    '</table>' +
                    '<style> ' +
                    '.t{ width: 20%} ' +
                    '.v{width: 60%} ' +
                    '.b tr { margin-bottom: 20px} ' +
                    '.dialog-btn{margin-top: 55px;padding: 0px}</style>'
                height = 350;
                width = 300;
                title = "患者信息";
                break;
            }
            case "accessor": {
                console.log(data)
                html = '<table class="b">\n' +
                    '        <tr><td class="t">姓名:</td><td class="v">' +
                    '<input style="margin-bottom: 5px;" class="form-control ro_" name="change_name" type="text" value="' + data.username + '"></td></tr>\n' +
                    '        <tr><td class="t">联系电话:</td><td class="v">' +
                    '<input style="margin-bottom: 5px;" class="form-control ro_" name="change_tel" type="text" value="' + data.tel + '"></td></tr>\n' +
                    '        <tr><td class="t">身份证:</td><td class="v">' +
                    '<input style="margin-bottom: 5px;" class="form-control ro_" name="change_ic" type="text" value="' + data.idNum + '"></td></tr>\n' +
                    '        <tr><td class="t">工作单位:</td><td class="v">' +
                    '<input style="margin-bottom: 5px;" class="form-control ro_" name="change_w" type="text" value="' + data.workplace + '"></td></tr>\n' +
                    '</table>' +
                    '<style> ' +
                    '.t{ width: 20%;} ' +
                    '.v{width: 60%}' +
                    '.b tr { margin-bottom: 20px}</style>'
                height = 280;
                width = 280;
                title = "访问者信息";
                break;
            }
        }
        return {"html": html, "height": height,"width":width,"title":title};
    }
}

function changeTheData() {
    let user_type = getUser();
    let idList = getEachChick();
    $(".dialog-btn-confirm").click(function () {
        let data = {};
        $('.b input').each(function() {
            let valueList = $(this).val();
            let keyList = $(this).prop("name");
            data[keyList] = valueList
        });
        $.ajax({
            type: "POST",
            url: '/home/access/changeData',
            data: {
                user_type: user_type,
                user_id: idList[0],
                user_data:data
            },
            dataType: "html",
            cache: false,
            async: false,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (re_data) {
                alert(JSON.parse(re_data).flag);
                sendForPage(user_type)
            },
            error: function () {
                console.log(this.error);
            }
        });
    });

}


