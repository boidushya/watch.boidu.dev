import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const fetchLocation = async () => {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return { state: data.region_code, country: data.country } as Location;
  };

  const {
    data: location,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["location"],
    queryFn: fetchLocation,
  });

  return { location, loading, error: error?.message || null };
};

export const useWeather = () => {
  const fetchWeather = async () => {
    const res = await fetch("https://wttr.in/?format=j1");
    const data = await res.json();
    return {
      temperature: data.current_condition[0].temp_C,
      condition: data.current_condition[0].weatherDesc[0].value,
    } as Weather;
  };

  const {
    data: weather,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
  });

  return { weather, loading, error: error?.message || null };
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState("md");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setBreakpoint("lg");
      } else if (window.innerWidth >= 768) {
        setBreakpoint("md");
      } else {
        setBreakpoint("sm");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
};
