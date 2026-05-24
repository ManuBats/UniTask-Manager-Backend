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
    "horario" TEXT,
    "descripcion" TEXT,
    "id_usuario" INTEGER NOT NULL,

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
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Curso_id_usuario_idx" ON "Curso"("id_usuario");

-- CreateIndex
CREATE INDEX "Actividad_id_usuario_idx" ON "Actividad"("id_usuario");

-- CreateIndex
CREATE INDEX "Actividad_id_curso_idx" ON "Actividad"("id_curso");

-- CreateIndex
CREATE INDEX "Actividad_fecha_idx" ON "Actividad"("fecha");

-- CreateIndex
CREATE INDEX "Actividad_completada_idx" ON "Actividad"("completada");

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
