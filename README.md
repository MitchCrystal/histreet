 
#  <img src="https://i.ibb.co/X8vbLTW/histreet-yellow-square.png" alt="histreet-yellow-square" width="35px"> Hi Street 
Hi Street is an e-commerce platform that allows individuals to create and run their own online stores.

<p align="center">
  <img src="https://i.ibb.co/kQdQ4qS/Screenshot-2023-04-01-at-11-45-53.png" alt="Screenshot-2023-04-01-at-11-45-53">
  <img src="https://i.ibb.co/gzrt98C/ezgif-4-248ecf25ca.gif" alt="ezgif-4-248ecf25ca">
  <img src="https://i.ibb.co/ctqH70v/ezgif-4-2699346b9a.gif" alt="ezgif-4-2699346b9a">
</p>
<br/>

## Features
**[Admin]**
- User authentication
- Customize store logo, hero image, color theme
- Show order list, order details
- Search product
- Add/Edit product detail

**[Storefront]**
- Show product list, product details
- Add to cart
- Checkout - payment 


## Installation
`npm i` in root folders 

## Running locally
- App : `npm run dev`
- Prisma Studio: `npx prisma studio` (in /packages/database)
- Seed data : `npm run seed`(in /packages/database)

## Set up .env files - (env-examples provided in relevant folders)
- /packages/database
- /apps/admin
- /apps/storefront

## When you commit
- before git add, `npm run lint` to check linting
- from root use `git cz`	or `git npx cz` instead of git commit
      
## Icons & Components
- https://heroicons.com : use this site to find icons if needed.
- https://ui.shadcn.com/docs/primitives/accordion : component design convention

## Tech stack
- Typescript, React, NextJS, Tanstack Query
- Shadcn/ui, React hot toast, Zod, AuthJS, Cloudinary, Stripe
- Database: PostgreSQL, Prisma
- Testing/CI: Cypress, Turborepo

## Contributing Developers
[Allan Bott](https://github.com/mercury80Hg)<br/>
[Chris Mitchell](https://github.com/MitchCrystal)<br/>
[Gecco Navalta](https://github.com/GeccoRhiguelNavalta)<br/>
[Jack Blatchford](https://github.com/jackb14)<br/>
[Sohyun Lim](https://github.com/imss0)<br/>
[Yi-Ying Ko](https://github.com/yiyingko)

