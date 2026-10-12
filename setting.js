let rubyEnabled = true;
let displayedStory = null;

//読み仮名削除設定
function removeRuby(html) {
  const rubyPattern = new RegExp(
    "<ruby>(.*?)<rt>[\\s\\S]*?<\\/rt><\\/ruby>",
    "g"
  );

  return html.replace(rubyPattern, "$1");
}

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