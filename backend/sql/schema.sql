-- Your schema DDL (create table statements) goes here
DROP TABLE IF EXISTS category;
CREATE TABLE category (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), parent UUID, name VARCHAR(100) NOT NULL, description TEXT, FOREIGN KEY (parent) REFERENCES category(id));

DROP TABLE IF EXISTS clubs;
CREATE TABLE clubs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), category_id UUID DEFAULT gen_random_uuid(), name VARCHAR(255) NOT NULL, description TEXT, website VARCHAR(255), social_media JSON, email VARCHAR(255), intro_survey_link VARCHAR(255));

DROP TABLE IF EXISTS textblocks;
CREATE TABLE textblocks (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), type VARCHAR(2) NOT NULL, content TEXT NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);

DROP TABLE IF EXISTS imageblocks;
CREATE TABLE imageblocks (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), height INTEGER NOT NULL, width INTEGER NOT NULL, src VARCHAR(255) NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);