import { createContext, ReactNode, useContext, useState } from "react";



interface SearchContext {
	searchFor: string;
	setSearchFor: (term: string) => void;
	searchType: string;
	setSearchType: (term: string) => void;
  }
  
  const SearchContext = createContext<SearchContext | undefined>(undefined);
  
  export const SearchProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
	const [searchFor, setSearchFor] = useState<string>('');
	const [searchType, setSearchType] = useState<string>('');
  
	return (
	  <SearchContext.Provider value={{ searchFor, setSearchFor, searchType, setSearchType }}>
		{children}
	  </SearchContext.Provider>
	);
  };
  
  export const useSearch = () => {
	const context = useContext(SearchContext);
	if (!context) {
	  throw new Error('failed');
	}
	return context;
  }