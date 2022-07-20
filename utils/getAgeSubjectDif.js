export default function getDataFromServer(
  //   router,
  setAgesArr,
  setSubjectsArr,
  setDifficultiesArr
) {
  fetch("/api/age", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((ages) => {
      setAgesArr(ages);
    })
    .catch(() => console.log("error"));

  fetch("/api/subject", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((subjects) => {
      setSubjectsArr(subjects);
    })
    .catch(() => console.log("error"));

  fetch("/api/difficulty", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((difficulties) => {
      setDifficultiesArr(difficulties);
    })
    .catch(() => console.log("error"));
}
