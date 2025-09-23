import { PrismaClient, AudiensPengumuman } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding announcements...');

  // Find the admin user to be the author of the announcements
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@sita.bi' },
  });

  if (!adminUser) {
    console.error('Admin user not found. Please seed the admin user first by running `pnpm db:seed:admin`');
    return;
  }

  const announcements = [];
  const audienceValues = Object.values(AudiensPengumuman);

  for (let i = 0; i < 500; i++) {
    const judul = faker.lorem.sentence();
    const isi = faker.lorem.paragraphs(3);
    const audiens = faker.helpers.arrayElement(audienceValues);
    const tanggal_dibuat = faker.date.past({ years: 2 });

    announcements.push({
      judul,
      isi,
      audiens,
      dibuat_oleh: adminUser.id,
      tanggal_dibuat,
    });
  }

  // Use createMany for efficient bulk insertion
  const result = await prisma.pengumuman.createMany({
    data: announcements,
    skipDuplicates: true, // Skip if any announcement with the same unique fields already exists
  });

  console.log(`Seeding finished. ${result.count} announcements created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });