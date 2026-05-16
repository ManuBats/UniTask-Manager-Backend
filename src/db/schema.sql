-- UniTask-Manager Database Schema for PostgreSQL
-- Execute this script to create the database tables

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cursos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    profesor VARCHAR(255),
    color VARCHAR(50) DEFAULT '#7C3AED'
);

CREATE TABLE IF NOT EXISTS actividades (
    id SERIAL PRIMARY KEY,
    id_curso INTEGER REFERENCES cursos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    tipo VARCHAR(50),
    fecha VARCHAR(50) NOT NULL,
    hora VARCHAR(50),
    prioridad INTEGER DEFAULT 0,
    descripcion TEXT,
    completada INTEGER DEFAULT 0
);
