import cn from 'comma-number'

export const priceFormatter = (value, offer) => {
  if(offer === 'leased') return { price: cn(Number(value).toFixed()), abb: null }

  if(value === 0) return 0

  let code = ''
  let newValue
  if(value >= 500) {
    if(value > 999499) {
      newValue = Math.round(value / 10000) / 100
      code = 'M'
    } else {
      newValue = Math.round(value / 1000)
      code = 'K'
    }
  }
  return { price: newValue.toString(), abb: code }
}

export const getAreaPrefix = areaType => {
  let areasDataPrefix = null
  if(areaType === 'Locality') {
    areasDataPrefix = 'localities'
  } else if(areaType === 'Neighbourhood') {
    areasDataPrefix = 'neighbourhoods'
  } else if(areaType === 'Sublocality') {
    areasDataPrefix = 'sublocalities'
  } else if(areaType === 'LocalityParent') {
    areasDataPrefix = 'localityParents'
  } else if(areaType === 'LocalityGrandparent') {
    areasDataPrefix = 'localityGrandparents'
  }
  return areasDataPrefix
}

export const getReportRowTitle = title => {
  let newTitle = null
  switch(title) {
    case 'all-home-types':
      newTitle = 'Home'
      break
    case 'condos':
      newTitle = 'Condo'
      break
    case 'detached-houses':
      newTitle = 'Detached Home'
      break
    case 'semi-detached-houses':
      newTitle = 'Semi-Detached Home'
      break
    case 'townhouses':
      newTitle = 'Townhouse'
      break
    default:
      newTitle = 'Home'
  }

  return newTitle
}
