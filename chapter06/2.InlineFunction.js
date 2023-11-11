// 함수 인라인하기

function rating(aDriver) {
  return moreThanFiveLateDelivers(aDriver) ? 2: 1;
}

function moreThanFiveLateDelivers(aDriver) {
  return aDriver.numberOfLateDelivers > 5;
}
