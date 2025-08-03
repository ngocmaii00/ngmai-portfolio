import {
  Bot,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Laptop,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface ProjectItemProps {
  project: any;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theta, setTheta] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const totalCards = 6;
  const radius = window.innerWidth <= 768 ? 250 : 400;

  const arrangeCards = (cardRadius: number) => {
    const angle = 360 / totalCards;
    const cards = document.querySelectorAll(".memory-card");
    cards.forEach((card: any, index: number) => {
      const cardAngle = angle * index;
      card.style.transform = `rotateY(${cardAngle}deg) translateZ(${cardRadius}px)`;
    });
  };

  const rotateCarousel = (newTheta: number) => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${newTheta}deg)`;
      const anglePerCard = 360 / totalCards;
      const newIndex = Math.round(
        Math.abs(newTheta / anglePerCard) % totalCards
      );
      setCurrentIndex(newIndex);
    }
  };

  const nextCard = () => {
    const anglePerCard = 360 / totalCards;
    setTheta((prevTheta) => prevTheta - anglePerCard);
  };

  const prevCard = () => {
    const anglePerCard = 360 / totalCards;
    setTheta((prevTheta) => prevTheta + anglePerCard);
  };

  const handleFlip = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget as HTMLDivElement;
    const cardIndex = parseInt(card.dataset.index || "0");
    if (cardIndex === currentIndex) {
      card.classList.toggle("flipped");
    }
  };

  const dragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startX.current = "touches" in e ? e.touches[0].pageX : e.pageX;
  };

  const drag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const currentX = "touches" in e ? e.touches[0].pageX : e.pageX;
    const diffX = currentX - startX.current;
    const sensitivity = 0.5;
    const newTheta = theta + diffX * sensitivity;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${newTheta}deg)`;
    }
  };

  const dragEnd = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const currentX =
      "changedTouches" in e ? e.changedTouches[0].pageX : e.pageX;
    const diffX = currentX - startX.current;

    if (Math.abs(diffX) > 20) {
      if (diffX > 0) {
        prevCard();
      } else {
        nextCard();
      }
    } else {
      const anglePerCard = 360 / totalCards;
      const snapAngle = Math.round(theta / anglePerCard) * anglePerCard;
      setTheta(snapAngle);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      nextCard();
    } else if (e.key === "ArrowRight") {
      prevCard();
    } else if (e.key === "Enter" || e.key === " ") {
      const currentCard = document.querySelector(
        `.memory-card[data-index="${currentIndex}"]`
      );
      currentCard?.classList.toggle("flipped");
    }
  };

  useEffect(() => {
    arrangeCards(radius);
    rotateCarousel(theta);
  }, [theta, radius]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", drag);
      containerRef.current.addEventListener("mouseup", dragEnd);
      containerRef.current.addEventListener("touchmove", drag, {
        passive: false,
      });
      containerRef.current.addEventListener("touchend", dragEnd);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", drag);
        containerRef.current.removeEventListener("mouseup", dragEnd);
        containerRef.current.removeEventListener("touchmove", drag);
        containerRef.current.removeEventListener("touchend", dragEnd);
      }
    };
  }, [theta]);

  return (
    <>
      <div className="cosmos-background">
        <div className="stars-container"></div>
      </div>

      <div className="container-fluid d-flex flex-column">
        <main className="flex-grow-1 d-flex align-items-center justify-content-center position-relative">
          <div className="carousel-container" ref={containerRef}>
            <div
              className="carousel"
              id="memory-carousel"
              ref={carouselRef}
              onMouseDown={dragStart}
              onTouchStart={dragStart}
            >
              {project.map((memory: any, index: number) => (
                <div
                  className="memory-card"
                  key={memory.id}
                  data-memory-id={memory.id}
                  data-index={index}
                  onClick={handleFlip}
                >
                  <div className="card-inner">
                    <div className="card-front">
                      <div className="card-content">
                        <div className="text-[10px] text-gray-400">
                          {memory.time}
                        </div>
                        <h4 className="py-2">{memory.title}</h4>
                        <span className="flex items-center text-[9px] text-[#c2b7f7] pb-2 font-semibold">
                          <Laptop size={12} className="mr-2" />
                          <p className="mt-[1px]">{memory.role}</p>
                        </span>
                        <img
                          src={memory.image}
                          alt=""
                          className="object-cover w-full h-28 rounded-md shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                        />
                        <div className="absolute group top-6 right-6 size-7 rounded-full bg-[#00000050] hover:bg-[#00000080] hover:translate-y-[-1px] hover:duration-300 flex items-center justify-center shadow-[#ffffff70] shadow-[0_2px_5px]">
                          <a
                            href={memory.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Bot
                              size={16}
                              className="text-gray-400 group-hover:text-white"
                            />
                          </a>
                        </div>
                        <p className="text-[8px] flex flex-wrap pt-3">
                          {memory.tech.map((tech: any, index: number) => (
                            <span
                              key={index}
                              className="rounded-full w-fit border border-gray-600 px-2 py-0.5 mb-1 mr-1 bg-[#00000050] hover:bg-[#00000080] hover:translate-y-[-1px] hover:duration-300 hover:ease-in-out hover:border-white"
                            >
                              {tech}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="card-content">
                        <h4>{memory.title}</h4>
                        <span className="text-[9px] text-gray-400 py-2">
                          {memory.description}
                        </span>
                        {memory.fullText.map((text: any, index: number) => (
                          <li key={index} className="text-[9px] text-gray-400">
                            {text}
                          </li>
                        ))}
                        {memory.news && (
                          <div className="flex items-center pt-3 pb-1 text-[9px] gap-x-2">
                            <span className=" text-[#9d8cf4] font-bold ">
                              Details:
                            </span>
                            <a
                              href={memory.news}
                              target="_blank"
                              className="underline flex gap-1"
                            >
                              Codefest 2025
                              <ExternalLink size={10} />
                            </a>
                          </div>
                        )}
                        <div className="pt-3 pb-1">
                          <span className="text-[9px] text-[#9d8cf4] font-bold ">
                            Tech stack:
                          </span>
                          <p className="flex flex-wrap items-center">
                            {memory.tech.map((tech: any, index: number) => (
                              <span
                                key={index}
                                className="rounded-full w-fit border hover:border-white border-gray-600 px-2 py-0.5 mb-1 mr-1 text-[8px] text-white bg-[#00000050] hover:bg-[#00000080] hover:translate-y-[-1px] hover:duration-300 hover:ease-in-out"
                              >
                                {tech}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button id="prev-btn" className="control-btn" onClick={prevCard}>
              <ChevronLeft />
            </button>
            <button id="next-btn" className="control-btn" onClick={nextCard}>
              <ChevronRight />
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProjectItem;
