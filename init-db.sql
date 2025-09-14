CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  revenue NUMERIC(20, 2) DEFAULT 0 NOT NULL,
  founded_date DATE NOT NULL,
  employee_count INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  hired_date DATE NOT NULL,
  age INTEGER NOT NULL,
  salary NUMERIC(14, 2) DEFAULT 0 NOT NULL,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE
);

INSERT INTO companies (name, revenue, founded_date, employee_count) VALUES 
  ('Yandex', 1100000.00, '1997-01-01', 2),  
  ('Kaspersky Lab', 49.00, '1997-01-01', 1),  
  ('VK', 119.00, '2018-11-20', 1),  
  ('SberTech', 21.84, '2018-01-01', 1),  
  ('MTS Web Services', 271.20, '2000-01-01', 1),  
  ('T1', 274.90, '2003-01-01', 1),  
  ('ICS Holding', 264.67, '2010-01-01', 1),   
  ('Tinkoff Development Center', 32.93, '2006-01-01', 1),  
  ('Positive Technologies', 25.09, '2002-01-01', 2); 

INSERT INTO employees (full_name, hired_date, age, salary, company_id) VALUES
  ('Ivan Petrov', '2020-03-15', 32, 85000.00, 1),
  ('Maria Ivanova', '2019-07-22', 28, 92000.00, 1),
  ('Sergei Smirnov', '2021-01-10', 35, 78000.00, 2),
  ('Ekaterina Volkova', '2018-05-30', 31, 110000.00, 3),
  ('Dmitry Sokolov', '2022-02-14', 29, 65000.00, 4),
  ('Olga Kuznetsova', '2020-11-05', 33, 95000.00, 5),
  ('Alexei Popov', '2019-09-18', 42, 125000.00, 6),
  ('Natalia Fedorova', '2021-06-25', 26, 72000.00, 7),
  ('Mikhail Orlov', '2018-12-01', 38, 105000.00, 8),
  ('Anna Nikolaeva', '2022-03-08', 30, 88000.00, 9),
  ('Galina Alexandrova', '2022-03-08', 30, 88000.00, 9);

UPDATE companies SET employee_count = sub.cnt
FROM (SELECT company_id, COUNT(*) AS cnt FROM employees GROUP BY company_id) AS sub
WHERE companies.id = sub.company_id;

SELECT * FROM companies;
SELECT * FROM employees;
