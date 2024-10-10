# Procurement Application



A small procurement application built with React.js, featuring Item Master and Purchase Order modules.

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### Module 1: Item Master
- Auto-generated Item No
- Item Name
- Inventory Location
- Brand
- Category
- Supplier selection (with modal/search functionality)
- Stock Unit (dropdown)
- Unit Price
- Multiple Item Images upload
- Status (Enabled/Disabled, default: Enabled)

### Module 2: Purchase Order
- Auto-generated Order No
- Order Date (current date)
- Supplier Name selection (with modal/search functionality)
- Item List within Purchase Order:
  - Item No
  - Item Name
  - Stock Unit
  - Unit Price
  - Packing Unit (dropdown)
  - Order Qty
  - Net Amount (calculated)
- Export Purchase Order to Excel
- Print Purchase Order functionality

## Screenshots

### Item Master Module
![Item Master Module](/public/images/Itemmaster.png)

### Purchase Order Module
![Purchase Order Module](/public/images/purchase.png)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/procurement-app.git
   ```

2. Navigate to the project directory:
   ```
   cd procurement-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

## Usage

1. **Item Master**:
   - Navigate to the Item Master module
   - Add new items by filling out the form
   - Upload multiple images for each item
   - Edit or disable existing items

2. **Purchase Order**:
   - Create a new Purchase Order
   - Select a supplier
   - Add items to the order
   - Adjust quantities and packing units
   - Review the calculated net amounts
   - Export the Purchase Order to Excel or print it

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
