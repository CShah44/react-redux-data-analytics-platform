import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setError, setResults, addToHistory } from '@/store/querySlice';

// Mock data generation helper functions
const generateRandomTimeSeriesData = (months = 12) => {
  const data = [];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  for (let i = 0; i < months; i++) {
    const monthIndex = (currentMonth - i + 12) % 12; 
    const year = currentYear - Math.floor((i - currentMonth) / 12);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    data.unshift({
      name: `${monthNames[monthIndex]} ${year}`,
      value: Math.floor(Math.random() * 1000) + 500,
    });
  }
  return data;
};

const generateRandomCategoryData = (categories: string[]) => {
  return categories.map(category => ({
    name: category,
    value: Math.floor(Math.random() * 1000) + 200,
  }));
};

const generateRandomPieData = (segments: string[]) => {
  return segments.map(segment => ({
    name: segment,
    value: Math.floor(Math.random() * 100) + 20,
  }));
};

interface ResultsData {
  type: string;
  title: string;
  data: { name: string; value: number }[];
  description: string;
  insights?: string[]; // Make insights optional
}

const generateMockResults = (query: string): ResultsData => {
  // Default result if no keyword matches
  let result: ResultsData = {
    type: 'bar',
    title: 'Analysis Results',
    data: generateRandomCategoryData(['Category A', 'Category B', 'Category C', 'Category D']),
    description: 'Here are the results based on your query.'
  };

  const lowercaseQuery = query.toLowerCase();

  // Match with different keywords to generate different visualizations
  if (lowercaseQuery.includes('revenue') || lowercaseQuery.includes('sales')) {
    result = {
      type: 'line',
      title: 'Monthly Revenue',
      data: generateRandomTimeSeriesData(12),
      description: 'Monthly revenue over the last year shows seasonal variations with peak performance in Q4.',
      insights: [
        'Revenue grew by 15% year-over-year',
        'December had the highest monthly revenue',
        'Q3 showed unexpected decline in sales'
      ]
    };
  } else if (lowercaseQuery.includes('product') || lowercaseQuery.includes('selling')) {
    result = {
      type: 'bar', 
      title: 'Top Selling Products',
      data: generateRandomCategoryData(['Electronics', 'Clothing', 'Home Goods', 'Sports', 'Beauty']),
      description: 'Electronics continues to be our best-performing product category.',
      insights: [
        'Electronics represents 32% of total sales',
        'Beauty products have the highest profit margin',
        'Sports equipment sales increased 24% over last quarter'
      ]
    };
  } else if (lowercaseQuery.includes('region') || lowercaseQuery.includes('performance')) {
    result = {
      type: 'bar',
      title: 'Regional Performance',
      data: generateRandomCategoryData(['North America', 'Europe', 'Asia', 'South America', 'Australia']),
      description: 'North America and Asia are our strongest markets with Europe showing growth potential.',
      insights: [
        'North America accounts for 45% of total revenue',
        'Asia showing fastest growth at 28% YoY',
        'European market underperforming by 12% compared to targets'
      ]
    };
  } else if (lowercaseQuery.includes('retention') || lowercaseQuery.includes('customer')) {
    result = {
      type: 'pie',
      title: 'Customer Retention Analysis',
      data: generateRandomPieData(['Loyal (>3y)', 'Regular (1-3y)', 'New (<1y)', 'At Risk', 'Churned']),
      description: 'Our customer base is healthy with strong retention of loyal customers.',
      insights: [
        'Loyal customer segment grew by 8% this year',
        'Churn rate decreased to 12% from 15% last year',
        'New customer acquisition cost decreased by 7%'
      ]
    };
  } else if (lowercaseQuery.includes('marketing') || lowercaseQuery.includes('campaign') || lowercaseQuery.includes('roi')) {
    result = {
      type: 'bar',
      title: 'Marketing Campaign ROI',
      data: generateRandomCategoryData(['Social Media', 'Email', 'Search', 'Display Ads', 'Content Marketing']),
      description: 'Email campaigns continue to provide the highest ROI among marketing channels.',
      insights: [
        'Email marketing ROI: 420%',
        'Social media campaigns reached 2.4M new users',
        'Content marketing driving 34% more organic traffic'
      ]
    };
  }

  return result;
};

export const useQueryExecution = () => {
  const dispatch = useDispatch();

  const executeQuery = useCallback((query: string) => {
    if (!query.trim()) {
      dispatch(setError('Please enter a query.'));
      return;
    }

    // Add query to history
    dispatch(addToHistory(query));
    
    // Set loading state
    dispatch(setLoading(true));
    dispatch(setError(null));

    // Simulate API call with timeout
    setTimeout(() => {
      try {
        const results = generateMockResults(query);
        dispatch(setResults(results));
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError('Failed to process your query. Please try again.'));
        dispatch(setLoading(false));
      }
    }, 1500); // Simulate processing time
  }, [dispatch]);

  return { executeQuery };
};
