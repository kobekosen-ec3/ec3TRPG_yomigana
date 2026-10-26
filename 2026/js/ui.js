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
     * ゲーム内で繰り返し使う語句へふりがなを追加する
     */
    addRuby(text) {
        // 文脈で読みが変わる語を、先に保護して置き換える
        const protectedRuby = [];
        const protect = ruby => {
            const index = protectedRuby.push(ruby) - 1;
            return `@@RUBY${index}@@`;
        };

        text = text
            .replace(/(\d+)時/g, (_, number) => number + protect("<ruby>時<rt>じ</rt></ruby>"))
            .replace(/(\d+)分/g, (_, number) => number + protect("<ruby>分<rt>ふん</rt></ruby>"))
            .replace(/1人/g, protect("<ruby>1人<rt>ひとり</rt></ruby>"))
            .replace(/2人/g, protect("<ruby>2人<rt>ふたり</rt></ruby>"))
            .replace(/(\d+)人/g, (_, number) => number + protect("<ruby>人<rt>にん</rt></ruby>"))
            .replace(/分け/g, protect("<ruby>分<rt>わ</rt></ruby>け"))
            .replace(/後ろ/g, protect("<ruby>後<rt>うし</rt></ruby>ろ"));

        const readings = {
            "避難完了": "ひなんかんりょう",
            "避難経路": "ひなんけいろ",
            "非常口": "ひじょうぐち",
            "正面入口": "しょうめんいりぐち",
            "運動場": "うんどうじょう",
            "体育館": "たいいくかん",
            "学園祭": "がくえんさい",
            "企業展示": "きぎょうてんじ",
            "部活動": "ぶかつどう",
            "研究紹介": "けんきゅうしょうかい",
            "体験": "たいけん",
            "展示物": "てんじぶつ",
            "展示台": "てんじだい",
            "展示会場": "てんじかいじょう",
            "案内板": "あんないばん",
            "資料": "しりょう",
            "照明": "しょうめい",
            "非常灯": "ひじょうとう",
            "非常ベル": "ひじょうべる",
            "電源コード": "でんげんこーど",
            "電源": "でんげん",
            "火元": "ひもと",
            "後方": "こうほう",
            "通路": "つうろ",
            "屋外": "おくがい",
            "入口": "いりぐち",
            "方向": "ほうこう",
            "周囲": "しゅうい",
            "安全": "あんぜん",
            "場所": "ばしょ",
            "揺れ": "ゆれ",
            "地震": "じしん",
            "煙": "けむり",
            "避難": "ひなん",
            "火災": "かさい",
            "教職員": "きょうしょくいん",
            "企業関係者": "きぎょうかんけいしゃ",
            "来場者": "らいじょうしゃ",
            "保護者": "ほごしゃ",
            "関係者": "かんけいしゃ",
            "学生": "がくせい",
            "突然": "とつぜん",
            "天井": "てんじょう",
            "頭": "あたま",
            "守って": "まもって",
            "近づかない": "ちかづかない",
            "近づく": "ちかづく",
            "走らない": "はしらない",
            "大丈夫": "だいじょうぶ",
            "家族": "かぞく",
            "子ども": "こども",
            "けが人": "けがにん",
            "転倒": "てんとう",
            "協力": "きょうりょく",
            "判断": "はんだん",
            "体力": "たいりょく",
            "幸運値": "こううんち",
            "素早さ": "すばやさ",
            "判断力": "はんだんりょく",
            "避け": "さけ",
            "落ち着いて": "おちついて",
            "運ぶ": "はこぶ",
            "人数": "にんずう",
            "確認": "かくにん",
            "建物": "たてもの",
            "必要": "ひつよう",
            "重要": "じゅうよう",
            "命": "いのち",
            "秋": "あき",
            "多く": "おおく",
            "会場": "かいじょう",
            "集まって": "あつまって",
            "中": "なか",
            "大きく": "おおきく",
            "案内": "あんない",
            "落ち": "おち",
            "鳴り": "なり",
            "始める": "はじめる",
            "始まる": "はじまる",
            "流れ": "ながれ",
            "薄い": "うすい",
            "消え": "きえ",
            "一度": "いちど",
            "焦げた": "こげた",
            "漂って": "ただよって",
            "並ぶ": "ならぶ",
            "見える": "みえる",
            "外": "そと",
            "横": "よこ",
            "離れる": "はなれる",
            "離れた": "はなれた",
            "立ち尽くして": "たちつくして",
            "近く": "ちかく",
            "声": "こえ",
            "促す": "うながす",
            "一緒": "いっしょ",
            "危ない": "あぶない",
            "比較的": "ひかくてき",
            "安全に": "あんぜんに",
            "出る": "でる",
            "出て": "でて",
            "少ない": "すくない",
            "散らばった": "ちらばった",
            "足": "あし",
            "取られ": "とられ",
            "転び": "ころび",
            "遅れ": "おくれ",
            "時間": "じかん",
            "使って": "つかって",
            "遠回り": "とおまわり",
            "決める": "きめる",
            "保護": "ほご",
            "泣いて": "ないて",
            "少し": "すこし",
            "一人": "ひとり",
            "足をくじいて": "あしをくじいて",
            "歩け": "あるけ",
            "支えて": "ささえて",
            "広がって": "ひろがって",
            "協力者": "きょうりょくしゃ",
            "左右": "さゆう",
            "全員": "ぜんいん",
            "恐怖": "きょうふ",
            "止まり": "とまり",
            "乱れて": "みだれて",
            "手": "て",
            "引き": "ひき",
            "探す": "さがす",
            "名前": "なまえ",
            "呼ぶ": "よぶ",
            "聞こえる": "きこえる",
            "急いで": "いそいで",
            "壁際": "かべぎわ",
            "位置": "いち",
            "移動": "いどう",
            "待つ": "まつ",
            "冷たい": "つめたい",
            "空気": "くうき",
            "頬": "ほお",
            "打つ": "うつ",
            "換気口": "かんきこう",
            "付近": "ふきん",
            "運動場まで": "うんどうじょうまで",
            "人の流れ": "ひとのながれ",
            "合わせて": "あわせて",
            "急ぐ": "いそぐ",
            "歩き続け": "あるきつづけ",
            "転倒する": "てんとうする",
            "前": "まえ",
            "歩いて": "あるいて",
            "列": "れつ",
            "役割": "やくわり",
            "分け": "わけ",
            "無理": "むり",
            "速さ": "はやさ",
            "誰も": "だれも",
            "取り残さず": "とりのこさず",
            "続ける": "つづける",
            "障害物": "しょうがいぶつ",
            "混雑": "こんざつ",
            "早く": "はやく",
            "引き返す": "ひきかえす",
            "最後": "さいご",
            "優先": "ゆうせん",
            "自分": "じぶん",
            "確保": "かくほ",
            "疲れ": "つかれ",
            "着く": "つく",
            "知り合い": "しりあい",
            "残って": "のこって",
            "様子": "ようす",
            "理解": "りかい",
            "理由": "りゆう",
            "戻らず": "もどらず",
            "整理": "せいり",
            "再会": "さいかい",
            "災害時": "さいがいじ",
            "無事": "ぶじ",
            "学んだ": "まなんだ",
            "判断を遅らせて": "はんだんをおくらせて",
            "一人で": "ひとりで",
            "重要である": "じゅうようである",
            "不安": "ふあん",
            "乱": "みだ",
            "人々": "ひとびと",
            "人": "ひと",
            "今日": "きょう",
            "伝": "つた",
            "低": "ひく",
            "何": "なに",
            "促": "うなが",
            "先": "さき",
            "共": "とも",
            "内": "ない",
            "出": "で",
            "分": "ぶん",
            "別": "べつ",
            "到着": "とうちゃく",
            "十分": "じゅうぶん",
            "危険": "きけん",
            "収": "おさ",
            "向": "む",
            "咳": "せき",
            "場": "ば",
            "大切": "たいせつ",
            "始": "はじ",
            "安否": "あんぴ",
            "少": "すこ",
            "届": "とど",
            "展示": "てんじ",
            "床": "ゆか",
            "待": "ま",
            "後": "うし",
            "思": "おも",
            "情報": "じょうほう",
            "戻": "もど",
            "持": "も",
            "振": "ふ",
            "探": "さが",
            "支": "ささ",
            "散": "ち",
            "方": "ほう",
            "時": "とき",
            "気": "き",
            "求": "もと",
            "消": "き",
            "混乱": "こんらん",
            "火": "ひ",
            "点灯": "てんとう",
            "物": "もの",
            "状況": "じょうきょう",
            "着": "つ",
            "立": "た",
            "続": "つづ",
            "繰": "く",
            "置": "お",
            "荷物": "にもつ",
            "落": "お",
            "行動": "こうどう",
            "行": "い",
            "見捨": "みす",
            "見": "み",
            "誰": "だれ",
            "身": "み",
            "込": "こ",
            "近": "ちか",
            "返": "かえ",
            "迫": "せま",
            "途": "と",
            "通": "とお",
            "進": "すす",
            "選択": "せんたく",
            "選": "えら",
            "開": "ひら",
            "間": "あいだ",
            "集": "あつ",
            "離": "はな",
            "走": "はし",
            "守": "まも",
            "避": "さ",
            "尽": "つ",
            "鳴": "な",
            "流": "なが",
            "焦": "こ",
            "漂": "ただよ",
            "並": "なら",
            "危": "あぶ",
            "取": "と",
            "転": "ころ",
            "遅": "おく",
            "使": "つか",
            "決": "き",
            "泣": "な",
            "歩": "ある",
            "広": "ひろ",
            "止": "と",
            "冷": "つめ",
            "打": "う",
            "合": "あ",
            "残": "のこ",
            "疲": "つか",
            "知": "し",
            "学": "まな",
            "非常": "ひじょう",
            "多": "おお",
            "大": "おお",
            "揺": "ゆ",
            "薄": "うす",
            "遠": "とお",
            "回": "まわ",
            "子": "こ",
            "引": "ひ",
            "呼": "よ",
            "聞": "き",
            "急": "いそ",
            "速": "はや",
            "早": "はや"
        };

        // 送り仮名・カタカナ語を含む語は除外し、漢字部分だけにルビを付ける
        const words = Object.keys(readings)
            .filter(word => /^[々一-龯ヶ]+$/.test(word))
            .sort((a, b) => b.length - a.length)
            .join("|");

        const rubyText = text.replace(new RegExp(words, "g"), word => {
            return `<ruby>${word}<rt>${readings[word]}</rt></ruby>`;
        });

        return rubyText.replace(/@@RUBY(\d+)@@/g, (_, index) => {
            return protectedRuby[Number(index)];
        });
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
     * 指定画面の表示切替
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
                targetScreen.style.display = "flex";
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

        if (GameState.rubyEnabled) {
            currentText = this.addRuby(currentText);
            currentName = this.addRuby(currentName);
        } else {
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

        const total =
            GameState.hp +
            GameState.speed +
            GameState.luck +
            GameState.handan;

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