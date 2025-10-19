import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSuggestion: (suggestion: string) => void;
}

const suggestions = {
  "Estilos de Arte": [
    'Estilo cinematográfico', 'Pintura a óleo', 'Arte digital', 'Fotorrealismo', 'Arte abstrata',
    'Estilo de anime/mangá', 'Aquarela', 'Minimalista', 'Vitoriano'
  ],
  "Iluminação": [
    'Iluminação dramática', 'Luz suave e difusa', 'Alto contraste', 'Neon brilhante',
    'Silhueta ao pôr do sol', 'Luz de velas', 'Misteriosa luz da lua'
  ],
  "Atmosfera": [
    'Atmosfera sombria', 'Cores vibrantes', 'Onírico e surreal', 'Misterioso e enevoado',
    'Épico e grandioso', 'Pacífico e sereno', 'Futurista e tecnológico'
  ],
  "Composição": [
    'Close-up em um objeto', 'Paisagem ampla', 'Retrato do personagem',
    'Cena de ação', 'Simetria', 'Vista de baixo para cima'
  ]
};

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, onSelectSuggestion }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-title text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            Dicas da BookCoverPro AI
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors" aria-label="Fechar modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-slate-400 mb-6">
          Clique em uma sugestão para adicioná-la à sua descrição. Combinar diferentes termos pode gerar resultados mais criativos e precisos!
        </p>
        
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {Object.entries(suggestions).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-slate-300 mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => onSelectSuggestion(suggestion)}
                    className="bg-slate-700 hover:bg-indigo-600 text-slate-200 text-sm font-medium py-1.5 px-3 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;