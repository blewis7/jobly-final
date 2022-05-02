import React, { useEffect, useContext, useState } from "react";

function JobCard({ id, title, salary, equity, companyName }){

    const { hasAppliedToJob, applyToJob } = useContext(React.createContext());
    const [applied, setApplied] = useState();

    useEffect(function updateAppliedStatus() {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    async function handleApply(e){
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div> {applied}
            <div>
                <h5>{title}</h5>
                <p>{companyName}</p>
                {salary && <div><small>Salary: {salary}</small></div>}
                {equity !== undefined && <div><small>Equity: {equity}</small></div>}
                <button 
                    className="btn btn-danger"
                    onClick={handleApply}
                    disabled={applied}
                >
                    {applied ? "Applied" : "Apply"}
                </button>
            </div>
        </div>
    );
}

export default JobCard;
