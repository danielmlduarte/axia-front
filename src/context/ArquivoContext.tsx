import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Arquivo {
  id: string;
  file: File;
  nome: string;
  preview?: string;
}

interface ArquivoContextType {
  arquivos: Arquivo[];
  adicionarArquivos: (files: File[]) => void;
  removerArquivo: (id: string) => void;
  atualizarNome: (id: string, novoNome: string) => void;
  limparArquivos: () => void;
}

const ArquivoContext = createContext<ArquivoContextType | undefined>(undefined);

export const useArquivos = () => {
  const context = useContext(ArquivoContext);
  if (!context) throw new Error('useArquivos deve ser usado dentro de ArquivoProvider');
  return context;
};

export const ArquivoProvider = ({ children }: { children: ReactNode }) => {
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);

  const adicionarArquivos = (files: File[]) => {
    const novosArquivos: Arquivo[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      nome: file.name,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    setArquivos((prev) => [...prev, ...novosArquivos]);
  };

  const removerArquivo = (id: string) => {
    setArquivos((prev) => prev.filter((a) => a.id !== id));
  };

  const atualizarNome = (id: string, novoNome: string) => {
    setArquivos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, nome: novoNome } : a))
    );
  };

  const limparArquivos = () => setArquivos([]);

  return (
    <ArquivoContext.Provider
      value={{ arquivos, adicionarArquivos, removerArquivo, atualizarNome, limparArquivos }}
    >
      {children}
    </ArquivoContext.Provider>
  );
};
