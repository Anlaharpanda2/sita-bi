-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nomor_induk` VARCHAR(191) NOT NULL,
    `role` ENUM('MAHASISWA', 'DOSEN', 'KAPRODI', 'ADMIN') NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_nomor_induk_key`(`nomor_induk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileMahasiswa` (
    `id` VARCHAR(191) NOT NULL,
    `prodi` ENUM('D3', 'D4') NOT NULL,
    `angkatan` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProfileMahasiswa_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TugasAkhir` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `abstrak` TEXT NOT NULL,
    `status` ENUM('PENGAJUAN_JUDUL', 'PROSES_BIMBINGAN', 'SIAP_SIDANG_PROPOSAL', 'SIAP_SIDANG_AKHIR', 'LULUS', 'DITOLAK', 'DIBATALKAN') NOT NULL DEFAULT 'PENGAJUAN_JUDUL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `mahasiswaId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TugasAkhir_mahasiswaId_key`(`mahasiswaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DosenOnTugasAkhir` (
    `peran` ENUM('PEMBIMBING_1', 'PEMBIMBING_2', 'PENGUJI_1', 'PENGUJI_2', 'PENGUJI_3') NOT NULL,
    `dosenId` VARCHAR(191) NOT NULL,
    `tugasAkhirId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`dosenId`, `tugasAkhirId`, `peran`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sidang` (
    `id` VARCHAR(191) NOT NULL,
    `jenis` ENUM('PROPOSAL', 'AKHIR') NOT NULL,
    `status` ENUM('PENGAJUAN', 'MENUNGGU_VERIFIKASI', 'BERKAS_DITOLAK', 'DIJADWALKAN', 'SELESAI') NOT NULL DEFAULT 'PENGAJUAN',
    `tanggal` DATETIME(3) NULL,
    `waktuMulai` DATETIME(3) NULL,
    `waktuSelesai` DATETIME(3) NULL,
    `ruangan` VARCHAR(191) NULL,
    `hasil` ENUM('LULUS', 'LULUS_REVISI', 'TIDAK_LULUS') NULL,
    `catatanAdmin` TEXT NULL,
    `tugasAkhirId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bimbingan` (
    `id` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NULL,
    `topik` VARCHAR(191) NOT NULL,
    `status` ENUM('DIAJUKAN', 'DISETUJUI', 'DITOLAK', 'DIBATALKAN') NOT NULL DEFAULT 'DIAJUKAN',
    `tugasAkhirId` VARCHAR(191) NOT NULL,
    `dosenId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatatanBimbingan` (
    `id` VARCHAR(191) NOT NULL,
    `konten` TEXT NOT NULL,
    `bimbinganId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FileUpload` (
    `id` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(191) NOT NULL,
    `filePath` VARCHAR(191) NOT NULL,
    `fileType` ENUM('NASKAH_TA', 'TRANSKRIP_NILAI', 'SERTIFIKAT_TOEIC', 'IJAZAH_SLTA', 'SURAT_BEBAS_JURUSAN', 'FILE_BIMBINGAN', 'LAPORAN_PLAGIARISME', 'LAINNYA') NOT NULL,
    `uploaderId` VARCHAR(191) NOT NULL,
    `tugasAkhirId` VARCHAR(191) NULL,
    `sidangId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `FileUpload_filePath_key`(`filePath`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengumuman` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `konten` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `pesan` VARCHAR(191) NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfileMahasiswa` ADD CONSTRAINT `ProfileMahasiswa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TugasAkhir` ADD CONSTRAINT `TugasAkhir_mahasiswaId_fkey` FOREIGN KEY (`mahasiswaId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DosenOnTugasAkhir` ADD CONSTRAINT `DosenOnTugasAkhir_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DosenOnTugasAkhir` ADD CONSTRAINT `DosenOnTugasAkhir_tugasAkhirId_fkey` FOREIGN KEY (`tugasAkhirId`) REFERENCES `TugasAkhir`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sidang` ADD CONSTRAINT `Sidang_tugasAkhirId_fkey` FOREIGN KEY (`tugasAkhirId`) REFERENCES `TugasAkhir`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bimbingan` ADD CONSTRAINT `Bimbingan_tugasAkhirId_fkey` FOREIGN KEY (`tugasAkhirId`) REFERENCES `TugasAkhir`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bimbingan` ADD CONSTRAINT `Bimbingan_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatatanBimbingan` ADD CONSTRAINT `CatatanBimbingan_bimbinganId_fkey` FOREIGN KEY (`bimbinganId`) REFERENCES `Bimbingan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatatanBimbingan` ADD CONSTRAINT `CatatanBimbingan_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FileUpload` ADD CONSTRAINT `FileUpload_uploaderId_fkey` FOREIGN KEY (`uploaderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FileUpload` ADD CONSTRAINT `FileUpload_tugasAkhirId_fkey` FOREIGN KEY (`tugasAkhirId`) REFERENCES `TugasAkhir`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FileUpload` ADD CONSTRAINT `FileUpload_sidangId_fkey` FOREIGN KEY (`sidangId`) REFERENCES `Sidang`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
