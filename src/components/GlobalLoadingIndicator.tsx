import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { useRouter } from 'next/router';

const GlobalLoadingIndicator = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
    setProgress(0);
    const interval = setInterval(async () => {
      if (progress < 100) {
        await delay(12000);
        setProgress((prev) => prev + 10);
      } else {
        clearInterval(interval);
      }
    }, 12000)
    const handleComplete = () => {
      setLoading(false);
      setProgress(100);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="loading-indicator">
      <Loading progress={progress}/>
    </div>
  );
};

export default GlobalLoadingIndicator;