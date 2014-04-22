var addCommas = function(str) {

    var chars = str.split('');
    var newChars = chars.reverse();

    var threeChunks = [];

    var iterator = 0;
    var newStr = '';
    for(var i=0; i<newChars.length; i++) {

        if(iterator == 0) {
            newStr = newChars[i];
        } else {
            newStr += newChars[i];
        }

        iterator++;
        if(iterator == 3) {
            threeChunks.push(newStr.split("").reverse().join(""));
            iterator = 0;
        }
    }

    if(iterator > 0) {
        threeChunks.push(newStr.split("").reverse().join(""));
    }

    var finalStr = '';
    var newChunks = threeChunks.reverse()
    for(var j=0; j<newChunks.length; j++) {
        if(finalStr=='') {
            finalStr = newChunks[j];
        } else {
            finalStr = finalStr + ',' + newChunks[j];
        }
    }

    return finalStr;

};