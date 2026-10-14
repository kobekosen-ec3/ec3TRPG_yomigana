function createStory(...parts) {
  return parts.flatMap(({ speaker, text, effect }) => {
    const sentences = (text.match(/[^。！？]*[。！？]+[」』）】]?|[^。！？]+$/g) ?? [])
      .map(sentence => sentence.trim())
      .filter(sentence => sentence !== "");

    return sentences.map((sentence, index) => ({
      speaker,
      text: sentence,

      // 効果は、その文章グループの最後にだけ実行する
      ...(index === sentences.length - 1 && effect ? { effect } : {})
    }));
  });
}

const story1 = createStory(
  {
    speaker: "ナレーター",
    text: `
      <ruby>午後<rt>ごご</rt></ruby>4<ruby>時<rt>じ</rt></ruby>17<ruby>分<rt>ぷん</rt></ruby>。
      <ruby>町全体<rt>まちぜんたい</rt></ruby>を<ruby>大<rt>おお</rt></ruby>きな<ruby>揺<rt>ゆ</rt></ruby>れが<ruby>襲<rt>おそ</rt></ruby>う。
      <ruby>鳴<rt>な</rt></ruby>りやまない<ruby>地鳴<rt>じな</rt></ruby>り、<ruby>傾<rt>かたむ</rt></ruby>く<ruby>電柱<rt>でんちゅう</rt></ruby>、そして<ruby>無線<rt>むせん</rt></ruby>の<ruby>声<rt>こえ</rt></ruby>。
    `
  },
  {
    speaker: "<ruby>防災無線<rt>ぼうさいむせん</rt></ruby>",
    text: `
      「こちら〇〇町<ruby>防災<rt>ぼうさい</rt></ruby>センター。
      <ruby>津波警報発令<rt>つなみけいほうはつれい</rt></ruby>。
      <ruby>津波到達<rt>つなみとうたつ</rt></ruby>まで<ruby>約<rt>やく</rt></ruby>10<ruby>分<rt>ぷん</rt></ruby>。
      <ruby>高台<rt>たかだい</rt></ruby>、または<ruby>指定避難所<rt>していひなんじょ</rt></ruby>へ<ruby>避難<rt>ひなん</rt></ruby>してください――<ruby>繰<rt>く</rt></ruby>り<ruby>返<rt>かえ</rt></ruby>します――」
    `
  },
  {
    speaker: "ナレーター",
    text: `
      あなたは<ruby>海辺<rt>うみべ</rt></ruby>の<ruby>商店街<rt>しょうてんがい</rt></ruby>にいた。
      <ruby>家<rt>いえ</rt></ruby>も、<ruby>荷物<rt>にもつ</rt></ruby>も、すべてを<ruby>捨<rt>す</rt></ruby>てて、いま<ruby>命<rt>いのち</rt></ruby>だけを<ruby>抱<rt>かか</rt></ruby>えて――<ruby>走<rt>はし</rt></ruby>らなければならない。
    `
  }
);

const story2 = createStory(
  {
    speaker: "ナレーター",
    text: `
        <ruby>店<rt>みせ</rt></ruby>のガラスが<ruby>割<rt>わ</rt></ruby>れ、<ruby>道路<rt>どうろ</rt></ruby>に<ruby>亀裂<rt>きれつ</rt></ruby>が<ruby>走<rt>はし</rt></ruby>っている。
        <ruby>携帯<rt>けいたい</rt></ruby>は<ruby>圏外<rt>けんがい</rt></ruby>。<ruby>周<rt>まわ</rt></ruby>りはパニックだ。
    `
  },
);


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
    { speaker: "ナレーター", text: "<ruby>道路<rt>どうろ</rt></ruby>が<ruby>陥没<rt>かんぼつ</rt></ruby>している。<ruby>車<rt>くるま</rt></ruby>の<ruby>列<rt>れつ</rt></ruby>が<ruby>動<rt>うご</rt></ruby>かない。" },
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
    {speaker: "ナレーター", text: "{playerName}は<ruby>救助<rt>きゅうじょ</rt></ruby>に<ruby>行<rt>い</rt></ruby>くことにした。" }
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
    {speaker: "ナレーター", text: "{playerName}は<ruby>他<rt>ほか</rt></ruby>の<ruby>避難者<rt>ひなんしゃ</rt></ruby>を<ruby>支<rt>ささ</rt></ruby>えながら<ruby>進<rt>すす</rt></ruby>んだ。" }
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
    { speaker: "ナレーター", text: "もう、<ruby>津波<rt>つなみ</rt></ruby>が迫っている。"}
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
