# Zorvyn Finance Dashboard - Developer Documentation

This project is a premium Finance Dashboard built to demonstrate modern frontend capabilities. Below is a detailed breakdown of the technical decisions, architecture, and design philosophy—perfect for discussing during a technical interview.

---

## 🧠 The Approach: How it was Built

### 1. The Design System (CSS-First)
Before writing a single React component, I established a **Core Design System** in `index.css`. 
- **Thinking**: In a professional environment, consistency is key. I used CSS Variables for colors, spacing, and shadows to ensure that any UI changes (like implementing Dark Mode) would be as simple as updating a few tokens.
- **Aesthetics**: I chose a "Sleek Dark" palette with glassmorphism effects (`backdrop-filter`) to give it a premium, modern feel that stands out from generic dashboards.

### 2. State Management (React Context API)
I implemented the `FinanceContext` to act as the "brain" of the application.
- **Why Context?**: For an application of this size, Redux would be overkill. Context API provides a clean way to share state (transactions, current role, filters) without "prop drilling."
- **Performance**: I used `useMemo` extensively for calculating statistics (Total Balance, Income, Expenses) and for filtering/sorting the transaction list. This ensures that the UI remains snappy even as the data grows, as heavy calculations only re-run when the underlying data changes.

### 3. Data Visualization (Recharts)
For financial data, clarity is everything. 
- **Balance Trend**: Used an `AreaChart` with a custom gradient to show the movement of wealth over 30 days.
- **Spending Breakdown**: Used a `PieChart` (Donut style) to give users an immediate visual of where their money goes.
- **Approach**: I built specific data-processing utilities in the Context to transform raw transaction data into the format Recharts expects.

---

## 🛠️ Key Problem Solving & Logic

### 1. Role-Based Access Control (RBAC)
- **Problem**: How to handle different user permissions (Admin vs. Viewer) on the frontend?
- **Solution**: I implemented a `role` state. When set to `Viewer`, the UI dynamically hides "Add" buttons and disables "Delete/Edit" actions. This demonstrates an understanding of security-conscious UI design.

### 2. Smart Insights Engine
- **The Logic**: Instead of just showing numbers, I built a component that analyzes the data. For example, it identifies the "Highest Spending Category" dynamically from the transaction history.


### 3. Data Persistence
- **Implementation**: I integrated `localStorage` within the `useEffect` hooks in the Context.
- **Thinking**: Users expect their data to be there when they refresh. This adds a "production-ready" feel to the assignment.

---

## 📈 Scalability Considerations
If this were a production app, my next steps would be:
1. **API Integration**: Replacing the mock data generator with an Axios/TanStack Query layer to fetch from a backend.
2. **Unit Testing**: Adding Vitest/Jest for the calculation logic in the Context.
3. **Advanced Filtering**: Adding date-range pickers and multi-category selection.

---

## 📂 Project Structure Overview

- `src/index.css`: The source of truth for the design system.
- `src/context/FinanceContext.jsx`: The central state and logic layer.
- `src/components/Dashboard/`: High-level summary and visualizations.
- `src/components/Transactions/`: Core data interaction (Filtering/Sorting).
- `src/utils/mockData.js`: Seeding logic for a realistic initial state.

---

