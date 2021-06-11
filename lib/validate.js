const isInteger = (val) => {
  const reg = /^[0-9]*$/g;
  return reg.test(val)
}

const isEnglish = val => {
  const reg = /^[a-zA-Z]*$/g;
  return reg.test(val)
}
module.exports =  {
  isInteger,
  isEnglish
}