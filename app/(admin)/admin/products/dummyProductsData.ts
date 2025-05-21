import type { TableProduct } from './components/columns';

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function getProducts(): Promise<TableProduct[]> {
  return [
    {
      id: '1',
      name: 'Classic White Bread',
      price: '45.00',
      status: 'active',
      createdAt: '2024-03-15',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '2',
      name: 'Whole Grain Loaf',
      price: '55.00',
      status: 'active',
      createdAt: '2024-03-14',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '3',
      name: 'Sourdough Bread',
      price: '65.00',
      status: 'sold',
      createdAt: '2024-03-13',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '4',
      name: 'Rye Bread',
      price: '50.00',
      status: 'active',
      createdAt: '2024-03-12',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '5',
      name: 'Baguette',
      price: '35.00',
      status: 'draft',
      createdAt: '2024-03-11',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '6',
      name: 'Ciabatta',
      price: '40.00',
      status: 'active',
      createdAt: '2024-03-10',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '7',
      name: 'Multigrain Bread',
      price: '60.00',
      status: 'archived',
      createdAt: '2024-03-09',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '8',
      name: 'French Bread',
      price: '45.00',
      status: 'active',
      createdAt: '2024-03-08',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '9',
      name: 'Pumpernickel',
      price: '55.00',
      status: 'draft',
      createdAt: '2024-03-07',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '10',
      name: 'Challah Bread',
      price: '50.00',
      status: 'active',
      createdAt: '2024-03-06',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '11',
      name: 'Focaccia',
      price: '45.00',
      status: 'sold',
      createdAt: '2024-03-05',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '12',
      name: 'Brioche',
      price: '60.00',
      status: 'active',
      createdAt: '2024-03-04',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '13',
      name: 'Pita Bread',
      price: '35.00',
      status: 'draft',
      createdAt: '2024-03-03',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '14',
      name: 'Naan Bread',
      price: '40.00',
      status: 'active',
      createdAt: '2024-03-02',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '15',
      name: 'Croissant',
      price: '25.00',
      status: 'sold',
      createdAt: '2024-03-01',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '16',
      name: 'Pretzel',
      price: '30.00',
      status: 'active',
      createdAt: '2024-02-29',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '17',
      name: 'Bagel',
      price: '35.00',
      status: 'draft',
      createdAt: '2024-02-28',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '18',
      name: 'English Muffin',
      price: '40.00',
      status: 'active',
      createdAt: '2024-02-27',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '19',
      name: 'Cornbread',
      price: '45.00',
      status: 'archived',
      createdAt: '2024-02-26',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '20',
      name: 'Banana Bread',
      price: '50.00',
      status: 'active',
      createdAt: '2024-02-25',
      image: '/images/rozky5ks.webp',
    },
  ];
}

export async function getProduct(
  id: string
): Promise<TableProduct | undefined> {
  return getProducts().then((products) =>
    products.find((product) => product.id === id)
  );
}
