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
      <div className="flex flex-col items-center justify-center h-64 md:h-96 w-full">
        <Loader2 className="h-8 w-8 md:h-12 md:w-12 text-analytics-primary animate-spin mb-4" />
        <p className="text-base md:text-lg text-gray-600">
          Analyzing your query...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 md:h-96 w-full">
        <AlertCircle className="h-8 w-8 md:h-12 md:w-12 text-red-500 mb-4" />
        <p className="text-base md:text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-64 md:h-96 w-full p-4">
        <div className="text-center max-w-xl">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-analytics-primary">
            Welcome to GenAI Analytics
          </h2>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Ask any question about your data using natural language. Our AI will
            analyze your query and provide relevant insights.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            <div className="bg-analytics-light p-3 md:p-4 rounded-lg">
              <p className="text-analytics-primary font-medium text-sm md:text-base">
                "Show me monthly revenue for the last year"
              </p>
            </div>
            <div className="bg-analytics-light p-3 md:p-4 rounded-lg">
              <p className="text-analytics-primary font-medium text-sm md:text-base">
                "What were our top selling products last quarter?"
              </p>
            </div>
            <div className="bg-analytics-light p-3 md:p-4 rounded-lg">
              <p className="text-analytics-primary font-medium text-sm md:text-base">
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
          <ResponsiveContainer width="100%" height={300} minHeight={250}>
            <LineChart
              data={results.data}
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
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
          <ResponsiveContainer width="100%" height={300} minHeight={250}>
            <BarChart
              data={results.data}
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="value" fill="#9B87F5" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300} minHeight={250}>
            <PieChart margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
              <Pie
                data={results.data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
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
              <Legend wrapperStyle={{ fontSize: "12px" }} />
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
      <div className="mt-3 md:mt-4 bg-analytics-light p-3 md:p-4 rounded-lg">
        <h3 className="font-semibold text-analytics-primary mb-2 text-sm md:text-base">
          Key Insights
        </h3>
        <ul className="space-y-1">
          {results.insights.map((insight: string, index: number) => (
            <li key={index} className="flex items-start text-xs md:text-sm">
              <span className="inline-block h-2 w-2 mt-1.5 mr-2 rounded-full bg-analytics-secondary" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card className="w-full shadow-md border-analytics-light">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl text-analytics-primary">
          {results.title}
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          {results.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {renderChart()}
        {renderInsights()}
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
