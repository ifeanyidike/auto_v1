# Moxxil Autos
This application is hosted in https://moxxil.com

Moxxil Autos is a multi-tenant application that allows users (typically auto-mechanics) to create and manage their online shops. Mechanics can display their services in their shops and users can book/subscribe for those services. It also features online and offline payment system, review system, etc.

## How it works
To get started merchants need to create their shop. To do this, they need to visit [https://www.moxxil.com/register-merchant](https://www.moxxil.com/register-merchant) to register and customize their subdomain. Once they do, they will have access to their dedicated admin page. In the admin page, merchants will be able to add a product (services they offer), customize their shop experience with the right kind of captions, social accounts, etc. They can also set up their discount offerings and view/manage the activities happening on their page. For instance, they can view/fulfill bookings and subscriptions on their page. If a merchant desires to receive online payments, they can set up paystack payment on the settings page.

## Tech stack
This project makes use of the following libraries and packages.

- Next.js 14 - With server actions and server components.
- Prisma
- PostgresQL
- NeonDB
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

When a user accesses the entry point of the application (`layout.tsx`), we first determine their subdomain. There are three possible scenarios:

1. **Empty Subdomain**:  
   If the subdomain is empty, we route the user to the root domain.
   
2. **Valid Subdomain**:  
   If a subdomain exists, we check the database to verify its validity. If the subdomain exists, we route the user to the homepage for that subdomain. If it doesn't exist, we display a "not found" page.

3. **Admin Subdomain**:  
   If the user accesses the route in the format `[THEIR SUBDOMAIN].admin.moxxil.com`, we route them to the admin page for that specific subdomain. The logic for the admin page is handled within the `manage` component of the application, which is the most complex part of the system. You can review the implementation here: [Admin page](https://github.com/ifeanyidike/auto_v1/tree/main/src/app/manage).

To access the admin page, users must be authenticated. After authentication, we verify that the authenticated user is indeed the store owner. If they are not, they encounter an unauthorized firewall.

For the **users' section**, authentication is required only when subscribing or booking a service. However, no authentication is needed to visit the mechanic's homepage or services page.
