self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "rootMainFilesTree": {},
  "pages": {
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/home": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/home.js"
    ],
    "/receita/buscar": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/receita/buscar.js"
    ],
    "/receita/editar": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/receita/editar.js"
    ],
    "/receita/incluir": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/receita/incluir.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];