import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { getQuotes } from '~/services/getQuotes';
import type { V2_MetaFunction } from '@remix-run/node';
import type { Quote } from '~/models/Quote';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }];
};

interface PageProps {
  quotes: Quote[];
}

export const loader = async () => {
  const quotes = await getQuotes();
  return json<PageProps>({
    quotes,
  });
};

export default function Index() {
  const { quotes } = useLoaderData<typeof loader>();

  const { t } = useTranslation(['ns1']);

  return (
    <div>
      <h1>{t('ns1:greeting', { name: 'Tuong' })}</h1>
      <div className="grid grid-cols-1 lg:grid-flow-row lg:grid-cols-3">
        {quotes.map((q, i) => {
          const { quote, by } = q;
          return (
            <figure key={i} className="m-4 px-4 py-10 shadow-md shadow-sky-100">
              <blockquote cite="https://wisdomman.com" className="py-3">
                <p className="text-xl  text-gray-800">{quote}</p>
              </blockquote>
              <figcaption>
                <cite className="mb-4 text-right text-sm text-gray-600">- {by}</cite>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
