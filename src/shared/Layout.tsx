import React from 'react'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <>
      <header></header>
      <Outlet />
      <footer>
        <div>
          <div>칭구</div>
          <div>Copyright 2023. 팀 해보조 all rights reserved.</div>
        </div>
      </footer>
    </>
  )
}

export default Layout
