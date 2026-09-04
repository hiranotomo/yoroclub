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
    "exhibition.venue": "豊田市博物館（愛知・豊田）",
    "exhibition.date": "2026.7.11 (土) — 9.23 (水・祝)",
    "exhibition.note":
      "いま虫展は愛知・豊田市博物館で開催中です（9月23日まで）。恵比寿・東京都写真美術館の会期は5月24日に閉幕しました。このあとは岡山県立美術館へ巡回します。養老昆虫クラブは本展に協力&応援中！",
    "exhibition.officialSite": "豊田市博物館 公式",
    "exhibition.organizer": "主催・クレヴィス",
    "venue.address": "所在地",
    "venue.addressValue": "愛知県豊田市小坂本町5-80（豊田市美術館の北隣）",
    "venue.hours": "開館",
    "venue.hoursValue": "10:00 — 17:30",
    "venue.closed": "休館",
    "venue.closedValue": "月曜日",
    "venue.admission": "観覧料",
    "venue.admissionValue": "一般 1,500円 ／ 高・大学生 1,300円 ／ 中学生以下 無料",
    "events.endedNote": "以下は東京・恵比寿会場（2026年3月21日〜5月24日）の催しです。すべて終了しました。豊田会場でも会期中に関連トークを予定しています。詳細は豊田市博物館の公式でご確認ください。",
    "record.label": "Record",
    "record.title": "東京会期の記録",
    "record.daysNum": "56",
    "record.visitorsNum": "約2万",
    "record.talksNum": "15",
    "record.speakersNum": "10",
    "exhibition.posterNote": "※ ポスターは東京会場のものです",
    "record.days": "日間の会期",
    "record.visitors": "人が来場",
    "record.talks": "回のトーク",
    "record.speakers": "名の登壇者",

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
    "tour.now": "開催中",
    "tour.ended": "大盛況にて終了",
    "tour.countdown": "あと{n}日",

    // Media
    "media.label": "Media",
    "media.title": "メディアで紹介されました",

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
    "footer.lastUpdated": "最終更新",

    // Bugs
    "bugs.collected": "匹捕獲！",
    "bugs.goal": "100匹つかまえよう！",

    // Newspaper
    "newspaper.label": "Newspaper",
    "newspaper.title": "養老昆虫クラブ新聞",
    "newspaper.lead1":
      "虫と自然を愛する有志がつくる小さな新聞です。「養老孟司と小檜山賢二の虫展」会場（東京都写真美術館）で実際に配布している紙の新聞を、こちらでもWeb版・PDFでお読みいただけます。",
    "newspaper.lead2":
      "ゆるくつくっています。決まったスケジュールはありませんが、号を重ねるごとに、ここに並べていきます。",
    "newspaper.distribution":
      "紙の新聞は会場限定配布。お近くの方はぜひ会場でお手に取ってみてください。でもたまにしか配布していないのでご了承ください。",
    "newspaper.latest": "Latest Issue",
    "newspaper.read": "読む（Web版）",
    "newspaper.readPdf": "読む（PDF）",
    "newspaper.printNote":
      "PDFはA3またはB4でプリントすると会場と同じ紙面で読めます。",
    "newspaper.backissues": "Back Issues",
    "newspaper.comingSoon":
      "次号、準備中。号を重ねるごとにここに並びます。",
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
      "Toyota Municipal Museum (Aichi)",
    "exhibition.date": "2026.7.11 (Sat) — 9.23 (Wed)",
    "exhibition.note":
      "The exhibition is now at the Toyota Municipal Museum in Aichi, through 23 September. The Tokyo run at TOP MUSEUM closed on 24 May. It travels next to the Okayama Prefectural Museum of Art. Yoro Insect Club is supporting this exhibition!",
    "exhibition.officialSite": "Toyota Municipal Museum (Official)",
    "exhibition.organizer": "Crevis (Organizer)",
    "venue.address": "Address",
    "venue.addressValue": "5-80 Kosakahoncho, Toyota, Aichi (next to Toyota Municipal Museum of Art)",
    "venue.hours": "Hours",
    "venue.hoursValue": "10:00 — 17:30",
    "venue.closed": "Closed",
    "venue.closedValue": "Mondays",
    "venue.admission": "Admission",
    "venue.admissionValue": "Adults ¥1,500 / Students ¥1,300 / Junior high and under free",
    "events.endedNote": "The events below took place at the Tokyo (Ebisu) venue, 21 March – 24 May 2026, and have all finished. Related talks are planned during the Toyota run; please check the museum's official site.",
    "record.label": "Record",
    "record.title": "The Tokyo run, in numbers",
    "record.daysNum": "56",
    "record.visitorsNum": "~20,000",
    "record.talksNum": "15",
    "record.speakersNum": "10",
    "exhibition.posterNote": "* Poster from the Tokyo venue",
    "record.days": "days",
    "record.visitors": "visitors",
    "record.talks": "talks",
    "record.speakers": "speakers",

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
    "tour.now": "NOW",
    "tour.ended": "CLOSED",
    "tour.countdown": "{n} days left",

    // Media
    "media.label": "Media",
    "media.title": "Featured in the media",

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
    "footer.lastUpdated": "Last updated",

    // Bugs
    "bugs.collected": " caught!",
    "bugs.goal": "Catch 100 bugs!",

    // Newspaper
    "newspaper.label": "Newspaper",
    "newspaper.title": "Yoro Insect Club Newspaper",
    "newspaper.lead1":
      "A small newspaper made by insect-loving friends. The paper edition is distributed at the “Takeshi Yoro & Kenji Kohiyama Insect Exhibition” (Tokyo Photographic Art Museum). The web and PDF versions are also available here.",
    "newspaper.lead2":
      "We make this casually—no fixed schedule. New issues will appear here as they happen.",
    "newspaper.distribution":
      "The paper edition is venue-only. If you’re nearby, please pick up a copy at the museum—though distribution is occasional, so no guarantees.",
    "newspaper.latest": "Latest Issue",
    "newspaper.read": "Read (Web)",
    "newspaper.readPdf": "Read (PDF)",
    "newspaper.printNote":
      "Print the PDF on A3 or B4 for the same broadsheet experience.",
    "newspaper.backissues": "Back Issues",
    "newspaper.comingSoon":
      "Next issue coming. Future issues will be listed here.",
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
    "exhibition.venue": "丰田市博物馆（爱知・丰田）",
    "exhibition.date": "2026.7.11 (周六) — 9.23 (周三)",
    "exhibition.note":
      "虫展现于爱知・丰田市博物馆展出，至9月23日。惠比寿・东京都写真美术馆的展期已于5月24日结束。之后将巡展至冈山县立美术馆。养老昆虫俱乐部正在协助和支持本展！",
    "exhibition.officialSite": "丰田市博物馆（官方）",
    "exhibition.organizer": "主办・Crevis",
    "venue.address": "地址",
    "venue.addressValue": "爱知县丰田市小坂本町5-80（丰田市美术馆北侧）",
    "venue.hours": "开馆",
    "venue.hoursValue": "10:00 — 17:30",
    "venue.closed": "休馆",
    "venue.closedValue": "周一",
    "venue.admission": "门票",
    "venue.admissionValue": "普通 1,500日元 ／ 高中大学生 1,300日元 ／ 初中生以下 免费",
    "events.endedNote": "以下是东京・惠比寿会场（2026年3月21日〜5月24日）的活动，均已结束。丰田会场展期内也预定举办相关讲座，详情请查阅丰田市博物馆官网。",
    "record.label": "Record",
    "record.title": "东京展期的数字",
    "record.daysNum": "56",
    "record.visitorsNum": "约2万",
    "record.talksNum": "15",
    "record.speakersNum": "10",
    "exhibition.posterNote": "※ 海报为东京会场版本",
    "record.days": "天展期",
    "record.visitors": "人到场",
    "record.talks": "场讲座",
    "record.speakers": "位讲者",

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
    "tour.now": "展出中",
    "tour.ended": "圆满结束",
    "tour.countdown": "还有{n}天",

    // Media
    "media.label": "媒体",
    "media.title": "媒体报道",

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
    "footer.lastUpdated": "最后更新",

    // Bugs
    "bugs.collected": " 只已捕获！",
    "bugs.goal": "捕捉100只虫子吧！",

    // Newspaper
    "newspaper.label": "报纸",
    "newspaper.title": "养老昆虫俱乐部报纸",
    "newspaper.lead1":
      "由热爱昆虫与自然的伙伴们制作的小报。在「养老孟司与小桧山贤二的虫展」（东京都摄影美术馆）会场实际派发的纸质报纸，亦可在此以网页版与PDF版阅读。",
    "newspaper.lead2":
      "我们悠闲地制作着这份报纸，没有固定的发刊计划。新一期出来时会陆续在此显示。",
    "newspaper.distribution":
      "纸质报纸仅在会场限定派发。在附近的朋友请到会场取阅。但派发并非常态，敬请理解。",
    "newspaper.latest": "最新号",
    "newspaper.read": "阅读（网页版）",
    "newspaper.readPdf": "阅读（PDF）",
    "newspaper.printNote":
      "PDF以A3或B4打印，可获得与会场相同的版面体验。",
    "newspaper.backissues": "往期",
    "newspaper.comingSoon":
      "下一期筹备中，更多期数将在此显示。",
  },
};
