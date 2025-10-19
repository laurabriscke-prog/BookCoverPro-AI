
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a safeguard; the environment is expected to provide the key.
  console.error("Chave da API do Gemini não encontrada. Verifique as variáveis de ambiente.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function generateBookCoverImage(
  title: string,
  author: string,
  prompt: string
): Promise<string> {
  try {
    // Construct a more detailed prompt for better results
    const fullPrompt = `Capa de livro de alta qualidade e profissional para um livro intitulado "${title}" do autor "${author}". A arte da capa deve ser uma obra-prima visualmente deslumbrante que retrate: ${prompt}. A imagem não deve conter nenhum texto. Concentre-se em criar um visual atraente que capture a essência da descrição. Estilo de arte cinematográfica, iluminação dramática.`;

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '3:4', // Common aspect ratio for book covers
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("Nenhuma imagem foi gerada. A resposta da API pode estar vazia.");
    }
  } catch (error) {
    console.error("Erro ao gerar a imagem da capa do livro:", error);
    // Provide a more user-friendly error message
    throw new Error("Falha ao se comunicar com a API do Gemini. Verifique o console para mais detalhes.");
  }
}
