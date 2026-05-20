import { AlertCircle, Package } from "lucide-react";
import { motion } from "motion/react";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  status: "Expiring Soon" | "Low Stock" | "Reorder" | "Critical";
  expiryDate?: string;
}

const inventoryData: InventoryItem[] = [
  {
    id: 1,
    name: "Organic Whole Milk",
    category: "Dairy",
    quantity: 12,
    status: "Expiring Soon",
    expiryDate: "Apr 19",
  },
  {
    id: 2,
    name: "Roma Tomatoes",
    category: "Produce",
    quantity: 8,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Sourdough Bread",
    category: "Bakery",
    quantity: 5,
    status: "Critical",
    expiryDate: "Apr 18",
  },
  {
    id: 4,
    name: "Free Range Eggs",
    category: "Dairy",
    quantity: 15,
    status: "Reorder",
  },
  {
    id: 5,
    name: "Baby Spinach",
    category: "Produce",
    quantity: 6,
    status: "Low Stock",
    expiryDate: "Apr 20",
  },
  {
    id: 6,
    name: "Greek Yogurt",
    category: "Dairy",
    quantity: 9,
    status: "Expiring Soon",
    expiryDate: "Apr 21",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Critical":
      return "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]";
    case "Expiring Soon":
      return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
    case "Low Stock":
      return "bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]";
    case "Reorder":
      return "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]";
    default:
      return "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]";
  }
}

export function InventoryTable() {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
            Inventory Attention Required
          </h3>
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Items needing immediate action
          </p>
        </div>
        <div className="flex items-center gap-2 text-[#064E3B]">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium tabular-nums">
            {inventoryData.length} items
          </span>
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                Item
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                Category
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                Qty
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                Status
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                Expiry
              </th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <motion.tr
                key={item.id}
                whileHover={{ backgroundColor: "#F9FAFB" }}
                className="border-b border-[#E5E7EB] last:border-0"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3F4F6]">
                      <Package className="h-4 w-4 text-[#6B7280]" />
                    </div>
                    <span className="text-sm font-medium text-[#111827]">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-sm text-[#6B7280]">
                  {item.category}
                </td>
                <td className="py-4 text-sm font-medium tabular-nums text-[#111827]">
                  {item.quantity}
                </td>
                <td className="py-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 text-sm tabular-nums text-[#6B7280]">
                  {item.expiryDate || "—"}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
