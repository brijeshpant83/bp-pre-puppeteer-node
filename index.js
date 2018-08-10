var url = require('url');
const puppeteer = require('puppeteer');
var HTMLRender = module.exports = function(req, res, next) {
  if(!HTMLRender.shouldShowHTMLRenderedPage(req)) return next();

  var urltocrawel = HTMLRender.buildApiUrl(req);

  if(urltocrawel){

    puppeteer.launch().then(browser => {
      browser.newPage().then(page => {
        page
          .goto(urltocrawel, { waitUntil: 'networkidle2' })
          .then(function (){
            return page.content()
          })
          .then((resthtml) => {
            browser.close();
            return res.end(resthtml || '');
          });
      });
    });
    
    /*try {
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(urltocrawel, {waitUntil: 'networkidle2'});
        const html = await page.content();
        await browser.close();    
        return res.end(html || '');
      })();  
    } catch (error) {
      puppeteer.launch().then(browser => {
        browser.newPage().then(page => {
          page
            .goto(urltocrawel, { waitUntil: 'networkidle2' })
            .then(function (){
              return page.content()
            })
            .then((resthtml) => {
              browser.close();
              return res.end(resthtml || '');
            });
        });
      });
    }*/
  }else{
    return res.end('');
  }
};

HTMLRender.crawlerUserAgents = [
  'googlebot',
  'yahoo',
  'bingbot',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'slackbot',
  'vkShare',
  'W3C_Validator',
  'redditbot',
  'Applebot',
  'WhatsApp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'SkypeUriPreview',
  'nuzzel',
  'Discordbot',
  'Google Page Speed',
  'Qwantify',
	'pinterestbot',
  'Bitrix link preview',
  'XING-contenttabreceiver'
];


HTMLRender.extensionsToIgnore = [
  '.js',
  '.css',
  '.xml',
  '.less',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.pdf',
  '.doc',
  '.txt',
  '.ico',
  '.rss',
  '.zip',
  '.mp3',
  '.rar',
  '.exe',
  '.wmv',
  '.doc',
  '.avi',
  '.ppt',
  '.mpg',
  '.mpeg',
  '.tif',
  '.wav',
  '.mov',
  '.psd',
  '.ai',
  '.xls',
  '.mp4',
  '.m4a',
  '.swf',
  '.dat',
  '.dmg',
  '.iso',
  '.flv',
  '.m4v',
  '.torrent',
  '.woff',
  '.ttf',
  '.svg'
];


HTMLRender.whitelisted = function(whitelist) {
  HTMLRender.whitelist = typeof whitelist === 'string' ? [whitelist] : whitelist;
  return this;
};


HTMLRender.blacklisted = function(blacklist) {
  HTMLRender.blacklist = typeof blacklist === 'string' ? [blacklist] : blacklist;
  return this;
};


HTMLRender.shouldShowHTMLRenderedPage = function(req) {
  var userAgent = req.headers['user-agent']
    , bufferAgent = req.headers['x-bufferbot']
    , isRequestingHTMLRenderedPage = false;

  if(!userAgent) return false;
  if(req.method != 'GET' && req.method != 'HEAD') return false;
  if(req.headers && req.headers['x-prerender']) return false;

  //if it contains _escaped_fragment_, show prerendered page
  var parsedQuery = url.parse(req.url, true).query;
  if(parsedQuery && parsedQuery['_escaped_fragment_'] !== undefined) isRequestingHTMLRenderedPage = true;

  //if it is a bot...show prerendered page
  if(HTMLRender.crawlerUserAgents.some(function(crawlerUserAgent){ return userAgent.toLowerCase().indexOf(crawlerUserAgent.toLowerCase()) !== -1;})) isRequestingHTMLRenderedPage = true;

  //if it is BufferBot...show prerendered page
  if(bufferAgent) isRequestingHTMLRenderedPage = true;

  //if it is a bot and is requesting a resource...dont prerender
  if(HTMLRender.extensionsToIgnore.some(function(extension){return req.url.toLowerCase().indexOf(extension) !== -1;})) return false;

  //if it is a bot and not requesting a resource and is not whitelisted...dont prerender
  if(Array.isArray(this.whitelist) && this.whitelist.every(function(whitelisted){return (new RegExp(whitelisted)).test(req.url) === false;})) return false;

  //if it is a bot and not requesting a resource and is not blacklisted(url or referer)...dont prerender
  if(Array.isArray(this.blacklist) && this.blacklist.some(function(blacklisted){
    var blacklistedUrl = false
      , blacklistedReferer = false
      , regex = new RegExp(blacklisted);

    blacklistedUrl = regex.test(req.url) === true;
    if(req.headers['referer']) blacklistedReferer = regex.test(req.headers['referer']) === true;

    return blacklistedUrl || blacklistedReferer;
  })) return false;

  return isRequestingHTMLRenderedPage;
};



HTMLRender.buildApiUrl = function(req) {
  
  var protocol = req.connection.encrypted ? "https" : "http";
  if (req.headers['cf-visitor']) {
    var match = req.headers['cf-visitor'].match(/"scheme":"(http|https)"/);
    if (match) protocol = match[1];
  }
  if (req.headers['x-forwarded-proto']) {
    protocol = req.headers['x-forwarded-proto'].split(',')[0];
  }
  if (this.protocol) {
    protocol = this.protocol;
  }
  var fullUrl = protocol + "://" + (this.host || req.headers['x-forwarded-host'] || req.headers['host']) + req.url.replace("_escaped_fragment_=", "");
  return fullUrl;
};




HTMLRender.set = function(name, value) {
  this[name] = value;
  return this;
};
