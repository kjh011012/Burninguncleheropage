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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

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

/* ═══ PAGE DATA ═══ */
const pageData = [
  {
    id: 1,
    number: "01",
    category: "강원 마을",
    title: ["여기,", "당신이 모르는 마을"],
    highlightIndices: [1, 0, 3], // "당신이" 하이라이트
    subtitle: "체험 · 치유 · 교육 · 농장",
    description: "강원도에서 시작되는 새로운 일상",
    detail: "작은 마을, 큰 경험.\n버닝엉클이 연결합니다.",
    bgGradient: "linear-gradient(135deg, #5B7A5E 0%, #4A6A4D 100%)",
    accentColor: "#5B7A5E",
    accentLight: "#7A9A7D",
    overlayColor: "#5B7A5E",
    highlightColor: "#F5EED6",
    heroImage: "https://images.unsplash.com/photo-1625567673497-6a36a1fb3a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGFlcmlhbCUyMHZpbGxhZ2UlMjBsYW5kc2NhcGUlMjBncmVlbnxlbnwxfHx8fDE3NzMxNTQxODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    number: "02",
    category: "치유 마을",
    title: ["숲이,", "당신을 치유합니다"],
    highlightIndices: [1, 0, 3], // "당신을"
    subtitle: "명상 · 요가 · 산책 · 휴식",
    description: "자연과 함께하는 힐링 여행",
    detail: "깊은 숲, 고요한 마음.\n치유의 시간을 선물합니다.",
    bgGradient: "linear-gradient(135deg, #6B8E8F 0%, #4A6B6C 100%)",
    accentColor: "#6B8E8F",
    accentLight: "#8BADAE",
    overlayColor: "#6B8E8F",
    highlightColor: "#D6F5EE",
    heroImage: "https://images.unsplash.com/photo-1635614989896-afa3547d8c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsaW5nJTIwZm9yZXN0JTIwcGF0aCUyMHN1bmxpZ2h0JTIwcGVhY2VmdWx8ZW58MXx8fHwxNzczMTU0NTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    number: "03",
    category: "교육 농장",
    title: ["배움,", "자연에서 시작됩니다"],
    highlightIndices: [1, 0, 3], // "자연에서"
    subtitle: "체험 · 학습 · 놀이 · 성장",
    description: "어린이와 함께하는 농장 교육",
    detail: "흙을 만지고, 생명을 배우고.\n자연이 주는 교실입니다.",
    bgGradient: "linear-gradient(135deg, #A77B5A 0%, #8B5E3C 100%)",
    accentColor: "#A77B5A",
    accentLight: "#C4997A",
    overlayColor: "#A77B5A",
    highlightColor: "#FFE8D6",
    heroImage: "https://images.unsplash.com/photo-1762921168438-3647231f8972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMG91dGRvb3IlMjBuYXR1cmUlMjBmYXJtJTIwZWR1Y2F0aW9uJTIwYWN0aXZpdHl8ZW58MXx8fHwxNzczMTU0NTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    number: "04",
    category: "체험 마을",
    title: ["전통,", "손으로 이어갑니다"],
    highlightIndices: [1, 0, 3], // "손으로"
    subtitle: "공예 · 요리 · 축제 · 문화",
    description: "우리의 전통을 직접 체험하다",
    detail: "오래된 지혜, 새로운 경험.\n전통이 살아 숨쉽니다.",
    bgGradient: "linear-gradient(135deg, #8B6F47 0%, #6E5636 100%)",
    accentColor: "#8B6F47",
    accentLight: "#A98C63",
    overlayColor: "#8B6F47",
    highlightColor: "#F5E6D6",
    heroImage: "https://images.unsplash.com/photo-1771411068614-3e5e4a978a78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMHZpbGxhZ2UlMjBoYW5vayUyMHNjZW5pY3xlbnwxfHx8fDE3NzMxNTQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    number: "05",
    category: "힐링 여행",
    title: ["여유,", "마음이 머무는 곳"],
    highlightIndices: [1, 0, 3], // "마음이"
    subtitle: "온천 · 카페 · 산책 · 여행",
    description: "천천히 걷고 깊이 쉬다",
    detail: "잠시 멈춤, 오래 기억.\n여유가 있는 여행입니다.",
    bgGradient: "linear-gradient(135deg, #7B6B8E 0%, #5E4F6F 100%)",
    accentColor: "#7B6B8E",
    accentLight: "#9B8BAE",
    overlayColor: "#7B6B8E",
    highlightColor: "#EEE6F5",
    heroImage: "https://images.unsplash.com/photo-1762781960299-c70b9332a9aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjb3VudHJ5c2lkZSUyMGF1dHVtbiUyMHNjZW5pYyUyMHZpbGxhZ2V8ZW58MXx8fHwxNzczMTU1NDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

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
  { icon: Users, label: "월 문자", value: "12.4", unit: "만명" },
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
  const [currentPage, setCurrentPage] = useState(0);

  const duped = [...marqueeImages, ...marqueeImages];
  const page = pageData[currentPage];

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? pageData.length - 1 : prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === pageData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden select-none"
      style={{ backgroundColor: P.bg, fontFamily: "'Noto Sans KR', sans-serif" }}
    >
      {/* ═══ TOP BAR ═══ */}
      

      {/* ═══ CENTER CONTENT ═══ */}
      <div className="flex-1 relative flex flex-row items-stretch px-0 py-0 z-10">
        {/* ═══ BACKGROUND DECORATIONS - Sensory Design ═══ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large Gradient Orbs - Soft & Dreamy */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[120px]"
            style={{
              top: "-15%",
              left: "-10%",
              background: `radial-gradient(circle, ${P.greenLight} 0%, ${P.warm} 40%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.25, 0.35, 0.25],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          

          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full opacity-15 blur-[80px]"
            style={{
              top: "30%",
              right: "20%",
              background: `radial-gradient(circle, #F5EED6 0%, ${P.warm} 60%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Sparkle Stars */}
          {[
            { top: "15%", left: "25%", delay: 0, size: 16 },
            { top: "45%", left: "15%", delay: 1.5, size: 12 },
            { bottom: "25%", left: "20%", delay: 3, size: 14 },
            { top: "60%", left: "30%", delay: 4.5, size: 10 },
          ].map((star, idx) => (
            <motion.div
              key={idx}
              className="absolute"
              style={{
                ...star,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z"
                  fill={P.green}
                  opacity="0.6"
                />
              </svg>
            </motion.div>
          ))}

          {/* Floating Leaf Silhouettes */}
          {[
            { top: "20%", left: "15%", rotate: 15, delay: 0 },
            { top: "55%", left: "25%", rotate: -20, delay: 2 },
            { bottom: "30%", left: "18%", rotate: 30, delay: 4 },
          ].map((leaf, idx) => (
            <motion.div
              key={`leaf-${idx}`}
              className="absolute opacity-[0.08]"
              style={{
                ...leaf,
                width: "80px",
                height: "80px",
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [leaf.rotate, leaf.rotate + 10, leaf.rotate],
                opacity: [0.08, 0.12, 0.08],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: leaf.delay,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 10C50 10 70 25 75 50C80 75 65 90 50 90C35 90 20 75 25 50C30 25 50 10 50 10Z"
                  fill={P.green}
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* ═══ LEFT PANEL - Brand Story (40%) ═══ */}
        <motion.div 
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-[35%] flex flex-col justify-between px-0 sm:px-0 py-0 relative z-10 overflow-hidden"
          style={{
            background: page.bgGradient,
          }}
        >
          {/* Pagination indicator - TOP with separated background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between gap-3 px-12 sm:px-16 py-16 relative"
            style={{
              backgroundColor: "#FAFAF7",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Large Number on Left */}
            <div className="flex items-center gap-4">
              <motion.span
                key={`number-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ 
                  fontSize: "72px", 
                  fontWeight: 900, 
                  color: `${page.accentColor}20`,
                  fontFamily: "'Noto Serif KR', serif",
                  lineHeight: 1,
                  letterSpacing: "-0.05em"
                }}
              >
                {page.number}
              </motion.span>
              <motion.div
                key={`category-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{ 
                  writingMode: "vertical-rl",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: page.accentColor,
                  letterSpacing: "0.05em",
                  opacity: 0.7
                }}
              >
                {page.category}
              </motion.div>
            </div>

            {/* Right: Navigation Controls */}
            <div className="flex items-center gap-3">
              {/* Left Arrow */}
              <button
                className="flex items-center justify-center transition-all"
                style={{
                  color: page.accentColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = page.accentLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = page.accentColor;
                }}
                onClick={handlePrevPage}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span style={{ fontSize: "11px", fontWeight: 600, color: page.accentColor }}>
                {currentPage + 1} / 5
              </span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: i === currentPage ? "32px" : "8px",
                      backgroundColor: i === currentPage ? page.accentColor : `${page.accentColor}40`,
                    }}
                    onClick={() => setCurrentPage(i)}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                className="flex items-center justify-center transition-all"
                style={{
                  color: page.accentColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = page.accentLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = page.accentColor;
                }}
                onClick={handleNextPage}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Main Content - BOTTOM */}
          <div className="px-12 sm:px-16 py-24 flex flex-col items-center justify-center flex-1">
            {/* Headline */}
            <motion.h1
              key={`title-${currentPage}`}
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              className="text-center"
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "clamp(26px, 3.2vw, 38px)",
                fontWeight: 900,
                color: "white",
                lineHeight: 1.25,
                letterSpacing: "-0.025em",
              }}
            >
              {page.title.map((line, lineIdx) => (
                <div key={lineIdx}>
                  {line.split("").map((char, i) => (
                    <motion.span 
                      key={`${lineIdx}-${i}`} 
                      variants={fadeUp} 
                      className="inline-block"
                      style={{ color: lineIdx === 1 && i < 3 ? page.highlightColor : "white" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  {lineIdx === 0 && <br />}
                </div>
              ))}
            </motion.h1>

            {/* Sub text */}
            <motion.p
              key={`subtitle-${currentPage}`}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
              style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.95)", lineHeight: 1.6 }}
            >
              {page.subtitle}
            </motion.p>

            <motion.p
              key={`description-${currentPage}`}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.35 }}
              className="mt-3 text-center"
              style={{ fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}
            >
              {page.description}
            </motion.p>

            {/* Description */}
            <motion.div
              key={`detail-${currentPage}`}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.4 }}
              className="mt-10 text-center"
              style={{ fontSize: "13px", fontWeight: 400, color: "rgba(255,255,255,0.9)", lineHeight: 1.8, maxWidth: "380px" }}
            >
              <p>
                {page.detail.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < page.detail.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-row gap-6 justify-center"
            >
              {stats.map((s, idx) => (
                null
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ═══ RIGHT PANEL - Video Area (60%) ═══ */}
        <div className="hidden lg:flex w-[65%] relative overflow-hidden">
          {/* Background Video/Image */}
          <motion.div
            key={`hero-${currentPage}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={page.heroImage}
              alt={page.category}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to left, transparent 85%, ${page.overlayColor}26 100%)`,
              }}
            />
          </motion.div>

          {/* Floating Info Badge */}
          
        </div>
      </div>

      {/* ═══ MARQUEE IMAGE BAND ═══ */}
      <div
        className="shrink-0 relative overflow-hidden"
        style={{
          height: "180px",
          backgroundColor: P.bg,
          backgroundImage: `linear-gradient(to bottom, ${P.cardBg} 0%, ${P.bg} 50%, ${P.cardBg} 100%)`,
          maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        {/* Subtle top blend */}
        <div 
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "80px",
            background: `linear-gradient(to bottom, ${page.overlayColor}40 0%, ${page.overlayColor}20 40%, transparent 100%)`,
          }}
        />
        
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
        
        {/* Subtle bottom blend - REMOVED */}
      </div>

      {/* ═══ BOTTOM SECTION (expanded) ═══ */}
      <div className="shrink-0" style={{ borderTop: `1px solid ${P.borderLight}`, backgroundColor: P.cardBg }}>
        {/* News row - Centered with Navigation */}
        
      </div>
    </section>
  );
}