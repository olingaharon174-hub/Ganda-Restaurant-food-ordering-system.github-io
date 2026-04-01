-- Ganda Restaurant Food Ordering System Database Schema
-- Created for the diploma project in Information Technology

-- Create database
CREATE DATABASE IF NOT EXISTS ganda_restaurant;
USE ganda_restaurant;

-- Restaurants table
CREATE TABLE restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    description TEXT,
    image_url VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    ingredients TEXT,
    preparation_time INT DEFAULT 15, -- in minutes
    is_available BOOLEAN DEFAULT TRUE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Customers table
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255),
    address TEXT,
    city VARCHAR(50) DEFAULT 'Nansana',
    country VARCHAR(50) DEFAULT 'Uganda',
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    restaurant_id INT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) DEFAULT 0.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    final_amount DECIMAL(10,2) NOT NULL,
    order_type ENUM('delivery', 'pickup') DEFAULT 'delivery',
    payment_method ENUM('cash', 'mobile_money', 'card') DEFAULT 'cash',
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    order_status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled') DEFAULT 'pending',
    delivery_address TEXT,
    delivery_instructions TEXT,
    estimated_delivery_time DATETIME,
    actual_delivery_time DATETIME,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Order status history table
CREATE TABLE order_status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled') NOT NULL,
    notes TEXT,
    created_by INT, -- Staff ID who updated the status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Staff table
CREATE TABLE staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255),
    role ENUM('admin', 'manager', 'kitchen', 'delivery') DEFAULT 'kitchen',
    restaurant_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE SET NULL
);

-- Reviews table
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    menu_item_id INT,
    order_id INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE SET NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- Settings table
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default restaurant
INSERT INTO restaurants (name, address, phone, email, description) VALUES 
('Ganda Restaurant', 'Ganda Business Centre, Nansana-Wakiso, Uganda', '+256 123 456 789', 'info@gandarestaurant.ug', 'Serving delicious Ugandan cuisine since 2022');

-- Insert default categories
INSERT INTO categories (name, description) VALUES 
('Main Course', 'Hearty traditional Ugandan dishes'),
('Appetizers', 'Starters and light bites'),
('Beverages', 'Drinks and refreshments'),
('Desserts', 'Sweet treats and desserts');

-- Insert sample menu items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, preparation_time) VALUES 
(1, 1, 'Ugandan Rolex', 'Delicious chapati with eggs and vegetables', 8000.00, 10),
(1, 1, 'Matooke with Beef', 'Steamed plantains served with beef stew', 15000.00, 25),
(1, 1, 'Chicken Luwombo', 'Traditional chicken stew steamed in banana leaves', 18000.00, 30),
(1, 1, 'Posho and Beans', 'Ugandan staple food with beans', 7000.00, 15),
(1, 2, 'Samosas', 'Crispy pastry filled with meat or vegetables', 3000.00, 8),
(1, 3, 'Fresh Fruit Juice', 'Freshly squeezed tropical fruit juice', 3000.00, 5),
(1, 3, 'Soda', 'Various soft drinks available', 2000.00, 2),
(1, 4, 'Mandazi', 'Sweet African doughnuts', 2000.00, 5);

-- Insert default admin staff
INSERT INTO staff (first_name, last_name, email, password, role, restaurant_id) VALUES 
('Admin', 'User', 'admin@gandarestaurant.ug', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 1);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, description) VALUES 
('delivery_fee', '3000', 'Default delivery fee in UGX'),
('tax_rate', '0.18', 'Tax rate (18%)'),
('order_prefix', 'GR', 'Order number prefix'),
('restaurant_phone', '+256 123 456 789', 'Restaurant contact phone'),
('restaurant_email', 'info@gandarestaurant.ug', 'Restaurant contact email'),
('delivery_radius', '10', 'Delivery radius in kilometers'),
('operating_hours', '08:00-22:00', 'Restaurant operating hours');

-- Create indexes for better performance
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_date ON orders(created_at);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_reviews_item ON reviews(menu_item_id);
CREATE INDEX idx_reviews_customer ON reviews(customer_id);

-- Create view for order summaries
CREATE VIEW order_summary AS
SELECT 
    o.id,
    o.order_number,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.phone AS customer_phone,
    o.total_amount,
    o.order_status,
    o.order_type,
    o.created_at,
    COUNT(oi.id) AS item_count
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id;

-- Create trigger for order number generation
DELIMITER //
CREATE TRIGGER generate_order_number 
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    DECLARE order_num VARCHAR(50);
    SET order_num = CONCAT('GR', DATE_FORMAT(NOW(), '%Y%m%d'), LPAD((SELECT COUNT(*) + 1 FROM orders WHERE DATE(created_at) = CURDATE()), 3, '0'));
    SET NEW.order_number = order_num;
END//
DELIMITER ;

-- Create trigger for updating order status history
DELIMITER //
CREATE TRIGGER log_order_status_change
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    IF OLD.order_status != NEW.order_status THEN
        INSERT INTO order_status_history (order_id, status, notes)
        VALUES (NEW.id, NEW.order_status, CONCAT('Status changed from ', OLD.order_status, ' to ', NEW.order_status));
    END IF;
END//
DELIMITER ;
