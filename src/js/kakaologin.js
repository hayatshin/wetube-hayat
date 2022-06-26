const KakaoLogin = document.querySelector("#KakaoLogin");
const KakaoLogout = document.querySelector("#KakaoLogout");

const handleKakaoLogin = () => {
  console.log(Kakao.isInitialized());
  if (!Kakao.isInitialized()) {
    window.Kakao.init("0ebf7b9d9ab2ab6fea8c1523158ba0fe");
    window.Kakao.Auth.login({
      scope: "profile_nickname, profile_image, account_email",
      success: function (authObj) {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            alert("로그인 성공");
          },
        }).then(
          (window.location.href = "https://practiceguitar.herokuapp.com/video")
        );
      },
      fail: function (error) {
        console.log(error);
      },
    });
  } else {
    window.location.href = "https://practiceguitar.herokuapp.com/video";
  }
};

KakaoLogin.addEventListener("click", handleKakaoLogin);
