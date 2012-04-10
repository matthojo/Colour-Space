// Author: Matthew Harrison-Jones

// Array Remove - By John Resig (MIT Licensed)
Array.remove = function (array, from, to) {

    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            break;
        }
    }
};

$(document).ready(function () {

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

    // requestAnimationFrame polyfill by Erik Möller
    // fixes from Paul Irish and Tino Zijdel

    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    }());

    /* FPS monitoring
     *
     * The higher the 'fpsFilter' value, the less the FPS will be affected by quick changes
     * Setting this to 1 will show you the FPS of the last sampled frame only
     */

    // stats.js r9 - http://github.com/mrdoob/stats.js
    var Stats=function(){var h,a,r=0,s=0,i=Date.now(),u=i,t=i,l=0,n=1E3,o=0,e,j,f,b=[[16,16,48],[0,255,255]],m=0,p=1E3,q=0,d,k,g,c=[[16,48,16],[0,255,0]];h=document.createElement("div");h.style.cursor="pointer";h.style.width="80px";h.style.opacity="0.9";h.style.zIndex="10001";h.addEventListener("mousedown",function(a){a.preventDefault();r=(r+1)%2;0==r?(e.style.display="block",d.style.display="none"):(e.style.display="none",d.style.display="block")},!1);e=document.createElement("div");e.style.textAlign=
        "left";e.style.lineHeight="1.2em";e.style.backgroundColor="rgb("+Math.floor(b[0][0]/2)+","+Math.floor(b[0][1]/2)+","+Math.floor(b[0][2]/2)+")";e.style.padding="0 0 3px 3px";h.appendChild(e);j=document.createElement("div");j.style.fontFamily="Helvetica, Arial, sans-serif";j.style.fontSize="9px";j.style.color="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";j.style.fontWeight="bold";j.innerHTML="FPS";e.appendChild(j);f=document.createElement("div");f.style.position="relative";f.style.width="74px";f.style.height=
        "30px";f.style.backgroundColor="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";for(e.appendChild(f);74>f.children.length;)a=document.createElement("span"),a.style.width="1px",a.style.height="30px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+b[0][0]+","+b[0][1]+","+b[0][2]+")",f.appendChild(a);d=document.createElement("div");d.style.textAlign="left";d.style.lineHeight="1.2em";d.style.backgroundColor="rgb("+Math.floor(c[0][0]/2)+","+Math.floor(c[0][1]/2)+","+Math.floor(c[0][2]/2)+")";d.style.padding=
        "0 0 3px 3px";d.style.display="none";h.appendChild(d);k=document.createElement("div");k.style.fontFamily="Helvetica, Arial, sans-serif";k.style.fontSize="9px";k.style.color="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";k.style.fontWeight="bold";k.innerHTML="MS";d.appendChild(k);g=document.createElement("div");g.style.position="relative";g.style.width="74px";g.style.height="30px";g.style.backgroundColor="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";for(d.appendChild(g);74>g.children.length;)a=document.createElement("span"),
        a.style.width="1px",a.style.height=30*Math.random()+"px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+c[0][0]+","+c[0][1]+","+c[0][2]+")",g.appendChild(a);return{getDomElement:function(){return h},getFps:function(){return l},getFpsMin:function(){return n},getFpsMax:function(){return o},getMs:function(){return m},getMsMin:function(){return p},getMsMax:function(){return q},update:function(){i=Date.now();m=i-u;p=Math.min(p,m);q=Math.max(q,m);k.textContent=m+" MS ("+p+"-"+q+")";var a=Math.min(30,
        30-30*(m/200));g.appendChild(g.firstChild).style.height=a+"px";u=i;s++;if(i>t+1E3)l=Math.round(1E3*s/(i-t)),n=Math.min(n,l),o=Math.max(o,l),j.textContent=l+" FPS ("+n+"-"+o+")",a=Math.min(30,30-30*(l/100)),f.appendChild(f.firstChild).style.height=a+"px",t=i,s=0}}};

    var stats = new Stats();

    // Align top-left
    stats.getDomElement().style.position = 'absolute';
    stats.getDomElement().style.left = '0px';
    stats.getDomElement().style.top = '0px';

    document.body.appendChild(stats.getDomElement());

    setInterval(function () {

        stats.update();

    }, 1000 / 60);

    /******
     *
     * VARIABLES
     *
     ********/

    /**
     * Output Canvas settings
     */
    var canvas = $("#finalCanvas");
    var context = canvas.get(0).getContext("2d");
    var canvasWidth = $(window).get(0).innerWidth;
    var canvasHeight = $(window).get(0).innerHeight;

    canvas.attr("width", canvasWidth);
    canvas.attr("height", canvasHeight);

    /**
     * Temp Canvas settings
     */
    var cnv = $("#colourCanvas");
    var ctx = cnv.get(0).getContext("2d");
    var cnvWidth = 255;
    var cnvHeight = 255;

    cnv.attr("width", cnvWidth);
    cnv.attr("height", cnvHeight);
    canvas.hide();

    var exm = $("#exampleCanvas");
    var etx = exm.get(0).getContext("2d");
    var exmWidth = 255;
    var exmHeight = 255;
    exm.attr("width", exmWidth);
    exm.attr("height", exmHeight);

    /**
     * Colour Settings
     */
    var B = 0;
    var dir = "up";
    var RG = 0;

    /**
     * Settings and data
     */
    var paused = false;
    var ammountOfColours = 10;
    var imageData;
    var samples = [];
    var pixels = [];

    /******
     *
     * OBJECTS
     *
     ********/

    /**
     * Colour Object
     *
     * @param r
     * @param g
     * @param b
     */
    var Colour = function (r,g,b){
        var r = r;
        var g = g;
        var b = b;

        var collective = [r,g,b];

        return {
            values: collective,
            r: r,
            g: g,
            b: b
        };
    };

    /******
     *
     * FUNCTIONS
     *
     ******/


    function randomColourObjects(){
        var col1 = bitwiseRound(Math.random()*255);
        var col2 = bitwiseRound(Math.random()*255);
        var col3 = bitwiseRound(Math.random()*255);
        samples.push(new Colour(col1, col2, col3));
    }


    /**
    * Push Random Colours
    * @param value Number of random colours
    **/
    function generateRandColours(value){
        for(var i=0;i<value;i++){
            randomColourObjects();
        }
    }

    /**
    * Generate samples of the colours
    **/
    function displaySamples(){
        for(var j = 0; j < samples.length; j++){
            var sample = samples[j];
            $(".samples").append(" <span class=\"sample\" style=\"background-color:rgb("+sample.r+","+sample.g+","+sample.b+")\"> </span> ");
        }
    }

    /**
    * Clear old colours and generate new ones.
    **/
    function newColours(){
        samples = [];
        generateRandColours(ammountOfColours);
        $(".sample").remove();
        displaySamples();
    }

    /**
     * Draws Gradient
     * @param can The canvas drawing to
     */
    function drawGradient(can){
        // Manual Gradient
        for (var i=0;i<256;i++){
            for (var j=0;j<256;j++){
                can.fillStyle = 'rgb('+i+','+j+','+ B +')';
                can.fillRect(i,j,1,1);
                etx.fillStyle = 'rgb('+i+','+j+','+ B +')';
                etx.fillRect(i,j,1,1);
            }
        }

        /*var gradient = can.createLinearGradient(0,0, 255, 255);
        gradient.addColorStop(0, "rgb(0, 0, "+B+")");
        gradient.addColorStop(1, "rgb(255, 255, "+B+")");
        can.save();
        can.fillStyle = gradient;
        etx.fillStyle = gradient;
        can.fillRect(0, 0, 255, 255);
        etx.fillRect(0, 0, 255, 255);
        can.restore();
        RG++;*/
    }

    /**
     * Update Values
     */
    function updateColour(){
        if(B < 256 && dir == "up") B = B+4;
        else dir = "down";
        if(B > 0 && dir == "down") B = B-4;
        else dir = "up";
    }

    /**
     * Grab gradient image data
     */
    function drawNewColourSpace(can){
        imageData = can.getImageData(0, 0, 255, 255);
        pixels = imageData.data;
        var numPixels = imageData.width * imageData.height;

        var numSamples = samples.length;

        for (var i = 0; i < numPixels; i++) {

            var r = pixels[i*4]; // Red
            var g = pixels[i*4+1]; // Green
            var b = pixels[i*4+2]; // Blue

            var rgb = [r,g,b];
            var closest = samples[0];
            var mindist = dist(rgb, samples[0].values, 1);

            for(var j = 0; j < numSamples; j++){
                var currdist = dist(samples[j].values, rgb, 1);
                if(currdist < mindist) {
                    mindist = currdist;
                    closest = samples[j];
                }
            }

            pixels[i*4] = closest.r; // Red
            pixels[i*4+1] = closest.g; // Green
            pixels[i*4+2] = closest.b; // Blue
        }
        can.clearRect(0, 0, 255, 255);
        can.putImageData(imageData, 0, 0);

    }

    /**
     * Calculate distance between pixels
     *
     * @param col1
     * @param col2
     * @param type
     */
    function dist(col1,col2, type) {
        var value;

        switch(type){
            case 1:
                var delta_r = col1[0] - col2[0];
                var delta_g = col1[1] - col2[1];
                var delta_b = col1[2] - col2[2];
                value = (delta_r * delta_r)* .299 + (delta_g * delta_g)* .587 + (delta_b * delta_b)* .114;
                break;
            // Euclidean Distace with Eye sight alterations
            case 2:
                value = Math.sqrt(((col1[0] - col2[0]) * .299)^2 + ((col1[1] - col2[1]) * .587)^2 + ((col1[2] - col2[2]) * .114)^2);
                break;
            // Euclidean Distace
            case 3:
                value = Math.sqrt(((col1[0] - col2[0]))^2 + ((col1[1] - col2[1]))^2 + ((col1[2] - col2[2]))^2);
                break;
            default:
                value = (delta_r * delta_r)* .299 + (delta_g * delta_g)* .587 + (delta_b * delta_b)* .114;
                break;
        }
        return value;
    }

    /**
    *
    * INIT
    *
    **/

    generateRandColours(ammountOfColours);
    displaySamples();

    /**
     * Draws everything together.
     */
    function draw() {
        updateColour();
        drawGradient(ctx);

        /*var img = new Image();   // Create new img element
        img.onload = function(){
            ctx.drawImage(img,0,0,255,255);
        };
        img.src = 'img/imgres.png';*/

        drawNewColourSpace(ctx);

        //Show in big
        //context.drawImage(cnv.get(0), 0, 0, canvasHeight, canvasWidth);
    }

    $(".genColours").on("click", function(){
        newColours();
    });

    var currentValue = $('#currentValue');
    $('#colourSlider').change(function(){
        currentValue.html(this.value);
        ammountOfColours = this.value;
        newColours();
    });
    $('#colourSlider').change();


    /**
     * Generate a random number between 2 numbers.
     * @param from
     * @param to
     */
    function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    /**
     * Floors a number with better performance the Math.Floor().
     * @param number
     */
    function bitwiseRound(number){
        return ~~(0.5 + number);
    }

    $(window).resize(draw);

    function startRender() {
        requestAnimationFrame(startRender);
        if(!paused) draw();
    }

    startRender();


});



