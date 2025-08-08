import { TypeWriter } from "./TypeWriter";

const Introduction = () => {
  return (
    <div className="py-2 home-title gap-4">
      <h1 className="text-white text-2xl font-bold mb-4">Hi, I'm Ngoc Mai.</h1>
      <TypeWriter lines={paragraphLines} typingSpeed={30} className="text-base" />
    </div>
  );
};
export default Introduction;

const paragraphLines = [
  "I started my journey in software development with a strong passion for creating practical, user-focused web applications.", "\n",
  "I'm always eager to expand my skill set and learn new technologies. If you are interested in working together or just want to connect, feel free to drop me a message!"
];
