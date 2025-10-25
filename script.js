function dice(status) {
    let d = document.getElementById(status);
    m = Math.floor(Math.random()*6+1);
    d.textContent = m;
}

function diceRoll() {
    return Math.floor(Math.random() * 6 + 1); // 1～6を返す
}
function changetext(){
    let currentText = chapter[storyIndex].text;
    let currentName = chapter[storyIndex].speaker;

    currentText = currentText.replace("{playerName}", playerName);
    currentName = currentName.replace("{playerName}", playerName);

    // ★ここで自動でルビ付与！
    // currentText = addFurigana(currentText);

    document.getElementById("speaker").innerHTML = currentName;
    document.getElementById("text").innerHTML = currentText;

    if (chapter[storyIndex].effect) {
        chapter[storyIndex].effect();
    }
    storyIndex++;
}

// const furiganaList = [
//     {kanji: "開始", ruby: "<ruby>開始<rt>かいし</rt></ruby>"},
//     {kanji: "午後", ruby: "<ruby>午後<rt>ごご</rt></ruby>"},
//     {kanji: "津波", ruby: "<ruby>津波<rt>つなみ</rt></ruby>"},
//     {kanji: "避難", ruby: "<ruby>避難<rt>ひなん</rt></ruby>"},
//     {kanji: "海辺", ruby: "<ruby>海辺<rt>うみべ</rt></ruby>"},
//     {kanji: "揺", ruby: "<ruby>揺<rt>ゆ</rt></ruby>"},
//     {kanji: "襲", ruby: "<ruby>襲<rt>おそ</rt></ruby>"},
//     {kanji: "町全体", ruby: "<ruby><rt></rt></ruby>"},  
// ];

// function addFurigana(text) {
//     furiganaList.forEach(word => {
//         const reg = new RegExp(word.kanji, "g");
//         text = text.replace(reg, word.ruby);
//     });
//     return text;
// }

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

const sta = document.getElementById('sta');
const spead_set = document.getElementById('spead_set');
const handan_set = document.getElementById('handan_set');
const hp_set = document.getElementById('hp_set');
const luck_set = document.getElementById('luck_set');

const start = document.getElementById('start');
const next = document.getElementById("next");
const nextco = document.getElementById("nextco");
const dicescreen = document.getElementById("dicescreen");
const cmd1 = document.getElementById("cmd1");
const cmd2 = document.getElementById("cmd2");
const cmd3 = document.getElementById("cmd3");
const time = document.getElementById("time");
const place = document.getElementById("place");
const status = document.getElementById("status");
const Status = document.getElementById("Status");
const StatusBuck = document.getElementById("StatusBuck");

const Happyend = document.getElementById("Happyend");
const gameover = document.getElementById("gameover");
const Trend = document.getElementById("Trueend");

const LUCK_game=document.getElementById("LUCK_game");
const SPEAD_game=document.getElementById("SPEAD_game");
const HP_game=document.getElementById("HP_game");
const HANDAN_game=document.getElementById("HANDAN_game");



// sta.addEventListener("click",()=>{
//     dice("HP");
//     dice("SPEAD");
//     dice("LUCK");
//     dice("HANDAN");
// });
let hpnum=0, speadnum=0, lucknum=0, handannum=0, total=0;
sta.addEventListener("click", () => {
    do {
        // 各ステータスをランダムに1〜6で振る
        hpnum = Math.floor(Math.random() * 6 + 1);
        speadnum = Math.floor(Math.random() * 6 + 1);
        lucknum = Math.floor(Math.random() * 6 + 1);
        handannum = Math.floor(Math.random() * 6 + 1);
        total = hpnum + speadnum + lucknum + handannum; // 合計値を計算
    } while (total > 15); // 15を超えたら振り直し

    // HTML上に表示
    document.getElementById("HP").textContent = hpnum;
    document.getElementById("SPEAD").textContent = speadnum;
    document.getElementById("LUCK").textContent = lucknum;
    document.getElementById("HANDAN").textContent = handannum;

    totalset();
    console.log(`合計: ${total}`); // デバッグ確認用
});

