# E-commerce
E-commerce website using the MERN technology stack, with the addition of PayPal integration and Cloudinary for products image.

The website will feature a user-friendly interface for customers to browse products, add items to their cart, and complete purchases securely through PayPal's payment gateway. Customers will also be able to leave reviews and ratings for products they have purchased, and view their order history.

As an admin user, you will have access to a dashboard where you can manage the website's inventory, including creating, updating, and deleting products. You will also be able to view and manage customer orders, mark orders as paid or delivered, and update customer information as needed.

Additionally, we will be utilizing Cloudinary for efficient image management.


![](https://i.ibb.co/WvXrhyy/Captura-de-pantalla-2023-02-19-125522.png)
![](https://i.ibb.co/GH7cSkX/Captura-de-pantalla-2023-02-19-125704.png)
## User Stories
- Customers 
  - Signup: As a new user, I want to be able to sign up for an account so that I can access the features of the website.
  - Signin: As a registered user, I want to be able to sign in to my account so that I can view my previous purchases and access my cart.
  - Logout: As a user, I want to be able to log out of my account when I am done using the website.
  - Add product to cart: As a user, I want to be able to add products to my cart so that I can purchase them later.
  - Delete product from cart: As a user, I want to be able to remove products from my cart in case I change my mind about purchasing them.
  - Add Review: As a user, I want to be able to add reviews for products that I have purchased so that other users can read about my experience.
  - Buy Products: As a user, I want to be able to purchase the products in my cart so that I can receive them and use them.
- Admin Users
  - Create product: As an admin user, I want to be able to create new products to add to the website's inventory.
  - Update product: As an admin user, I want to be able to update existing products in case any information needs to be changed.
  - Delete product: As an admin user, I want to be able to remove products from the website's inventory if they are no longer available or needed.
  - Update User info: As an admin user, I want to be able to update user information, such as their email or shipping address, in case there are any changes.
  - Mark order as paid: As an admin user, I want to be able to mark orders as paid once payment has been received.
  - Mark order as Delivered: As an admin user, I want to be able to mark orders as delivered once the user has received their products.

## Run Project with docker

## Setting up Cloudinary
To use Cloudinary in your application, you'll need to create an account and obtain your authentication credentials. Follow these steps to set up Cloudinary:
- Sign up on the Cloudinary website and create an account.
- Once you've created your account, log in to the Cloudinary management console.
- In the "Dashboard" section of the console, click on the "Create a New Cloud" button.
- You'll be prompted to enter a name for your Cloudinary "cloud". This name is used to uniquely identify your Cloudinary account on the platform. Enter a descriptive name and click "Create".
- Once you've created your cloud, you'll be redirected to your account settings page. Here you'll find your Cloudinary authentication credentials:
  - `cloudinary_cloud_name`: This is the name of your Cloudinary "cloud", which is used as a unique identifier for your account on the platform.
  - `cloudinary_api_key`: This is the API key that allows you to access Cloudinary services.
  - `cloudinary_api_secret`: This is the API secret key that is used to authenticate your requests to Cloudinary and protect your information.
- Save your authentication credentials in a secure location. You'll need these credentials to configure the Cloudinary integration in your application

- clone the project `git clone https://github.com/damian-git-99/e-commerce.git`
- Install [docker](https://www.docker.com/products/docker-desktop/)
- Config Environment Variables in docker-compose file
  - Add PAYPAL_CLIENT_ID: https://developer.paypal.com/
  - `cloudinary_cloud_name`
  - `cloudinary_api_key`
  - `cloudinary_api_secret`
- cd to the root of the project
- Run the command `docker-compose up -d`
- Frontend App runs on port 3000
- Backend App runs on port 5000

## Users by default
- Admin user:
  - email: admin@example.com
  - password: 123456
- Customer user:
  - name: damian@example.com
  - email: 123456