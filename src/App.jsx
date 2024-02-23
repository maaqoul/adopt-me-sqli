import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import SearchParams from "./PetSearch/containers/SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./PetSearch/components/Details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./contexts/adoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptPet = useState(null);
  return (
    <BrowserRouter>
      <AdoptedPetContext.Provider value={adoptPet}>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </QueryClientProvider>
      </AdoptedPetContext.Provider>
    </BrowserRouter>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
