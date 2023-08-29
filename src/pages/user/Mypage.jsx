import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
function Mypage() {
  const user = auth.currentUser
  const loggedInUserEmail = user ? user.email : null

  return (
    <>
      <div>{loggedInUserEmail}님</div>
    </>
  )
}

export default Mypage
