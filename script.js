    // =======================
// ROAD to ROCKstar Ver1.1
// script.js 前半
// =======================

let player = {
    name: "",
    level: 1,
    love: 0,
    fans: 0,
    day: 1,
    month: 4,
    practice: 0
};

let currentQuestion = null;

const titleScreen = document.getElementById("title-screen");
const gameScreen = document.getElementById("game");

const place = document.getElementById("place");
const story = document.getElementById("story");
const buttons = document.getElementById("buttons");

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {

    loadGame();

    if (!player.name) {

        let name = prompt("君の名前を入力してください");

        if (!name || name.trim() === "") {
            name = "名無しのベーシスト";
        }

        player.name = name;
    }

    document.getElementById("playerName").textContent = player.name;

    titleScreen.style.display = "none";
    gameScreen.style.display = "block";

    updateStatus();

    move("home");

}

function updateStatus(){

    document.getElementById("playerName").textContent = player.name;

    document.getElementById("level").textContent = player.level;

    document.getElementById("love").textContent = player.love;

    document.getElementById("fans").textContent = player.fans;

}

function saveGame(){

    localStorage.setItem(
        "roadToRockstar",
        JSON.stringify(player)
    );

}

function loadGame(){

    const data = localStorage.getItem("roadToRockstar");

    if(data){

        player = JSON.parse(data);

    }

}

function nextDay(){

    player.day++;

    if(player.day>30){

        player.day=1;

        player.month++;

        if(player.month>12){

            player.month=1;

        }

    }

}

function move(area){

    if(area==="home"){

        place.textContent="🏠 自宅";

        story.innerHTML=`
        <h3>${player.month}月 ${player.day}日</h3>
        今日も最高の邦ロックを探しに行こう。
        `;

        buttons.innerHTML=`

        <button onclick="practice()">
        🎸 ベースを練習
        </button>

        <button onclick="move('school')">
        🏫 学校
        </button>

        <button onclick="move('live')">
        🎤 ライブハウス
        </button>

        <button onclick="move('shop')">
        🎸 楽器店
        </button>

        `;

    }

    else if(area==="school"){

        place.textContent="🏫 学校";

        story.innerHTML=`
        授業が終わった。

        軽音部へ向かおう。
        `;

        buttons.innerHTML=`

        <button onclick="practice()">
        🎸 部活で練習
        </button>

        <button onclick="move('home')">
        🏠 帰宅
        </button>

        `;

    }

    else if(area==="live"){

        place.textContent="🎤 ライブハウス";

        story.innerHTML=`
        店長「邦ロック好きか？

        クイズに挑戦してみろ！」
        `;

        buttons.innerHTML=`

        <button onclick="quiz()">
        🎸 クイズ
        </button>

        <button onclick="move('home')">
        🏠 帰宅
        </button>

        `;

    }

    else{

        place.textContent="🎸 楽器店";

        story.innerHTML=`
        新しいベースやエフェクターが並んでいる。
        `;

        buttons.innerHTML=`

        <button onclick="move('home')">
        🏠 帰宅
        </button>

        `;

    }

}
function practice(){

    nextDay();

    const gain = Math.floor(Math.random()*16)+10;
    const fanGain = Math.floor(Math.random()*3)+1;

    player.love += gain;
    player.fans += fanGain;
    player.practice++;

    while(player.love>=100){
        player.love-=100;
        player.level++;
    }

    updateStatus();
    saveGame();

    place.textContent="🎸 ベース練習";

    story.innerHTML=`
    練習お疲れ！

    ❤️ 邦ロック愛 +${gain}

    👥 ファン +${fanGain}

    ⭐ Lv.${player.level}
    `;

    buttons.innerHTML=`
    <button onclick="practice()">もう一回練習</button>
    <button onclick="move('home')">🏠 自宅へ戻る</button>
    `;

}

function quiz(){

    nextDay();

    currentQuestion =
        questions[Math.floor(Math.random()*questions.length)];

    place.textContent="🎤 邦ロッククイズ";

    story.innerHTML=`
    <h3>${currentQuestion.question}</h3>
    `;

    let html="";

    currentQuestion.choices.forEach((choice,index)=>{

        html += `
        <button onclick="answer(${index})">
        ${choice}
        </button>
        `;

    });

    html += `
    <button onclick="move('home')">
    🏠 やめる
    </button>
    `;

    buttons.innerHTML=html;

}

function answer(index){

    if(index===currentQuestion.answer){

        player.love += currentQuestion.reward;
        player.fans += 5;

        while(player.love>=100){

            player.love-=100;
            player.level++;

        }

        story.innerHTML=`
        <h2>⭕ 正解！</h2>

        ❤️ +${currentQuestion.reward}

        👥 +5
        `;

    }else{

        story.innerHTML=`
        <h2>❌ 不正解！</h2>

        正解は

        <b>${currentQuestion.choices[currentQuestion.answer]}</b>
        `;

    }

    updateStatus();
    saveGame();

    buttons.innerHTML=`
    <button onclick="quiz()">次の問題</button>
    <button onclick="move('home')">🏠 自宅へ戻る</button>
    `;

}

function resetGame(){

    if(confirm("セーブデータを削除しますか？")){

        localStorage.removeItem("roadToRockstar");

        location.reload();

    }

}

window.onload=function(){

    loadGame();

};
