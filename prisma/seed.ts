const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.appSettings.upsert({
    where: { key: 'ai_kill_switch' },
    update: {},
    create: { key: 'ai_kill_switch', value: 'false' },
  });

  console.log('Seed: App settings initialized.');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
