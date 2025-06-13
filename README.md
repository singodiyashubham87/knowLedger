# KnowLedger: AI-Powered Interview Q&A with MindsDB

KnowLedger is a semantic Q&A assistant powered by MindsDB’s Knowledge Bases (KB), AI Tables, and PostgreSQL as a data source. It allows smart querying, automatic syncing, summarization, and more.

---

## 💪 Tech Stack

- **Frontend**: Next.js (App Router)
- **Backend**: MindsDB SDK (server actions)
- **Database**: PostgreSQL
- **ML Integration**: MindsDB Knowledge Bases + AI Tables
- **UI**: shadcn/ui + TailwindCSS

---

## ⚙️ Setup

### 1. Clone & Install

```bash
git clone https://github.com/<your-repo>/knowLedger.git
cd knowLedger
yarn install
```

### 2. Environment Variables

Create a `.env` file:

```env
PG_USER=your_pg_user
PG_PASSWORD=your_pg_password
PG_HOST=your_pg_host
PG_PORT=your_pg_port
PG_DB=your_pg_database

MINDSDB_HOST=http://127.0.0.1:47334

EMBEDDING_PROVIDER=openai
EMBEDDING_MODEL_NAME=text-embedding-ada-002
EMBEDDING_API_KEY=your_openai_key

OPEN_AI_MODEL=gpt-3.5-turbo
OPEN_AI_API_KEY=your_openai_key
```

---

## 🧠 MindsDB Flow

### ✅ Initialization Flow

1. Connect to MindsDB
2. Connect PostgreSQL as data source
3. Create Knowledge Base `interview_kb`
4. Index the KB for fast semantic queries
5. Insert data from `questions` table
6. Create a JOB to keep syncing new data
7. Create an AI Table to summarize answers
8. Run queries (semantic + metadata-based)

---

## 📂 Project Structure

```
/app
  /kb
    mindsdb-setup.ts (all server actions)
```

---

## 🛆 Scripts

```bash
yarn dev        # Run dev server
yarn build      # Static export (⚠️ No server actions support)
```

---

## 🧪 Sample Queries

```ts
await queryKnowledgeBase('What is closure in JS?')
await queryKnowledgeBaseWithFilter('What is useEffect?', 'React')
await querySummarizedAnswers()
```

---

## 🧾 Features Checklist

| Feature                         | Status   |
|---------------------------------|----------|
| MindsDB connection              | ✅        |
| PostgreSQL data source          | ✅        |
| Knowledge Base setup            | ✅        |
| Metadata columns used           | ✅        |
| Sync JOB integration            | ✅        |
| AI Table summarizer             | ✅        |
| Semantic + metadata query       | ✅        |

---

## 🧠 References

- [MindsDB Docs](https://docs.mindsdb.com/)
- [Knowledge Bases Guide](https://docs.mindsdb.com/knowledge-bases/)
- [AI Tables Docs](https://docs.mindsdb.com/ai-tables/overview)