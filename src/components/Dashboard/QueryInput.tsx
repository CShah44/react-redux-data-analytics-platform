import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCurrentQuery } from "@/store/querySlice";
import { useQueryExecution } from "@/hooks/useQueryExecution";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, X } from "lucide-react";

const QueryInput = () => {
  const dispatch = useDispatch();
  const { executeQuery } = useQueryExecution();
  const { currentQuery, suggestions } = useSelector(
    (state: RootState) => state.query
  );

  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on current query, done on every render
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(currentQuery.toLowerCase())
  );

  // Handle input change
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentQuery(e.target.value));
    setShowSuggestions(!!e.target.value);
    setActiveSuggestion(-1);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setCurrentQuery(suggestion));
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuery.trim()) {
      executeQuery(currentQuery);
      setShowSuggestions(false);
    }
  };

  // Clear input
  const handleClear = () => {
    dispatch(setCurrentQuery(""));
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only process if we have suggestions and they're visible
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;

      case "Enter":
        if (activeSuggestion >= 0) {
          e.preventDefault();
          dispatch(setCurrentQuery(filteredSuggestions[activeSuggestion]));
          setShowSuggestions(false);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center">
          <div className="relative flex-1">
            {/* Search icon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </div>

            {/* Input field */}
            <Input
              ref={inputRef}
              type="text"
              value={currentQuery}
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              onFocus={() => currentQuery && setShowSuggestions(true)}
              placeholder="Ask anything about your data..."
              className="pl-10 pr-10 py-6 bg-white border-analytics-primary border text-lg rounded-l-lg focus-visible:ring-analytics-secondary"
            />

            {/* Clear button */}
            {currentQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear input"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="bg-analytics-primary hover:bg-analytics-secondary text-white px-4 py-6 rounded-r-lg"
            aria-label="Submit query"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <ul role="listbox">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                role="option"
                aria-selected={index === activeSuggestion}
                className={`px-4 py-2 cursor-pointer hover:bg-analytics-light ${
                  index === activeSuggestion ? "bg-analytics-light" : ""
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QueryInput;
