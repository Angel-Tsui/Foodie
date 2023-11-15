"use client";
export const userToken = getToken();

function getToken() {
  if (typeof window != "undefined") {
    let userToken = window.localStorage.getItem("token");
    return userToken;
  }
}

async function verify() {
  if (typeof window != "undefined") {
    let userToken = window.localStorage.getItem("token");
    if (userToken == null) {
      window.location = "/";
    } else {
      return userToken;
    }
  }
}

function signInOrSignOut() {
  let userToken = getToken();
  if (userToken == null) {
    return null;
  } else {
    return true;
  }
}

function getUserInfoFromToken() {
  if (typeof window != "undefined") {
    let userToken = getToken();
    if (userToken != null) {
      userToken = JSON.parse(userToken);
      return userToken;
    }
  }
}

export { getUserInfoFromToken, verify, signInOrSignOut };
