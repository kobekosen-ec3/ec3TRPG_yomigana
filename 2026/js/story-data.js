/**
 * 防災TRPG ストーリー定義
 * app.js は変更せず、このファイルのみ差し替える想定です。
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

/* ===== 第1章：地震発生 ===== */

const story1 = createStory(
    {
        speaker: "ナレーター",
        text: `{hours}時{minutes}分。秋の学園祭で、多くの人が体育館に集まっている。`
    },
    {
        speaker: "ナレーター",
        text: `体育館では、部活動展示と企業展示が開かれていた。`
    },
    {
        speaker: "ナレーター",
        text: `学生、教職員、企業関係者、来場者、保護者など、会場は多くの人でにぎわっている。`
    },
    {
        speaker: "ナレーター",
        text: `{playerName}も、体育館の中にいた。`
    },
    {
        speaker: "ナレーター",
        text: `突然、床が大きく揺れる。`
    },
    {
        speaker: "ナレーター",
        text: `案内板が揺れ、展示台の資料が落ち、天井の照明がきしむ。`
    },
    {
        speaker: "周囲の声",
        text: `「地震だ！」「走らないで、頭を守って！」`
    },
    {
        speaker: "ナレーター",
        text: `{playerName}は近くの安全な場所で身を低くし、揺れが収まるのを待った。`
    }
);

/* ===== 第2章：火災発生 ===== */

const story2 = createStory(
    {
        speaker: "ナレーター",
        text: `揺れがいったん収まる。`
    },
    {
        speaker: "ナレーター",
        text: `体育館内には、不安そうな人たちが立ち尽くしている。`
    },
    {
        speaker: "ナレーター",
        text: `そのとき、照明が一度消え、非常灯が点灯した。`
    },
    {
        speaker: "ナレーター",
        text: `企業展示ブースが並ぶ方向から、焦げたにおいが漂ってくる。`
    },
    {
        speaker: "周囲の声",
        text: `「煙が出ている！」「電源コードの近くから火が見える！」`
    },
    {
        speaker: "ナレーター",
        text: `非常ベルが鳴り始める。`
    },
    {
        speaker: "周囲の声",
        text: `「正面入口には近づかないでください！ 体育館横と後方の非常口から、運動場へ避難してください！」`
    },
    {
        speaker: "ナレーター",
        text: `火元に近い正面入口付近には、薄い煙が流れ始めていた。`
    }
);

const story2_1 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、煙から離れるため後方の非常口へ向かうことにした。`
    }
);

const story2_1_s = createStory(
    {
        speaker: "ナレーター",
        text: `落ちた資料や展示物を避けながら、人の流れに遅れず進むことができた。`
    },
    {
        speaker: "ナレーター",
        text: `後方の非常口が見えてきた。`
    }
);

const story2_1_m = createStory(
    {
        speaker: "ナレーター",
        text: `床に散らばった資料に足を取られ、転びそうになる。`,
        effect: () => {
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `けがはなかったが、避難が少し遅れた。`
    }
);

const story2_2 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、近くで立ち尽くしている人たちへ避難を促すことにした。`
    },
    {
        speaker: "{playerName}",
        text: `「正面入口は危ないです。後ろの非常口から外へ出ましょう！」`
    }
);

const story2_2_s = createStory(
    {
        speaker: "ナレーター",
        text: `近くにいた人たちが、あなたの声に気づく。`,
        effect: () => {
            GameState.rescuedPerson = 1;
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `混乱していた人の流れが少し落ち着き、あなたたちは一緒に非常口へ向かう。`
        
    }
);

const story2_2_m = createStory(
    {
        speaker: "ナレーター",
        text: `非常ベルや周囲の声にかき消され、あなたの声は十分に届かない。`,
        effect: () => {
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `それでも、自分の近くにいる人へ繰り返し避難を促してから、その場を離れる。`
    }
);

const story2_3 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、体育館横の通路から運動場へ向かうことにした。`
    }
);

const story2_3_s = createStory(
    {
        speaker: "ナレーター",
        text: `通路には人が少なく、煙もまだ流れ込んでいない。`
    },
    {
        speaker: "ナレーター",
        text: `あなたは比較的安全に、体育館横の通路を進むことができた。`
    }
);

const story2_3_m = createStory(
    {
        speaker: "ナレーター",
        text: `通路の先には、避難する人が集まり始めていた。`,
        effect: () => {
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `遠回りすることになり、時間を使ってしまう。`
    }
);

/* ===== 第3章：助けを求める声 ===== */

const story3 = createStory(
    {
        speaker: "ナレーター",
        text: `少し離れた場所では、来場者の1人が地震の揺れで転倒し、足をくじいていた。`
    },
    {
        speaker: "けが人",
        text: `「歩けますが……少し、支えてもらえますか？」`
    },
    {
        speaker: "ナレーター",
        text: `煙は少しずつ体育館内へ広がっている。まず、あなたはどうする？`
    }
);

const story3_1 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、けが人を支えて非常口へ向かうことにした。`
    },
    {
        speaker: "{playerName}",
        text: `「一人では危ないです。周りの人と一緒に、外へ出ましょう」`
    }
);

