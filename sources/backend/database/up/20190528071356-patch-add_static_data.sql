INSERT INTO `regions` (`id`, `name`) VALUES
('1', 'Hong Kong'),
('2', 'India');


-- TODO/WARNING: if you change the ambassador Customer id, you need to change inside src/Model/Customer.php as well
INSERT INTO `users` (`id`, `login`, `password`, `email`, `token`, `lastname`, `firstname`, `user_name`, `phone_number`) VALUES
('2', 'ambassador', '', 'ambassador@test.com', NULL, 'Customer', 'ambassador', 'ambassador', '+852 123456');
INSERT INTO `customers` (`id`, `civility`, `birth_date`, `instagram_id`, `profile_image_url`, `current_region_id`) VALUES
('2', 'F', '1998-01-01', 'ambassadorhk', null, 1);
INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES
('2', '2');
INSERT INTO `wallets` (`uuid`, `region_id`, `customer_id`, `balance`) VALUES
('ambassador-wallet', 1, '2', 0);


INSERT INTO `districts` (`id`, `region_id`, `name`) VALUES
('1', '1', 'Causeway Bay'),
('2', '1', 'Wan Chai'),
('3', '1', 'The Peak'),
('4', '1', 'Central'),
('5', '1', 'Mong Kok'),
('6', '1', 'Tsim Sha Tsui'),
('7', '1', 'Sha Tin'),
('8', '1', 'Tai Po'),
('9', '1', 'Lamma Island');

-- TODO: wait for correct icons
INSERT INTO `categories` (`id`, `label`, `icon_white_url`, `icon_grey_url`, `icon_black_url`) VALUES
(1, 'Food', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_white.png?alt=media&token=c4a7458c-0636-47ea-b356-7906533d312d', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_grey.png?alt=media&token=29f7144a-4656-4fb4-8511-0f6dfe6dfc13', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_black.png?alt=media&token=9fa14166-3982-4edb-ba08-8b537c0e084c'),
(2, 'Cosmetic', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_white.png?alt=media&token=c4a7458c-0636-47ea-b356-7906533d312d', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_grey.png?alt=media&token=29f7144a-4656-4fb4-8511-0f6dfe6dfc13', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_black.png?alt=media&token=9fa14166-3982-4edb-ba08-8b537c0e084c'),
(3, 'Sport', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_white.png?alt=media&token=c4a7458c-0636-47ea-b356-7906533d312d', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_grey.png?alt=media&token=29f7144a-4656-4fb4-8511-0f6dfe6dfc13', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_black.png?alt=media&token=9fa14166-3982-4edb-ba08-8b537c0e084c'),
(4, 'Travel', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_white.png?alt=media&token=c4a7458c-0636-47ea-b356-7906533d312d', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_grey.png?alt=media&token=29f7144a-4656-4fb4-8511-0f6dfe6dfc13', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_black.png?alt=media&token=9fa14166-3982-4edb-ba08-8b537c0e084c'),
(5, 'Space', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_white.png?alt=media&token=c4a7458c-0636-47ea-b356-7906533d312d', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_grey.png?alt=media&token=29f7144a-4656-4fb4-8511-0f6dfe6dfc13', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fcategory_icons%2Ffood_black.png?alt=media&token=9fa14166-3982-4edb-ba08-8b537c0e084c');


INSERT INTO `sub_categories` (`id`, `category_id`, `label`) VALUES
-- Food & Beverage
(101, 1, 'Street Food & Drink'),
(102, 1, 'Bakery & Dessert'),
(103, 1, 'Light Meal & Cafe'),
(104, 1, 'Bar & Pub'),
(105, 1, 'Standard Fast Food'),
(106, 1, 'Premium Fast Food'),
(107, 1, 'Standard Diner'),
(108, 1, 'Premium Diner'),
(109, 1, 'Fine-Dining'),
(110, 1, 'Buffet'),

-- Cosmetic & Skincare
(201, 2, 'High Street Brand'),
(202, 2, 'Premium Brand'),
(203, 2, 'Luxury Brand'),

-- Sport
(301, 3, 'Sport Activities'),

-- Transportation
(401, 4, 'Ride'),
(402, 4, 'Parking'),

-- Co-working
(501, 5, 'Economic Hotdesk / Office'),
(502, 5, 'Standard Hotdesk / Office'),
(503, 5, 'Premium Hotdesk / Office'),
(504, 5, 'Other Contract');


-- TODO: add values for India
INSERT INTO `sub_category_customer_average_spending` (`id`, `sub_category_id`, `region_id`, `min_average_spending`, `max_average_spending`) VALUES
-- HK
(101, 101, 1, 20, 50),
(102, 102, 1, 50, 100),
(103, 103, 1, 50, 150),
(104, 104, 1, 123, 456), -- TODO: wait for correct info
(105, 105, 1, 50, 110),
(106, 106, 1, 100, 200),
(107, 107, 1, 200, 300),
(108, 108, 1, 300, 800),
(109, 109, 1, 800, null),
(110, 110, 1, 400, null),
(201, 201, 1, null, 500),
(202, 202, 1, 500, 800),
(203, 203, 1, 800, null),
(301, 301, 1, 123, 456), -- TODO: wait for correct info
(401, 401, 1, 123, 456), -- TODO: wait for correct info
(402, 402, 1, 456, 789), -- TODO: wait for correct info
(501, 501, 1, null, 1500),
(502, 502, 1, 1500, 3000),
(503, 503, 1, 3000, 5000),
(504, 504, 1, 5000, null);


-- TODO: add values for India
INSERT INTO `offline_promo_pricing` (`id`, `sub_category_id`, `region_id`, `charge`, `referrer_share`, `ambassador_share`) VALUES
-- HK
(101, 101, 1, 5, 3, 2),
(102, 102, 1, 8, 5, 3),
(103, 103, 1, 15, 10, 5),
(104, 104, 1, 30, 20, 10),
(105, 105, 1, 8, 5, 3),
(106, 106, 1, 15, 10, 5),
(107, 107, 1, 30, 20, 10),
(108, 108, 1, 60, 40, 20),
(109, 109, 1, 150, 100, 50),
(110, 110, 1, 100, 60, 40),
(201, 201, 1, 30, 20, 10),
(202, 202, 1, 50, 35, 15),
(203, 203, 1, 80, 50, 30),
(301, 301, 1, 50, 30, 20);
-- 401
-- 402
-- 501
-- 502
-- 503
-- 504

-- TODO: add values for India
INSERT INTO `online_promo_pricing` (`id`, `category_id`, `region_id`, `customer_min_spending`, `customer_max_spending`, `charge`, `referrer_share`, `redeemer_share`,`ambassador_share`) VALUES
-- HK
-- 101
-- 102
-- 103
-- 104
-- 105
-- 106
-- 107
-- 108
-- 109
-- 110
(201, 2, 1, null, 500, 8, 3.5, 3, 1.5),
(202, 2, 1, 500, 800, 10, 3.5, 4.5, 2),
(203, 2, 1, 800, 6000, 12, 4, 5, 3),
(301, 3, 1, 123, 456, 25, 10, 10, 5),
(401, 4, 1, 123, 456, 10, 4, 4, 2), -- TODO: wait for correct info
(402, 4, 1, 456, 789, 10, 4, 4, 2), -- TODO: wait for correct info
(501, 5, 1, null, 1000, 15, 6, 5, 4),
(502, 5, 1, 1000, 5000, 10, 4, 4, 2), -- TODO: wait for correct info
(503, 5, 1, 5000, 10000, 6, 2, 2, 2),
(504, 5, 1, 10000, 1000000, 8.5, 6, 1, 1.5);
