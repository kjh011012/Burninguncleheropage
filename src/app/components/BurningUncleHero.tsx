import React, { useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ChevronDown } from "lucide-react";
import cameraImage from "figma:asset/0d63e65b5f3337d66218f5373c0fdf5c1bd78f16.png";
import { HeroSection } from "./korea-village/HeroSection";

// 카드 크기 (원래 flip-card 크기)
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;
const TOTAL_CARDS = 20;

// 이미지 목록
const IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=300&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80",
  "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=300&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&q=80",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&q=80",
  "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=300&q=80",
  "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=300&q=80",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&q=80",
  "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=300&q=80",
  "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=300&q=80",
];

interface CardPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

interface CardProps {
  src: string;
  index: number;
  position: CardPosition;
}

// 원래 flip-card 스타일의 카드 컴포넌트
function FlipCard({ src, index, position }: CardProps) {
  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
        rotate: position.rotation,
        scale: position.scale,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        left: "calc(50% + 20px)", // 카메라 렌즈 중심에 맞춰 우측으로
        top: "calc(50% + 20px)", // 카메라 렌즈 중심에 춰 아래로
        marginLeft: -IMG_WIDTH / 2,
        marginTop: -IMG_HEIGHT / 2,
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={src}
            alt={`hero-${index}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-900 flex flex-col items-center justify-center p-4 border border-gray-700"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest mb-1">View</p>
            <p className="text-xs font-medium text-white">Details</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BurningUncleHero() {
  const [phase, setPhase] = useState<"circle" | "shutter" | "final">("circle");
  const [rotationAngle, setRotationAngle] = useState(0);

  // 원형 회전 애니메이션
  useEffect(() => {
    if (phase !== "circle") return;
    
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.5) % 360);
    }, 30); // 30ms마다 0.5도씩 회전 (더 빠르게)
    
    return () => clearInterval(interval);
  }, [phase]);

  // 스크롤 감지 - 아래로 스크롤하면 찰칵 효과와 함께 전환
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (phase === "circle" && e.deltaY > 0) {
        setPhase("shutter");
        setTimeout(() => setPhase("final"), 2000);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [phase]);

  // 클릭 시 찰칵 효과와 함께 전환 (즉시)
  const handleCameraClick = () => {
    if (phase === "circle") {
      setPhase("shutter");
      setTimeout(() => setPhase("final"), 2000);
    }
  };

  // 카드 위치 계산
  const cardPositions = useMemo(() => {
    const positions: CardPosition[] = [];
    
    // 원형 배치만
    const radius = 300;
    for (let i = 0; i < TOTAL_CARDS; i++) {
      const angle = (i / TOTAL_CARDS) * 360 + rotationAngle;
      const rad = (angle * Math.PI) / 180;
      positions.push({
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
        rotation: angle + 90,
        scale: 1,
      });
    }
    
    return positions;
  }, [rotationAngle]);

  // 최종 화면으로 전환
  if (phase === "final") {
    return <HeroSection />;
  }

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* 카메라 셔터 플래시 효과 */}
      {phase === "shutter" && (
        <motion.div
          className="absolute inset-0 bg-white z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, times: [0, 0.3, 1], ease: "easeInOut" }}
        />
      )}

      {/* 카메라 배경 이미지 - 정중앙에 배치, 클릭 가능 */}
      <motion.div 
        className="absolute cursor-pointer z-15"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ 
          opacity: phase === "shutter" ? 0 : 1,
        }}
        transition={{ duration: 1, ease: "easeInOut", delay: phase === "shutter" ? 0.3 : 0 }}
        onClick={handleCameraClick}
      >
        <motion.img
          src={cameraImage}
          alt="Camera Lens"
          className="w-[600px] h-[600px] object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
        

        {/* 스크롤 힌트 (원형일 때만 표시) */}
        {phase === "circle" && (
          null
        )}
      </div>

      {/* 하단 스크롤 안내 문구 */}
      {phase === "circle" && (
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-1 z-30"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
          <span className="text-xs text-gray-500 font-medium">아래로 스크롤</span>
        </motion.div>
      )}

      {/* 카드들 - shutter일 때 서서히 사라짐 */}
      <motion.div 
        className="relative w-full h-full flex items-center justify-center z-20"
        animate={{
          opacity: phase === "shutter" ? 0 : 1,
        }}
        transition={{ duration: 1, ease: "easeInOut", delay: phase === "shutter" ? 0.3 : 0 }}
      >
        {IMAGES.slice(0, TOTAL_CARDS).map((src, i) => (
          <FlipCard
            key={i}
            src={src}
            index={i}
            position={cardPositions[i]}
          />
        ))}
      </motion.div>
    </div>
  );
}