export const validateNickname = (nickname: string) => {
  if (!nickname.trim()) return "닉네임을 입력해 주세요.";
  if (nickname.length < 2) return "닉네임은 최소 2글자 이상이어야 합니다.";
  if (nickname.length > 8) return "닉네임은 최대 8글자 이하여야 합니다.";
  return "";
};

export const validateEmail = (email: string) => {
  if (!email.trim()) return "이메일을 입력해 주세요.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // [문자]@[문자].[문자] 형태 정규식
  if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";
  return "";
};
