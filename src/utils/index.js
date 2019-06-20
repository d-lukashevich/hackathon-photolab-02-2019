function preventCors(url, proxy = 'https://cors-anywhere.herokuapp.com/') {
    return proxy + url;
}

export { preventCors };
