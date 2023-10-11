function deleteAllaccessHistory() {
    $.ajax({
        type: "POST",
        url: '/home/accessRecord/deleteAllaccessHistory',
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            if(json_data.flag)
            {
                alert("成功删除"+json_data.data+"条数据");
                location.reload();
            }
            else  alert("删除失败");
        },
        error: function () {
            console.log(this.error);
        }
    });
}
function Nav_data(json_data,typePage) {
    /**
     * 渲染下方分页
     * @type {string}
     */

    let navhtml = `<li><a onclick="navOneClick(1,'` + typePage + `')" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
    for (let i = 1; json_data["total"] >= i; ++i) {
        navhtml += `<li><a onclick="navOneClick(` + i.toString() + `,'` + typePage + `')">` + i.toString() + `</a></li>`;
    }
    navhtml += `<li><a onclick="navOneClick(` + json_data["total"] + `,'` + typePage + `')" aria-label="Next"><span aria-hidden="true">&raquo;</span></li>`;
    $("#nav").html(navhtml);
}
function navOneClick(page,typePage) {
    /**
     * 设置分页动作
     */
    $.ajax({
        type: "GET",
        url: '/home/accessRecord',
        data: {
            page: page,
            typePage:typePage
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
                Nav_data(json_data,typePage);
            }
            else  alert(json_data.data);
        },
        error: function () {
            console.log(this.error);
        }
    });
}
function Get_data(json_data) {
    html = "";
    for (i in json_data) {
        if (json_data[i].eid != undefined) {
            html+='<tr>'
            html+='<td>'+json_data[i].time+'</td>'
            if(json_data[i].vtype=="doctor")
            {
                html+='<td>医生</td>'
            }
            else if(json_data[i].vtype=="accessor")
            {
                html+='<td>访问者</td>'
            }
            html+='<td>'+json_data[i].name+'</td>'
            html+='<td>'+json_data[i].createTime+'</td>'
            html+='<td>'+json_data[i].hospital+'</td>'
            html+='<td>'+json_data[i].section+'</td>'
            if(json_data[i].status=="0")
            {
                html+= '<td>'+
                '    <input value="' + json_data[i].vid +","+json_data[i].eid + '" hidden />'+
                '    <button type="button" class="btn btn-info btn-sm" ' +
                    'onclick="allowForPolicy(this)" ' +
                    'style="width: 100%;width: 100%; height: 22px;font-size: 12px;text-align: center;padding: 0px;margin: 0px;">' +
                    '同意' +
                    '</button>'+
                '</td>'

            }
            else
            {
                html+='<td>已允许</td>'
            }
            html+='</tr>'
        }
    }
    $("#historyData").html(html);
}
function allowForPolicy(obj) {
    $.ajax({
        type: "POST",
        url: '/home/accessRecord/allowForPolicy',
        data:{
            vid:$(obj).parents("td").find("input").val().split(",")[0],
            mid:$(obj).parents("td").find("input").val().split(",")[1]
        },
        dataType: "html",
        cache: false,
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function (re_data) {
            let json_data = JSON.parse(re_data);// 每发出一次请求就更新一遍json数据
            if(json_data.flag)
            {
               alert("设置成功！")
                $(obj).parents("td").html("已允许")
            }
            else alert("设置失败");
        },
        error: function () {
            console.log(this.error);
        }
    });
}
function sendForPageAccessRecord(typePage) {
    /**
     * 发送POST请求，请求的是第一页的数据
     */
    $.ajax({
        type: "POST",
        url: '/home/accessRecord/getHistoryData',
        data:{
            typePage:typePage
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
                Nav_data(json_data,typePage);
            }
            else alert("访问记录暂无");
        },
        error: function () {
            console.log(this.error);
        }
    });
}
function inforBar(obj) {
    switch ($(obj).prop("id"))
    {
        case "infor1":{
            $(obj).addClass("active");
            $("#infor2").removeClass("active");
            $("#infor3").removeClass("active");
            sendForPageAccessRecord();
            break;
        }
        case "infor2":{
            $(obj).addClass("active");
            $("#infor1").removeClass("active");
            $("#infor3").removeClass("active");
            sendForPageAccessRecord("pass");
            break;
        }
        case "infor3":{
            $(obj).addClass("active");
            $("#infor2").removeClass("active");
            $("#infor1").removeClass("active");
            sendForPageAccessRecord("notPass")
            break;
        }
    }
}