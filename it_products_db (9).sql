-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2023 at 07:45 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it_products_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `isDelete`, `date`) VALUES
(32, 'Laptops', 'not', '2023-11-30 01:25:28');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `ratings` int(11) NOT NULL,
  `comments` text NOT NULL,
  `is_like` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `product_id`, `ratings`, `comments`, `is_like`, `date`, `isDelete`) VALUES
(17, 13, 11, 4, 'this is my comment', 0, '2023-11-30 01:35:26', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `like_product`
--

CREATE TABLE `like_product` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0 = not like, 1 = liked',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `my_cart`
--

CREATE TABLE `my_cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `my_cart`
--

INSERT INTO `my_cart` (`id`, `user_id`, `product_id`, `quantity`, `date`, `isDelete`) VALUES
(76, 13, 11, 1, '2023-11-30 01:26:27', 'not'),
(77, 13, 12, 8, '2023-11-30 12:02:58', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notification_type` varchar(50) NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `url` varchar(255) NOT NULL,
  `seen` int(11) NOT NULL DEFAULT 0 COMMENT '0 => not seen\r\n1 => seen',
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `notification_type`, `content`, `date`, `url`, `seen`, `isDelete`) VALUES
(140, 1, 'Place Order', 'customer customer had new order!', '2023-11-30 01:34:35', '', 0, 'not'),
(141, 13, 'Order Status', 'Your order status was updated to Received.', '2023-11-30 01:35:09', '', 0, 'not'),
(142, 1, 'feedback', 'customer customer added feedback on Mr. Joker', '2023-11-30 01:35:26', '', 0, 'not'),
(143, 1, 'Place Order', 'customer customer had new order!', '2023-11-30 12:03:34', '', 0, 'not'),
(144, 13, 'Order Status', 'Your order status was updated to To Ship.', '2023-11-30 12:04:16', '', 0, 'not');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `product_info` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `each_amount` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(59) NOT NULL,
  `email` varchar(100) NOT NULL,
  `payment_type` varchar(20) NOT NULL,
  `shipping` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'Pending',
  `isDelete` varchar(20) NOT NULL DEFAULT 'not',
  `total_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `fullname`, `product_id`, `product_info`, `quantity`, `each_amount`, `address`, `phone_number`, `email`, `payment_type`, `shipping`, `date`, `status`, `isDelete`, `total_amount`) VALUES
(62, 13, 'customer customer', '11', 'Mr. Joker', '2', '40.00', 'sdf. sdf sdf, dsfsd', '09234321', 'customer@gmail.com', 'Cash on Delivery', 130, '2023-11-30 01:34:35', 'Received', 'not', 170),
(63, 13, 'customer customer', '12', 'sample product', '8', '80.00', 'sdf. sdf sdf, dsfsd', '09234321', 'customer@gmail.com', 'Cash on Delivery', 130, '2023-11-30 12:03:34', 'To Ship', 'not', 210);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category` varchar(200) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `prize` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `sold` int(11) NOT NULL,
  `ratings` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category`, `image`, `name`, `description`, `address`, `stock`, `prize`, `discount`, `sold`, `ratings`, `date`, `isDelete`) VALUES
(11, 'Laptops', 'assets/product image/1701307560657_+_joker smile.jpg', 'Mr. Joker', '', 'my address', 21, 20, 23, 2, 4, '2023-11-30 01:26:00', 'not'),
(12, 'Laptops', 'assets/product image/1701345716789_+_Person-With-Shopping-Cart.png', 'sample product', '', 'address sample', 15, 10, 20, 8, 0, '2023-11-30 12:01:56', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `image`, `title`, `date`) VALUES
(1, 'assets/settings image/1701307399124_+_logo.png', 'IT Products', '2023-11-17 06:22:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(100) NOT NULL,
  `about_me` text NOT NULL,
  `given_image` varchar(255) NOT NULL,
  `user_type` varchar(50) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT current_timestamp(),
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `middle_name`, `last_name`, `username`, `password`, `email`, `phone_number`, `about_me`, `given_image`, `user_type`, `last_login`, `date`, `isDelete`) VALUES
(1, 'I', 'Am', 'Admin', 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', '', '', '', 'assets/image upload/1700465357854_cart.png', 'Admin', '2023-11-06 21:47:27', '2023-11-06 21:47:27', 'not'),
(13, 'customer', ' ', 'customer', 'customer123', 'b041c0aeb35bb0fa4aa668ca5a920b590196fdaf9a00eb852c9b7f4d123cc6d6', 'customer@gmail.com', '09234321', 'test', '', 'Customer', '2023-11-30 01:13:40', '2023-11-30 01:13:40', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `street` text NOT NULL,
  `barangay` varchar(255) NOT NULL,
  `municipality` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `zip_code` int(11) NOT NULL,
  `country` varchar(100) NOT NULL,
  `land_mark` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `street`, `barangay`, `municipality`, `province`, `zip_code`, `country`, `land_mark`, `date`, `isDelete`) VALUES
(11, 13, 'sdf', 'sdf', 'sdf', 'dsfsd', 234, 'sdfsdf', 'sdf', '2023-11-30 01:34:24', 'not');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId_comments` (`user_id`),
  ADD KEY `productId_comments` (`product_id`);

--
-- Indexes for table `like_product`
--
ALTER TABLE `like_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `liked_from_users` (`user_id`),
  ADD KEY `liked_from_product_id` (`product_id`);

--
-- Indexes for table `my_cart`
--
ALTER TABLE `my_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relationship_with_product` (`product_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relationship_with_users` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relationship_with_user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `like_product`
--
ALTER TABLE `like_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `my_cart`
--
ALTER TABLE `my_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `productId_comments` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `userId_comments` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `like_product`
--
ALTER TABLE `like_product`
  ADD CONSTRAINT `liked_from_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `liked_from_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `my_cart`
--
ALTER TABLE `my_cart`
  ADD CONSTRAINT `relationship_with_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `relationship_with_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `relationship_with_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
