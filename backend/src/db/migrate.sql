-- tanto-recipes initial schema
-- Run this once on your Railway PostgreSQL database

CREATE TABLE IF NOT EXISTS categories (
  id          SERIAL PRIMARY KEY,
  key         VARCHAR(50) UNIQUE NOT NULL,
  icon        VARCHAR(10) NOT NULL,
  label_en    VARCHAR(100) NOT NULL,
  sub_en      VARCHAR(200),
  color_badge VARCHAR(20) DEFAULT '#F1EFE8',
  color_text  VARCHAR(20) DEFAULT '#5F5E5A',
  sort_order  INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS recipes (
  id              SERIAL PRIMARY KEY,
  category_id     INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  icon            VARCHAR(10) DEFAULT '🍽',
  title_en        VARCHAR(200) NOT NULL,
  meta_en         VARCHAR(200),
  ingredients_en  JSONB DEFAULT '[]',
  steps_en        JSONB DEFAULT '[]',
  video_url       TEXT,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Seed categories
INSERT INTO categories (key, icon, label_en, sub_en, color_badge, color_text, sort_order) VALUES
  ('howto',     '🎬', 'How To',    'Cooking methods & plating',            '#E1F5EE', '#0F6E56', 1),
  ('recipes',   '📖', 'Recipes',   'Soups, sauces & prep recipes',         '#E6F1FB', '#185FA5', 2),
  ('prep',      '🔪', 'Prep',      'Cutting, portioning & mise en place',  '#FAEEDA', '#854F0B', 3),
  ('reference', '📋', 'Reference', 'Fry times, portions & FIFO',           '#EEEDFE', '#534AB7', 4)
ON CONFLICT (key) DO NOTHING;

-- Seed sample recipes
INSERT INTO recipes (category_id, icon, title_en, meta_en, ingredients_en, steps_en, video_url, sort_order)
SELECT c.id, '🍜', 'Ramen — Tanto Shoyu', 'How to finish a bowl',
  '[{"name":"Chicken broth","amount":"330ml"},{"name":"Shoyu base","amount":"36ml"},{"name":"Backfat","amount":"●"}]',
  '["Heat chicken broth to serving temp.","Add shoyu base and stir well.","Ladle into bowl.","Finish with a drizzle of backfat."]',
  null, 1
FROM categories c WHERE c.key = 'howto'
ON CONFLICT DO NOTHING;

INSERT INTO recipes (category_id, icon, title_en, meta_en, ingredients_en, steps_en, video_url, sort_order)
SELECT c.id, '🥟', 'Gyoza — how to cook', 'Griddle method',
  '[{"name":"Sesame lard","amount":"drops"},{"name":"Water","amount":"½–1 ladle"},{"name":"Gyoza","amount":"6–36 pcs"}]',
  '["Add drops of sesame lard to griddle for each gyoza.","Arrange gyoza leaving ~1cm between each.","Drizzle sesame lard on top.","Pour water to steam (6–8 pcs: ½ ladle / 16 pcs: ⅔ ladle / 24 pcs: 1 ladle).","Cover and cook 3 minutes.","Remove lid — if edges are golden brown and crispy, ready to serve."]',
  null, 2
FROM categories c WHERE c.key = 'howto'
ON CONFLICT DO NOTHING;

INSERT INTO recipes (category_id, icon, title_en, meta_en, ingredients_en, steps_en, video_url, sort_order)
SELECT c.id, '🍜', 'Tanto Shoyu base', 'Soup base recipe',
  '[{"name":"Shoyu","amount":"5000cc"},{"name":"Sugar","amount":"1000g"},{"name":"Sake","amount":"500cc"},{"name":"Mirin","amount":"800cc"}]',
  '["Boil sake, mirin, and sugar to burn off the alcohol.","Add soy sauce and bring to a quick boil."]',
  null, 1
FROM categories c WHERE c.key = 'recipes'
ON CONFLICT DO NOTHING;

INSERT INTO recipes (category_id, icon, title_en, meta_en, ingredients_en, steps_en, video_url, sort_order)
SELECT c.id, '🍳', 'Fry times', 'Reference chart',
  '[{"name":"Karaage","amount":"2:30 + 1 min rest"},{"name":"Miso tonkatsu","amount":"3:00 + 1 min rest"},{"name":"Takoyaki","amount":"2:30"},{"name":"French fries","amount":"2:00"},{"name":"Shrimp","amount":"2:00"},{"name":"Shishito","amount":"1:00"},{"name":"Gyoza (fry)","amount":"2:00–2:30"},{"name":"Garlic for 3G","amount":"2:00"}]',
  '["All times are for reference only.","Always do a visual check at the end."]',
  null, 1
FROM categories c WHERE c.key = 'reference'
ON CONFLICT DO NOTHING;
