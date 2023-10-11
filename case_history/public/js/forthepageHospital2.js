/**
 * 专属于hospital首页动态渲染
 */
function searchName() {
    /**
     * 搜索部分的
     */
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/searchName',
        data: {
            name: $("#name_input").val()
        },
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            if(json_data.flag)
            {
                Get_data(json_data);
                Nav_data(json_data, "medical");
            }else {
                alert("药物暂无")
            }

        },
        error: function () {
            console.log(this.error);
        }
    });
}
/**
 * 请求药物信息
 */
function sendForPage() {
    $.ajax({
        type: "POST",
        url: '/home/accessRecord/getMedicalAll',
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);
            Get_data(JSON.parse(re_data));
            Nav_data(json_data, "medical");
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
    let html = "";
    for (i in json_data) {
        if (json_data[i].id != undefined) {
            html += '<tr>';
            html += "<td><input value='" + json_data[i].id + "' class='singleClick' type='checkbox' /></td>"
            html += "<td>" + json_data[i].name + "</td>"
            html += "<td>" + json_data[i].unit + "</td>"
            html += "<td>" + json_data[i].price + "</td>"
            html += "<td>" + json_data[i].prescription + "</td>"
            html += "<td>" + json_data[i].middleClass + "</td>"
            html += "</tr>";
        }
    }
    $("#dataString").html(html);
}
/**
 * 渲染下方分页
 * @type {string}
 */
function Nav_data(json_data, user_) {
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
/**
 * 标题栏打钩所有的都打钩
 */
function checkBox() {
    let arr = $("input[class='singleClick']");
    if (arr.prop("checked")) {
        arr.prop("checked", false);
        $("#checkBoxAll").prop("checked", false);
    } else {
        arr.prop("checked", true);
        $("#checkBoxAll").prop("checked", true);
    }
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
    return idArr;
}

function deleteMedical() {
    if ($("#checkBoxAll").prop('checked')) {
        /**
         * 全部删除
         */
        $.ajax({
            type: "POST",
            url: '/home/accessRecord/deleteMedical',
            dataType: "html",
            cache: false,
            async: true,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (re_data) {
                alert("成功删除" + JSON.parse(re_data).status+ "条数据");
                $("#dataString").html("");
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
            url: '/home/accessRecord/deleteMedicalOne',
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
function getConstentHtml() {
    let  height = 340;
    let html = '<table class="b">\n' +
            '        <tr><td class="t">名称:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_name" type="text" ></td></tr>\n' +
            '        <tr><td class="t">基本单位:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_unit" type="text" ></td></tr>\n' +
            '        <tr><td class="t">单价:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_price" type="text"></td></tr>\n' +
            '        <tr><td class="t">处方药（是否）:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_prescription" type="text"></td></tr>\n' +
            '        <tr><td class="t">科室:</td><td class="v"><input style="margin-bottom: 5px;" class="form-control ro_" name="change_middleClass" type="text"></td></tr>\n' +
            '    </table>' +
            '<style> .t{ width: 20% ;margin-right: 10px;display: block ruby;} , .v{width: 60%}, .b tr { margin-bottom: 20px}</style>'
    return {html: html, height: height};
}

/**
 * 点击详情添加一条数据
 */
function changeTheData() {
    $(".dialog-btn-confirm").click(function () {
        let data = {};
        $('.b input').each(function() {
            let valueList = $(this).val();
            let keyList = $(this).prop("name");
            data[keyList] = valueList
        });
        $.ajax({
            type: "POST",
            url: '/home/accessRecord/insertOneData',
            data: {
                data: data
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
