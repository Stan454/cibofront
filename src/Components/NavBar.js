import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function NavBar() {
    return (
    <nav className="nav">
        <Link to="/" className="site-title">CIBO Admin Panel</Link>
        <ul>
            <CustomLink to="/Dishes">Dishes</CustomLink>
            <CustomLink to="/Reservations">Reservations</CustomLink>
            <CustomLink to="/Notification">Notifications</CustomLink>
            <CustomLink to="/Login">Logout</CustomLink>
        </ul>
    </nav>)
}

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end : true})
    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}