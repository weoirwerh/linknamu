import Image from "next/image";
import LinkCard from "@/components/LinkCard";

// 보여 주기용 더미 값입니다. 이 객체만 수정하면 페이지 내용이 바뀝니다.
const profile = {
  name: "김개발",
  bio: "세계 최강 바이브코더",
  // public/ 폴더에 사진을 넣고 경로를 바꾸세요. (예: "/profile.jpg") 비워 두면 이름 첫 글자가 표시됩니다.
  photo: "/profile-placeholder.svg",
  // id는 클릭 수 집계 키로 쓰이므로 링크마다 겹치지 않게 지정하세요.
  links: [
    { id: "github", icon: "💻", title: "GitHub", url: "https://github.com/" },
    { id: "linkedin", icon: "💼", title: "LinkedIn", url: "https://www.linkedin.com/" },
    { id: "blog", icon: "📝", title: "Blog", url: "https://example.com/blog" },
  ],
};

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col items-center px-4 pt-14 pb-10">
      {/* 원형 프로필 사진 */}
      <div className="grid size-36 place-items-center overflow-hidden rounded-full border-[3px] border-card bg-accent text-5xl font-bold text-background ring-1 ring-line">
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={`${profile.name} 프로필 사진`}
            width={144}
            height={144}
            className="size-full object-cover"
            priority
          />
        ) : (
          profile.name.charAt(0)
        )}
      </div>

      {/* 이름 */}
      <h1 className="mt-5 text-2xl font-bold tracking-wide">{profile.name}</h1>

      {/* 한줄 소개 */}
      <p className="mt-2 text-center text-[15px] text-muted">{profile.bio}</p>

      {/* 링크 카드 목록 */}
      <ul className="mt-9 flex w-full flex-col gap-5">
        {profile.links.map((link) => (
          <li key={link.id}>
            <LinkCard {...link} />
          </li>
        ))}
      </ul>

      <footer className="mt-12 text-xs text-muted">© 링크나무</footer>
    </main>
  );
}
