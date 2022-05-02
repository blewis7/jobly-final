import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Alert from "../alert/Alert";

// Login form

function LoginForm({ login }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    // Handle change for form data
    function handleChange(e){
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value }));
    }

    async function handleSubmit(e){
        e.preventDefault();
        let result = await login(formData);
        if (result.success){
            navigate("/companies");
        } else {
            setFormErrors(result.errors);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input 
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />
                </div>

                {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

                <button>Submit</button>
            </form>
        </div>
    )
}