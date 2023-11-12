// 여러 함수를 클래스로 묶기

/**
 * 함수들이 공유하는 공통 데이터 레코드를 캡슐화
 * 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮기기
 * 데이터를 조작하는 로직들은 함수로 추출해서 새 클래스로 옮기기
 */

const reading = { customer: 'ivan', quantity: 10, month: 5, year: 2017 };

class Reading {
  constructor({ customer, quantity, month, year }) {
    this._customer = customer;
    this._quantity = quantity;
    this._month = month;
    this._year = year;
  }
  get customer() { return this._customer; }
  get quantity() { return this._quantity; }
  get month() { return this._month; }
  get year() { return this._year; }
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
}

// client1
{
  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const baseCharge = aReading.baseCharge;
}

// client2
{
  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
}

// client3
{
  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const basicChargeAmount = aReading.baseCharge;
}
