---
title: "HTTP Server for documentations"
date: "2017-01-25"
draft: false
path: "/blog/2017-01-25-http-server-for-documentations"
---

If you are in the need to see the latest API changes which swagger has generated you will need to run the assets on an HTTP Server. Luckily on Mac (probably also on Linux) we have a built in server for just that. Navigate to the project folder inside your terminal and execute this:

```console
python -m SimpleHTTPServer 8001
```

You can then visit your localhost at 8001 to see the website.
