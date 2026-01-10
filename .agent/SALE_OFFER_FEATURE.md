# Sale Offer Feature - Admin Dashboard

## Overview
Added comprehensive sale offer management functionality to the Admin Dashboard, allowing admins to create and manage promotional sales for books.

## Features Added

### 1. **Database Schema Updates** (Book.js)
- `salePrice`: Number - Discounted price during sale
- `discountPercentage`: Number (0-100) - Percentage discount
- `saleStartDate`: Date - When the sale begins
- `saleEndDate`: Date - When the sale ends
- `isOnSale`: Virtual field - Automatically determines if book is currently on sale

### 2. **Admin Dashboard UI**

#### Sale Offer Settings Section
Located in the Add/Edit Product modal, includes:

- **Flash Sale Toggle**: Mark products as flash sales with special badge
- **Sale Price**: Set the discounted price
- **Discount Percentage**: Specify the discount percentage
- **Sale Date Range**: Set start and end dates for the sale
- **Savings Calculator**: Automatically shows savings amount and percentage

#### Products Table Enhancements
- Sale price displayed prominently in orange
- Original price shown with strikethrough
- Discount percentage badge in green
- "FLASH" badge for flash sale items
- Visual distinction between regular and sale items

### 3. **Form Handling**
- Automatic conversion of sale fields to proper data types
- Conditional field inclusion (only saves if values are provided)
- Date formatting for edit mode
- Real-time savings calculation

## Usage

### Creating a Sale Offer:

1. **Open Product Form**: Click "Add Product" or "Edit" on existing product
2. **Scroll to "Sale Offer Settings"** section
3. **Configure Sale**:
   - Check "Mark as Flash Sale" for special badge (optional)
   - Enter "Sale Price" (e.g., 250)
   - Enter "Discount Percentage" (e.g., 20)
   - Set "Sale Start Date" and "Sale End Date" (optional)
4. **Review Savings**: Green box shows calculated savings
5. **Save Product**

### Sale Display:
- Products with sale prices show:
  - Sale price in bold orange
  - Original price with strikethrough
  - Discount percentage badge
  - Flash sale badge (if enabled)

## Benefits

✅ Easy sale management from admin dashboard
✅ Visual indicators for active sales
✅ Automatic savings calculation
✅ Date-based sale scheduling
✅ Flash sale promotion capability
✅ Clean, intuitive UI

## Technical Notes

- Sale fields are optional
- Empty sale fields are not saved to database
- Virtual `isOnSale` field checks date range automatically
- Frontend displays sale info prominently in products table
- Backend validates discount percentage (0-100)
