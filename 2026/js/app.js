/**
 * ゲームエンジン・イベント結合モジュール
 */
document.addEventListener("DOMContentLoaded", () => {
    // --- 初期ボタンイベントハンドラー ---

    // 一括ダイス
    document.getElementById("sta").addEventListener("click", () => {
        GameState.rollInitialStats();
        UI.updateStatsUI();
    });

    // 個別ダイス
    document.getElementById("hp_set").addEventListener("click", () => {
        GameState.hp = Math.floor(Math.random() * 6 + 1);
        UI.updateStatsUI();
    });
    document.getElementById("spead_set").addEventListener("click", () => {
        GameState.speed = Math.floor(Math.random() * 6 + 1);
        UI.updateStatsUI();
    });
    document.getElementById("luck_set").addEventListener("click", () => {
        GameState.luck = Math.floor(Math.random() * 6 + 1);
        UI.updateStatsUI();
    });
    document.getElementById("handan_set").addEventListener("click", () => {
        GameState.handan = Math.floor(Math.random() * 6 + 1);
        UI.updateStatsUI();
    });

    // ゲーム開始ボタン
    document.getElementById("start").addEventListener("click", () => {
        const name = UI.elements.playerNameInput.value.trim();
        const total = GameState.hp + GameState.speed + GameState.luck + GameState.handan;

        if (!name || GameState.hp === 0 || GameState.speed === 0 || GameState.luck === 0 || GameState.handan === 0) {
            alert("未入力の項目があります！");
            return;
        }
        if (total > 15) {
            alert("設定値を超えています！(合計ステータスは15まで)");
            return;
        }

        GameState.playerName = name;
        GameState.rubyEnabled = UI.elements.rubyToggle.checked;
        document.body.classList.toggle("hide-ruby", !GameState.rubyEnabled);

        GameState.chapter = story1;
        GameState.storyIndex = 0;

        UI.showScreen("game");
        changeText();
    });

    // 次へボタン（会話画面）
    document.getElementById("next").addEventListener("click", () => {
        if (GameState.storyIndex < GameState.chapter.length) {
            changeText();
        } else {
            handleBranch();
        }
    });

    // 次へボタン（黒画面カウントダウン）
    document.getElementById("nextco").addEventListener("click", () => {
        handleCountBack();
    });

    // コマンドボタン選択
    document.getElementById("cmd1").addEventListener("click", () => selectCmd(1));
    document.getElementById("cmd2").addEventListener("click", () => selectCmd(2));
    document.getElementById("cmd3").addEventListener("click", () => selectCmd(3));

    // ダイス実行
    document.getElementById("dicescreen").addEventListener("click", () => handleDiceRoll());

    // ステータス確認／戻る
    document.getElementById("Status").addEventListener("click", () => {
        document.getElementById("playerName_game").textContent = GameState.playerName;
        document.getElementById("HP_game").textContent = GameState.hp;
        document.getElementById("SPEAD_game").textContent = GameState.speed;
        document.getElementById("LUCK_game").textContent = GameState.luck;
        document.getElementById("HANDAN_game").textContent = GameState.handan;
        UI.showScreen("staOverlay");
    });

    document.getElementById("StatusBuck").addEventListener("click", () => {
        UI.showScreen("game");
    });

    // はじめからやり直す
    document.getElementById("reset").addEventListener("click", () => {
        GameState.reset();
        UI.updateStatsUI();
        UI.elements.playerNameInput.value = "";
        UI.showScreen("status");
    });

    // Enterキーショートカット
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (UI.screens.status.style.display === "block") return;
            if (GameState.pendingCount === 1) {
                document.getElementById("nextco").click();
            } else {
                document.getElementById("next").click();
            }
        }
    });

    // --- コア関数群 ---

    function changeText() {
        const currentStory = GameState.chapter[GameState.storyIndex];
        UI.displayStory(currentStory);

        if (currentStory.effect) {
            currentStory.effect();
        }
        GameState.storyIndex++;
    }

    /**
     * 黒画面（カウントダウン・場所表示）への遷移処理
     */
    function showCountScreen(lossTime, placeText) {
        GameState.time -= lossTime;
        GameState.pendingCount = 1;

        UI.showScreen("count"); // 黒画面を表示

        UI.elements.time.textContent = GameState.time > 0 ? GameState.time : "0";
        UI.elements.place.innerHTML = GameState.rubyEnabled ? placeText : UI.removeRuby(placeText);
    }

    function handleCountBack() {
        const c = GameState.chapter;
        let nextCap = story2;

        if (c === story1) nextCap = story2;
        else if ([story2_1_m, story2_1_s, story2_2_m, story2_2_s, story2_3_m, story2_3_s].includes(c)) nextCap = story3;
        else if ([story3_1_m, story3_1_s, story3_2_m, story3_2_s, story3_3_m, story3_3_s].includes(c)) nextCap = story4;
        else if ([story4_1_m, story4_1_s, story4_2_m, story4_2_s, story4_3_m, story4_3_s].includes(c)) nextCap = story5;
        else if (c === story5_3_m) nextCap = story7_3;
        else if ([story5_1_s, story5_2_s, story5_3_s, story5_1_m, story5_2_m].includes(c)) nextCap = story6;
        else if (c === story6 || GameState.time <= 0) {
            if (GameState.rescuedPerson === 1 && GameState.time <= 0) nextCap = story7_2;
            else if (GameState.time <= 0) nextCap = story7_3;
            else nextCap = story7_1;
        }

        GameState.storyIndex = 0;
        GameState.chapter = nextCap;
        GameState.pendingCount = 0;

        UI.showScreen("game");
        changeText();
    }

    function showCmdScreen(cap1, cap2, cap3, text1, text2, text3) {
        UI.showScreen("cmd");
        UI.elements.cmd1.innerHTML = text1;
        UI.elements.cmd2.innerHTML = text2;
        UI.elements.cmd3.innerHTML = text3;
        GameState.pendingCmd = { cap1, cap2, cap3 };
    }

    function selectCmd(num) {
        if (!GameState.pendingCmd) return;
        GameState.chapter = GameState.pendingCmd[`cap${num}`];
        GameState.storyIndex = 0;
        GameState.pendingCmd = null;
        UI.showScreen("game");
        changeText();
    }

    function showDiceScreen(statName, capSuccess, capFail, targetVal) {
        UI.showScreen("dice");
        GameState.pendingDice = { statName, capSuccess, capFail, targetVal };
    }

    function handleDiceRoll() {
        if (!GameState.pendingDice) return;

        const diceVal = Math.floor(Math.random() * 6 + 1);
        let statVal = GameState[GameState.pendingDice.statName] || 0;
        statVal += diceVal;

        GameState.chapter = (statVal > GameState.pendingDice.targetVal) 
            ? GameState.pendingDice.capSuccess 
            : GameState.pendingDice.capFail;

        GameState.storyIndex = 0;
        GameState.pendingDice = null;

        UI.showScreen("game");
        changeText();
    }

    function handleBranch() {
        const c = GameState.chapter;

        if (c === story1) showCountScreen(0, "<ruby>商店街<rt>しょうてんがい</rt></ruby>");
        else if (c === story2) showCmdScreen(story2_1, story2_2, story2_3, "高台方向へ走り出す", "人を助ける", "車で避難する");
        else if (c === story2_1) showDiceScreen("hp", story2_1_s, story2_1_m, 5);
        else if (c === story2_2) showDiceScreen("handan", story2_2_s, story2_2_m, 4);
        else if (c === story2_3) showDiceScreen("luck", story2_3_s, story2_3_m, 7);
        else if ([story2_1_m, story2_1_s, story2_2_m, story2_2_s, story2_3_m, story2_3_s].includes(c)) showCountScreen(2, "駅前交差点");
        else if (c === story3) showCmdScreen(story3_1, story3_2, story3_3, "線路を横断する", "橋を渡る", "声をかける");
        else if (c === story3_1) showDiceScreen("hp", story3_1_s, story3_1_m, 8);
        else if (c === story3_2) showDiceScreen("luck", story3_2_s, story3_2_m, 9);
        else if (c === story3_3) showDiceScreen("handan", story3_3_s, story3_3_m, 7);
        else if ([story3_1_m, story3_1_s, story3_2_m, story3_2_s, story3_3_m, story3_3_s].includes(c)) showCountScreen(2, "住宅街");
        else if (c === story4) showCmdScreen(story4_1, story4_2, story4_3, "坂道を登る", "救助に向かう", "近道を進む");
        else if (c === story4_1) showDiceScreen("hp", story4_1_s, story4_1_m, 10);
        else if (c === story4_2) showDiceScreen("handan", story4_2_s, story4_2_m, 10);
        else if (c === story4_3) showDiceScreen("luck", story4_3_s, story4_3_m, 11);
        else if ([story4_1_m, story4_1_s, story4_2_m, story4_2_s, story4_3_m, story4_3_s].includes(c)) showCountScreen(2, "避難所近くの丘道");
        else if (c === story5) showCmdScreen(story5_1, story5_2, story5_3, "駆け上がる", "支える", "別ルート");
        else if (c === story5_1) showDiceScreen("hp", story5_1_s, story5_1_m, 12);
        else if (c === story5_2) showDiceScreen("handan", story5_2_s, story5_2_m, 12);
        else if (c === story5_3) showDiceScreen("luck", story5_3_s, story5_3_m, 12);
        else if ([story5_1_m, story5_1_s, story5_2_m, story5_2_s, story5_3_s].includes(c)) showCountScreen(2, "避難所目前");
        else if (c === story5_3_m || c === story6) {
            showCountScreen(0, "津波到達");
            UI.elements.time.textContent = "-";
        }
        else if (c === story7_3) showEnd("gameover");
        else if (c === story7_2) showEnd("trueEnd");
        else if (c === story7_1) showEnd("happyEnd");
    }

    function showEnd(endType) {
        UI.showScreen(endType);
        UI.screens.endActions.style.display = "block";
    }
});