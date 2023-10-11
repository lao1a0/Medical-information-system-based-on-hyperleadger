function Get_page_right(json_data,s){
    if(json_data[s].mainSuit==undefined)  setTimeout("",2000)
    $("#myEMR").html("<h2 style=\"text-align: center;\">"+json_data[s].hospital+"</h2>\n" +
        "<h3 style=\"text-align: center;\">门（急）诊病历</h3>\n" +
        "<div id='dim' class='dim'>" +
        "<table style=\"height: 70px; width: 100%;\" border=\"0\">\n" +
        "    <tbody>\n" +
        "    <tr>\n" +
        "        <td id='pname'><strong>姓名：</strong>"+json_data[s].pname+"</td>\n" +
        "        <td id='psex'><strong>性别：</strong>"+json_data[s].sex+"</td>\n" +
        "        <td id='page' <strong>年龄：</strong>"+json_data[s].age+"</td>\n" +
        "        <td id='pidNum'><strong>身份证：</strong>"+json_data[s].idNum+"</td>\n" +
        "    </tr>\n" +
        "    <tr>\n" +
        "        <td id='pbirth'><strong>出生日期：</strong>"+json_data[s].birth+"</td>\n" +
        "        <td id='ptel'><strong>联系电话：</strong>"+json_data[s].tel+"</td>\n" +
        "        <td id='presidence'><strong>家庭住址：</strong>"+json_data[s].residence+"</td>\n" +
        "        <td id='pcompany'><strong>公司：</strong>"+json_data[s].company+"</td>\n" +
        "    </tr>\n" +
        "    <tr>\n" +
        "        <td id='createTime'><strong>就诊时间：</strong>"+json_data[s].createTime+"</td>\n" +
        "        <td id='section'><strong>就诊科室：</strong>"+json_data[s].section+"</td>\n" +
        "        <td id='dname'><strong>主治医师：</strong>"+json_data[s].dname+"</td>\n" +
        "    </tr>\n" +
        "    </tbody>\n" +
        "</table>\n" +
        "<hr/>\n" +
        "<p id='mainSuit'><strong>主诉：</strong>"+json_data[s].mainSuit+"</p>\n" +
        "<p id='anamnesis'><strong>既往病史：</strong>"+json_data[s].anamnesis+"</p>\n" +
        "<p id='personalHistory'><strong>个人史：</strong>"+json_data[s].personalHistory+"</p>\n" +
        "<p id='familyHistory'><strong>家族史：</strong>"+json_data[s].familyHistory+"</p>\n" +
        "<p id='healthCheckup'><strong>体格检查：</strong>"+json_data[s].healthCheckup+"</p>\n" +
        "<p id='auxiliaryExamination'><strong>辅助检查：</strong>"+json_data[s].auxiliaryExamination+"</p>\n" +
        "<p id='westernDiagnostics'><strong>西医诊断：</strong>"+json_data[s].westernDiagnostics+"</p>\n" +
        "<p id='tcmDiagnosis'><strong>中医诊断：</strong>"+json_data[s].tcmDiagnosis+"</pid>\n" +
        "<p id='diagnose'><strong>处置：</strong>"+json_data[s].diagnose+"</p>\n" +
        "<p id='casesOfDetails'><strong>病历详情：</strong>"+json_data[s].casesOfDetails+"</p>\n" +
        "<p id='medicalDetial'><strong>用药详情：</strong>"+json_data[s].medicalDetial+"</p>"+
        "</div>" );
}