let person;
function totalset(){
    total = hpnum + speadnum + lucknum + handannum;
    document.getElementById("Total").textContent = total;
    if (total > 15) {
        Total.classList.add("red");
        Total.classList.remove("black");
    } else{
        
        Total.classList.add("black");
        Total.classList.remove("red");
    }
}
hp_set.addEventListener("click", () =>{
    hpnum = Math.floor(Math.random() * 6 + 1);
    document.getElementById("HP").textContent = hpnum;
    totalset();

})

spead_set.addEventListener("click", () =>{
    speadnum = Math.floor(Math.random() * 6 + 1);
    document.getElementById("SPEAD").textContent = speadnum;
    totalset();
})

luck_set.addEventListener("click", () =>{
    lucknum = Math.floor(Math.random() * 6 + 1);
    document.getElementById("LUCK").textContent = lucknum;
    totalset();
})

handan_set.addEventListener("click", () =>{
    handannum = Math.floor(Math.random() * 6 + 1);
    document.getElementById("HANDAN").textContent = handannum;
    totalset();
})



let Luck;
let Spead;
let Hp;
let Handan;
let playerName;

let inventory = [];
let help=[];

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
 
    // 画面切り替え
    document.getElementById("status-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    console.log("HP:",Hp,"SPEAD:",Spead,"LUCK:",lucknum,"HANDAN:",Handan);

    // ゲーム画面初期表示
    document.getElementById("speaker").innerHTML = "ナレーター";
    document.getElementById("text").innerHTML = "ゲームを<ruby>開始<rt>かいし</rt></ruby>します。";
});



const story1 = [
    { speaker: "ナレーター", text: "<ruby>午後<rt>ごご</rt></ruby>4<ruby>時<rt>じ</rt></ruby>17<ruby>分<rt>ぷん</rt></ruby>。" },
    { speaker: "ナレーター", text: "<ruby>町全体<rt>まちぜんたい</rt></ruby>を<ruby>大<rt>おお</rt></ruby>きな<ruby>揺<rt>ゆ</rt></ruby>れが<ruby>襲<rt>おそ</rt></ruby>う。" },
    { speaker: "ナレーター", text: "<ruby>鳴<rt>な</rt></ruby>りやまない<ruby>地鳴<rt>じな</rt></ruby>り、<ruby>傾<rt>かたむ</rt></ruby>く<ruby>電柱<rt>でんちゅう</rt></ruby>、そして<ruby>無線<rt>むせん</rt></ruby>の<ruby>声<rt>こえ</rt></ruby>。" },
    { speaker: "<ruby>防災無線<rt>ぼうさいむせん</rt></ruby>", text: "「こちら〇〇町<ruby>防災<rt>ぼうさい</rt></ruby>センター。<ruby>津波警報発令<rt>つなみけいほうはつれい</rt></ruby>。<ruby>津波到達<rt>つなみとうたつ</rt></ruby>まで<ruby>約<rt>やく</rt></ruby>10<ruby>分<rt>ぷん</rt></ruby>。<ruby>高台<rt>たかだい</rt></ruby>、または<ruby>指定避難所<rt>していひなんじょ</rt></ruby>へ<ruby>避難<rt>ひなん</rt></ruby>してください――<ruby>繰<rt>く</rt></ruby>り<ruby>返<rt>かえ</rt></ruby>します――」" },
    { speaker: "ナレーター", text: "あなたは<ruby>海辺<rt>うみべ</rt></ruby>の<ruby>商店街<rt>しょうてんがい</rt></ruby>にいた。" },
    { speaker: "ナレーター", text: "<ruby>家<rt>いえ</rt></ruby>も、<ruby>荷物<rt>にもつ</rt></ruby>も、すべてを<ruby>捨<rt>す</rt></ruby>てて、いま<ruby>命<rt>いのち</rt></ruby>だけを<ruby>抱<rt>かか</rt></ruby>えて――<ruby>走<rt>はし</rt></ruby>らなければならない。" }
];

