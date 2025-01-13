import React, { useEffect, useRef, useState } from "react";
import "./MainPage.css";
import Footer from "../../components/footer/Footer";

const MainPage: React.FC = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (entry.isIntersecting) {
          target.classList.add("visible");
        } else {
          target.classList.remove("visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (section1Ref.current) {
      observer.observe(section1Ref.current.querySelector("h1")!);
    }

    if (section2Ref.current) {
      observer.observe(section2Ref.current.querySelector("button")!);
    }

    if (section3Ref.current) {
      section3Ref.current.querySelectorAll("img").forEach((img) => {
        observer.observe(img);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const sensitivity = 50;

      if (event.deltaY > sensitivity) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        setIsScrollingUp(false);
      } else if (event.deltaY < -sensitivity) {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
        setIsScrollingUp(true);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        setIsScrollingUp(false);
      } else if (event.key === "ArrowUp") {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
        setIsScrollingUp(true);
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      setCurrentIndex(0);
    };

    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    document.body.style.overflow = 'hidden';

    window.scrollTo(0, 0);

    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }

      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.style.transition = 'transform 1s ease-in-out';
      sliderElement.style.transform = `translateY(-${currentIndex * 100}vh)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowFooter(true);
        } else {
          setShowFooter(false);
        }
      });
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    if (section3Ref.current) {
      footerObserver.observe(section3Ref.current);
    }

    return () => {
      footerObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isScrollingUp) {
      setShowFooter(false);
    }
  }, [isScrollingUp]);

  return (
    <div className="slider-container">
      <div className="slider" ref={sliderRef}>
        <div className="slide section-1" ref={section1Ref}>
          <h1 className="slide-up">Akvelon RPG</h1>
          <p>Вау, это круто! Давай заходи!</p>
        </div>
        <div className="slide section-2" ref={section2Ref}>
          <button className="btn">
            <svg width="360px" height="120px" viewBox="0 0 360 120" className="border">
              <polyline points="359,1 359,119 1,119 1,1 359,1" className="bg-line" />
              <polyline points="359,1 359,119 1,119 1,1 359,1" className="hl-line" />
            </svg>
            <span>START GAME</span>
          </button>
          <p>Присоединяйся к нашему сообществу!</p>
        </div>
        <div className="slide section-3" ref={section3Ref}>
          <h1>Погрузись  в пучину анального угнетения вместе с Аквелон</h1>
          <p>Вас ждут кары ножной простаты, ненависть к сусликам, растяжение катаракты пальца и шизофрения подмышки</p>
        </div>
      </div>
      <Footer show={showFooter} />
    </div>
  );
};

export default MainPage;