INSERT INTO `users` (`id`, `login`, `password`, `email`, `token`, `lastname`, `firstname`, `user_name`, `phone_number`) VALUES
('test_customer_2', 'test_customer_login_2', '', 'test.customer2.ambassador@yopmail.com', NULL, 'Doe', 'John', 'johndoe', ''),
('test_customer_3', 'test_customer_login_3', '', 'test.customer3.ambassador@yopmail.com', NULL, 'Doe', 'Jane', 'janedoe', ''),
('test_customer_4', 'test_customer_login_4', '', 'test.customer4.ambassador@yopmail.com', NULL, 'Bonne', 'Wesley', 'wesleybonne', ''),
('test_customer_5', 'test_customer_login_5', '', 'test.customer5.ambassador@yopmail.com', NULL, 'Nonn', 'Ma', 'manonn', ''),
('test_customer_6', 'test_customer_login_6', '', 'test.customer6.ambassador@yopmail.com', NULL, 'Sandors', 'Ron', 'ronsandors', ''),

('test_business_1', 'test_business_login_1', '', 'test.business1.ambassador@yopmail.com', NULL, 'fabric', 'wunda', 'wundafabric', ''),
('test_business_2', 'test_business_login_2', '', 'test.business2.ambassador@yopmail.com', NULL, 'cruise', 'goldman', 'goldmancruise', ''),
('test_business_3', 'test_business_login_3', '', 'test.business3.ambassador@yopmail.com', NULL, 'cruise', 'candy', 'candycruise', ''),
('test_business_4', 'test_business_login_4', '', 'test.business4.ambassador@yopmail.com', NULL, 'koffe', 'korner', 'kornerkoffe', '');

INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES
('test_customer_2', '2'),
('test_customer_3', '2'),
('test_customer_4', '2'),
('test_customer_5', '2'),
('test_customer_6', '2'),

('test_business_1', '3'),
('test_business_2', '3'),
('test_business_3', '3'),
('test_business_4', '3');


-- TODO: Remove/change before production (this whole file actually)
INSERT INTO `sms_sign_in` (`id`, `user_id`, `phone_number`, `verification_code`, `new_code_request_date_time`, `failed_times`, `verification_token`, `token_expire_date_time`) VALUES

(1, '2', '+852 101', NULL, NULL, 0, NULL, '2019-08-26 13:35:15'), -- ambassador
(2, 'test_customer_2', '+852 102', NULL, NULL, 0, NULL, '2019-08-26 13:35:15'),
(3, 'test_customer_3', '+852 103', NULL, NULL, 0, NULL, '2019-08-26 13:35:15'),
(4, 'test_customer_4', '+852 104', NULL, NULL, 0, NULL, '2019-08-26 13:35:15'),
(5, 'test_customer_5', '+852 105', NULL, NULL, 0, NULL, '2019-08-26 13:35:15'),
(6, 'test_customer_6', '+852 106', NULL, NULL, 0, NULL, '2019-08-26 13:35:15'),

(7, 'test_business_1', '+852 201', NULL, NULL, 0, NULL, '2019-08-26 13:35:15'),
(8, 'test_business_2', '+852 202', NULL, NULL, 0, NULL, '2019-08-26 13:35:15'),
(9, 'test_business_3', '+852 203', NULL, NULL, 0, NULL, '2019-08-26 13:35:15'),
(10, 'test_business_4', '+852 204', NULL, NULL, 0, NULL, '2019-08-26 13:35:15');


INSERT INTO `customers` (`id`, `civility`, `birth_date`, `instagram_id`, `profile_image_url`, `current_region_id`) VALUES
('test_customer_2', 'M', '1994-02-01', 'johndoe52353', 'https://randomuser.me/api/portraits/men/47.jpg', 1),
('test_customer_3', 'F', '1998-01-01', 'janedoe2421', 'https://randomuser.me/api/portraits/women/70.jpg', 1),
('test_customer_4', 'M', '1995-02-02', 'wesleyboone1234', 'https://randomuser.me/api/portraits/men/15.jpg', 1),
('test_customer_5', 'F', '1995-02-02', 'manonn2789', 'https://randomuser.me/api/portraits/women/32.jpg', 1),
('test_customer_6', 'M', '1995-02-02', 'ronsnd5600', 'https://randomuser.me/api/portraits/men/90.jpg', 1);


