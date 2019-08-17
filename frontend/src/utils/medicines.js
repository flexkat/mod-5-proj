export const getDrugId = ({url, dose, morning, evening}) => {
  return url + "-" + dose + (morning ? "-A" : "") + (evening ? "-P" : "")
}

export const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}

export const createDoseOptions = () => {
  return [10,20,30,40].map(num => ({
    key: num,
    text: `${num}mg`,
    value: num,
  }))
}