function main() {
    var osm = new og.layer.XYZ("OpenStreetMap", {
        isBaseLayer: true,
        url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        visibility: true,
        attribution: 'Data @ OpenStreetMap contributors, ODbL'
    });

    //ellipsoid with earth dimensions
    let ellipsoid = og.wgs84;

    //coordinates of Bochum in lonlat
    let lonlatBochum = new og.LonLat(7, 51.5, 0);
    //coordinate above Bochum to allow a upwards direction of ray
    let lonlatBochumAir = new og.LonLat(7, 51.5, 2000000);
    //coordinates of Bochum in Cartesian
    let cartBochum = ellipsoid.lonLatToCartesian(lonlatBochum);
    let cartBochumAir = ellipsoid.lonLatToCartesian(lonlatBochumAir);
    //entity containing the Bochum ray
    let entityBochum = new og.Entity({
        'ray': {
            'startPosition': cartBochum,
            'endPosition': cartBochumAir,
            'startColor': "blue",
            'endColor': "green",
            'thickness': 5
        }
    });

    //coordinates of Moscow in lonlat
    let lonlatMoscow = new og.LonLat(37.6, 55.75, 0);
    //coordinate above Moscow to allow a upwards direction of ray
    let lonlatMoscowAir = new og.LonLat(37.6, 55.75, 1000000);
    //coordinates of Moscow in Cartesian
    let cartMoscow = ellipsoid.lonLatToCartesian(lonlatMoscow);
    let cartMoscowAir = ellipsoid.lonLatToCartesian(lonlatMoscowAir);
    //entity containing the Moscow ray
    let entityMoscow = new og.Entity({
        'ray': {
            'startPosition': cartMoscow,
            'endPosition': cartMoscowAir,
            'startColor': "red",
            'endColor': "green",
            'thickness': 10
        }
    });

    //polygonOffsetUnits is needed to hide rays behind globe
    let rayLayer = new og.layer.Vector("rays", { 'polygonOffsetUnits': 0 });

    //add entities containing the rays to the layer
    rayLayer.add(entityBochum);
    rayLayer.add(entityMoscow);

    var globus = new og.Globe({
        "target": "globus",
        "name": "Earth",
        "terrain": new og.terrain.GlobusTerrain(),
        "layers": [osm, rayLayer],
        "sun": {
            "active": true
        }
    });

    function createRay(startPos, endPos, length, startColor, endColor, thickness) {

        let e = new og.Entity({
            'ray': {
                'startPosition': startPos,
                'endPosition': endPos,
                'length': length,
                'startColor': "red",
                'endColor': "green",
                'thickness': 10
            }
        });
        return e;
    };

    window.globus = globus;
};