// ==========================================
// API BACKEND - FINTECH
// Vercel Serverless Function com MongoDB Atlas
// ==========================================

import { loadFinanceData, saveFinanceData, createIndexes } from './db.js';

// Handler principal da API
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // Cria índices na primeira execução (otimização)
        await createIndexes().catch(err => console.log('Índices já existem'));

        // GET - Retorna todos os dados do MongoDB
        if (req.method === 'GET') {
            const data = await loadFinanceData('default');

            return res.status(200).json({
                success: true,
                data,
                timestamp: new Date().toISOString(),
                source: 'mongodb'
            });
        }

        // POST - Salva todos os dados no MongoDB
        if (req.method === 'POST') {
            const { entradas, despesasFixas, despesasVariaveis, capitalDisponivel, reservaAcumulada } = req.body;

            // Valida dados recebidos
            if (!Array.isArray(entradas) || !Array.isArray(despesasFixas) || !Array.isArray(despesasVariaveis)) {
                return res.status(400).json({
                    success: false,
                    error: 'Dados inválidos. Esperado arrays para entradas, despesasFixas e despesasVariaveis'
                });
            }

            if (typeof capitalDisponivel !== 'number' || typeof reservaAcumulada !== 'number') {
                return res.status(400).json({
                    success: false,
                    error: 'Dados inválidos. capitalDisponivel e reservaAcumulada devem ser números'
                });
            }

            // Salva no MongoDB
            const financeData = {
                entradas,
                despesasFixas,
                despesasVariaveis,
                capitalDisponivel,
                reservaAcumulada
            };

            await saveFinanceData(financeData, 'default');

            return res.status(200).json({
                success: true,
                message: 'Dados salvos com sucesso no MongoDB',
                timestamp: new Date().toISOString(),
                source: 'mongodb'
            });
        }

        // Método não permitido
        return res.status(405).json({
            success: false,
            error: 'Método não permitido'
        });

    } catch (error) {
        console.error('Erro na API:', error);

        // Mensagem específica para erro de conexão MongoDB
        if (error.message.includes('MONGODB_URI')) {
            return res.status(500).json({
                success: false,
                error: 'Erro de configuração do banco de dados',
                message: 'MONGODB_URI não configurado. Configure no Vercel Dashboard.',
                hint: 'Vá em: Vercel Dashboard > Settings > Environment Variables'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Erro interno do servidor',
            message: error.message
        });
    }
}