const story3_1_s = createStory(
    {
        speaker: "ナレーター",
        text: `近くにいた人が手を貸してくれ、けが人の左右を支えながら進む。`,
        effect: () => {
            GameState.rescuedPerson = 1;
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `けが人は痛みに耐えながらも、あなたたちと共に非常口へ向かう。`
    }
);

const story3_1_m = createStory(
    {
        speaker: "ナレーター",
        text: `人の流れが乱れ、すぐに協力者を見つけられない。`,
        effect: () => {
            GameState.time -= 2;
        }
    },
    {
        speaker: "ナレーター",
        text: `あなたはけが人を支えながら進むが、避難が遅れてしまう。`
    }
);

const story3_2 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、自分だけでけが人を支えるのは危険だと判断し、周囲へ助けを求めてから避難を優先することにした。`
    }
);

const story3_2_s = createStory(
    {
        speaker: "ナレーター",
        text: `あなたは近くの人へ、けが人がいることを伝える。`
    },
    {
        speaker: "ナレーター",
        text: `煙から離れ、比較的早く非常口の近くまで進むことができた。`
    }
);

const story3_2_m = createStory(
    {
        speaker: "ナレーター",
        text: `人の流れに押され、思うように進めない。`,
        effect: () => {
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `あなたは周囲に注意しながら、非常口へ向かう。`
    }
);

const story3_3 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、周囲に協力を求めることにした。`
    },
    {
        speaker: "{playerName}",
        text: `「足をくじいた人がいます。支えるのを手伝ってください！」`
    }
);

const story3_3_s = createStory(
    {
        speaker: "ナレーター",
        text: `近くにいた人たちが協力してくれ、けが人を支えながら非常口へ向かう。`,
        effect: () => {
            GameState.rescuedPerson = 1;
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `あなたは周囲と役割を分け、安全な避難の流れを作ることができた。`
    }
);

const story3_3_m = createStory(
    {
        speaker: "ナレーター",
        text: `周囲も混乱しており、すぐには協力者が見つからない。`,
        effect: () => {
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `あなたはけが人に周囲へ助けを求めるよう伝え、自分も避難を続ける。`
    }
);

/* ===== 第4章：運動場への道 ===== */

const story4 = createStory(
    {
        speaker: "ナレーター",
        text: `非常口を抜けると、冷たい秋の空気が頬を打つ。`
    },
    {
        speaker: "ナレーター",
        text: `後方の非常口から出てきた人たちが、運動場へ向かう通路に集まっている。`
    },
    {
        speaker: "ナレーター",
        text: `後ろを振り返ると、体育館の換気口付近から煙が見える。`
    },
    {
        speaker: "ナレーター",
        text: `運動場までは、あと少しだ。`
    }
);

const story4_1 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、人の流れに合わせて運動場へ急ぐことにした。`
    }
);

const story4_1_s = createStory(
    {
        speaker: "ナレーター",
        text: `落ち着いて歩き続け、転倒することなく運動場へ近づく。`
    }
);

const story4_1_m = createStory(
    {
        speaker: "ナレーター",
        text: `前を歩いていた人が立ち止まり、避難する人の列が乱れる。`,
        effect: () => {
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `あなたは人とぶつからないよう避け、少し時間を使ってしまう。`
    }
);

const story4_2 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、周囲の人と声をかけ合いながら進むことにした。`
    }
);

