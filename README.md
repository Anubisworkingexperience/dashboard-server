# dashboard-server

Дэшборд с серверной и клиентской частью 

# Запуск сервисов

1. Настройте postgreSQL локально
```bash
git clone https://github.com/Anubisworkingexperience/dashboard-server
cd dashboard-server
psql
```

```bash
CREATE DATABASE dashboard_server;
CREATE USER dashboard_user WITH PASSWORD 'dashboard_user';
GRANT ALL PRIVILEGES ON DATABASE dashboard_server TO dashboard_user;
\q
```

2. Запустите sql скрипт
```bash
psql -U dashboard_user -d dashboard_server -f init-db.sql -h localhost
```

3. Настройте env переменные
```bash
cd server
touch .env
cp .env.example .env
```

4. Запустите сервер
```bash
npm install
node app.js
```

5. Запустите клиент
```bash
cd ../client
npm install
npm run dev
```



