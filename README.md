# NextRep

### Fitness challeges webite developed as a research practice course in NaUKMA

## 🛠️ How to Use Migrations (TypeORM)

### 1. **Generate a migration**

Creates a new migration file based on changes in the provided entities.

```bash
yarn migration:generate src/database/migrations/YourMigrationName
```

> ✅ Make sure `loadDataSourceConfig()` in `data-source.ts` only includes entities you want to track.

---

### 2. **Run pending migrations**

Executes all migrations that haven't been run yet.

```bash
yarn migration:run
```

---

### 3. **Revert the last migration**

Rolls back the most recently executed migration.

```bash
yarn typeorm migration:revert -d ./src/database/data-source.ts
```

---

### 4. **Notes**

- Migrations are located in `src/database/migrations/`.
- To customize which entities are tracked for migration generation, adjust the `entities` array in `loadDataSourceConfig()`.
- Make sure your `.env` contains the correct database connection credentials.

---

## Start backend

### Install dependencies

Run command in packages/backend

```bash
yarn install
```

### Set environment

Create .env file in backend directory and fill with values e.g. .env.example

```bash
HOST=localhost
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASS=your_pg_password
POSTGRES_NAME=nextrep
```

### Start server

```bash
yarn start:dev
```
