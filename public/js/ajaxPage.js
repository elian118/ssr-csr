const url = window.location.href;
document.getElementById("url").innerHTML = url;

const API_URL = document.cookie.split('=')[1];
const noData = `<tr><td class="p-2">조회된 데이터가 없습니다.</td></tr>`;
const table = document.getElementById("result");
let dataPage = 0;

table.innerHTML = noData;

$('#btnAjax').click(function() {
    console.log('클라이언트에서 데이터 패칭을 진행합니다.');
    $.ajax({
        type: "GET",
        url: API_URL,
        dataType:"json",
        success: function(res) {
            let data = '';

            res.slice(dataPage, dataPage + 5).forEach((e) => {
                const tr = `
                        <tr>
                            <td class="pr-2"><img class="rounded-lg w-[80px]" src=${e.poster_path} alt=${e.title}/></td>
                            <td class="p-2 border w-[250px]">${e.original_title}</td>
                            <td class="p-2 border w-[110px]">${e.release_date}</td>
                        </tr>
                    `;
                data = data + tr;

            });

            table.innerHTML = data.length > 0  ? data : noData;
        }
    });
    console.log('랜더링 완료');

    dataPage = dataPage === 20 ? 0 : dataPage + 5;
});