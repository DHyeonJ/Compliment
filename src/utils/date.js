const getDate = () => {
  // 현재 날짜를 20230908 형식으로 반환하는 함수
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1을 하고 두 자리로 포맷팅
  const day = String(currentDate.getDate()).padStart(2, '0') // 일도 두 자리로 포맷팅
  const yyyymmdd = `${year}${month}${day}`
  return yyyymmdd
}

export default getDate
