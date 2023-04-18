# E-commerce
E-commerce using the MERN technology stack, paypal and cloudinary .

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

## Use Cases
- Normal Users 
  - Signup
  - Signin
  - Logout
  - Add product to cart
  - Delete product from cart
  - Add Review
  - Buy Products
- Admin Users
  - Create product
  - Update product
  - Delete product
  - Update User info
  - Mark order as paid
  - Mark order as Delivered

![](https://i.ibb.co/WvXrhyy/Captura-de-pantalla-2023-02-19-125522.png)

![](https://i.ibb.co/GH7cSkX/Captura-de-pantalla-2023-02-19-125704.png)