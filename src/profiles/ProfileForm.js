import React , {useState, useContext} from "react";
import Alert from "../alert/Alert";
import JoblyApi from "../api";

// form for editing a profile.

function ProfileForm() {
    const {currentUser, setCurrentUser} = useContext(React.createContext());
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    const [saveConfirmed, setSaveConfirmed] = useState(false);


    async function handleSubmit(e){
        e.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors) {
            debugger;
            setFormErrors(errors);
            return;
        }

        setFormData(f => ({...f, password: ""}));
        setFormErrors([]);
        setSaveConfirmed(true);

        setCurrentUser(updatedUser);
    }

    function handleChange(e){
        const {name, value} = e.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
    }

    return (
        <div>
            <h2>Profile</h2>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <p>{formData.username}</p>
                        </div>
                        <div className="form-group">
                            <label>First Name: </label>
                            <input 
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name: </label>
                            <input 
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input 
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm password to make changes: </label>
                            <input
                                type="password" 
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {formErrors.length
                            ? <Alert type="danger" messages={formErrors} />
                            : null }
                        
                        {saveConfirmed
                            ? <Alert type="success" messages={["Updated successfully."]} />
                            : null }
                        
                        <button className="btn btn-primary" onClick={handleSubmit} >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;