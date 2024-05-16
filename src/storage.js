class Storage {
  set nameData(name) {
    localStorage.setItem("userName", name);
  }

  get nameData() {
    return localStorage.getItem("userName");
  }
}

export default Storage;
