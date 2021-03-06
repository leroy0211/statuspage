const NavLinkText = (link) => {
    if (link.image) {
        return (
            <img src={link.image} alt={link.name} height="24" className="d-inline-block align-top"/>
        )
    }
    return (
        <>{link.name}</>
    )
}

const NavLink = (link) => (
    <li className="nav-item">
        <a className="nav-link" href={link.url}>
            <NavLinkText {...link} />
        </a>
    </li>
)

const NavigationBar = ({navigation}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {navigation.links.map(navbar => (
                    <div>
                        <ul className="navbar-nav">
                            {navbar.map(link => (
                                <NavLink {...link} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </nav>
    )
}

export default NavigationBar;
