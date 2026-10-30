"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import {
  Play,
  Pause,
  Download,
  Video,
  Sparkles,
  Volume2,
  RefreshCw,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Sliders,
} from "lucide-react";

export default function VideoStudioPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [voiceChoice, setVoiceChoice] = useState<"male" | "female">("male");
  const [statusText, setStatusText] = useState("اضغط تشغيل للمعاينة أو تصدير لتحميل الفيديو");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Preloaded Images
  const imagesRef = useRef<{ [key: string]: HTMLImageElement }>({});

  useEffect(() => {
    // Preload logo and portfolio images for canvas
    const imageSources: { [key: string]: string } = {
      logo: siteConfig.logo,
      water: "/portfolio/ohod-water.jpg",
      madinah: "/portfolio/almadenah-water.jpg",
      clinic: "/portfolio/farabi-clinics.jpg",
      store: "/portfolio/darzaid.jpg",
    };

    Object.entries(imageSources).forEach(([key, src]) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        imagesRef.current[key] = img;
      };
    });
  }, []);

  const voiceSrc = voiceChoice === "male" ? "/voiceover.mp3" : "/voiceover-female.mp3";

  // Canvas Drawing Engine for 1080x1920 (9:16 Vertical Video)
  const drawFrame = (currentTime: number, duration: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    const t = currentTime; // in seconds

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, "#19032B");
    bgGrad.addColorStop(0.5, "#320853");
    bgGrad.addColorStop(1, "#110220");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle Gold Ambient Glow in the Center
    const glowGrad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      50,
      width / 2,
      height / 2,
      600
    );
    glowGrad.addColorStop(0, "rgba(201, 151, 38, 0.15)");
    glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Top Header Brand Bar (Always visible)
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.roundRect(80, 100, width - 160, 110, 30);
    ctx.fill();

    // Logo Icon
    const logoImg = imagesRef.current["logo"];
    if (logoImg && logoImg.complete) {
      ctx.drawImage(logoImg, 120, 115, 80, 80);
    }

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 44px Tajawal, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("مؤسسة رواد الرقمية", width - 130, 155);

    ctx.fillStyle = "#F5D47A";
    ctx.font = "30px Tajawal, sans-serif";
    ctx.fillText("المدينة المنورة — عروض 2026", width - 130, 195);

    // ==========================================
    // SCENE 1: The Hook (0s - 6s)
    // ==========================================
    if (t < 6.5) {
      // Animated Badge
      ctx.fillStyle = "rgba(245, 212, 122, 0.2)";
      ctx.strokeStyle = "#C99726";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(width / 2 - 250, 420, 500, 75, 40);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#F5D47A";
      ctx.font = "bold 36px Tajawal, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("⚡ عرض حصري للأنشطة والشركات", width / 2, 470);

      // Huge Shocking Hook Text
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 80px Tajawal, sans-serif";
      ctx.fillText("معقول في 2026", width / 2, 620);
      ctx.fillText("تدفع آلاف الريالات", width / 2, 720);

      ctx.fillStyle = "#F5D47A";
      ctx.fillText("عشان موقع لنشاطك؟! 🤯", width / 2, 820);

      // Price Tag Pop
      const scale = Math.min(1, Math.max(0.8, 0.9 + Math.sin(t * 5) * 0.08));
      ctx.save();
      ctx.translate(width / 2, 1120);
      ctx.scale(scale, scale);

      ctx.fillStyle = "#56138A";
      ctx.strokeStyle = "#F5D47A";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(-340, -140, 680, 280, 40);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#F5D47A";
      ctx.font = "bold 44px Tajawal, sans-serif";
      ctx.fillText("موقع إلكتروني متكامل يبدأ من", 0, -50);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 120px Tajawal, sans-serif";
      ctx.fillText("399 ريال", 0, 75);
      ctx.restore();

      // Quick Points
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = "bold 40px Tajawal, sans-serif";
      ctx.fillText("✓ دومين .com مجاناً لسنة", width / 2, 1420);
      ctx.fillText("✓ استضافة سريعة مشمولة", width / 2, 1490);
      ctx.fillText("✓ تسليم خلال 3 إلى 5 أيام عمل", width / 2, 1560);
    }
    // ==========================================
    // SCENE 2: Real Client Showcase (6.5s - 15s)
    // ==========================================
    else if (t >= 6.5 && t < 15) {
      ctx.fillStyle = "#F5D47A";
      ctx.font = "bold 40px Tajawal, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("✦ نماذج حقيقية من أعمالنا المنفذة ✦", width / 2, 380);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 64px Tajawal, sans-serif";
      ctx.fillText("شوف جودة وسرعة المواقع", width / 2, 460);

      // Cycle images based on time
      const subTime = t - 6.5;
      let currentImgKey = "madinah";
      let projectTitle = "مياه المدينة المنورة";
      let projectCat = "مصانع وأغذية — المدينة المنورة";

      if (subTime >= 2.5 && subTime < 5) {
        currentImgKey = "water";
        projectTitle = "مصنع مياه أحد";
        projectCat = "أغذية ومشروبات كبرى";
      } else if (subTime >= 5 && subTime < 7) {
        currentImgKey = "clinic";
        projectTitle = "مجمع عيادات الفارابي";
        projectCat = "مراكز طبية وعيادات";
      } else if (subTime >= 7) {
        currentImgKey = "store";
        projectTitle = "متجر دار زيد";
        projectCat = "متاجر إلكترونية متكاملة";
      }

      // Laptop Bezel
      ctx.fillStyle = "#0D0A14";
      ctx.strokeStyle = "#3E2B5C";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.roundRect(100, 560, width - 200, 680, 30);
      ctx.fill();
      ctx.stroke();

      // Browser Mockup Top
      ctx.fillStyle = "#1E172B";
      ctx.fillRect(100, 560, width - 200, 60);

      // Dots
      ctx.fillStyle = "#EF4444";
      ctx.beginPath();
      ctx.arc(140, 590, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.arc(170, 590, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.arc(200, 590, 10, 0, Math.PI * 2);
      ctx.fill();

      // Screenshot
      const showImg = imagesRef.current[currentImgKey];
      if (showImg && showImg.complete) {
        ctx.drawImage(showImg, 100, 620, width - 200, 620);
      }

      // Project Banner Below
      ctx.fillStyle = "rgba(86, 19, 138, 0.9)";
      ctx.strokeStyle = "#C99726";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(140, 1300, width - 280, 150, 24);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 50px Tajawal, sans-serif";
      ctx.fillText(projectTitle, width / 2, 1365);

      ctx.fillStyle = "#F5D47A";
      ctx.font = "bold 32px Tajawal, sans-serif";
      ctx.fillText(projectCat, width / 2, 1415);

      // Trust Footnote
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "36px Tajawal, sans-serif";
      ctx.fillText("أكثر من 24 مشروع حقيقي بالمملكة", width / 2, 1540);
    }
    // ==========================================
    // SCENE 3: The Offer & Guarantee (15s - 22s)
    // ==========================================
    else if (t >= 15 && t < 22) {
      ctx.fillStyle = "#F5D47A";
      ctx.font = "bold 44px Tajawal, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ماذا ستحصل عليه في العرض؟", width / 2, 400);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 70px Tajawal, sans-serif";
      ctx.fillText("باقة متكاملة لنشاطك 🚀", width / 2, 490);

      const features = [
        "🌐 دومين .com رسمي مجاناً لمدة سنة",
        "⚡ استضافة سحابية فائقة السرعة والأمان",
        "📱 متوافق 100% مع الجوال والشاشات",
        "🛠️ لوحة تحكم لتعديل الصور والنصوص بنفسك",
        "🎯 مهيأ لإعلانات تيك توك وسناب وإنستغرام",
        "⏱️ تسليم سريع خلال 3 إلى 5 أيام عمل فقط",
      ];

      features.forEach((feat, idx) => {
        const yPos = 620 + idx * 130;
        ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        ctx.strokeStyle = idx === 5 ? "#F5D47A" : "rgba(201, 151, 38, 0.3)";
        ctx.lineWidth = idx === 5 ? 3 : 1;
        ctx.beginPath();
        ctx.roundRect(100, yPos - 50, width - 200, 100, 20);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = idx === 5 ? "#F5D47A" : "#FFFFFF";
        ctx.font = "bold 40px Tajawal, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(feat, width - 150, yPos + 15);
      });

      // Price Bottom Ribbon
      ctx.fillStyle = "#56138A";
      ctx.textAlign = "center";
      ctx.font = "900 64px Tajawal, sans-serif";
      ctx.fillText("كل هذا يبدأ من 399 ريال فقط!", width / 2, 1540);
    }
    // ==========================================
    // SCENE 4: Strong CTA (22s+)
    // ==========================================
    else {
      ctx.fillStyle = "#F5D47A";
      ctx.font = "bold 44px Tajawal, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("لا تضيّع عملاء نشاطك اليوم!", width / 2, 450);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 76px Tajawal, sans-serif";
      ctx.fillText("احجز موقعك الآن", width / 2, 560);
      ctx.fillText("واستلم خلال 3 أيام", width / 2, 660);

      // WhatsApp Big Pulsing Button
      const pulse = 1 + Math.sin(t * 6) * 0.04;
      ctx.save();
      ctx.translate(width / 2, 980);
      ctx.scale(pulse, pulse);

      ctx.fillStyle = "#25D366";
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(-360, -90, 720, 180, 90);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 52px Tajawal, sans-serif";
      ctx.fillText("💬 تواصل معنا واتساب فوراً", 0, 18);
      ctx.restore();

      // Phone details
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 48px Tajawal, sans-serif";
      ctx.fillText("054 390 7572", width / 2, 1220);

      ctx.fillStyle = "#F5D47A";
      ctx.font = "bold 38px Tajawal, sans-serif";
      ctx.fillText("ruaadsa.vercel.app", width / 2, 1310);

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "32px Tajawal, sans-serif";
      ctx.fillText("مؤسسة رواد الرقمية للدعاية والإعلان — المدينة المنورة", width / 2, 1420);
    }

    // Bottom Progress Bar
    const progressPct = Math.min(1, t / (duration || 26));
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(80, height - 80, width - 160, 12);

    ctx.fillStyle = "#F5D47A";
    ctx.fillRect(80, height - 80, (width - 160) * progressPct, 12);
  };

  // Play / Animation Loop
  const startPlaying = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);

    const updateLoop = () => {
      if (!audio) return;
      drawFrame(audio.currentTime, audio.duration || 26);
      setProgress((audio.currentTime / (audio.duration || 26)) * 100);

      if (!audio.paused && !audio.ended) {
        animationFrameRef.current = requestAnimationFrame(updateLoop);
      } else if (audio.ended) {
        setIsPlaying(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);
  };

  const stopPlaying = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsPlaying(false);
  };

  // Record Canvas + Audio into WebM/MP4
  const startRecordingAndExport = async () => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !audio) return;

    setIsRecording(true);
    setStatusText("جارٍ تسجيل وتوليد الفيديو مع الفويس أوفر بدقة عالية... انتظر ثوانٍ");
    recordedChunksRef.current = [];

    // 1. Create AudioContext to mix audio track into stream
    audio.currentTime = 0;

    const canvasStream = canvas.captureStream(30);

    // Merge audio
    let combinedStream: MediaStream = canvasStream;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioCtx.createMediaElementSource(audio);
      const dest = audioCtx.createMediaStreamDestination();
      source.connect(dest);
      source.connect(audioCtx.destination); // also listen

      const audioTrack = dest.stream.getAudioTracks()[0];
      if (audioTrack) {
        combinedStream = new MediaStream([
          ...canvasStream.getVideoTracks(),
          audioTrack,
        ]);
      }
    } catch (err) {
      console.warn("AudioContext setup:", err);
    }

    // Try MP4 first, then WebM
    let mimeType = "video/webm;codecs=vp9,opus";
    if (MediaRecorder.isTypeSupported("video/mp4;codecs=avc1")) {
      mimeType = "video/mp4;codecs=avc1";
    } else if (MediaRecorder.isTypeSupported("video/webm")) {
      mimeType = "video/webm";
    }

    const recorder = new MediaRecorder(combinedStream, {
      mimeType,
      videoBitsPerSecond: 4000000, // 4 Mbps crisp HD
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: mimeType });
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);
      setIsRecording(false);
      setStatusText("✓ تم توليد الفيديو بنجاح! اضغط تنزيل لحفظه على جهازك");

      // Auto download
      const a = document.createElement("a");
      a.href = url;
      a.download = `rowad_digital_promo_${Date.now()}.${mimeType.includes("mp4") ? "mp4" : "webm"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    mediaRecorderRef.current = recorder;
    recorder.start(100);

    audio.play();
    setIsPlaying(true);

    const recordLoop = () => {
      drawFrame(audio.currentTime, audio.duration || 26);
      setProgress((audio.currentTime / (audio.duration || 26)) * 100);

      if (!audio.paused && !audio.ended) {
        animationFrameRef.current = requestAnimationFrame(recordLoop);
      } else {
        recorder.stop();
        setIsPlaying(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(recordLoop);
  };

  // Initial Draw
  useEffect(() => {
    drawFrame(0, 26);
  }, []);

  return (
    <main className="min-h-screen bg-[#0D0814] text-white p-4 sm:p-8 flex flex-col items-center selection:bg-[#56138A] selection:text-white">
      {/* Hidden Audio Player */}
      <audio ref={audioRef} src={voiceSrc} preload="auto" />

      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between pb-6 border-b border-[#2E1F47] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <Image src={siteConfig.logo} alt="Logo" fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black">أستوديو توليد الفيديو الإعلاني</h1>
            <p className="text-xs text-[#F5D47A]">مؤسسة رواد الرقمية — المدينة المنورة</p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#2A1940] hover:bg-[#3D255C] text-gray-200 transition-colors"
        >
          <span>العودة للموقع</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Studio Work Area */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (Visual Canvas Frame in 9:16 Aspect Ratio) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[2.5rem] bg-[#1C122B] p-3 shadow-[0_25px_60px_rgba(86,19,138,0.35)] border-4 border-[#56138A]">
            {/* Notch */}
            <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2" />

            {/* Video Canvas */}
            <div className="rounded-[1.8rem] overflow-hidden bg-black aspect-[9/16] relative flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
                width={1080}
                height={1920}
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-[380px] mt-4">
            <div className="w-full bg-[#2A1940] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#56138A] to-[#F5D47A] h-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right (Control Panel & Actions) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Status Box */}
          <div className="p-4 rounded-2xl bg-[#1C122B] border border-[#3E295E]">
            <p className="text-xs text-[#F5D47A] font-bold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>حالة الأستوديو:</span>
            </p>
            <p className="text-sm font-semibold text-gray-200">{statusText}</p>
          </div>

          {/* Voiceover Selection */}
          <div className="p-5 rounded-2xl bg-[#1C122B] border border-[#3E295E]">
            <label className="block text-xs font-bold text-gray-300 mb-2 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#F5D47A]" />
              <span>اختيار صوت المعلق السعودي (Neural Voice):</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setVoiceChoice("male")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  voiceChoice === "male"
                    ? "bg-[#56138A] text-white border-[#F5D47A]"
                    : "bg-[#291A3D] text-gray-300 border-transparent hover:bg-[#34224D]"
                }`}
              >
                🎙️ صوت رجالي (حامد)
              </button>
              <button
                type="button"
                onClick={() => setVoiceChoice("female")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  voiceChoice === "female"
                    ? "bg-[#56138A] text-white border-[#F5D47A]"
                    : "bg-[#291A3D] text-gray-300 border-transparent hover:bg-[#34224D]"
                }`}
              >
                🎙️ صوت نسائي (زارية)
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Generate & Export Video Button */}
            <button
              onClick={startRecordingAndExport}
              disabled={isRecording}
              className="w-full py-4 px-6 rounded-2xl font-black text-base text-white bg-gradient-to-r from-[#C99726] via-[#E5B544] to-[#C99726] hover:brightness-110 shadow-[0_10px_30px_rgba(201,151,38,0.35)] transition-all flex items-center justify-center gap-2.5 text-black disabled:opacity-50 transform active:scale-98"
            >
              <Video className="w-5 h-5 text-black" />
              <span>{isRecording ? "جارٍ تسجيل وتصدير الفيديو..." : "🎬 توليد وتحميل الفيديو (MP4 / WebM)"}</span>
            </button>

            {/* Preview Button */}
            <div className="grid grid-cols-2 gap-3">
              {!isPlaying ? (
                <button
                  onClick={startPlaying}
                  disabled={isRecording}
                  className="py-3 px-4 rounded-xl font-bold text-sm bg-[#56138A] hover:bg-[#6D1B9C] text-white flex items-center justify-center gap-2 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>معاينة وتشغيل</span>
                </button>
              ) : (
                <button
                  onClick={stopPlaying}
                  className="py-3 px-4 rounded-xl font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2 transition-all"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  <span>إيقاف مؤقت</span>
                </button>
              )}

              <button
                onClick={() => {
                  stopPlaying();
                  if (audioRef.current) audioRef.current.currentTime = 0;
                  drawFrame(0, 26);
                  setProgress(0);
                }}
                className="py-3 px-4 rounded-xl font-bold text-sm bg-[#291A3D] hover:bg-[#3A2557] text-gray-300 flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة للبداية</span>
              </button>
            </div>
          </div>

          {/* Download Link if already recorded */}
          {recordedVideoUrl && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-600 flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>الملف جاهز للتحميل مجدداً</span>
                </p>
                <p className="text-xs text-gray-300 mt-0.5">جاهز للنشر على TikTok / Snap / Reels</p>
              </div>
              <a
                href={recordedVideoUrl}
                download="rowad_promo_ad.mp4"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>تنزيل</span>
              </a>
            </div>
          )}

          {/* Specifications Pill */}
          <div className="p-4 rounded-2xl bg-[#1C122B] border border-[#3E295E] text-xs text-gray-400 space-y-2">
            <p className="font-bold text-[#F5D47A]">مواصفات الفيديو المولد:</p>
            <p>• المقاس: <strong>1080x1920 (عمودي 9:16)</strong> مخصص لتيك توك، ريلز، وسناب شات.</p>
            <p>• التعليق الصوتي: فويس أوفر سعودي احترافي ذكاء اصطناعي (Neural Audio).</p>
            <p>• المحتوى البصري: نماذج أعمال حقيقية (مياه المدينة، مياه أحد، عيادات الفارابي، دار زيد) + شارة السعر 399 ريال + زر واتساب متفاعل.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
