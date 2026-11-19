import {Link}from "react-router-dom";

function Sidebar(){
    return(
        <aside className="Sidebar">
            <h3 style={{ color:'red'}}>JOB TRACk
                6 </h3>

            <nav>
                <p>
                    <Link className="nav-link "to="/Dashboard">
                        📊 Dashboard
                    </Link>
                    
                </p>

                <p>
                    <Link className="nav-link" to="/Applications">
                        💼 Application
                    </Link>
                </p>

                <p>
                    <Link className="nav-link" to="/Add-job">
                        ➕ Add Job
                    </Link>
                </p>

                <p>
                    <Link className="nav-link" to="/Setting">
                        ⚙️ Setting
                    </Link>
                </p>   
            </nav>
        </aside>
    )
}

export default Sidebars