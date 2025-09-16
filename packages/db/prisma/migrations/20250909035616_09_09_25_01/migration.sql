/*
  Warnings:

  - The primary key for the `pengumuman` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `konten` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `pengumuman` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `sidang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `catatanAdmin` on the `sidang` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `sidang` table. All the data in the column will be lost.
  - You are about to drop the column `hasil` on the `sidang` table. All the data in the column will be lost.
  - You are about to drop the column `jenis` on the `sidang` table. All the data in the column will be lost.
  - You are about to drop the column `ruangan` on the `sidang` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `sidang` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `sidang` table. All the data in the column will be lost.
  - You are about to drop the column `tugasAkhirId` on the `sidang` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sidang` table. All the data in the column will be lost.
  - You are about to drop the column `waktuMulai` on the `sidang` table. All the data in the column will be lost.
  - You are about to drop the column `waktuSelesai` on the `sidang` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `sidang` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `bimbingan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `catatanbimbingan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dosenontugasakhir` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fileupload` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profilemahasiswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tugasakhir` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pendaftaran_sidang_id]` on the table `sidang` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `audiens` to the `pengumuman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dibuat_oleh` to the `pengumuman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isi` to the `pengumuman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_dibuat` to the `pengumuman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `pengumuman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_sidang` to the `sidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tugas_akhir_id` to the `sidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sidang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bimbingan` DROP FOREIGN KEY `Bimbingan_dosenId_fkey`;

-- DropForeignKey
ALTER TABLE `bimbingan` DROP FOREIGN KEY `Bimbingan_tugasAkhirId_fkey`;

-- DropForeignKey
ALTER TABLE `catatanbimbingan` DROP FOREIGN KEY `CatatanBimbingan_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `catatanbimbingan` DROP FOREIGN KEY `CatatanBimbingan_bimbinganId_fkey`;

-- DropForeignKey
ALTER TABLE `dosenontugasakhir` DROP FOREIGN KEY `DosenOnTugasAkhir_dosenId_fkey`;

-- DropForeignKey
ALTER TABLE `dosenontugasakhir` DROP FOREIGN KEY `DosenOnTugasAkhir_tugasAkhirId_fkey`;

-- DropForeignKey
ALTER TABLE `fileupload` DROP FOREIGN KEY `FileUpload_sidangId_fkey`;

-- DropForeignKey
ALTER TABLE `fileupload` DROP FOREIGN KEY `FileUpload_tugasAkhirId_fkey`;

-- DropForeignKey
ALTER TABLE `fileupload` DROP FOREIGN KEY `FileUpload_uploaderId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `profilemahasiswa` DROP FOREIGN KEY `ProfileMahasiswa_userId_fkey`;

-- DropForeignKey
ALTER TABLE `sidang` DROP FOREIGN KEY `Sidang_tugasAkhirId_fkey`;

-- DropForeignKey
ALTER TABLE `tugasakhir` DROP FOREIGN KEY `TugasAkhir_mahasiswaId_fkey`;

-- DropIndex
DROP INDEX `Sidang_tugasAkhirId_fkey` ON `sidang`;

-- AlterTable
ALTER TABLE `pengumuman` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `konten`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `audiens` ENUM('guest', 'registered_users', 'all_users', 'dosen', 'mahasiswa') NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `dibuat_oleh` INTEGER NOT NULL,
    ADD COLUMN `isi` TEXT NOT NULL,
    ADD COLUMN `tanggal_dibuat` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `sidang` DROP PRIMARY KEY,
    DROP COLUMN `catatanAdmin`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `hasil`,
    DROP COLUMN `jenis`,
    DROP COLUMN `ruangan`,
    DROP COLUMN `status`,
    DROP COLUMN `tanggal`,
    DROP COLUMN `tugasAkhirId`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `waktuMulai`,
    DROP COLUMN `waktuSelesai`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `jenis_sidang` ENUM('PROPOSAL', 'AKHIR') NOT NULL,
    ADD COLUMN `pendaftaran_sidang_id` INTEGER NULL,
    ADD COLUMN `status_hasil` ENUM('menunggu_penjadwalan', 'dijadwalkan', 'lulus', 'lulus_revisi', 'tidak_lulus') NOT NULL DEFAULT 'menunggu_penjadwalan',
    ADD COLUMN `tugas_akhir_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `bimbingan`;

-- DropTable
DROP TABLE `catatanbimbingan`;

-- DropTable
DROP TABLE `dosenontugasakhir`;

-- DropTable
DROP TABLE `fileupload`;

-- DropTable
DROP TABLE `notification`;

-- DropTable
DROP TABLE `profilemahasiswa`;

-- DropTable
DROP TABLE `tugasakhir`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `email_verified_at` DATETIME(3) NULL,
    `password` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `remember_token` VARCHAR(100) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `guard_name` VARCHAR(191) NOT NULL DEFAULT 'web',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `guard_name` VARCHAR(191) NOT NULL DEFAULT 'web',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `permissions_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mahasiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `nim` VARCHAR(191) NOT NULL,
    `prodi` ENUM('D3', 'D4') NOT NULL,
    `angkatan` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `mahasiswa_user_id_key`(`user_id`),
    UNIQUE INDEX `mahasiswa_nim_key`(`nim`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dosen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `nidn` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `dosen_user_id_key`(`user_id`),
    UNIQUE INDEX `dosen_nidn_key`(`nidn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tawaran_topik` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `judul_topik` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `kuota` INTEGER NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history_topik_mahasiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mahasiswa_id` INTEGER NOT NULL,
    `tawaran_topik_id` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tugas_akhir` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mahasiswa_id` INTEGER NOT NULL,
    `tawaran_topik_id` INTEGER NULL,
    `judul` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'DIAJUKAN', 'DISETUJUI', 'REVISI', 'MENUNGGU_PEMBATALAN', 'DIBATALKAN', 'LULUS_TANPA_REVISI', 'LULUS_DENGAN_REVISI', 'SELESAI', 'DITOLAK') NOT NULL DEFAULT 'DRAFT',
    `tanggal_pengajuan` DATETIME(3) NULL,
    `tanggal_mulai` DATETIME(3) NULL,
    `tanggal_selesai` DATETIME(3) NULL,
    `tanggal_disetujui` DATETIME(3) NULL,
    `disetujui_oleh` INTEGER NULL,
    `tanggal_ditolak` DATETIME(3) NULL,
    `ditolak_oleh` INTEGER NULL,
    `alasan_penolakan` TEXT NULL,
    `similarity_score` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tugas_akhir_mahasiswa_id_key`(`mahasiswa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peran_dosen_ta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tugas_akhir_id` INTEGER NOT NULL,
    `dosen_id` INTEGER NOT NULL,
    `peran` ENUM('pembimbing1', 'pembimbing2', 'penguji1', 'penguji2', 'penguji3', 'penguji4') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `peran_dosen_ta_tugas_akhir_id_peran_key`(`tugas_akhir_id`, `peran`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bimbingan_ta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tugas_akhir_id` INTEGER NOT NULL,
    `dosen_id` INTEGER NOT NULL,
    `peran` VARCHAR(191) NOT NULL,
    `sesi_ke` INTEGER NULL,
    `tanggal_bimbingan` DATETIME(3) NULL,
    `jam_bimbingan` VARCHAR(191) NULL,
    `status_bimbingan` ENUM('dijadwalkan', 'ditolak', 'selesai', 'berjalan', 'diajukan', 'dibatalkan') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `catatan_bimbingan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bimbingan_ta_id` INTEGER NOT NULL,
    `catatan` TEXT NOT NULL,
    `author_type` VARCHAR(191) NOT NULL,
    `author_id_mhs` INTEGER NULL,
    `author_id_dosen` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history_perubahan_jadwal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bimbingan_ta_id` INTEGER NOT NULL,
    `mahasiswa_id` INTEGER NOT NULL,
    `tanggal_lama` DATETIME(3) NULL,
    `jam_lama` VARCHAR(191) NULL,
    `tanggal_baru` DATETIME(3) NULL,
    `jam_baru` VARCHAR(191) NULL,
    `alasan_perubahan` TEXT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pendaftaran_sidang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tugas_akhir_id` INTEGER NOT NULL,
    `status_verifikasi` ENUM('menunggu_verifikasi', 'disetujui', 'ditolak', 'berkas_tidak_lengkap') NOT NULL DEFAULT 'menunggu_verifikasi',
    `status_pembimbing_1` ENUM('menunggu', 'disetujui', 'ditolak') NOT NULL DEFAULT 'menunggu',
    `status_pembimbing_2` ENUM('menunggu', 'disetujui', 'ditolak') NOT NULL DEFAULT 'menunggu',
    `catatan_admin` TEXT NULL,
    `catatan_pembimbing_1` TEXT NULL,
    `catatan_pembimbing_2` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jadwal_sidang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sidang_id` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `waktu_mulai` VARCHAR(191) NOT NULL,
    `waktu_selesai` VARCHAR(191) NOT NULL,
    `ruangan_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruangan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_ruangan` VARCHAR(191) NOT NULL,
    `lokasi` VARCHAR(191) NULL,
    `kapasitas` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nilai_sidang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sidang_id` INTEGER NOT NULL,
    `dosen_id` INTEGER NOT NULL,
    `aspek` VARCHAR(191) NOT NULL,
    `komentar` TEXT NULL,
    `skor` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokumen_ta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tugas_akhir_id` INTEGER NOT NULL,
    `tipe_dokumen` ENUM('bimbingan', 'naskah_ta', 'toeic', 'rapor', 'ijazah_slta', 'bebas_jurusan') NOT NULL,
    `status_validasi` VARCHAR(191) NOT NULL DEFAULT 'menunggu',
    `divalidasi_oleh_p1` INTEGER NULL,
    `divalidasi_oleh_p2` INTEGER NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `version` INTEGER NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_uploads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_path` VARCHAR(191) NOT NULL,
    `original_name` VARCHAR(191) NOT NULL,
    `file_type` VARCHAR(191) NOT NULL,
    `fileable_id` INTEGER NOT NULL,
    `fileable_type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `action` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(191) NULL,
    `user_agent` TEXT NULL,
    `url` TEXT NULL,
    `method` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `email_verification_tokens` (
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `email_verification_tokens_email_key`(`email`),
    UNIQUE INDEX `email_verification_tokens_token_key`(`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifikasi_ta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `tugas_akhir_id` INTEGER NOT NULL,
    `pesan` VARCHAR(191) NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoleToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoleToUser_AB_unique`(`A`, `B`),
    INDEX `_RoleToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PermissionToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissionToRole_AB_unique`(`A`, `B`),
    INDEX `_PermissionToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `sidang_pendaftaran_sidang_id_key` ON `sidang`(`pendaftaran_sidang_id`);

-- AddForeignKey
ALTER TABLE `mahasiswa` ADD CONSTRAINT `mahasiswa_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dosen` ADD CONSTRAINT `dosen_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tawaran_topik` ADD CONSTRAINT `tawaran_topik_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_topik_mahasiswa` ADD CONSTRAINT `history_topik_mahasiswa_mahasiswa_id_fkey` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_topik_mahasiswa` ADD CONSTRAINT `history_topik_mahasiswa_tawaran_topik_id_fkey` FOREIGN KEY (`tawaran_topik_id`) REFERENCES `tawaran_topik`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tugas_akhir` ADD CONSTRAINT `tugas_akhir_mahasiswa_id_fkey` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tugas_akhir` ADD CONSTRAINT `tugas_akhir_tawaran_topik_id_fkey` FOREIGN KEY (`tawaran_topik_id`) REFERENCES `tawaran_topik`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tugas_akhir` ADD CONSTRAINT `tugas_akhir_disetujui_oleh_fkey` FOREIGN KEY (`disetujui_oleh`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tugas_akhir` ADD CONSTRAINT `tugas_akhir_ditolak_oleh_fkey` FOREIGN KEY (`ditolak_oleh`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peran_dosen_ta` ADD CONSTRAINT `peran_dosen_ta_tugas_akhir_id_fkey` FOREIGN KEY (`tugas_akhir_id`) REFERENCES `tugas_akhir`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peran_dosen_ta` ADD CONSTRAINT `peran_dosen_ta_dosen_id_fkey` FOREIGN KEY (`dosen_id`) REFERENCES `dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bimbingan_ta` ADD CONSTRAINT `bimbingan_ta_tugas_akhir_id_fkey` FOREIGN KEY (`tugas_akhir_id`) REFERENCES `tugas_akhir`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bimbingan_ta` ADD CONSTRAINT `bimbingan_ta_dosen_id_fkey` FOREIGN KEY (`dosen_id`) REFERENCES `dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `catatan_bimbingan` ADD CONSTRAINT `catatan_bimbingan_bimbingan_ta_id_fkey` FOREIGN KEY (`bimbingan_ta_id`) REFERENCES `bimbingan_ta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `catatan_bimbingan` ADD CONSTRAINT `catatan_bimbingan_author_id_mhs_fkey` FOREIGN KEY (`author_id_mhs`) REFERENCES `mahasiswa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `catatan_bimbingan` ADD CONSTRAINT `catatan_bimbingan_author_id_dosen_fkey` FOREIGN KEY (`author_id_dosen`) REFERENCES `dosen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_perubahan_jadwal` ADD CONSTRAINT `history_perubahan_jadwal_bimbingan_ta_id_fkey` FOREIGN KEY (`bimbingan_ta_id`) REFERENCES `bimbingan_ta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_perubahan_jadwal` ADD CONSTRAINT `history_perubahan_jadwal_mahasiswa_id_fkey` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pendaftaran_sidang` ADD CONSTRAINT `pendaftaran_sidang_tugas_akhir_id_fkey` FOREIGN KEY (`tugas_akhir_id`) REFERENCES `tugas_akhir`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sidang` ADD CONSTRAINT `sidang_tugas_akhir_id_fkey` FOREIGN KEY (`tugas_akhir_id`) REFERENCES `tugas_akhir`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sidang` ADD CONSTRAINT `sidang_pendaftaran_sidang_id_fkey` FOREIGN KEY (`pendaftaran_sidang_id`) REFERENCES `pendaftaran_sidang`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_sidang` ADD CONSTRAINT `jadwal_sidang_sidang_id_fkey` FOREIGN KEY (`sidang_id`) REFERENCES `sidang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_sidang` ADD CONSTRAINT `jadwal_sidang_ruangan_id_fkey` FOREIGN KEY (`ruangan_id`) REFERENCES `ruangan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nilai_sidang` ADD CONSTRAINT `nilai_sidang_sidang_id_fkey` FOREIGN KEY (`sidang_id`) REFERENCES `sidang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nilai_sidang` ADD CONSTRAINT `nilai_sidang_dosen_id_fkey` FOREIGN KEY (`dosen_id`) REFERENCES `dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumen_ta` ADD CONSTRAINT `dokumen_ta_tugas_akhir_id_fkey` FOREIGN KEY (`tugas_akhir_id`) REFERENCES `tugas_akhir`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumen_ta` ADD CONSTRAINT `dokumen_ta_divalidasi_oleh_p1_fkey` FOREIGN KEY (`divalidasi_oleh_p1`) REFERENCES `dosen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumen_ta` ADD CONSTRAINT `dokumen_ta_divalidasi_oleh_p2_fkey` FOREIGN KEY (`divalidasi_oleh_p2`) REFERENCES `dosen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_uploads` ADD CONSTRAINT `fk_file_uploads_pendaftaran_sidang` FOREIGN KEY (`fileable_id`) REFERENCES `pendaftaran_sidang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_uploads` ADD CONSTRAINT `fk_file_uploads_dokumen_ta` FOREIGN KEY (`fileable_id`) REFERENCES `dokumen_ta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengumuman` ADD CONSTRAINT `pengumuman_dibuat_oleh_fkey` FOREIGN KEY (`dibuat_oleh`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `email_verification_tokens` ADD CONSTRAINT `email_verification_tokens_email_fkey` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifikasi_ta` ADD CONSTRAINT `notifikasi_ta_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifikasi_ta` ADD CONSTRAINT `notifikasi_ta_tugas_akhir_id_fkey` FOREIGN KEY (`tugas_akhir_id`) REFERENCES `tugas_akhir`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
