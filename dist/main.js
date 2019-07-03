data = []
$("#roster").on("click" , function () {
    const team = $("#name").val()
    $.get("/teams/"+ team , function (response) {
        for(let player of response)
        {
            let name = {firstName : player.firstName , lastName : player.lastName}
            $.post("/picture",name ,function (res) {
                player.pic = res.request.uri.href
                console.log("response " , response)
                data = response
                rander()
            })
        }

    })
})
const rander = function ()
{
    $("#continer").empty()
    const tamplate = Handlebars.compile($("#player-template").html())
    const newHtml = tamplate({ player: data})
    console.log(newHtml)
    $("#continer").append(newHtml)
}