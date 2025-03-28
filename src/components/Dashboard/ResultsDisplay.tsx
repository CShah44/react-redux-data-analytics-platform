import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  BarChart,
  PieChart,
  ResponsiveContainer,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  Cell,
} from "recharts";
import { AlertCircle, Loader2 } from "lucide-react";

const COLORS = ["#9B87F5", "#7E69AB", "#6E59A5", "#D6BCFA", "#1A1F2C"];

const ResultsDisplay = () => {
  const { results, isLoading, error } = useSelector(
    (state: RootState) => state.query
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 w-full">
        <Loader2 className="h-12 w-12 text-analytics-primary animate-spin mb-4" />
        <p className="text-lg text-gray-600">Analyzing your query...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 w-full">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-96 w-full p-4">
        <div className="text-center max-w-xl">
          <h2 className="text-2xl font-semibold mb-4 text-analytics-primary">
            Welcome to GenAI Analytics
          </h2>
          <p className="text-gray-600 mb-6">
            Ask any question about your data using natural language. Our AI will
            analyze your query and provide relevant insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-analytics-light p-4 rounded-lg">
              <p className="text-analytics-primary font-medium">
                "Show me monthly revenue for the last year"
              </p>
            </div>
            <div className="bg-analytics-light p-4 rounded-lg">
              <p className="text-analytics-primary font-medium">
                "What were our top selling products last quarter?"
              </p>
            </div>
            <div className="bg-analytics-light p-4 rounded-lg">
              <p className="text-analytics-primary font-medium">
                "Compare sales performance across regions"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render appropriate chart based on the result type
  const renderChart = () => {
    switch (results.type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={results.data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6E59A5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={results.data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#9B87F5" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <Pie
                data={results.data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {results.data.map(
                  (entry: { name: string; value: number }, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <p>Unsupported chart type</p>;
    }
  };

  // Render insights if available
  const renderInsights = () => {
    if (!results.insights) return null;

    return (
      <div className="mt-4 bg-analytics-light p-4 rounded-lg">
        <h3 className="font-semibold text-analytics-primary mb-2">
          Key Insights
        </h3>
        <ul className="space-y-1">
          {results.insights.map((insight: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="inline-block h-2 w-2 mt-2 mr-2 rounded-full bg-analytics-secondary" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card className="w-full shadow-md border-analytics-light">
      <CardHeader>
        <CardTitle className="text-2xl text-analytics-primary">
          {results.title}
        </CardTitle>
        <CardDescription>{results.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {renderChart()}
        {renderInsights()}
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
