function initalHomePage()
{
    $.ajax({
        type: "POST",
        url: '/home/access/initalHomePageH',
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            let dn=0;
            for (let i in json_data.doctor)
            {
                dn+=json_data.doctor[i];
            }
            let mn=0;
            for (let i in json_data.doctor)
            {
                mn+=json_data.medical[i];
            }
            $("#number1").html(dn);
            $("#number2").html(mn);
            var chart = Highcharts.chart('container', {
                chart: {
                    type: 'areaspline'
                },
                title: {
                    text: ''
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                xAxis: {
                    categories:json_data.categories,
                    plotBands: []
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' 单位'
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5
                    }
                },
                series: [{
                    name: '医生',
                    data: json_data.doctor
                }, {
                    name: '药物',
                    data: json_data.medical
                }]
            });

        },
        error: function () {
            console.log(this.error);
        }
    });

}

/**
 * 专属于hospital首页动态渲染
 */
function getDoctorAll(){
    $.ajax({
        type: "POST",
        url: '/home/accessRecord/getDoctorAll',
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            if(json_data.flag){
                $("#need2").text(json_data.data.doctor);
            }else alert("出错了")
        },
        error: function () {
            console.log(this.error);
        }
    });
}
/**
 * 专属于hospital管理医生信息用的
 */
function sendForPage() {
    $.ajax({
        type: "POST",
        url: '/home/accessRecord/get_data',
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            Get_data(JSON.parse(re_data));
            Nav_data(json_data, json_data.username);
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
            html += "<td>" + json_data[i].email + "</td>"
            html += "<td>" + json_data[i].name + "</td>"
            html += "<td>" + json_data[i].age + "</td>"
            html += "<td>" + json_data[i].sex + "</td>"
            html += "<td>" + json_data[i].idNum + "</td>"
            html += "<td>" + json_data[i].tel + "</td>"
            html += "<td>" + json_data[i].rank + "</td>"
            html += "<td>" + json_data[i].section + "</td>"
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
        url: '/home/accessRecord',
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

function searchEmail() {
    $.ajax({
        type: "POST",
        url: '/home/accessRecord/searchEmail',
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
                Nav_data(json_data.data,json_data.data.username);
            }else {
                alert("查无此人")
            }

        },
        error: function () {
            console.log(this.error);
        }
    });
}

function checkBox() {
    /**
     * 标题栏打钩所有的都打钩
     */
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
    let $elements = $('.singleClick');
    let idArr = [];
    $elements.each(function () {
        let $this = $(this);
        if ($this.prop('checked')) {
            idArr.push($this.prop('value'))
        }
    });
    return idArr
}

function deleteUser() {
    if ($("#checkBoxAll").prop('checked')) {
        /**
         * 全部删除
         */
        $.ajax({
            type: "POST",
            url: '/home/accessRecord/deleteUser',
            dataType: "html",
            cache: false,
            async: true,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (re_data) {
                alert("成功删除" + JSON.parse(re_data).status / 2 + "条数据");
                sendForPage();
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
                sendForPage();
                $("input[type='checkbox']").prop("checked", false);
            },
            error: function () {
                console.log(this.error);
            }
        });
    }
}

function getConstentHtml(idList) {
    let html = "出错了";
    let data;
    $.ajax({
        type: "POST",
        url: '/home/accessRecord/getData',
        data: {
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
    let height;
    if (data.flag) {
        html = '<table class="b">\n' +
            '        <tr><td class="t">姓名:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_name" type="text" value="' + data.username + '"></td></tr>\n' +
            '        <tr><td class="t">年龄:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_age" type="text" value="' + data.age + '"></td></tr>\n' +
            '        <tr><td class="t">性别:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_sex" type="text" value="' + data.sex + '"></td></tr>\n' +
            '        <tr><td class="t">身份证:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_ic" type="text" value="' + data.idNum + '"></td></tr>\n' +
            '        <tr><td class="t">联系电话:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_tel" type="text" value="' + data.tel + '"></td></tr>\n' +
            '        <tr><td class="t">所属医院:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_h" type="text" value="' + data.hospital + '"></td></tr>\n' +
            '        <tr><td class="t">部门:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_sect" type="text" value="' + data.section + '"></td></tr>\n' +
            '        <tr><td class="t">职称:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_rank" type="text" value="' + data.rank + '"></td></tr>\n' +
            '    </table>' +
            '<style> .t{ width: 20% ;margin-right: 10px;display: block ruby;} , .v{width: 60%}, .b tr { margin-bottom: 20px} .dialog-btn{margin-top: 50px;}</style>'
        height = 450
        return {html: html, height: height};
    }
}

function changeTheData() {
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
            url: '/home/accessRecord/changeData',
            data: {
                user_id: idList[0],
                user_data:data
            },
            dataType: "html",
            cache: false,
            async: false,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (re_data) {
                alert(JSON.parse(re_data).flag);
                sendForPage()
            },
            error: function () {
                console.log(this.error);
            }
        });
    });

}


