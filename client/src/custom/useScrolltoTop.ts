import { useEffect, useState } from 'react';

const useScrollToTop = (scrollTrigger: number) => {
    
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };



  useEffect(() => {

    const toggleVisibility = () => {
        if (window.scrollY > scrollTrigger) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [scrollTrigger]);

  return { isVisible, scrollToTop };
};

export default useScrollToTop;
