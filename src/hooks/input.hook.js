import { useCallback, useState } from "react"

export const useInput = () => {
  const [ value, setValue ] = useState('');

  const handlerOnChange = useCallback(e => setValue(e.target.value), []);

  const handlerOnFocus = useCallback(() => setValue(''), []);

  return { 
    value,
    onChange: handlerOnChange,
    onFocus: handlerOnFocus
  }
}