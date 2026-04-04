export type Locale = "ja" | "en" | "zh";

export const dictionaries: Record<Locale, Record<string, string>> = {
  ja: {
    // Splash
    "splash.enter": "▶ ENTER",
    "splash.soundOn": "♪ SOUND ON",

    // Hero
    "hero.title": "養老昆虫クラブ",
    "hero.subtitle": "養老孟司先生の周りにいる虫好きたちの集まりです",

    // About
    "about.label": "About",
    "about.body1":
      "養老孟司先生の周りにいる虫好きたち。集まる機会が結構あります。こうなったら、と養老先生公認で遊んでまいります。ロゴはメンバーの一人、グラフィックデザイナーの佐藤卓さんのボランティア制作です。虫周りの楽しい情報を発信していきます。",
    "about.body2":
      "養老先生が虫採りを一緒にする虫屋たち、建長寺の虫塚を一緒に作った仲間たち、さまざまな虫の展示で一緒に動いた人たち。そんな人たちがメンバーです。生きもの、特に昆虫を採ったり見たり、そこから何か表現したり制作したり。そんな集まりです。",

    // Exhibition
    "exhibition.label": "Exhibition",
    "exhibition.title": "養老孟司と小檜山賢二の虫展",
    "exhibition.venue": "東京都写真美術館（恵比寿）",
    "exhibition.date": "2025.3.21 (金) — 5.24 (土)",
    "exhibition.tour": "巡回：豊田市立博物館（2025年7月11日〜）",
    "exhibition.note": "養老昆虫クラブは本展に協力&応援中！",

    // Theme Song
    "theme.label": "Theme Song",
    "theme.title": "「むしのいどころ」",
    "theme.artist": "すてぃぎもろく",
    "theme.presents": "養老昆虫クラブ presents",

    // Footer
    "footer.followUs": "Follow Us",
    "footer.copyright": "© 養老昆虫クラブ",

    // Bugs
    "bugs.collected": "匹捕獲！",
    "bugs.goal": "100匹つかまえよう！",
  },

  en: {
    // Splash
    "splash.enter": "▶ ENTER",
    "splash.soundOn": "♪ SOUND ON",

    // Hero
    "hero.title": "Yoro Insect Club",
    "hero.subtitle":
      "A gathering of bug lovers around Prof. Takeshi Yoro",

    // About
    "about.label": "About",
    "about.body1":
      "We are a group of insect enthusiasts who gather around Professor Takeshi Yoro. With his official blessing, we enjoy all things related to bugs. Our logo was created by member Taku Sato, a graphic designer. We share fun information about the world of insects.",
    "about.body2":
      "Our members include bug collectors who go hunting with Prof. Yoro, friends who built the Insect Memorial at Kenchoji Temple, and collaborators from various insect exhibitions. We collect, observe, and create—all inspired by living creatures, especially insects.",

    // Exhibition
    "exhibition.label": "Exhibition",
    "exhibition.title":
      "Takeshi Yoro & Kenji Kohiyama: The Insect Exhibition",
    "exhibition.venue":
      "Tokyo Photographic Art Museum (Ebisu)",
    "exhibition.date": "2025.3.21 (Fri) — 5.24 (Sat)",
    "exhibition.tour":
      "Tour: Toyota Municipal Museum (from July 11, 2025)",
    "exhibition.note":
      "Yoro Insect Club is supporting this exhibition!",

    // Theme Song
    "theme.label": "Theme Song",
    "theme.title": '"Mushi no Idokoro"',
    "theme.artist": "Stigimoroku",
    "theme.presents": "presented by Yoro Insect Club",

    // Footer
    "footer.followUs": "Follow Us",
    "footer.copyright": "© Yoro Insect Club",

    // Bugs
    "bugs.collected": " caught!",
    "bugs.goal": "Catch 100 bugs!",
  },

  zh: {
    // Splash
    "splash.enter": "▶ 进入",
    "splash.soundOn": "♪ 开启声音",

    // Hero
    "hero.title": "养老昆虫俱乐部",
    "hero.subtitle": "聚集在养老孟司先生身边的昆虫爱好者们",

    // About
    "about.label": "关于我们",
    "about.body1":
      "我们是聚集在养老孟司先生身边的昆虫爱好者。经常有聚会的机会，于是在养老先生的认可下，我们一起享受昆虫的乐趣。标志由成员之一、平面设计师佐藤卓先生义务制作。我们将发布关于昆虫的有趣信息。",
    "about.body2":
      "我们的成员包括与养老先生一起捕虫的虫友、一起在建长寺建造虫冢的伙伴、以及在各种昆虫展览中共同合作的人们。我们采集、观察生物，尤其是昆虫，并从中进行表达和创作。",

    // Exhibition
    "exhibition.label": "展览",
    "exhibition.title": "养老孟司与小桧山贤二的虫展",
    "exhibition.venue": "东京都写真美术馆（惠比寿）",
    "exhibition.date": "2025.3.21 (周五) — 5.24 (周六)",
    "exhibition.tour": "巡展：丰田市立博物馆（2025年7月11日起）",
    "exhibition.note": "养老昆虫俱乐部正在协助和支持本展！",

    // Theme Song
    "theme.label": "主题曲",
    "theme.title": "「虫之所在」",
    "theme.artist": "Stigimoroku",
    "theme.presents": "养老昆虫俱乐部 出品",

    // Footer
    "footer.followUs": "关注我们",
    "footer.copyright": "© 养老昆虫俱乐部",

    // Bugs
    "bugs.collected": " 只已捕获！",
    "bugs.goal": "捕捉100只虫子吧！",
  },
};
