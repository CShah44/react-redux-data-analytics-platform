import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Badge } from "@/components/ui/badge";
import { Clock, History, X } from "lucide-react";
import { executeStoredQuery } from "@/store/querySlice";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { queryHistory } = useSelector((state: RootState) => state.query);
  const dispatch = useDispatch();

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleQueryClick = (id: string) => {
    dispatch(executeStoredQuery(id));
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-analytics-primary">
          Query History
        </h2>
        {/* Close button only on mobile */}
        <button
          onClick={onClose}
          className="md:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {queryHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <History className="mx-auto h-12 w-12 mb-2 opacity-50" />
            <p>No queries yet</p>
            <p className="text-sm">Your query history will appear here</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {queryHistory.map((query) => (
              <li
                onClick={() => handleQueryClick(query.id)}
                key={query.id}
                className="cursor-pointer bg-gray-50 rounded-lg p-3 hover:bg-analytics-light transition-colors"
              >
                <p className="font-medium text-analytics-dark">{query.text}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatTimestamp(query.timestamp)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
