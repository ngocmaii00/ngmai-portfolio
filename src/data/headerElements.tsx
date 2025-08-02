import { Home, Mail, User, GraduationCap, Folder, Award } from "lucide-react";

const headerElements = [
  {
    icon: <Home size={24} className="text-white" />,
    label: "Home",
    onClick: () => console.log("Home clicked"),
  },
  {
    icon: <User size={24} className="text-white" />,
    label: "About",
    onClick: () => console.log("Home clicked"),
  },
  {
    icon: <GraduationCap size={24} className="text-white" />,
    label: "Resume",
    onClick: () => console.log("Home clicked"),
  },
  {
    icon: <Folder size={24} className="text-white" />,
    label: "Projects",
    onClick: () => console.log("Home clicked"),
  },
  {
    icon: <Award size={24} className="text-white" />,
    label: "Achieves",
    onClick: () => console.log("Home clicked"),
  },
  {
    icon: <Mail size={24} className="text-white" />,
    label: "Contact",
    onClick: () => console.log("Messages clicked"),
  },
];

export default headerElements;
