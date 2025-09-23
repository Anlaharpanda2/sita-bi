/*
  Warnings:

  - You are about to drop the column `author_id_dosen` on the `catatan_bimbingan` table. All the data in the column will be lost.
  - You are about to drop the column `author_id_mhs` on the `catatan_bimbingan` table. All the data in the column will be lost.
  - The values [naskah_ta,toeic,rapor,ijazah_slta,bebas_jurusan] on the enum `dokumen_ta_tipe_dokumen` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `similarity_score` on the `tugas_akhir` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_disetujui` on the `tugas_akhir` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_ditolak` on the `tugas_akhir` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_mulai` on the `tugas_akhir` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_selesai` on the `tugas_akhir` table. All the data in the column will be lost.
  - You are about to drop the `file_uploads` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author_id` to the `catatan_bimbingan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `catatan_bimbingan` DROP FOREIGN KEY `catatan_bimbingan_author_id_dosen_fkey`;

-- DropForeignKey
ALTER TABLE `catatan_bimbingan` DROP FOREIGN KEY `catatan_bimbingan_author_id_mhs_fkey`;

-- DropForeignKey
ALTER TABLE `file_uploads` DROP FOREIGN KEY `fk_file_uploads_dokumen_ta`;

-- DropForeignKey
ALTER TABLE `file_uploads` DROP FOREIGN KEY `fk_file_uploads_pendaftaran_sidang`;

-- DropIndex
DROP INDEX `catatan_bimbingan_author_id_dosen_fkey` ON `catatan_bimbingan`;

-- DropIndex
DROP INDEX `catatan_bimbingan_author_id_mhs_fkey` ON `catatan_bimbingan`;

-- AlterTable
ALTER TABLE `catatan_bimbingan` DROP COLUMN `author_id_dosen`,
    DROP COLUMN `author_id_mhs`,
    ADD COLUMN `author_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dokumen_ta` MODIFY `tipe_dokumen` ENUM('bimbingan') NOT NULL;

-- AlterTable
ALTER TABLE `permissions` MODIFY `guard_name` VARCHAR(191) NOT NULL DEFAULT 'api';

-- AlterTable
ALTER TABLE `roles` MODIFY `guard_name` VARCHAR(191) NOT NULL DEFAULT 'api';

-- AlterTable
ALTER TABLE `tugas_akhir` DROP COLUMN `similarity_score`,
    DROP COLUMN `tanggal_disetujui`,
    DROP COLUMN `tanggal_ditolak`,
    DROP COLUMN `tanggal_mulai`,
    DROP COLUMN `tanggal_selesai`;

-- DropTable
DROP TABLE `file_uploads`;

-- CreateTable
CREATE TABLE `pendaftaran_sidang_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pendaftaran_sidang_id` INTEGER NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `original_name` VARCHAR(191) NOT NULL,
    `tipe_dokumen` ENUM('NASKAH_TA', 'TOEIC', 'RAPOR', 'IJAZAH_SLTA', 'BEBAS_JURUSAN') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `catatan_bimbingan` ADD CONSTRAINT `catatan_bimbingan_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pendaftaran_sidang_files` ADD CONSTRAINT `pendaftaran_sidang_files_pendaftaran_sidang_id_fkey` FOREIGN KEY (`pendaftaran_sidang_id`) REFERENCES `pendaftaran_sidang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
