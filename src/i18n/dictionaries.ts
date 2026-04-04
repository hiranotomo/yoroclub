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
    "exhibition.date": "2026.3.21 (土) — 5.24 (日)",
    "exhibition.note": "養老昆虫クラブは本展に協力&応援中！",

    // Events
    "events.label": "Events",
    "events.lecture": "講演会「ぼくたちの人生は虫で決まっている」",
    "events.lectureSpeakers": "奥本大三郎 × 小檜山賢二",
    "events.lectureDate": "4月11日（土）開場 13:30　開演 14:00",
    "events.lectureVenue": "1Fホール",
    "events.galleryTalk": "ギャラリートーク",
    "events.galleryTalkVenue": "地下1階展示室",
    "events.latestInfo": "最新情報はクレヴィスHPでご確認ください",

    // Tour
    "tour.label": "Tour",
    "tour.title": "全国巡回スケジュール",

    // Media
    "media.label": "Media",
    "media.title": "メディアで紹介されます！",

    // Ambassador
    "ambassador.label": "Ambassador",
    "ambassador.title": "虫展アンバサダー",
    "ambassador.name": "片田陽依",
    "ambassador.description":
      "昆虫が大好き。YouTube「ひよりの虫日記」で虫の魅力を発信中。TOKYO FM「リリー・フランキー スナック ラジオ」に虫展アンバサダーとして出演！",

    // Theme Song
    "theme.label": "Theme Song",
    "theme.title": "「むしのいどころ」",
    "theme.artist": "すてぃぎもろく",
    "theme.presents": "養老昆虫クラブ presents 虫展テーマソング",
    "theme.bio":
      "2023年に電源を入れられたパニックロックバンド。直井幸太、蛙優太、親方の3人が音楽・映像・ビジュアルすべてを自ら手がける。",

    // Event Photo
    "eventPhoto.caption": "2026.4.4 講演会の様子",

    // Footer
    "footer.followUs": "Follow Us",
    "footer.followNote": "最新情報はXでチェック！",
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
    "exhibition.date": "2026.3.21 (Sat) — 5.24 (Sun)",
    "exhibition.note":
      "Yoro Insect Club is supporting this exhibition!",

    // Events
    "events.label": "Events",
    "events.lecture":
      'Lecture: "Our Lives Are Determined by Insects"',
    "events.lectureSpeakers": "Daisaburo Okumoto × Kenji Kohiyama",
    "events.lectureDate": "Apr 11 (Sat) Doors 13:30 / Start 14:00",
    "events.lectureVenue": "1F Hall",
    "events.galleryTalk": "Gallery Talk",
    "events.galleryTalkVenue": "B1F Exhibition Room",
    "events.latestInfo": "Check Crevis HP for latest info",

    // Tour
    "tour.label": "Tour",
    "tour.title": "National Tour Schedule",

    // Media
    "media.label": "Media",
    "media.title": "Featured in the Media!",

    // Ambassador
    "ambassador.label": "Ambassador",
    "ambassador.title": "Exhibition Ambassador",
    "ambassador.name": "Hiyori Katada",
    "ambassador.description":
      'Insect lover. Shares the joy of insects on YouTube "Hiyori\'s Bug Diary". Featured on TOKYO FM as exhibition ambassador!',

    // Theme Song
    "theme.label": "Theme Song",
    "theme.title": '"Mushi no Idokoro"',
    "theme.artist": "Stigimoroku",
    "theme.presents":
      "Yoro Insect Club presents — Exhibition Theme Song",
    "theme.bio":
      "A panic rock band activated in 2023. Kota Naoi, Yuta Kaeru, and Oyakata produce all music, visuals, and videos themselves.",

    // Event Photo
    "eventPhoto.caption": "2026.4.4 Lecture Event",

    // Footer
    "footer.followUs": "Follow Us",
    "footer.followNote": "Follow us on X for the latest updates!",
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
    "exhibition.date": "2026.3.21 (周六) — 5.24 (周日)",
    "exhibition.note": "养老昆虫俱乐部正在协助和支持本展！",

    // Events
    "events.label": "活动",
    "events.lecture": "讲演会「我们的人生由虫决定」",
    "events.lectureSpeakers": "奥本大三郎 × 小桧山贤二",
    "events.lectureDate": "4月11日（周六）开场 13:30 开演 14:00",
    "events.lectureVenue": "1F大厅",
    "events.galleryTalk": "展览导览",
    "events.galleryTalkVenue": "地下1层展览室",
    "events.latestInfo": "请在Crevis官网确认最新信息",

    // Tour
    "tour.label": "巡展",
    "tour.title": "全国巡展日程",

    // Media
    "media.label": "媒体",
    "media.title": "媒体报道！",

    // Ambassador
    "ambassador.label": "大使",
    "ambassador.title": "虫展大使",
    "ambassador.name": "片田阳依",
    "ambassador.description":
      "热爱昆虫。在YouTube「阳依的虫日记」中传播昆虫的魅力。作为虫展大使出演TOKYO FM节目！",

    // Theme Song
    "theme.label": "主题曲",
    "theme.title": "「虫之所在」",
    "theme.artist": "Stigimoroku",
    "theme.presents": "养老昆虫俱乐部 出品 — 虫展主题曲",
    "theme.bio":
      "2023年激活的恐慌摇滚乐队。直井幸太、蛙优太、亲方三人亲自打造所有音乐、影像和视觉。",

    // Event Photo
    "eventPhoto.caption": "2026.4.4 讲演会现场",

    // Footer
    "footer.followUs": "关注我们",
    "footer.followNote": "在X上关注我们获取最新信息！",
    "footer.copyright": "© 养老昆虫俱乐部",

    // Bugs
    "bugs.collected": " 只已捕获！",
    "bugs.goal": "捕捉100只虫子吧！",
  },
};
