import React, { useState } from 'react';
import type { BookData } from './types';
import { generateBookCoverImage } from './services/geminiService';
import Header from './components/Header';
import GeneratorForm from './components/GeneratorForm';
import BookCover from './components/BookCover';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (title: string, author: string, prompt: string) => {
    setIsLoading(true);
    setError(null);
    setBookData(null);

    try {
      const imageUrl = await generateBookCoverImage(title, author, prompt);
      setBookData({ title, author, imageUrl });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800">
      <Header />
      <main className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-slate-900/50 p-8 rounded-2xl shadow-2xl border border-slate-700">
            <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          <div className="flex flex-col items-center justify-center h-full">
            {isLoading && (
              <div className="flex flex-col items-center justify-center w-full h-full p-8 bg-slate-900/50 rounded-2xl shadow-2xl border border-slate-700 aspect-[3/4] max-w-md mx-auto">
                <LoadingSpinner />
                <p className="mt-4 text-slate-300 animate-pulse">Gerando sua capa... isso pode levar um minuto.</p>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center w-full p-8 bg-red-900/50 border border-red-700 text-red-300 rounded-2xl aspect-[3/4] max-w-md mx-auto">
                <div className="text-center">
                  <p className="font-bold">Erro!</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {!isLoading && !error && bookData && (
              <BookCover 
                title={bookData.title}
                author={bookData.author}
                imageUrl={bookData.imageUrl}
              />
            )}

            {!isLoading && !error && !bookData && (
               <div className="flex flex-col items-center justify-center text-center w-full p-8 bg-slate-900/50 rounded-2xl shadow-2xl border border-dashed border-slate-700 aspect-[3/4] max-w-md mx-auto">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7v1.5C4 8.88 7.582 10.5 12 10.5s8-1.62 8-3V7" />
                 </svg>
                 <h3 className="text-xl font-bold text-slate-300">Sua capa aparecerá aqui</h3>
                 <p className="text-slate-400 mt-2">Preencha o formulário e dê vida à sua imaginação.</p>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;