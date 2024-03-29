const url = window.location.href;
document.getElementById("url").innerHTML = url;
let isDivVisible = false;

document.addEventListener('DOMContentLoaded', function () {
    const rootDiv = document.getElementById('root');

    rootDiv.innerHTML = `
            <h1 class="text-3xl font-bold underline text-clifford">여기는 JS 함수가 연결된 root div입니다.</h1>
            <br>
            <a class="p-2 bg-teal-300 rounded-md text-lg font-bold" href="/">이전 정적 페이지로 이동</a>
            <br>
            <br>

            <h1 class="my-2">* 아래 버튼들은 클라이언트로 내려받은 bundle.JS 파일 코드로 동작합니다.</h1>
            <div class="flex flex-wrap gap-2">
                <button class="p-2 bg-amber-300 rounded-md text-lg font-bold" onclick="showWarning()">경고 띄우기</button>
                <button id="toggle-button" class="p-2 border rounded-md text-lg font-bold" onclick="toggleColor()">배경색 토글</button>
                <button class="p-2 border rounded-md text-lg font-bold" onclick="initColor()">배경색 초기화</button>
                <button id="switchDiv" class="p-2 bg-[#6799FF] rounded-md text-lg font-bold" onclick="toggle()">DOM 생성</button>
            </div>
            <div class="w-full h-24 rounded-md my-2 border" id="toggle-div"></div>
            <p class="my-2">JS로 페이지 이동 없이 사용자와 상호작용하는 다양한 기능과 매끄러운 전환 효과 구현</p>
            <p class="my-2">axios나 fetch를 활용한 비동기 통신을 통해 Ajax 데이터 패치도 가능</p>
            <p class="my-2">SPA는 이 원리로 개발자가 작성한 거대한 JS 번들에서 root div 안의 무수한 이벤트와 DOM 트리를 지지고 볶는다.</p>
        `;
});

const showWarning = () => {
    alert('안녕하세요!');
}

const toggleColor = () => {
    const div = document.getElementById("toggle-div");
    const button = document.getElementById("toggle-button");

    if (div.style.backgroundColor === "rgb(92, 209, 229)") {
        div.style.backgroundColor = "#86E57F";
        button.style.backgroundColor = "#86E57F";
    } else {
        div.style.backgroundColor = "#5CD1E5";
        button.style.backgroundColor = "#5CD1E5";
    }
}

const initColor = () => {
    const div = document.getElementById("toggle-div");
    const button = document.getElementById("toggle-button");

    div.style.backgroundColor = "white";
    button.style.backgroundColor = "inherit";
}

const addChildDom = () => {
    const parent = document.getElementById("parent");
    const addBtn = document.getElementById("addBtn");

    const childHtml = '<div class="child h-full flex items-center"><img class="my-2 mr-4 p-4 w-full" src="/images/dom.png" alt="DOM"/></div>';

    parent.insertAdjacentHTML("beforeend", childHtml.repeat(3));
    addBtn.remove();
}

const toggle = () => {
    const root = document.getElementById("root");
    const div = document.getElementById("myDiv");
    const button = document.getElementById("switchDiv");

    if (isDivVisible) {
        // div 요소 제거
        div.parentNode.removeChild(div);
        isDivVisible = false;
        button.classList.remove("bg-[#FFA7A7]");
        button.classList.add("bg-[#6799FF]");
        button.innerText = 'DOM 생성'
    } else {
        // div 요소 생성
        const div = document.createElement("div");

        div.id = "myDiv";
        div.innerHTML = `
                <div class="flex items-center gap-2">
                    <div class="flex gap-2">
                        <img class="my-2 mr-4 p-4 w-1/3" src="/images/dom.png" alt="DOM"/>
                        <div id="parent" class="w-1/2 flex gap-2"></div>
                    </div>
                    <button id="addBtn" class="p-2 rounded bg-cyan-300 w-[160px]" onclick="addChildDom()">자식 추가</button>
                </div>
            `;
        div.className = "p-4 rounded-md bg-[#6799FF] font-bold";
        div.style.fontSize = "16px";
        button.classList.remove("bg-[#6799FF]");
        button.classList.add("bg-[#FFA7A7]");
        button.innerText = 'DOM 제거'

        // root div -> 요소 추가
        root.appendChild(div);
        isDivVisible = true;
    }
}