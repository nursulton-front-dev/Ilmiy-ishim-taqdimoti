import { useState } from 'react';
import './App.css';

const slides = [
  {
    title: 'Axborotning aniqligi va ishonchliligi',
    content: [
      'Yolg‘on ma’lumotlarni aniqlash',
      'Ilmiy tadqiqot ishi taqdimoti',
    ],
  },
  {
    title: 'Kirish',
    content: [
      'Raqamli davrda axborot oqimi keskin ortdi',
      'Axborotning aniqligi va ishonchliligini tekshirish muhim',
      'Yolg‘on ma’lumotlar jamiyat fikriga salbiy ta’sir ko‘rsatadi',
    ],
  },
  {
    title: 'Asosiy tushunchalar',
    content: [
      'Axborot aniqligi — faktlarning haqiqatga mosligi',
      'Ishonchlilik — manba va muallifga bo‘lgan ishonch darajasi',
      'Feyk — ataylab yoki bilmay tarqatilgan noto‘g‘ri axborot',
    ],
  },
  {
    title: 'Yolg‘on ma’lumotlar qanday tarqaladi?',
    content: [
      'Ijtimoiy tarmoqlardagi tezkor repostlar',
      'Montaj qilingan rasm va videolar',
      'Manbasi ko‘rsatilmagan “shov-shuvli” sarlavhalar',
    ],
  },
  {
    title: 'Yolg‘on ma’lumotni aniqlash mezonlari',
    content: [
      'Manbani tekshirish: muallif, sayt, tashkilot',
      'Sana va kontekstni tekshirish',
      'Kamida 2–3 ishonchli manbadan tasdiq olish',
      'Til va uslub: haddan tashqari hissiyotli sarlavhalar — shubhali',
    ],
  },
  {
    title: 'Xulosa',
    content: [
      'Axborotni tekshirish — zamonaviy ko‘nikma',
      'Media savodxonlik feyklarga uchmaslikka yordam beradi',
      'Har bir foydalanuvchi axborotni tanqidiy baholashi kerak',
    ],
  },
];

function Slide({ title, content }) {
  return (
    <div className="slide-card">
      <h1 className="slide-title">{title}</h1>
      <ul className="slide-points">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  const handlePrevious = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
  };

  return (
    <div className="app">
      <div className="slide-wrapper">
        <Slide title={slides[currentSlide].title} content={slides[currentSlide].content} />
        <div className="controls">
          <button type="button" onClick={handlePrevious} disabled={currentSlide === 0}>
            Oldingi
          </button>
          <div className="counter">
            {currentSlide + 1} / {totalSlides}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentSlide === totalSlides - 1}
          >
            Keyingi
          </button>
        </div>
      </div>
    </div>
  );
}
