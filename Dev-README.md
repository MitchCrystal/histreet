# Dev-README.md
https://whimsical.com/highstreet-codeworks-J5Yrd6ENbPVXCMuhCriETQ
Highstreet working conventions will be documented below for reference.  Any other convention tools or references will be located in this file.  If it’s a helpful reference or a determined work standard it will be located here.

## Styling
Highstreet uses Tailwind css styling library
a good cheat sheet: https://nerdcave.com/tailwind-cheat-sheet

## Icons
https://heroicons.com - use Hero Icons first to find icons if needed.

## Fonts
Any font added look at the Next font documentation for how to add fonts.

## Images 
Use the Next image component when using images


## Getting Started
npm run dev 		- will start your development.  Start from your working directory.


## Git Flow
  * Merge to Dev branch.  
  * Do not merge to main branch. 
  * Choose an issue to work on.  
  * Assign it to yourself in github webpage.  
  * Create a branch in following format:  yourintitals-work-issuename-filename  ie. jb-ft-11-heroimg-landing.  Use ft for feat/feature and fix for fixing a bug or logic.

  ### Start a branch
  choose an issue to work on in github website repo choose ‘Create a branch’ (small blue text) use the above mentioned label format

  If you start a branch from the command line make sure you are in the correct working directory admin or highstreet. 

          * git pull 
          * git checkout -b <name of your branch>
      * git push -u origin <name of your branch>

### Commiting
  remember to pull before you start working

      * npm run git slint
      * git add .
      * git cz 	or 	git npx cz
      * git push

  if you forgot to pull and need to mid-work:
      * git stash
      * git pull
      * git stash apply
      * 



## TanStack
  When using TanStack or creating any routing such as fetch, get check the Api file and the routes to be sure it has not been created already.





## Data Schema
  https://github.com/MitchCrystal/highstreet.git
  If you are creating component primitive using shad/cn you must install radix
  https://ui.shadcn.com/docs/primitives/alert-dialog


  ￼

  Data Schema List: user,  customer,  store,  order,  address,  customer_Account,  product,  storefront,  images

  user = {	user_id (PK):			cuid
    user_first_name:		string
    user_last_name:		string
    user_email:			string
    password_hash:		string
  }

  store = {
    store_id (PK):		cuid, unqiue
    store_owner: (FK)	
    store_name:		string
    store_url:			unique (hyphenated string)
    orders (FK):		[] 
    products (FK):		[]
    customers (FK):	
  }

  address 	= {
    address_id(PK):			cuid, unqiue
    address_first_name:		string
    address_last_name:		string
    address_line_1:			string
    address_line_2:			string
    county:				string
    city:					string
    country:				string 
    postcode:				string 
  }

  customer = {
    customer_id (PK):			cuid, unqiue
    customer_first_name:		string
    customer_last_name:		string
    customer_email:			string
    phone_number:				string
    customer_account (FK):
    addresses (FK):
  }

  customer_account  = {
    customer_account_id (PK):			cuid, unqiue
    customer_account_password_hash:	string
  }

  product = {
    product_id (PK):		cuid, unqiue
    SKU:					string
    product_name:			string
    barcode:				number
    inventory_qty:			number
    description:			string
    tags:					string
    product_images:	
    product_price:			int
    categories:				string
    department:			string
    is_active :				boolean, default true
    product_name_slug:		string
  }

  order = {
    order_id (PK)			cuid, unqiue
    customer_id (FK)		string
    friendly_order_number:	auto incrementing number
    bill_to_address (FK):	[]
    ship_to_address (FK):	[]
    products (FK):			{Product object...}[]
    order_details:			{productId: string, quantity: 1, price: 20}[]
    created_at:				timestamp in postgres
    total_order_cost: 		int
  }

  storefront = {
    storefront_id (PK):		cuid, unqiue
    global_styles:			string
    blocks:				string
    store_id (FK):	
    support_email: 			string 
    store_logo  (FK):
    store_description:		string 
    store_hero_image (FK):
  }

  images = {
    image (PK):			cuid, unqiue
    image_url:				string
    image_alt	:			string
  }


## Component Primitive List
  Finished components are listed here.  If you do not find a component you are looking for and wish to create one.   Add the component name you will be developing to the list, just add your name to the end of it (i.e. large-button —JaneP).  When you finish a component just remove your name from the end.  This will help prevent simultaneous creations of similar or same components.  If you find someone developing a component you may contact them to see if their component will work for you or collaborate on one that may fit both your needs.

  Highstreet is using Shadcn for component Primitives, be sure to install:   https://ui.shadcn.com/docs/primitives/alert-dialog

### Admin:
    Button
    InputWithLabel
    Table
    TableWithHeadingOptions
    Card
    FileUpload
    Breadcrumbs
￼

### Storefront:
    Button
    TableWithHeadingOPtions
    InputWithLabel
    Card
    FileUpload
    Breadcrumbs
    OrderDetails
    Checkbox
    DropdownSelector
    TextArea
￼




