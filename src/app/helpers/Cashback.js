function getPurchaseCashback (price) {
  if (price <= 1000) {
    return {
      percentage: '10%',
      multiplier: 0.10
    }
  } else if (price > 1000 && price < 1500) {
    return {
      percentage: '15%',
      multiplier: 0.15
    }
  }

  return {
    percentage: '20%',
    multiplier: 0.2
  }
}

module.exports = { getPurchaseCashback }
