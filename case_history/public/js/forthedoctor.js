function initalHomePage()
{
    $.ajax({
        type: "POST",
        url: '/home/access/initalHomePageD',
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            let an=0;
            for (let i in json_data.ahi)
            {
                an+=json_data.ahi[i];
            }
            let en=0;
            for (let i in json_data.emr)
            {
                en+=json_data.emr[i];
            }
            $("#number1").html(en);
            $("#number2").html(an);
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
                    name: '病历',
                    data: json_data.emr
                }, {
                    name: '访问',
                    data: json_data.ahi
                }]
            });

        },
        error: function () {
            console.log(this.error);
        }
    });

}

let json_data;//保存的是医生和病人的个人信息
let html2="<h3>请刷新界面</h3>";
let htmlRight="";
let oldHtmlData="";
let idArr = [];
let htmld='<main class="main flex-row-wrap">\n' +
    '    <section class="main__camera">\n' +
    '        <h2 class="main__title">请将二维码置于镜头前</h2>\n' +
    '        <p class="main__hint">请确保当前设备的摄像头处于可用状态</p>\n' +
    '        <div id="open-power" class="main__camera-power flex-center">\n' +
    '        <span class="main__camera-power--span">\n' +
    '            <img src="../paizhaopage/img/camera.png" alt="power" />\n' +
    '        </span>\n' +
    '            <p class="main__camera-power--hint">请开启摄像头调用权限</p>\n' +
    '        </div>\n' +
    '        <button id="main__confirm" class="main__camera-confirm flex-center">\n' +
    '            <img class="main__camera-confirm--img" src="../paizhaopage/img/photo.png" alt="photograph">\n' +
    '        </button>\n' +
    '    </section>\n' +
    '    <section class="main__upload">\n' +
    '        <h2 class="main__title">患者信息</h2>\n' +
    '         <div id="pinfo" class="col-md-10">\n' +
    '             <table  class="table table-bordered table-header" style="width: 100%;position: absolute;margin-top: 10%;margin-left: 6%"></table>\n' +
    '         </div>\n' +
    '    </section>\n' +
    '</main>'+
    '<script src="../paizhaopage/js/webcam.js" type="text/javascript" charset="utf-8"></script>\n' +
    '<script src="../paizhaopage/js/jquery.min.js"></script>\n' +
    '<script src="../paizhaopage/js/cropbox.js" type="text/javascript" charset="utf-8"></script>\n' +
    '<link href="../paizhaopage/webCan.css" rel="stylesheet" title="" type="text/css" />\n' +
    '<script src="../js/webCame.js"></script>'
