import { verify, getUserInfoFromToken } from "../../../firebase/verify";

export default function getName() {
  // verify();
  let userInfo = getUserInfoFromToken();
  if (userInfo) {
    let userEmail = userInfo["userEmail"];
    let name = userEmail.split("@")[0];
    let userName = name.toUpperCase();
    // console.log(userEmail, name);
    return <span>{userName}</span>;
  }
}
