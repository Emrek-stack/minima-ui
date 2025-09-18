import { motion } from "motion/react"

export const ProgressBar = () => {
  return (
    <motion.div
      className="bg-ui-bg-interactive h-full w-full"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  )
}

