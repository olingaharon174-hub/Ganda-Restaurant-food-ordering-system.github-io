# Ganda Restaurant Food Ordering System

A comprehensive web-based food ordering system for small-scale restaurants, developed as a diploma project for Bugema University.

## Project Overview

This system addresses the need for modern online food ordering solutions for small restaurants in Uganda, specifically designed for Ganda Restaurant in Nansana-Wakiso. It provides a complete end-to-end solution from menu browsing to order management.

## Features

### Customer-Facing Features
- **Responsive Web Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Menu Browsing**: Browse food items by category with detailed descriptions and images
- **Shopping Cart**: Add/remove items, update quantities, view real-time totals
- **Secure Checkout**: Multiple payment options (Cash, Mobile Money, Cards)
- **Order Tracking**: Real-time order status updates
- **Customer Account Management**: Save addresses and order history

### Restaurant Management Features
- **Admin Dashboard**: Comprehensive overview of orders, revenue, and statistics
- **Order Management**: View, update, and track all customer orders
- **Menu Management**: Add, edit, and remove menu items and categories
- **Customer Management**: View customer information and order history
- **Staff Management**: Manage restaurant staff with role-based access
- **Reports & Analytics**: Generate sales reports and business insights

## Technology Stack

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Bootstrap 5 framework
- **JavaScript**: Interactive functionality and dynamic content
- **Font Awesome**: Icon library for UI elements

### Backend (Ready for Implementation)
- **PHP**: Server-side scripting and business logic
- **MySQL**: Relational database management system
- **Apache**: Web server for hosting

### Responsive Design
- **Bootstrap 5**: Mobile-first responsive framework
- **CSS Grid & Flexbox**: Modern layout techniques
- **Media Queries**: Adaptive layouts for all devices

## File Structure

```
OLINGA/
├── index.html                 # Homepage
├── menu.html                  # Menu browsing page
├── cart.html                  # Shopping cart
├── checkout.html              # Checkout process
├── order-confirmation.html    # Order confirmation
├── style.css                  # Main stylesheet
├── script.js                  # JavaScript functionality
├── database.sql               # Database schema
├── admin/                     # Admin panel
│   ├── index.html            # Admin dashboard
│   ├── orders.html           # Order management
│   ├── menu.html             # Menu management
│   ├── categories.html       # Category management
│   ├── customers.html        # Customer management
│   ├── staff.html            # Staff management
│   ├── reports.html          # Reports & analytics
│   └── settings.html         # System settings
└── README.md                  # Project documentation
```

## Database Schema

The system uses a comprehensive MySQL database with the following main tables:

- **restaurants**: Restaurant information and branches
- **categories**: Food item categories
- **menu_items**: Individual menu items with pricing
- **customers**: Customer accounts and information
- **orders**: Order records and status tracking
- **order_items**: Detailed order line items
- **staff**: Restaurant staff and admin users
- **reviews**: Customer ratings and feedback

## Installation & Setup

### Prerequisites
- Web server (Apache/Nginx)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Modern web browser

### Local Development Setup

1. **Clone or download the project files**
2. **Set up a local server** (XAMPP, WAMP, MAMP, etc.)
3. **Create the database**:
   ```sql
   CREATE DATABASE ganda_restaurant;
   USE ganda_restaurant;
   SOURCE database.sql;
   ```
4. **Configure database connection** in PHP files
5. **Access the application** through your local server

### Production Deployment

1. **Upload files to web server**
2. **Create MySQL database**
3. **Import database schema**
4. **Configure database credentials**
5. **Set file permissions**
6. **Configure SSL certificate** for secure payments

## Usage Instructions

### For Customers
1. Browse the menu at `yourdomain.com`
2. Add items to cart
3. Proceed to checkout
4. Enter delivery information
5. Select payment method
6. Confirm order
7. Track order status

### For Restaurant Staff
1. Access admin panel at `yourdomain.com/admin/`
2. Login with administrator credentials
3. View dashboard for overview
4. Manage orders, menu, and customers
5. Generate reports and analytics

## Key Features Implementation

### Shopping Cart Functionality
- Local storage for cart persistence
- Real-time price calculations
- Quantity management
- Item validation

### Order Processing
- Automatic order number generation
- Status tracking system
- Order history
- Customer notifications

### Responsive Design
- Mobile-first approach
- Touch-friendly interfaces
- Optimized loading times
- Cross-browser compatibility

## Security Considerations

- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Secure payment processing
- Data encryption for sensitive information

## Future Enhancements

1. **Mobile Applications**: Native iOS and Android apps
2. **Payment Gateway Integration**: Direct payment processing
3. **SMS Notifications**: Order status updates via SMS
4. **Loyalty Program**: Customer rewards system
5. **Multi-restaurant Support**: Expand to multiple locations
6. **Advanced Analytics**: Business intelligence features
7. **API Integration**: Third-party delivery services

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

## Performance Optimization

- Lazy loading for images
- Minified CSS and JavaScript
- Optimized database queries
- Caching strategies
- CDN integration ready

## Support & Maintenance

For technical support or maintenance requests:

**Contact Information:**
- Email: support@gandarestaurant.ug
- Phone: +256 123 456 789
- Address: Ganda Business Centre, Nansana-Wakiso, Uganda

## License

This project is developed as part of academic research for Bugema University. Usage rights are reserved for Ganda Restaurant and educational purposes.

## Academic References

This system is based on research into modern food ordering systems and addresses the specific needs of small-scale restaurants in Uganda. Key considerations include:

- Technology adoption in emerging markets
- Mobile-first design for African markets
- Local payment integration (Mobile Money)
- Cultural and regional food preferences
- Infrastructure limitations and solutions

---

**Project by:** Olinga Haron  
**Institution:** Bugema University  
**Program:** Diploma in Information Technology  
**Date:** April 2026
