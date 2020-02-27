import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
    charge,
    amount,
    handleCharge,
    handleAmount,
    handleSubmit,
    edit
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge" className="form-control">
                        charge
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="charge"
                        name="charge"
                        placeholder="e.g rent"
                        value={charge}
                        onChange={handleCharge}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount" className="form-control">
                        amount
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        placeholder="e.g 1000"
                        value={amount}
                        onChange={handleAmount}
                    />
                </div>
            </div>
            <button type="submit" className="btn">
                {edit ? "edit" : "submit"}
                <MdSend className="btn-icon"></MdSend>
            </button>
        </form>
    );
};

export default ExpenseForm;
