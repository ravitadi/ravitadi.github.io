# Get Venues from foursquare
The sites uses foursquare api to get the best recommended Venues based on user location. If the location is disabled by default it will use chicago as its geolocation to find results. To make it very simple, transpiling is done on the browser so the website might take a big longer to load.

### Note:
- Everything is loaded on the client side using latest ESNext, React and Material UI.
- Not to be used for prod.
- Api calls are limited and may see time 429 errors if reached max calls
- Will work on latest chrome browser.
- Will take longer to load because of dependencies loaded on browser.
