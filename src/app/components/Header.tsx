import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const stores = [
  "Downtown Market",
  "Riverside Location",
  "Westside Store",
  "Northgate Branch",
];

export function Header() {
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [isOpen, setIsOpen] = useState(false);
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <header className="border-b border-[#E5E7EB] bg-[#F9FAFB] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold text-[#111827]">
            Store Dashboard
          </h1>

          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 transition-colors hover:bg-[#F3F4F6]"
            >
              <span className="text-sm font-medium text-[#111827]">
                {selectedStore}
              </span>
              <ChevronDown className="h-4 w-4 text-[#6B7280]" />
            </motion.button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 top-full z-50 mt-2 w-56 rounded-lg border border-[#E5E7EB] bg-white shadow-sm"
              >
                {stores.map((store) => (
                  <button
                    key={store}
                    onClick={() => {
                      setSelectedStore(store);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-[#111827] transition-colors hover:bg-[#F3F4F6] first:rounded-t-lg last:rounded-b-lg"
                  >
                    {store}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <div className="text-xs text-[#6B7280]">
          Last Updated: {formattedDate} at {formattedTime}
        </div>
      </div>
    </header>
  );
}
