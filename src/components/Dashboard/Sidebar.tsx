
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { executeStoredQuery } from '@/store/querySlice';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Database, LineChart, Settings, Home, BarChart, PieChart } from 'lucide-react';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { queryHistory } = useSelector((state: RootState) => state.query);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleQueryClick = (id: string) => {
    dispatch(executeStoredQuery(id));
  };

  return (
    <div className="h-screen w-64 bg-analytics-dark text-white flex flex-col">
      <div className="p-4 flex items-center gap-2">
        <Database className="h-6 w-6 text-analytics-secondary" />
        <h1 className="text-xl font-bold">GenAI Analytics</h1>
      </div>
      
      <Separator className="bg-gray-700" />
      
      <div className="p-4">
        <div className="flex items-center gap-2 text-analytics-secondary mb-2">
          <Home className="h-4 w-4" />
          <span className="font-medium">Dashboard</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400 mb-2 pl-6">
          <LineChart className="h-4 w-4" />
          <span>Trends</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400 mb-2 pl-6">
          <BarChart className="h-4 w-4" />
          <span>Comparisons</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400 mb-2 pl-6">
          <PieChart className="h-4 w-4" />
          <span>Distributions</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </div>
      </div>
      
      <Separator className="bg-gray-700" />
      
      <div className="p-4">
        <h2 className="text-sm font-semibold mb-2 text-gray-400">RECENT QUERIES</h2>
        <ScrollArea className="h-[calc(100vh-280px)]">
          {queryHistory.length > 0 ? (
            <div className="space-y-2">
              {queryHistory.map((query) => (
                <div 
                  key={query.id} 
                  className="p-2 rounded hover:bg-analytics-primary/20 cursor-pointer transition-colors"
                  onClick={() => handleQueryClick(query.id)}
                >
                  <p className="text-sm truncate">{query.text}</p>
                  <p className="text-xs text-gray-400">{formatDate(query.timestamp)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No queries yet</p>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
