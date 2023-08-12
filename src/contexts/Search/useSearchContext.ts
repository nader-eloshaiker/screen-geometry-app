import { useContext } from 'react';
import { SearchContext } from './SearchContext';

export const useSearchContext = () => useContext(SearchContext)
