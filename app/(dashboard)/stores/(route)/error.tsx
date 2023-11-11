'use client';

// Error components must be Client Components
import { useEffect } from 'react';

import { FaceFrown } from '@/components/icon/face-frown';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-auto h-full">
      <div className="lg:max-w-[1024px] px-8 lg:px-0 mx-auto py-16 flex flex-col justify-center items-center gap-6">
        <FaceFrown />
        <h2 className="text-4xl font-general-sans font-semibold tracking-wide">
          Oops, Something when wrong.
        </h2>
        <p>Click button bellow to try again.</p>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}