function Get_data(json_data) {
    /**
     * 渲染列表数据
     * @type {string}
     */
    $("#dataString").html("");
    html = "";

    for (i in json_data) {
        if (json_data[i].eid != undefined) {
            html += '<tr>';
            html += "<td style='width: auto'>" + json_data[i].createTime + "</td>"
            html += "<td style='width: auto'>" + json_data[i].hospital + "</td>"
            html += "<td class=\"w18\">" + json_data[i].section + "</td>"
            html += "<td class=\"w10\"><input id='emr"+i+"' value='" + json_data[i].eid+","+json_data[i].pid + "' hidden/>"
            //     "<button type=\"button\" class=\"btn btn-info btn-sm\" onclick=\"applyForMedicalData(this)\" style=\"width: 100%;width: 100%;\n" +
            //     "height: 22px;\n" +
            //     "font-size: 12px;\n" +
            //     "text-align: center;\n" +
            //     "padding: 0px;\n" +
            //     "margin: 0px;\">申请</button>" +
            //     "</td>"
            // html += "</tr>";
            if(json_data[i].ahiStatus=="0")
            {
                html+="<button type=\"button\" class=\"btn btn-info btn-sm\" onclick=\"applyForMedicalData(this)\" style=\"width: 100%;width: 100%;\n" +
                    "height: 22px;\n" +
                    "font-size: 12px;\n" +
                    "text-align: center;\n" +
                    "background: #10b541;\n" +
                    "padding: 0px;\n" +
                    "margin: 0px;\" disabled>等待</button>" +
                    "</td></tr>";
            }else if(json_data[i].ahiStatus=="1") {
                html+="<button type=\"button\" class=\"btn btn-info btn-sm\" onclick=\"applyForMedicalData(this)\" style=\"width: 100%;width: 100%;\n" +
                    "height: 22px;\n" +
                    "font-size: 12px;\n" +
                    "text-align: center;\n" +
                    "background: #ea0303;\n" +
                    "border-color:#ea0303;\n" +
                    "padding: 0px;\n" +
                    "margin: 0px;\">成功</button>" +
                    "</td></tr>";
            }
            else {
                html+="<button type=\"button\" class=\"btn btn-info btn-sm\" onclick=\"applyForMedicalData(this)\" style=\"width: 100%;width: 100%;\n" +
                    "height: 22px;\n" +
                    "font-size: 12px;\n" +
                    "text-align: center;\n" +
                    "padding: 0px;\n" +
                    "margin: 0px;\">申请</button>" +
                    "</td></tr>";
            }
        }
    }
    $("#dataString").html(html);
    // $("#emr"+s).prop("checked",true);
}

