import { useState } from 'react';

export const useInput = (initValue: string) => {
  const [value, setValue] = useState(initValue);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return { value, onChange: handleChange, clear: () => setValue('') };
};
// end of useInput()
