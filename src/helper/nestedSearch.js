export function nestedSearchProject(arr1, arr2, command, checkBox) {
  arr1.forEach((item1) => {
    arr2.forEach((item2) => {
      command(item1, item2, checkBox);
    });
  });
}
