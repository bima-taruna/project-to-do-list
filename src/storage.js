class Storage {
  set usersData(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  get usersData() {
    var value = localStorage.getItem("userData");
    return value && JSON.parse(value);
  }
}

export const storage = new Storage();
