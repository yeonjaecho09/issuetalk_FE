import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, FileText, Zap } from "lucide-react";

const storeNotes = [
  {
    id: 1,
    title: "Delivery Schedule",
    content: "Fresh produce arrives tomorrow at 6 AM",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Staff Update",
    content: "Sarah covering evening shift this week",
    time: "5h ago",
  },
  {
    id: 3,
    title: "Promotion Reminder",
    content: "20% off organic items ends Apr 20",
    time: "1d ago",
  },
];

const quickActions = [
  { id: 1, label: "Create Order", icon: <FileText className="h-4 w-4" /> },
  { id: 2, label: "Stock Count", icon: <Zap className="h-4 w-4" /> },
  { id: 3, label: "Print Labels", icon: <FileText className="h-4 w-4" /> },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isCollapsed ? (
          <motion.div
            key="expanded"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F3F4F6]"
          >
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
                  Utility Panel
                </h3>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCollapsed(true)}
                  className="rounded-lg p-1.5 transition-colors hover:bg-[#E5E7EB]"
                >
                  <ChevronRight className="h-4 w-4 text-[#6B7280]" />
                </motion.button>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Store Notes
                </h4>
                <div className="space-y-3">
                  {storeNotes.map((note) => (
                    <motion.div
                      key={note.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="cursor-pointer rounded-lg border border-[#E5E7EB] bg-white p-3 transition-colors hover:border-[#064E3B]"
                    >
                      <div className="mb-1 text-sm font-medium text-[#111827]">
                        {note.title}
                      </div>
                      <div className="mb-2 text-xs text-[#6B7280]">
                        {note.content}
                      </div>
                      <div className="text-xs text-[#9CA3AF]">{note.time}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  {quickActions.map((action) => (
                    <motion.button
                      key={action.id}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-medium text-[#111827] transition-colors hover:bg-[#064E3B] hover:text-white"
                    >
                      {action.icon}
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCollapsed(false)}
            className="rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] p-4 transition-colors hover:bg-[#E5E7EB]"
          >
            <ChevronLeft className="h-5 w-5 text-[#6B7280]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
