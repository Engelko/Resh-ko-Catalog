import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const placeholderSvg = (text: string) => `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f1f5f9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="%2394a3b8">${encodeURIComponent(text)}</text></svg>`;

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // Categories
  const categories = [
    { name: 'Замки', slug: 'zamki' },
    { name: 'Колеса', slug: 'kolesa' },
    { name: 'Петли', slug: 'petli' },
    { name: 'Профили', slug: 'profili' },
    { name: 'Ручки', slug: 'ruchki' },
    { name: 'Углы', slug: 'ugly' },
  ];

  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }

  const catMap = await prisma.category.findMany();
  const getCatId = (slug: string) => catMap.find(c => c.slug === slug)?.id || '';

  // Products
  const products = [
    {
      title: 'Замок-бабочка большой',
      slug: 'zamok-babochka-bolshoy',
      price: 950,
      stock: 50,
      description: 'Врезной замок-бабочка в глубокой чашке. Оцинкованная сталь. Идеально для тяжелых кейсов.',
      imageUrl: placeholderSvg('Замок'),
      categoryId: getCatId('zamki'),
    },
    {
      title: 'Алюминиевый профиль 30x30',
      slug: 'alyuminievyy-profil-30x30',
      price: 1200,
      stock: 100,
      description: 'L-образный алюминиевый профиль для окантовки кейсов. Длина 3 метра.',
      imageUrl: placeholderSvg('Профиль'),
      categoryId: getCatId('profili'),
    },
    {
      title: 'Врезная ручка средняя',
      slug: 'vreznaya-ruchka-srednyaya',
      price: 850,
      stock: 30,
      description: 'Подпружиненная ручка в чашке. Грузоподъемность до 50 кг.',
      imageUrl: placeholderSvg('Ручка'),
      categoryId: getCatId('ruchki'),
    },
    {
      title: 'Уголок усиленный',
      slug: 'ugolok-usilennyy',
      price: 150,
      stock: 200,
      description: 'Стальной трехопорный уголок (шар). Хромированное покрытие.',
      imageUrl: placeholderSvg('Уголок'),
      categoryId: getCatId('ugly'),
    },
  ];

  for (const prod of products) {
    await prisma.product.create({ data: prod });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
