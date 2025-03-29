# Data Analytics & Visualization Tool

A modern, interactive data visualization application that allows users to query data using natural language and get visual results in various chart formats.

## Features

- **Natural Language Queries**: Type questions in plain English to analyze your data
- **Interactive Visualizations**: View results as bar charts, line graphs, pie charts, and more
- **Query History**: Keep track of your previous queries for easy reference
- **Insights Generation**: Mock AI-powered insights to help interpret your data
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Technology Stack

- **Frontend**: React with TypeScript
- **State Management**: Redux Toolkit
- **UI Components**: shadcn/ui (built on Tailwind CSS)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Mock Data**: Simulated API responses for demonstration purposes

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/CShah44/react-redux-data-analytics-platform.git
cd react-redux-anayltics-platform
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8000`

## Usage

1. Type your query in the input field (e.g., "Show me sales by region")
2. Press Enter or click the Submit button
3. View the visualization results
4. Explore the insights provided below the chart
5. Access your query history from the sidebar

## Project Structure

```
src/
├── components/     # UI components
├── hooks/          # Custom React hooks
├── store/          # Redux store configuration and slices
├── utils/          # Utility functions
└── App.tsx         # Main application component
```

## Future Enhancements

- Connection to real data sources via API
- Advanced filtering options
- Export functionality for charts and insights
- User authentication and saved queries
- Custom chart configurations
