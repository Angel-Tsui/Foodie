import { auth } from "./firebase";

export const userToken = signInOrSignOut();

function SignIn() {
  console.log("Sign In");
  async function fireSignIn(signInUserEmail, signInUserPw) {
    try {
      const user = await auth.signInWithEmailAndPassword(
        signInUserEmail,
        signInUserPw
      );
      return {
        success: true,
        user: user.user,
      };
    } catch (err) {
      return {
        error: true,
        message: err.message,
      };
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();
    const signInUserEmail = signInForm["signInUserEmail"].value;
    const signInUserPw = signInForm["signInUserPw"].value;
    const signInStatus = await fireSignIn(signInUserEmail, signInUserPw);
    if (Object.keys(signInStatus).includes("error")) {
      setUserStatus({ error: true, message: "賬號或密碼不正確，請確認" });
    } else {
      let userToken = {
        userId: signInStatus["user"].uid,
        userEmail: signInStatus["user"].email,
      };
      setUserStatus({ success: true, user: userToken });
      window.localStorage.setItem("token", JSON.stringify(userToken));
      let confirmUser = signInOrSignOut();
      if (confirmUser) {
        window.location.href = "/collection";
      }
    }
  }
  return (
    <div className={styles.signIn}>
      <div className={styles.headers}>會員專區</div>
      <form id="signInForm">
        {userToken == null && (
          <input type="text" placeholder="電子郵件" id="signInUserEmail" />
        )}
        {userToken == null && (
          <input type="password" placeholder="密碼" id="signInUserPw" />
        )}
        {userToken == null ? (
          <button className={layoutStyle.btn} onClick={handleSignIn}>
            登入
          </button>
        ) : (
          <button className={layoutStyle.btnDark} onClick={handleSignOut}>
            登出
          </button>
        )}
      </form>
    </div>
  );
}

function SignOut(e) {
  console.log("Sign Out");
  window.localStorage.removeItem("token");
}

export default { SignUp, SignIn, SignOut };
