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
import {Context} from "./Context";
import favicon from "./static/favicon.jpg";
import "./styles/Nav.css";

const RecipeNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user, logout} = useContext(Context);
  
    const toggle = () =>  {
        return setIsOpen(!isOpen)
    }

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">
            <img className="nav-img img-fluid" src={favicon}/>
            I don't know. What do you want?
          </NavbarBrand>
          {user?.name ? (
            <>               
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav style={{marginLeft: "auto"}} navbar>
                  <UncontrolledDropdown nav inNavbar >
                    <DropdownToggle nav caret>
                      {user.name}
                    </DropdownToggle>
                    <DropdownMenu className="custom-dropdown-menu"  end dark>
                      <DropdownItem>
                        <NavLink href="">Meal Planning</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="">Shopping List</NavLink>
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