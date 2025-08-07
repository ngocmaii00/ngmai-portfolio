import { TypingText } from "./TypeWriter";

interface IntroductionProps {
    text: string;
    delay?: number
    fontsize?: string
    fontweight?: string
}
const Introduction: React.FC<IntroductionProps> = function ({ text, delay, fontsize, fontweight }) {
  return (
    <div className="flex flex-col justify-start items-start py-2">
      <TypingText
        delay={delay}
        duration={2}
        fontSize={fontsize}
        fontWeight={fontweight}
        color="text-white"
        className="home-title"
      >
        {text}
      </TypingText>
    </div>
  );
}
export default Introduction
