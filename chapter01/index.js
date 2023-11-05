const plays = {
  hamlet: {
    name: 'Hamlet',
    type: 'tragedy',
  },
  'as-like': {
    name: 'As You Like It',
    type: 'comedy',
  },
  othello: {
    name: 'Othello',
    type: 'tragedy',
  },
};

const invoices = {
  customer: 'BigCo',
  performances: [
    {
      playID: 'hamlet',
      audience: 55,
    },
    {
      playID: 'as-like',
      audience: 35,
    },
    {
      playID: 'othello',
      audience: 40,
    },
  ]
};

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function amountFor(aPerformance) {
  let result = 0;
  switch (playFor(aPerformance).type) {
    case 'tragedy':
      result = 40_000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case 'comedy':
      result = 30_000;
      if (aPerformance.audience > 20) {
        result += 10_000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)
  }
  return result;
}

function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ('comedy' === aPerformance.play.type) {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result;
}

function totalAmount(data) {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

function totalVolumeCredits(data) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function usd(aNumber) {
  return new Intl.NumberFormat(
    'en-us', 
    { 
      style: 'currency', 
      currency: 'usd', 
      minimumFractionDigits: 2 
    }
  ).format(aNumber/100);
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${perf.amount} (${perf.audience})석 \n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}

// 객체 복사 이유: 가변 데이터는 금방 상하므로 불변처럼 취급하기 위함
function enrichPerformance(aPerformance) {
  const result = { ...aPerformance };
  result.play = playFor(result);
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);
  return result;
}

function createStatementData(invoice) {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;
}

function statement(invoice) {
  return renderPlainText(createStatementData(invoice));
}

function htmlStatement(invoice) {
  return renderHtml(createStatementData(invoice));

  function renderHtml(data) {
    let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>`;
    result += '<table>\n';
    result += `<tr>
      <th>연극</th>
      <th>좌석 수</th>
      <th>금액</th>
    </tr>`;
    for (let perf of data.performances) {
      result += `<tr><td>${perf.play.name}</td><td>(${perf.audience})석</td>`;
      result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }
    result += '</table>\n';
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${usd(data.totalVolumeCredits)}</em>점</p>\n`;
    return result;
  }
}

console.log(statement(invoices));
