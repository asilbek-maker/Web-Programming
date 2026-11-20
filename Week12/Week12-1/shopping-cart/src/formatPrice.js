// 89000 -> "89,000원"
export default function formatPrice(won) {
  return `${won.toLocaleString('ko-KR')}원`;
}
