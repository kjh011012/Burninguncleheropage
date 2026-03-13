import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Search,
  Sparkles,
  BadgeCheck,
  Compass,
  Heart,
  GraduationCap,
  Leaf,
  MapPin,
  Mountain,
  Clock,
  TrendingUp,
  Users,
  TreePine,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/* ═══ PALETTE ═══ */
const P = {
  bg: "#F2EDE7",
  cardBg: "#FAFAF7",
  text: "#2C2C2C",
  textSub: "#7A7A72",
  textMuted: "#A8A49E",
  border: "#D9D4CC",
  borderLight: "#E8E3DC",
  green: "#5B7A5E",
  greenLight: "#7A9A7D",
  greenBg: "#EEF3EE",
  warm: "#C8B898",
};

/* ═══ Marquee images ═══ */
const marqueeImages = [
  {
    src: "https://images.unsplash.com/photo-1771411068614-3e5e4a978a78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHZpbGxhZ2UlMjBoYW5vayUyMHNjZW5pY3xlbnwxfHx8fDE3NzMxNTQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "체험마을",
  },
  {
    src: "https://images.unsplash.com/photo-1635614989896-afa3547d8c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsaW5nJTIwZm9yZXN0JTIwcGF0aCUyMHN1bmxpZ2h0JTIwcGVhY2VmdWx8ZW58MXx8fHwxNzczMTU0NTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "치유의 숲",
  },
  {
    src: "https://images.unsplash.com/photo-1762921168438-3647231f8972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMG91dGRvb3IlMjBuYXR1cmUlMjBmYXJtJTIwZWR1Y2F0aW9uJTIwYWN0aXZpdHl8ZW58MXx8fHwxNzczMTU0NTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "교육농장",
  },
  {
    src: "https://images.unsplash.com/photo-1762781960299-c70b9332a9aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjb3VudHJ5c2lkZSUyMGF1dHVtbiUyMHNjZW5pYyUyMHZpbGxhZ2V8ZW58MXx8fHwxNzczMTU1NDExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "가을 마을",
  },
  {
    src: "https://images.unsplash.com/photo-1743685891741-fd813e0554ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHRlYSUyMGZpZWxkJTIwcGxhbnRhdGlvbiUyMGtvcmVhfGVufDF8fHx8MTc3MzE1NTQxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "치유농장",
  },
  {
    src: "https://images.unsplash.com/photo-1763216336978-fb1472011164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN0cmVhbSUyMHJvY2tzJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzczMTU1NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "계곡 체험",
  },
  {
    src: "https://images.unsplash.com/photo-1767334852239-18942dea6f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmb3Jlc3QlMjBwYXRoJTIwemVuJTIwc2VyZW5lfGVufDF8fHx8MTc3MzE1NTQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "숲속 명상",
  },
  {
    src: "https://images.unsplash.com/photo-1766499670904-edab815e8fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHBvdHRlcnklMjBjcmFmdCUyMHdvcmtzaG9wJTIwaGFuZHN8ZW58MXx8fHwxNzczMTU1NDEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "전통공예",
  },
];

/* ═══ Hashtags ═══ */
const hashtags = ["#체험마을", "#치유농장", "#강원도여행", "#교육농장", "#마을소개", "#힐링여행"];

/* ═══ Categories ═══ */
const cats = [
  { icon: Mountain, label: "체험마을", count: "127" },
  { icon: Heart, label: "치유마을", count: "89" },
  { icon: GraduationCap, label: "교육농장", count: "56" },
  { icon: Leaf, label: "치유농장", count: "43" },
];

/* ═══ Stats ═══ */
const stats = [
  { icon: TreePine, label: "등록 마을", value: "315", unit: "개소" },
  { icon: Users, label: "월 방문자", value: "12.4", unit: "만명" },
  { icon: TrendingUp, label: "컨설팅 완료", value: "89", unit: "건" },
];

