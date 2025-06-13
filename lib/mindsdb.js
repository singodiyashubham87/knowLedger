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

// [40 pts] Build an app with KBs
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

export const db = await MindsDB.Databases.getDatabase('pg_datasource');

// [10 pts] Use metadata columns
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
}

// Your app uses 🔗 CREATE INDEX ON KNOWLEDGE_BASE
export const createKBIndex = async () => {
    await MindsDB.SQL.runQuery(`CREATE INDEX ON interview_kb;`);
}

// Your app ingests data using 🔗 INSERT INTO knowledge_base
export const insertIntoKnowledgeBase = async () => {
    await MindsDB.SQL.runQuery(`
        INSERT INTO interview_kb
        SELECT * FROM questions;
    `);
}

// Your app retrieves relevant data based on semantic queries 🔗 SELECT ... FROM ... WHERE content LIKE '<query>'
export const queryKnowledgeBase = async (query) => {
    const result = await MindsDB.SQL.runQuery(`
        SELECT * FROM interview_kb
        WHERE content LIKE '${query}'
        AND tags = 'JavaScript';
    `);
    return result;
}

// [10 pts] Integrate JOBS
export const createKBJob = async () => {
    await MindsDB.SQL.runQuery(`
        CREATE JOB refresh_kb
        FROM pg_datasource
        SELECT * FROM questions
        INSERT INTO interview_kb;
    `);
}

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

// [10 pts] Integrate with AI Tables or Agents
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

export const querySummarizedAnswers = async () => {
    const result = await MindsDB.SQL.runQuery(`
        SELECT answer_summary FROM summarize_answers;
    `);

    return result;
};

// [40 pts] Build an app with KBs
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
