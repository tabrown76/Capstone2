import React, {useState, useContext} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  NavItem} from 'reactstrap';
import {Context} from "./contexts/Context";
import favicon from "./static/favicon.jpg";
import "./styles/Nav.css";

/**
 * RecipeNav component that provides navigation for the application.
 * It includes conditional rendering based on user authentication status.
 * 
 * @component
 * @example
 * return (
 *   <RecipeNav />
 * )
 */
const RecipeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, logout} = useContext(Context);

  /**
  * Toggles the state of the navigation menu.
  */
  const toggle = () =>  {
    return setIsOpen(!isOpen)
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img className="nav-img img-fluid" src={favicon} alt='favicon'/>
          I don't know. What do you want?
        </NavbarBrand>
        {user?.firstName ? (
          <>               
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav style={{marginLeft: "auto"}} navbar>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav caret>
                    {user.firstName}
                  </DropdownToggle>
                  <DropdownMenu className="custom-dropdown-menu"  end dark>
                    <DropdownItem>
                      <NavLink href={"/"}>Home</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href={`/${user.user_id}/mealplan`}>Meal Planning</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href={`/${user.user_id}/shopping`}>Shopping List</NavLink>
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>
                      <NavLink onClick={logout}>Logout</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>            
          </>
        ) : ( 
          <div className="right-nav-links">
            <NavItem>
              <NavLink className="NavLink" href="/login" color="dark">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="NavLink" href="/signup" color="dark">Signup</NavLink>
            </NavItem>
          </div>
        )          
        }
      </Navbar>
    </div>
  );
}

export default RecipeNav;