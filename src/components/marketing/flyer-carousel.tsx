import styles from "./flyer-carousel.module.css";

const flyers = [
  { file: "rinaldis", name: "Rinaldi’s Pizza" },
  { file: "boston-bay", name: "Boston Bay Pizza" },
  { file: "husky", name: "Husky Pizza" },
  { file: "palace", name: "Palace Pizza" },
  { file: "golden", name: "Golden Pizza" },
];

export function FlyerCarousel() {
  return (
    <div className={styles.scene} role="img" aria-label="Five restaurant flyer designs displayed in a hand-held print mockup, changing automatically">
      <img className={styles.background} src="/images/flyers/held-blank.webp" alt="" loading="lazy" />
      <div className={styles.paper} aria-hidden="true">
        {flyers.map((flyer, index) => (
          <img key={flyer.file} className={styles.flyer} src={`/images/flyers/${flyer.file}.webp`} alt="" style={{ animationDelay: `${-index * 5}s` }} loading="lazy" />
        ))}
      </div>
    </div>
  );
}
