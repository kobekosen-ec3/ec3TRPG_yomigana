/**
 * ゲームのステータスおよび状態管理
 */
const GameState = {
    playerName: "",
    rubyEnabled: true,
    
    // ステータス値
    hp: 0,
    speed: 0,
    luck: 0,
    handan: 0,
    
    // 進行状態
    time: 10,
    rescuedPerson: 0,
    chapter: null,
    storyIndex: 0,
    
    // 保留中の画面判定データ
    pendingCmd: null,
    pendingDice: null,
    pendingCount: 0,

    /**
     * ステータスの一括リセット
     */
    reset() {
        this.playerName = "";
        this.hp = 0;
        this.speed = 0;
        this.luck = 0;
        this.handan = 0;
        this.time = 10;
        this.rescuedPerson = 0;
        this.chapter = null;
        this.storyIndex = 0;
        this.pendingCmd = null;
        this.pendingDice = null;
        this.pendingCount = 0;
    },

    /**
     * ランダムステータス生成（合計15以下）
     */
    rollInitialStats() {
        let total = 0;
        do {
            this.hp = Math.floor(Math.random() * 6 + 1);
            this.speed = Math.floor(Math.random() * 6 + 1);
            this.luck = Math.floor(Math.random() * 6 + 1);
            this.handan = Math.floor(Math.random() * 6 + 1);
            total = this.hp + this.speed + this.luck + this.handan;
        } while (total > 15);
        return total;
    }
};