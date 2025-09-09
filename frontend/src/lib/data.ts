export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  shortDescription: string;
  description: string;
  imageUrl: string;
  aiHint: string;
}

export interface IStory {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  relatedProductId?: number;
  aiHint: string;
}

export interface IGalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
}

export const products: IProduct[] = [
  {
    id: 1,
    name: 'Kalinga Woven Traditional Dress',
    category: 'Home Textiles',
    price: 859.0,
    shortDescription: 'Handwoven by Kalinga master weavers, perfect for a cozy home.',
    description: 'This beautiful dress is handwoven using traditional backstrap loom techniques by the master weavers of Kalinga. The intricate patterns tell stories of their culture and heritage. Made from 100% locally sourced cotton, it is both soft and durable.',
    imageUrl: '/images/4.png', // Fixed path to reference public directory
    aiHint: 'woven blanket',
  },
  {
    id: 2,
    name: 'Ifugao Woven Table Runner',
    category: 'Dining',
    price: 599.0,
    shortDescription: 'An elegant table runner featuring traditional Ifugao motifs.',
    description: 'Adorn your dining table with this elegant runner, showcasing the distinct diamond patterns of Ifugao weaving. Each piece is a testament to the weaver\'s skill and patience, often taking weeks to complete. It adds a touch of indigenous artistry to any meal.',
    imageUrl: '/images/5.png',
    aiHint: 'table runner',
  },
  {
    id: 3,
    name: 'Bontoc Woven Clothing',
    category: 'Accessories',
    price: 1299.0,
    shortDescription: 'A durable and stylish clothing item for everyday use.',
    description: 'Combining traditional Bontoc weaving with modern design, this clothing is both functional and fashionable. The strong, vibrant fabric is designed to withstand daily use while making a bold cultural statement.',
    imageUrl: '/images/6.png',
    aiHint: 'woven backpack',
  },
  {
    id: 4,
    name: 'Abra Handwoven Night Dress',
    category: 'Apparel',
    price: 399.0,
    shortDescription: 'A soft, lightweight cloth made from natural dyes.',
    description: 'Crafted in Abra, this night dress is known for its incredible softness and use of natural dyes derived from local plants. The simple yet elegant design makes it a versatile accessory for any season.',
    imageUrl: '/images/7.png',
    aiHint: 'woven scarf',
  },
  {
    id: 5,
    name: 'Isinay Ceremonial Cloth',
    category: 'Wall Art',
    price: 2599.0,
    shortDescription: 'A rare and intricate piece of ceremonial textile art.',
    description: 'This is a collector\'s item, a ceremonial cloth woven by the Isinay people. Used in rituals and special occasions, the patterns are sacred and hold deep spiritual meaning. A stunning piece for textile enthusiasts and art collectors.',
    imageUrl: '/images/8.png',
    aiHint: 'ceremonial cloth',
  },
  {
    id: 6,
    name: 'Gaddang Beaded Dress',
    category: 'Home Decor',
    price: 1899.0,
    shortDescription: 'A vibrant textile adorned with traditional Gaddang beadwork.',
    description: 'The Gaddang are renowned for their exquisite beadwork, and this textile is a prime example. Thousands of tiny beads are meticulously stitched onto the handwoven fabric, creating a dazzling piece of art perfect for home decor.',
    imageUrl: '/images/9.png',
    aiHint: 'beaded textile',
  },
];

export const stories: IStory[] = [
  {
    id: 1,
    title: 'The Whispering Loom of Kalinga',
    excerpt: 'Lola Anya, a master weaver from the Kalinga tribe, has been weaving since she was a young girl. Her hands move with a practiced grace, her loom whispering tales of generations past...',
    content: 'Lola Anya, a master weaver from the Kalinga tribe, has been weaving since she was a young girl. Her hands move with a practiced grace, her loom whispering tales of generations past. Each thread she pulls is a connection to her ancestors, each pattern a chapter in her people\'s story. The "sinulid" (thread) is dyed using extracts from local plants and soil, a secret passed down from her grandmother. This story is deeply connected to our Kalinga Woven Blanket.',
    imageUrl: '/images/s3.png',
    relatedProductId: 1,
    aiHint: 'old woman weaving',
  },
  {
    id: 2,
    title: 'The Diamond of the Ifugao Mountains',
    excerpt: 'In the heart of the Ifugao mountains, the diamond pattern is more than just a design; it is a symbol of protection and prosperity. The weavers believe it represents the eyes of their ancestors...',
    content: 'In the heart of the Ifugao mountains, the diamond pattern is more than just a design; it is a symbol of protection and prosperity. The weavers believe it represents the eyes of their ancestors watching over them. Young weavers must undergo a ritual before they are allowed to create this sacred pattern, ensuring they approach the task with respect and humility. Our Ifugao Woven Table Runner carries this powerful symbolism.',
    imageUrl: '/images/s1.png',
    relatedProductId: 2,
    aiHint: 'mountain landscape',
  },
   {
    id: 3,
    title: 'The Colors of Bontoc',
    excerpt: 'The vibrant reds, yellows, and blacks of Bontoc weaving are not chosen by chance. They represent the core elements of their life: the earth, the sun, and the sky...',
    content: 'The vibrant reds, yellows, and blacks of Bontoc weaving are not chosen by chance. They represent the core elements of their life: the earth that provides, the sun that gives life, and the sky that holds their gods. This deep connection to nature is woven into every textile, creating pieces that are not just beautiful, but also spiritually significant. This tradition is embodied in the Bontoc Woven Backpack.',
    imageUrl: '/images/s2.png',
    aiHint: 'vibrant textiles',
  },
];

export const galleryItems: IGalleryItem[] = [
  { id: 1, title: 'A moutain view in Cordillera', description: '', imageUrl: '/images/g1.png', aiHint: 'weaving hands' },
  { id: 2, title: "Foggy Night at Baguio's Iconic Cathedral", description: '', imageUrl: '/images/g2.png', aiHint: 'natural dyes' },
  { id: 3, title: 'Woman Wearing Traditional Costume on a Street', description: '', imageUrl: '/images/g3.png', aiHint: 'traditional hut' },
  { id: 4, title: 'Kalinga Weaving Store', description: '',  imageUrl: '/images/g4.png', aiHint: 'woman portrait' },
  { id: 5, title: 'Banaue Rice Fields', description: '',  imageUrl: '/images/g5.png', aiHint: 'traditional dance' },
  { id: 6, title: 'A Falls in Bagiuo', description: '',  imageUrl: '/images/g6.png', aiHint: 'textile pattern' },
  { id: 7, title: 'Threads of Life', description: '',  imageUrl: '/images/g7.png', aiHint: 'colorful thread' },
  { id: 8, title: 'Community Weaving Circle', description: '',  imageUrl: '/images/g8.png', aiHint: 'community gathering' },
  { id: 9, title: 'Traditional Clothing', description: '',  imageUrl: '/images/7.png', aiHint: 'adwadasd' },
  { id: 10, title: 'Festival Dance', description: '',  imageUrl: '/images/g10.png', aiHint: 'comsdw' },
  { id: 11, title: 'Mountain View ', description: '',  imageUrl: '/images/g11.png', aiHint: 'gathering' },
];
