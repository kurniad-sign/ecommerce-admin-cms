import { FormStoreSchemaType } from '@/lib/form-schema/store-schema';

export async function createStore(
  url: string,
  { arg }: { arg: FormStoreSchemaType }
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}