const story2 =[
    { speaker: "ナレーター", text: "<ruby>店<rt>みせ</rt></ruby>のガラスが<ruby>割<rt>わ</rt></ruby>れ、<ruby>道路<rt>どうろ</rt></ruby>に<ruby>亀裂<rt>きれつ</rt></ruby>が<ruby>走<rt>はし</rt></ruby>っている。" },
    { speaker: "ナレーター", text: "<ruby>携帯<rt>けいたい</rt></ruby>は<ruby>圏外<rt>けんがい</rt></ruby>。<ruby>周<rt>まわ</rt></ruby>りはパニックだ。" }
];

const story2_1 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>高台<rt>たかだい</rt></ruby>に<ruby>向<rt>む</rt></ruby>かうことにした。" }
    
];

const story2_1_s =[
    { speaker: "ナレーター", text: "<ruby>道<rt>みち</rt></ruby>は<ruby>比較的<rt>ひかくてき</rt></ruby><ruby>安定<rt>あんてい</rt></ruby>していた。" }
];

const story2_1_m =[
    { speaker: "ナレーター", text: "<ruby>転<rt>ころ</rt></ruby>んでしまった。" , effect: () => { Time -= 1; }}
];

const story2_2 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>周<rt>まわ</rt></ruby>りの<ruby>人<rt>ひと</rt></ruby>を<ruby>助<rt>たす</rt></ruby>けることにした。" }
];

const story2_2_s =[
    { speaker: "ナレーター", text: "<ruby>困<rt>こま</rt></ruby>っているお<ruby>年寄<rt>としよ</rt></ruby>りを<ruby>無事<rt>ぶじ</rt></ruby>に<ruby>救助<rt>きゅうじょ</rt></ruby>した" , effect: () => { person = 1;Time -= 1; }}
];
const story2_2_m =[
    { speaker: "ナレーター", text: "<ruby>救助<rt>きゅうじょ</rt></ruby>に<ruby>失敗<rt>しっぱい</rt></ruby>した", effect: () => { Time -= 1; }  },
];
const story2_3 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>車<rt>くるま</rt></ruby>で<ruby>避難<rt>ひなん</rt></ruby>することにした。" }
];
const story2_3_s =[
    { speaker: "ナレーター", text: "<ruby>無事<rt>ぶじ</rt></ruby>に<ruby>運転<rt>うんてん</rt></ruby>できた。", effect: () => { Time += 1; } }
];

const story2_3_m =[
    { speaker: "ナレーター", text: "<ruby>渋滞<rt>じゅうたい</rt></ruby>で<ruby>動<rt>うご</rt></ruby>けなくなった。" , effect: () => { Time -= 2; }}
];


const story3 = [
    { speaker: "ナレーター", text: "<ruby>道路<rt>どうろ</rt></ruby>が<ruby>陥没<rt>かんぼつ</rt></ruby>している。車の列が動かない。" },
    { speaker: "ナレーター", text: "<ruby>人々<rt>ひとびと</rt></ruby>が<ruby>徒歩<rt>とほ</rt></ruby>で<ruby>先<rt>さき</rt></ruby>に<ruby>進<rt>すす</rt></ruby>もうとしている。" }
];

const story3_1 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>線路<rt>せんろ</rt></ruby>を<ruby>渡<rt>わた</rt></ruby>ることにした。" }
];

const story3_1_s =[
    { speaker: "ナレーター", text: "<ruby>無事<rt>ぶじ</rt></ruby>に<ruby>線路<rt>せんろ</rt></ruby>を<ruby>渡<rt>わた</rt></ruby>りきった。" , effect: () => { Time -= 1; }}
];

