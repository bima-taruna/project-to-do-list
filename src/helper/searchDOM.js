export function searchDOM(node) {
  if (!node || !node.parentNode) {
    console.error("Node or its parent is null");
    return -1;
  }
  let children = node.parentNode.childNodes;
  let num = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i] == node) return num;
    if (children[i].nodeType == 1) num++;
  }
  console.log("execute");
  return -1;
}
