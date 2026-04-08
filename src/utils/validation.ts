export const validateNickname = (nickname: string) => {
  if (!nickname.trim()) return "닉네임을 입력해 주세요.";
  if (nickname.length < 2) return "닉네임은 최소 2글자 이상이어야 합니다.";
  if (nickname.length > 8) return "닉네임은 최대 8글자 이하여야 합니다.";

  const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
  if (!nicknameRegex.test(nickname)) {
    return "닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.";
  }

  return "";
};

export const validateEmail = (email: string) => {
  if (!email.trim()) return "이메일을 입력해 주세요.";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";
  return "";
};
