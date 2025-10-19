
import React from 'react';

interface BookCoverProps {
  imageUrl: string;
  title: string;
  author: string;
}

const BookCover: React.FC<BookCoverProps> = ({ imageUrl, title, author }) => {
    
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `capa_${safeTitle}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="relative w-full aspect-[3/4] rounded-lg shadow-2xl shadow-black/50 overflow-hidden group">
        <img
          src={imageUrl}
          alt={`Capa do livro: ${title}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
          <h2 className="font-title text-3xl lg:text-4xl text-white font-bold drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
            {title}
          </h2>
          <p className="text-lg text-white/90 mt-2 drop-shadow-md" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
            {author}
          </p>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 shadow-lg shadow-purple-900/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Baixar Capa
      </button>
    </div>
  );
};

export default BookCover;
