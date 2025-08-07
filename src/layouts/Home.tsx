import { motion } from "framer-motion";
import Introduction from "../components/common/Introduction";
import { useEffect, useState } from "react";

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

    const interval = setInterval(showTooltip, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="absolute top-[30%] left-0 right-0 z-10">
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

          <div className="border w-[525px] rounded-lg py-4 px-8 home-card pb-16">
            <Introduction
              text="Hi, I am Ngoc Mai."
              fontsize="text-lg"
              fontweight="font-extrabold"
              delay={0.5}
            />
            <Introduction
              text="I started my journey in software development with a strong passion forcreating practical, user-focused web applications."
              fontsize="text-sm"
              fontweight="font-medium"
              delay={1}
            />
            <Introduction
              text="I am always eager to explore new challenges and technologies. If youare interested in working together or just want to connect, feel free to drop me a message!"
              fontsize="text-sm"
              fontweight="font-medium"
              delay={3}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
