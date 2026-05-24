-- Add id_usuario column to Curso (nullable first for backfill)
ALTER TABLE "Curso" ADD COLUMN "id_usuario" INTEGER;

-- Add id_usuario column to Actividad (nullable first for backfill)
ALTER TABLE "Actividad" ADD COLUMN "id_usuario" INTEGER;

-- Backfill existing rows with the first user (id=1)
UPDATE "Curso" SET "id_usuario" = 1 WHERE "id_usuario" IS NULL;
UPDATE "Actividad" SET "id_usuario" = 1 WHERE "id_usuario" IS NULL;

-- Make id_usuario NOT NULL
ALTER TABLE "Curso" ALTER COLUMN "id_usuario" SET NOT NULL;
ALTER TABLE "Actividad" ALTER COLUMN "id_usuario" SET NOT NULL;

-- Add foreign key constraints
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
