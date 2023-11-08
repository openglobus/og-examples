import {CanvasTiles, Extent, LonLat} from "@openglobus/og";
import globus from "./globus.ts";


const tg = new CanvasTiles("Tile grid", {
    visibility: true,
    isBaseLayer: false,
    drawTile: function (material, applyCanvas) {

        // This is important create canvas here!
        let cnv = document.createElement("canvas");
        let ctx = cnv.getContext("2d");
        cnv.width = 256;
        cnv.height = 256;

        //Clear canvas
        ctx.clearRect(0, 0, cnv.width, cnv.height);

        //Draw border
        ctx.beginPath();
        ctx.rect(0, 0, cnv.width, cnv.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        let size;

        if (material.segment.isPole) {
            let ext = material.segment.getExtentLonLat();

            ctx.fillStyle = 'black';
            ctx.font = 'normal ' + 29 + 'px Verdana';

            ctx.textAlign = 'center';
            ctx.fillText(`${ext.northEast.lon.toFixed(3)} ${ext.northEast.lat.toFixed(3)}`, cnv.width / 2, cnv.height / 2 + 20);
            ctx.fillText(`${ext.southWest.lon.toFixed(3)} ${ext.southWest.lat.toFixed(3)}`, cnv.width / 2, cnv.height / 2 - 20);
        } else {
            //Draw text
            if (material.segment.tileZoom > 14) {
                size = "26";
            } else {
                size = "32";
            }
            ctx.fillStyle = 'black';
            ctx.font = 'normal ' + size + 'px Verdana';
            ctx.textAlign = 'center';
            ctx.fillText(material.segment.tileX + "," + material.segment.tileY + "," + material.segment.tileZoom, cnv.width / 2, cnv.height / 2);
        }

        //Draw canvas tile
        applyCanvas(cnv);
    }
});

globus.planet.addLayer(tg)