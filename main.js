function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function pickBookmarkUrls(bookmarks) {
  var urls = []

  // When we have a URL for this bookmark, push it into the collection of URLs,
  // otherwise, go into the children of the node (if any) and push all URLs found
  // there into the collection. If neither a URL or children are present (such as
  // with an empty bookmark directory), we do nothing and carry on to the next
  // item.
  bookmarks.forEach(function(bookmark) {
    if (bookmark.url !== undefined) {
      urls.push(bookmark.url)
    } else if (!!bookmark.children) {
      pickBookmarkUrls(bookmark.children).forEach(function(child) {
        urls.push(child)
      })
    }
  })

  return urls
}

chrome.browserAction.onClicked.addListener(function() {
  chrome.bookmarks.getTree(function(bookmarks) {
    var urls      = pickBookmarkUrls(bookmarks),
        num       = getRandomInt(0, urls.length),
        randomUrl = urls[num]

    chrome.tabs.create({ url: randomUrl })
  })
})
