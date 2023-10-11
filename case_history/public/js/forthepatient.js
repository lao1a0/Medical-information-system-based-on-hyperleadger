function uploadTemplate() {
    $("#file1").click();
    $("#btnUpload").show();
}
function selectTemplate(){
    var fd = new FormData()
    var files = $('#file1')[0].files
    if (files.length <= 0) {
        return alert('请选择文件后再上传！')
    }
    fd.append('myFileName', files[0]);
    alert(files[0].name+"上传成功");
    $.ajax({
        type: 'POST',
        url: '/home/access/uploadTemplate',
        data: fd,
        cache: false,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (res) {
            let r=JSON.parse(res);
           console.log(r)
        },
        error: function () {
            console.log(this.error);
        }
    });
    sendForPage();
    $("#btnUpload").hide();
}
function downloadTemplate() {
    window.open('http://192.168.191.197:3000/template.xlsx');
}
function initalHomePage() {
    $.ajax({
        type: "POST",
        url: '/home/access/initalHomePageP',
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
            $("#number1").html(an);
            $("#number2").html(en);
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
function Get_page_right(json_data,s){
    if(json_data[s].mainSuit==undefined) setTimeout("",2000)
        $("#myEMR").html("<h2 style=\"text-align: center;\">" + json_data[s].hospital + "</h2>" +
            "<h3 style=\"text-align: center;\">门（急）诊病历</h3>" +
            "<div id='dim' class='dim'>" +
            "<table style=\"height: 70px; width: 100%;\" border=\"0\">" +
            "    <tbody>" +
            "    <tr>" +
            "        <td><strong>姓名：</strong>" + json_data[s].pname + "</td>" +
            "        <td><strong>性别：</strong>" + json_data[s].sex + "</td>" +
            "        <td><strong>年龄：</strong>" + json_data[s].age + "</td>" +
            "        <td><strong>身份证：</strong>" + json_data[s].idNum + "</td>" +
            "    </tr>" +
            "    <tr>" +
            "        <td><strong>出生日期：</strong>" + json_data[s].birth + "</td>" +
            "        <td><strong>联系电话：</strong>" + json_data[s].tel + "</td>" +
            "        <td><strong>家庭住址：</strong>" + json_data[s].residence + "</td>" +
            "        <td><strong>公司：</strong>" + json_data[s].company + "</td>" +
            "    </tr>" +
            "    <tr>" +
            "        <td><strong><strong>就诊时间</strong>：</strong>" + json_data[s].createTime + "</td>" +
            "        <td><strong>就诊科室：</strong>" + json_data[s].section + "</td>" +
            "        <td><strong>主治医师：</strong>" + json_data[s].dname + "</td>" +
            "    </tr>" +
            "    </tbody>" +
            "</table>" +
            "<hr/>" +
            "<p><strong>主诉：</strong>" + json_data[s].mainSuit + "</p>" +
            "<p><strong>既往病史：</strong>" + json_data[s].anamnesis + "</p>" +
            "<p><strong>个人史：</strong>" + json_data[s].personalHistory + "</p>" +
            "<p><strong>家族史：</strong>" + json_data[s].familyHistory + "</p>" +
            "<p><strong>体格检查：</strong>"+json_data[s].healthCheckup+"</p>" +
            "<p><strong>辅助检查：</strong>" + json_data[s].auxiliaryExamination + "</p>" +
            "<p><strong>西医诊断：</strong>" + json_data[s].westernDiagnostics + "</p>" +
            "<p><strong>中医诊断：</strong>" + json_data[s].tcmDiagnosis + "</p>" +
            "<p><strong>处置：</strong>" + json_data[s].diagnose + "</p>" +
            "<p><strong>病历详情：</strong>" + json_data[s].casesOfDetails + "</p>" +
            "<p><strong>用药详情：</strong>" + json_data[s].medicalDetial + "</p></div>");
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
            html += "<td class=\"w2\"><input id='emr"+i+"' value='" + json_data[i].eid + "' onclick='changeEMR(this)' type='checkbox' /></td>"
            html += "<td>" + json_data[i].createTime + "</td>"
            html += "<td class=\"w15\">" + json_data[i].dname + "</td>"
            html += "<td class=\"w18\">" + json_data[i].section + "</td>"
            html += "<td class=\"w15\">" + json_data[i].dtel + "</td>"
            html += "</tr>";
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
    $.ajax({
        type: "GET",
        url: '/home/caseNotes',
        data: {
            page: page
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
function sendForPage() {
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/getMedicalData',
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
            else alert("数据暂无");
        },
        error: function () {
            console.log(this.error);
        }
    });
}
function getEachChick() {
    let idArr = [];
    $("input[type='checkbox']").each(function () {
        var $this = $(this);
        if ($this.prop('checked')) {
            idArr.push()
        }
    });
    return idArr;
}
function changeEMR(obj) {
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/changeEMR',
        data: {
            emrTitle: [$(obj).prop('value'),$(obj).prop('id')]
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
                $(obj).prop('checked',false);
                $("#dim").removeClass("dim");
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
function searchEmr() {
    let selectData=$(".select_form-control option:selected").text()
    let createTime=selectData.replace("年","-").replace("月","-").replace("日","");
    $.ajax({
        type: "POST",
        url: '/home/caseNotes/searchCreateTime',
        data: {
            createTime: createTime+"%"
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
function cancellationPolicy(obj) {
    let flag = $(obj).text()
    let em = $(obj).parents("li").find("em");
    let i =  $(obj).parents("li").find("i");
    let userType=$(obj).parents("li").prop("id");
    if(flag == "取消" )
    {
        /**
         * 已经设置了策略，将原来的策略删除
         */
        em.text("未设置");
        em.removeClass("text-green-deep");
        em.addClass("text-black-deep")
        i.removeClass("glyphicon-ok-circle");
        i.addClass("glyphicon-remove-circle");
        i.css("color","grey");
        $(obj).text("添加");
    }else{
        /***
         * 设置新的策略，设置之前检查已经设置的策略数，没设置的时候策略数目为0
         * @type {number}
         */
        let c=0;
        $(obj).parents("ul").find("em").each(function (){
            if($(this).text()=="已设置")
                c+=1;
        });
        if(c>0)
        {
            alert("一次只能应用一个策略")
        }else {
            $.ajax({
                type: "POST",
                url: '/home/access/setThePolicy',
                data: {
                    data: userType
                },
                dataType: "html",
                cache: false,
                async: false,
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                success: function (re_data) {
                    let json_data=JSON.parse(re_data);
                    if(json_data.flag)
                    {
                        alert("设置成功！")
                        em.text("已设置");
                        em.removeClass("text-black-deep");
                        em.addClass("text-green-deep")
                        i.removeClass("glyphicon-remove-circle");
                        i.addClass("glyphicon-ok-circle");
                        i.css("color","green");
                        $(obj).text("取消");
                    }
                    else{
                        alert("设置失败！"+json_data.data)
                    }
                },
                error: function () {
                    console.log(this.error);
                }
            });
        }

    }
}
function changeTheData(obj) {
    $(".dialog-btn-confirm").click(function () {
        let d={};
        d["sex"]=$("input[name='_sex']:checked").val();
        d["hp"]=$("input[name='_h']:checked").val();
        d["section"]=$("input[name='_section']:checked").val();
        d["rank"]=$("input[name='_rank']:checked").val();
        let text="";
        if(d["sex"]!=undefined) text+="医生性别为"+d["sex"];
        if(d["hp"]=="是") text+=" 医院相同 ";
        if(d["section"]=="是") text+=" 科室相同 ";
        if(d["rank"]=="是") text+=" 职称相同 ";
        $.ajax({
            type: "POST",
            url: '/home/access/setThePolicy',
            data: {
                data: "dPolicy3",
                d:d,
                t:text
            },
            dataType: "html",
            cache: false,
            async: false,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (re_data) {
                let json_data = JSON.parse(re_data);
                if (json_data.flag) {
                    alert("设置成功!")
                    $("#em3").text("已设置");
                    $("#em3").removeClass("text-black-deep");
                    $("#em3").addClass("text-green-deep")
                    $("#i3").removeClass("glyphicon-remove-circle");
                    $("#i3").addClass("glyphicon-ok-circle");
                    $("#i3").css("color", "green");
                    $("#btn-type").text("取消");
                    $("#span3").text(text);
                } else {
                    alert("设置失败！" + json_data.data)
                }
            },
            error: function () {
                console.log(this.error);
            }
        });
    });
}
function forNoToOK(dp) {
    $("#"+dp).find("em").removeClass("text-black-deep");
    $("#"+dp).find("em").addClass("text-green-deep");
    $("#"+dp).find("em").text("已设置");
    $("#"+dp).find("i").removeClass("glyphicon-remove-circle");
    $("#"+dp).find("i").addClass("glyphicon-ok-circle");
    $("#"+dp).find("i").css("color","green");
    $("#"+dp).find("a").text("取消");
}
// function changeTheData()
// {
//     alert("1")
// }