import React, { useState } from "react";

// A form for searching companies and jobs

function SearchForm({ searchFor }) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    function handleChange(e) {
        setSearchTerm(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name="searchTerm"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SearchForm;