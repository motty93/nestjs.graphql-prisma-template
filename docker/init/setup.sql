-- must change your name and databasename, passward.
CREATE ROLE nest_api_admin LOGIN PASSWORD 'nest_api_psql';
CREATE DATABASE nest_api_admin;
CREATE DATABASE nest_api_test;
GRANT ALL PRIVILEGES ON DATABASE nest_api_admin TO nest_api_admin;
GRANT ALL PRIVILEGES ON DATABASE nest_api_test TO nest_api_admin;
ALTER ROLE nest_api_admin WITH CREATEROLE CREATEDB SUPERUSER;
