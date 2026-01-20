// ==========================================
// API BACKEND - FINTECH
// Vercel Serverless Function para persistência de dados
// ==========================================

// Simula um banco de dados em memória
// Em produção, você pode conectar a MongoDB, PostgreSQL, etc.
let database = {
    entradas: [],
    despesasFixas: [
        { id: 1, descricao: 'Carro', valor: 1650, vencimento: 8, pago: false },
        { id: 2, descricao: 'Internet', valor: 110, vencimento: 5, pago: false },
        { id: 3, descricao: 'Energia', valor: 300, vencimento: 20, pago: false },
        { id: 4, descricao: 'Água', valor: 80, vencimento: 20, pago: false },
        { id: 5, descricao: 'Alimentação', valor: 800, vencimento: 15, pago: false }
    ],
    despesasVariaveis: [],
    capitalDisponivel: 0,
    reservaAcumulada: 0
};

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
        // GET - Retorna todos os dados
        if (req.method === 'GET') {
            return res.status(200).json({
                success: true,
                data: database,
                timestamp: new Date().toISOString()
            });
        }

        // POST - Atualiza todos os dados
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

            // Atualiza database
            database = {
                entradas,
                despesasFixas,
                despesasVariaveis,
                capitalDisponivel,
                reservaAcumulada,
                lastUpdated: new Date().toISOString()
            };

            return res.status(200).json({
                success: true,
                message: 'Dados salvos com sucesso',
                timestamp: new Date().toISOString()
            });
        }

        // Método não permitido
        return res.status(405).json({
            success: false,
            error: 'Método não permitido'
        });

    } catch (error) {
        console.error('Erro na API:', error);
        return res.status(500).json({
            success: false,
            error: 'Erro interno do servidor',
            message: error.message
        });
    }
}
