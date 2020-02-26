function createEmployeeRecord(array) {
  let employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

function createEmployeeRecords(arrays) {
  return arrays.map(array => {
    return createEmployeeRecord(array)
  })
}

function createTimeInEvent(employeeRecord, dateString) {
  let updatedRecord = employeeRecord
  updatedRecord.timeInEvents.push({
    type: "TimeIn",
    date: dateString.split(" ")[0],
    hour: parseInt(dateString.split(" ")[1])
  })
  return updatedRecord
}

function createTimeOutEvent(employeeRecord, dateString) {
  let updatedRecord = employeeRecord;
  updatedRecord.timeOutEvents.push({
    type: "TimeOut",
    date: dateString.split(" ")[0],
    hour: parseInt(dateString.split(" ")[1])
  })
  return updatedRecord
}

function hoursWorkedOnDate(employeeRecord, dateString) {
  let hoursWorked; 
  if (employeeRecord.timeInEvents[0].date === dateString) {
    let timeIn = employeeRecord.timeInEvents[0].hour
    let timeOut = employeeRecord.timeOutEvents[0].hour
    hoursWorked = (timeOut - timeIn)/100
  }
  return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateString) {
  let payOwed;
    payOwed = hoursWorkedOnDate(employeeRecord, dateString) * employeeRecord.payPerHour
  return payOwed
}

function allWagesFor(employeeRecord) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue; // function to get passed to reduce callback 
  let workedDates = employeeRecord.timeInEvents.map(obj => obj.date) // return an array of two date elements
  let payable = []; 
  console.log(workedDates)
  for (let i = 0; i < workedDates.length; i++){
    payable.push(wagesEarnedOnDate(employeeRecord, workedDates[i])) // only one date gets passed in
    console.log(i, wagesEarnedOnDate(employeeRecord, workedDates[i]))
  }
  return payable.reduce(reducer, 0) // return a single value

  // return employeeRecord.timeInEvents.reduce(reducer, 0)
}