const story3_1_m =[
    { speaker: "ナレーター", text: "<ruby>転<rt>ころ</rt></ruby>んでしまった。" , effect: () => { Time -= 2; }}
];

const story3_2 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>遠回<rt>とおまわ</rt></ruby>りして<ruby>橋<rt>はし</rt></ruby>を<ruby>渡<rt>わた</rt></ruby>ることにした。" }
];

const story3_2_s =[
    { speaker: "ナレーター", text: "<ruby>無事<rt>ぶじ</rt></ruby>に<ruby>橋<rt>はし</rt></ruby>を<ruby>渡<rt>わた</rt></ruby>ることができた。" ,effect: () => { Time -= 1; }}
];
const story3_2_m =[
    { speaker: "ナレーター", text: "<ruby>橋<rt>はし</rt></ruby>が<ruby>落<rt>お</rt></ruby>ちかけで<ruby>時間<rt>じかん</rt></ruby>を<ruby>取<rt>と</rt></ruby>られてしまった。", effect: () => { Time += 1; }  },
];
const story3_3 =[
    {speaker: "ナレーター", text: "{playerName}はほかの<ruby>避難者<rt>ひなんしゃ</rt></ruby>に<ruby>声<rt>こえ</rt></ruby>をかけることにした。" }
];
const story3_3_s =[
    { speaker: "ナレーター", text: "<ruby>協力<rt>きょうりょく</rt></ruby>して<ruby>進<rt>すす</rt></ruby>むことになった。", effect: () => { person = 1;Time += 1; }}
];

const story3_3_m =[
    { speaker: "ナレーター", text: "<ruby>声<rt>こえ</rt></ruby>をかけられなかった。",effect: () => { Time -= 1; }}
];

const story4=[
    { speaker:"ナレーター", text: "<ruby>水道管<rt>すいどうかん</rt></ruby>が<ruby>破裂<rt>はれつ</rt></ruby>し、<ruby>足元<rt>あしもと</rt></ruby>を<ruby>水<rt>みず</rt></ruby>が<ruby>流<rt>なが</rt></ruby>れる。"},
    { speaker:"ナレーター", text: "<ruby>家<rt>いえ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>から<ruby>助<rt>たす</rt></ruby>けを<ruby>求<rt>もと</rt></ruby>める<ruby>声<rt>こえ</rt></ruby>がする。"},
];

const story4_1 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>無視<rt>むし</rt></ruby>して<ruby>坂道<rt>さかみち</rt></ruby>を<ruby>登<rt>のぼ</rt></ruby>ることにした。" }
    
];

const story4_1_s =[
    { speaker: "ナレーター", text: "<ruby>無事<rt>ぶじ</rt></ruby>に<ruby>登<rt>のぼ</rt></ruby>りきれた。"}
];

const story4_1_m =[
    { speaker: "ナレーター", text: "<ruby>転<rt>ころ</rt></ruby>んでしまった。" , effect: () => { Time -= 1; }}
];

const story4_2 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>救助<rt>きゅうじょ</rt></ruby>に<ruby>行<rtい</rt></ruby>くことにした。" }
];

const story4_2_s =[
    { speaker: "ナレーター", text: "<ruby>無事<rt>ぶじ</rt></ruby>に<ruby>救助<rt>きゅうじょ</rt></ruby>できた。" , effect: () => { person = 1;Time -= 1; }  }
];
const story4_2_m =[
    { speaker: "ナレーター", text: "<ruby>助<rt>たす</rt></ruby>けられなかった。", effect: () => { Time -= 1; }  },
];
const story4_3 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>近道<rt>ちかみち</rt></ruby>で<ruby>進<rt>すす</rt></ruby>むことにした。" }
];
const story4_3_s =[
    { speaker: "ナレーター", text: "ショートカットできた。", effect: () => { Time += 1; } }
];

const story4_3_m =[
    { speaker: "ナレーター", text: "<ruby>迷子<rt>まいご</rt></ruby>になってしまった。", effect: () => { Time -= 1; }}
];


