const KakaoLogin = document.querySelector("#KakaoLogin");
const KakaoLogout = document.querySelector("#KakaoLogout");

const handleKakaoLogin = () => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init("0ebf7b9d9ab2ab6fea8c1523158ba0fe");
    window.Kakao.Auth.login({
      scope: "profile_nickname, profile_image, account_email",
      success: function (authObj) {
        console.log(authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            console.log(res);
          },
        });
        window.Kakao.Auth.authorize({
          redirectUri: "https://practiceguitar.herokuapp.com/video",
        });
      },
    });
  }
};

KakaoLogin.addEventListener("click", handleKakaoLogin);
