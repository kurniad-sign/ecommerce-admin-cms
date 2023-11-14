import { Loader2 } from 'lucide-react';

export default function StoresLoading() {
  return (
    <div className="h-full flex-auto flex items-center justify-center">
      <Loader2 className="w-16 h-16 animate-spin repeat-infinite" />
    </div>
  );
}
