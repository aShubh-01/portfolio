// hooks/useIntersectionObserver.js
import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold }
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => currentRef && observer.unobserve(currentRef)
  }, [threshold])

  return [ref, isVisible]
}