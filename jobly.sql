\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE jobly-final;
CREATE DATABASE jobly-final;
\connect jobly-final

\i jobly-schema.sql
\i jobly-seed.sql

\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE jobly-final_test;
CREATE DATABASE jobly-final_test;
\connect jobly-final_test

\i jobly-schema.sql
