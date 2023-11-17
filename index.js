(function() {
    let openPageTime = performance.now();
    window.addEventListener('load', function() {
        let loadPageTime = performance.now();
        let totalLoadTime = loadPageTime - openPageTime;
        document.getElementById('footerContent').innerText = "Page load time is " + totalLoadTime.toString() + " milliseconds";
        document.getElementById('footerContent').style.backgroundColor = '#bb2649';
    });
})();



window.onload = function (){
    if(document.location.href.includes("index")){
        alert(document.location.href)
        document.getElementById('pStyledGrey').className = "active_link";
    }
    if(document.location.href.includes("support")){
        document.getElementById('pStyledBlack about').className = "active_link";
    }
    else if(document.location.href.includes("about_us")){
        document.getElementById('pStyledBlack support').className = "active_link";
    }
}

function redirectToStudentsPage() {
    window.location.href = "students.html";
}

document.getElementById('first-button')
    .addEventListener('click', () => window.open(''));



// $(function () {
//     var location = window.location.href;
//     var cur_url = location.split('/').pop();
//     cur_url = cur_url.split('?')[0];
//     // cur_url = location.split('/').pop();
//     alert(cur_url)
//
//     $('.headerNav li').each(function () {
//         var link = $(this).find('a').attr('href');
//         alert(link)
//         if (cur_url == link) {
//             $(this).addClass('current');
//         }
//     });
// });