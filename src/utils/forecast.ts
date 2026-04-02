import { FetchForecastResponse } from "@/types/apiResponse";

const LIMIT_DAYS = 5; // 예보 가능 범위

type ForecastItem = FetchForecastResponse["list"][number];

/**
 * OpenWeather Forecast API : 현재 시점 기준 최대 5일까지의 예보 제공
 * 특정 날짜(date)가 예보 조회 가능한 범위인지 확인
 *
 * @param date - 날짜 문자열 (ex: "2026-01-01")
 * @returns 예보 조회 가능 여부 (true: 가능 / false: 불가능)
 */
export const isForecastAvailable = (date: string) => {
  if (!date) return false;

  const today = new Date();
  const target = new Date(date);

  const diff = (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  return diff <= LIMIT_DAYS;
};

/**
 * OpenWeather Forecast API : 3시간 단위의 시계열 데이터(list)를 반환
 * 원하는 날짜(targetDate)에 가장 근접한 dt_txt 값을 가진 항목을 찾아 반환헤주어야 함
 *
 * @param list - 3시간 단위 예보 데이터 배열
 * @param targetDate - 기준이 되는 날짜
 * @returns targetDate와 가장 근접한 예보 데이터
 */
export const getClosestForecast = (
  list: ForecastItem[],
  targetDate: string,
) => {
  const target = new Date(targetDate).getTime();

  return list.reduce((prev, curr) => {
    const prevDiff = Math.abs(new Date(prev.dt_txt).getTime() - target);
    const currDiff = Math.abs(new Date(curr.dt_txt).getTime() - target);

    return currDiff < prevDiff ? curr : prev;
  });
};
