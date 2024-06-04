export function searchDOM(node) {
  let children = node.parentNode.childNodes;
  let num = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i] == node) return num;
    if (children[i].nodeType == 1) num++;
  }
  console.log("execute");
  return -1;
}
