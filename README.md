# Moxxil Autos
This application is hosted in https://moxxil.com

Moxxil Autos is a multi-tenant application that allows users (typically auto-mechanics) to create and manage their online shops. Mechanics can display their services in their shops and users can book/subscribe for those services. It also features online and offline payment system, review system, etc.

## How it works
To get started merchants need to create their shop. To do this, they need to visit [https://www.moxxil.com/register-merchant](https://www.moxxil.com/register-merchant) to register and customize their subdomain. Once they do, they will have access to their dedicated admin page. In the admin page, merchants will be able to add a product (services they offer), customize their shop experience with the right kind of captions, social accounts, etc. They can also set up their discount offerings and view/manage the activities happening on their page. For instance, they can view/fulfill bookings and subscriptions on their page. If a merchant desires to receive online payments, they can set up paystack payment on the settings page.

## Tech stack
This project makes use of the following libraries and packages.

- Next.js 14 - With server actions and server components.
- Prisma
- Tailwind CSS
- Cloudinary for assets storage.
- Hookstate for global state management.
- CryptoJS
- Zod for server-side validations.
- Chart.js
- Auth0
- Nodemailer
- React Dropzone
- React Select
- Data URI

## Architecture

