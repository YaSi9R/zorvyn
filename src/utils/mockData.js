export const CATEGORIES = [
  "Food & Drinks",
  "Shopping",
  "Housing",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Salary",
  "Investments",
  "Other",
];

export const TRANSACTION_TYPES = ["Income", "Expense"];

export const ROLES = {
  ADMIN: "Admin",
  VIEWER: "Viewer",
};

const subDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

// Generates 45 days of mock transactions
export const generateMockTransactions = () => {
  const transactions = [];
  const now = new Date();
  
  // Salary
  for (let i = 0; i < 2; i++) {
    transactions.push({
      id: `salary-${i}`,
      date: subDays(now, i * 30 + 5).toISOString().split('T')[0],
      description: "Monthly Salary Premium",
      amount: 4500,
      category: "Salary",
      type: "Income",
    });
  }

  // Regular Expenses
  const shopItems = ["Amazon Prime", "Apple Store", "Nike Store", "Grocery Mart", "DigitalOcean", "Spotify", "Netflix"];
  const foodItems = ["Starbucks", "Uber Eats", "Local Diner", "Pizza Hut", "Blue Bottle Coffee"];
  
  for (let i = 0; i < 40; i++) {
    const isFood = Math.random() > 0.5;
    const category = isFood ? "Food & Drinks" : "Shopping";
    const amount = isFood ? (Math.random() * 50 + 10).toFixed(2) : (Math.random() * 200 + 20).toFixed(2);
    const description = isFood ? foodItems[Math.floor(Math.random() * foodItems.length)] : shopItems[Math.floor(Math.random() * shopItems.length)];
    
    transactions.push({
      id: `exp-${i}`,
      date: subDays(now, Math.floor(Math.random() * 45)).toISOString().split('T')[0],
      description,
      amount: parseFloat(amount),
      category,
      type: "Expense",
    });
  }

  // Rent & Utilities
  transactions.push({
    id: 'rent-1',
    date: subDays(now, 10).toISOString().split('T')[0],
    description: "Modern Apartment Rent",
    amount: 1200,
    category: "Housing",
    type: "Expense",
  });

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const initialTransactions = generateMockTransactions();
