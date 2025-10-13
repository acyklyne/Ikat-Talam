export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number | string;
  short_description: string;
  description: string;
  image_url: string;
}

export interface IStory {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  relatedProductId?: number;
  relatedGalleryId?: number;
}

export interface IGalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  createdAt: string;
}

export interface IOrder {
  id: number;
  customerName: string;
  email: string;
  items: { productId: number; quantity: number }[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  date: string;
}

export let products: IProduct[] = [
  {
    id: 1,
    name: 'Kalinga Woven Traditional Dress',
    category: 'Home Textiles',
    price: 859.0,
    short_description: 'Handwoven by Kalinga master weavers, perfect for a cozy home.',
    description: 'This beautiful dress is handwoven using traditional backstrap loom techniques by the master weavers of Kalinga. The intricate patterns tell stories of their culture and heritage. Made from 100% locally sourced cotton, it is both soft and durable.',
    image_url: '/images/4.png', // Fixed path to reference public directory
  },
  {
    id: 2,
    name: 'Ifugao Woven Table Runner',
    category: 'Dining',
    price: 599.0,
    short_description: 'An elegant table runner featuring traditional Ifugao motifs.',
    description: 'Adorn your dining table with this elegant runner, showcasing the distinct diamond patterns of Ifugao weaving. Each piece is a testament to the weaver\'s skill and patience, often taking weeks to complete. It adds a touch of indigenous artistry to any meal.',
    image_url: '/images/5.png',
  },
  {
    id: 3,
    name: 'Bontoc Woven Clothing',
    category: 'Accessories',
    price: 1299.0,
    short_description: 'A durable and stylish clothing item for everyday use.',
    description: 'Combining traditional Bontoc weaving with modern design, this clothing is both functional and fashionable. The strong, vibrant fabric is designed to withstand daily use while making a bold cultural statement.',
    image_url: '/images/6.png',
  },
  {
    id: 4,
    name: 'Abra Handwoven Night Dress',
    category: 'Apparel',
    price: 399.0,
    short_description: 'A soft, lightweight cloth made from natural dyes.',
    description: 'Crafted in Abra, this night dress is known for its incredible softness and use of natural dyes derived from local plants. The simple yet elegant design makes it a versatile accessory for any season.',
    image_url: '/images/7.png',
  },
  {
    id: 5,
    name: 'Isinay Ceremonial Cloth',
    category: 'Wall Art',
    price: 2599.0,
    short_description: 'A rare and intricate piece of ceremonial textile art.',
    description: 'This is a collector\'s item, a ceremonial cloth woven by the Isinay people. Used in rituals and special occasions, the patterns are sacred and hold deep spiritual meaning. A stunning piece for textile enthusiasts and art collectors.',
    image_url: '/images/8.png',
  },
  {
    id: 6,
    name: 'Gaddang Beaded Dress',
    category: 'Home Decor',
    price: 1899.0,
    short_description: 'A vibrant textile adorned with traditional Gaddang beadwork.',
    description: 'The Gaddang are renowned for their exquisite beadwork, and this textile is a prime example. Thousands of tiny beads are meticulously stitched onto the handwoven fabric, creating a dazzling piece of art perfect for home decor.',
    image_url: '/images/9.png',
  },
];

export let stories: IStory[] = [
  {
    id: 1,
    title: 'The Whispering Loom of Kalinga',
    excerpt: 'Lola Anya, a master weaver from the Kalinga tribe, has been weaving since she was a young girl. Her hands move with a practiced grace, her loom whispering tales of generations past...',
    content: 'Lola Anya, a master weaver from the Kalinga tribe, has been weaving since she was a young girl. Her hands move with a practiced grace, her loom whispering tales of generations past. Each thread she pulls is a connection to her ancestors, each pattern a chapter in her people\'s story. The "sinulid" (thread) is dyed using extracts from local plants and soil, a secret passed down from her grandmother. This story is deeply connected to our Kalinga Woven Blanket.',
    imageUrl: '/images/s3.png',
    relatedProductId: 1,
    relatedGalleryId: 4,
  },
  {
    id: 2,
    title: 'The Diamond of the Ifugao Mountains',
    excerpt: 'In the heart of the Ifugao mountains, the diamond pattern is more than just a design; it is a symbol of protection and prosperity. The weavers believe it represents the eyes of their ancestors...',
    content: 'In the heart of the Ifugao mountains, the diamond pattern is more than just a design; it is a symbol of protection and prosperity. The weavers believe it represents the eyes of their ancestors watching over them. Young weavers must undergo a ritual before they are allowed to create this sacred pattern, ensuring they approach the task with respect and humility. Our Ifugao Woven Table Runner carries this powerful symbolism.',
    imageUrl: '/images/s1.png',
    relatedProductId: 2,
    relatedGalleryId: 5,
  },
   {
    id: 3,
    title: 'The Colors of Bontoc',
    excerpt: 'The vibrant reds, yellows, and blacks of Bontoc weaving are not chosen by chance. They represent the core elements of their life: the earth, the sun, and the sky...',
    content: 'The vibrant reds, yellows, and blacks of Bontoc weaving are not chosen by chance. They represent the core elements of their life: the earth that provides, the sun that gives life, and the sky that holds their gods. This deep connection to nature is woven into every textile, creating pieces that are not just beautiful, but also spiritually significant. This tradition is embodied in the Bontoc Woven Backpack.',
    imageUrl: '/images/s2.png',
    relatedProductId: 3,
    relatedGalleryId: 1,
  },
];

export let galleryItems: IGalleryItem[] = [
  { id: 1, title: 'A moutain view in Cordillera', description: '', imageUrl: '/images/g1.png', category: 'Nature' },
  { id: 2, title: "Foggy Night at Baguio's Iconic Cathedral", description: '', imageUrl: '/images/g2.png', category: 'Culture' },
  { id: 3, title: 'Woman Wearing Traditional Costume on a Street', description: '', imageUrl: '/images/g3.png', category: 'Culture' },
  { id: 4, title: 'Kalinga Weaving Store', description: '',  imageUrl: '/images/g4.png', category: 'Artisans' },
  { id: 5, title: 'Banaue Rice Fields', description: '',  imageUrl: '/images/g5.png', category: 'Nature' },
  { id: 6, title: 'A Falls in Bagiuo', description: '',  imageUrl: '/images/g6.png', category: 'Nature' },
  { id: 7, title: 'Threads of Life', description: '',  imageUrl: '/images/g7.png', category: 'Artisans' },
  { id: 8, title: 'Community Weaving Circle', description: '',  imageUrl: '/images/g8.png', category: 'Culture' },
  { id: 9, title: 'Traditional Clothing', description: '',  imageUrl: '/images/7.png', category: 'Culture' },
  { id: 10, title: 'Festival Dance', description: '',  imageUrl: '/images/g10.png', category: 'Festivals' },
  { id: 11, title: 'Mountain View ', description: '',  imageUrl: '/images/g11.png', category: 'Nature' },
];

export let orders: IOrder[] = [
  {
    id: 1,
    customerName: 'John Doe',
    email: 'john@example.com',
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
    ],
    total: 1458.0,
    status: 'pending',
    date: '2023-10-01',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    items: [
      { productId: 3, quantity: 1 },
    ],
    total: 1299.0,
    status: 'shipped',
    date: '2023-09-28',
  },
];

