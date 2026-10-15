function displayStory(story) {
  let currentText = story.text
    .replace("{playerName}", playerName)
    .replace("{hours}", hours)
    .replace("{minutes}", minutes);
  let currentName = story.speaker.replace("{playerName}", playerName);
//   let currentText = story.text
//     .replaceAll("{playerName}", playerName)
//     .replaceAll("{currentTime}", gameStartTime);

  if (!rubyEnabled) {
    currentText = removeRuby(currentText);
    currentName = removeRuby(currentName);
  }

  document.getElementById("speaker").innerHTML = currentName;
  document.getElementById("text").innerHTML = currentText;
}

function changetext() {
  const currentStory = chapter[storyIndex];

  displayStory(currentStory);
  displayedStory = currentStory;

  if (currentStory.effect) {
    currentStory.effect();
  }

  storyIndex++;
}

document.addEventListener("keydown", (e) => {
    // Enterキーが押された場合
    if (e.key === "Enter") {
        if(document.getElementById("status-screen").style.display==="block"){
            return;
        }
        if(pendingcount==1){
            nextco.click();
        }else{
        next.click(); 
        }
    }
});


function getDate(){
    const now = new Date(); // 現在時刻を取得
    year = now.getFullYear(); // 年
    month = now.getMonth() + 1; // 月 (0から始まるため+1)
    date = now.getDate(); // 日
    hours = now.getHours(); // 時
    minutes = now.getMinutes(); // 分
    // const seconds = now.getSeconds(); // 秒

    console.log(`${year}/${month}/${date} ${hours}:${minutes}`);
    // 出力例: 2023/10/5 14:30:45
}
start.addEventListener("click", () => {
    // 入力値取得
    playerName = document.getElementById("playerName").value.trim();
    let hpnum = parseInt(document.getElementById("HP").textContent);
    let speadnum = parseInt(document.getElementById("SPEAD").textContent);
    let lucknum = parseInt(document.getElementById("LUCK").textContent);
    let handannum = parseInt(document.getElementById("HANDAN").textContent);

    Luck = lucknum;
    Hp=hpnum;
    Spead=speadnum;
    Handan=handan=0;
    person=0;

    let Total=lucknum+speadnum+hpnum+handannum;
    // 未入力チェック
    if (!playerName || hpnum==0 || speadnum==0 || lucknum==0|| handannum==0 || !hpnum || !speadnum || !lucknum|| !handannum) {
        alert("未入力の項目があります！");
        return;
    }else if(Total>15){
        alert("設定値を超えています！(合計ステータスは15まで)");
        return;
    }

    rubyEnabled = document.getElementById("ruby-toggle").checked;

    document.body.classList.toggle("hide-ruby", !rubyEnabled);
 
    // 画面切り替え
    document.getElementById("status-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    console.log("HP:",Hp,"SPEAD:",Spead,"LUCK:",lucknum,"HANDAN:",Handan);

    // ゲーム画面初期表示
    document.getElementById("speaker").innerHTML = "ナレーター";
    const startText = "ゲームを<ruby>開始<rt>かいし</rt></ruby>します。";

    document.getElementById("text").innerHTML =
    rubyEnabled ? startText : removeRuby(startText);
    getDate();
});


let chapter = story1; // 最初はstory1
let storyIndex = 0;
let storycap=0;


nextco.addEventListener("click", () => {
    if (chapter === story1) {
            countbuck(story2);
        }else if(chapter===story2_1_m||chapter===story2_1_s||chapter===story2_2_m||chapter===story2_2_s||chapter===story2_3_m||chapter===story2_3_s){
            countbuck(story3);
        }else if(chapter===story3_1_m||chapter===story3_1_s||chapter===story3_2_m||chapter===story3_2_s||chapter===story3_3_m||chapter===story3_3_s){
            countbuck(story4);
            storyIndex=0;
        }else if(chapter===story4_1_m||chapter===story4_1_s||chapter===story4_2_m||chapter===story4_2_s||chapter===story4_3_m||chapter===story4_3_s){
            countbuck(story5);
        }else if(chapter===story5_3_m){
            countbuck(story7_3);
        }else if(chapter===story5_1_s||chapter===story5_2_s||chapter===story5_3_s||chapter===story5_1_m||chapter===story5_2_m){
          chapter=story6;
          
          countbuck(story6);
        }else if(chapter===story6||Time<=0){
          if(person==1&&Time<=0){
            countbuck(story7_2);
            console.log("trueend",person);
          }else if(Time<=0){
            countbuck(story7_3);
            console.log("badend",person);
          }
          else{
            countbuck(story7_1);
          }
        }
        
});
let st6=0;



next.addEventListener("click", () => {
    if (storyIndex < chapter.length) {
        // まだ文章が残っているとき
        changetext();
    } else {
        if(chapter === story1){
            count(0,"<ruby>商店街<rt>しょうてんがい</rt></ruby>");
        }else if(chapter === story2){
            storyIndex = 0;
            cmdScreen(story2_1,story2_2,story2_3,"<ruby>高台方向<rt>たかだいほうこう</rt></ruby>へ<ruby>走<rt>はし</rt></ruby>り<ruby>出<rt>だ</rt></ruby>す","<ruby>人<rt>ひと</rt></ruby>を<ruby>助<rt>たす</rt></ruby>ける","<ruby>車<rt>くるま</rt></ruby>で<ruby>避難<rt>ひなん</rt></ruby>する");
        }else if(chapter===story2_1){
            storyIndex=0;
            diceScreen("hpnum",story2_1_s,story2_1_m,5);
        }else if(chapter===story2_2){
            storyIndex=0;
            diceScreen("handannum",story2_2_s,story2_2_m,4);
        }else if(chapter===story2_3){
            storyIndex=0;
            diceScreen("lucknum",story2_3_s,story2_3_m,7);
        }else if(chapter===story2_1_m||chapter===story2_1_s||chapter===story2_2_m||chapter===story2_2_s||chapter===story2_3_m||chapter===story2_3_s){
          console.log(person);
            count(2,"<ruby>駅前交差点<rt>えきまえこうさてん</rt></ruby>");
        }else if(chapter===story3){
            // storyIndex = 0;
            cmdScreen(story3_1,story3_2,story3_3,"<ruby>線路<rt>せんろ</rt></ruby>を<ruby>横断<rt>おうだん</rt></ruby>する","<ruby>少<rt>すこ</rt></ruby>し<ruby>離<rt>はな</rt></ruby>れた<ruby>橋<rt>はし</rt></ruby>を<ruby>渡<rt>わた</rt></ruby>る","<ruby>他<rt>ほか</rt></ruby>の<ruby>避難者<rt>ひなんしゃ</rt></ruby>に<ruby>声<rt>こえ</rt></ruby>をかける");
        }else if(chapter===story3_1){
            storyIndex=0;
            diceScreen("hpnum",story3_1_s,story3_1_m,8);
        }else if(chapter===story3_2){
            storyIndex=0;
            diceScreen("lucknum",story3_2_s,story3_2_m,9);
        }else if(chapter===story3_3){
            storyIndex=0;
            diceScreen("handannum",story3_3_s,story3_3_m,7);
        }else if(chapter===story3_1_m||chapter===story3_1_s||chapter===story3_2_m||chapter===story3_2_s||chapter===story3_3_m||chapter===story3_3_s){
            count(2,"<ruby>住宅街<rt>じゅうたくがい</rt></ruby>");
        }else if(chapter===story4){
            storyIndex = 0;
            cmdScreen(story4_1,story4_2,story4_3,"<ruby>坂道<rt>さかみち</rt></ruby>を<ruby>登<rt>のぼ</rt></ruby>る","<ruby>救助<rt>きゅうじょ</rt></ruby>に<ruby>向<rt>む</rt></ruby>かう","<ruby>近道<rt>ちかみち</rt></ruby>を<ruby>進<rt>すす</rt></ruby>む");
        }else if(chapter===story4_1){
            storyIndex=0;
            diceScreen("hpnum",story4_1_s,story4_1_m,10);
        }else if(chapter===story4_2){
            storyIndex=0;
            diceScreen("handannum",story4_2_s,story4_2_m,10);
        }else if(chapter===story4_3){
            storyIndex=0;
            diceScreen("lucknum",story4_3_s,story4_3_m,11);
        }else if(pendingcount==0&&(chapter===story4_1_m||chapter===story4_1_s||chapter===story4_2_m||chapter===story4_2_s||chapter===story4_3_m||chapter===story4_3_s)){
            count(2,"<ruby>避難所<rt>ひなんじょ</rt></ruby><ruby>近<rt>ちか</rt></ruby>くの<ruby>丘道<rt>おかみち</rt></ruby>");
        }else if(chapter===story5){
            storyIndex = 0;
            cmdScreen(story5_1,story5_2,story5_3,"<ruby>全力<rt>ぜんりょく</rt></ruby>で<ruby>駆<rt>か</rt></ruby>け上がる","ほかの<ruby>避難者<rt>ひなんしゃ</rt></ruby>を<ruby>支<rt>ささ</rt></ruby>える","<ruby>別<rt>べつ</rt></ruby>のルートを<ruby>進<rt>すす</rt></ruby>む");
        }else if(chapter===story5_1){
            storyIndex=0;
            diceScreen("hpnum",story5_1_s,story5_1_m,12);
        }else if(chapter===story5_2){
            storyIndex=0;
            diceScreen("handannum",story5_2_s,story5_2_m,12);
        }else if(chapter===story5_3){
            storyIndex=0;
            diceScreen("lucknum",story5_3_s,story5_3_m,12);
        }
        else if(chapter===story5_1_m||chapter===story5_1_s||chapter===story5_2_m||chapter===story5_2_s||chapter
          ===story5_3_s){
            count(2,"<ruby>避難所目前<rt>ひなんじょもくぜん</rt></ruby>");
        }
        else if(chapter===story5_3_m){
            count("0","<ruby>津波到達<rt>つなみとうたつ</rt></ruby>");
            document.getElementById("time").innerHTML = "-";
        }else if(chapter===story6){
          count("0","<ruby>津波到達<rt>つなみとうたつ</rt></ruby>");
          document.getElementById("time").innerHTML = "-";

        }
        else if(chapter===story7_3){
          console.log(Time,person);
            badend();
        }else if(chapter===story7_2){
          console.log(Time,person);
          
            trueend();
        }else if(chapter===story7_1){
          console.log(Time,person);
          
            happyend();
        }
    }
});


let num=0; 



function count(losstime, Place){
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("count").style.display="block";
    Time-=losstime;

    pendingcount=1;
    document.getElementById("time").innerHTML = Time;
    
    if(Time<=0){
        document.getElementById("time").innerHTML = "0";
    }
    document.getElementById("place").innerHTML = rubyEnabled ? Place : removeRuby(Place);
}

function countbuck(cap){
        storyIndex = 0;
        chapter=cap;
            if (Time <= 0&&chapter!==story6&&chapter!==story7_1&&chapter!==story7_2&&chapter!==story7_3&&chapter!==story5_1_s&&chapter!==story5_2_s&&chapter!==story5_3_s) {
                storyIndex = 0;
                chapter=story6;
            }
        pendingcount=0;
        document.getElementById("game-screen").style.display = "block";
        document.getElementById("count").style.display="none";
        changetext();
}


function badend(){
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("gameover").style.display = "block";
    end.style.display = "block";
}

function trueend(){
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("Trueend").style.display = "block";
    end.style.display = "block";
}
function happyend(){
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("Happyend").style.display = "block";
    end.style.display = "block";
}

let pendingcmd =null;

function cmdScreen(cap1,cap2,cap3,comand1,comand2,comand3){
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("cmd-screen").style.display = "block";
    document.getElementById("cmdtext1").innerHTML = comand1; 
    document.getElementById("cmdtext2").innerHTML = comand2; 
    document.getElementById("cmdtext3").innerHTML = comand3; 
    pendingcmd = { cap1: cap1, cap2: cap2, cap3: cap3 };
}

cmd1.addEventListener("click",()=>{
    // if(!pendingcmd)return;
    document.getElementById("cmd-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    chapter = pendingcmd.cap1; //        
    storyIndex = 0;
    pendingcmd = null;
    changetext();
});

cmd2.addEventListener("click",()=>{
    // if(!pendingcmd)return;
    document.getElementById("cmd-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    chapter = pendingcmd.cap2; //        
    storyIndex = 0;
    pendingcmd = null;
    changetext();
});

cmd3.addEventListener("click",()=>{
    // if(!pendingcmd)return;
    document.getElementById("cmd-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    chapter = pendingcmd.cap3; //        
    storyIndex = 0;
    pendingcmd = null;
    changetext();
});


// diceScreen関数：ステータス名を文字列で渡す
function diceScreen(staName, cap1, cap2, num) {
    document.getElementById("dice-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";

    pendingDice = { StaName: staName, cap1, cap2, num };
}

// ダイスボタンクリック時の判定
dicescreen.addEventListener("click", () => {
    if (!pendingDice) return;
    document.getElementById("dice-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    let addsta = diceRoll();
    let chacksta;

    switch (pendingDice.StaName) {
        case "lucknum":
            lucknum += addsta;
            chacksta = lucknum;
            break;
        case "hpnum":
            hpnum += addsta;
            chacksta = hpnum;
            break;
        case "speadnum":
            speadnum += addsta;
            chacksta = speadnum;
            break;
        case "handannum":
            handannum += addsta;
            chacksta = handannum;
            break;
        default:
            console.error("未定義のステータス: " + pendingDice.StaName);
            return;
    }

    document.getElementById("speaker").innerHTML = "ナレーター";
    document.getElementById("text").innerHTML = `${addsta}が<ruby>出<rt>で</rt></ruby>た！`;

    // 判定
    if (chacksta <= pendingDice.num) {
        chapter = pendingDice.cap2; // 失敗時
    } else {
        chapter = pendingDice.cap1; // 成功時
    }

    console.log("判定ステータス:", pendingDice.StaName, 
                "判定値:", chacksta, 
                "目標値:", pendingDice.num);

    storyIndex = 0;
    pendingDice = null; // 判定完了
});




Status.addEventListener("click", () => {
    document.getElementById("playerName_game").innerHTML = playerName; 
    document.getElementById("HP_game").innerHTML = hpnum;
    document.getElementById("SPEAD_game").innerHTML = speadnum;
    document.getElementById("LUCK_game").innerHTML = lucknum;
    document.getElementById("HANDAN_game").innerHTML = handannum;
    document.getElementById("sta-screen").style.display = "block";

    document.getElementById("game-screen").style.display = "none";
});

StatusBuck.addEventListener("click" , () => {
    document.getElementById("sta-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
});


function Reset() {
    // 変数リセット
    hpnum = 0;
    speadnum = 0;
    lucknum = 0;
    handannum = 0;
    Time = 10;
    person = 0;

    chapter = story1;
    storyIndex = 0;

    // 表示リセット
    document.getElementById("HP").textContent = "";
    document.getElementById("SPEAD").textContent = "";
    document.getElementById("LUCK").textContent = "";
    document.getElementById("HANDAN").textContent = "";
    document.getElementById("Total").textContent = "00";

    // 名前リセット
    document.getElementById("playerName").value = "";

    // 画面切り替え
    document.getElementById("status-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("cmd-screen").style.display = "none";
    document.getElementById("dice-screen").style.display = "none";
    document.getElementById("gameover").style.display = "none";
    document.getElementById("Happyend").style.display = "none";
    document.getElementById("Trueend").style.display = "none";
    document.getElementById("end").style.display = "none";
}

reset.addEventListener("click", () => {
    Reset();
});
