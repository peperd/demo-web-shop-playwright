# Demo Web Shop – Playwright Test Automation

This project is a **demo test automation framework** built with **Playwright + TypeScript** for the *Demo Web Shop* application. It demonstrates clean test architecture, Page Object Model (POM), reusable components, and readable, maintainable end-to-end tests.

The goal of this project is to showcase practical automation skills rather than to test every possible scenario.

---

## 🚀 Tech Stack

- **Playwright** – end-to-end testing framework
- **TypeScript** – type safety and better maintainability
- **Node.js** – runtime environment
- **Prettier** – code formatting

---

## 📁 Project Structure
├── tests/
│   └── placeOrder.spec.ts      # End-to-end test scenario
│
├── support/
│   ├── pages/                  # Page Object Model
│   │   ├── basePage.ts
│   │   ├── home.page.ts
│   │   ├── apparel.page.ts
│   │   ├── books.page.ts
│   │   ├── jewelry.page.ts
│   │   ├── cart.page.ts
│   │   └── wishlist.page.ts
│   │
│   ├── modules/                # Reusable UI components
│   │   ├── headerMenu.ts
│   │   ├── headerLinks.ts
│   │   ├── productItem.ts
│   │   └── cartItemRow.ts
│   │
│   └── enums/                  # Constants and enums
│       ├── topMenuEnums.ts
│       ├── topMenuUrls.ts
│       └── productNamesEnums.ts
│
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── package.json
└── README.md

---

## 🧠 Key Concepts Demonstrated

- Page Object Model (POM)
- Separation of concerns (pages, modules, enums)
- Reusable UI components
- Soft assertions for complex flows
- Clean and readable test scenarios
- Type-safe selectors and actions

---

## ✅ Test Scenario Overview

The main test (`placeOrder.spec.ts`) covers a realistic user flow:

1. Open the Demo Web Shop homepage
2. Navigate through different product categories
3. Add multiple products to the cart
4. Validate individual product subtotals
5. Validate cart total calculation
6. Proceed to checkout
7. Open wishlist
8. Verify wishlist content

This scenario demonstrates both **functional validation** and **business logic checks** (price calculations).

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/peperd/demo-web-shop-playwright.git
cd demo-web-shop
```

2.	Install dependencies:

```bash
npm install
```

▶️ Running Tests

Run all tests in headless mode:

```bash
npm test
```

Run tests with Playwright UI mode:

```bash
npm run test:ui
```

📊 Test Reports

After execution, Playwright generates:
•	HTML report
•	Screenshots (on failure)
•	Traces (if enabled)

View the report with:

```bash
npx playwright show-report
```