function sendForPage_d(choose){
    switch (choose)
    {
        case "choose1":
        {
            $("#defaultPage").html(htmld)
            break;
        }
        case "choose2":
        {
            $("#defaultPage").html("")
            $.ajax({
                type: "POST",
                url: '/home/caseNotes/getPageChoose2',
                data:{
                    "email" :$("#reEmail").text()
                },
                dataType: "html",
                cache: false,
                async: false,
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                success: function (re_data) {
                    json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
                    if(json_data.flag)
                    {
                        html2='<div class="col-md-4">\n' +
                            '    <div class="pull-left">\n' +
                            '        <h6>患者信息：</h6>\n' +
                            '        <table class="table table-bordered table-header">\n' +
                            '            <tr>\n' +
                            '                <td class="thread2">姓名</td>\n' +
                            '                <td>'+json_data.nameP+'</td>\n' +
                            '                <td class="thread2">性别</td>\n' +
                            '                <td>'+json_data.sexP+'</td>\n' +
                            '            </tr>\n' +
                            '            <tr>\n' +
                            '                <td class="thread2">年龄</td>\n' +
                            '                <td>'+json_data.age+'</td>\n' +
                            '                <td class="thread2">生日</td>\n' +
                            '                <td>'+json_data.birthP+'</td>\n' +
                            '            </tr>\n' +
                            '            <tr>\n' +
                            '                <td class="thread2">身份证</td>\n' +
                            '                <td>'+json_data.idNumP+'</td>\n' +
                            '                <td class="thread2">电话</td>\n' +
                            '                <td>'+json_data.telP+'</td>\n' +
                            '            </tr>\n' +
                            '            <tr>\n' +
                            '                <td class="thread2">现居地</td>\n' +
                            '                <td>'+json_data.residenceP+'</td>\n' +
                            '                <td class="thread2">公司</td>\n' +
                            '                <td>'+json_data.companyP+'</td>\n' +
                            '            </tr>\n' +
                            '            </tbody>\n' +
                            '        </table>\n' +
                            '        <h6>医生信息：</h6>\n' +
                            '        <table class="table table-bordered table-header">\n' +
                            '            <tr>\n' +
                            '                <td class="thread2">姓名</td>\n' +
                            '                <td>'+json_data.name+'</td>\n' +
                            '                <td class="thread2">身份证</td>\n' +
                            '                <td>'+json_data.idNum+'</td>\n' +
                            '            </tr>\n' +
                            '            <tr>\n' +
                            '                <td class="thread2">电话</td>\n' +
                            '                <td>'+json_data.tel+'</td>\n' +
                            '                <td class="thread2">医院</td>\n' +
                            '                <td>'+json_data.hospital+'</td>\n' +
                            '            </tr>\n' +
                            '            <tr>\n' +
                            '                <td class="thread2">科室</td>\n' +
                            '                <td>'+json_data.section+'</td>\n' +
                            '                <td class="thread2">职称</td>\n' +
                            '                <td>'+json_data.rank+'</td>\n' +
                            '            </tr>\n' +
                            '        </table>\n' +
                            '    </div>\n' +
                            '    <div class="pull-left">\n' +
                            '        <h6>病例编号：'+json_data.uuid+'</h6>\n' +
                            '    </div>\n' +
                            '    <div class="pull-right">\n' +
                            '        <button class="btn btn-mystyle btn-sm" type="button"\n' +
                            '                onclick="submeit_d()">生成\n' +
                            '        </button>\n' +
                            // '        <button class="btn btn-mystyle btn-sm" type="button"\n' +
                            // '                onclick="setReadonly_();">修改\n' +
                            // '        </button>\n' +
                            '    </div>\n' +
                            '    <div class="pull-left panel-body">\n' +
                            '        <img id="qr" src="" style="margin: 20px;"/>\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="col-md-8">\n' +
                            '    <style>\n' +
                            '        .mce-panel {\n' +
                            '            border: 0 solid rgb(225, 230, 235);\n' +
                            '            background-color: #f5f6fa;\n' +
                            '        }\n' +
                            '        .thread {\n' +
                            '            width: 9%;\n' +
                            '            background-color: #f5f6fa;\n' +
                            '        }\n' +
                            '        .thread2 {\n' +
                            '            width: 14%;\n' +
                            '            background-color: #f5f6fa;\n' +
                            '            text-align: center;\n' +
                            '        }\n' +
                            '    </style>\n' +
                            '    <h6>病例简诉：</h6>\n' +
                            '    <table class="table table-bordered table-header">\n' +
                            '        <tr>\n' +
                            '            <td class="thread">主诉:</td>\n' +
                            '            <td><input type="text" name="mainSuit" id="mainSuit" class="form-control" placeholder="请输入病情主诉"></td>\n' +
                            '        </tr>\n' +
                            '        <tr>\n' +
                            '            <td class="thread">既往病史:</td>\n' +
                            '            <td><input type="text" name="anamnesis" id="anamnesis"  class="form-control" placeholder="请输入既往病史"></td>\n' +
                            '        </tr>\n' +
                            '        <tr>\n' +
                            '            <td class="thread">个人史:</td>\n' +
                            '            <td><input type="text" name="personalHistory" id="personalHistory" class="form-control" placeholder="请输入个人病史"></td>\n' +
                            '        </tr>\n' +
                            '        <tr>\n' +
                            '            <td class="thread">家族史:</td>\n' +
                            '            <td><input type="text" name="familyHistory" id="familyHistory" class="form-control" placeholder="请输入家族病史"></td>\n' +
                            '        </tr>\n' +
                            '        <tr>\n' +
                            '            <td class="thread">体格检查:</td>\n' +
                            '            <td><input type="text" name="healthCheckup" id="healthCheckup" class="form-control" placeholder="请输入体格检查结果"></td>\n' +
                            '        </tr>\n' +
                            '        <tr>\n' +
                            '            <td class="thread">辅助检查:</td>\n' +
                            '            <td><input type="text" name="auxiliaryExamination" id="auxiliaryExamination" class="form-control" placeholder="请输入辅助检查结果"></td>\n' +
                            '        </tr>\n' +
                            '        <tr>\n' +
                            '            <td class="thread">西医诊断:</td>\n' +
                            '            <td><input type="text" name="westernDiagnostics" id="westernDiagnostics"  class="form-control" placeholder="请填写西医症断结果"></td>\n' +
                            '        </tr>\n' +
                            '        <tr>\n' +
                            '            <td class="thread">中医诊断:</td>\n' +
                            '            <td><input type="text" name="tcmDiagnosis " id="tcmDiagnosis" class="form-control" placeholder="请填写中医症断结果"></td>\n' +
                            '        </tr>\n' +
                            '        <tr>\n' +
                            '            <td class="thread">处置:</td>\n' +
                            '            <td><input type="text" name="diagnose" id="diagnose" class="form-control" placeholder="请填写处置方案"></td>\n' +
                            '        </tr>\n' +
                            '        <tbody>\n' +
                            '        </tbody>\n' +
                            '    </table>\n' +
                            '    <h6>病例详情：</h6>\n' +
                            '    <textarea style="resize: none;" class="form-control" name="casesOfDetails" id="casesOfDetails"></textarea>\n' +
                            '</div>'
                    }
                    else{
                        alert("请先扫描患者身份信息二维码")
                    }
                },
                error: function () {
                    console.log(this.error);
                }
            });
            $("#defaultPage").html(html2)
            break;
        }
        case "choose3":
        {
            oldHtmlData=""
            htmlRight=""
            $.ajax({
                type: "POST",
                url: '/home/caseNotes/getPageChoose3',
                dataType: "html",
                cache: false,
                async: false,
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                success: function (re_data) {
                    let jd=JSON.parse(re_data)
                    if(jd.flag)
                    {
                        Get_data(jd.data)
                        Nav_data(jd.data,"doctor")
                    }

                },
                error: function () {
                    console.log(this.error);
                }
            });
            break;
        }
        default:{
            $("#defaultPage").html(htmld)

        }
    }
}
function submeit_d() {
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/create_qrcode_getPageChoose2',
        data:{
            "id":json_data.uuid,
            "patientId":json_data.idP,
            "doctorId":json_data.id,
            "mainSuit":$("#mainSuit").val(),
            "anamnesis":$("#anamnesis").val(),
            "healthCheckup":$("#healthCheckup").val(),
            "personalHistory":$("#personalHistory").val(),
            "familyHistory":$("#familyHistory").val(),
            "auxiliaryExamination":$("#auxiliaryExamination").val(),
            "westernDiagnostics":$("#westernDiagnostics").val(),
            "tcmDiagnosis":$("#tcmDiagnosis").val(),
            "diagnose":$("#diagnose").val(),
            "casesOfDetails":$("#casesOfDetails").val(),
        },
        dataType: "html",
        cache: false,
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            if(JSON.parse(re_data).flag)
            {
                $("#qr").prop("src","/home/caseNotes/create_qrcode_getPageChoose2");
            }else{
                alert("提交错误")
            }
        },
        error: function () {
            console.log(this.error);
        }
    });
}
function navOneClick(user_, page) {
    /**
     * 设置分页动作
     */
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/getPageChoose3',
        data: {
            page: page,
            userType: user_,
        },
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let jd = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            oldHtmlData+=htmlRight;
            Get_data(jd.data);
            Nav_data(jd.data, user_);
        },
        error: function () {
            console.log(this.error);
        }
    });
}
function Nav_data(json_data, user_) {
    /**
     * 渲染下方分页
     * @type {string}
     */
    let navhtml = `<li><a onclick="navOneClick('` + user_ + `',1)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
    for (let i = 1; json_data.total >= i; ++i) {
        navhtml += `<li><a onclick="navOneClick('` + user_ + `',` + i.toString() + `)">` + i.toString() + `</a></li>`;
    }
    navhtml += `<li><a onclick="navOneClick('` + user_ + `',` + json_data.total + `)" aria-label="Next"><span aria-hidden="true">&raquo;</span></li>`;
    $("#nav").html(navhtml);
}
function Get_data(jd) {
    /**
     * 渲染列表数据
     * @type {string}
     */
    $("#name_input").val("");
    $("#defaultPage").html("")
    let html='<div class="col-md-5 pull-left">\n' +
        '    <div class="form-group">\n' +
        '        <input id="name_input" type="text" class="form-control" placeholder="请输入查询名称">\n' +
        '    </div>\n' +
        '    <div class="form-group btn-search">\n' +
        '        <button class="btn btn-default"  onclick="searchName()"><span class="glyphicon glyphicon-search"></span> 搜索</button>\n' +
        '    </div>\n' +
        '    <div class="table-margin">\n' +
        '        <table id="checkBox" class="table table-bordered table-header">\n' +
        '            <thead>\n' +
        '                <tr>\n' +
        '                    <td class="w7"></td>\n' +
        '                    <td>名称</td>\n' +
        '                    <td>基本单位</td>\n' +
        '                    <td>处方药</td>\n' +
        '                    <td>单价</td>\n' +
        '                </tr>\n' +
        '            </thead>\n' +
        '            <tbody>'

    for(let i in jd)
    {
        if(jd[i].id==undefined) continue;
        html+='<tr id="tr'+jd[i].id+'">\n' +
        '            <td class="w2"><input class="singleClick" type="checkbox" onclick="getEachChick()" value="tr'+jd[i].id+'"/></td>\n' +
        '            <td>'+jd[i].name+'</td>\n' +
        '            <td>'+jd[i].unit+'</td>\n' +
        '            <td>'+jd[i].prescription+'</td>\n' +
        '            <td>'+jd[i].price+'</td>\n' +
        '       </tr>'
    }
    html+='          </tbody>\n' +
        '            <tfoot>\n' +
        '                <tr>\n' +
        '                    <td colspan="8">\n' +
        '                        <div class="pull-right">\n' +
        '                            <nav>\n' +
        '                                <ul id="nav" class="pagination"></ul>\n' +
        '                            </nav>\n' +
        '                        </div>\n' +
        '                    </td>\n' +
        '                </tr>\n' +
        '            </tfoot>\n' +
        '        </table>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="col-md-7 pull-right">' +
        '    <div class="form-group" style="width: 100%;">\n' +
        '        <div class="pull-right">\n' +
        '           <button class="btn btn-mystyle btn-sm" type="button" onclick="submitMedical()">提交</button>\n' +
        '        </div>'+
        '       <div class="pull-left"><h6 class="h5" style="color: #09c;">*已选择药物</h6></div>'+
        '    </div>\n' +
        '    <div class="table-margin">\n' +
        '        <table id="checkBox2" class="table table-bordered table-header">\n' +
        '            <thead>\n' +
        '                <tr>\n' +
        // '                    <td class="w6">取消</td>\n' +
        '                    <td>名称</td>\n' +
        '                    <td>基本单位</td>\n' +
        '                    <td>处方药</td>\n' +
        '                    <td>单价</td>\n' +
        '                    <td class="numPP">数量</td>\n' +
        '                    <td>用法</td>\n' +
        '                </tr>\n' +
        '            </thead>\n' +
        '            <tbody id="submitMedical" ></tbody>\n' +
        '             <tfoot>\n' +
        '                <tr>\n' +
        '                    <td colspan="7">\n' +
        '                        <div class="pull-right">\n' +
        '                            <nav>\n' +
        '                                <ul id="nav2" class="pagination"></ul>\n' +
        '                            </nav>\n' +
        '                        </div>\n' +
        '                    </td>\n' +
        '                </tr>\n' +
        '            </tfoot>\n' +
        '        </table>\n' +
        '     </div>\n'+
        ' </div>\n' +
        '<style> \n' +
        '   .numPP { \n' +
        '       width:70px; \n' +
        '   } \n' +
        '</style>'
    $("#defaultPage").html(html)
    $("#submitMedical").html(oldHtmlData)
}
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
                Nav_data(json_data, "doctor");
            }else {
                alert("药物暂无")
            }
        },
        error: function () {
            console.log(this.error);
        }
    });
}
function getEachChick() {
    /**
     * 添加药物信息：左边点击右边出现添加的药物
     * @type {*|jQuery|HTMLElement}
     */
    let $elements = $('.singleClick');
    htmlRight="";
    $elements.each(function () {
        let $this = $(this);
        if ($this.prop('checked')) {
            let tempTr="#"+$this.prop("value")+" td";
            let trTemp="";
            $(tempTr).each(function(){
                if($(this).text())
                {
                    trTemp+='<td>'+$(this).text()+'</td>\n'
                }
            })
            // console.log(trTemp)
            htmlRight+='<tr id="trR'+$this.prop("value")+'">\n' +
                        // '<td class="w2"><input type="checkbox" onclick="cancelMedical()" /></td>\n'
                            trTemp+
                        '<td><input type="text" class="form-control" style="height: 25px;" placeholder="用量"></td>'+
                        '<td><input type="text" class="form-control" style="height: 25px;" placeholder="请输入药物使用方法"></td>'+
                      '</tr>'
        }
    });
    $("#submitMedical").html(oldHtmlData+htmlRight)
}
function cancelMedical() {
    /**
     * 医生：添加药物右边点击取消添加
     * 来自界面：forthedoctor.js
     * 调用对象：<td class="w2"><input class="cancelMedical" type="checkbox" onclick="cancelMedical()" /></td>\n'
     */
    $("#submitMedical tr").each(function(){
        let flag=$(this).find('input[type="checkbox"]').prop("checked");
        if(flag)
        {
            $(this).remove()
        }
    });
}
function submitMedical() {
    /**
     * 医生：将本次就医开的药物记录到数据库中
     * 来自界面：forthedoctor.js
     * 调用对象：submitMedical()
     */
    let temp="";
    $("#submitMedical tr").each(function() {
        // medicalList["idM"].push($(this).prop("id").slice(5));
        temp+=$(this).find("td").get(1).textContent +"("+$(this).find("input[type='text']").get(0).value+",单位："+$(this).find("input[type='text']").get(1).value+") "
    });
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/submitMedical',
        data: {
            medicalDetial: temp
        },
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            if(JSON.parse(re_data).flag)
            {
                json_data=undefined;//保存的是医生和病人的个人信息
                html2="<h3>请刷新界面</h3>";
                htmlRight="";
                oldHtmlData="";
                idArr = [];
                alert("添加成功")
            }
            else{
                alert("添加失败")
            }
        },
        error: function () {
            console.log(this.error);
        }
    });
}
