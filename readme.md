# Grunt plugin for logging web page size


*Heads up! This grunt task needs phantomjs to be installed!*

This grunt task is able to summarize the asset size of a single web site page. Additionally it can track how much data transferred after the site has finished loading.

## Options ##

* `url`  
target url, what needs to be downloaded and measured. It could be an enitre website or just a file from the web
* `timeout`  
timeout after the website has loaded. With setting this value you can measure the additional downloads your side does (like loading facebook like button or ads)
* `reportPath`  
report file output. It's going to be a JSON file with summarized and grouped information about the assets of the target website
* `append`  
set to true, if you would like to keep history of the reports
* `historyLength`  
maximum history length


## Install ##

> npm install git+ssh://git@github.com:tiborbotos/grunt-websize.git#master --save-dev

## Sample output ##

The task creates a file with a json output.
```json
{
   "pageload":{
      "files":20,
      "size":502317,
      "html":{
         "size":67745,
         "files":1
      },
      "image":{
         "size":63440,
         "files":9
      },
      "javascript":{
         "size":253241,
         "files":6
      },
      "other":{
         "size":117891,
         "files":4
      },
      "domains":[
         "http://something.com",
         "data:image",
      ]
   },
   "afterload":{
      "files":36,
      "size":455787,
      "html":{
         "size":124372,
         "files":9
      },
      "image":{
         "size":5535,
         "files":9
      },
      "javascript":{
         "size":178846,
         "files":5
      },
      "other":{
         "size":147034,
         "files":13
      },
      "domains":[
         "http://facebook.com"
      ]
   }
}
```
