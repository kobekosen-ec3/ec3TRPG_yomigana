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
    document.querySelectorAll(".go-game-link").forEach(link => {
        link.addEventListener("click", async (event) => {
            event.preventDefault(); // 一旦ページ遷移をストップ
            
            const targetUrl = link.getAttribute("href");
            const confirmed = await showCustomConfirm("ゲーム画面に遷移しますか？");
            if (confirmed && targetUrl) {
                window.location.href = targetUrl; // OKの場合のみ指定URLへ遷移
            }
        });
    });