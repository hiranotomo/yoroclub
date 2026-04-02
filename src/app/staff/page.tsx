"use client";

import { useState, useEffect } from "react";

const EXPECTED = "yoro2026";

export default function StaffPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState<"calendar" | "preview">("calendar");

  useEffect(() => {
    const saved = sessionStorage.getItem("yoro-staff-auth");
    if (saved === "ok") {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === EXPECTED) {
      sessionStorage.setItem("yoro-staff-auth", "ok");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (checking) return null;

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f0eb",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            borderRadius: 16,
            padding: "2.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            textAlign: "center",
            maxWidth: 360,
            width: "100%",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🪲</div>
          <h1
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#1a472a",
              marginBottom: "0.3rem",
            }}
          >
            養老昆虫クラブ
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#888",
              marginBottom: "1.5rem",
            }}
          >
            スタッフエリア
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="パスワード"
            autoFocus
            style={{
              width: "100%",
              padding: "0.8rem 1rem",
              border: error ? "2px solid #e53935" : "1px solid #ddd",
              borderRadius: 8,
              fontSize: "1rem",
              outline: "none",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          />
          {error && (
            <p
              style={{
                color: "#e53935",
                fontSize: "0.82rem",
                marginBottom: "0.8rem",
                marginTop: "-0.5rem",
              }}
            >
              パスワードが違います
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              background: "#1a472a",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            入る
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <StaffToolbar mode={mode} setMode={setMode} />
      {mode === "calendar" ? (
        <iframe
          src="/staff/calendar.html"
          style={{ flex: 1, width: "100%", border: "none" }}
        />
      ) : (
        <TweetPreview />
      )}
    </div>
  );
}

const CHANNEL_ID_X = "69ce45afaf47dacb697ebd26";

// 52日分の投稿データ（確定分のみ）
const POSTS: { num: number; date: string; text: string }[] = [
  { num: 1, date: "2026-04-03T00:00:00.000Z", text: `養老孟司「ありのままを見ればいいんです。木の枝の葉っぱをよく見てください。あの葉っぱ一枚が、すべての答えでしょう。虫だってそう。もう、答えはそこにある」。虫展のメインコピーは「答えはぜんぶ、虫にある」。今日から始まります。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 2, date: "2026-04-04T00:00:00.000Z", text: `本日開催！養老孟司×小檜山賢二 対談「虫ってさ、80年見てても飽きないね」\n\n80年虫を見続けた養老先生と、虫を撮り続けた小檜山さん。飽きないふたりが語り合います。\n\n会場：東京都写真美術館（恵比寿）\n\n#養老昆虫クラブ #虫展` },
  { num: 3, date: "2026-04-05T00:00:00.000Z", text: `養老先生が初めて小檜山賢二さんの写真を見た時の感想がすごい。\n\n「こんなものあり得ない!と本当にびっくりした。試験のカンニングみたいだと思った」\n\n80年虫を見てきた人が「カンニング」と言うほどの衝撃。それが深度合成写真です。\n\n#養老昆虫クラブ #虫展 #虫のすごさ` },
  { num: 4, date: "2026-04-06T00:00:00.000Z", text: `この週末、恵比寿で「虫」に会いませんか。\n\n「養老孟司と小檜山賢二の虫展」\n東京都写真美術館にて5月24日まで開催中です。\n\n一般1,500円／写真撮影OK\n木・金は20時まで開館しているので、仕事帰りにもぜひ。\n\n#養老昆虫クラブ #虫展` },
  { num: 5, date: "2026-04-07T00:00:00.000Z", text: `養老孟司「虫に限らず、勝手に入ってくる情報で満足せず、自分から世界を見に行くということが大事」。スマホの画面じゃなくて、外の世界を自分の目で。養老先生にとって虫とは「自然そのもの」なんだそうです。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 6, date: "2026-04-08T00:00:00.000Z", text: `実物わずか8mm。でも拡大すると――\n\n「こんな昆虫が本当に存在するのかと思うほどの、色、形、質感にビックリ。小檜山さんいわく『これはもしかして岩石を真似た擬態か』」\n\n群青色に輝くゴツゴツの体表。虫のデザインは人間の想像を軽く超えてきますよね。\n\n#養老昆虫クラブ #虫展 #虫のすごさ` },
  { num: 8, date: "2026-04-10T00:00:00.000Z", text: `養老孟司「1日に10分、虫でも何でもいいので、自然のものを見ると頭にも良い、と普段から皆さんに勧めているのです」。都市にいると人間の脳が作ったものばかりに囲まれる。だからこそ、1日10分。まずは窓の外の木でも。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 9, date: "2026-04-11T00:00:00.000Z", text: `本日開催！奥本大三郎×小檜山賢二 対談「ぼくたちの人生は虫で決まっている」\n\nファーブル昆虫記の翻訳者・奥本大三郎さんと、虫の写真家・小檜山賢二さん。人生を虫に決められた二人の対話です。\n\n会場：東京都写真美術館（恵比寿）\n\n#養老昆虫クラブ #虫展` },
  { num: 11, date: "2026-04-13T00:00:00.000Z", text: `東京展ならではの見どころ。\n\nNHK「デザインあ」展のデザイナー・岡崎智弘さんが新たに参加しています。展示空間をまるごと「養老先生の思考の部屋」として再構成。\n\n言葉と写真を組み合わせた立体インスタレーション「ようろうボックス」は必見です。\n\n#養老昆虫クラブ #虫展` },
  { num: 12, date: "2026-04-14T00:00:00.000Z", text: `「好きですねえ。本当は一日中やっていたい。世間とのお付き合いより、虫を触っている方が寿命が延びる気がする」。昆虫標本作りが好きかと聞かれた養老先生、この即答。なんだか元気をもらえる言葉ですよね。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 13, date: "2026-04-15T00:00:00.000Z", text: `フィリピンロクロクビオトシブミ。\n\n名前の通り、まさにろくろ首。この長い首を持つのはオスだけで、首を突き上げて周囲を観察する仕草を見せるんだそうです。\n\n実物は12mm。名前のインパクトも、姿のインパクトも、虫の世界は想像を超えてきます。\n\n#養老昆虫クラブ #虫展 #虫のすごさ` },
  { num: 15, date: "2026-04-17T00:00:00.000Z", text: `養老孟司「グンジョウオオコブハムシなんて、見ててきれいでしょ。人間の手あかが付いていない。僕はこれこそアートじゃないかと思う」。トビケラの巣も「どう見てもモダンアート」。自然の造形に人間は敵わない。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 16, date: "2026-04-18T00:00:00.000Z", text: `アカガネサルハムシ。実物は約7mm、日本で普通に見かけるハムシです。\n\nでも拡大して見ると、全身に毛が生えているのがわかる。虹色に輝く体に、びっしりと。「奇跡のような美しさ」。\n\n身近な虫にこそ、見えていなかった世界がある。\n\n#養老昆虫クラブ #虫展 #虫のすごさ` },
  { num: 19, date: "2026-04-21T00:00:00.000Z", text: `養老孟司「大人はすぐに何かで測ろうとする。こういうことをすれば、こういういいことがある、みたいに。それはいい加減やめた方がいい。子どもがハッピーでなくなる」。測らなくていい。外を駆けずり回ればいいんですよ。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 20, date: "2026-04-22T00:00:00.000Z", text: `トビケラという虫は、水中で小石や砂を集めて巣を作ります。\n\n養老先生「トビケラの巣も自然の物を並べただけ、それを小檜山さんが拡大しただけで、どう見てもモダンアート」\n\n虫が「制作」したもの、ぜひ写真で見てほしいです。\n\n#養老昆虫クラブ #虫展 #虫のすごさ` },
  { num: 22, date: "2026-04-24T00:00:00.000Z", text: `養老孟司「虫に霊や心があるかというご意見もあるかと思いますが、睡眠に関する遺伝子が見つかっているので、意識はあるのではないかと思います」。鎌倉・建長寺の虫塚。養老先生は毎年、虫を供養しているんです。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 23, date: "2026-04-25T00:00:00.000Z", text: `小檜山賢二さんが養老先生について語った言葉。\n\n「写真を見ても多くの人が『へえ』と思うだけで終わるところを、養老さんは『これは何だ?』と深く考えてくれる。作る側も新しい価値観を感じられる」\n\n「見る」で止まるか、「考える」まで行くか。\n\n#養老昆虫クラブ #虫展 #虫のすごさ` },
  { num: 25, date: "2026-04-27T00:00:00.000Z", text: `昨夏、大分県立美術館で開催した「虫展」。来場者28,949人、なんと3日で1万人を突破しました。\n\n東京展はそこからさらにバージョンアップ。岡崎智弘さんの空間デザイン、「ようろうボックス」など新要素が加わっています。\n\n大分で見た方も、ぜひもう一度。\n\n#養老昆虫クラブ #虫展` },
  { num: 26, date: "2026-04-28T00:00:00.000Z", text: `「東大名誉教授」「解剖学者」、あるいは「『バカの壁』の人」。養老孟司さんの肩書きはいろいろありますが、ご本人の気持ちとしては「虫屋」だそうです。88歳、現役の虫屋。かっこいいですよね。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 27, date: "2026-04-29T00:00:00.000Z", text: `GW、どこ行こう？のご提案です。\n\n大分展で2万人目の来場者になった桜大ちゃん（5歳）はこう言いました。\n「ダンゴムシが好き。幼稚園で捕まえてるよ」\n\nお子さんの「虫が好き」、この展覧会で全力で応援します。写真撮影もOKですよ。\n\n東京都写真美術館（恵比寿）にて。\n\n#養老昆虫クラブ #虫展` },
  { num: 29, date: "2026-05-01T00:00:00.000Z", text: `養老孟司「現代は虫がいなくなる時代。白亜紀の恐竜絶滅が五度目の大絶滅といわれていますが、現代を六度目の絶滅とする見方もあります。一台の車が廃車になるまでに千万頭の桁の虫を殺すともいわれています」。知らないうちに、私たちも加害者なんですね。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 30, date: "2026-05-02T00:00:00.000Z", text: `GW後半、まだ予定が決まっていない方へ。\n\n「養老孟司と小檜山賢二の虫展」\n東京都写真美術館（恵比寿ガーデンプレイス内）\n\n写真撮影OK。お子さんと一緒に超拡大された虫の写真を撮るの、おすすめです。木・金は20時まで開館しています。\n\n#養老昆虫クラブ #虫展` },
  { num: 32, date: "2026-05-04T00:00:00.000Z", text: `「答えはぜんぶ、虫にある」\n\nこれが今回の虫展のメインコピーです。大げさに聞こえますか？ でも養老先生は本気でそう思っているんですよね。\n\nもうひとつのコピーも好きです。\n「かたちを見る。すべてはそこからはじまった。」\n\n見ること。それが始まりなんです。\n\n#養老昆虫クラブ #虫展` },
  { num: 34, date: "2026-05-06T00:00:00.000Z", text: `GW最終日ですね。\n\n東京での虫展、会期は5月24日まで。東京で見られるのはあと少しです。\n\nこの後は豊田市博物館（7〜9月）、岡山県立美術館（10〜11月）に巡回します。でも東京展ならではの展示もあるので、迷っている方は今のうちにぜひ。\n\n#養老昆虫クラブ #虫展` },
  { num: 36, date: "2026-05-08T00:00:00.000Z", text: `養老孟司「日本人の枠が狭くなっている。こんな日本人もいるのだと知らせたい」。ラオスで虫を追い、ブータンに何度も通い、台湾で木の葉っぱを叩きまくる。養老先生の「枠」はどこまでも広い。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 37, date: "2026-05-09T00:00:00.000Z", text: `日本最大のゾウムシ、オオゾウムシ。実物は約32mm。\n\n小檜山賢二さん「マイクロプレゼンスの手法で最初に手がけた写真です。撮影スポットになっているので、巨大になったゾウムシをバックに、ぜひパチリと撮ってみてください!」\n\n会場では巨大写真で見られます。記念撮影にぜひ。\n\n#養老昆虫クラブ #虫展 #虫のすごさ` },
  { num: 39, date: "2026-05-11T00:00:00.000Z", text: `東京での虫展、残り2週間です。\n\n養老先生は言います。\n「自分から世界を見に行く」\n\n虫を見るとは、自分から世界に近づくこと。まだの方、ぜひ恵比寿へ。\n\n東京都写真美術館にて5/24まで。\n\n#養老昆虫クラブ #虫展` },
  { num: 40, date: "2026-05-12T00:00:00.000Z", text: `養老孟司「世間の人があまりこういうことにはまらない理由のほうが、私には理解できない。お前のほうがよっぽど理解できないよ。そういわれることはわかっているが、やっぱり虫は面白いんですよ」。この正直さがたまらない。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 41, date: "2026-05-13T00:00:00.000Z", text: `台湾の面積は日本の10分の1。でもチョウの種類は400種超。日本は約231種。\n\n3000m級の山が200座以上あり、熱帯から寒帯まで幅広い生態系を持つから、虫がものすごく多い。養老先生いわく「採集に忙しくてしょうがない」。\n\n小さな島の、とんでもない多様性。\n\n#養老昆虫クラブ #虫展 #虫のすごさ` },
  { num: 43, date: "2026-05-15T00:00:00.000Z", text: `養老孟司「路傍にローズヒップがたくさんあって、ゾウムシがついている。やっぱりブータンは天国に近い。べつにもう死にそうだという意味ではない。私の思う天国に近いのである」。ゾウムシがいれば天国。養老先生の天国観、最高です。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 44, date: "2026-05-16T00:00:00.000Z", text: `会期終了まであと9日。\n\n小檜山賢二さんはこう語ります。\n「養老さんは『これは何だ？』と深く考えてくれる」\n\n虫を前にして「これは何だ？」と問い続ける。その姿勢がこの展覧会の核にあります。\n\n東京都写真美術館（恵比寿）5/24まで。\n\n#養老昆虫クラブ #虫展` },
  { num: 46, date: "2026-05-18T00:00:00.000Z", text: `東京での虫展、残り1週間です。\n\n「自分から世界を見に行く」\n\n養老先生のこの言葉、展覧会を見た後だと重みが変わります。虫の「かたち」を見つめた先に、世界の見え方が少し変わる。そんな体験です。\n\n東京都写真美術館（恵比寿）5/24まで。\n\n#養老昆虫クラブ #虫展` },
  { num: 47, date: "2026-05-19T00:00:00.000Z", text: `養老孟司「台湾旅行は面白かったなあ。私は山の中で、なんの恨みもない木の葉っぱを、棒で叩きまくっていただけだが、それでも十分に気が晴れた」。これ、ビーティングという虫の採集法なんです。楽しそうだなあ。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 48, date: "2026-05-20T00:00:00.000Z", text: `東京展、残り4日。平日は比較的空いています。\n\n大分展で2万人目の来場者になった桜大ちゃん（5歳）は「ダンゴムシが好き。幼稚園で捕まえてるよ」と言っていました。\n\n5歳でもちゃんと楽しめる展覧会です。平日にお子さんと一緒にいかがですか。\n\n東京都写真美術館（恵比寿）5/24まで。\n\n#養老昆虫クラブ #虫展` },
  { num: 50, date: "2026-05-22T00:00:00.000Z", text: `養老先生が箱根の「養老昆虫館」に所蔵する標本は約10万点。そのうち「おそらく何百という新種がある」そうです。自宅に何百もの新種が眠っている。虫の世界の奥深さ、ちょっと気が遠くなりますよね。\n\n#養老昆虫クラブ #虫展 #養老語録` },
  { num: 51, date: "2026-05-23T00:00:00.000Z", text: `東京展、明日が最終日です。\n\n養老先生は言います。\n「1日10分、自然を見る」\n\n明日、恵比寿で虫を見る10分。それだけで何かが変わるかもしれません。\n\n東京都写真美術館、5月24日まで。\n\n#養老昆虫クラブ #虫展` },
  { num: 52, date: "2026-05-24T00:00:00.000Z", text: `本日、東京展最終日です。\n\n「答えはぜんぶ、虫にある」\n\nご来場いただいた皆さま、ありがとうございました。\n\n虫展はこの後、豊田市博物館（7〜9月）、岡山県立美術館（10〜11月）に巡回します。東京で見逃した方、ぜひお近くの会場で。\n\n#養老昆虫クラブ #虫展` },
];

function StaffToolbar({ mode, setMode }: { mode: "calendar" | "preview"; setMode: (m: "calendar" | "preview") => void }) {
  const [bufferStatus, setBufStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState<{ total: number; succeeded: number } | null>(null);

  async function handleSendToBuffer() {
    if (!confirm(`確定済み${POSTS.length}本をBufferに予約登録します。よろしいですか？`)) return;
    setBufStatus("sending");
    try {
      const res = await fetch("/api/buffer", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-staff-auth": "ok" },
        body: JSON.stringify({
          channelId: CHANNEL_ID_X,
          posts: POSTS.map((p) => ({ text: p.text, dueAt: p.date })),
        }),
      });
      const data = await res.json();
      if (data.succeeded !== undefined) { setResult(data); setBufStatus("done"); }
      else setBufStatus("error");
    } catch { setBufStatus("error"); }
  }

  const tabStyle = (active: boolean) => ({
    background: active ? "white" : "transparent",
    color: active ? "#1a472a" : "rgba(255,255,255,0.7)",
    border: "none",
    borderRadius: 6,
    padding: "0.35rem 0.8rem",
    fontWeight: active ? 700 : 400,
    fontSize: "0.82rem",
    cursor: "pointer" as const,
  });

  return (
    <div
      style={{
        background: "#1a472a", color: "white", padding: "0.5rem 1.5rem",
        display: "flex", alignItems: "center", gap: "0.8rem",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic ProN', sans-serif",
        fontSize: "0.85rem",
      }}
    >
      <span style={{ fontWeight: 700 }}>🪲</span>

      <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: 2 }}>
        <button onClick={() => setMode("calendar")} style={tabStyle(mode === "calendar")}>カレンダー</button>
        <button onClick={() => setMode("preview")} style={tabStyle(mode === "preview")}>プレビュー</button>
      </div>

      <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>

      {bufferStatus === "idle" && (
        <button onClick={handleSendToBuffer} style={{ background: "#e8f5e9", color: "#1a472a", border: "none", borderRadius: 6, padding: "0.35rem 0.8rem", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>
          Buffer登録（{POSTS.length}本）
        </button>
      )}
      {bufferStatus === "sending" && <span>送信中...</span>}
      {bufferStatus === "done" && result && <span style={{ color: "#a5d6a7" }}>完了: {result.succeeded}/{result.total}本</span>}
      {bufferStatus === "error" && <span style={{ color: "#ef9a9a" }}>エラー</span>}
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  const dow = ["日","月","火","水","木","金","土"][d.getUTCDay()];
  return `${m}月${day}日(${dow})`;
}

function TweetPreview() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setCurrent(c => Math.min(c + 1, POSTS.length - 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") setCurrent(c => Math.max(c - 1, 0));
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const post = POSTS[current];
  const textParts = post.text.split(/(#\S+)/g);
  const charCount = post.text.replace(/\n/g, "").length;

  return (
    <div style={{
      flex: 1, background: "#e8ecef", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "1rem",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic ProN', sans-serif",
    }}>
      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setCurrent(c => Math.max(c - 1, 0))}
          disabled={current === 0}
          style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", opacity: current === 0 ? 0.3 : 1 }}
        >←</button>
        <span style={{ fontSize: "0.85rem", color: "#555", fontWeight: 600 }}>
          #{post.num} — {formatDate(post.date)} ({current + 1}/{POSTS.length})
        </span>
        <button
          onClick={() => setCurrent(c => Math.min(c + 1, POSTS.length - 1))}
          disabled={current === POSTS.length - 1}
          style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", opacity: current === POSTS.length - 1 ? 0.3 : 1 }}
        >→</button>
      </div>

      {/* Phone frame */}
      <div style={{
        width: 375, maxHeight: "75vh", background: "#000", borderRadius: 40,
        padding: "12px", boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
      }}>
        <div style={{
          background: "#000", borderRadius: 30, overflow: "hidden",
          display: "flex", flexDirection: "column", height: "100%",
        }}>
          {/* Status bar */}
          <div style={{
            background: "#000", color: "white", padding: "8px 20px 4px",
            display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 600,
          }}>
            <span>9:41</span>
            <div style={{ width: 120, height: 28, background: "#000", borderRadius: 14 }} />
            <span>📶 🔋</span>
          </div>

          {/* X App header */}
          <div style={{
            background: "#000", padding: "8px 16px", display: "flex",
            alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid #2f3336",
          }}>
            <span style={{ color: "white", fontSize: "1.2rem", fontWeight: 700 }}>𝕏</span>
          </div>

          {/* Tweet */}
          <div style={{
            background: "#000", padding: "12px 16px", overflowY: "auto", flex: 1,
          }}>
            {/* Author row */}
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{
                width: 40, height: 40, borderRadius: 20,
                background: "#1a472a", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "1.1rem", flexShrink: 0,
              }}>🪲</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>養老昆虫クラブ</span>
                  <span style={{ color: "#71767b", fontSize: "0.85rem" }}>@yoroclub · {formatDate(post.date)}</span>
                </div>
                {/* Tweet text */}
                <div style={{
                  color: "#e7e9ea", fontSize: "0.93rem", lineHeight: 1.55,
                  marginTop: 4, whiteSpace: "pre-line", wordBreak: "break-word",
                }}>
                  {textParts.map((part, i) =>
                    part.startsWith("#") ? (
                      <span key={i} style={{ color: "#1d9bf0" }}>{part}</span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
                {/* Engagement row */}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  marginTop: 12, paddingRight: "20%",
                  color: "#71767b", fontSize: "0.8rem",
                }}>
                  <span>💬 —</span>
                  <span>🔁 —</span>
                  <span>❤️ —</span>
                  <span>📊 —</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Character count */}
      <div style={{
        marginTop: "0.8rem", fontSize: "0.8rem",
        color: charCount > 280 ? "#e53935" : "#888",
        fontWeight: charCount > 280 ? 700 : 400,
      }}>
        {charCount}文字 {charCount > 280 && "⚠️ 280文字超過"}
      </div>

      {/* Thumbnail strip */}
      <div style={{
        display: "flex", gap: 4, marginTop: "0.8rem", overflowX: "auto",
        maxWidth: "100%", padding: "4px 0",
      }}>
        {POSTS.map((p, i) => (
          <button
            key={p.num}
            onClick={() => setCurrent(i)}
            style={{
              width: 28, height: 28, borderRadius: 4, border: "none",
              background: i === current ? "#1a472a" : "#ddd",
              color: i === current ? "white" : "#888",
              fontSize: "0.6rem", fontWeight: 600, cursor: "pointer", flexShrink: 0,
            }}
          >
            {p.num}
          </button>
        ))}
      </div>
    </div>
  );
}
