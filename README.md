# ciOsk 
A simple kiosk application that can display as many
html resources as fit on your screen. 
The content panels are splittable and resizable in both orientations.
The compilation of content can be displayed fullscreen.

>Without running the proxy, the application is not able to display pages that expose any kind of origin policy inside their headers nor able to give any kind of respective feedback in the user interface.<br>
(...just in case that you cannot see the resource ;) )
>> concourse pipeline visualizations are i.e. not introducing any kind of origin policy...  

	
## build:

### run the devBuild
><code>npm run build</code>
<p>creates the dist including all files necessary, without minification.</p>


### run the releaseBuild
><code>npm run build-release</code>
<p>creates the dist including all files necessary, with minification.</p>

### run an in-dev refresh
><code>npm refresh</code>
<p>Refreshes only changes in js and theme, while skipping tests.</p>

### run the tests
><code>npm test</code>
<p>Run solely the tests</p>

### live-reload
>#### install browserSync
<code>npm install -g browser-sync </code>

>#### nav to ./dist and start browserSync
<code>browser-sync start --server --files "*.css, *.html, *.js"  </code>

## run:
