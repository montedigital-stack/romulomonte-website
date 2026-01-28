import { loadFinanceData, saveFinanceData, createIndexes } from './db.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        await createIndexes().catch(() => {});

        // GET - Retorna dados do MongoDB
        if (req.method === 'GET') {
            const data = await loadFinanceData('default');
            return res.status(200).json({
                success: true,
                data,
                timestamp: new Date().toISOString()
            });
        }

        // POST - Salva dados no MongoDB
        if (req.method === 'POST') {
            const body = req.body;

            // Aceita tanto formato novo (transacoes) quanto legado (entradas/despesas)
            const financeData = {
                transacoes: body.transacoes || [],
                categoriasCustom: body.categoriasCustom || [],
                capitalDisponivel: typeof body.capitalDisponivel === 'number' ? body.capitalDisponivel : 0,
                reservaAcumulada: typeof body.reservaAcumulada === 'number' ? body.reservaAcumulada : 0,
                // Manter legado para compatibilidade
                entradas: body.entradas || [],
                despesasFixas: body.despesasFixas || [],
                despesasVariaveis: body.despesasVariaveis || []
            };

            await saveFinanceData(financeData, 'default');

            return res.status(200).json({
                success: true,
                message: 'Dados salvos com sucesso',
                timestamp: new Date().toISOString()
            });
        }

        return res.status(405).json({ success: false, error: 'Metodo nao permitido' });

    } catch (error) {
        console.error('Erro na API:', error);

        if (error.message.includes('MONGODB_URI')) {
            return res.status(500).json({
                success: false,
                error: 'MONGODB_URI nao configurado'
            });
        }

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
