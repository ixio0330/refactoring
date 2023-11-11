// 함수 인라인하기

function rating(aDriver) {
  return aDriver.numberOfLateDelivers > 5 ? 2: 1;
}

function moreThanFiveLateDelivers(aDriver) {
  return aDriver.numberOfLateDelivers > 5;
}

function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(out, aCustomer) {
  out.push(['name', aCustomer.name]);
  out.push(['location', aCustomer.location]);
}
