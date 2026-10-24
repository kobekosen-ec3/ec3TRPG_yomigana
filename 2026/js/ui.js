/**
 * UI操作・画面遷移・テキスト描画モジュール
 */
const UI = {
    // DOMキャッシュ
    screens: {
        status: document.getElementById("status-screen"),
        game: document.getElementById("game-screen"),
        cmd: document.getElementById("cmd-screen"),
        dice: document.getElementById("dice-screen"),
        count: document.getElementById("count"),
        staOverlay: document.getElementById("sta-screen"),
        gameover: document.getElementById("gameover"),
        trueEnd: document.getElementById("Trueend"),
        happyEnd: document.getElementById("Happyend"),
        endActions: document.getElementById("end")
    },
    
    elements: {
        speaker: document.getElementById("speaker"),
        text: document.getElementById("text"),
        time: document.getElementById("time"),
        place: document.getElementById("place"),
        playerNameInput: document.getElementById("playerName"),
        rubyToggle: document.getElementById("ruby-toggle"),
        hpText: document.getElementById("HP"),
        speedText: document.getElementById("SPEAD"),
        luckText: document.getElementById("LUCK"),
        handanText: document.getElementById("HANDAN"),
        totalText: document.getElementById("Total"),
        cmd1: document.getElementById("cmdtext1"),
        cmd2: document.getElementById("cmdtext2"),
        cmd3: document.getElementById("cmdtext3")
    },

    /**
     * ルビ（ふりがな）除去関数
     */
    removeRuby(html) {
        return html.replace(/<ruby>(.*?)<rt>[\s\S]*?<\/rt><\/ruby>/g, "$1");
    },

    /**
     * 全画面を非表示
     */
    hideAllScreens() {
        Object.values(this.screens).forEach(screen => {
            if (screen) screen.style.display = "none";
        });
    },

    /**
     * 指定画面の表示切替（黒画面・ゲーム画面の display 設定を完全適用）
     */
    showScreen(screenKey) {
        this.hideAllScreens();
        const targetScreen = this.screens[screenKey];
        if (targetScreen) {
            if (screenKey === "status" || screenKey === "staOverlay") {
                targetScreen.style.display = "block";
            } else if (screenKey === "game") {
                targetScreen.style.display = "block";
            } else if (screenKey === "count") {
                targetScreen.style.display = "flex"; // 黒画面を全画面フレックス表示
            } else {
                targetScreen.style.display = "flex";
            }
        }
    },

    /**
     * 会話テキスト描画
     */
    displayStory(story) {
        let currentText = story.text
            .replace(/{playerName}/g, GameState.playerName)
            .replace(/{hours}/g, new Date().getHours())
            .replace(/{minutes}/g, new Date().getMinutes().toString().padStart(2, "0"));

        let currentName = story.speaker.replace(/{playerName}/g, GameState.playerName);

        if (!GameState.rubyEnabled) {
            currentText = this.removeRuby(currentText);
            currentName = this.removeRuby(currentName);
        }

        this.elements.speaker.innerHTML = currentName;
        this.elements.text.innerHTML = currentText;
    },

    /**
     * ステータスUI更新
     */
    updateStatsUI() {
        this.elements.hpText.textContent = GameState.hp || "";
        this.elements.speedText.textContent = GameState.speed || "";
        this.elements.luckText.textContent = GameState.luck || "";
        this.elements.handanText.textContent = GameState.handan || "";
        
        const total = GameState.hp + GameState.speed + GameState.luck + GameState.handan;
        this.elements.totalText.textContent = total.toString().padStart(2, "0");

        if (total > 15) {
            this.elements.totalText.classList.add("red");
            this.elements.totalText.classList.remove("black");
        } else {
            this.elements.totalText.classList.add("black");
            this.elements.totalText.classList.remove("red");
        }
    }
};