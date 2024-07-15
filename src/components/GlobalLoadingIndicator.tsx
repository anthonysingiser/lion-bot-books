// components/GlobalLoadingIndicator.tsx
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { useRouter } from 'next/router';

const GlobalLoadingIndicator = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = () => setLoading(false);

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
      <Loading />
    </div>
  );
};

export default GlobalLoadingIndicator;