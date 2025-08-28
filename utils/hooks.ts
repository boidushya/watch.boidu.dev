import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

// -- Types --
export type Location = {
  state: string;
  country: string;
};

export type Weather = {
  temperature: number;
  condition: string;
};

// -- Hooks --
export const useClock = () => {
  const [time, setTime] = useState(new Date());

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    hours,
    minutes,
    seconds,
  };
};

export const useLocation = () => {
  const fetchLocation = useCallback(async () => {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return { state: data.region_code, country: data.country } as Location;
  }, []);

  const {
    data: location,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["location"],
    queryFn: fetchLocation,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return useMemo(() => ({
    location,
    loading,
    error: error?.message || null
  }), [location, loading, error]);
};

export const useWeather = () => {
  const fetchWeather = useCallback(async () => {
    const res = await fetch("https://wttr.in/?format=j1");
    const data = await res.json();
    return {
      temperature: data.current_condition[0].temp_C,
      condition: data.current_condition[0].weatherDesc[0].value,
    } as Weather;
  }, []);

  const {
    data: weather,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 15,
  });

  return useMemo(() => ({
    weather,
    loading,
    error: error?.message || null
  }), [weather, loading, error]);
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState("md");

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setBreakpoint("lg");
    } else if (window.innerWidth >= 768) {
      setBreakpoint("md");
    } else {
      setBreakpoint("sm");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return breakpoint;
};
