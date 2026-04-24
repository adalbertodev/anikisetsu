import { Children, type ReactNode, useId } from "react";
import { useCarousel } from "../../hooks";

interface CarouselProps {
  label: string;
  children: ReactNode;
  intervalMs?: number;
  autoplay?: boolean;
}

export const Carousel = ({
  label,
  children,
  intervalMs,
  autoplay,
}: CarouselProps) => {
  const slides = Children.toArray(children);

  const { activeIndex, goTo, goNext, goPrevious, pause, resume } = useCarousel({
    slideCount: slides.length,
    intervalMs,
    autoplay,
  });
  const baseId = useId();

  if (slides.length === 0) return null;

  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <ul className="carousel__track" aria-live="polite">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              key={index}
              id={`${baseId}-slide-${index}`}
              className="carousel__slide"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${slides.length}`}
              aria-hidden={!isActive}
              inert={!isActive}
              data-active={isActive || undefined}
            >
              {slide}
            </li>
          );
        })}
      </ul>

      <div className="carousel__controls">
        <button
          type="button"
          className="carousel__control state-layer"
          onClick={goPrevious}
          aria-label="Slide anterior"
        >
          <span aria-hidden="true">{"<"}</span>
        </button>

        <ol
          className="carousel__dots"
          role="tablist"
          aria-label="Seleccionar slide"
        >
          {slides.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={index} role="presentation">
                <button
                  type="button"
                  className="carousel__dot"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${baseId}-slide-${index}`}
                  aria-label={`Ir a slide ${index + 1}`}
                  tabIndex={isActive ? 0 : -1}
                  data-active={isActive || undefined}
                  onClick={() => goTo(index)}
                />
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          className="carousel__control state-layer"
          onClick={goNext}
          aria-label="Slide siguiente"
        >
          <span aria-hidden="true">{">"}</span>
        </button>
      </div>
    </section>
  );
};
