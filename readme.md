# grunt-websize

Grunt plugin for logging web page size

*Heads up! This grunt task needs phantomjs to be installed and must be available as an executable!*

Options

* url 
target url, what needs to be downloaded and measured. It could be an enitre website or just a file from the web
* timeout
timeout after the website has loaded. With setting this value you can measure the additional downloads your side does (like loading facebook like button or ads)
* reportPath
report file output. It's going to be a JSON file with summarized and grouped information about the assets of the target website
* append
set to true, if you would like to keep history of the reports
* historyLength
maximum history length

