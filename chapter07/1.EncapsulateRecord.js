// 레코드 캡슐화하기

/**
 * 레코드를 담은 변수를 캡슐화
 * 레코드를 감싼 단순한 클래스로 해당 변수의 내용 교체
 * 클래스에 원본 레코드를 반환하는 접근자도 정의하고, 변수를 캡슐화하는 함수들이 이 접근자를 사용하도록 수정
 * 테스트
 * 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만들기
 * 레코드를 반환하는 예전 함수를 사용하는 코드를 4에서 만든 새 함수를 사용하도록 바꾸기
 * 필드에 접근할 때 객체의 접근자 사용(적절한 접근자가 없다면 추가)
 * 클래스에서 원본 데이터를 반환하는 접근자와 원본 레코드를 반환하는 함수들 제거
 * 테스트
 * 레코드의 필드도 데이터 구조의 중첩 구조라면 레코드 캡슐화하기와 컬렉션 캡슐화하기를 재귀적으로 적용
 */

const organization = new Organization({ name: '애크미 구스베리', country: 'GB' });

function getOrganization() {
  return organization;
}

// use
{
  let result = '';
  result += `<h1>${getOrganization().name}</h1>`;
  getOrganization().name = newName;
}

class Organization {
  #data = {};
  constructor(data) {
    this.#data = data;
  }

  get name() { return this.#data.name; }
  set name(aString) { this.#data.name = aString; }
  get country() { return this.#data.country; }
  set country(aCountryCode) { this.#data.country = aCountryCode; }
}

// 중첩된 레코드 캡슐화하기
const Json = {
  1920: {
    name: '마틴 파울러',
    id: 1920,
    usages: {
      2016: {
        1: 50,
        2: 55,
      },
      2016: {
        1: 70,
        2: 63,
      }
    }
  },
  38673: {
    name: '닐 포드',
    id: 38673,
  }
};

// 쓰기 예
customerData[customer.ID].usages[year][month] = amount;

// 읽기 예
function compareUsage(customerID, lateYear, month) {
  const later = customerData[customerID].usages[lateYear][month];
  const earlier = customerData[customerID].usages[lateYear - 1][month];
  return { lateAmount: later, change: later - earlier };
}
