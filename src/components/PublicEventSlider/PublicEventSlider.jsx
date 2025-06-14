import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import PublicEventCard from "../PublicEventCard/PublicEventCard";
import styles from "./PublicEventSlider.module.css";

const autoplay = Autoplay({ delay: 3000, stopOnInteraction: false });

export default function PublicEventSlider({ events }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 480;
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      speed: 10,
      align: "start",
      skipSnaps: false,
    },
    isMobile ? [] : [autoplay]
  );

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {events.map((event) => (
            <div className={styles.embla__slide} key={event.id}>
              <PublicEventCard {...event} />
            </div>
          ))}
        </div>
      </div>
      <Link to="/events/public" className={styles.a}>
        Browse Events
      </Link>
    </div>
  );
}
