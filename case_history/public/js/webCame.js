$(function () {
    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach('#open-power');
    $("#main__confirm").click(function () {
        Webcam.freeze();
        Webcam.snap(function (data_uri) {
            $.ajax({
                type: "POST",
                url: '/home/caseNotes/upload_qrcode',
                dataType: 'HTML',
                data: {
                    qr: data_uri,
                },
                cache: false,
                async: true,
                success: function (re_data) {
                    let json_data = JSON.parse(re_data)
                    console.log(json_data)
                    if (json_data.flag) {
                        let data = json_data.data
                        let html = '<table  class="table table-bordered table-header" style="width: 100%;position: absolute;margin-top: 10%;margin-left: 6%">\n' +
                            '<tr><td>用户名</td><td>' + data.name + '</td></tr>\n' +
                            '<tr><td>性别</td><td>' + data.sex + '</td></tr>\n' +
                            '<tr><td>年龄</td><td>' + data.age + '</td></tr>\n' +
                            '<tr><td>生日</td><td>' + data.birth + '</td></tr>\n' +
                            '<tr><td>身份证</td><td>' + data.idNum + '</td></tr>\n' +
                            '<tr><td>联系电话</td><td>' + data.tel + '</td></tr>\n' +
                            '<tr><td>现居地</td><td>' + data.residence + '</td></tr>\n' +
                            '<tr><td>公司</td><td>' + data.company + '</td></tr></table>'
                        $("#pinfo").html(html)
                    } else {
                        $("#pinfo").html('<table  class="table table-bordered table-header" style="width: 100%;position: absolute;margin-top: 10%;margin-left: 6%">\n' +
                            '<tr><td><h2>识别错误！</h2></td></tr>\n' +
                            '<tr><td><h2>请重新识别二维码</h2></td></tr></table>')
                    }
                },
                error: function () {
                    console.log(this.error);
                }
            });
        });
    })
});