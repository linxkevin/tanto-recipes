// tanto-recipes bulk import script
// Run from backend directory: node src/db/import.js
// Requires DATABASE_URL environment variable

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const recipes = [

  // ─── HOW TO ──────────────────────────────────────────────────────────────

  {
    category_key: 'howto',
    icon: '🥟',
    title_en: 'Gyoza — How to Cook',
    meta_en: 'Griddle method',
    ingredients_en: [
      { name: 'Sesame lard', amount: 'drops' },
      { name: 'Gyoza', amount: '6–36 pcs' },
      { name: 'Water', amount: '½–1 ladle' },
    ],
    steps_en: [
      'Add drops of sesame lard to the griddle for each gyoza.',
      'Arrange the gyoza on the griddle, leaving about 1 cm (½ inch) between each.',
      'Drizzle a little sesame lard on top of each gyoza.',
      'Pour water over the gyoza to steam them: 6–8 pcs = ½ ladle / 16 pcs = ⅔ ladle / 24–36 pcs = 1 ladle.',
      'Cover and cook for 3 minutes.',
      'Remove the lid. If the edges are golden brown and crispy, they\'re ready to serve.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Ramen — Tanto Shoyu',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '330ml' },
      { name: 'Shoyu base', amount: '36ml' },
      { name: 'Backfat', amount: '○' },
    ],
    steps_en: [
      'Heat chicken broth to serving temp.',
      'Add shoyu base and stir well.',
      'Ladle into bowl.',
      'Finish with a drizzle of backfat.',
      'Garnish: Red onion (center), Char siu, Ajitama, Green onion, Menma. Finish with Momiji oroshi.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Ramen — Tanto Goma',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '330ml' },
      { name: 'Goma base', amount: '60ml' },
      { name: 'Lard', amount: 'little' },
    ],
    steps_en: [
      'Heat chicken broth.',
      'Add goma base and stir well.',
      'Ladle into bowl.',
      'Finish with a little lard.',
      'Garnish: Niku miso (center), Red onion, Spinach, Green onion. Finish with Red garlic oil, Goma, Grate goma.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Ramen — Spicy Goma',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '330ml' },
      { name: 'Goma base', amount: '60ml' },
      { name: 'Red garlic oil', amount: '○' },
    ],
    steps_en: [
      'Heat chicken broth.',
      'Add goma base and stir well.',
      'Ladle into bowl.',
      'Finish with red garlic oil.',
      'Garnish: Niku miso (center), Red onion, Spinach, Green onion. Finish with Red garlic oil, Goma, Grate goma, Spicy Akadama.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Ramen — Tokyo Umami',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '70ml' },
      { name: 'UMAMI broth', amount: '280ml' },
      { name: 'Shoyu base', amount: '25ml' },
    ],
    steps_en: [
      'Combine chicken broth and UMAMI broth, heat to serving temp.',
      'Add shoyu base and stir well.',
      'Ladle into bowl.',
      'Garnish: Green onion (center), Char siu, Menma. Finish with Square nori.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Ramen — Sapporo Miso',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '330ml' },
      { name: 'Miso base', amount: '30ml' },
      { name: 'Lard', amount: '○' },
    ],
    steps_en: [
      'Heat chicken broth.',
      'Add miso base and stir until dissolved.',
      'Ladle into bowl.',
      'Finish with lard.',
      'Garnish: Green onion (center), Char siu, Ajitama, Wakame, Corn, Menma. Finish with Butter.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Ramen — Tonkotsu Black',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '330ml' },
      { name: 'Tonkotsu base', amount: '40ml' },
      { name: 'Backfat', amount: '○' },
      { name: 'Black garlic oil', amount: '○' },
    ],
    steps_en: [
      'Heat chicken broth.',
      'Add tonkotsu base and stir.',
      'Ladle into bowl.',
      'Finish with backfat and black garlic oil.',
      'Garnish: Kikurage (center), Char siu, Ajitama, Green onion, Beni shoga. Finish with Black garlic oil, Goma.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Ramen — Tonkotsu Red',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '330ml' },
      { name: 'Tonkotsu base', amount: '40ml' },
      { name: 'Red garlic oil', amount: '○' },
    ],
    steps_en: [
      'Heat chicken broth.',
      'Add tonkotsu base and stir.',
      'Ladle into bowl.',
      'Finish with red garlic oil.',
      'Garnish: Kikurage (center), Char siu, Ajitama, Green onion, Beni shoga. Finish with Black garlic oil little, Goma, Spicy Akadama.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Ramen — Vegan Miso',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'KELP broth', amount: '330ml' },
      { name: 'Miso base', amount: '30ml' },
      { name: 'Lard', amount: '○' },
    ],
    steps_en: [
      'Heat kelp broth.',
      'Add miso base and stir until dissolved.',
      'Ladle into bowl.',
      'Finish with lard.',
      'Garnish: Spinach (center), Red onion, Tofu, Green onion, Wakame. Finish with Fried onion.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Ramen — Red Hot Chili',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '330ml' },
      { name: 'Shoyu base', amount: '25ml' },
      { name: 'Tonkotsu base', amount: '20ml' },
      { name: 'Lard', amount: '○' },
    ],
    steps_en: [
      'Heat chicken broth.',
      'Add shoyu base and tonkotsu base, stir well.',
      'Ladle into bowl.',
      'Finish with lard.',
      'Garnish: Kara miso (center), Green onion, Chive. Finish with Red garlic oil.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Mazemen — Tonkotsu Black/Red',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '50ml' },
      { name: 'Tonkotsu base', amount: '30ml' },
      { name: 'Lard', amount: '○' },
      { name: 'Black garlic oil', amount: '○' },
    ],
    steps_en: [
      'Add chicken broth and tonkotsu base.',
      'Finish with lard and black garlic oil.',
      'Garnish: Poached egg (center), Red onion, Chive, Green onion, Fried onion, Kizami nori, Kara miso. Finish with Black garlic oil, Goma.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Mazemen — Shoyu',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '50ml' },
      { name: 'Shoyu base', amount: '36ml' },
      { name: 'Lard', amount: '○' },
    ],
    steps_en: [
      'Add chicken broth and shoyu base.',
      'Finish with lard.',
      'Garnish: Poached egg (center), Red onion, Chive, Green onion, Fried onion, Kizami nori, Kara miso. Finish with Red garlic oil, Goma.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Mazemen — Curry',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '50ml' },
      { name: 'Curry base', amount: 'half' },
      { name: 'Chasiu', amount: '70g' },
      { name: 'Lard', amount: '○' },
    ],
    steps_en: [
      'Add chicken broth, curry base, and chasiu.',
      'Finish with lard.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Mazemen — 3G',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '50ml' },
      { name: '3G sauce (Tonkotsu base)', amount: '3G 30' },
      { name: 'Lard', amount: '○' },
    ],
    steps_en: [
      'Add chicken broth and 3G sauce.',
      'Finish with lard.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Mazemen — Hokkaido Miso Butter Salmon',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '50ml' },
      { name: 'Miso base', amount: '30ml' },
      { name: 'Ginger sauce', amount: '10ml' },
      { name: 'Lard', amount: '○' },
    ],
    steps_en: [
      'Add chicken broth, miso base, and ginger sauce.',
      'Finish with lard.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍜',
    title_en: 'Mazemen — Hakata Mentai Tonkotsu',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Chicken broth', amount: '50ml' },
      { name: 'Tonkotsu base', amount: '30ml' },
      { name: 'Backfat', amount: '○' },
      { name: 'Black garlic oil', amount: '○' },
    ],
    steps_en: [
      'Add chicken broth and tonkotsu base.',
      'Finish with backfat and black garlic oil.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Garlic Lover\'s',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Fry' },
      { name: 'Garlic lover sauce', amount: '●' },
      { name: 'Red onion', amount: '●' },
      { name: 'Green onion', amount: '●' },
      { name: 'Fried garlic', amount: '●' },
      { name: 'Black pepper', amount: '●' },
    ],
    steps_en: ['Fry gyoza.', 'Plate and top with Garlic Lover sauce.', 'Add red onion, green onion, fried garlic.', 'Finish with black pepper.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Spicy Mayo Crispy',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Fry' },
      { name: 'Spicy mayo', amount: '●' },
      { name: 'Ponzu', amount: '●' },
      { name: 'Cilantro', amount: '●' },
      { name: 'Green onion / Fried onion', amount: '●' },
    ],
    steps_en: ['Fry gyoza.', 'Top with spicy mayo and ponzu.', 'Finish with cilantro, green onion, and fried onion.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Mexican Cheese',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Fry' },
      { name: 'Nikumiso / ketchup / cheese', amount: '●' },
      { name: 'Ginger sauce', amount: '●' },
      { name: 'Cilantro', amount: '●' },
      { name: 'Black pepper', amount: '●' },
    ],
    steps_en: ['Fry gyoza.', 'Top with nikumiso, ketchup, and cheese.', 'Add ginger sauce, cilantro.', 'Finish with black pepper.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Garlic Chive',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Grill' },
      { name: 'Bean sprouts', amount: '●' },
      { name: 'Chive sauce', amount: '●' },
      { name: 'Fried garlic', amount: '●' },
      { name: 'Fresh chive', amount: '●' },
    ],
    steps_en: ['Grill gyoza.', 'Add bean sprouts and chive sauce.', 'Top with fried garlic and fresh chive.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Teriyaki Mayo',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Grill' },
      { name: 'Teriyaki tume', amount: '●' },
      { name: 'Mayo', amount: '●' },
      { name: 'Green onion', amount: '●' },
    ],
    steps_en: ['Grill gyoza.', 'Top with teriyaki tume and mayo.', 'Finish with green onion.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Yuzu Miso',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Grill' },
      { name: 'Yuzu miso sauce', amount: '●' },
      { name: 'Yuzu pepper', amount: '●' },
      { name: 'Sesame', amount: '●' },
    ],
    steps_en: ['Grill gyoza.', 'Top with yuzu miso sauce.', 'Finish with yuzu pepper and sesame.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Grated Daikon Ponzu',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Fry' },
      { name: 'Grated daikon', amount: '●' },
      { name: 'Ponzu', amount: '●' },
      { name: 'Green onion', amount: '●' },
    ],
    steps_en: ['Fry gyoza.', 'Top with grated daikon and ponzu.', 'Finish with green onion.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Homemade Tartar',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Fry' },
      { name: 'Tartar sauce', amount: '●' },
      { name: 'Ginger sauce', amount: '●' },
      { name: 'Sesame dressing', amount: '●' },
      { name: 'Yukari', amount: '●' },
    ],
    steps_en: ['Fry gyoza.', 'Top with tartar sauce and ginger sauce.', 'Finish with sesame dressing and yukari.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Kimchi Mayo',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Fry' },
      { name: 'Kimchi sauce', amount: '●' },
      { name: 'Green onion', amount: '●' },
    ],
    steps_en: ['Fry gyoza.', 'Top with kimchi sauce.', 'Finish with green onion.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Miso Glazed',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Fry' },
      { name: 'Miso glazed sauce', amount: '●' },
      { name: 'Chili oil', amount: '●' },
      { name: 'Green onion', amount: '●' },
    ],
    steps_en: ['Fry gyoza.', 'Top with miso glazed sauce.', 'Finish with chili oil and green onion.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍱',
    title_en: 'Gyoza Adventure — Ginger Sauce',
    meta_en: 'Gyoza topping',
    ingredients_en: [
      { name: 'Method', amount: 'Fry' },
      { name: 'Bean sprouts', amount: '●' },
      { name: 'Nikumiso', amount: '●' },
      { name: 'Ginger sauce', amount: '●' },
      { name: 'Green onion / sesame', amount: '●' },
    ],
    steps_en: ['Fry gyoza.', 'Top with bean sprouts, nikumiso, and ginger sauce.', 'Finish with green onion and sesame.'],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🥚',
    title_en: 'Dashimaki Egg',
    meta_en: 'How to cook',
    ingredients_en: [
      { name: 'Eggs', amount: '2' },
      { name: 'Dashi', amount: '10cc' },
    ],
    steps_en: [
      'Mix eggs and dashi (10cc), pour into cup.',
      'Microwave center for 1:20. If not set, heat 10–20 sec more.',
      'Add water to weight, place on cup, wait 1 min.',
      'Plating: Shoyu / Daikon / Green onion.',
      'For spicy: add 10g cheese to eggs. Plating: Spicy sauce / Cilantro.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🥚',
    title_en: 'Onsen Egg',
    meta_en: 'How to cook',
    ingredients_en: [
      { name: 'Eggs', amount: '12–15' },
      { name: '100°C hot water', amount: 'cover' },
    ],
    steps_en: [
      'Place eggs in 100°C hot water.',
      'Cover and wait 22 minutes.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🥚',
    title_en: 'Ajitama Egg',
    meta_en: 'How to prep',
    ingredients_en: [
      { name: 'Hanjyuku eggs', amount: '50–100 pcs' },
      { name: 'Sun noodle shoyu', amount: 'just enough to cover' },
    ],
    steps_en: [
      'For new Sun noodle shoyu, soak for 60 min.',
      'After using the sauce, bring it to a boil in the refrigerator.',
      'It will be used for the chashu pork.',
    ],
    video_url: null,
  },

  {
    category_key: 'howto',
    icon: '🍚',
    title_en: 'Tanto Bowl',
    meta_en: 'How to finish a bowl',
    ingredients_en: [
      { name: 'Pork 1.5mm', amount: '80g' },
      { name: 'Onion slices', amount: '40g' },
      { name: 'Tanto bowl sauce', amount: '36cc' },
      { name: 'Magic salt', amount: '○' },
      { name: 'Lard, sesame oil', amount: '○' },
    ],
    steps_en: [
      'Place pork and onion in pan.',
      'Add Tanto bowl sauce (36cc).',
      'Season with magic salt.',
      'Finish with lard and sesame oil.',
    ],
    video_url: null,
  },

  // ─── RECIPES ─────────────────────────────────────────────────────────────

  {
    category_key: 'recipes',
    icon: '🍜',
    title_en: 'Tanto Kaeshi',
    meta_en: 'Base sauce',
    ingredients_en: [
      { name: 'Shoyu', amount: '5000cc' },
      { name: 'Sugar', amount: '1000g' },
      { name: 'Sake', amount: '500cc' },
      { name: 'Mirin', amount: '800cc' },
    ],
    steps_en: [
      'Boil sake, mirin, and sugar to burn off the alcohol.',
      'Add soy sauce and bring to a quick boil.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍜',
    title_en: 'Shoyu Base (original)',
    meta_en: 'Soup base recipe',
    ingredients_en: [
      { name: 'Tanto Kaeshi', amount: '750g' },
      { name: 'Sun noodle Shoyu', amount: '750g' },
      { name: 'Shoyu', amount: '210g' },
      { name: 'Mirin', amount: '140g' },
      { name: 'Ago Powder', amount: '75g' },
      { name: 'Scallop Powder', amount: '75g' },
      { name: 'Garlic', amount: '20g' },
      { name: 'Ginger', amount: '20g' },
      { name: 'Sugar', amount: '100g' },
    ],
    steps_en: [
      'Boil soy sauce, mirin, sugar, ago, scallops, garlic, and ginger, then stir 100 times to dissolve.',
      'Add kaeshi and Sun Noodle soy sauce, then bring to a boil once.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍜',
    title_en: 'Shoyu Base (revised 2026)',
    meta_en: 'Soup base recipe — latest',
    ingredients_en: [
      { name: 'Sun noodle Shoyu', amount: '2250g' },
      { name: 'Shoyu', amount: '2250g' },
      { name: 'Mirin', amount: '650g' },
      { name: 'Ago Powder', amount: '100g' },
      { name: 'Scallop Powder', amount: '100g' },
      { name: 'Garlic', amount: '60g' },
      { name: 'Ginger', amount: '60g' },
      { name: 'Sugar', amount: '580g' },
      { name: 'Sake', amount: '150g' },
    ],
    steps_en: [
      'Boil shoyu, mirin, sake, sugar, ago, scallops, garlic, and ginger, then stir 100 times to dissolve.',
      'Add Sun Noodle shoyu, then bring to a boil once.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍜',
    title_en: 'Miso Ramen Base',
    meta_en: 'Soup base recipe',
    ingredients_en: [
      { name: 'Sun noodle Shoyu', amount: '2250g' },
      { name: 'Miso', amount: '3000g' },
      { name: 'Red Miso', amount: '1000g' },
      { name: 'Garlic paste', amount: '120g' },
      { name: 'Ginger paste', amount: '90g' },
      { name: 'Toubanjan', amount: '120g' },
      { name: 'Sugar', amount: '450g' },
      { name: 'Oyster sauce', amount: '450g' },
      { name: 'Mirin', amount: '450g' },
      { name: 'Ricky', amount: '100g' },
    ],
    steps_en: [
      'Boil mirin & sugar (remove alcohol), then mix with all other ingredients.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍜',
    title_en: 'Goma Ramen Base',
    meta_en: 'Soup base recipe',
    ingredients_en: [
      { name: 'Sun noodle Shoyu', amount: '4500g' },
      { name: 'Sesame paste', amount: '3000cc' },
      { name: 'Peanut butter', amount: '900g' },
      { name: 'Garlic paste', amount: '50g' },
      { name: 'Ginger paste', amount: '50g' },
      { name: 'Katakuriko', amount: '450g' },
      { name: 'Miso', amount: '100g' },
      { name: 'Toubanjan', amount: '50g' },
      { name: 'Oyster sauce', amount: '60g' },
    ],
    steps_en: [
      'Mix half Sun Noodle soy sauce with potato starch and peanut butter.',
      'Mix other half with miso, toubanjiang, garlic paste, ginger paste, and oyster sauce.',
      'Add warmed sesame paste (one bottle at a time) to the bowl and mix well.',
      'Combine both mixtures and mix well.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍜',
    title_en: 'Tonkotsu / Mazemen Base',
    meta_en: 'Soup base recipe',
    ingredients_en: [
      { name: 'Sun noodle Tonkotsu', amount: '5436g' },
      { name: 'Tanto Shoyu base', amount: '1600g' },
      { name: 'Tanto Miso base', amount: '1600g' },
    ],
    steps_en: [
      'Mix well.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍗',
    title_en: 'Chicken Broth (Piikoi)',
    meta_en: 'Broth recipe',
    ingredients_en: [
      { name: 'Chicken bone', amount: '4500g (10 lb)' },
      { name: 'Chicken paws', amount: '1000g' },
      { name: 'Sake', amount: '400g' },
      { name: 'Fresh garlic', amount: '80g' },
      { name: 'Fresh ginger', amount: '80g' },
      { name: 'White part of green onion', amount: '100g' },
      { name: 'Onion', amount: '2 pcs' },
      { name: 'Water', amount: '25000cc' },
    ],
    steps_en: [
      'Pressure cook everything for 25 min after boiling.',
      'After pressure is released, divide into large containers, 12,000cc each.',
      'Add 3,000cc of second broth to each and store in the refrigerator.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍗',
    title_en: 'Chicken Broth (Alamoana)',
    meta_en: 'Broth recipe',
    ingredients_en: [
      { name: 'Onion', amount: '1.5 pcs' },
      { name: 'Fresh garlic', amount: '60g' },
      { name: 'Fresh ginger', amount: '40g' },
      { name: 'White part of green onion', amount: '100g' },
      { name: 'Sake', amount: '240cc' },
      { name: 'Water', amount: '20L' },
      { name: 'Toridashi EX', amount: '200g' },
      { name: 'Chicken powder', amount: '60g' },
      { name: 'Ago', amount: '50g' },
      { name: 'Ajinomoto', amount: '5g' },
      { name: 'Chicken fat', amount: '200g' },
    ],
    steps_en: [
      'Add onion, garlic, ginger, green onion, sake, and water.',
      'Boil for 40 minutes.',
      'Turn off heat, add Toridashi EX, chicken powder, ago, ajinomoto, and chicken fat.',
      'Stir well to combine.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥣',
    title_en: 'UMAMI Broth',
    meta_en: 'Broth recipe',
    ingredients_en: [
      { name: 'Dashi pack', amount: '1 pc' },
      { name: 'Konbu dashi powder', amount: '1 spoon' },
      { name: 'Mushroom', amount: '3 pcs' },
      { name: 'Water', amount: '4000cc' },
    ],
    steps_en: [
      'Boil all ingredients.',
      'Simmer 3 min on low.',
      'Remove dashi pack.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥣',
    title_en: 'Vegan Broth',
    meta_en: 'Broth recipe',
    ingredients_en: [
      { name: 'Konbu dashi powder', amount: '3 spoons' },
      { name: 'Mushroom', amount: '3 pcs' },
      { name: 'Water', amount: '3000cc' },
    ],
    steps_en: [
      'Boil all ingredients.',
      'Turn off heat immediately.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥣',
    title_en: 'Second Broth',
    meta_en: 'Broth recipe',
    ingredients_en: [
      { name: 'Water', amount: '6000cc' },
      { name: 'Chicken powder', amount: '80g' },
      { name: 'Ago', amount: '100g' },
      { name: 'Ajinomoto (No MSG)', amount: '10g' },
    ],
    steps_en: [
      'Mix all ingredients.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍖',
    title_en: 'Charsiu Boil',
    meta_en: 'Prep recipe',
    ingredients_en: [
      { name: 'Pork (pre-cut, fully thawed)', amount: '15 lb' },
      { name: 'Water', amount: 'Large pot: fill to top' },
      { name: 'Garlic', amount: '80g' },
      { name: 'Ginger', amount: '80g' },
      { name: 'Sake', amount: '200cc' },
    ],
    steps_en: [
      'IMPORTANT: Use only pork that has been completely thawed.',
      'Boil everything in the pot.',
      'Simmer on low for 40 minutes.',
      'Turn off heat, wait 90 minutes.',
      'Soak in kaeshi.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍖',
    title_en: 'Charsiu Boil (Pressure Cooker)',
    meta_en: 'Prep recipe — pressure cooker method',
    ingredients_en: [
      { name: 'Pork (pre-cut, fully thawed)', amount: '15 lb' },
      { name: 'Water', amount: 'to cover' },
      { name: 'Garlic', amount: '80g' },
      { name: 'Ginger', amount: '80g' },
      { name: 'Sake', amount: '200cc' },
    ],
    steps_en: [
      'IMPORTANT: Use only pork that has been completely thawed.',
      'Boil everything in the pressure cooker.',
      'When pressure is applied and you hear steam, remove the pin and turn off heat immediately.',
      'Wait 40 minutes.',
      'Soak in Sun noodle shoyu.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥣',
    title_en: 'Gyoza Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Sake', amount: '2400cc' },
      { name: 'Mirin', amount: '240cc' },
      { name: 'Sugar', amount: '1200g' },
      { name: 'Salt', amount: '80g' },
      { name: 'Chicken powder', amount: '80g' },
      { name: 'Shoyu', amount: '3600cc' },
      { name: 'Vinegar', amount: '3600cc' },
    ],
    steps_en: [
      'Boil sake, mirin, sugar, salt, and chicken powder to burn off alcohol.',
      'Add soy sauce and bring to a boil.',
      'Add vinegar, mix only — do not boil.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🌶',
    title_en: 'Garlic Chili Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Fresh garlic', amount: '900g' },
      { name: 'Canola oil', amount: '4000cc' },
      { name: 'Shichimi pepper', amount: '600g' },
      { name: 'Shoyu', amount: '180cc' },
      { name: 'Water', amount: '180cc' },
      { name: 'Sesame oil', amount: '90cc' },
    ],
    steps_en: [
      'Mince garlic in a food processor.',
      'Boil 3000cc oil, add garlic, and fry on medium heat for 30 min until golden brown.',
      'Place remaining ingredients and 1000cc oil in a container and mix.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🧄',
    title_en: 'Ginger Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Sake', amount: '1300cc' },
      { name: 'Mirin', amount: '700cc' },
      { name: 'Sugar', amount: '1200g' },
      { name: 'Ginger paste', amount: '1000g' },
      { name: 'Shoyu', amount: '3300cc' },
    ],
    steps_en: [
      'Add sake, mirin, and sugar, bring to a boil, and burn off alcohol.',
      'Add ginger paste and shoyu, bring to a quick boil.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🧄',
    title_en: '3G Sauce (Three Garlic)',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Shan-tan (Wei-Pa)', amount: '100g' },
      { name: 'Tanto Shoyu base', amount: '360g' },
      { name: 'Oyster sauce', amount: '50g' },
      { name: 'Garlic paste', amount: '1000g' },
    ],
    steps_en: [
      'Boil the soy sauce base, oyster sauce, and Wei-Pa, then stir well to dissolve.',
      'Add garlic paste, mix well, and it\'s done.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍛',
    title_en: 'Curry Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Water', amount: '2000cc' },
      { name: 'Ago', amount: '40g' },
      { name: 'Curry powder', amount: '400g' },
    ],
    steps_en: [
      'Boil water and ago, then turn off heat.',
      'Add curry powder and stir 100 times.',
      'Reheat and boil.',
      'Cool slightly.',
      'Portion with 180cc ladle.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🍚',
    title_en: 'Tanto Bowl Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Shoyu', amount: '450cc' },
      { name: 'Mirin', amount: '300cc' },
      { name: 'Sake', amount: '300cc' },
      { name: 'Oyster sauce', amount: '80g' },
      { name: 'Sesame oil', amount: '80g' },
      { name: 'Garlic', amount: '200g' },
      { name: 'Ginger', amount: '20g' },
      { name: 'Sugar', amount: '150g' },
      { name: 'Sesame', amount: '20g' },
      { name: 'Shichimi', amount: '15g' },
      { name: 'Ricky', amount: '100g' },
    ],
    steps_en: [
      'Boil sake, mirin, and sugar to burn off alcohol.',
      'Add all other ingredients, boil, and mix well.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🌶',
    title_en: 'Spicy Mayo Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Sriracha sauce', amount: '100g' },
      { name: 'Mayonnaise', amount: '100g' },
      { name: 'Sun noodle shoyu', amount: '30g' },
    ],
    steps_en: ['Mix all ingredients well.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Sweet Miso Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Sake', amount: '540cc' },
      { name: 'Mirin', amount: '270cc' },
      { name: 'Dashi pack', amount: '1 pc' },
      { name: 'Sugar', amount: '1200g' },
      { name: 'Miso', amount: '1200g' },
      { name: 'Sesame', amount: '70g' },
      { name: 'Shichimi pepper', amount: '15g' },
      { name: 'Garlic paste', amount: '30g' },
      { name: 'Sesame paste', amount: '30g' },
      { name: 'Sesame oil', amount: '55g' },
      { name: 'Shoyu', amount: '900cc' },
    ],
    steps_en: [
      'Boil sake, mirin, and dashi pack to burn off alcohol.',
      'Turn off heat, remove dashi pack, then mix in miso, sugar, and sesame paste until dissolved.',
      'Add remaining ingredients and bring to a simmer over low heat.',
      'Simmer for 1–2 hours until the sauce turns dark brown.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Akadama Spicy Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Mirin', amount: '200g' },
      { name: 'Sugar', amount: '100g' },
      { name: 'Sriracha', amount: '200g' },
      { name: 'Ichimi pepper', amount: '200g' },
      { name: 'Water', amount: '200g' },
    ],
    steps_en: [
      'Boil mirin, sugar, and water to dissolve and burn off alcohol.',
      'Mix everything together.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Momiji Daikon',
    meta_en: 'Condiment',
    ingredients_en: [
      { name: 'Grated daikon radish', amount: '1000g' },
      { name: 'Ichimi pepper', amount: '4g' },
    ],
    steps_en: [
      'Adjust ichimi pepper from 4g and mix well.',
      'Finish when very light pink — must not be spicy.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Tartar Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Chopped pickles', amount: '400g' },
      { name: 'Ranch dressing', amount: '250g' },
      { name: 'Kewpie mayonnaise', amount: '100g' },
      { name: 'Shoyu', amount: '25g' },
    ],
    steps_en: ['Mix all ingredients well.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Tonkatsu Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Otafuku sauce', amount: '2250g' },
      { name: 'Usta sauce', amount: '600g' },
      { name: 'Ketchup', amount: '300g' },
    ],
    steps_en: ['Mix well.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Onion Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Sake', amount: '180cc' },
      { name: 'Mirin', amount: '90cc' },
      { name: 'Sugar', amount: '300g' },
      { name: 'Dashi pack', amount: '1 pack' },
      { name: 'Grated onion', amount: '1000g' },
      { name: 'Shoyu', amount: '720cc' },
    ],
    steps_en: [
      'Boil sake, mirin, sugar, and dashi to burn off alcohol.',
      'Remove dashi, add onion and soy sauce, simmer 10 min on low.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Mentai Mayo',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Mentaiko', amount: '300g' },
      { name: 'Mayo', amount: '600g' },
      { name: 'Sake', amount: '240cc' },
    ],
    steps_en: [
      'Boil sake to burn off alcohol, cool.',
      'Mix with mentaiko and mayo.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Tsume Unagi Sauce',
    meta_en: 'Sauce recipe',
    ingredients_en: [
      { name: 'Shoyu', amount: '180g' },
      { name: 'Sake', amount: '180g' },
      { name: 'Mirin', amount: '60g' },
      { name: 'Sugar', amount: '80g' },
    ],
    steps_en: [
      'Simmer all ingredients for 30 minutes until thickened.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Sesame Lard',
    meta_en: 'Oil / fat',
    ingredients_en: [
      { name: 'Sesame oil', amount: '100cc' },
      { name: 'Lard', amount: '100cc' },
    ],
    steps_en: ['Mix the melted lard and sesame oil.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Koumi Oil',
    meta_en: 'Oil recipe',
    ingredients_en: [
      { name: 'Fresh garlic', amount: '30g' },
      { name: 'Fresh ginger', amount: '20g' },
      { name: 'White part of green onion', amount: '50g' },
      { name: 'Takanotsume', amount: '1 pc' },
      { name: 'Canola oil', amount: '900cc' },
    ],
    steps_en: ['Simmer all on low for 30 min.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Seabura (Backfat & Lard)',
    meta_en: 'Fat prep recipe',
    ingredients_en: [
      { name: 'Back fat (no skin)', amount: '14000g' },
      { name: 'Water', amount: 'just enough to cover' },
      { name: 'Sake', amount: '500cc' },
    ],
    steps_en: [
      'In a large pressure cooker, add pork back fat, water, and sake. Bring to a boil, then pressure cook on low for 30–45 min.',
      'After pressure is released, strain through a coarse white strainer, then a fine strainer to separate the back fat and lard-infused liquid.',
      'Cool the liquid until solid, melt only the hardened lard on top, and pour into bottles.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Tanto Dressing',
    meta_en: 'Dressing recipe',
    ingredients_en: [
      { name: 'Sesame dressing', amount: '1900cc' },
      { name: 'Wafu onion dressing', amount: '1000cc' },
    ],
    steps_en: ['Mix well.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Carpaccio Dressing',
    meta_en: 'Dressing recipe',
    ingredients_en: [
      { name: 'Ponzu', amount: '220g' },
      { name: 'Kewpie Yuzu dressing', amount: '100g' },
      { name: 'Shoyu', amount: '60g' },
      { name: 'Yuzu pepper', amount: '30g' },
      { name: 'Wasabi', amount: '10g' },
      { name: 'Sesame oil', amount: '30g' },
    ],
    steps_en: ['Mix all ingredients well.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥣',
    title_en: 'Nikumiso',
    meta_en: 'Topping recipe',
    ingredients_en: [
      { name: 'Ground pork', amount: '1200g' },
      { name: 'Garlic (grated)', amount: '60g' },
      { name: 'Ginger (grated)', amount: '30g' },
      { name: 'Sun noodle shoyu', amount: '120g' },
      { name: 'Miso', amount: '30g' },
      { name: 'Toubanjan', amount: '10g' },
      { name: 'Salt / pepper', amount: '3g / 2g' },
      { name: 'Canola oil', amount: '150cc' },
      { name: 'Sugar', amount: '40g' },
    ],
    steps_en: [
      'Combine shoyu, miso, toubanjan, salt/pepper, oil, and sugar in a bowl and set aside.',
      'In a pot, sauté oil, garlic, and ginger until fragrant.',
      'Add ground pork, cook until browned and crumbly.',
      'Fry until the water evaporates.',
      'Add the combined seasonings and cook until the liquid is gone (about 15 min).',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Master Salt',
    meta_en: 'Seasoning blend',
    ingredients_en: [
      { name: 'Salt', amount: '40g' },
      { name: 'Sansho', amount: '1g' },
      { name: 'Garlic powder', amount: '1g' },
      { name: 'White pepper', amount: '10g' },
      { name: 'Konbucha', amount: '4g' },
    ],
    steps_en: ['Mix well.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🌊',
    title_en: 'Clams Sake Miso',
    meta_en: 'Appetizer recipe',
    ingredients_en: [
      { name: 'Clams', amount: '150g' },
      { name: 'UMAMI broth', amount: '40cc' },
      { name: 'Sake', amount: '40cc' },
      { name: 'Miso base', amount: '10cc' },
    ],
    steps_en: [
      'Combine all ingredients in pan.',
      'Bring to a boil and serve.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'Batter for Tonkatsu',
    meta_en: 'Batter recipe',
    ingredients_en: [
      { name: 'Egg', amount: '4 pcs' },
      { name: 'Water', amount: '300cc' },
      { name: 'Flour (Gold Medal)', amount: '250g' },
      { name: 'Oil', amount: '30g' },
      { name: 'Konbucha', amount: '15g' },
    ],
    steps_en: ['Mix well.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'GA Sauce — Garlic Lover',
    meta_en: 'Gyoza adventure sauce',
    ingredients_en: [
      { name: '3G sauce', amount: '1200g' },
      { name: 'Sake', amount: '300g' },
      { name: 'Mirin', amount: '300g' },
    ],
    steps_en: [
      'Boil sake and mirin to burn off alcohol.',
      'Mix in 3G sauce.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'GA Sauce — Yuzu Miso',
    meta_en: 'Gyoza adventure sauce',
    ingredients_en: [
      { name: 'Sake', amount: '250g' },
      { name: 'Mirin', amount: '500g' },
      { name: 'Sugar', amount: '700g' },
      { name: 'Miso', amount: '1000g' },
      { name: 'Yuzu juice', amount: '75g' },
    ],
    steps_en: [
      'Boil sake, mirin, and sugar to burn off alcohol.',
      'Mix in miso and yuzu juice.',
    ],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'GA Sauce — Kimchi Mayo',
    meta_en: 'Gyoza adventure sauce',
    ingredients_en: [
      { name: 'Kimchi sauce', amount: '450g' },
      { name: 'Mayonnaise', amount: '900g' },
      { name: 'Ginger sauce', amount: '450g' },
    ],
    steps_en: ['Mix all ingredients well.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'GA Sauce — Garlic Chive',
    meta_en: 'Gyoza adventure sauce',
    ingredients_en: [
      { name: 'Shoyu', amount: '1250cc' },
      { name: 'Sake', amount: '250cc' },
      { name: 'Chicken powder', amount: '50g' },
      { name: 'Sugar', amount: '250g' },
      { name: 'Garlic paste', amount: '200g' },
    ],
    steps_en: ['Mix everything and bring to a boil.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'GA Sauce — Mexican',
    meta_en: 'Gyoza adventure sauce',
    ingredients_en: [
      { name: 'Ketchup', amount: '20g' },
      { name: 'Nikumiso', amount: '20g' },
      { name: 'Ginger sauce', amount: '3g' },
    ],
    steps_en: ['Microwave for 40 seconds, then mix well.'],
    video_url: null,
  },

  {
    category_key: 'recipes',
    icon: '🥄',
    title_en: 'GA Sauce — Spicy Karaage',
    meta_en: 'Gyoza adventure sauce',
    ingredients_en: [
      { name: 'Sweet miso sauce', amount: '200g' },
      { name: 'Tanto kaeshi', amount: '150g' },
      { name: 'Ketchup', amount: '300g' },
      { name: 'Akadama spicy', amount: '50g' },
    ],
    steps_en: ['Mix all ingredients well.'],
    video_url: null,
  },

  // ─── PREP ─────────────────────────────────────────────────────────────────

  {
    category_key: 'prep',
    icon: '🐔',
    title_en: 'Karaage',
    meta_en: 'Cutting & marinating',
    ingredients_en: [
      { name: 'Chicken thigh', amount: '1000g' },
      { name: 'Sun noodle shoyu', amount: '60g' },
      { name: 'Chicken powder', amount: '15g' },
      { name: 'Garlic paste', amount: '15g' },
      { name: 'Ginger paste', amount: '15g' },
    ],
    steps_en: [
      'Cut chicken thighs into 25–35g pieces.',
      'Mix all ingredients together.',
      'Portion 170–180g into Ziploc bags.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🥬',
    title_en: 'Cabbage — Salt Prep',
    meta_en: 'Portioning',
    ingredients_en: [
      { name: 'Fresh cabbage', amount: '4000g (8.8 lb)' },
      { name: 'Salt (1%)', amount: '40g' },
    ],
    steps_en: [
      'Weigh fresh cabbage.',
      'Add 1% salt by weight.',
      'Wait 1.5 hours.',
      'Yield: 2200–2600g per 4000g cabbage.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🥗',
    title_en: 'Tanto Salad',
    meta_en: 'Portioning',
    ingredients_en: [
      { name: 'Red onion', amount: '15g' },
      { name: 'Corn', amount: '20g' },
      { name: 'Paprika', amount: '20g' },
      { name: 'Cucumber', amount: '25g' },
      { name: 'Blueberry', amount: '8g' },
      { name: 'Cherry tomato', amount: '3 pcs → 6 halves' },
      { name: 'Spring mix', amount: '60g' },
      { name: 'Tanto dressing (finish)', amount: '60g' },
      { name: 'Fried onion (finish)', amount: '10g' },
      { name: 'Nuts (finish)', amount: '20g' },
    ],
    steps_en: [
      'Place items 1–7 into square containers in order and label with date.',
      'When order comes in, transfer to salad bowl.',
      'Gently rearrange by hand for a neat finish.',
      'Top with dressing, fried onion, and nuts.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🌿',
    title_en: 'Green Onion Cut',
    meta_en: 'Cutting',
    ingredients_en: [
      { name: 'Green onion', amount: '5 lb' },
    ],
    steps_en: [
      'Cut with the green onion cutter at 1.5–2.5 mm.',
      'Put in square container and label with date.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🧅',
    title_en: 'Red Onion Cut',
    meta_en: 'Cutting',
    ingredients_en: [
      { name: 'Red onion', amount: '5–10 lb' },
    ],
    steps_en: [
      'Cut into 5 mm slices.',
      'Rinse under running water to remove the sharpness.',
      'Drain the water.',
      'Put in square container and label with date.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🫛',
    title_en: 'Menma Portion',
    meta_en: 'Portioning',
    ingredients_en: [
      { name: 'Menma', amount: '1 bag' },
    ],
    steps_en: [
      'Drain the sauce.',
      'Put in square container and label with date.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🌽',
    title_en: 'Corn Portion',
    meta_en: 'Portioning',
    ingredients_en: [
      { name: 'Corn', amount: '1 can' },
    ],
    steps_en: [
      'Drain the sauce.',
      'Put in square container and label with date.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🌸',
    title_en: 'Red Ginger Portion',
    meta_en: 'Portioning',
    ingredients_en: [
      { name: 'Red ginger', amount: '1 bag' },
    ],
    steps_en: [
      'Drain the sauce.',
      'Put in small container and label with date.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🌱',
    title_en: 'Bean Sprout Boil',
    meta_en: 'Prep',
    ingredients_en: [
      { name: 'Bean sprouts', amount: '●' },
    ],
    steps_en: [
      'Boil bean sprouts in noodle basket for 45 sec.',
      'Cool in running water.',
      'Put in square container and label with date.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🍄',
    title_en: 'Kikurage Portion',
    meta_en: 'Portioning',
    ingredients_en: [
      { name: 'Kikurage', amount: '300g' },
      { name: 'Water', amount: '7000cc' },
    ],
    steps_en: [
      'Soak wood ear kikurage in water in the fridge for 6+ hours.',
      'Drain the water.',
      'Put in square container and label with date.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🧈',
    title_en: 'Butter Cut',
    meta_en: 'Portioning',
    ingredients_en: [
      { name: 'Butter', amount: '1 block' },
    ],
    steps_en: [
      'Cut 1×1.5 inch, 2 mm wide, put in cold water.',
      'Place in small container, add date label.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🌿',
    title_en: 'Chive Cut',
    meta_en: 'Cutting',
    ingredients_en: [
      { name: 'Chive', amount: '100g' },
    ],
    steps_en: [
      '7mm cut.',
      'Place in small container, add date label.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🥬',
    title_en: 'Spinach Boil',
    meta_en: 'Prep',
    ingredients_en: [
      { name: 'Spinach', amount: '●' },
      { name: 'Water', amount: '●' },
    ],
    steps_en: [
      'Boil spinach for 20 sec.',
      'Cool in ice water.',
      'Squeeze lightly, put in square container.',
    ],
    video_url: null,
  },

  {
    category_key: 'prep',
    icon: '🍚',
    title_en: 'Rice',
    meta_en: 'Rice prep',
    ingredients_en: [
      { name: 'Rice', amount: '1200g' },
      { name: 'Water', amount: '1500cc' },
    ],
    steps_en: [
      'Ratio: Rice 1200g → Water 1500cc.',
      'Other ratios: 900g/1100cc, 600g/750cc, 450g/550cc.',
    ],
    video_url: null,
  },

  // ─── REFERENCE ────────────────────────────────────────────────────────────

  {
    category_key: 'reference',
    icon: '🍳',
    title_en: 'Fry Times',
    meta_en: 'Reference chart',
    ingredients_en: [
      { name: 'Karaage', amount: 'FRY 2:30 + 1 min rest' },
      { name: 'Miso Tonkatsu (cook frozen)', amount: 'FRY 3:00 + 1 min rest' },
      { name: 'Takoyaki', amount: 'FRY 2:30' },
      { name: 'French fries', amount: 'FRY 2:00' },
      { name: 'Shrimp', amount: 'FRY 2:00' },
      { name: 'Shishito', amount: 'FRY 1:00' },
      { name: 'Gyoza fry', amount: 'FRY 2:00–2:30' },
      { name: 'Garlic for 3G Mazemen', amount: 'FRY 2:00' },
    ],
    steps_en: [
      'All times are for reference only.',
      'Always do a visual check at the end.',
    ],
    video_url: null,
  },

  {
    category_key: 'reference',
    icon: '⚖️',
    title_en: 'Portion Sizes',
    meta_en: 'Reference chart',
    ingredients_en: [
      { name: 'Karaage chicken cut', amount: '25–35g per piece' },
      { name: 'Karaage portion', amount: '170–180g' },
      { name: 'Tonkatsu pork cut', amount: '15–22g per piece' },
      { name: 'Tonkatsu portion', amount: '120–130g' },
      { name: 'Takoyaki portion', amount: '5 pcs' },
      { name: 'French fries portion', amount: '280g' },
      { name: 'Shrimp portion', amount: 'Small 7 / Big 5' },
      { name: 'Clams portion', amount: '140–150g' },
      { name: 'Edamame portion', amount: '120g' },
      { name: 'Shishito portion', amount: '60–70g' },
    ],
    steps_en: [
      'Use a scale to verify portions.',
      'Adjust as needed based on visual check.',
    ],
    video_url: null,
  },

  {
    category_key: 'reference',
    icon: '📦',
    title_en: 'FIFO',
    meta_en: 'Food safety',
    ingredients_en: [
      { name: 'Salads', amount: 'Check dates' },
      { name: 'Carpaccio', amount: 'Check dates' },
      { name: 'Seafood', amount: 'Check dates' },
      { name: 'Meats', amount: 'Check dates' },
      { name: 'Vegetables', amount: 'Check dates' },
      { name: 'Sauces', amount: 'Check dates' },
      { name: 'All other items', amount: 'Check dates' },
    ],
    steps_en: [
      'Always check dates on all items.',
      'Follow FIFO: First In, First Out.',
      'Use older stock before newer stock.',
    ],
    video_url: null,
  },

  {
    category_key: 'reference',
    icon: '📋',
    title_en: 'Broth Package (Piikoi vs University)',
    meta_en: 'Reference chart',
    ingredients_en: [
      { name: 'Onion — Piikoi', amount: '1.5 pcs' },
      { name: 'Onion — University', amount: '1.5 pcs' },
      { name: 'Fresh Garlic — Piikoi', amount: '60g' },
      { name: 'Fresh Garlic — University', amount: '65g' },
      { name: 'Fresh Ginger — Piikoi', amount: '40g' },
      { name: 'Fresh Ginger — University', amount: '45g' },
      { name: 'Green onion (white) — Piikoi', amount: '100g' },
      { name: 'Green onion (white) — University', amount: '110g' },
      { name: 'Toridashi EX — Piikoi', amount: '200g' },
      { name: 'Toridashi EX — University', amount: '215g' },
      { name: 'Chicken powder — Piikoi', amount: '60g' },
      { name: 'Chicken powder — University', amount: '65g' },
      { name: 'Ajinomoto — Piikoi', amount: '5g' },
      { name: 'Ajinomoto — University', amount: '6.5g' },
    ],
    steps_en: [
      'Portion vegetables into separate Ziploc bags for each store.',
      'Portion seasonings into separate Ziploc bags.',
      'Label each bag with the date and store name.',
    ],
    video_url: null,
  },

];

async function importRecipes() {
  console.log(`Starting import of ${recipes.length} recipes...`);

  // Get category IDs
  const catResult = await pool.query('SELECT id, key FROM categories');
  const catMap = {};
  catResult.rows.forEach(r => { catMap[r.key] = r.id; });

  let inserted = 0;
  let skipped = 0;

  for (const r of recipes) {
    const categoryId = catMap[r.category_key];
    if (!categoryId) {
      console.warn(`⚠️  Unknown category: ${r.category_key} — skipping "${r.title_en}"`);
      skipped++;
      continue;
    }

    // Check if already exists
    const existing = await pool.query(
      'SELECT id FROM recipes WHERE title_en = $1',
      [r.title_en]
    );
    if (existing.rows.length > 0) {
      console.log(`↩️  Already exists, skipping: ${r.title_en}`);
      skipped++;
      continue;
    }

    await pool.query(
      `INSERT INTO recipes (category_id, icon, title_en, meta_en, ingredients_en, steps_en, video_url, is_active, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,true,0)`,
      [
        categoryId,
        r.icon,
        r.title_en,
        r.meta_en,
        JSON.stringify(r.ingredients_en),
        JSON.stringify(r.steps_en),
        r.video_url,
      ]
    );
    console.log(`✅ Inserted: ${r.title_en}`);
    inserted++;
  }

  console.log(`\nDone! Inserted: ${inserted}, Skipped: ${skipped}`);
  await pool.end();
}

importRecipes().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