/* ═══ News ═══ */
const newsCards = [
  {
    source: "버닝엉클 인사이트",
    title: "2026 체험마을 프로그램 가이드",
    date: "2026-03-08",
    image:
      "https://images.unsplash.com/photo-1766662538843-09bd927536ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB2aWxsYWdlJTIwdHJhZGl0aW9uYWwlMjBjdWx0dXJlfGVufDF8fHx8MTc3MzE1NDE4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    source: "치유마을 뉴스",
    title: "숲 치유 프로그램의 효과 발표",
    date: "2026-02-28",
    image:
      "https://images.unsplash.com/photo-1762770658065-27f50ed310ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0aGVyYXB5JTIwbWVkaXRhdGlvbiUyMG91dGRvb3J8ZW58MXx8fHwxNzczMTU0MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    source: "교육농장 리포트",
    title: "어린이 자연학습 트렌드",
    date: "2026-02-15",
    image:
      "https://images.unsplash.com/photo-1558534949-0a442209cb33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHJpY2UlMjBwYWRkeSUyMHRlcnJhY2VzJTIwYWVyaWFsfGVufDF8fHx8MTc3MzE0ODYyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    source: "마을 컨설팅",
    title: "가맹 패키지 컨설팅 후기",
    date: "2026-01-20",
    image:
      "https://images.unsplash.com/photo-1625567673497-6a36a1fb3a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGFlcmlhbCUyMHZpbGxhZ2UlMjBsYW5kc2NhcGUlMjBncmVlbnxlbnwxfHx8fDE3NzMxNTQxODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

/* ═══ Seoul clock ═══ */
function useSeoulClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
      );
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      const months = [
        "JAN","FEB","MAR","APR","MAY","JUN",
        "JUL","AUG","SEP","OCT","NOV","DEC",
      ];
      setDate(`${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return { time, date };
}

/* ═══ Animation variants ═══ */
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

/* ═══════════════════════════════════════
   ██  HERO SECTION  ██
   ═══════════════════════════════════════ */
export function HeroSection() {
  const { time, date } = useSeoulClock();
  const newsRef = useRef<HTMLDivElement>(null);

  const duped = [...marqueeImages, ...marqueeImages];

  return (
    <section
      className="relative w-full h-screen flex flex-col overflow-hidden select-none"
      style={{ backgroundColor: P.bg, fontFamily: "'Noto Sans KR', sans-serif" }}
    >
      {/* ═══ TOP BAR ═══ */}
      <div
        className="shrink-0 flex items-center justify-between px-5 sm:px-8 py-2"
        style={{ borderBottom: `1px solid ${P.borderLight}` }}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: P.green }} />
          <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: P.text }}>
            버닝엉클
          </span>
          <div className="w-[1px] h-3 mx-1" style={{ backgroundColor: P.border }} />
          <span style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", color: P.textMuted }}>
            BURNING UNCLE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: P.green }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Clock className="w-3 h-3" style={{ color: P.textMuted }} />
          <span className="tabular-nums" style={{ fontSize: "11px", fontWeight: 500, color: P.textSub }}>
            {time}
          </span>
          <span className="hidden sm:inline" style={{ fontSize: "10px", color: P.textMuted }}>
            {date}
          </span>
        </div>
      </div>

      {/* ═══ CENTER CONTENT ═══ */}
      <div className="flex-1 relative flex flex-col items-center justify-center text-center px-5 z-10">
        {/* Tagline badge */}
        

        {/* Title with staggered word animation */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 900,
            color: P.text,
            lineHeight: 1.25,
            letterSpacing: "-0.025em",
          }}
        >
          {"강원도의 숨겨진".split("").map((char, i) => (
            <motion.span key={`a-${i}`} variants={fadeUp} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <br />
          {"보석 같은 마을들".split("").map((char, i) => (
            <motion.span key={`b-${i}`} variants={fadeUp} className="inline-block" style={{ color: i < 2 ? P.green : P.text }}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.4 }}
          className="mt-4 max-w-md"
          style={{ fontSize: "13px", fontWeight: 400, color: P.textSub, lineHeight: 1.8 }}
        >
          체험마을 · 치유마을 · 교육농장 · 치유농장<br />
          아직 세상이 모르는 특별한 공간을 소개합니다
        </motion.p>

        {/* Search + CTA row */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.5 }}
          className="mt-5 flex items-center gap-2 max-w-sm w-full"
        >
          <div
            className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
            style={{ border: `1px solid ${P.border}`, backgroundColor: P.cardBg }}
          >
            <Search className="w-3.5 h-3.5 shrink-0" style={{ color: P.textMuted }} />
            <span style={{ fontSize: "11px", color: P.textMuted }}>마을 · 체험 검색...</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl cursor-pointer shrink-0"
            style={{
              backgroundColor: P.green,
              fontSize: "11px",
              fontWeight: 600,
              color: "white",
            }}
          >
            <Sparkles className="w-3 h-3" />
            맞춤 추천
          </motion.button>
        </motion.div>

        {/* Hashtags */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.55 }}
          className="mt-3 flex flex-wrap justify-center gap-1.5"
        >
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full cursor-pointer transition-colors hover:opacity-70"
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: P.textSub,
                border: `1px solid ${P.borderLight}`,
                backgroundColor: `${P.cardBg}aa`,
                backdropFilter: "blur(4px)",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Stats + Badges inline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.6 }}
          className="mt-4 flex items-center gap-5"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <s.icon className="w-3.5 h-3.5" style={{ color: P.green }} />
              <span style={{ fontSize: "13px", fontWeight: 800, color: P.text }}>
                {s.value}
                <span style={{ fontSize: "9px", fontWeight: 500, color: P.textMuted, marginLeft: "1px" }}>
                  {s.unit}
                </span>
              </span>
            </div>
          ))}
          <div className="w-[1px] h-3" style={{ backgroundColor: P.border }} />
          <div className="flex items-center gap-1">
            <BadgeCheck className="w-3.5 h-3.5" style={{ color: P.green }} />
            <span style={{ fontSize: "9px", fontWeight: 600, color: P.textSub }}>VERIFIED</span>
          </div>
          <div className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" style={{ color: P.green }} />
            <span style={{ fontSize: "9px", fontWeight: 600, color: P.textSub }}>CONSULT</span>
          </div>
        </motion.div>
      </div>

      {/* ═══ MARQUEE IMAGE BAND ═══ */}
      <div
        className="shrink-0 relative overflow-hidden"
        style={{
          height: "180px",
          maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <motion.div
          className="flex gap-4 absolute top-3"
          animate={{ x: [0, -(marqueeImages.length * 172)] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {duped.map((img, i) => (
            <div
              key={i}
              className="relative shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
              style={{
                width: "156px",
                height: "156px",
                transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <ImageWithFallback
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
                }}
              />
              <div className="absolute bottom-2.5 left-3 right-3">
                <span
                  style={{
                    fontFamily: "'Noto Serif KR', serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ═══ BOTTOM SECTION (expanded) ═══ */}
      <div className="shrink-0" style={{ borderTop: `1px solid ${P.borderLight}`, backgroundColor: P.cardBg }}>
        {/* Category chips + CTA row */}
        <div
          className="flex items-center justify-between px-5 sm:px-8 py-3"
          style={{ borderBottom: `1px solid ${P.borderLight}` }}
        >
          <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {cats.map((cat) => (
              <div
                key={cat.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all shrink-0 hover:opacity-75"
                style={{ border: `1px solid ${P.borderLight}`, backgroundColor: P.bg }}
              >
                <cat.icon className="w-3 h-3" style={{ color: P.green }} />
                <span style={{ fontSize: "10px", fontWeight: 600, color: P.textSub }}>{cat.label}</span>
                <span style={{ fontSize: "9px", fontWeight: 500, color: P.textMuted }}>{cat.count}</span>
              </div>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-3">
            {["마을 이야기 보러가기", "컨설팅 상담 신청"].map((label) => (
              <button
                key={label}
                className="group flex items-center gap-1 cursor-pointer"
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <span style={{ fontSize: "11px", fontWeight: 700, color: P.text }}>{label}</span>
                <ArrowRight
                  className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                  style={{ color: P.green }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* News row */}
        <div className="flex items-stretch" style={{ borderBottom: `1px solid ${P.borderLight}` }}>
          <div
            className="hidden sm:flex items-center px-5 shrink-0"
            style={{ borderRight: `1px solid ${P.borderLight}` }}
          >
            <span style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.18em", color: P.textMuted }}>
              NEWS
            </span>
          </div>
          <div
            ref={newsRef}
            className="flex-1 flex gap-0 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {newsCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.06 }}
                className="group flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors shrink-0"
                style={{
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: "1px",
                  borderRightStyle: "solid",
                  borderRightColor: P.borderLight,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#EDE8E1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={card.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span style={{ fontSize: "10px", fontWeight: 600, color: P.green, letterSpacing: "0.04em" }}>
                    {card.source}
                  </span>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: P.text, lineHeight: 1.4, whiteSpace: "nowrap" }}>
                    {card.title}
                  </p>
                  <span style={{ fontSize: "10px", color: P.textMuted }}>{card.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-2.5">
          <div className="flex items-center gap-3 sm:gap-5">
            <span
              className="hidden sm:inline"
              style={{ fontSize: "7px", fontWeight: 700, color: P.textMuted, letterSpacing: "0.2em" }}
            >
              PARTNERS
            </span>
            {[
              { icon: MapPin, name: "강원특별자치도" },
              { icon: Leaf, name: "농림축산식품부" },
              { icon: Mountain, name: "한국농어촌공사" },
            ].map(({ icon: Icon, name }) => (
              <span key={name} className="flex items-center gap-1" style={{ color: P.textMuted }}>
                <Icon className="w-2.5 h-2.5" />
                <span style={{ fontSize: "9px", fontWeight: 500 }}>{name}</span>
              </span>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {hashtags.slice(0, 3).map((tag) => (
              <span key={tag} style={{ fontSize: "9px", color: P.textMuted }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}