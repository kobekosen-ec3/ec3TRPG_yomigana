/**
 * 文章作成ユーティリティ
 */
function createStory(...parts) {
    return parts.flatMap(({ speaker, text, effect }) => {
        const sentences = (text.match(/[^。！？]*[。！？]+[」』）】]?|[^。！？]+$/g) ?? [])
            .map(s => s.trim())
            .filter(s => s !== "");

        return sentences.map((sentence, index) => ({
            speaker,
            text: sentence,
            ...(index === sentences.length - 1 && effect ? { effect } : {})
        }));
    });
}

// チャプター・ストーリー定義
const story1 = createStory(
    {
        speaker: "ナレーター",
        text: `{hours}<ruby>時<rt>じ</rt></ruby>{minutes}<ruby>分<rt>ぷん</rt></ruby>。<ruby>町全体<rt>まちぜんたい</rt></ruby>を<ruby>大<rt>おお</rt></ruby>きな<ruby>揺<rt>ゆ</rt></ruby>れが<ruby>襲<rt>おそ</rt></ruby>う。`
    },
    {
        speaker: "<ruby>防災無線<rt>ぼうさいむせん</rt></ruby>",
        text: `「こちら〇〇町<ruby>防災<rt>ぼうさい</rt></ruby>センター。<ruby>津波警報発令<rt>つなみけいほうはつれい</rt></ruby>。高台へ<ruby>避難<rt>ひなん</rt></ruby>してください――」`
    },
    {
        speaker: "ナレーター",
        text: `あなたは<ruby>海辺<rt>うみべ</rt></ruby>の<ruby>商店街<rt>しょうてんがい</rt></ruby>にいた。命だけを抱えて――走らなければならない。`
    }
);

const story2 = createStory({
    speaker: "ナレーター",
    text: `<ruby>店<rt>みせ</rt></ruby>のガラスが割れ、道路に亀裂が走っている。周りはパニックだ。`
});

const story2_1 = [{ speaker: "ナレーター", text: "{playerName}は高台に向かうことにした。" }];
const story2_1_s = [{ speaker: "ナレーター", text: "道は比較的安定していた。" }];
const story2_1_m = [{ speaker: "ナレーター", text: "転んでしまった。", effect: () => { GameState.time -= 1; } }];

const story2_2 = [{ speaker: "ナレーター", text: "{playerName}は周りの人を助けることにした。" }];
const story2_2_s = [{ speaker: "ナレーター", text: "お年寄りを無事に救助した", effect: () => { GameState.rescuedPerson = 1; GameState.time -= 1; } }];
const story2_2_m = [{ speaker: "ナレーター", text: "救助に失敗した", effect: () => { GameState.time -= 1; } }];

const story2_3 = [{ speaker: "ナレーター", text: "{playerName}は車で避難することにした。" }];
const story2_3_s = [{ speaker: "ナレーター", text: "無事に運転できた。", effect: () => { GameState.time += 1; } }];
const story2_3_m = [{ speaker: "ナレーター", text: "渋滞で動けなくなった。", effect: () => { GameState.time -= 2; } }];

const story3 = [
    { speaker: "ナレーター", text: "道路が陥没している。車の列が動かない。" },
    { speaker: "ナレーター", text: "人々が徒歩で先に進もうとしている。" }
];
const story3_1 = [{ speaker: "ナレーター", text: "{playerName}は線路を渡ることにした。" }];
const story3_1_s = [{ speaker: "ナレーター", text: "無事に線路を渡りきった。", effect: () => { GameState.time -= 1; } }];
const story3_1_m = [{ speaker: "ナレーター", text: "転んでしまった。", effect: () => { GameState.time -= 2; } }];

const story3_2 = [{ speaker: "ナレーター", text: "{playerName}は遠回りして橋を渡ることにした。" }];
const story3_2_s = [{ speaker: "ナレーター", text: "無事に橋を渡ることができた。", effect: () => { GameState.time -= 1; } }];
const story3_2_m = [{ speaker: "ナレーター", text: "橋が落ちかけで時間を取られてしまった。", effect: () => { GameState.time += 1; } }];

