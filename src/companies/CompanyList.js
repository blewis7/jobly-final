import React, {useEffect, useState} from "react";
import SearchForm from "../forms/SearchForm";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";

// Show list of companies

function CompanyList() {
    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        search();
    }, []);

    async function search(name){
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    return (
        <div>
            <SearchForm searchFor={search} />
            {companies.length
            ? (
                <div>
                    {companies.map(c => (
                        <CompanyCard
                            key={c.handle}
                            handle={c.handle}
                            name={c.name}
                            description={c.description}
                            logoUrl={c.logoUrl}
                        />
                    ))}
                </div>
            ) : (
                <p>Sorry, no results were found!</p>
            )
        }
        </div>
    );
}

export default CompanyList;