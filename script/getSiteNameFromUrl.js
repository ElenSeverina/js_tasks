/*
    Goal:
    Develop an regex that gets a site name from given url

    Examples:
    https://subd.sitename.com/ru/post/167015/ -> sitename
*/

const regex = /^(\w+:\/\/)?([^./?]+\.)*([^\\]+)\.+/;

function getSiteNameFromUrl(str) {
  return str.match(regex)[3];
}
console.assert(getSiteNameFromUrl('https://subd.sitename.com/post/167015/') === 'sitename', 1);
console.assert(getSiteNameFromUrl('https://tutsplus.com/tutorials/8-regular-expressions-you-should-know') === 'tutsplus', 2);
console.assert(getSiteNameFromUrl('tutsplus.com/tutorials/8-regular-expressions-you-should-know') === 'tutsplus', 3);
console.assert(getSiteNameFromUrl('http://codeguida.com/post/488') === 'codeguida', 4);
console.assert(getSiteNameFromUrl('codeguida.com/post/488') === 'codeguida', 5);
console.assert(getSiteNameFromUrl('https://www.amazon.com/s?i=specialty-aps&bbn') === 'amazon', 6);
console.assert(getSiteNameFromUrl('www.amazon.com/s?i=specialty-aps&bbn') === 'amazon', 7);
console.assert(getSiteNameFromUrl('https://ua.wikipedia.org/wiki/%D0%97%D0%B0%D0%') === 'wikipedia', 8);
console.assert(getSiteNameFromUrl('ua.wikipedia.org/wiki/%D0%97%D0%B0%D0%') === 'wikipedia', 9);

console.log('Finished testing');
