export{loadAssets};

/**
 * Fichier fourni par l'enseignant
 */

const urlsOfTheAssets = {
    puissanceQuatre: { url: "../assets/puissance4.png"},
    motsCroises: { url:"../assets/motsCroises.png"},
    jetonOrange: { url:"../assets/P4_jaune.png"},
    jetonRouge: { url:"../assets/P4_rouge.png"}

};
function loadAssets(callback){
    loadAssetsUsingFunction(urlsOfTheAssets, callback);
}
function isImage(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function isAudio(url) {
    return url.match(/\.(mp3|ogg|wav)$/) != null;
}
function loadAssetsUsingFunction(assetsToLoad, callback){
    var assetsLoaded = {};
    var loadedAssets = 0;
    var numberOfAssetsToLoad = 0;

    // define ifLoad function
    var ifLoad = function () {
        if (++loadedAssets >= numberOfAssetsToLoad) {
            callback(assetsLoaded);
        }
        console.log("Loaded asset " + loadedAssets);
    };

    // get num of assets to load
    for (var name in assetsToLoad) {
        numberOfAssetsToLoad++;
    }

    console.log("Nb assets to load: " + numberOfAssetsToLoad);

    for (name in assetsToLoad) {
        var url = assetsToLoad[name].url;
        console.log("Loading " + url);
        if (isImage(url)) {
            assetsLoaded[name] = new Image();

            assetsLoaded[name].onload = ifLoad;
            // will start async loading.
            assetsLoaded[name].src = url;
        } else {
            // We assume the asset is an audio file
            console.log(
                "loading " + name + " buffer : " + assetsToLoad[name].loop
            );
            assetsLoaded[name] = new Howl({
                urls: [url],
                buffer: assetsToLoad[name].buffer,
                loop: assetsToLoad[name].loop,
                autoplay: false,
                volume: assetsToLoad[name].volume,
                onload: function () {
                    if (++loadedAssets >= numberOfAssetsToLoad) {
                        callback(assetsLoaded);
                    }
                    console.log("Loaded asset " + loadedAssets);
                },
            }); // End of howler.js callback
        } // if
    }
}