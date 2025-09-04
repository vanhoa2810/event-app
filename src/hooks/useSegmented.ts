import { useState } from 'react';

export function useSegmented(initial: string) {
  const [value, setValue] = useState(initial);
  return { value, setValue };
}