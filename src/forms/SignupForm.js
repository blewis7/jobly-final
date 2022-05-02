import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Alert from "../alert/Alert";

// Signup Form
// Calls signup and redirects to /companies

function SignupForm({ signup }){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    // Handle change for form data
    function handleChange(e){
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value }));
    }

    async function handleSubmit(e){
        e.preventDefault();
        let result = await signup(formData);
        if (result.success){
            navigate("/companies");
        } else {
            setFormErrors(result.errors);
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input 
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input 
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null }
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default SignupForm;