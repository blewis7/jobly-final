import React, {useEffect, useState} from "react";
import Search from "../forms/SearchForm";
import JoblyApi from "../api";
import JobCardList from "./JobCardList";

// Show a list of jobs

function JobList(){
    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
        search();
    }, []);

    async function search(title){
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    return (
        <div className="JobList col-md-8 offset-md-2">
            <Search searchFor={search} />
            {jobs.length 
                ? <JobCardList jobs={jobs} />
                : <p>Sorry, no results were found!</p>
            }
        </div>
    );
}

export default JobList;
