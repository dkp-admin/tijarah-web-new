import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ReportingHourCreate = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/account');
  }, [router]);
  return null;
};

export default ReportingHourCreate;
