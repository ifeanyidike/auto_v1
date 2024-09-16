# Moxxil Autos
This application is hosted at [https://moxxil.com](https://moxxil.com).

Moxxil Autos is a multi-tenant platform that allows users, typically auto-mechanics, to create and manage their online shops. Mechanics can showcase their services in their shops, and customers can book or subscribe to these services. The platform also includes features such as online and offline payment systems, a review system, and more.

## How it works
To get started, merchants need to create their shop. They can do this by visiting [https://www.moxxil.com/register-merchant](https://www.moxxil.com/register-merchant) to register and customize their subdomain. Once completed, they will gain access to their dedicated admin page.

On the admin page, merchants can:
- Add products or services they offer.
- Customize their shop experience with captions, social media accounts, and more.
- Set up discount offerings.
- View and manage activities on their page, such as fulfilling bookings and managing subscriptions.

If a merchant wishes to receive online payments, they can configure Paystack payments through the settings page.

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
