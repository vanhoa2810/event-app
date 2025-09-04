import { useState } from 'react';
export function useSegmented(initial) {
    const [value, setValue] = useState(initial);
    return { value, setValue };
}
