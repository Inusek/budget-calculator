import { React } from "react";
import "./App.css";
import Alert from "./Components/Alert";
import ExpenseList from "./Components/ExpenseList";
import ExpenseForm from "./Components/ExpenseForm";
import uuid from "uuid/v4";

const initialExpenes = [
    {
        id: uuid(),
        charge: "rent",
        amount: 1600
    },
    {
        id: uuid(),
        charge: "car",
        amount: 2000
    },
    {
        id: uuid(),
        charge: "insurence",
        amount: 400
    }
];

export default function App() {
    const result = useState(initialExpenes);
    const expenses = result[0];
    const setExpenses = result[1];
    console.log(expenses, setExpenses);
    return (
        <>
            hello from app
            {/* <Alert />
            <ExpenseForm />
            <ExpenseList /> */}
        </>
    );
}

const App = () => {
    return <div>Hello from app</div>;
};

export default App;
