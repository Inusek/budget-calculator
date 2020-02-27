import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from "./Components/Alert";
import ExpenseList from "./Components/ExpenseList";
import ExpenseForm from "./Components/ExpenseForm";
import uuid from "uuid/v4";

// const initialExpenes = [
//     {
//         id: uuid(),
//         charge: "rent",
//         amount: 1600
//     },
//     {
//         id: uuid(),
//         charge: "car",
//         amount: 2000
//     },
//     {
//         id: uuid(),
//         charge: "insurence",
//         amount: 400
//     }
// ];
const initialExpenes = localStorage.getItem("expenses")
    ? JSON.parse(localStorage.getItem("expenses"))
    : [];

export default function App() {
    // ------State valuse-------
    // all expenses, add expense
    const [expenses, setExpenses] = useState(initialExpenes);
    // single expense
    const [charge, setCharge] = useState("");
    // Single amount
    const [amount, setAmount] = useState("");
    // Alert
    const [alert, setAlert] = useState({ show: false });
    // edit
    const [edit, setEdit] = useState(false);
    // edit item
    const [id, setId] = useState(0);
    // ------useEffect-------
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);
    // ------funcioncionaly-------
    //handle charge
    const handleCharge = e => {
        setCharge(e.target.value);
    };
    //handle amount
    const handleAmount = e => {
        setAmount(e.target.value);
    };
    //Handle alert
    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text });
        setTimeout(() => {
            setAlert({ show: false });
        }, 7000);
    };
    //handle submit
    const handleSubmit = e => {
        e.preventDefault();
        if (charge !== "" && amount > 0) {
            if (edit) {
                let tempExpenses = expenses.map(item => {
                    return item.id === id ? { ...item, charge, amount } : item;
                });
                setExpenses(tempExpenses);
                setEdit(false);
                handleAlert({ type: "success", text: "item edited" });
            } else {
                const singleExpense = {
                    id: uuid(),
                    charge,
                    amount
                };
                setExpenses([...expenses, singleExpense]);
                handleAlert({ type: "success", text: "item added" });
            }

            setCharge("");
            setAmount("");
        } else {
            handleAlert({
                type: "danger",
                text: `charge can't be empty value has to be bigger than zero`
            });
        }
    };
    // clear all items
    const clearItems = () => {
        setExpenses([]);
        handleAlert({ type: "danger", text: "all items deleted" });
    };
    // delete single item
    const handleDelete = id => {
        let tempExpenses = expenses.filter(item => item.id !== id);
        setExpenses(tempExpenses);
        handleAlert({ type: "danger", text: "item deleted" });
    };
    //edit single item
    const handleEdit = id => {
        let expense = expenses.find(item => (item.id = id));
        let { charge, amount } = expense;
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
        setId(id);
    };
    return (
        <>
            {alert.show && <Alert type={alert.type} text={alert.text} />}
            <Alert />
            <h1>budget calculator</h1>
            <main className="App">
                <ExpenseForm
                    charge={charge}
                    amount={amount}
                    handleAmount={handleAmount}
                    handleCharge={handleCharge}
                    handleSubmit={handleSubmit}
                    edit={edit}
                />
                <ExpenseList
                    expenses={expenses}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    clearItems={clearItems}
                />
            </main>
            <h1>
                Total Spending :{" "}
                <span className="total">
                    $
                    {expenses.reduce((acc, cur) => {
                        return (acc += parseInt(cur.amount));
                    }, 0)}
                </span>
            </h1>
        </>
    );
}
