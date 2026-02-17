// ==========================================
// CONFIGURAÇÃO DO MONGODB
// ==========================================

import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

/**
 * Conecta ao MongoDB Atlas e retorna a conexão cacheada
 * Usa connection pooling para performance
 */
export async function connectToDatabase() {
    // Se já existe conexão, reutiliza
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    // Valida variável de ambiente
    if (!process.env.MONGODB_URI) {
        throw new Error(
            'MONGODB_URI não configurado. ' +
            'Configure a variável de ambiente no Vercel Dashboard.'
        );
    }

    // Cria nova conexão
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        maxPoolSize: 10, // Pool de conexões
        minPoolSize: 2,
        maxIdleTimeMS: 30000,
        serverSelectionTimeoutMS: 5000,
        tls: true,
        tlsAllowInvalidCertificates: false,
    });

    const db = client.db('fintech'); // Nome do banco de dados

    // Cacheia para próximas requisições
    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

/**
 * Retorna a collection de dados financeiros
 */
export async function getFinanceCollection() {
    const { db } = await connectToDatabase();
    return db.collection('finance_data');
}

/**
 * Inicializa dados padrão se não existirem
 */
export async function initializeDefaultData(userId = 'default') {
    const collection = await getFinanceCollection();

    // Verifica se já existem dados para este usuário
    const existing = await collection.findOne({ userId });

    if (!existing) {
        const defaultData = {
            userId,
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
            reservaAcumulada: 0,
            createdAt: new Date(),
            lastUpdated: new Date()
        };

        await collection.insertOne(defaultData);
        return defaultData;
    }

    return existing;
}

/**
 * Salva ou atualiza dados financeiros
 */
export async function saveFinanceData(data, userId = 'default') {
    const collection = await getFinanceCollection();

    const financeData = {
        ...data,
        userId,
        lastUpdated: new Date()
    };

    // Upsert: atualiza se existe, cria se não existe
    const result = await collection.updateOne(
        { userId },
        { $set: financeData },
        { upsert: true }
    );

    return result;
}

/**
 * Carrega dados financeiros
 */
export async function loadFinanceData(userId = 'default') {
    const collection = await getFinanceCollection();

    let data = await collection.findOne({ userId });

    // Se não existe, inicializa com dados padrão
    if (!data) {
        data = await initializeDefaultData(userId);
    }

    // Remove o _id do MongoDB antes de retornar
    const { _id, ...dataWithoutId } = data;

    return dataWithoutId;
}

/**
 * Cria índices para performance
 */
export async function createIndexes() {
    const collection = await getFinanceCollection();

    // Índice no userId para busca rápida
    await collection.createIndex({ userId: 1 }, { unique: true });

    // Índice para lastUpdated (útil para queries por data)
    await collection.createIndex({ lastUpdated: -1 });
}
