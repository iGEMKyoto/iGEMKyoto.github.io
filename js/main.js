// CDN の読み込みが失敗した場合ローカルのjqueryをloadする
// window.jQuery || 
// (
//     function load_local_jquery() {
//         let script = document.createElement('script');
//         script.src = './js/jquery-3.2.1.min.js';
//         document.body.appendChild(script);
//     }
// )();

// load header/footer
// 動作未確認
function load_target_id(target, source) {
    var req = new XMLHttpRequest();
    req.open("GET", source, true);
    req.onreadystatechange = function() {
        if ((req.readyState === 4) && (req.status === 200)) {
            document.getElementById(target).innerHTML = req.responseText;
        }
    }
    req.send(null);
}
// use as below
document.addEventListener("DOMContentLoaded", function() {
    load_target_id("header", "./header.html");
    load_target_id("footer", "./footer.html");
});

// 旧バージョン
// $(function() {
//     $("#header").load("./header.html");
//     $("#footer").load("./footer.html");
// });

// 年度をGet
function get_fiscal_year() {
    const DATE = new Date();
    let year = DATE.getFullYear();
    let month = DATE.getMonth();
    if(month < 4) --year;
    return year;
}

// team
function switch_display_team(year) {
    const oldest_year = 2011;
    for(let now = get_fiscal_year(); now >= oldest_year; --now) {
        document.getElementById('kyoto-team-' + now).style.display = "none";
    }
    document.getElementById('kyoto-team-' + year).style.display = "block";
}

// events
function switch_display_events(year) {
    const oldest_year = 2010;
    for(let now = get_fiscal_year(); now >= oldest_year; --now) {
        document.getElementById('kyoto-events-' + now).style.display = "none";
    }
    document.getElementById('kyoto-events-' + year).style.display = "block";
}

// ページのDOMツリー構築完了後、今年のチームだけをdisplayする
document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById("kyoto-team-2011")) {
        switch_display_team(get_fiscal_year());
    }
});

// ページのDOMツリー構築完了後、今年のイベントだけをdisplayする
document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById("kyoto-events-2011")) {
        switch_display_events(get_fiscal_year());
    }
});