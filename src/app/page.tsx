import PageContent from "@/components/PageContent";

// 更新日はビルド時刻(= 本番に出した時刻)を日本時間で焼き込む。
// force-static を付けないと、将来この画面が動的扱いになったときに
// 「アクセスした日」が更新日として出てしまう。
export const dynamic = "force-static";

const lastUpdated = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "numeric",
  day: "numeric",
}).format(new Date());

export default function Home() {
  return <PageContent lastUpdated={lastUpdated} />;
}
