let player = {
    name: "",
    level: 1,
    love: 0,
    fans: 0
};

const titleScreen = document.getElementById("title-screen");
const gameScreen = document.getElementById("game");

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {

    let name = prompt("君の名前を入力してください");

    if (!name || name.trim() === "") {
        name = "名無しのベーシスト";
    }

    player.name = name;

    document.getElementById("playerName").textContent = player.name;

    titleScreen.style.display = "none";
    gameScreen.style.display = "block";

    updateStatus();

saveGame();
}

function updateStatus() {

    document.getElementById("level").textContent = player.level;
    document.getElementById("love").textContent = player.love;
    document.getElementById("fans").textContent = player.fans;

}

function move(place){

    const title=document.getElementById("place");
    const story=document.getElementById("story");
    const buttons=document.getElementById("buttons");

    if(place==="school"){

        title.textContent="🏫 学校";

        story.innerHTML=
        "今日も授業。<br><br>放課後は軽音部でベースを弾こう。";

        buttons.innerHTML=`
        <button onclick="move('home')">🏠 自宅へ戻る</button>
        <button onclick="move('live')">🎤 ライブハウス</button>
        `;

    }

    else if(place==="live"){

        title.textContent="🎤 ライブハウス";

        story.innerHTML=
        "店長『初めて見る顔やな。<br><br>まずは邦ロッククイズで腕試しや！』";

        buttons.innerHTML=`
        <button onclick="quiz()">🎸 クイズに挑戦</button>
        <button onclick="move('home')">🏠 自宅へ戻る</button>
        `;

    }

    else if(place==="shop"){

        title.textContent="🎸 楽器店";

        story.innerHTML=
        "新しいエフェクターやベースが並んでいる。";

        buttons.innerHTML=`
        <button onclick="move('home')">🏠 自宅へ戻る</button>
        `;

    }

    else{

        title.textContent="🏠 自宅";

        story.innerHTML=
        "今日も最高の邦ロックを探しに行こう。";

        buttons.innerHTML=`
        <button onclick="move('school')">🏫 学校</button>
        <button onclick="move('live')">🎤 ライブハウス</button>
        <button onclick="move('shop')">🎸 楽器店</button>
        `;

    }

}

function quiz(){

    const title=document.getElementById("place");
    const story=document.getElementById("story");
    const buttons=document.getElementById("buttons");

    title.textContent="🎸 邦ロッククイズ";

    story.innerHTML="Saucy Dogのボーカルは？";

    buttons.innerHTML=`
    <button onclick="answer(true)">石原慎也</button>
    <button onclick="answer(false)">野田洋次郎</button>
    <button onclick="answer(false)">藤原基央</button>
    <button onclick="answer(false)">尾崎世界観</button>
    `;
}

function answer(index){

    const story=document.getElementById("story");
    const buttons=document.getElementById("buttons");

    if(index===currentQuestion.answer){

        player.love += currentQuestion.reward;

        if(player.love>=100){

            player.level++;
            player.love=0;

        }

        player.fans+=5;

        updateStatus();
        saveGame();

        story.innerHTML=
        "⭕ 正解！<br><br>邦ロック愛 +"+currentQuestion.reward+"<br>ファン +5";

    }else{

        story.innerHTML=
        "❌ 不正解！";

    }

    buttons.innerHTML=`
    <button onclick="quiz()">🎸 次の問題</button>
    <button onclick="move('home')">🏠 自宅へ戻る</button>
    `;
}
function saveGame() {

    localStorage.setItem("roadToRockstar", JSON.stringify(player));

}

function loadGame() {

    const data = localStorage.getItem("roadToRockstar");

    if (!data) return;

    player = JSON.parse(data);

    document.getElementById("playerName").textContent = player.name;

    updateStatus();

}

function resetGame(){

    localStorage.removeItem("roadToRockstar");

    location.reload();

}
