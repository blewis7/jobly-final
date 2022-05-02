import React from "react";
import {Link} from "react-router-dom";

function CompanyCard({ name, description, logoUrl, handle }) {
    return (
        <Link className="company-card card" to={`/companies/${handle}`}>
            <div>
                <h5>
                    {name}
                    {logoUrl && <img src={logoUrl}
                                     alt={name}
                                     className="floaat-right ml-5" />
                    }
                </h5>
                <p><small>{description}</small></p>
            </div>
        </Link>
    );
}

export default CompanyCard;