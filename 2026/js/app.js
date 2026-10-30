/**
 * ゲームエンジン・イベント結合モジュール（ストーリー矛盾・判定修復版）
 */

// GASのウェブアプリURL
const GAS_URL = "https://script.google.com/macros/s/AKfycbzYJBjaDmOJHeAi6pYLpKeSvaEbzC_FGIFHtoO24y_Sv3torRszN-OV3SCiywPDMAu1tQ/exec";

// 同じプレイ結果を二重に記録しないための変数
let endRecorded = false;

document.addEventListener("DOMContentLoaded", () => {    // 一括ダイス
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

    // ゲーム開始
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
        endRecorded = false;
        GameState.rubyEnabled = UI.elements.rubyToggle.checked;
        document.body.classList.toggle("hide-ruby", !GameState.rubyEnabled);

        GameState.chapter = story1;
        GameState.storyIndex = 0;

        UI.showScreen("game");
        changeText();
    });

    // 次へ
    document.getElementById("next").addEventListener("click", () => {
        if (GameState.storyIndex < GameState.chapter.length) {
            changeText();
        } else {
            handleBranch();
        }
    });

    // 場所・残り時間表示から戻る
    document.getElementById("nextco").addEventListener("click", () => {
        handleCountBack();
    });

    // コマンド選択
    document.getElementById("cmd1").addEventListener("click", () => selectCmd(1));
    document.getElementById("cmd2").addEventListener("click", () => selectCmd(2));
    document.getElementById("cmd3").addEventListener("click", () => selectCmd(3));

    // ダイス
    document.getElementById("dicescreen").addEventListener("click", () => {
        handleDiceRoll();
    });

    // ステータス確認
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

    // 最初からやり直す
    document.getElementById("reset").addEventListener("click", () => {
        GameState.reset();
        UI.updateStatsUI();
        UI.elements.playerNameInput.value = "";
        UI.showScreen("status");
    });

    // Enterキーの制御
    document.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;

        // 初期設定画面またはステータス確認画面のときは無効化
        if (UI.screens.status.style.display === "block" || UI.screens.staOverlay.style.display === "block") return;

        // ★ダイス画面が表示されている時は「ダイスを振る/次へ」ボタンを押す
        if (UI.screens.dice.style.display === "flex" || UI.screens.dice.style.display === "block") {
            document.getElementById("dicescreen").click();
            return;
        }

        // 黒画面表示中
        if (GameState.pendingCount === 1) {
            document.getElementById("nextco").click();
        } else {
            document.getElementById("next").click();
        }
    });

    /**
     * 文章を1つ表示する
     */
    function changeText() {
        const currentStory = GameState.chapter[GameState.storyIndex];

        UI.displayStory(currentStory);

        if (currentStory.effect) {
            currentStory.effect();
        }

        GameState.storyIndex++;
    }

    /**
     * 場所・残り時間の黒画面を表示する
     */
    function showCountScreen(lossTime, placeText) {
        GameState.time -= lossTime;
        GameState.pendingCount = 1;

        UI.showScreen("count");

        UI.elements.time.textContent = GameState.time > 0 ? GameState.time : "0";

        UI.elements.place.innerHTML = GameState.rubyEnabled
            ? placeText
            : UI.removeRuby(placeText);
    }

    /**
     * 黒画面の次へを押した際の分岐（修正版）
     */
    function handleCountBack() {
        const currentChapter = GameState.chapter;
        let nextChapter = story2;

        if (currentChapter === story1) {
            nextChapter = story2;
        }
        else if ([story2_1_m, story2_1_s, story2_2_m, story2_2_s, story2_3_m, story2_3_s].includes(currentChapter)) {
            nextChapter = story3;
        }
        else if ([story3_1_m, story3_1_s, story3_2_m, story3_2_s, story3_3_m, story3_3_s].includes(currentChapter)) {
            nextChapter = story4;
        }
        else if ([story4_1_m, story4_1_s, story4_2_m, story4_2_s, story4_3_m, story4_3_s].includes(currentChapter)) {
            nextChapter = story5;
        }
        else if ([story5_1_s, story5_1_m, story5_2_s, story5_2_m, story5_3_s, story5_3_m].includes(currentChapter)) {
            nextChapter = story6;
        }
        else if (currentChapter === story6) {
            // エンディング判定分岐（優先順位の調整）
            if (GameState.time >= 0) {
                if (GameState.rescuedPerson === 1) {
                    nextChapter = story7_1; // ハッピーエンド（時間内避難成功）
                    
                } else {
                    nextChapter = story7_2; // ビターエンド（時間切れだが救助達成）
                }
            } else {
                nextChapter = story7_3; // バッドエンド（時間切れ＆逃げ遅れ） 
            }
        }

        GameState.storyIndex = 0;
        GameState.chapter = nextChapter;
        GameState.pendingCount = 0;

        UI.showScreen("game");
        changeText();
    }

    /**
     * コマンド画面を表示する
     */
    function showCmdScreen(cap1, cap2, cap3, text1, text2, text3) {
        UI.showScreen("cmd");

        UI.elements.cmd1.innerHTML = GameState.rubyEnabled ? UI.addRuby(text1) : text1;
        UI.elements.cmd2.innerHTML = GameState.rubyEnabled ? UI.addRuby(text2) : text2;
        UI.elements.cmd3.innerHTML = GameState.rubyEnabled ? UI.addRuby(text3) : text3;

        GameState.pendingCmd = { cap1, cap2, cap3 };
    }

    /**
     * 選んだコマンドの文章へ移動する
     */
    function selectCmd(num) {
        if (!GameState.pendingCmd) return;

        GameState.chapter = GameState.pendingCmd[`cap${num}`];
        GameState.storyIndex = 0;
        GameState.pendingCmd = null;

        UI.showScreen("game");
        changeText();
    }

    /**
     * ダイス画面を表示する
     */
    function showDiceScreen(statName, capSuccess, capFail, targetVal) {
        UI.showScreen("dice");

        GameState.pendingDice = {
            
            statName,
            capSuccess,
            capFail,
            targetVal,
            diceValue: null
        };

        const diceButton = document.getElementById("dicescreen");
        const diceResult = document.getElementById("dice-result");

        diceButton.innerHTML = "ダイスを<ruby>振<rt>ふ</rt></ruby>る";
        diceResult.innerHTML = "";
    }
    /**
     * ダイス判定
     * 能力値 + ダイスの目 が targetVal より大きければ成功
     */
    function handleDiceRoll() {
        if (!GameState.pendingDice) return;

        const diceButton = document.getElementById("dicescreen");
        const diceResult = document.getElementById("dice-result");

        // 1回目：ダイスの目を表示する
        if (GameState.pendingDice.diceValue === null) {
            const diceValue = Math.floor(Math.random() * 6 + 1);
            GameState.pendingDice.diceValue = diceValue;

            diceResult.innerHTML =
                `<strong>${diceValue}</strong>が<ruby>出<rt>で</rt></ruby>た。`;

            diceButton.innerHTML = "<ruby>次<rt>つぎ</rt></ruby>へ";
            return;
        }

        // 2回目：能力値と合わせて判定する
        const diceValue = GameState.pendingDice.diceValue;

        const statValue =
            (GameState[GameState.pendingDice.statName] || 0) + diceValue;

        GameState.chapter =
            statValue >= GameState.pendingDice.targetVal
                ? GameState.pendingDice.capSuccess
                : GameState.pendingDice.capFail;

        GameState.storyIndex = 0;
        GameState.pendingDice = null;

        UI.showScreen("game");
        changeText();
    }

    /**
     * 章ごとの分岐
     */
    function handleBranch() {
        const currentChapter = GameState.chapter;

        // 第1章終了
        if (currentChapter === story1) {
            showCountScreen(0, "<ruby>体育館<rt>たいいくかん</rt></ruby>・<ruby>展示会場<rt>てんじかいじょう</rt></ruby>");
        }

        // 第2章：火災発生
        else if (currentChapter === story2) {
            showCmdScreen(
                story2_1,
                story2_2,
                story2_3,
                "後方の非常口へ向かう",
                "近くの人に声をかけ、避難を促す",
                "体育館横の通路から運動場へ向かう"
            );
        }
        else if (currentChapter === story2_1) {
            showDiceScreen("hp", story2_1_s, story2_1_m, 5);
        }
        else if (currentChapter === story2_2) {
            showDiceScreen("handan", story2_2_s, story2_2_m, 5);
        }
        else if (currentChapter === story2_3) {
            showDiceScreen("luck", story2_3_s, story2_3_m, 5);
        }
        else if ([story2_1_m, story2_1_s, story2_2_m, story2_2_s, story2_3_m, story2_3_s].includes(currentChapter)) {
            showCountScreen(2, "<ruby>体育館後方<rt>たいいくかんこうほう</rt></ruby>・<ruby>非常口付近<rt>ひじょうぐちふきん</rt></ruby>");
        }

        // 第3章：助けを求める声（修正：選択肢3の矛盾解消）
        else if (currentChapter === story3) {
            showCmdScreen(
                story3_1,
                story3_2,
                story3_3,
                "けが人を支え、非常口へ向かう",
                "けが人を助けず、避難を優先する",
                "周囲に大声で協力を呼びかける"
            );
        }
        else if (currentChapter === story3_1) {
            showDiceScreen("handan", story3_1_s, story3_1_m, 7);
        }
        else if (currentChapter === story3_2) {
            showDiceScreen("speed", story3_2_s, story3_2_m, 4);
        }
        else if (currentChapter === story3_3) {
            showDiceScreen("handan", story3_3_s, story3_3_m, 6);
        }
        else if ([story3_1_m, story3_1_s, story3_2_m, story3_2_s, story3_3_m, story3_3_s].includes(currentChapter)) {
            showCountScreen(2, "<ruby>体育館後方<rt>たいいくかんこうほう</rt></ruby>・<ruby>屋外通路<rt>おくがいつうろ</rt></ruby>");
        }

        // 第4章：運動場への道
        else if (currentChapter === story4) {
            showCmdScreen(
                story4_1,
                story4_2,
                story4_3,
                "人の流れに合わせ、運動場へ急ぐ",
                "周囲の人と声をかけ合いながら進む",
                "人の少ない別の通路を進む"
            );
        }
        else if (currentChapter === story4_1) {
            showDiceScreen("hp", story4_1_s, story4_1_m, 9);
        }
        else if (currentChapter === story4_2) {
            showDiceScreen("handan", story4_2_s, story4_2_m, 8);
        }
        else if (currentChapter === story4_3) {
            showDiceScreen("luck", story4_3_s, story4_3_m, 10);
        }
        else if ([story4_1_m, story4_1_s, story4_2_m, story4_2_s, story4_3_m, story4_3_s].includes(currentChapter)) {
            showCountScreen(2, "<ruby>運動場<rt>うんどうじょう</rt></ruby><ruby>入口<rt>いりぐち</rt></ruby>");
        }

        // 第5章：最後の確認
        else if (currentChapter === story5) {
            showCmdScreen(
                story5_1,
                story5_2,
                story5_3,
                "自分の安全を優先し、運動場へ向かう",
                "周囲の人と安否確認をしながら進む",
                "体育館に近づき、火災の様子を見に行く"
            );
        }
        else if (currentChapter === story5_1) {
            showDiceScreen("hp", story5_1_s, story5_1_m, 8);
        }
        else if (currentChapter === story5_2) {
            showDiceScreen("handan", story5_2_s, story5_2_m, 8);
        }
        else if (currentChapter === story5_3) {
            showDiceScreen("luck", story5_3_s, story5_3_m, 11);
        }
        else if ([story5_1_m, story5_1_s, story5_2_m, story5_2_s, story5_3_s, story5_3_m].includes(currentChapter)) {
            showCountScreen(2, "<ruby>運動場<rt>うんどうじょう</rt></ruby>");
        }

        // エンディング前
        else if (currentChapter === story6) {
            showCountScreen(0, "<ruby>運動場<rt>うんどうじょう</rt></ruby>");
            UI.elements.time.textContent = "-";
        }

        // エンディング画面切り替え
        else if (currentChapter === story7_3) {
            showEnd("gameover");
        }
        else if (currentChapter === story7_2) {
            showEnd("trueEnd");
        }
        else if (currentChapter === story7_1) {
            showEnd("happyEnd");
        }
    }

    /**
     * エンディング表示
     */
    function showEnd(endType) {
        UI.showScreen(endType);
        UI.screens.endActions.style.display = "block";

        let endingName = "";

        if (endType === "happyEnd") {
            endingName = "happyEnd";
        }
        else if (endType === "trueEnd") {
            endingName = "trueEnd";
        }
        else if (endType === "gameover") {
            endingName = "gameover";
        }

        recordGameEnd(GameState.playerName, endingName);
    }

    function recordGameEnd(userName, endingName) {
    // 同じエンドを何度も記録しない
    if (endRecorded || !endingName) return;

    endRecorded = true;

    const data = {
        userName: userName || "名前なし",
        ending: endingName
    };

    fetch(GAS_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(data)
        }).catch((error) => {
            console.error("プレイ記録の送信に失敗しました。", error);
        });
    }

    /**
     * 自作の警告確認モーダルダイアログ
     * @param {string} message - 表示メッセージ
     * @returns {Promise<boolean>} - OKならtrue、キャンセルならfalse
     */
    function showCustomConfirm(message) {
        return new Promise((resolve) => {
            const modal = document.getElementById("confirm-modal");
            const msgElement = document.getElementById("modal-message");
            const btnOk = document.getElementById("modal-ok");
            const btnCancel = document.getElementById("modal-cancel");

            msgElement.innerHTML = message;
            modal.style.display = "flex";

            // OKボタン押下時
            const handleOk = () => {
                cleanup();
                resolve(true);
            };

            // キャンセルボタン押下時
            const handleCancel = () => {
                cleanup();
                resolve(false);
            };

            // 後処理（イベント解除＆モーダル非表示）
            const cleanup = () => {
                modal.style.display = "none";
                btnOk.removeEventListener("click", handleOk);
                btnCancel.removeEventListener("click", handleCancel);
            };

            btnOk.addEventListener("click", handleOk);
            btnCancel.addEventListener("click", handleCancel);
        });
    }

    // ==================================================
    // ページ遷移（トップに戻る等）の警告ダイアログ処理
    // ==================================================
    document.querySelectorAll(".back-top-link").forEach(link => {
        link.addEventListener("click", async (event) => {
            event.preventDefault(); // 一旦ページ遷移をストップ
            
            const targetUrl = link.getAttribute("href");
            const confirmed = await showCustomConfirm("トップページに戻りますか？<br>(進行状況は保存されません。)");
            if (confirmed && targetUrl) {
                window.location.href = targetUrl; // OKの場合のみ指定URLへ遷移
            }
        });
    });
});