INSERT INTO `customers_categories` (`customer_id`, `category_id`) VALUES
('test_customer_2', 1),
('test_customer_2', 2),
('test_customer_2', 3),
('test_customer_3', '2'),
('test_customer_3', '1'),
('test_customer_4', '1');

INSERT INTO `wallets` (`uuid`, `region_id`, `customer_id`, `balance`) VALUES
('test_customer_2-wallet', 1, 'test_customer_2', 0),
('test_customer_3-wallet', 1, 'test_customer_3', 0),
('test_customer_4-wallet', 1, 'test_customer_4', 0),
('test_customer_5-wallet', 1, 'test_customer_5', 0),
('test_customer_6-wallet', 1, 'test_customer_6', 0);

INSERT INTO `business` (`id`, `region_id`, `sub_category_id`, `business_name`, `instagram_id`, `instagram_url`, `facebook_id`, `facebook_url`, `website_url`, `apple_store_url`,  `play_store_url`, `profile_image_url`, `description`, `status`, `passcode`) VALUES
('test_business_1', 1, '202', 'Wunda Fabric', 'wundafabricofficial', 'https://www.instagram.com/wundafabricofficial', 'wundafabric', 'https://www.facebook.com/wundafabric', 'https://wundafabrik.hk', 'https://apps.apple.com/us/app/facebook/id284882215', 'https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en_US', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/upload_files%2Fbusiness%2Fwundafabric.png?alt=media', 'Wunda Fabric is a multinational fabric expert that serves the needs of fashion enthusiasts . ', 'approved', '000000'),
('test_business_2', 1, '104', 'Goldman Cruise', 'goldmancruiseofficial', 'https://www.instagram.com/goldmancruiseofficial', 'goldmancruise', 'https://www.facebook.com/goldmancruise', 'https://goldmancruise.hk', 'https://apps.apple.com/us/app/facebook/id284882215', 'https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en_US', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/upload_files%2Fbusiness%2Fgoldmancruise.png?alt=media', 'Goldman Cruise is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'approved', '000000'),
('test_business_3', 1, '104', 'Candy Cruise', 'candycruiseofficial', 'https://www.instagram.com/candycruiseofficial', 'candycruise', 'https://www.facebook.com/candycruise', 'https://candycruise.hk', 'https://apps.apple.com/us/app/facebook/id284882215', 'https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en_US', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/upload_files%2Fbusiness%2Fcandycruise.png?alt=media', 'Candy Cruise is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'approved', '000000'),
('test_business_4', 1, '103', 'Korner Koffe', 'kornerkoffeofficial', 'https://www.instagram.com/kornerkoffeofficial', 'kornerkoffe', 'https://www.facebook.com/kornerkoffe', 'https://kornerkoffe.hk', 'https://apps.apple.com/us/app/facebook/id284882215', 'https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en_US', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/upload_files%2Fbusiness%2Fkornerkoffe.png?alt=media', 'Korner Koffe is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'approved', '000000');


INSERT INTO `promotions` (`uuid`, `business_id`, `online_transaction_type`, `target_number`, `budget`, `caption`, `description`, `terms_of_service`, `promo_image_url`, `is_returning_allowed`, `is_online_promo`, `is_web_url`, `start_date`, `end_date`, `is_free_of_charge`, `status`, `rejected_reason`, `created_date`, `updated_date`) VALUES
('AAAAAAA', 'test_business_3', NULL, 100, '2000.00', '$4 off per chocolate', 'In order to redeem the offer, you need to purchase any cold brew or latte for over HK$30 on a weekday. Public holiday excluded. The following branches are not in the promotion:\r\n- Hong Kong Airport …\r\n- The Peak\r\n- Lantau Island', 'Our Data Policy explains how we collect and use your personal data to determine some of the ads you see and provide all of the other services described below. You can also go to your settings at any time to revi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fimages%2Fpromotion-aaaa.jpg?alt=media', 0, 0, 0, '2019-07-02', '2019-12-01', 0, 'approved', NULL, '2019-07-02 12:00:00', '2019-07-02 12:01:00'),
('BBBBBBB', 'test_business_4', NULL, 50, '1000.00', 'Buy 2 and get 1 free', 'In order to redeem the offer, you need to purchase any cold brew or latte for over HK$30 on a weekday. Public holiday excluded. The following branches are not in the promotion:\r\n- Hong Kong Airport …\r\n- The Peak\r\n- Lantau Island', 'Our Data Policy explains how we collect and use your personal data to determine some of the ads you see and provide all of the other services described below. You can also go to your settings at any time to revi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fimages%2Fpromotion-bbbbb.png?alt=media', 0, 0, 0, '2019-07-03', '2019-12-31', 0, 'approved', NULL, '2019-07-03 12:00:00', '2019-07-03 12:01:00'),
('CCCCCCC', 'test_business_2', NULL, 50, '5550.00', '10% off for a dish', 'In order to redeem the offer, you need to purchase any cold brew or latte for over HK$30 on a weekday. Public holiday excluded. The following branches are not in the promotion:\r\n- Hong Kong Airport …\r\n- The Peak\r\n- Lantau Island', 'Our Data Policy explains how we collect and use your personal data to determine some of the ads you see and provide all of the other services described below. You can also go to your settings at any time to revi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fimages%2Fpromotion-ccccc.jpg?alt=media', 1, 0, 0, '2019-04-01', '2019-12-28', 0, 'approved', NULL, '2019-04-01 12:01:00', '2019-04-01 12:01:00'),
('XXXXXXX', 'test_business_1', NULL, 50, '700.00', '30% off on nice silk cloth', 'In order to redeem the offer, you need to purchase any cold brew or latte for over HK$30 on a weekday. Public holiday excluded. The following branches are not in the promotion:\r\n- Hong Kong Airport …\r\n- The Peak\r\n- Lantau Island', 'Our Data Policy explains how we collect and use your personal data to determine some of the ads you see and provide all of the other services described below. You can also go to your settings at any time to revi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fimages%2Fpromotion-xxxx.jpg?alt=media', 0, 0, 0, '2019-07-01', '2019-12-29', 0, 'approved', NULL, '2019-07-02 12:00:00', '2019-07-01 12:01:00'),
('YYYYYYY', 'test_business_1', NULL, 50, '500.00', '30% off on satin floral cloth', 'In order to redeem the offer, you need to purchase any cold brew or latte for over HK$30 on a weekday. Public holiday excluded. The following branches are not in the promotion:\r\n- Hong Kong Airport …\r\n- The Peak\r\n- Lantau Island', 'Our Data Policy explains how we collect and use your personal data to determine some of the ads you see and provide all of the other services described below. You can also go to your settings at any time to revi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fimages%2Fpromotion-yyyy.png?alt=media', 0, 0, 0, '2019-06-16', '2019-12-01', 0, 'approved', NULL, '2019-06-16 12:00:00', '2019-06-16 12:01:00'),
('YYYYYYZ', 'test_business_1', NULL, 50, '500.00', '15% off on satin floral cloth', 'In order to redeem the offer, you need to purchase any cold brew or latte for over HK$30 on a weekday. Public holiday excluded. The following branches are not in the promotion:\r\n- Hong Kong Airport …\r\n- The Peak\r\n- Lantau Island', 'Our Data Policy explains how we collect and use your personal data to determine some of the ads you see and provide all of the other services described below. You can also go to your settings at any time to revi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fimages%2Fpromotion-yyyy.png?alt=media', 0, 0, 0, '2019-05-01', '2019-06-15', 0, 'approved', NULL, '2019-05-01 12:00:00', '2019-05-01 12:01:00');

INSERT INTO `business_locations` (`uuid`, `business_id`, `district_id`, `address`, `caption`) VALUES
('wun_cau', 'test_business_1', '1', '8 Sun Wui Rd, Causeway Bay', 'Causeway Bay'),
('wun_wan', 'test_business_1', '2', '266 Queens Rd E, Wan Chai', 'Wan Chai'),
('wun_wan2', 'test_business_1', '2', '1F Shiu Fai Terrace, Stubbs Rd, Wan Chai', 'Wan Chai Pro'),
('wun_pea', 'test_business_1', '3', 'German Swiss International School (The Peak Campus) Upper Building, 11 Guildford Rd, The Peak', 'The Peak'),
('wun_mk', 'test_business_1', '5', '427A號, 427 Reclamation St, Mong Kok', 'Mong Kok'),
('wun_tst', 'test_business_1', '6', '63 Nathan Rd, Tsim Sha Tsui', 'Tsim Sha Tsui'),
('wun_tai', 'test_business_1', '8', '大埔寶鄉街88號, 88 Plaza, 3樓', 'Tai Po'),
('gol_cau', 'test_business_2', '1', '25 Lan Fong Rd, Causeway Bay', 'Causeway Bay'),
('gol_wan', 'test_business_2', '2', '3 Wan Chai Rd, Wan Chai', 'Wan Chai'),
('gol_wan2', 'test_business_2', '2', '68 Stone Nullah Ln, Wan Chai', 'Wan Chai Pro'),
('can_cau', 'test_business_3', '1', '62 Tung Lo Wan Rd, Causeway Bay', 'Causeway Bay'),
('can_wan', 'test_business_3', '2', '28 Wood Rd, Morrison Hill', 'Wan Chai'),
('can_wan2', 'test_business_3', '2', '灣仔皇后大道東284號字樓4', 'Wan Chai Pro'),
('kor_cau', 'test_business_4', '1', '14 Sun Chun St, Tai Hang', 'Causeway Bay'),
('kor_wan', 'test_business_4', '2', '41 Spring Garden Ln, Wan Chai', 'Wan Chai'),
('kor_wan2', 'test_business_4', '2', 'Shop F39A & F41A, 1/F, Lee Tung Avenue, 200 Queens Rd E, Wan Chai', 'Wan Chai Pro');


INSERT INTO `promotions_business_locations` (`promotion_id`, `business_location_id`) VALUES
('YYYYYYY', 'wun_cau'),
('YYYYYYY', 'wun_wan'),
('YYYYYYY', 'wun_wan2'),
('YYYYYYY', 'wun_mk'),
('YYYYYYY', 'wun_tst'),
('YYYYYYY', 'wun_tai'),
('XXXXXXX', 'wun_cau'),
('XXXXXXX', 'wun_wan'),
('XXXXXXX', 'wun_wan2'),
('XXXXXXX', 'wun_mk'),
('XXXXXXX', 'wun_tst'),
('XXXXXXX', 'wun_tai'),
('CCCCCCC', 'gol_cau'),
('CCCCCCC', 'gol_wan'),
('CCCCCCC', 'gol_wan2'),
('BBBBBBB', 'can_cau'),
('BBBBBBB', 'can_wan'),
('BBBBBBB', 'can_wan2'),
('AAAAAAA', 'kor_cau'),
('AAAAAAA', 'kor_wan'),
('AAAAAAA', 'kor_wan2');


-- Linked to redeemOfflinePromotion mutation

INSERT INTO `business_payments` (`uuid`, `business_id`, `stripe_card_last_4`, `stripe_customer_id`, `stripe_subscription_item_id`) VALUES
('test_business_1_payment_uuid', 'test_business_1', 4242, 'cus_FeodZQYUQcIrkW', 'si_FeodnP9UOdf5T4'),
('test_business_2_payment_uuid', 'test_business_2', 4242, 'cus_FeojFoakTDS2os', 'si_FeojXqsIvXjy1L'),
('test_business_3_payment_uuid', 'test_business_3', 4242, 'cus_FeokpoTZgvu1pj', 'si_FeokB0aPoZ9wlJ'),
('test_business_4_payment_uuid', 'test_business_4', 4242, 'cus_FeokBpbVGXdzXI', 'si_Feokz8ywnSjuKn');

INSERT INTO `refers` (`uuid`, `online_redemption_invoice_number`, `online_promo_pricing_id`, `redeemed`, `referrer`, `promotion_id`, `is_shared`, `created_date`, `updated_date`) VALUES
('pro_boo_sot_wun', NULL, NULL, 'test_customer_4', '2', 'XXXXXXX', 1, '2019-08-07 03:53:33', '2019-08-07 03:53:43'),
('pro_man_sot_wun', NULL, NULL, 'test_customer_5', '2', 'XXXXXXX', 1, '2019-08-07 03:54:47', '2019-08-07 03:54:57'),
('pro_lin_sot_can', NULL, NULL, 'test_customer_3', '2', 'AAAAAAA', 1, '2019-08-07 03:58:01', '2019-08-07 03:58:11'),
('pro_boo_sot_kof', NULL, NULL, 'test_customer_4', '2', 'BBBBBBB', 1, '2019-08-07 03:51:20', '2019-08-07 03:51:30'),
('pro_lin_boo_kof', NULL, NULL, 'test_customer_3', 'test_customer_4', 'BBBBBBB', 0, '2019-08-07 03:58:20', '2019-08-07 03:58:20'),
('pro_san_sot_wun', NULL, NULL, 'test_customer_6', '2', 'XXXXXXX', 1, '2019-08-07 03:55:02', '2019-08-07 03:55:12');

INSERT INTO `transactions` (`uuid`, `user_id`, `refer_id`, `business`, `paypal_payout_batch_id`, `amount`, `status`, `failed_reason`, `type`, `updated_date`, `created_date`) VALUES
('L84AJ13', 'test_customer_4', 'pro_lin_boo_kof', 'test_business_4', NULL, '3.00', 'approved', NULL, 'reward', '2019-08-07 03:58:20', '2019-08-07 03:58:20'),
('6RN7Z63', '2', 'pro_boo_sot_wun', 'test_business_1', NULL, '20.00', 'approved', NULL, 'reward', '2019-08-07 03:53:33', '2019-08-07 03:53:33'),
('HC4OZ4P', '2', 'pro_man_sot_wun', 'test_business_1', NULL, '20.00', 'approved', NULL, 'reward', '2019-08-07 03:54:47', '2019-08-07 03:54:47'),
('CIZJ3GB', '2', 'pro_lin_sot_can', 'test_business_3', NULL, '4.00', 'approved', NULL, 'reward', '2019-08-07 03:58:01', '2019-08-07 03:58:01'),
('R0107XH', '2', 'pro_boo_sot_kof', 'test_business_4', NULL, '5.00', 'approved', NULL, 'reward', '2019-08-07 03:51:20', '2019-08-07 03:51:20'),
('G3B1FT9', '2', 'pro_lin_boo_kof', 'test_business_4', NULL, '2.00', 'approved', NULL, 'reward', '2019-08-07 03:58:20', '2019-08-07 03:58:20'),
('ZVAE9NV', '2', 'pro_san_sot_wun', 'test_business_1', NULL, '20.00', 'approved', NULL, 'reward', '2019-08-07 03:55:02', '2019-08-07 03:55:02'),
('LFB8PCI', 'test_customer_4', NULL, NULL, NULL, '1.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:01', '2019-08-07 03:55:01'),
('3JK0LV7', 'test_customer_4', NULL, NULL, NULL, '2.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:02', '2019-08-07 03:55:02'),
('V9YWL3M', 'test_customer_4', NULL, NULL, NULL, '3.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:03', '2019-08-07 03:55:03'),
('DXDMZSZ', 'test_customer_4', NULL, NULL, NULL, '4.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:04', '2019-08-07 03:55:04'),
('UA8KY82', 'test_customer_4', NULL, NULL, NULL, '5.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:05', '2019-08-07 03:55:05'),
('W7T5W0Y', 'test_customer_4', NULL, NULL, NULL, '6.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:06', '2019-08-07 03:55:06'),
('T6Y4X72', 'test_customer_4', NULL, NULL, NULL, '7.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:07', '2019-08-07 03:55:07'),
('O3I20UT', 'test_customer_4', NULL, NULL, NULL, '8.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:08', '2019-08-07 03:55:08'),
('DJKSZAN', 'test_customer_4', NULL, NULL, NULL, '9.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:09', '2019-08-07 03:55:09'),
('O34HHB0', 'test_customer_4', NULL, NULL, NULL, '10.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:10', '2019-08-07 03:55:10'),
('3JK0LV8', 'test_customer_4', NULL, NULL, NULL, '11.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:11', '2019-08-07 03:55:11'),
('V9YWL4M', 'test_customer_4', NULL, NULL, NULL, '12.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:12', '2019-08-07 03:55:12'),
('DXDMZUZ', 'test_customer_4', NULL, NULL, NULL, '13.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:13', '2019-08-07 03:55:13'),
('UA8KY80', 'test_customer_4', NULL, NULL, NULL, '14.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:14', '2019-08-07 03:55:14'),
('W7T7W0Y', 'test_customer_4', NULL, NULL, NULL, '15.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:15', '2019-08-07 03:55:15'),
('T6Y0X72', 'test_customer_4', NULL, NULL, NULL, '16.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:16', '2019-08-07 03:55:16'),
('O3I10UT', 'test_customer_4', NULL, NULL, NULL, '17.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:17', '2019-08-07 03:55:17'),
('DJKPZAN', 'test_customer_4', NULL, NULL, NULL, '18.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:18', '2019-08-07 03:55:18'),
('O30HHB0', 'test_customer_4', NULL, NULL, NULL, '19.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:19', '2019-08-07 03:55:19'),
('KJK0LV7', 'test_customer_4', NULL, NULL, NULL, '20.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:20', '2019-08-07 03:55:20'),
('VMYWL3M', 'test_customer_4', NULL, NULL, NULL, '21.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:21', '2019-08-07 03:55:21'),
('DXDM0SZ', 'test_customer_4', NULL, NULL, NULL, '22.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:22', '2019-08-07 03:55:22'),
('UA8KYP2', 'test_customer_4', NULL, NULL, NULL, '23.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:23', '2019-08-07 03:55:23'),
('W7T5WMY', 'test_customer_4', NULL, NULL, NULL, '24.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:24', '2019-08-07 03:55:24'),
('T6Y4X77', 'test_customer_4', NULL, NULL, NULL, '25.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:25', '2019-08-07 03:55:25'),
('O3IJ0UT', 'test_customer_4', NULL, NULL, NULL, '26.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:26', '2019-08-07 03:55:26'),
('DJKMZAN', 'test_customer_4', NULL, NULL, NULL, '27.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:27', '2019-08-07 03:55:27'),
('O34DHB0', 'test_customer_4', NULL, NULL, NULL, '28.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:28', '2019-08-07 03:55:28'),
('O34FEB0', 'test_customer_4', NULL, NULL, NULL, '29.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:29', '2019-08-07 03:55:29'),
('OGRDHB0', 'test_customer_4', NULL, NULL, NULL, '30.00', 'approved', NULL, 'withdraw', '2019-08-07 03:55:30', '2019-08-07 03:55:30'),
('L8ZXO3H', 'test_customer_3', NULL, 'test_business_3', NULL, '100.00', 'approved', NULL, 'report', '2019-08-07 03:55:10', '2019-08-07 03:55:10'),
('DG7SALL', 'test_customer_4', NULL, 'test_business_3', NULL, '60.00', 'approved', NULL, 'report', '2019-08-07 03:55:10', '2019-08-07 03:55:10');

INSERT INTO `bills` (`uuid`, `type`, `business_id`, `refer_id`, `business_payment_id`, `amount`, `failed_reason`, `updated_date`, `created_date`) VALUES
('233534ff-0c22-42fe-bf6e-d351b661ba86', 'business_charge', 'test_business_3', 'pro_lin_sot_can', 'test_business_3_payment_uuid', '4.00', NULL, '2019-08-07 03:58:01', '2019-08-07 03:58:01'),
('9baaf35c-d132-4eb8-94fe-4a945df61a2f', 'business_charge', 'test_business_4', 'pro_boo_sot_kof', 'test_business_4_payment_uuid', '5.00', NULL, '2019-08-07 03:51:20', '2019-08-07 03:51:20'),
('af16852a-97a0-4ea4-b3ef-5b107a32d945', 'business_charge', 'test_business_1', 'pro_san_sot_wun', 'test_business_1_payment_uuid', '20.00', NULL, '2019-08-07 03:55:02', '2019-08-07 03:55:02'),
('b1efed19-d01e-4645-aac4-5c939bfa2413', 'business_charge', 'test_business_1', 'pro_boo_sot_wun', 'test_business_1_payment_uuid', '20.00', NULL, '2019-08-07 03:53:33', '2019-08-07 03:53:33'),
('b95cb516-b080-4987-940a-e717fc6c9c90', 'business_charge', 'test_business_1', 'pro_man_sot_wun', 'test_business_1_payment_uuid', '20.00', NULL, '2019-08-07 03:54:47', '2019-08-07 03:54:47'),
('d9dfdd09-bcb5-4319-b776-9f83e0424a8b', 'business_charge', 'test_business_4', 'pro_lin_boo_kof', 'test_business_4_payment_uuid', '5.00', NULL, '2019-08-07 03:58:20', '2019-08-07 03:58:20');

INSERT INTO `wallets` (`uuid`, `region_id`, `customer_id`, `balance`, `created_date`, `updated_date`) VALUES
('7ab20e08-91ec-46d5-9145-ae36aedd39b1', 1, '2', '71.00', '2019-08-07 03:51:20', '2019-08-07 03:58:20'),
('fd46ac4a-eba4-4535-b1bd-ee352ff4a9f8', 1, 'test_customer_4', '33.00', '2019-08-07 03:58:20', '2019-08-07 03:58:20');


-- Online Promotions & Pending Online Redemption

INSERT INTO `promotions` (`uuid`, `business_id`, `online_transaction_type`, `target_number`, `budget`, `caption`, `description`, `terms_of_service`, `promo_image_url`, `is_returning_allowed`, `is_online_promo`, `is_web_url`, `start_date`, `end_date`, `is_free_of_charge`, `status`, `rejected_reason`, `created_date`, `updated_date`) VALUES
('ONLINE1', 'test_business_1', 'total contract value (number of months * rent)', 1000, NULL, 'Test Online Promotion 1', 'In order to redeem the offer, you need to purchase any cold brew or latte for over HK$30 on a weekday. Public holiday excluded. The following branches are not in the promotion:\r\n- Hong Kong Airport …\r\n- The Peak\r\n- Lantau Island', 'Our Data Policy explains how we collect and use your personal data to determine some of the ads you see and provide all of the other services described below. You can also go to your settings at any time to revi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fimages%2Fpromotion-aaaa.jpg?alt=media', 0, 1, 1, '2019-10-01', NULL, 0, 'approved', NULL, '2019-10-01 13:46:15', '2019-10-01 13:46:15'),
('ONLINE2', 'test_business_1', 'monthly membership fee', 2000, NULL, 'Test Online Promotion 2', 'In order to redeem the offer, you need to purchase any cold brew or latte for over HK$30 on a weekday. Public holiday excluded. The following branches are not in the promotion:\r\n- Hong Kong Airport …\r\n- The Peak\r\n- Lantau Island', 'Our Data Policy explains how we collect and use your personal data to determine some of the ads you see and provide all of the other services described below. You can also go to your settings at any time to revi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://firebasestorage.googleapis.com/v0/b/ambassador-79f95.appspot.com/o/static%2Fimages%2Fpromotion-aaaa.jpg?alt=media', 0, 1, 1, '2019-10-02', NULL, 0, 'approved', NULL, '2019-10-02 13:46:15', '2019-10-02 13:46:15');


INSERT INTO `pending_online_redemption` (`uuid`, `online_promo_pricing_id`, `redeemed`, `referrer`, `promotion_id`, `online_redemption_invoice_number`, `online_redemption_transaction_value`, `is_approved`, `is_shared`, `created_date`, `updated_date`) VALUES
('test-pending_online_redemption-1', '201', 'test_customer_5', '2', 'ONLINE1', '234GD63DA22', '20', NULL, '0', '2019-10-21 00:01:00', '2019-10-21 00:00:00'),
('test-pending_online_redemption-2', '202', 'test_customer_2', '2', 'ONLINE1', 'DD6EHD7303', '15', NULL, '0', '2019-10-21 00:02:00', '2019-10-21 00:00:00'),
('test-pending_online_redemption-3', '203', 'test_customer_3', '2', 'ONLINE1', '234GD63DA22', '500', NULL, '0', '2019-10-21 00:03:00', '2019-10-21 00:00:00'),
('test-pending_online_redemption-4', '201', 'test_customer_4', '2', 'ONLINE1', 'DD6EHD7303', '1000', NULL, '0', '2019-10-21 00:04:00', '2019-10-21 00:00:00'),
('test-pending_online_redemption-5', '201', 'test_customer_5', '2', 'ONLINE2', '234GD63DA22', '160', NULL, '0', '2019-10-21 00:01:00', '2019-10-21 00:00:00'),
('test-pending_online_redemption-6', '202', 'test_customer_2', '2', 'ONLINE2', 'DD6EHD7303', '180', NULL, '0', '2019-10-21 00:02:00', '2019-10-21 00:00:00'),
('test-pending_online_redemption-7', '203', 'test_customer_3', '2', 'ONLINE2', '234GD63DA22', '3.50', NULL, '0', '2019-10-21 00:03:00', '2019-10-21 00:00:00'),
('test-pending_online_redemption-8', '201', 'test_customer_4', '2', 'ONLINE2', 'DD6EHD7303', '10.99', NULL, '0', '2019-10-21 00:04:00', '2019-10-21 00:00:00');


-- pending_apply_history_redemption

INSERT INTO `pending_apply_history_redemption` (`uuid`, `redeemed`, `referrer`, `promotion_id`, `is_approved`, `customer_proof_image_url`, `customer_description`, `is_shared`, `created_date`, `updated_date`) VALUES
('test-pending-1', 'test_customer_5', NULL, 'ONLINE1', NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/800px-ReceiptSwiss.jpg', 'Sending proof of purchase for reference. Purchased a silk fabric a week before, you can check the date in the provided picture. Thanks.', '0', '2019-10-15 00:00:00', '2019-10-15 00:00:00'),
('test-pending-2', 'test_customer_2', NULL, 'ONLINE1', NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/800px-ReceiptSwiss.jpg', 'Proof attached of a fabric purchase', '0', '2019-10-15 00:01:00', '2019-10-15 00:01:00'),
('test-pending-3', 'test_customer_3', NULL, 'ONLINE1', NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/800px-ReceiptSwiss.jpg', 'See image for bill on Wunda fabric', '0', '2019-10-15 00:02:00', '2019-10-15 00:02:00'),
('test-pending-4', 'test_customer_4', NULL, 'ONLINE1', NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/800px-ReceiptSwiss.jpg', 'Bill as requested', '0', '2019-10-15 00:03:00', '2019-10-15 00:03:00'),
('test-pending-5', 'test_customer_6', NULL, 'ONLINE1', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/800px-ReceiptSwiss.jpg', 'Foo bar', '0', '2019-10-15 00:03:00', '2019-10-15 00:03:00');
