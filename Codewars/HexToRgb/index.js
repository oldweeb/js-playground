const hexStringToRGB = (hexString) => {
    hexString = hexString.substr(1, hexString.length - 1);
    let hexSubStrings = [];
    for (let i = 0; i < hexString.length; i += 2) {
        let hexSub = hexString.substr(i, 2);
        hexSubStrings.push(hexSub);
    }
    let rgb = [];
    for (let i = 0; i < hexSubStrings.length; ++i) {
        rgb.push(parseInt(hexSubStrings[i], 16));
    }
    return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2]
    };
};

console.log(hexStringToRGB('#ffffff'));