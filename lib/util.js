
import { get, groupBy, keys, min } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const isBrowser = typeof window !== 'undefined';

export const isNavigator = typeof navigator !== 'undefined';

export function numberFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export const getValueByLocale = (obj, key, locale) => {
  let seasonText = 'Season'
  if(get(obj, `${key}_${locale}`)){
    if(get(obj, 'season')){
      return get(obj, `${key}_${locale}`) + ' ' + seasonText + ' ' + get(obj, 'season');
    }
    else{
      return get(obj, `${key}_${locale}`);
    }
    
  }
  else{
    if(get(obj, 'season')){
      return get(obj, key) + ' ' + seasonText + ' ' + get(obj, 'season');
    }
    else{
      return get(obj, key);
    }
  }
}

export const getSmallestEpisodeFromGroupEpisode = (data) => {
  let dataKeys = keys(data);
  console.log(dataKeys);
  let minValue = min(dataKeys);
  return data[minValue];
}
export const groupByEpisode = (data, key) => {
  return groupBy(data, (SV) => SV[key]);
}