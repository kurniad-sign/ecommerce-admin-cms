'use client';

import { useParams } from 'next/navigation';
import { useOrigin } from '@/hooks/use-origin';

import { ApiAlert } from '@/components/api-alert';
import { Card, CardContent } from '@/components/ui/card';

export function SettingsApi() {
  const params = useParams();
  const origin = useOrigin();

  return (
    <Card>
      <CardContent className="pt-6 flex gap-6">
        <div className="flex-grow basis-1/2 space-y-1">
          <h3 className="text-xl font-general-sans font-medium">API</h3>
          <p className="text-sm text-muted-foreground">
            Your store API for integration to your store or to test it.
          </p>
        </div>
        <div className="flex-grow basis-1/2 space-y-1">
          <ApiAlert
            title="test"
            description={`${origin}/api/${params.storeId}`}
            variant="public"
          />
        </div>
      </CardContent>
    </Card>
  );
}
