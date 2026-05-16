-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "profesor" TEXT,
    "color" TEXT NOT NULL DEFAULT '#7C3AED',

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "id" SERIAL NOT NULL,
    "id_curso" INTEGER,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT,
    "fecha" TEXT NOT NULL,
    "hora" TEXT,
    "prioridad" INTEGER NOT NULL DEFAULT 0,
    "descripcion" TEXT,
    "completada" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
