import React, { useEffect } from 'react'

export default function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  useEffect(() => {
    const handler: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
