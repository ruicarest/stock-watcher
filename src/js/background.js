import "../img/icon-128.png";
import "../img/icon-34.png";

chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 255] });
chrome.browserAction.setBadgeText({ text: `...` });

getRequest(
  `https://financialmodelingprep.com/api/v3/quote-short/${process.env.STOCKSYMBOL}?apikey=${process.env.FINKEY}`,
  updateBadge
);

setInterval(() => {
  getRequest(
    `https://financialmodelingprep.com/api/v3/quote-short/${process.env.STOCKSYMBOL}?apikey=${process.env.FINKEY}`,
    updateBadge
  );
}, process.env.TIMEINTERVAL);

function updateBadge(response) {
  let info = JSON.parse(response);
  console.log(info);
  chrome.browserAction.setBadgeText({ text: `${info[0].price}` });
}

function getRequest(url, success) {
  var req = false;
  try {
    req = new XMLHttpRequest();
  } catch (e) {
    return false;
  }

  if (!req) return false;

  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.status === 200) {
        success(req.responseText);
      }
    }
  };
  req.open("GET", url, true);
  req.send(null);
  return req;
}
