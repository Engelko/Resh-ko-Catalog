import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const categories = [
    { name: 'Профили', slug: 'profiles' },
    { name: 'Ручки', slug: 'handles' },
    { name: 'Замки', slug: 'locks' },
    { name: 'Углы', slug: 'corners' },
    { name: 'Петли', slug: 'hinges' },
    { name: 'Колеса', slug: 'wheels' },
  ]

  const createdCategories = []
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat })
    createdCategories.push(created)
  }

  const profilesCat = createdCategories.find((c) => c.slug === 'profiles')!
  const handlesCat = createdCategories.find((c) => c.slug === 'handles')!
  const locksCat = createdCategories.find((c) => c.slug === 'locks')!
  const cornersCat = createdCategories.find((c) => c.slug === 'corners')!

  const products = [
    {
      title: 'Алюминиевый профиль 30x30',
      slug: 'alum-profile-30x30',
      price: 1200,
      stock: 50,
      description: 'Высококачественный алюминиевый профиль для производства рэковых кейсов.',
      imageUrl: '/uploads/profile1.jpg',
      categoryId: profilesCat.id,
    },
    {
      title: 'Врезная ручка средняя',
      slug: 'recessed-handle-medium',
      price: 850,
      stock: 100,
      description: 'Надежная врезная ручка из оцинкованной стали.',
      imageUrl: '/uploads/handle1.jpg',
      categoryId: handlesCat.id,
    },
    {
      title: 'Замок-бабочка большой',
      slug: 'butterfly-latch-large',
      price: 950,
      stock: 75,
      description: 'Прочный замок-бабочка для тяжелых кофров.',
      imageUrl: '/uploads/latch1.jpg',
      categoryId: locksCat.id,
    },
    {
      title: 'Уголок усиленный',
      slug: 'corner-heavy-duty',
      price: 150,
      stock: 200,
      description: 'Угловой элемент для защиты кофров.',
      imageUrl: '/uploads/corner1.jpg',
      categoryId: cornersCat.id,
    },
  ]

  for (const prod of products) {
    await prisma.product.create({ data: prod })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
