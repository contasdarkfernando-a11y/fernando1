import React from 'react';

interface MobiReaderProps {
  file: File;
  onClose: () => void;
}

export const MobiReader: React.FC<MobiReaderProps> = ({ file, onClose }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">{file.name}</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          Fechar
        </button>
      </div>
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="mb-2">Leitor MOBI não implementado</p>
          <p className="text-sm">Este formato ainda não é suportado.</p>
        </div>
      </div>
    </div>
  );
};

export default MobiReader;