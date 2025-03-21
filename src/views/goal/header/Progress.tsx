import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";

import useProgressTodo from "@/hooks/todo/useProgressTodo";
import { useGoalDetailContext } from "@/views/goal/GoalDetailContext";

import ProgressBar from "../../../components/atoms/progress-bar/ProgressBar";

function AnimatedNumberFramerMotion({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 20,
  });
  const toFixed = useTransform(
    springValue,
    (latest) => latest.toFixed(0) + "%",
  );

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return <motion.span>{toFixed}</motion.span>;
}

interface ProgressBarProps {
  label?: string;
  showLabel?: boolean;
}

export default function Progress({
  label = "Progress",
  showLabel = true,
}: ProgressBarProps) {
  const { goalId } = useGoalDetailContext();
  const { data } = useProgressTodo(goalId);
  const progress = useMemo(() => data?.progress ?? 0, [data]);

  return (
    <>
      {showLabel && (
        <p className="color-slate-900 mb-[8px] text-xs font-semibold">
          {label}
        </p>
      )}

      <div className="flex items-center justify-between whitespace-nowrap">
        <ProgressBar progress={progress} />
        <p className="inline-block text-xs font-semibold">
          {typeof progress === "number" && (
            <AnimatedNumberFramerMotion value={progress} />
          )}
        </p>
      </div>
    </>
  );
}