// Utility functions for Products
export const addProduct = (product: Omit<IProduct, 'id'>) => {
  const newId = Math.max(...products.map(p => p.id)) + 1;
  products.push({ ...product, id: newId });
};

export const updateProduct = (id: number, updatedProduct: Partial<IProduct>) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
  }
};

export const deleteProduct = (id: number) => {
  products = products.filter(p => p.id !== id);
};

// Utility functions for Stories
export const addStory = (story: Omit<IStory, 'id'>) => {
  const newId = Math.max(...stories.map(s => s.id)) + 1;
  stories.push({ ...story, id: newId });
};

export const updateStory = (id: number, updatedStory: Partial<IStory>) => {
  const index = stories.findIndex(s => s.id === id);
  if (index !== -1) {
    stories[index] = { ...stories[index], ...updatedStory };
  }
};

export const deleteStory = (id: number) => {
  stories = stories.filter(s => s.id !== id);
};

// Utility functions for Gallery Items
export const addGalleryItem = (item: Omit<IGalleryItem, 'id'>) => {
  const newId = Math.max(...galleryItems.map(g => g.id)) + 1;
  galleryItems.push({ ...item, id: newId });
};

export const updateGalleryItem = (id: number, updatedItem: Partial<IGalleryItem>) => {
  const index = galleryItems.findIndex(g => g.id === id);
  if (index !== -1) {
    galleryItems[index] = { ...galleryItems[index], ...updatedItem };
  }
};

export const deleteGalleryItem = (id: number) => {
  galleryItems = galleryItems.filter(g => g.id !== id);
};

// Utility functions for Orders
export const addOrder = (order: Omit<IOrder, 'id'>) => {
  const newId = Math.max(...orders.map(o => o.id)) + 1;
  orders.push({ ...order, id: newId });
};

export const updateOrder = (id: number, updatedOrder: Partial<IOrder>) => {
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updatedOrder };
  }
};

export const deleteOrder = (id: number) => {
  orders = orders.filter(o => o.id !== id);
};
