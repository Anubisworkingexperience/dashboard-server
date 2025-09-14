# dashboard-server

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


