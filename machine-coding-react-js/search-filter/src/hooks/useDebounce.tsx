import { useEffect, useState } from "react";

const useDebounce = (val: string, delay = 250) => {
  const [value, setValue] = useState(val);

  useEffect(() => {
    let timer = setTimeout(() => setValue(val), delay);
    return () => clearTimeout(timer);
  }, [val, delay]);

  return { debouncedValue: value };
};

export default useDebounce;
