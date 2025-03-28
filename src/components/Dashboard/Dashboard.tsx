
import React from 'react';
import Sidebar from './Sidebar';
import QueryInput from './QueryInput';
import ResultsDisplay from './ResultsDisplay';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-analytics-dark mb-8">AI-Powered Analytics Dashboard</h1>
            <div className="mb-8">
              <QueryInput />
            </div>
            <div>
              <ResultsDisplay />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
