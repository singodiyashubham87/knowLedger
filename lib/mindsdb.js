'use server'

import { toast } from '@/hooks/use-toast';
import MindsDB from 'mindsdb-js-sdk';

const connectionParams = {
    'user': process.env.PG_USER,
    'port': process.env.PG_PORT,
    'password': process.env.PG_PASSWORD,
    'host': process.env.PG_HOST,
    'database': process.env.PG_DB,
}

// Initialize MindsDB
const initMindsDB = async () => {
    try {
        await MindsDB.connect({
            host: process.env.MINDSDB_HOST || 'http://127.0.0.1:47334'
        });
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
}

// Connect to Data-Source
const connectDataSource = async (dataSourceName) => {
    try {
        const db = await MindsDB.Databases.createDatabase(
            'pg_datasource',
            'postgres',
            connectionParams);

        toast({
            title: 'Connected to MindsDB',
            description: `Data source ${dataSourceName} connected successfully.`,
        });
    } catch (error) {
        toast({
            title: 'Error connecting to MindsDB',
            description: error.message,
            variant: 'destructive',
        })
    }
};

// Export data source instance
export const db = await MindsDB.Databases.getDatabase('pg_datasource');

// Create a knowledge base
export const createKnowledgeBase = async () => {
    try {
        await MindsDB.SQL.runQuery(`
            CREATE KNOWLEDGE_BASE interview_kb
            USING
            embedding_model = {
                "provider": "${process.env.EMBEDDING_PROVIDER}",
                "model_name" : "${process.env.EMBEDDING_MODEL_NAME}",
                "api_key": "${process.env.EMBEDDING_API_KEY}"
            },
            reranking_model = {
                "provider": "openai",
                "model_name": "${process.env.OPEN_AI_MODEL}",
                "api_key": "${process.env.OPEN_AI_API_KEY}"
            },
            metadata_columns = ['tags'],
            content_columns = ['question', 'answer'],
            id_column = 'id';`)
    } catch (error) {
        toast({
            title: 'Error creating Knowledge Base',
            description: error.message,
            variant: 'destructive',
        });
    }
};

// Create Index
export const createKBIndex = async () => {
    await MindsDB.SQL.runQuery(`CREATE INDEX ON interview_kb;`);
}


// Insert into KB
export const insertIntoKnowledgeBase = async () => {
    await MindsDB.SQL.runQuery(`
        INSERT INTO interview_kb
        SELECT * FROM questions;
    `);
}

// Query KB
export const queryKnowledgeBase = async (query) => {
    const result = await MindsDB.SQL.runQuery(`
        SELECT * FROM interview_kb
        WHERE content LIKE '${query}'
        AND tags = 'JavaScript';
    `);
    return result;
}

// Create Job to Sync data from Data-Source periodically
export const createKBJob = async () => {
    await MindsDB.SQL.runQuery(`
        CREATE JOB refresh_kb
        FROM pg_datasource
        SELECT * FROM questions
        INSERT INTO interview_kb;
    `);
}

// Query KB with filter for specific tag interview questions
export const queryKnowledgeBaseWithFilter = async (query, tag) => {
    try {
        const result = await MindsDB.SQL.runQuery(`
            SELECT * FROM interview_kb
            WHERE content LIKE '${query}'
            AND tags = '${tag}';
        `);

        return result;
    } catch (error) {
        toast({
            title: 'Query Error',
            description: error.message,
            variant: 'destructive',
        });
    }
};

// Ai Table Integration
export const createAITableFromKB = async () => {
    try {
        await MindsDB.SQL.runQuery(`
            CREATE MODEL summarize_answers
            PREDICT answer_summary
            USING
                engine = 'openai',
                prompt_template = 'Summarize this answer: {{answer}}',
                input_table = (SELECT answer FROM interview_kb);
        `);

        toast({
            title: 'AI Table Created',
            description: 'Summarization model created from KB results.',
        });
    } catch (error) {
        toast({
            title: 'Error creating AI Table',
            description: error.message,
            variant: 'destructive',
        });
    }
};

// To query the summarizer
export const querySummarizedAnswers = async () => {
    const result = await MindsDB.SQL.runQuery(`
        SELECT answer_summary FROM summarize_answers;
    `);

    return result;
};


// Invoke methods to connect, create & query KB
(async () => {
    await initMindsDB();
    await connectDataSource('pg_datasource');

    await createKnowledgeBase();
    await createKBIndex();
    await insertIntoKnowledgeBase();
    await createKBJob();
    await createAITableFromKB();

    toast({
        title: 'success',
        description: 'MindsDB setup complete!'
    })
})();
