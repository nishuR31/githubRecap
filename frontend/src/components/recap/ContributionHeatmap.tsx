import { motion } from "framer-motion";

interface ContributionHeatmapProps {
  data: number[][];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getLevelClass = (level: number) => {
  switch (level) {
    case 0:
      return "bg-muted/50";
    case 1:
      return "bg-primary/25";
    case 2:
      return "bg-primary/50";
    case 3:
      return "bg-primary/75";
    case 4:
      return "bg-primary";
    default:
      return "bg-muted/50";
  }
};

export const ContributionHeatmap = ({ data }: ContributionHeatmapProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="glass-elevated rounded-2xl p-6 overflow-x-auto"
    >
      <h3 className="text-lg font-semibold mb-6 text-foreground">Contribution Activity</h3>
      
      <div className="min-w-[800px]">
        {/* Month labels */}
        <div className="flex mb-2 pl-8">
          {MONTHS.map((month, i) => (
            <span
              key={month}
              className="text-xs text-muted-foreground"
              style={{ width: `${100 / 12}%` }}
            >
              {month}
            </span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 pr-2">
            {DAYS.map((day, i) => (
              <span
                key={day}
                className="text-xs text-muted-foreground h-3 flex items-center"
                style={{ visibility: i % 2 === 1 ? "visible" : "hidden" }}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {data.map((week, weekIndex) => (
              <motion.div
                key={weekIndex}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.3, 
                  delay: weekIndex * 0.01,
                }}
                className="flex flex-col gap-[3px]"
              >
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${getLevelClass(day)} transition-colors hover:ring-2 hover:ring-primary/50`}
                    title={`${day} contributions`}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <span className="text-xs text-muted-foreground">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getLevelClass(level)}`}
            />
          ))}
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </div>
    </motion.div>
  );
};
