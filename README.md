# E-commerce
E-commerce using the MERN technology stack, paypal and cloudinary .

## Run Project with docker
- clone the project `git clone https://github.com/damian-git-99/e-commerce.git`
- Install [docker](https://www.docker.com/products/docker-desktop/)
- Config Environment Variables in docker-compose file
  - Add PAYPAL_CLIENT_ID: https://developer.paypal.com/
  - Add cloudinary info: https://cloudinary.com/
- cd to the root of the project
- Run the command `docker-compose up -d`

## Users by default
- Admin user:
  - email: admin@example.com
  - password: 123456
- Customer user:
  - name: damian@example.com
  - email: 123456

## Use Cases
- Customers 
  - Signup
  - Signin
  - Logout
  - Add product to cart
  - Delete product from cart
  - Buy Products
- Admin
  - Create product
  - Update product
  - Delete product
  - Update User info
  - Mark order as paid
  - Mark order as Delivered