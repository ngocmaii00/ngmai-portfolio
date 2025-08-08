import { Home, Mail, User, GraduationCap, Folder, Award } from "lucide-react";

const headerElements = [
  {
    icon: <Home size={24} className="text-white" />,
    label: "Home",
    link: "/",
    onClick: () => console.log("Home clicked"),
  },
  {
    icon: <User size={24} className="text-white" />,
    label: "About",
    link: "/about",
    onClick: () => console.log("Home clicked"),
  },
  {
    icon: <GraduationCap size={24} className="text-white" />,
    label: "Resume",
    link: "/resume",
    onClick: () => console.log("Home clicked"),
  },
  {
    icon: <Folder size={24} className="text-white" />,
    label: "Projects",
    link: "/projects",
    onClick: () => console.log("Home clicked"),
  },
  {
    icon: <Award size={24} className="text-white" />,
    label: "Achievements",
    link: "/achievements",
    onClick: () => console.log("Home clicked"),
  },
  {
    icon: <Mail size={24} className="text-white" />,
    label: "Contact",
    link: "/contact",
    onClick: () => console.log("Messages clicked"),
  },
];

export default headerElements;
