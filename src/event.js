
var endpoint = 'http://ec2-13-113-163-80.ap-northeast-1.compute.amazonaws.com/';


var ContextMenus = function () {
    var items = this.items = {};

    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        items[info.menuItemId].onclick(info, tab);
    });

};

ContextMenus.prototype = {
    create: function (properties) {
        this.items[properties.id] = {
            onclick: properties.onclick
        };

        properties.onclick = null;
        chrome.contextMenus.create(properties);
    }
};

chrome.runtime.onInstalled.addListener(function () {
    var contextMenus = new ContextMenus();

    contextMenus.create({
        type: 'normal',
        id: 'execute',
        //contexts: ["all"],
        title: 'ロボット実行',
        onclick: OnExecute
    });
});


function OnExecute(info){

    $.ajax({
        url: endpoint + 'api/robots/',
        type:'GET',
        dataType: 'JSON',
    })
    .done((data) => {

        var array = data.robots;

        array.forEach(function(robot){
            
            alert(robot.code);

        })
        //eval(data.description)

    })

    // Ajaxリクエストが失敗した時発動
    .fail((data)=>{
        alert(data);
    })

    // Ajaxリクエストが成功・失敗どちらでも発動
    .always((data)=>{
        //alert(data);
    });

}
