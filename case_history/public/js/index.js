$(".tran").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/login",
        contentType: "application/json",
        data: JSON.stringify({param1: $("input[name='email_tel']").val(), param2: $("input[name='password']").val()}),//参数列表
        dataType: "json",
        success: function (result) {
            //请求正确之后的操作
        },
        error: function (result) {
            //请求失败之后的操作
            // alert($("input[name='email_tel']").val());
        }
    });
});
