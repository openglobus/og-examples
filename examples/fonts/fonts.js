'use strict';

import {
    Handler,
    Renderer,
    RenderNode,
    EntityCollection,
    Entity,
    Extent,
    LonLat,
    GlobusTerrain,
    scene,
    control,
    Vec3
} from "../../external/og/lib/@openglobus/og.esm.js";

let handler = new Handler("frame", {
    'autoActivate': true
});

let renderer = new Renderer(handler, {
    backgroundColor: new Vec3(0.5, 0.5, 0.5),
    controls: [new control.SimpleNavigation()],
    autoActivate: true,
    fontsSrc: "./fonts"
});

class MyScene extends RenderNode {
    constructor() {
        super("MyScene");

        let size = Number(document.querySelector("#fontSize").value);

        document.querySelector("#valSize").innerText = size;

        this.ec = new EntityCollection({
            'labelMaxLetters': 33,
            'entities': [
                new Entity({
                    'cartesian': new Vec3(0, 0, 0),
                    'label': {
                        'isRTL': true,
                        'text': "סיודד ריאל",
                        'color': "white",
                        //'face': "NotoSansArabic-Regular",
                        //'face': "Arabic",
                        'face': "Segoe",
                        //align: "center",
                        'outlineColor': "black",
                        'size': size
                    }
                }), new Entity({
                    'cartesian': new Vec3(0, 20, 0),
                    'label': {
                        'text': "0.5 - VastShadow-Regular",
                        'color': "white",
                        'face': "VastShadow-Regular",
                        'outlineColor': "black",
                        //align: "center",
                        'size': size
                    }
                }),
                new Entity({
                    'cartesian': new Vec3(0, 40, 0),
                    'label': {
                        'isRTL': true,
                        'text': "قطة",
                        'color': "white",
                        'face': "NotoSansArabic-Regular",
                        'outlineColor': "black",
                        'size': size
                    }
                }),
                new Entity({
                    'cartesian': new Vec3(5, 40, 0),
                    'label': {
                        'text': "0.9 - Notable-Regular",
                        'color': "white",
                        'face': "Notable-Regular",
                        'outlineColor': "black",
                        'size': size
                    }
                }), new Entity({
                    'cartesian': new Vec3(5, 50, 0),
                    'label': {
                        'text': "1.0 - MrDeHaviland-Regular",
                        'color': "white",
                        'face': "MrDeHaviland-Regular",
                        'outlineColor': "black",
                        'size': size
                    }
                })
                , new Entity({
                    'cartesian': new Vec3(5, 60, 0),
                    'label': {
                        'text': "Audiowide-Regular",
                        'color': "white",
                        'face': "Audiowide-Regular",
                        'outlineColor': "white",
                        'size': size
                    }
                }), new Entity({
                    'cartesian': new Vec3(5, 70, 0),
                    'label': {
                        'text': "ArchitectsDaughter-Regular",
                        'color': "white",
                        'face': "ArchitectsDaughter-Regular",
                        'outlineColor': "black",
                        'size': size
                    }
                }),
            ]
        });
    }

    init() {

        document.querySelector("#fontSize").addEventListener("input", (e) => {
            let entities = this.ec.getEntities();
            for (let i = 0; i < entities.length; i++) {
                entities[i].label.setSize(Number(e.target.value));
            }
            document.querySelector("#valSize").innerText = e.target.value;
        });

        document.querySelector("#fontOutline").addEventListener("input", (e) => {
            let entities = this.ec.getEntities();
            for (let i = 0; i < entities.length; i++) {
                entities[i].label.setOutline(Number(e.target.value));
            }
            document.querySelector("#valOutline").innerText = e.target.value;
        });

        document.querySelector("#text").addEventListener("input", (e) => {
            let entities = this.ec.getEntities();
            for (let i = 0; i < entities.length; i++) {
                entities[i].label.setText(e.target.value);
            }
        });

        document.querySelector("#labelOpacity").addEventListener("input", (e) => {
            let entities = this.ec.getEntities();
            for (let i = 0; i < entities.length; i++) {
                entities[i].label.setOpacity(Number(e.target.value));
            }
            document.querySelector("#valLabelOpacity").innerText = e.target.value;
        });

        document.querySelector("#outlineOpacity").addEventListener("input", (e) => {
            let entities = this.ec.getEntities();
            for (let i = 0; i < entities.length; i++) {
                entities[i].label.setOutlineOpacity(Number(e.target.value));
            }
            document.querySelector("#valOutlineOpacity").innerText = e.target.value;
        });

        document.querySelector("#text").addEventListener("focus", () => {
            this.renderer.controls.SimpleNav.deactivate();
        });

        document.querySelector("#text").addEventListener("blur", () => {
            this.renderer.controls.SimpleNav.activate();
        });

        // this.renderer.fontAtlas.loadFont("PressStart2P-Regular", "./fonts/", "PressStart2P-Regular.json");
        // this.renderer.fontAtlas.loadFont("VastShadow-Regular", "./fonts/", "VastShadow-Regular.json");
        // this.renderer.fontAtlas.loadFont("Sacramento-Regular", "./fonts/", "Sacramento-Regular.json");
        // this.renderer.fontAtlas.loadFont("Notable-Regular", "./fonts/", "Notable-Regular.json");
        // this.renderer.fontAtlas.loadFont("MrDeHaviland-Regular", "./fonts/", "MrDeHaviland-Regular.json");
        // this.renderer.fontAtlas.loadFont("Audiowide-Regular", "./fonts/", "Audiowide-Regular.json");
        // this.renderer.fontAtlas.loadFont("ArchitectsDaughter-Regular", "./fonts/", "ArchitectsDaughter-Regular.json");
        // this.renderer.fontAtlas.loadFont("NotoSansArabic-Regular", "./fonts/", "NotoSansArabic-Regular.json");
        // this.renderer.fontAtlas.loadFont("Segoe", "./fonts/", "segoeui.json");

        this.ec.addTo(this);

        this.renderer.activeCamera.eye.set(57, 36, 120);
        this.renderer.activeCamera.update();
    }

    frame() {
    }
}

let myScene = new MyScene();

renderer.addNodes([new scene.Axes(), myScene]);

window.Vec3 = Vec3;
window.renderer = renderer;
