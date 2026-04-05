import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/pages/Dashboard";
import Transactions from "./components/pages/Transactions";
import Insights from "./components/insights/Insights";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  const [role, setRole] = useState("viewer");

  const [transactions, setTransactions] = useState([
    { id: 1, date: "2026-04-01", amount: 5000,  category: "Salary",    type: "income"  },
    { id: 2, date: "2026-04-02", amount: 200,   category: "Food",      type: "expense" },
    { id: 3, date: "2026-04-03", amount: 1000,  category: "Freelance", type: "income"  },
    { id: 4, date: "2026-04-04", amount: 300,   category: "Shopping",  type: "expense" },
    { id: 5, date: "2026-03-28", amount: 800,   category: "Rent",      type: "expense" },
    { id: 6, date: "2026-03-25", amount: 2500,  category: "Salary",    type: "income"  },
    { id: 7, date: "2026-03-20", amount: 150,   category: "Travel",    type: "expense" },
    { id: 8, date: "2026-03-15", amount: 600,   category: "Freelance", type: "income"  },
  ]);

  return (
    <MainLayout role={role} setRole={setRole}>
      <Routes>
        <Route path="/" element={<Dashboard transactions={transactions} />} />
        <Route
          path="/transactions"
          element={
            <Transactions
              role={role}
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />
        <Route path="/insights" element={<Insights transactions={transactions} />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
