// 여러 함수를 변환 함수로 묶기

/**
 * 변환할 레코드를 입력받아서 값을 그대로 반환하는 변환 함수 만들기
 * 묶을 함수 중 함수 하나를 골라서 본문 코드를 변환 함수로 옮기기
 * 처리 결과를 레코드에 새 필드로 기록
 * 클라이언트 코드가 이 필드를 사용하도록 수정
 */

const reading = { customer: 'ivan', quantity: 10, month: 5, year: 2017 };

function enrichReading(original) {
  const result = JSON.parse(JSON.stringify(original)); // 깊은 복사
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
  return result;
}

// client1
{
  const aReading = enrichReading(acquireReading())
  const baseCharge = aReading.baseCharge;
}

// client2
{
  const aReading = enrichReading(acquireReading());
  const taxableCharge = aReading.taxableCharge;
}

// client3
{
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const basicCharge = aReading.baseCharge;
}

// 요금 계산 함수
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