const story3_3 = [{ speaker: "ナレーター", text: "{playerName}はほかの避難者に声をかけることにした。" }];
const story3_3_s = [{ speaker: "ナレーター", text: "協力して進むことになった。", effect: () => { GameState.rescuedPerson = 1; GameState.time += 1; } }];
const story3_3_m = [{ speaker: "ナレーター", text: "声をかけられなかった。", effect: () => { GameState.time -= 1; } }];

const story4 = [
    { speaker: "ナレーター", text: "水道管が破裂し、足元を水が流れる。" },
    { speaker: "ナレーター", text: "家の中から助けを求める声がする。" }
];
const story4_1 = [{ speaker: "ナレーター", text: "{playerName}は無視して坂道を登ることにした。" }];
const story4_1_s = [{ speaker: "ナレーター", text: "無事に登りきれた。" }];
const story4_1_m = [{ speaker: "ナレーター", text: "転んでしまった。", effect: () => { GameState.time -= 1; } }];

const story4_2 = [{ speaker: "ナレーター", text: "{playerName}は救助に行くことにした。" }];
const story4_2_s = [{ speaker: "ナレーター", text: "無事に救助できた。", effect: () => { GameState.rescuedPerson = 1; GameState.time -= 1; } }];
const story4_2_m = [{ speaker: "ナレーター", text: "助けられなかった。", effect: () => { GameState.time -= 1; } }];

const story4_3 = [{ speaker: "ナレーター", text: "{playerName}は近道で進むことにした。" }];
const story4_3_s = [{ speaker: "ナレーター", text: "ショートカットできた。", effect: () => { GameState.time += 1; } }];
const story4_3_m = [{ speaker: "ナレーター", text: "迷子になってしまった。", effect: () => { GameState.time -= 1; } }];

const story5 = [
    { speaker: "ナレーター", text: "雨が降り始め、地面が滑りやすくなる。" },
    { speaker: "ナレーター", text: "後ろから大きな轟音――津波の音が近い。" }
];
const story5_1 = [{ speaker: "ナレーター", text: "{playerName}は全力で駆け上がった。", effect: () => { GameState.time += 1; } }];
const story5_1_s = [{ speaker: "ナレーター", text: "避難所は間近だ。" }];
const story5_1_m = [{ speaker: "ナレーター", text: "転んでしまった。", effect: () => { GameState.time -= 1; } }];

const story5_2 = [{ speaker: "ナレーター", text: "{playerName}は他の避難者を支えながら進んだ。" }];
const story5_2_s = [{ speaker: "ナレーター", text: "無事進めた。", effect: () => { GameState.rescuedPerson = 1; } }];
const story5_2_m = [{ speaker: "ナレーター", text: "時間がかかってしまった。", effect: () => { GameState.time -= 1; GameState.rescuedPerson = 1; } }];

const story5_3 = [{ speaker: "ナレーター", text: "{playerName}は別ルートで進むことにした。" }];
const story5_3_s = [{ speaker: "ナレーター", text: "無事進むことができた。", effect: () => { GameState.time += 2; } }];
const story5_3_m = [{ speaker: "ナレーター", text: "雪崩に巻き込まれた。" }];

const story6 = [
    { speaker: "ナレーター", text: "校門の向こうに避難所の明かりが見える。" },
    { speaker: "ナレーター", text: "だが背後で「ドォォン……」という轟音。" },
    { speaker: "ナレーター", text: "もう、津波が迫っている。" }
];

const story7_1 = [{ speaker: "ナレーター", text: "校舎の屋上に避難したあなたは生存した。" }];
const story7_2 = [{ speaker: "ナレーター", text: "最後に仲間を背負って走ったあなた。" }];
const story7_3 = [{ speaker: "ナレーター", text: "濁流が町を飲み込んだ。" }];