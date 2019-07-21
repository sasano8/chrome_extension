$(function(){

    var e = function(){/*
        <input class="openmind_btn_keep" type="checkbox" name="collect" value="1" checked="checked">キープ
                */}.toString().split("\n").slice(1,-1).join("\n");



    $("DIV > .g > DIV > DIV > DIV > A").each(function(index,element){

        var link = $(element)[0].href;

        var target = $(element).parent().parent().parent();
        target.css({'background-color': '#d8e7ff'});

        var test = $('<div>' + e + '</div>');

        target = target.append(test);
        test.ready(function(){

            var tmp = test.find('INPUT.openmind_btn_keep')[0];

            tmp.value = link;
            tmp.checked = false;

            GetUrl(tmp.value)

            // Ajaxリクエストが成功した時発動
            .done((data) => {

                if(data.length == 0){
                    $(tmp).parent().parent().css({'background-color': '#d8e7ff'});
                    tmp.checked = false;
                }else{
                    $(tmp).parent().parent().css({'background-color': '#d4ffd1'});
                    tmp.checked = true;
                }

            })

            // Ajaxリクエストが失敗した時発動
            .fail((data)=>{
                //alert('fail');
            })

            // Ajaxリクエストが成功・失敗どちらでも発動
            .always((data)=>{
                //alert(data);
            });


        });

        
    });


    $(".openmind_btn_keep").change(function() {

        var element = $(this);

        if(element.prop('checked') === true){
            

            KeepUrl(element.prop('value'))

            // Ajaxリクエストが成功した時発動
            .done((data) => {
                element.parent().parent().css({'background-color': '#d4ffd1'});
            })

            // Ajaxリクエストが失敗した時発動
            .fail((data)=>{
                alert('fail');
            })

            // Ajaxリクエストが成功・失敗どちらでも発動
            .always((data)=>{
                //alert(data);
            });



        }else{

            var element = $(this);

            DeleteUrl(element.prop('value'))

            // Ajaxリクエストが成功した時発動
            .done((data) => {
                element.parent().parent().css({'background-color': '#d8e7ff'});
            })

            // Ajaxリクエストが失敗した時発動
            .fail((data)=>{
                alert('fail');
            })

            // Ajaxリクエストが成功・失敗どちらでも発動
            .always((data)=>{
                //alert(data);
            });

        }

    });

});


//キープ済みURLを取得する
function GetUrl(url){

    // Ajax実行
    return $.ajax({
        url:'https://reportsystem.ys-method.work/api/screening',
        type:'POST',
        data:{
            'url':url
        }
    });

}



//興味深いURLをキープする
function KeepUrl(url){

    // Ajax実行
    return $.ajax({
        url:'https://reportsystem.ys-method.work/api/screening',        
        type:'PUT',
        data:{
            'url':url
        }
    });

}

//キープしない
function DeleteUrl(url){

    // Ajax実行
    return $.ajax({
        url:'https://reportsystem.ys-method.work/api/screening',
        type:'DELETE',
        data:{
            'url':url
        }
    });

}

//同姓同名の別人であるなど、URLを除外することを明示的に宣言する
function IgnoreUrl(url){
    alert("ignore:" + url);
}

function NoticeError(){
    //ネットワークエラー時など、行を赤くするなど
}

