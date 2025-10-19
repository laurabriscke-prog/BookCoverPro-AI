import React, { useState } from 'react';
import HelpModal from './HelpModal';

interface GeneratorFormProps {
  onGenerate: (title: string, author: string, prompt: string) => void;
  isLoading: boolean;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && author && prompt) {
      onGenerate(title, author, prompt);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setPrompt(prev => prev ? `${prev}, ${suggestion}` : suggestion);
    // We can keep the modal open if the user wants to add more tags
    // setIsHelpModalOpen(false); 
  };

  return (
    <>
      <HelpModal 
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        onSelectSuggestion={handleSelectSuggestion}
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
            Título do Livro
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: A Última Estrela"
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-2">
            Nome do Autor
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ex: J. K. Rowling"
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-300">
              Descrição da Capa
            </label>
            <button
              type="button"
              onClick={() => setIsHelpModalOpen(true)}
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              ✨ Ajuda com a Descrição
            </button>
          </div>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            placeholder="Descreva a arte que você imagina para a capa. Por exemplo: 'Um astronauta solitário olhando para uma nebulosa colorida de dentro de sua nave.'"
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !title || !author || !prompt}
          className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out shadow-lg shadow-indigo-900/50"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Gerando...
            </>
          ) : 'Gerar Capa Mágica'}
        </button>
      </form>
    </>
  );
};

export default GeneratorForm;