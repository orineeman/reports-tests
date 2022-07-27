export default function getDate() {
  const currentdate = new Date();
  const date =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();
  return date;
}
