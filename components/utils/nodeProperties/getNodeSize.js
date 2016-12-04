// 得到一个element的size，其中包含height and width
export default function getNodeSize(element) {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}
