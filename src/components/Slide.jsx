import './Slide.css';

export default function Slide({ title, subtitle, points = [], image, imageNote, palette = [] }) {
  const hasImage = Boolean(image);

  return (
    <div
      className="slide-card fade-in"
      style={{
        '--accent-start': palette[0] || '#0f172a',
        '--accent-mid': palette[1] || '#111827',
        '--accent-end': palette[2] || '#1f2937',
      }}
    >
      <div className="media-frame">
        {hasImage ? (
          <img src={image} alt={title} className="hero" />
        ) : (
          <div className="hero placeholder">
            <span>Rasmni shu manzilga qo'shing:</span>
            <code className="path">{imageNote}</code>
          </div>
        )}
        <div className="media-overlay" />
        {imageNote && <div className="image-note">{imageNote}</div>}
      </div>
      <div className="slide-content">
        <p className="eyebrow compact">Yolg‘on ma’lumotlarni aniqlash</p>
        <h2 className="slide-title">{title}</h2>
        {subtitle && <p className="subtitle">{subtitle}</p>}
        {points.length > 0 && (
          <ul className="points">
            {points.map((point, index) => (
              <li key={point} style={{ animationDelay: `${0.15 * index + 0.25}s` }}>
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