function Nav_data(json_data) {
    /**
     * 渲染下方分页
     * @type {string}
     */

    let navhtml = `<li><a onclick="navOneClick(1)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
    for (let i = 1; json_data["total"] >= i; ++i) {
        navhtml += `<li><a onclick="navOneClick(` + i.toString() + `)">` + i.toString() + `</a></li>`;
    }
    navhtml += `<li><a onclick="navOneClick(` + json_data["total"] + `)" aria-label="Next"><span aria-hidden="true">&raquo;</span></li>`;
    $("#nav").html(navhtml);
}

function navOneClick(page) {
    /**
     * 设置分页动作
     */
    $.ajax({
        type: "GET",
        url: '/home/caseNotes',
        data: {
            page: page,
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
                Get_page_right(json_data,(page-1)*15);
                Nav_data(json_data);
            }
            else  alert(json_data.data);
        },
        error: function () {
            console.log(this.error);
        }
    });
}

/**
 * 页面初始化
 */
function sendForPage() {
    /**
     * 发送POST请求，请求的是第一页的数据
     */
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/getMedicalDataAll',
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            if(json_data.flag)
            {
                Get_data(json_data);
                Get_page_right(json_data,0);
                Nav_data(json_data);
            }
            else alert(json_data.data);
        },
        error: function () {
            console.log(this.error);
        }
    });
}

/**
 * 单击查看每一个病历（获得的是加密数据）
 * @param obj
 */
function changeEMR(obj) {
    /**
     * 点击单选框，改变病历内容
     */
    let idArr = [
        $(obj).parents("td").find("input").prop("value").split(",")[0],
        $(obj).parents("td").find("input").prop("value").split(",")[1],
        $(obj).parents("td").find("input").prop("id")
    ];
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/changeEMR',
        data: {
            emrTitle: idArr,
        },
        dataType: "html",
        cache: false,
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data=JSON.parse(re_data);
            if(json_data.flag)
            {
                Get_page_right(json_data,0);
            }
            else{
                alert("请刷新界面")
            }
        },
        error: function () {
            console.log(this.error);
        }
    });
}
/**
 * 单击查看每一个病历（将加密数据发送给后端进行解密）
 * @param e
 */
function applyForMedicalData(e) {
    alert("已提交");
    let tg=1;
    if($(e).text()=="申请")
    {
        $(e).css("background","#10b541");
        $(e).text("等待");
        $(e).prop("disabled",true);
        tg=0;
    }
    changeEMR(e);
    $.ajax({
        type: "POST",
        url: '/home/accessRecord/decodeData',
        data:  {
            "pid":$(e).parents("td").find("input").prop("value").split(",")[1],
            "eid":$(e).parents("td").find("input").prop("value").split(",")[0],
            "pname":$("#pname").text().split("：")[1],
            "psex":$("#psex").text().split("：")[1],
            "page":$("#page").text().split("：")[1],
            "pidNum":$("#pidNum").text().split("：")[1],
            "pbirth":$("#pbirth").text().split("：")[1],
            "ptel":$("#ptel").text().split("：")[1],
            "presidence":$("#presidence").text().split("：")[1],
            "pcompany":$("#pcompany").text().split("：")[1],
            "createTime":$("#createTime").text().split("：")[1],
            "section":$("#section").text().split("：")[1],
            "dname":$("#dname").text().split("：")[1],
            "mainSuit":$("#mainSuit").text().split("：")[1],
            "healthCheckup":$("#healthCheckup").text().split("：")[1],
            "anamnesis":$("#anamnesis").text().split("：")[1],
            "personalHistory":$("#personalHistory").text().split("：")[1],
            "familyHistory":$("#familyHistory").text().split("：")[1],
            "auxiliaryExamination":$("#auxiliaryExamination").text().split("：")[1],
            "westernDiagnostics":$("#westernDiagnostics").text().split("：")[1],
            "tcmDiagnosis":$("#tcmDiagnosis").text().split("：")[1],
            "diagnose":$("#diagnose").text().split("：")[1],
            "casesOfDetails":$("#casesOfDetails").text().split("：")[1],
            "medicalDetial":$("#medicalDetial").text().split("：")[1],
            "tg":tg
        },
        dataType: "html",
        cache: false,
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data=JSON.parse(re_data);
            if(json_data.flag)
            {
                if(tg==0)
                {
                    $(e).css("background","#ea0303");
                    $(e).css("border-color","#ea0303");
                    $(e).text("成功");
                    $(e).prop("disabled",false);
                }
                $("#dim").removeClass("dim");
                $("#pname").html("<strong>姓名：</strong>"+json_data.reData.pname)
                $("#psex").html("<strong>性别：</strong>"+json_data.reData.psex)
                $("#page").html("<strong>年龄：</strong>"+json_data.reData.page)
                $("#pidNum").html("<strong>身份证：</strong>"+json_data.reData.pidNum)
                $("#pbirth").html("<strong>出生日期：</strong>"+json_data.reData.pbirth)
                $("#ptel").html("<strong>联系电话：</strong>"+json_data.reData.ptel)
                $("#presidence").html("<strong>家庭住址：</strong>"+json_data.reData.presidence)
                $("#pcompany").html("<strong>公司：</strong>"+json_data.reData.pcompany)
                $("#createTime").html("<strong>就诊时间：</strong>"+json_data.reData.createTime)
                $("#section").html("<strong>就诊科室：</strong>"+json_data.reData.section)
                $("#dname").html("<strong>主治医师：</strong>"+json_data.reData.dname)

                $("#mainSuit").html("<strong>主诉：</strong>"+json_data.reData.mainSuit)
                $("#anamnesis").html("<strong>既往病史：</strong>"+json_data.reData.anamnesis)
                $("#personalHistory").html("<strong>个人史：</strong>"+json_data.reData.personalHistory)
                $("#familyHistory").html("<strong>家族史：</strong>"+json_data.reData.familyHistory)
                $("#healthCheckup").html("<strong>体格检查：</strong>"+json_data.reData.healthCheckup)
                $("#auxiliaryExamination").html("<strong>辅助检查：</strong>"+json_data.reData.auxiliaryExamination)
                $("#westernDiagnostics").html("<strong>西医诊断：</strong>"+json_data.reData.westernDiagnostics)
                $("#tcmDiagnosis").html("<strong>中医诊断：</strong>"+json_data.reData.tcmDiagnosis)
                $("#diagnose").html("<strong>处置：</strong>"+json_data.reData.diagnose)
                $("#casesOfDetails").html("<strong>病历详情：</strong>"+json_data.reData.casesOfDetails)
                $("#medicalDetial").html("<strong>用药详情：</strong>"+json_data.reData.medicalDetial)
            }
            else{
                alert("权限不足，无法访问")
            }
        },
        error: function () {
            console.log(this.error);
        }
    });
}
/**
 * 根据电话号查询指定患者的病历
 */
function searchTel() {
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/searchTel',
        data: {
            tel:$("#tel_input").val()
        },
        dataType: "html",
        cache: false,
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data=JSON.parse(re_data);
            if(json_data.flag)
            {
                Get_data(json_data);
                Get_page_right(json_data,0);
                Nav_data(json_data);
            }
            else{
                alert("未查询到数据")
            }
        },
        error: function () {
            console.log(this.error);
        }
    });
}