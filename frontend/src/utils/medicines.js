export const getDrugId = ({url, dose, morning, evening}) => {
  return url + "-" + dose + (morning ? "-A" : "") + (evening ? "-P" : "")
}