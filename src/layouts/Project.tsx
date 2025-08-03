import ProjectItem from "../components/common/ProjectItem";
import projectElements from "../data/projectElements";
import { motion } from "framer-motion";

const Project = () => {
  return (
    <motion.div className="absolute top-[20%] left-0 right-0 z-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="p-2"
      >
        <ProjectItem project={projectElements} />
      </motion.div>
    </motion.div>
  );
};

export default Project;
