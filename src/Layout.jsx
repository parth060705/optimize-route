import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Lower from "./Lower";
import bgImage from './assets/route-optimization.jpeg';

const Layout = () => (
  <div style={{ position: 'relative', minHeight: '100vh' }}>
    <div
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.8)',
        zIndex: -1,
      }}
    />
    <Header />
    <Outlet />
    <Lower />
  </div>
);

export default Layout;
