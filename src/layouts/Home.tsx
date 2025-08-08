import { motion } from "framer-motion";
import Introduction from "../components/common/Introduction";
import { useEffect, useState } from "react";
import { ResumeBorder } from "../components/common/ResumeButton";

const Home = () => {
  const [tooltipText, setTooltipText] = useState("");

  const messages = [
    "Hello 👋",
    "Nice to meet you 🥰",
    "Welcome to my portfolio 💻",
    "Have a nice day 😊",
  ];

  useEffect(() => {
    const showTooltip = () => {
      const randomText = messages[Math.floor(Math.random() * messages.length)];
      setTooltipText(randomText);
    };

    showTooltip();

    const interval = setInterval(showTooltip, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="absolute top-[25%] left-0 right-0 z-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="p-2"
      >
        <div className="flex items-center justify-center gap-16">
          <div className="w-[220px] relative z-50">
            {tooltipText && (
              <>
                <div className="absolute -top-16 left-0 right-0 z-10 text-center rounded-full text-sm font-medium py-2 px-4 w-fit mx-auto bg-white text-[#18112b]">
                  {tooltipText}
                </div>
                <div className="triangle-bottom absolute -top-[30px] translate-x-26"></div>
                <img
                  src="/ngmai.jpg"
                  alt="Ngoc Mai"
                  className="rounded-full home-card"
                />
                <div className="absolute rounded-full bg-green-500 size-8 border-[#18112b] border-4 bottom-2 right-4"></div>
              </>
            )}
          </div>
          <img src="/icon.png" className="absolute translate-y-[56em] spinner-bg" />
          <img src="/moon-blue.png" className="absolute size-16 translate-x-[27em] translate-y-[-6em] spinner1 z-10" />
          <div className="border w-[38%] rounded-lg py-4 px-8 home-card h-[300px] flex items-start">
            <Introduction />
            <ResumeBorder
              size={150}
              duration={6}
              delay={0}
              colorFrom="#181730"
              colorTo="#aca9eb"
              reverse={false}
              initialOffset={0}
              borderThickness={2}
              opacity={1}
              glowIntensity={8}
              beamBorderRadius={45}
              pauseOnHover={false}
              speedMultiplier={1}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
