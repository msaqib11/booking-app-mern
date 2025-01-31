export const getDateRange = (startDate, endDate) => {
    const TIME_IN_MS = 1000 * 60 * 60 * 24
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(timeDiff / TIME_IN_MS)
    return diffDays
}

export const getDateInRange = (startDate, endDate) => {
   const start = new Date(startDate)
   const end = new Date(endDate)

    let list = []
    while(start <= end){
        list.push(new Date(start).getTime())
        start.setDate(start.getDate()+1)
    }
    console.log(list)
    return list
}