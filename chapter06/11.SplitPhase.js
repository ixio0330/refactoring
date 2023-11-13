// 단계 쪼개기

/**
 * 두 번째 단계에 해당하는 코드를 독립 함수로 추출
 * 테스트
 * 중간 데이터 구조를 만들어서 앞에서 추출한 함수의 인수로 추가
 * 테스트
 * 추출한 두 번째 함수의 매개변수를 하나씩 검토 -> 첫 번째 단계에서 사용되는 것은 중간 데이터 구조로 옮기기
 * 첫 번째 단계 코드를 함수로 추출하면서 중간 데이터 구조를 반환하게 만들기
 */

function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount = 
    Math.max(quantity - product.discountThreshold, 0)
    * product.basePrice * product.discountRate;
  const price = applyShipping(basePrice, shippingMethod, quantity, discount);
  return price;
}

function applyShipping(basePrice, shippingMethod, quantity, discount) {
  const shippingPerCase = 
    basePrice > shippingMethod.discountThreshold
    ? shippingMethod.discountFee
    : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}