const story5=[
    { speaker:"ナレーター", text: "<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>り<ruby>始<rt>はじ</rt></ruby>め、<ruby>地面<rt>じめん</rt></ruby>が<ruby>滑<rt>すべ</rt></ruby>りやすくなる。"},
    { speaker:"ナレーター",text:"<ruby>後<rt>うし</rt></ruby>ろから<ruby>大<rt>おお</rt></ruby>きな<ruby>轟音<rt>ごうおん</rt></ruby>――<ruby>津波<rt>つなみ</rt></ruby>の<ruby>音<rt>おと</rt></ruby>が<ruby>近<rt>ちか</rt></ruby>い。"}
];

const story5_1 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>全力<rt>ぜんりょく</rt></ruby>で<ruby>駆<rt>か</rt></ruby>け<ruby>上<rt>のぼ</rt></ruby>った。", effect: () => { Time += 1; } }
    
];

const story5_1_s =[
    { speaker: "ナレーター", text: "<ruby>避難所<rt>ひなんじょ</rt></ruby>は<ruby>間近<rt>まぢか</rt></ruby>だ。"}
];

const story5_1_m =[
    { speaker: "ナレーター", text: "<ruby>転<rt>ころ</rt></ruby>んでしまった。" , effect: () => { Time -= 1; }}
];

const story5_2 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>他<rt>ほか</rt></ruby>の<ruby>避難者<rt>ひなんしゃ</rt></ruby>を<ruby>支<rt>ささ</rt></ruby>えながら<ruby>進<rtすすす</rt></ruby>んだ。" }
];

const story5_2_s =[
    { speaker: "ナレーター", text: "<ruby>無事<rt>ぶじ</rt></ruby>に<ruby>進<rt>すす</rt></ruby>めた。" , effect: () => { person = 1; } }
];
const story5_2_m =[
    { speaker: "ナレーター", text: "<ruby>時間<rt>じかん</rt></ruby>がかかってしまった。", effect: () => { Time -= 1; person = 1; }   },
];
const story5_3 =[
    {speaker: "ナレーター", text: "{playerName}は<ruby>別<rt>べつ</rt></ruby>ルートでで<ruby>進<rt>すす</rt></ruby>むことにした。" }
];
const story5_3_s =[
    { speaker: "ナレーター", text: "<ruby>無事<rt>ぶじ</rt></ruby>に<ruby>進<rt>すす</rt></ruby>むことができた。", effect: () => { Time += 2; } }
];

const story5_3_m =[
    { speaker: "ナレーター", text: "<ruby>雪崩<rt>なだれ</rt></ruby>に<ruby>巻<rt>ま</rt></ruby>き<ruby>込<rt>こ</rt></ruby>まれた。"}
];


const story6 = [
    { speaker:"ナレーター",text:"<ruby>校門<rt>こうもん</rt></ruby>の<ruby>向<rt>む</rt></ruby>こうに<ruby>避難所<rt>ひなんじょ</rt></ruby>の<ruby>明<rt>あ</rt></ruby>かりが<ruby>見<rt>み</rt></ruby>える。"},
    { speaker: "ナレーター", text: "だが<ruby>背後<rt>はいご</rt></ruby>で「ドォォン……」という<ruby>轟音<rt>ごうおん</rt></ruby>。"},
    { speaker: "ナレーター", text: "もう、津波が迫っている。"}
];