const story4_2_s = createStory(
    {
        speaker: "ナレーター",
        text: `周囲の人が役割を分け、無理のない速さで運動場へ進む。`,
        effect: () => {
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `誰も取り残さず、避難を続けることができた。`
    }
);

const story4_2_m = createStory(
    {
        speaker: "ナレーター",
        text: `周囲の人と声をかけ合いながら進むため、思ったより時間がかかる。`,
        effect: () => {
            GameState.time -= 2;
        }
    },
    {
        speaker: "ナレーター",
        text: `それでも、周囲の安全を確かめながら進み続ける。`
    }
);

const story4_3 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、人の少ない別の通路を進むことにした。`
    }
);

const story4_3_s = createStory(
    {
        speaker: "ナレーター",
        text: `通路には障害物がなく、運動場へ続いていた。`
    },
    {
        speaker: "ナレーター",
        text: `あなたは混雑を避け、早く進むことができた。`,
        effect: () => {
            GameState.time += 1;
        }
    }
);

const story4_3_m = createStory(
    {
        speaker: "ナレーター",
        text: `通路の先には、落ちた案内板や荷物が散らばっている。`,
        effect: () => {
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `安全に通れず、引き返すことになる。`
    }
);

/* ===== 第5章：最後の確認 ===== */

const story5 = createStory(
    {
        speaker: "ナレーター",
        text: `運動場が見えてきた。`
    },
    {
        speaker: "ナレーター",
        text: `すでに多くの人が避難しており、周囲では家族や知り合いを探す声が聞こえる。`
    },
    {
        speaker: "ナレーター",
        text: `体育館へ戻ってはいけない。`
    },
    {
        speaker: "ナレーター",
        text: `それでも、展示物や持ち物が気になり、建物の方を見ている人もいる。`
    },
    {
        speaker: "周囲の声",
        text: `「まだ中に人が残っていないかな……」`
    },
    {
        speaker: "ナレーター",
        text: `{playerName}は最後に、何を優先するか選ばなければならない。`
    }
);

const story5_1 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、自分の安全を優先して運動場へ向かうことを選んだ。`
    }
);

const story5_1_s = createStory(
    {
        speaker: "ナレーター",
        text: `あなたは無事に運動場へ到着する。`
    },
    {
        speaker: "ナレーター",
        text: `避難した人々の中で、自分の安全を確保できた。`
    }
);

const story5_1_m = createStory(
    {
        speaker: "ナレーター",
        text: `疲れと混乱で足がもつれ、運動場へ着くまでに時間がかかる。`,
        effect: () => {
            GameState.time -= 1;
        }
    }
);

const story5_2 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、周囲の人と安否確認をしながら進むことにした。`
    },
    {
        speaker: "{playerName}",
        text: `「一緒にいた人は全員いますか？ けがをした人や、はぐれた人はいませんか？」`
    }
);

const story5_2_s = createStory(
    {
        speaker: "ナレーター",
        text: `周囲の情報が整理される。`,
        effect: () => {
            GameState.rescuedPerson = 1;
            GameState.time -= 1;
        }
    },
    {
        speaker: "ナレーター",
        text: `周囲の人は互いの状況を確認しながら、運動場へ到着する。`
    }
);

const story5_2_m = createStory(
    {
        speaker: "ナレーター",
        text: `情報を整理する間に、避難完了までの時間が迫る。`,
        effect: () => {
            GameState.time -= 2;
        }
    },
    {
        speaker: "ナレーター",
        text: `あなたは周囲へ運動場へ向かうよう伝え、自分も急いで移動する。`
    }
);

const story5_3 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、体育館に近づいて火災の様子を見ようとした。`
    }
);

const story5_3_s = createStory(
    {
        speaker: "ナレーター",
        text: `近づく前に、煙の危険と、戻ってはいけない理由を理解する。`
    },
    {
        speaker: "ナレーター",
        text: `あなたは体育館へ近づかず、運動場へ向かう。`,
        effect: () => {
            GameState.time -= 1;
        }
    }
);

const story5_3_m = createStory(
    {
        speaker: "ナレーター",
        text: `煙が流れる方向へ近づいてしまう。`
    },
    {
        speaker: "ナレーター",
        text: `咳き込み、避難が遅れる。`
    }
);

/* ===== 最終章 ===== */

const story6 = createStory(
    {
        speaker: "ナレーター",
        text: `運動場には、体育館から避難してきた人々が集まっている。`
    },
    {
        speaker: "ナレーター",
        text: `建物には近づかず、周囲の人と人数や状況を確認する声が聞こえる。`
    }
);

const story7_1 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、無事に運動場へ避難することができた。`
    },
    {
        speaker: "ナレーター",
        text: `火元から離れ、安全な場所へ移動することの大切さを学んだ。`
    },
    {
        speaker: "ナレーター",
        text: `災害時には、落ち着いて周囲の状況を見ながら行動する必要がある。`
    }
);

const story7_2 = createStory(
    {
        speaker: "ナレーター",
        text: `{playerName}は、周囲の人を見捨てず、協力して避難した。`
    },
    {
        speaker: "ナレーター",
        text: `避難には時間がかかった。`
    },
    {
        speaker: "ナレーター",
        text: `それでも、あなたの選択は誰かの安全につながっていた。`
    }
);

const story7_3 = createStory(
    {
        speaker: "ナレーター",
        text: `視界が白くにじみ、周囲の声が遠ざかっていく。`
    },
    {
        speaker: "ナレーター",
        text: `{playerName}は避難できず、命を落とした。`
    }
);