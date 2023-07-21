import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  // CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import "./Sidecss.css";

function Sidebar1(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            iStore
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {/* <div className="cat" >
           <input className="cat" type='checkbox' />Shoes
           <input type='checkbox' className="cat" />Laptop
           <input type='checkbox' className="cat" />Mobile
            </div> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  );
}

export default Sidebar1;