const story7_1 =[
    {speaker:"ナレーター", text:"<ruby>校舎<rt>こうしゃ</rt></ruby>の<ruby>屋上<rt>おくじょう</rt></ruby>に<ruby>避難<rt>ひなん</rt></ruby>したあなたは、<ruby>息<rt>いき</rt></ruby>を<ruby>切<rt>き</rt></ruby>らして<ruby>振<rt>ふ</rt></ruby>り<ruby>返<rt>かえ</rt></ruby>る。"},
    {speaker:"ナレーター",text:"<ruby>町<rt>まち</rt></ruby>が<ruby>波<rt>なみ</rt></ruby>に<ruby>飲<rt>の</rt></ruby>み<ruby>込<rt>こ</rt></ruby>まれていく<ruby>光景<rt>こうけい</rt></ruby>が、<ruby>夕日<rt>ゆうひ</rt></ruby>に<ruby>照<rt>て</rt></ruby>らされていた。"},
    {speaker:"ナレーター", text:"<ruby>誰<rt>だれ</rt></ruby>かが<ruby>泣<rt>な</rt></ruby>いている。<ruby>誰<rt>だれ</rt></ruby>かが<ruby>祈<rt>いの</rt></ruby>っている。"},
    {speaker:"ナレーター",text:"それでも、あなたは「<ruby>生<rt>い</rt></ruby>き<ruby>延<rt>の</rt></ruby>びた」。"}
];

const story7_2 =[
    {speaker:"ナレーター", text:"<ruby>最後<rt>さいご</rt></ruby>に<ruby>仲間<rt>なかま</rt></ruby>を<ruby>背負<rt>せお</rt></ruby>って<ruby>走<rt>はし</rt></ruby>ったあなた。"},
    {speaker:"ナレーター",text:"<ruby>門<rt>もん</rt></ruby>をくぐる<ruby>瞬間<rt>しゅんかん</rt></ruby>、<ruby>仲間<rt>なかま</rt></ruby>の<ruby>手<rt>て</rt></ruby>が<ruby>離<rt>はな</rt></ruby>れた。"},
    {speaker:"ナレーター", text:"<ruby>波<rt>なみ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>に<ruby>消<rt>き</rt></ruby>える<ruby>姿<rt>すがた</rt></ruby>を<ruby>見<rt>み</rt></ruby>て、あなたは<ruby>叫<rt>さけ</rt></ruby>ぶ。"},
    {speaker:"ナレーター", text:"「<ruby>必<rt>かなら</rt></ruby>ず<ruby>戻<rt>もど</rt></ruby>るから――！」"},
    {speaker:"ナレーター",text:"その<ruby>声<rt>こえ</rt></ruby>は、<ruby>波音<rt>なみおと</rt></ruby>にかき<ruby>消<rt>け</rt></ruby>された。"}
];

const story7_3 =[
    {speaker:"ナレーター", text:"<ruby>濁流<rt>だくりゅう</rt></ruby>が<ruby>町<rt>まち</rt></ruby>を<ruby>飲<rt>の</rt></ruby>み<ruby>込<rt>こ</rt></ruby>み、すべてが<ruby>白<rt>しろ</rt></ruby>く<ruby>消<rt>き</rt></ruby>えた。"},
    {speaker:"ナレーター",text:"――しかし、<ruby>翌年<rt>よくねん</rt></ruby>。<ruby>墓石<rt>ぼせき</rt></ruby>に、<ruby>刻<rt>きざ</rt></ruby>まれていた。"},
    {speaker:"ナレーター", text:"<ruby>誰<rt>だれ</rt></ruby>かが、あなたを<ruby>思<rt>おも</rt></ruby>い<ruby>出<rt>だ</rt></ruby>していた。"}
];

let Time=10;

let chapter = story1; // 最初はstory1
let storyIndex = 0;
// status.addEventListener("click",()=>{
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

let decrsta=null;
let pendingDice = null;

let pendingcount =0;

function count(losstime, Place){
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("count").style.display="block";
    Time-=losstime;

    pendingcount=1;
    document.getElementById("time").innerHTML = Time;
    
    if(Time<=0){
        document.getElementById("time").innerHTML = "0";
    }
    document.getElementById("place").innerHTML = Place;
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
    document.getElementById("gameover").style.display="block";
}

function trueend(){
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("Trueend").style.display="block";
}
function happyend(){
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("Happyend").style.display="block";
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





