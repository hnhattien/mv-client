import { useEffect, useRef, useState } from 'react';

import useSWR from 'swr';
import { get, sortBy } from 'lodash';

import { getBaseURL } from './api/requester';
import { isBrowser } from './util';


/**
 *
 * @param {*} queries
 * const queries = {
 *    xs: '(max-width: 320px)',
 *    md: '(max-width: 720px)',
 *    lg: '(max-width: 1024px)',
 * }
 * @returns
 */


export const useMergeState = initialState => {
  const [state, setState] = useState(initialState);
  const setMergedState = newState =>
    setState(prevState => ({ ...prevState, ...newState }));
  return [state, setMergedState];
};

const fetcher = (...args) => fetch(...args).then(res => res.json());


const swrConfig = {
  revalidateOnFocus: false,
};

export const useQuestions = (query) => {
  const queryParms = new URLSearchParams('');
  
  if(query?.page){
    queryParms.append('page',query?.page)
  }
  const {data, error} = useSWR(
    `${getBaseURL()}/questions?${queryParms.toString()}`,
    fetcher
  )
  return {data, error };
}
export const useQuestionsByTag = (tag, query) => {
  const queryParms = new URLSearchParams('');
  
  if(query?.page && query?.pageSize){
    queryParms.append('pagination[page]',query?.page)
    queryParms.append('pagination[pageSize]', query?.pageSize);
  }
  const {data, error} = useSWR(
    `${getBaseURL()}/questions/tag/${tag}?${queryParms.toString()}`,
    fetcher
  )
  return {data, error };
}
export const usePagination = (initialState) => {
  const [pageSize, setPageSize] = useState(initialState?.pageSize);
  const [page, setPage] = useState(initialState?.page);
  return {pageSize, setPageSize, page, setPage};
}

export const useAnswerByQuestionId = (id) => {
  const {data, error} = useSWR(
    `${getBaseURL()}/answer/question/${id}`,
    fetcher
  )
  return {data, error};
}


const getInitialState = (query, defaultState) => {
  // Prevent a React hydration mismatch when a default value is provided by not defaulting to window.matchMedia(query).matches.
  if (defaultState !== undefined) {
    return defaultState;
  }

  if (isBrowser) {
    return window.matchMedia(query).matches;
  }

  // A default value has not been provided, and you are rendering on the server, warn of a possible hydration mismatch when defaulting to false.
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatches.'
    );
  }

  return false;
};

export const useMedia = (query, defaultState) => {
  const [state, setState] = useState(getInitialState(query, defaultState));

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};

