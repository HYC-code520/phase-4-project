import { useState, useEffect } from "react"

function AdoptionApplications() {
    const [applications, setApplications] = useState([])

    useEffect(() =>{
        fetch("/adoption_forms")
        .then((response) => response.json())
        .then((data) => setApplications(data))
        .catch((error) => console.error("Error fetching applications:", error))

    }, [])


    if (applications.length === 0) {
        return <p>Loading applications...</p>
    }


    return (
        <div>
            <h2>Review Adoption Applications</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app.id}>
                        <strong>{app.full_name}</strong> - {app.status} - {app.email}
                    </li>
                ))}
            </ul>
        </div>
    )

}



export default AdoptionApplications