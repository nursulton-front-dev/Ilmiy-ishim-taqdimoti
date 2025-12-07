import { useCallback, useEffect, useMemo, useState } from 'react';
import Slide from './components/Slide';
import './App.css';

const SLIDE_DURATION = 17000;

const slides = [
  {
    title: 'Axborotning aniqligi va ishonchliligi',
    subtitle: 'Yolg‘on ma’lumotlarni aniqlash',
    // TODO: Rasm qo'shish uchun shu faylni yuklang: /src/assets/slides/intro.jpg
    image: null,
    imageNote: 'src/assets/slides/intro.jpg — mavzuga mos yuqori sifatli vizual',
    palette: ['#7F7FD5', '#86A8E7', '#91EAE4'],
  },
  {
    title: 'Kirish',
    points: [
      'Raqamli davrda axborot oqimi keskin ortdi',
      'Axborotning aniqligi va ishonchliligini tekshirish muhim',
      'Yolg‘on ma’lumotlar jamiyat fikriga ta’sir qiladi',
    ],
    // TODO: Rasm qo'shish uchun shu faylni yuklang: /src/assets/slides/digital.jpg
    image: null,
    imageNote: 'src/assets/slides/digital.jpg — raqamli oqimni aks ettiruvchi surat',
    palette: ['#1B1A55', '#3A3C7A', '#7EA0FF'],
  },
  {
    title: 'Asosiy tushunchalar',
    points: [
      'Axborot aniqligi — faktlarning haqiqatga mosligi',
      'Ishonchlilik — manba va muallifga bo‘lgan ishonch',
      'Feyk — noto‘g‘ri yoki buzilgan axborot',
    ],
    // TODO: Rasm qo'shish uchun shu faylni yuklang: /src/assets/slides/concepts.jpg
    image: null,
    imageNote: 'src/assets/slides/concepts.jpg — terminlarga mos infografika',
    palette: ['#0F2027', '#203A43', '#2C5364'],
  },
  {
    title: 'Yolg‘on ma’lumotlar qanday tarqaladi?',
    points: [
      'Ijtimoiy tarmoqlar orqali',
      'Montaj qilingan rasm va videolar',
      'Manbasi ko‘rsatilmagan sarlavhalar',
    ],
    // TODO: Rasm qo'shish uchun shu faylni yuklang: /src/assets/slides/fake-news.jpg
    image: null,
    imageNote: 'src/assets/slides/fake-news.jpg — yolg‘on xabarlar tarqalishini ko‘rsatadigan vizual',
    palette: ['#4B134F', '#2F1B41', '#E14C79'],
  },
  {
    title: 'Yolg‘on axborotni aniqlash mezonlari',
    points: [
      'Manbani tekshirish',
      'Sana va kontekstni aniqlash',
      '2–3 ishonchli manbadan tasdiq olish',
      'Hissiyotga yo‘naltirilgan sarlavhalar — shubhali',
    ],
    // TODO: Rasm qo'shish uchun shu faylni yuklang: /src/assets/slides/check.jpg
    image: null,
    imageNote: 'src/assets/slides/check.jpg — tekshiruv jarayonini ifodalovchi rasm',
    palette: ['#00416A', '#E4E5E6', '#00B4DB'],
  },
  {
    title: 'Xulosa',
    points: [
      'Axborotni tekshirish — zamonaviy ko‘nikma',
      'Media savodxonlik feyklardan himoya qiladi',
      'Har bir foydalanuvchi axborotni tanqidiy baholashi kerak',
    ],
    // TODO: Rasm qo'shish uchun shu faylni yuklang: /src/assets/slides/end.jpg
    image: null,
    imageNote: 'src/assets/slides/end.jpg — optimistik yakuniy kadr',
    palette: ['#232526', '#414345', '#7B4397'],
  },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const totalSlides = slides.length;

  const gradients = useMemo(
    () => slides.map((slide) => slide.palette || ['#0f172a', '#111827', '#1f2937']),
    [],
  );

  const handlePrevious = useCallback(() => {
    setAutoPlay(false);
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setAutoPlay(false);
    setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
  }, [totalSlides]);

  const handleRestart = useCallback(() => {
    setCurrentSlide(0);
    setAutoPlay(true);
  }, []);

  useEffect(() => {
    if (!autoPlay || currentSlide === totalSlides - 1) return undefined;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentSlide, autoPlay, totalSlides]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      }
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleNext, handlePrevious]);

  const slide = slides[currentSlide];
  const gradient = gradients[currentSlide];

  return (
    <div className="app-shell">
      <div className="aurora" aria-hidden="true" />
      <div className="app-header">
        <div>
          <p className="eyebrow">Axborot xavfsizligi prezentatsiyasi</p>
          <h1 className="brand">Axborotning aniqligi va ishonchliligi</h1>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
          <span className="progress-label">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>

      <div className="stage">
        <Slide
          key={currentSlide}
          title={slide.title}
          subtitle={slide.subtitle}
          points={slide.points}
          image={slide.image}
          imageNote={slide.imageNote}
          palette={gradient}
        />
      </div>

      <div className="controls">
        <button type="button" onClick={handlePrevious} disabled={currentSlide === 0}>
          Oldingi
        </button>
        <div className="transport">
          <button type="button" onClick={handleRestart} className="ghost">
            Qayta boshlash
          </button>
          <button type="button" onClick={() => setAutoPlay((prev) => !prev)} className="ghost">
            {autoPlay ? 'Avto-slayd: ON' : 'Avto-slayd: OFF'}
          </button>
        </div>
        <button type="button" onClick={handleNext} disabled={currentSlide === totalSlides - 1}>
          Keyingi
        </button>
      </div>
    </div>
  );
}
