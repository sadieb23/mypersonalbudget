import { useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Chart from "chart.js/auto";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
}

export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return null;
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return null;
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  const handleCreateExpense = async (values) => {
    try {
      await createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      toast.success(`Expense ${values.newExpense} created!`);
      window.location.reload();
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteItem({
        key: "expenses",
        id: expenseId,
      });
      window.location.reload();
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  };

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      const pieCtx = pieChartRef.current.getContext("2d");
      const pieLabels = expenses.map((expense) => expense.name);
      const pieData = expenses.map((expense) => expense.amount);
      const pieColors = Array.from(
        { length: expenses.length },
        () => "#" + Math.floor(Math.random() * 16777215).toString(16)
      );

      if (pieChartRef.current && pieChartRef.current.chart) {
        pieChartRef.current.chart.destroy();
      }

      pieChartRef.current.chart = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: pieLabels,
          datasets: [
            {
              data: pieData,
              backgroundColor: pieColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true, // Set responsive to true
          maintainAspectRatio: false, // Add this line to allow resizing
        },
      });
    }

    if (expenses && expenses.length > 0) {
      const barCtx = barChartRef.current.getContext("2d");
      const barLabels = expenses.map((expense) => expense.name);
      const barData = expenses.map((expense) => expense.amount);
      const barColors = Array.from(
        { length: expenses.length },
        () => "#" + Math.floor(Math.random() * 16777215).toString(16)
      );

      if (barChartRef.current && barChartRef.current.chart) {
        barChartRef.current.chart.destroy();
      }

      barChartRef.current.chart = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: barLabels,
          datasets: [
            {
              label: "Amount",
              data: barData,
              backgroundColor: barColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true, // Set responsive to true
          maintainAspectRatio: false, // Add this line to allow resizing
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [expenses]);

  return (
    <div className="grid-lg" >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> 
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm
          budgets={[budget]}
          onCreateExpense={handleCreateExpense}
        />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">Expenses</span> 
          </h2>
          <Table
            expenses={expenses}
            showBudget={false}
            onDeleteExpense={handleDeleteExpense}
          />
          <div className="chart-container" style={{ width: "800px", height: "600px" }}>
            <canvas ref={pieChartRef}></canvas>
          </div>
          <div className="chart-container" style={{ width: "800px", height: "600px" }}>
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
