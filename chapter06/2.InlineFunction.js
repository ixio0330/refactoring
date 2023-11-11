// 함수 인라인하기

function rating(aDriver) {
  return aDriver.numberOfLateDelivers > 5 ? 2: 1;
}

function moreThanFiveLateDelivers(aDriver) {
  return aDriver.numberOfLateDelivers > 5;
}
