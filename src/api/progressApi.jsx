import { collection, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const getProgressData = async (id) => {
  const docRef = doc(db, 'mission', id)
  const docSnap = await getDoc(docRef)
  console.log('docSnap', docSnap.data()) // 스냅샷 데이터 출력
  const doneMission = docSnap.data()
  console.log('ya', doneMission)

  return doneMission // 스냅샷 데이터 반환
}

export { getProgressData }

// import React, { useState, useEffect } from 'react'
// // 프로그레스 바 스타일을 위한 CSS 파일
// import { styled } from 'styled-components'
// import { auth, db } from '../firebase'
// import { doc } from 'firebase/firestore'
