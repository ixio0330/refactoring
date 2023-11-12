// 매개변수 객체 만들기

const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2023-11-12 20:10'},
    { temp: 53, time: '2023-11-12 20:20'},
    { temp: 58, time: '2023-11-12 20:30'},
    { temp: 53, time: '2023-11-12 20:40'},
    { temp: 51, time: '2023-11-12 20:50'},
  ]
}

// 정상 범위 벗어난 측정값 찾는 함수
function readingsOutsideRange(station, min, max, range) {
  return station.readings.filter(r => r.temp < min || r.temp > max);
}

// 호출문
const range = new NumberRange(operationPlan.temperatureFloor, operationPlan.temperatureCeiling);

const alerts = readingsOutsideRange(
  station, 
  operationPlan.temperatureFloor, // 최저 온도 
  operationPlan.temperatureCeiling, // 최고 온도
  range,
);

class NumberRange {
  constructor(min, max) {
    this._data = { min, max };
  }

  get min() { return this._data.min; }
  get max() { return this._data.max; }
}
