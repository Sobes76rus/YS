import getConfig from "next/config";

export default function getCardsUrl(query) {
  const { publicRuntimeConfig } = getConfig();
  const url = new URL(`${publicRuntimeConfig.API_URL}/card-lookbooks`);

  const priceTagMore = query["priceMin"];
  const priceTagLess = query["priceMax"];
  const dickSizeMax = query["dickMax"];
  const dickSizeMin = query["dickMin"];
  const beastSizeMax = query["breastMax"];
  const breastSizeMin = query["breastMin"];
  const cityId = query["city.name"];
  const metroId = query["metro.name"];
  const uslugiTags = query["usligis.name"];

  if (priceTagMore) {
    url.searchParams.append("price_gte", priceTagMore);
  }
  if (priceTagLess) {
    url.searchParams.append("price_lte", priceTagLess);
  }
  if (dickSizeMax) {
    url.searchParams.append("dick_size_lte", dickSizeMax);
  }
  if (dickSizeMin) {
    url.searchParams.append("dick_size_gte", dickSizeMin);
  }
  if (beastSizeMax) {
    url.searchParams.append("breast_size_lte", beastSizeMax);
  }
  if (breastSizeMin) {
    url.searchParams.append("breast_size_gte", breastSizeMin);
  }

  if (cityId) {
    url.searchParams.append("city.name", cityId);
  }
  if (metroId) {
    url.searchParams.append("metros.name", metroId);
  }
  if (uslugiTags) {
    url.searchParams.append("uslugis.name", uslugiTags);
  }
  url.searchParams.sort();

  return url.toString();
}
