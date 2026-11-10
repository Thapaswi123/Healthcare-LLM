
create table users(id serial primary key, username text, password text, role text);
create table claims(id serial primary key, patient_name text, cpt text, icd text, amount numeric, status text);
create table audit_logs(id serial primary key, action text, claim_id int, timestamp timestamp default now());
