import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Home, AlertCircle, CheckCircle, 
  Shield, Search, Brain, TrendingUp, Play, Pause, 
  Volume2, VolumeX, RefreshCw, ExternalLink, Zap,
  Users, Globe, Smartphone, BarChart, Clock,
  HelpCircle, ThumbsUp, Award, Target
} from 'lucide-react';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const slides = [
    {
      id: 0,
      title: "Axborot aniqligi va ishonchliligi",
      subtitle: "Raqamli asrning eng muhim muammosi",
      icon: Shield,
      gradient: "from-blue-900 via-indigo-800 to-purple-900",
      duration: 45
    },
    {
      id: 1,
      title: "Muammo: Raqamli haqiqat inqirozi",
      subtitle: "Nima uchun bu global xavf?",
      icon: AlertCircle,
      gradient: "from-red-900 via-rose-800 to-orange-900",
      duration: 50
    },
    {
      id: 2,
      title: "Asosiy tushunchalar",
      subtitle: "Aniqlik vs Ishonchlilik",
      icon: Brain,
      gradient: "from-emerald-900 via-green-800 to-teal-900",
      duration: 55
    },
    {
      id: 3,
      title: "Dezinformatsiya ekotizimi",
      subtitle: "Fake news, Deepfake va manipulyatsiya",
      icon: AlertCircle,
      gradient: "from-amber-900 via-yellow-800 to-red-900",
      duration: 60
    },
    {
      id: 4,
      title: "Tekshirish texnologiyalari",
      subtitle: "CRAAP, SIFT va AI vositalari",
      icon: Search,
      gradient: "from-indigo-900 via-blue-800 to-cyan-900",
      duration: 65
    },
    {
      id: 5,
      title: "Yechimlar strategiyasi",
      subtitle: "Media savodxonlik + Texnologiya + Qonunchilik",
      icon: CheckCircle,
      gradient: "from-purple-900 via-violet-800 to-fuchsia-900",
      duration: 70
    },
    {
      id: 6,
      title: "Interaktiv test",
      subtitle: "Bilimingizni sinab ko'ring",
      icon: Brain,
      gradient: "from-slate-900 via-gray-800 to-zinc-900",
      duration: 120
    }
  ];

  const quizQuestions = [
    {
      question: "CRAAP testidagi 'R' qaysi so'zni anglatadi?",
      options: ["Relevance", "Reliability", "Research", "Rating"],
      correct: 0
    },
    {
      question: "Deepfake texnologiyasi necha foiz o'sdi (2023-2024)?",
      options: ["200%", "500%", "900%", "1200%"],
      correct: 2
    },
    {
      question: "Qaysi biri dezinformatsiya emas?",
      options: ["Fake news", "Satira", "Malinformatsiya", "Deepfake"],
      correct: 1
    },
    {
      question: "SIFT metodidagi 'T' nima uchun turgan?",
      options: ["Trace", "Track", "Test", "Trust"],
      correct: 0
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % slides.length;
      setTimeRemaining(slides[next].duration);
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevSlide = (prev - 1 + slides.length) % slides.length;
      setTimeRemaining(slides[prevSlide].duration);
      return prevSlide;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setTimeRemaining(slides[index].duration);
  };

  const handleQuizAnswer = (optionIndex) => {
    setQuizAnswer(optionIndex);
    
    if (optionIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore(prev => prev + 1);
    }
    
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setQuizAnswer(null);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 1000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setQuizAnswer(null);
    setShowResult(false);
    setShowQuiz(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowRight':
        case ' ':
          nextSlide();
          break;
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'Home':
          goToSlide(0);
          break;
        case 'End':
          goToSlide(slides.length - 1);
          break;
        case 'a':
        case 'A':
          setIsAutoPlay(!isAutoPlay);
          break;
        case 'm':
        case 'M':
          setIsMuted(!isMuted);
          break;
        case 'q':
        case 'Q':
          setShowQuiz(!showQuiz);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAutoPlay, isMuted, showQuiz]);

  useEffect(() => {
    if (isAutoPlay) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            nextSlide();
            return slides[(currentSlide + 1) % slides.length].duration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isAutoPlay, currentSlide]);

  // Добавляем стили анимаций
  const animationStyles = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-up {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
    }
    .animate-fade-in {
      animation: fade-in 0.8s ease-out;
    }
    .animate-slide-up {
      animation: slide-up 0.8s ease-out;
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }
    .slide-enter {
      animation: slide-up 0.5s ease-out;
    }
  `;

  const slideContent = [
    // Slide 0: Bosh sahifa
    <div className="flex flex-col items-center justify-center h-full space-y-12 animate-fade-in">
      <div className="relative">
        <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
        <Shield className="relative w-32 h-32 text-white animate-float" />
      </div>
      
      <div className="text-center space-y-8 max-w-4xl">
        <div className="overflow-hidden">
          <h1 className="text-7xl font-black text-white mb-6 animate-slide-up bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Axborot aniqligi va ishonchliligi
          </h1>
        </div>
        
        <p className="text-3xl text-white/90 animate-slide-up" style={{animationDelay: '0.3s'}}>
          Raqamli asrda haqiqatni qidirish
        </p>
        
        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transform transition-all duration-300 hover:scale-105 hover:border-white/30">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Users className="w-8 h-8 text-blue-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Global muammo</h3>
                <p className="text-white/70 text-sm">Butun dunyo ta'sirida</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transform transition-all duration-300 hover:scale-105 hover:border-white/30">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Smartphone className="w-8 h-8 text-purple-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Texnologiya bilan</h3>
                <p className="text-white/70 text-sm">AI va raqamli vositalar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-2 text-white/80 text-lg animate-fade-in" style={{animationDelay: '0.6s'}}>
        <p><span className="font-bold text-blue-300">Muallif:</span> Maxramov Nursulton</p>
        <p><span className="font-bold text-purple-300">Muassasa:</span> Sergeli tuman innovatsion maktabi</p>
        <p><span className="font-bold text-emerald-300">Sana:</span> {new Date().toLocaleDateString('uz-UZ', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>
    </div>,

    // Slide 1: Muammo
    <div className="flex flex-col h-full p-12 space-y-8">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-red-500/20 rounded-2xl mb-6">
          <AlertCircle className="w-16 h-16 text-red-300 animate-pulse" />
        </div>
        <h2 className="text-5xl font-black text-white mb-4 bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
          RAQAMLI HAQIQAT INQIROZI
        </h2>
        <p className="text-2xl text-white/80">Zamonaviy jamiyatning eng katta xavflaridan biri</p>
      </div>
      
      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-red-500/30">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-white">📊 STATISTIKA XAVFI</h3>
            <BarChart className="w-10 h-10 text-red-300" />
          </div>
          
          <div className="space-y-6">
            {[
              {label: "Har kuni soxta yangiliklar", value: "4.5M+", color: "from-red-500 to-orange-500", width: 100},
              {label: "Ijtimoiy tarmoqlarda noto'g'ri ma'lumot", value: "67%", color: "from-orange-500 to-yellow-500", width: 67},
              {label: "Deepfake o'sishi (2023-2024)", value: "900%", color: "from-yellow-500 to-red-500", width: 90},
              {label: "Tekshirmay tarqatuvchilar", value: "85%", color: "from-red-600 to-pink-600", width: 85}
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex justify-between items-center">
                  <span className="text-white/90 text-lg">{item.label}</span>
                  <span className="text-2xl font-bold text-red-300">{item.value}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${item.color} rounded-full ${idx === 2 ? 'animate-pulse' : ''}`} 
                       style={{width: `${item.width}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-rose-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-rose-500/30 h-[65%]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-white">⚠️ OG'IR OQIBATLAR</h3>
              <AlertCircle className="w-10 h-10 text-rose-300" />
            </div>
            
            <div className="space-y-4">
              {[
                "Jamiyatda ishonchning pasayishi",
                "Siyosiy manipulyatsiya va saylovlarda aralashuv",
                "Iqtisodiy zarar: yillik $78 milliard",
                "Xavfsizlik xavfi va terrorizm",
                "Shaxsiy obro'ga putur yetkazish",
                "Sog'liq xavfi: noto'g'ri tibbiy maslahatlar"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 group">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-lg group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-600/30 to-orange-600/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-red-500/50">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white text-xl font-bold">
                  Butunjahon Iqtisodiy Forum: "Dezinformatsiya - zamonaviy jamiyat uchun eng katta xavf!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 2: Tushunchalar
    <div className="flex flex-col h-full p-12 space-y-8">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl mb-6">
          <Brain className="w-16 h-16 text-emerald-300 animate-pulse" />
        </div>
        <h2 className="text-5xl font-black text-white mb-4">
          <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
            ASOSIY TUSHUNCHALAR
          </span>
        </h2>
        <p className="text-2xl text-white/80">Aniqlik va ishonchlilik - sifatli axborotning ikkita ustuni</p>
      </div>

      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="group relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl rounded-3xl"></div>
          <div className="relative bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-400/50 h-full">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl mb-4">
                <span className="text-5xl">🎯</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">ANIQLIK</h3>
              <p className="text-xl text-blue-300 italic">(Accuracy)</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-5">
                <p className="text-white font-bold text-lg mb-2">📖 Ta'rif:</p>
                <p className="text-white/90">
                  Axborotning haqiqiy voqelik yoki faktlarga qanchalik to'g'ri mos kelish darajasi
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl p-5">
                <p className="text-white font-bold text-lg mb-3">📊 Mezonlar:</p>
                <div className="space-y-3">
                  {["Faktlar to'g'riligi va aniqligi", "Raqamlar va statistikalar aniqligi", 
                    "Kontekst to'liqligi va izchilligi", "Xatolardan xoli bo'lish"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-2xl rounded-3xl"></div>
          <div className="relative bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-emerald-400/50 h-full">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-2xl mb-4">
                <span className="text-5xl">🛡️</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">ISHONCHLILIK</h3>
              <p className="text-xl text-emerald-300 italic">(Reliability)</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-5">
                <p className="text-white font-bold text-lg mb-2">📖 Ta'rif:</p>
                <p className="text-white/90">
                  Axborot manbaning ishonchlilik darajasi va ma'lumotlarning tasdiqlanganlik sifati
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl p-5">
                <p className="text-white font-bold text-lg mb-3">📊 Mezonlar:</p>
                <div className="space-y-3">
                  {["Manba obro'si va nufuzi", "Muallifning malakasi va tajribasi", 
                    "Tasdiqlangan dalillar va manbalar", "Tanqidiy sharhlar va peer-review"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 via-emerald-600/20 to-teal-600/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20">
        <div className="flex items-center justify-center space-x-4">
          <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
          <p className="text-white text-2xl font-bold">
            <span className="text-blue-300">Aniqlik</span> + <span className="text-emerald-300">Ishonchlilik</span> = <span className="text-yellow-300">SIFATLI AXBOROT</span>
          </p>
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
      </div>
    </div>,

    // Slide 3: Dezinformatsiya turlari
    <div className="flex flex-col h-full p-12 space-y-8">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-2xl mb-6">
          <AlertCircle className="w-16 h-16 text-amber-300 animate-pulse" />
        </div>
        <h2 className="text-5xl font-black text-white mb-4">
          <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-red-300 bg-clip-text text-transparent">
            DEZINFORMATSIYA EKOTIZIMI
          </span>
        </h2>
        <p className="text-2xl text-white/80">Noto'g'ri axborotning 4 asosiy turi va ularning xavflari</p>
      </div>

      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: "Dezinformatsiya", emoji: "🎭", color: "from-red-600/30 to-rose-600/30", border: "border-red-500/50", danger: "High" },
            { title: "Misinformatsiya", emoji: "❓", color: "from-orange-600/30 to-amber-600/30", border: "border-orange-500/50", danger: "Medium" },
            { title: "Malinformatsiya", emoji: "⚠️", color: "from-yellow-600/30 to-lime-600/30", border: "border-yellow-500/50", danger: "High" },
            { title: "Deepfake", emoji: "🤖", color: "from-purple-600/30 to-pink-600/30", border: "border-purple-500/50", danger: "Critical" }
          ].map((type, idx) => (
            <div key={idx} className="group relative">
              <div className={`relative bg-gradient-to-br ${type.color} backdrop-blur-xl rounded-2xl p-6 border-2 ${type.border} h-full`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{type.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{type.title}</h3>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${
                        type.danger === 'Critical' ? 'bg-red-500/30 text-red-200' :
                        type.danger === 'High' ? 'bg-orange-500/30 text-orange-200' :
                        'bg-yellow-500/30 text-yellow-200'
                      }`}>
                        {type.danger} XAVF
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-lg p-3 mt-4">
                  <p className="text-white/80 text-xs">
                    {idx === 0 && "Ataylab yaratilgan noto'g'ri ma'lumot"}
                    {idx === 1 && "Beixtiyor tarqatiladigan noto'g'ri ma'lumot"}
                    {idx === 2 && "Haqiqiy, lekin zarar maqsadida tarqatilgan"}
                    {idx === 3 && "AI yordamida yaratilgan soxta video/audio"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-gray-900/50 to-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 h-[70%]">
            <h3 className="text-3xl font-bold text-white mb-6">📈 Tarqalish dinamikasi</h3>
            
            <div className="space-y-6">
              {[
                {label: "Dezinformatsiya", value: 85, color: "bg-gradient-to-r from-red-500 to-rose-500" },
                {label: "Misinformatsiya", value: 65, color: "bg-gradient-to-r from-orange-500 to-amber-500" },
                {label: "Malinformatsiya", value: 45, color: "bg-gradient-to-r from-yellow-500 to-lime-500" },
                {label: "Deepfake", value: 90, color: "bg-gradient-to-r from-purple-500 to-pink-500" }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/90">{item.label}</span>
                    <span className="text-white font-bold">{item.value}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-600/30 to-orange-600/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-red-500/50">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-8 h-8 text-red-300 animate-pulse" />
              <p className="text-white text-lg font-bold">
                ⚡ Deepfake texnologiyalari 2024-yilga kelib 900% o'sdi!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 4: Tekshirish usullari
    <div className="flex flex-col h-full p-12 space-y-8">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl mb-6">
          <Search className="w-16 h-16 text-blue-300 animate-pulse" />
        </div>
        <h2 className="text-5xl font-black text-white mb-4">
          <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            TEKSHIRISH TEXNOLOGIYALARI
          </span>
        </h2>
        <p className="text-2xl text-white/80">Zamonaviy metodlar va AI vositalari</p>
      </div>

      <div className="grid grid-cols-3 gap-8 flex-1">
        <div className="col-span-2 space-y-8">
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-400/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-white">CRAAP TESTI</h3>
              <div className="px-4 py-2 bg-blue-500/30 rounded-full">
                <span className="text-white font-bold">5 Mezon</span>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              {[
                {letter: "C", word: "Currency", desc: "Dolzarblik"},
                {letter: "R", word: "Relevance", desc: "Tegishlilik"},
                {letter: "A", word: "Authority", desc: "Vakolatlilik"},
                {letter: "A", word: "Accuracy", desc: "Aniqlik"},
                {letter: "P", word: "Purpose", desc: "Maqsad"}
              ].map((item, idx) => (
                <div key={idx} className="group bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl p-6 border-2 border-white/10 transform transition-all duration-300 hover:scale-105 hover:border-white/30">
                  <div className="text-center">
                    <div className="text-4xl font-black text-white mb-2">{item.letter}</div>
                    <h4 className="text-lg font-bold text-white">{item.word}</h4>
                    <p className="text-white/70 text-sm mt-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/40 to-teal-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-green-400/50">
            <h3 className="text-3xl font-bold text-white mb-8">SIFT METODI</h3>
            
            <div className="grid grid-cols-4 gap-6">
              {[
                {num: "1️⃣", title: "Stop", desc: "To'xtang va tekshiring"},
                {num: "2️⃣", title: "Investigate", desc: "Manbani o'rganing"},
                {num: "3️⃣", title: "Find", desc: "Boshqa manbalarni toping"},
                {num: "4️⃣", title: "Trace", desc: "Asl manbaga kuzating"}
              ].map((step, idx) => (
                <div key={idx} className="bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-2xl p-6 border-2 border-green-500/30 transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl mb-4">{step.num}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-white/80 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-400/50">
            <h3 className="text-3xl font-bold text-white mb-6">🤖 AI VOSITALARI</h3>
            
            <div className="space-y-4">
              {[
                {name: "Deepfake detektorlari", examples: "Microsoft Video Authenticator, Sensity AI"},
                {name: "Matn tahlili", examples: "GPTZero, Originality.ai"},
                {name: "Tasvir tekshirish", examples: "Google Reverse Image, TinEye"},
                {name: "Fact-checking", examples: "Snopes.com, FactCheck.org"}
              ].map((tool, idx) => (
                <div key={idx} className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-purple-500/30">
                  <h4 className="text-white font-bold text-base mb-1">{tool.name}:</h4>
                  <p className="text-white/80 text-sm">{tool.examples}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-cyan-400/50">
            <h3 className="text-2xl font-bold text-white mb-4">⚡ Tezkor tekshirish</h3>
            <div className="space-y-3 text-white/90">
              {[
                "Manbani google qidiring",
                "Muallifni tekshiring",
                "Boshqa manbalarda qidiring",
                "Sana va joyni tekshiring",
                "Rasmlarni teskariga qidiring"
              ].map((tip, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 5: Yechimlar
    <div className="flex flex-col h-full p-12 space-y-8">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-2xl mb-6">
          <CheckCircle className="w-16 h-16 text-purple-300 animate-bounce" />
        </div>
        <h2 className="text-5xl font-black text-white mb-4">
          <span className="bg-gradient-to-r from-purple-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            YECHIMLAR STRATEGIYASI
          </span>
        </h2>
        <p className="text-2xl text-white/80">Ko'p qirrali yondashuv zarur</p>
      </div>

      <div className="grid grid-cols-3 gap-8 flex-1">
        <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-emerald-400/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-emerald-500/30 rounded-xl">
              <Users className="w-8 h-8 text-emerald-300" />
            </div>
            <h3 className="text-2xl font-bold text-white">🎓 Media savodxonlik</h3>
          </div>
          
          <div className="space-y-4 text-white/90">
            {[
              "Kritik fikrlash ko'nikmalarini rivojlantirish",
              "Manbalarni baholashni o'rganish",
              "Kontekstni to'liq tushunish",
              "Raqamli vositalardan to'g'ri foydalanish",
              "Mas'uliyat bilan ma'lumot tarqatish"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 group">
                <Award className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="group-hover:text-white transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-400/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-500/30 rounded-xl">
              <Smartphone className="w-8 h-8 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold text-white">🤖 Texnologik yechimlar</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white font-bold text-base mb-1">AI asosidagi detektorlar:</p>
              <p className="text-white/80 text-sm">Deepfake aniqlash, matn analizi</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white font-bold text-base mb-1">Blokcheyn texnologiyasi:</p>
              <p className="text-white/80 text-sm">Manba autentifikatsiyasi</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white font-bold text-base mb-1">Real-vaqt monitoringi:</p>
              <p className="text-white/80 text-sm">Dezinformatsiya tarqalishini kuzatish</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-violet-400/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-violet-500/30 rounded-xl">
              <Globe className="w-8 h-8 text-violet-300" />
            </div>
            <h3 className="text-2xl font-bold text-white">🏛️ Qonunchilik</h3>
          </div>
          
          <div className="space-y-4 text-white/90">
            {[
              "Dezinformatsiyaga qarshi qonunlar",
              "Platformalarning javobgarligi",
              "Xalqaro hamkorlik",
              "Jamoatchilik nazorati",
              "Ochiqlik va shaffoflik"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 group">
                <Target className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                <span className="group-hover:text-white transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/50">
          <h4 className="text-white font-bold text-lg mb-3">👤 Har bir shaxs:</h4>
          <p className="text-white/90 text-sm">Ma'lumotlarni tekshirish, tangidiy fikrlash, mas'uliyatli tarqatish</p>
        </div>
        <div className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/50">
          <h4 className="text-white font-bold text-lg mb-3">🏫 Ta'lim muassasalari:</h4>
          <p className="text-white/90 text-sm">Media savodxonlik kurslari, amaliy mashg'ulotlar</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/50">
          <h4 className="text-white font-bold text-lg mb-3">📱 Texnologiya kompaniyalari:</h4>
          <p className="text-white/90 text-sm">AI detektorlarini rivojlantirish, kontent moderatsiyasi</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600/30 to-green-600/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-emerald-400/50">
        <div className="flex items-center justify-center space-x-4">
          <Zap className="w-10 h-10 text-yellow-400 animate-pulse" />
          <p className="text-white text-2xl font-bold text-center">
            Kompleks yondashuv: Ta'lim + Texnologiya + Qonunchilik = <br/>
            <span className="text-yellow-300">XAVFSIZ AXBOROT MUHITI</span>
          </p>
        </div>
      </div>
    </div>,

    // Slide 6: Interaktiv test
    <div className="flex flex-col h-full p-12 space-y-8">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-r from-slate-500/20 to-gray-500/20 rounded-2xl mb-6">
          <Brain className="w-16 h-16 text-gray-300 animate-pulse" />
        </div>
        <h2 className="text-5xl font-black text-white mb-4">
          <span className="bg-gradient-to-r from-gray-300 via-slate-300 to-zinc-300 bg-clip-text text-transparent">
            INTERAKTIV TEST
          </span>
        </h2>
        <p className="text-2xl text-white/80">Bilimingizni sinab ko'ring!</p>
      </div>

      {!showQuiz ? (
        <div className="flex flex-col items-center justify-center flex-1 space-y-12">
          <div className="text-center max-w-2xl">
            <p className="text-white text-2xl mb-8">
              Axborot aniqligi va ishonchliligi haqidagi bilimingizni 
              {quizQuestions.length} ta savol orqali sinab ko'ring
            </p>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-400/50">
                <div className="text-center">
                  <div className="text-4xl font-black text-white mb-2">{quizQuestions.length}</div>
                  <p className="text-white/80">Savollar</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border-2 border-emerald-400/50">
                <div className="text-center">
                  <div className="text-4xl font-black text-white mb-2">60</div>
                  <p className="text-white/80">Soniyalar</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-400/50">
                <div className="text-center">
                  <div className="text-4xl font-black text-white mb-2">100</div>
                  <p className="text-white/80">Maksimal ball</p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowQuiz(true)}
            className="px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl text-white text-2xl font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30"
          >
            <div className="flex items-center space-x-4">
              <Play className="w-8 h-8" />
              <span>Testni boshlash</span>
            </div>
          </button>
        </div>
      ) : !showResult ? (
        <div className="flex flex-col items-center justify-center flex-1 space-y-12">
          <div className="w-full max-w-4xl bg-gradient-to-br from-slate-900/40 to-gray-900/40 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/20">
            <div className="flex justify-between items-center mb-12">
              <div className="text-white text-lg">
                Savol: <span className="font-bold">{currentQuestion + 1}/{quizQuestions.length}</span>
              </div>
              <div className="text-white text-lg">
                Ball: <span className="font-bold">{quizScore * 25}</span>/100
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-12 text-center">
              {quizQuestions[currentQuestion].question}
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {quizQuestions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(idx)}
                  disabled={quizAnswer !== null}
                  className={`p-6 rounded-2xl text-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    quizAnswer === null
                      ? 'bg-gradient-to-r from-blue-600/30 to-indigo-600/30 hover:from-blue-500/40 hover:to-indigo-500/40 text-white'
                      : idx === quizQuestions[currentQuestion].correct
                      ? 'bg-gradient-to-r from-emerald-500/40 to-green-500/40 text-white border-2 border-emerald-400'
                      : quizAnswer === idx
                      ? 'bg-gradient-to-r from-red-500/40 to-rose-500/40 text-white border-2 border-red-400'
                      : 'bg-gradient-to-r from-gray-700/30 to-slate-700/30 text-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {quizAnswer !== null && idx === quizQuestions[currentQuestion].correct && (
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    )}
                    {quizAnswer === idx && idx !== quizQuestions[currentQuestion].correct && (
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 space-y-12">
          <div className="w-full max-w-4xl bg-gradient-to-br from-slate-900/40 to-gray-900/40 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/20">
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl mb-6">
                <Award className="w-16 h-16 text-emerald-300" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">Test natijalari</h3>
              <p className="text-white/80 text-xl">
                Siz {quizQuestions.length} ta savoldan {quizScore} tasiga to'g'ri javob berdingiz
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-xl rounded-2xl p-8 border-2 border-blue-400/50">
                <div className="text-center">
                  <div className="text-5xl font-black text-white mb-2">{quizScore}/{quizQuestions.length}</div>
                  <p className="text-white/80">To'g'ri javoblar</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-8 border-2 border-emerald-400/50">
                <div className="text-center">
                  <div className="text-5xl font-black text-white mb-2">{quizScore * 25}</div>
                  <p className="text-white/80">Ball</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-400/50">
                <div className="text-center">
                  <div className="text-5xl font-black text-white mb-2">
                    {Math.round((quizScore / quizQuestions.length) * 100)}%
                  </div>
                  <p className="text-white/80">Foiz</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className={`inline-block px-8 py-4 rounded-2xl text-2xl font-bold mb-8 ${
                quizScore === quizQuestions.length
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                  : quizScore >= quizQuestions.length / 2
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
                  : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
              }`}>
                {quizScore === quizQuestions.length ? 'A' :
                 quizScore >= quizQuestions.length - 1 ? 'B' :
                 quizScore >= quizQuestions.length - 2 ? 'C' : 'D'} baho
              </div>
              
              <p className="text-white/90 text-xl mb-8">
                {quizScore === quizQuestions.length 
                  ? "Ajoyib! Siz axborot aniqligi va ishonchliligi haqida mukammal bilimga egasiz! 🎉"
                  : quizScore >= quizQuestions.length / 2
                  ? "Yaxshi! Sizda yaxshi bilim bor, lekin yana o'rganishga joy bor 👍"
                  : "O'rganishda davom eting! Media savodxonlik muhim ko'nikma 💪"
                }
              </p>
              
              <div className="flex justify-center space-x-6">
                <button
                  onClick={resetQuiz}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-2xl text-white text-xl font-bold transform transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <RefreshCw className="w-6 h-6" />
                    <span>Qayta boshlash</span>
                  </div>
                </button>
                
                <button
                  onClick={() => goToSlide(0)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl text-white text-xl font-bold transform transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <Home className="w-6 h-6" />
                    <span>Bosh sahifa</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ];

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
      {/* Визуальный тест: если Tailwind работает, этот баннер будет красным и стилизованным */}
      <div id="tailwind-debug" className="fixed top-3 left-3 z-50 text-lg text-red-500 bg-white/5 px-3 py-1 rounded-lg">
        Tailwind test
      </div>
      <style>{animationStyles}</style>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-white/10 rounded-xl">
              <CurrentIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{slides[currentSlide].title}</h3>
              <p className="text-white/70 text-sm">{slides[currentSlide].subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-white/70" />
              <span className="text-white/90 font-mono text-lg">{timeRemaining}s</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                title={isAutoPlay ? "Avtomatik ijroni to'xtatish" : "Avtomatik ijro"}
              >
                {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => goToSlide(0)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                title="Bosh sahifa"
              >
                <Home className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-white/80 font-mono bg-white/10 px-4 py-2 rounded-lg">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isAutoPlay && (
        <div className="absolute top-16 left-0 right-0 z-40">
          <div className="h-1 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000"
              style={{
                width: `${(timeRemaining / slides[currentSlide].duration) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`w-full h-full pt-24 pb-36 bg-gradient-to-br ${slides[currentSlide].gradient}`}>
        <div className="w-full h-full px-12 overflow-auto">
          <div className="slide-enter">
            {slideContent[currentSlide]}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-t border-white/10 z-50">
        <div className="flex items-center justify-between px-8 py-6">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-3 px-8 py-4 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-white transition-all transform hover:scale-105 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            <span className="text-lg font-medium">Oldingi</span>
          </button>

          <div className="flex space-x-3">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 transform hover:scale-110 ${
                  currentSlide === idx
                    ? 'w-12 h-3 bg-white rounded-full'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/60 rounded-full'
                }`}
                title={slide.title}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-3 px-8 py-4 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-white transition-all transform hover:scale-105 group"
          >
            <span className="text-lg font-medium">Keyingi</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="absolute bottom-36 left-8 flex flex-col space-y-3">
        {slides.map((slide, idx) => {
          const Icon = slide.icon;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                currentSlide === idx
                  ? 'bg-white/20 backdrop-blur-lg shadow-lg'
                  : 'bg-white/10 hover:bg-white/15'
              }`}
              title={slide.title}
            >
              <Icon className={`w-5 h-5 ${currentSlide === idx ? 'text-white' : 'text-white/60'}`} />
              {currentSlide === idx && (
                <span className="text-white text-sm font-medium whitespace-nowrap">
                  {slide.title.substring(0, 20)}...
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quiz Button */}
      <button
        onClick={() => {
          goToSlide(6);
          setShowQuiz(true);
        }}
        className="absolute bottom-36 right-8 flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl text-white font-bold transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30"
      >
        <Brain className="w-6 h-6" />
        <span>Test</span>
      </button>

      {/* Keyboard Shortcuts Help */}
      <div className="absolute top-24 right-8 bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 w-64 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h4 className="text-white font-bold mb-3">🏃‍♂️ Tez yurish tugmalari:</h4>
        <div className="space-y-2 text-sm text-white/80">
          <div className="flex justify-between">
            <span>← / →</span>
            <span>Slaydlarni almashtirish</span>
          </div>
          <div className="flex justify-between">
            <span>Space</span>
            <span>Keyingi slayd</span>
          </div>
          <div className="flex justify-between">
            <span>A</span>
            <span>Avtomatik ijro</span>
          </div>
          <div className="flex justify-between">
            <span>M</span>
            <span>Ovozni o'chirish/yoqish</span>
          </div>
          <div className="flex justify-between">
            <span>Q</span>
            <span>Testni boshlash</span>
          </div>
          <div className="flex justify-between">
            <span>Home/End</span>
            <span>Bosh/oxirgi slayd</span>
          </div>
        </div>
      </div>

      {/* Timer Display */}
      {isAutoPlay && (
        <div className="absolute top-24 left-8 bg-black/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-white/70" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-mono">{timeRemaining}</div>
              <div className="text-xs text-white/50">sekund qoldi</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}