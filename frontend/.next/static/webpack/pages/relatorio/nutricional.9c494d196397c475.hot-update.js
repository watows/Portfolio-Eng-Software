"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/relatorio/nutricional",{

/***/ "./pages/relatorio/nutricional.jsx":
/*!*****************************************!*\
  !*** ./pages/relatorio/nutricional.jsx ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-chartjs-2 */ \"./node_modules/react-chartjs-2/dist/index.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _barrel_optimize_names_VscArrowCircleLeft_react_icons_vsc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=VscArrowCircleLeft!=!react-icons/vsc */ \"__barrel_optimize__?names=VscArrowCircleLeft!=!./node_modules/react-icons/vsc/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_AiOutlineCalendar_react_icons_ai__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=AiOutlineCalendar!=!react-icons/ai */ \"__barrel_optimize__?names=AiOutlineCalendar!=!./node_modules/react-icons/ai/index.mjs\");\n/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-datepicker */ \"./node_modules/react-datepicker/dist/react-datepicker.min.js\");\n/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-datepicker/dist/react-datepicker.css */ \"./node_modules/react-datepicker/dist/react-datepicker.css\");\n/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! chart.js */ \"./node_modules/chart.js/dist/chart.js\");\n/* harmony import */ var _components_autenticacao__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/autenticacao */ \"./components/autenticacao.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nchart_js__WEBPACK_IMPORTED_MODULE_5__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_5__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_5__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_5__.BarElement, chart_js__WEBPACK_IMPORTED_MODULE_5__.Title, chart_js__WEBPACK_IMPORTED_MODULE_5__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_5__.Legend);\nconst RelatorioNutricional = ()=>{\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const sodioChartRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null); // Referência para o gráfico de sódio\n    const [selectedDate, setSelectedDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isDatePickerOpen, setIsDatePickerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [dataSodio, setDataSodio] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [medias, setMedias] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const handleBackToMenu = ()=>{\n        router.push(\"/home\");\n    };\n    const toggleDatePicker = ()=>{\n        setIsDatePickerOpen(!isDatePickerOpen);\n    };\n    const handleDateChange = (date)=>{\n        setSelectedDate(date);\n    };\n    const consultarNutricional = async ()=>{\n        if (!selectedDate) return;\n        const month = selectedDate.getMonth() + 1;\n        const year = selectedDate.getFullYear();\n        try {\n            const response = await fetch(\"/api/relatorios/nutricional\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    month,\n                    year\n                })\n            });\n            if (response.ok) {\n                const data = await response.json();\n                console.log(\"Dados nutricionais recebidos:\", data);\n                setDataSodio(data.nutricionalDiario.map((d)=>d.sodio));\n                setMedias({\n                    sodio: parseFloat(data.mediaMensal.sodio).toFixed(2)\n                });\n            } else {\n                alert(\"Nenhum cardápio cadastrado para o mês/ano selecionado.\");\n            }\n        } catch (error) {\n            console.error(\"Erro ao consultar dados nutricionais:\", error);\n            alert(\"Erro ao consultar dados nutricionais.\");\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        consultarNutricional();\n    }, [\n        selectedDate\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Atualizar título do gráfico de sódio sempre que a média mudar\n        if (sodioChartRef.current) {\n            sodioChartRef.current.options.plugins.title.text = \"M\\xe9dia S\\xf3dio: \".concat(medias.sodio || \"0.00\");\n            sodioChartRef.current.update();\n        }\n    }, [\n        medias.sodio\n    ]);\n    const chartOptions = {\n        responsive: true,\n        plugins: {\n            legend: {\n                display: true,\n                position: \"top\"\n            },\n            title: {\n                display: true,\n                text: \"M\\xe9dia S\\xf3dio: \".concat(medias.sodio || \"0.00\")\n            }\n        },\n        scales: {\n            y: {\n                beginAtZero: true\n            },\n            x: {\n                display: false\n            }\n        }\n    };\n    const chartData = {\n        labels: Array.from({\n            length: dataSodio.length\n        }, (_, i)=>\"Dia \".concat(i + 1)),\n        datasets: [\n            {\n                label: \"Sódio (mg)\",\n                data: dataSodio,\n                backgroundColor: \"rgba(0, 100, 166, 0.6)\"\n            }\n        ]\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            padding: \"20px\",\n            fontFamily: \"Arial, sans-serif\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    marginBottom: \"20px\",\n                    display: \"flex\",\n                    alignItems: \"center\",\n                    gap: \"10px\"\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_VscArrowCircleLeft_react_icons_vsc__WEBPACK_IMPORTED_MODULE_6__.VscArrowCircleLeft, {\n                        style: {\n                            fontSize: \"40px\",\n                            cursor: \"pointer\"\n                        },\n                        onClick: handleBackToMenu\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\CLIENTE\\\\Documents\\\\GitHub\\\\Portfolio-Eng-Software\\\\frontend\\\\pages\\\\relatorio\\\\nutricional.jsx\",\n                        lineNumber: 105,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        children: \"Relat\\xf3rio Nutricional\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\CLIENTE\\\\Documents\\\\GitHub\\\\Portfolio-Eng-Software\\\\frontend\\\\pages\\\\relatorio\\\\nutricional.jsx\",\n                        lineNumber: 106,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\CLIENTE\\\\Documents\\\\GitHub\\\\Portfolio-Eng-Software\\\\frontend\\\\pages\\\\relatorio\\\\nutricional.jsx\",\n                lineNumber: 104,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AiOutlineCalendar_react_icons_ai__WEBPACK_IMPORTED_MODULE_7__.AiOutlineCalendar, {\n                        style: {\n                            fontSize: \"30px\",\n                            cursor: \"pointer\"\n                        },\n                        onClick: toggleDatePicker\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\CLIENTE\\\\Documents\\\\GitHub\\\\Portfolio-Eng-Software\\\\frontend\\\\pages\\\\relatorio\\\\nutricional.jsx\",\n                        lineNumber: 109,\n                        columnNumber: 9\n                    }, undefined),\n                    isDatePickerOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react_datepicker__WEBPACK_IMPORTED_MODULE_8___default()), {\n                        selected: selectedDate,\n                        onChange: handleDateChange,\n                        dateFormat: \"MM/yyyy\",\n                        showMonthYearPicker: true,\n                        inline: true\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\CLIENTE\\\\Documents\\\\GitHub\\\\Portfolio-Eng-Software\\\\frontend\\\\pages\\\\relatorio\\\\nutricional.jsx\",\n                        lineNumber: 111,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\CLIENTE\\\\Documents\\\\GitHub\\\\Portfolio-Eng-Software\\\\frontend\\\\pages\\\\relatorio\\\\nutricional.jsx\",\n                lineNumber: 108,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                children: [\n                    \"M\\xe9dia de S\\xf3dio: \",\n                    medias.sodio || \"0.00\"\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\CLIENTE\\\\Documents\\\\GitHub\\\\Portfolio-Eng-Software\\\\frontend\\\\pages\\\\relatorio\\\\nutricional.jsx\",\n                lineNumber: 120,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_chartjs_2__WEBPACK_IMPORTED_MODULE_9__.Bar, {\n                    ref: sodioChartRef,\n                    options: chartOptions,\n                    data: chartData\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\CLIENTE\\\\Documents\\\\GitHub\\\\Portfolio-Eng-Software\\\\frontend\\\\pages\\\\relatorio\\\\nutricional.jsx\",\n                    lineNumber: 123,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\CLIENTE\\\\Documents\\\\GitHub\\\\Portfolio-Eng-Software\\\\frontend\\\\pages\\\\relatorio\\\\nutricional.jsx\",\n                lineNumber: 121,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\CLIENTE\\\\Documents\\\\GitHub\\\\Portfolio-Eng-Software\\\\frontend\\\\pages\\\\relatorio\\\\nutricional.jsx\",\n        lineNumber: 103,\n        columnNumber: 5\n    }, undefined);\n};\n_s(RelatorioNutricional, \"PZkD4QgQvaNrhL0Hyc85A4SumcY=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = RelatorioNutricional;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_c1 = (0,_components_autenticacao__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(RelatorioNutricional));\nvar _c, _c1;\n$RefreshReg$(_c, \"RelatorioNutricional\");\n$RefreshReg$(_c1, \"%default%\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9yZWxhdG9yaW8vbnV0cmljaW9uYWwuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEyRDtBQUNyQjtBQUNFO0FBQ2E7QUFDRjtBQUNUO0FBQ1U7QUFDd0Q7QUFDdkQ7QUFFckRVLDJDQUFPQSxDQUFDUSxRQUFRLENBQUNQLG1EQUFhQSxFQUFFQyxpREFBV0EsRUFBRUMsZ0RBQVVBLEVBQUVDLDJDQUFLQSxFQUFFQyw2Q0FBT0EsRUFBRUMsNENBQU1BO0FBRS9FLE1BQU1HLHVCQUF1Qjs7SUFDM0IsTUFBTUMsU0FBU2Ysc0RBQVNBO0lBQ3hCLE1BQU1nQixnQkFBZ0JsQiw2Q0FBTUEsQ0FBQyxPQUFPLHFDQUFxQztJQUN6RSxNQUFNLENBQUNtQixjQUFjQyxnQkFBZ0IsR0FBR3RCLCtDQUFRQSxDQUFDO0lBQ2pELE1BQU0sQ0FBQ3VCLGtCQUFrQkMsb0JBQW9CLEdBQUd4QiwrQ0FBUUEsQ0FBQztJQUN6RCxNQUFNLENBQUN5QixXQUFXQyxhQUFhLEdBQUcxQiwrQ0FBUUEsQ0FBQyxFQUFFO0lBQzdDLE1BQU0sQ0FBQzJCLFFBQVFDLFVBQVUsR0FBRzVCLCtDQUFRQSxDQUFDLENBQUM7SUFFdEMsTUFBTTZCLG1CQUFtQjtRQUN2QlYsT0FBT1csSUFBSSxDQUFDO0lBQ2Q7SUFFQSxNQUFNQyxtQkFBbUI7UUFDdkJQLG9CQUFvQixDQUFDRDtJQUN2QjtJQUVBLE1BQU1TLG1CQUFtQixDQUFDQztRQUN4QlgsZ0JBQWdCVztJQUNsQjtJQUVBLE1BQU1DLHVCQUF1QjtRQUMzQixJQUFJLENBQUNiLGNBQWM7UUFDbkIsTUFBTWMsUUFBUWQsYUFBYWUsUUFBUSxLQUFLO1FBQ3hDLE1BQU1DLE9BQU9oQixhQUFhaUIsV0FBVztRQUVyQyxJQUFJO1lBQ0YsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLCtCQUErQjtnQkFDMURDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQUUsZ0JBQWdCO2dCQUFtQjtnQkFDOUNDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztvQkFBRVY7b0JBQU9FO2dCQUFLO1lBQ3JDO1lBRUEsSUFBSUUsU0FBU08sRUFBRSxFQUFFO2dCQUNmLE1BQU1DLE9BQU8sTUFBTVIsU0FBU1MsSUFBSTtnQkFFaENDLFFBQVFDLEdBQUcsQ0FBQyxpQ0FBaUNIO2dCQUU3Q3JCLGFBQWFxQixLQUFLSSxpQkFBaUIsQ0FBQ0MsR0FBRyxDQUFDLENBQUNDLElBQU1BLEVBQUVDLEtBQUs7Z0JBRXREMUIsVUFBVTtvQkFDUjBCLE9BQU9DLFdBQVdSLEtBQUtTLFdBQVcsQ0FBQ0YsS0FBSyxFQUFFRyxPQUFPLENBQUM7Z0JBQ3BEO1lBQ0YsT0FBTztnQkFDTEMsTUFBTTtZQUNSO1FBQ0YsRUFBRSxPQUFPQyxPQUFPO1lBQ2RWLFFBQVFVLEtBQUssQ0FBQyx5Q0FBeUNBO1lBQ3ZERCxNQUFNO1FBQ1I7SUFDRjtJQUVBekQsZ0RBQVNBLENBQUM7UUFDUmlDO0lBQ0YsR0FBRztRQUFDYjtLQUFhO0lBRWpCcEIsZ0RBQVNBLENBQUM7UUFDUixnRUFBZ0U7UUFDaEUsSUFBSW1CLGNBQWN3QyxPQUFPLEVBQUU7WUFDekJ4QyxjQUFjd0MsT0FBTyxDQUFDQyxPQUFPLENBQUNDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDQyxJQUFJLEdBQUcsc0JBQXVDLE9BQXZCckMsT0FBTzJCLEtBQUssSUFBSTtZQUNuRmxDLGNBQWN3QyxPQUFPLENBQUNLLE1BQU07UUFDOUI7SUFDRixHQUFHO1FBQUN0QyxPQUFPMkIsS0FBSztLQUFDO0lBRWpCLE1BQU1ZLGVBQWU7UUFDbkJDLFlBQVk7UUFDWkwsU0FBUztZQUNQTSxRQUFRO2dCQUFFQyxTQUFTO2dCQUFNQyxVQUFVO1lBQU07WUFDekNQLE9BQU87Z0JBQ0xNLFNBQVM7Z0JBQ1RMLE1BQU0sc0JBQXVDLE9BQXZCckMsT0FBTzJCLEtBQUssSUFBSTtZQUN4QztRQUNGO1FBQ0FpQixRQUFRO1lBQ05DLEdBQUc7Z0JBQUVDLGFBQWE7WUFBSztZQUN2QkMsR0FBRztnQkFBRUwsU0FBUztZQUFNO1FBQ3RCO0lBQ0Y7SUFFQSxNQUFNTSxZQUFZO1FBQ2hCQyxRQUFRQyxNQUFNQyxJQUFJLENBQUM7WUFBRUMsUUFBUXRELFVBQVVzRCxNQUFNO1FBQUMsR0FBRyxDQUFDQyxHQUFHQyxJQUFNLE9BQWEsT0FBTkEsSUFBSTtRQUN0RUMsVUFBVTtZQUNSO2dCQUNFQyxPQUFPO2dCQUNQcEMsTUFBTXRCO2dCQUNOMkQsaUJBQWlCO1lBQ25CO1NBQ0Q7SUFDSDtJQUVBLHFCQUNFLDhEQUFDQztRQUFJQyxPQUFPO1lBQUVDLFNBQVM7WUFBUUMsWUFBWTtRQUFvQjs7MEJBQzdELDhEQUFDSDtnQkFBSUMsT0FBTztvQkFBRUcsY0FBYztvQkFBUXBCLFNBQVM7b0JBQVFxQixZQUFZO29CQUFVQyxLQUFLO2dCQUFPOztrQ0FDckYsOERBQUN0Rix5R0FBa0JBO3dCQUFDaUYsT0FBTzs0QkFBRU0sVUFBVTs0QkFBUUMsUUFBUTt3QkFBVTt3QkFBR0MsU0FBU2pFOzs7Ozs7a0NBQzdFLDhEQUFDa0U7a0NBQUc7Ozs7Ozs7Ozs7OzswQkFFTiw4REFBQ1Y7O2tDQUNDLDhEQUFDL0Usc0dBQWlCQTt3QkFBQ2dGLE9BQU87NEJBQUVNLFVBQVU7NEJBQVFDLFFBQVE7d0JBQVU7d0JBQUdDLFNBQVMvRDs7Ozs7O29CQUMzRVIsa0NBQ0MsOERBQUNoQix5REFBVUE7d0JBQ1R5RixVQUFVM0U7d0JBQ1Y0RSxVQUFVakU7d0JBQ1ZrRSxZQUFXO3dCQUNYQyxtQkFBbUI7d0JBQ25CQyxNQUFNOzs7Ozs7Ozs7Ozs7MEJBSVosOERBQUNDOztvQkFBRztvQkFBaUIxRSxPQUFPMkIsS0FBSyxJQUFJOzs7Ozs7OzBCQUNyQyw4REFBQytCOzBCQUVDLDRFQUFDbEYsZ0RBQUdBO29CQUFDbUcsS0FBS2xGO29CQUFleUMsU0FBU0s7b0JBQWNuQixNQUFNNEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSTlEO0dBbEhNekQ7O1FBQ1dkLGtEQUFTQTs7O0tBRHBCYztBQW9ITixpRUFBZSxNQUFBRixvRUFBUUEsQ0FBQ0UscUJBQXFCQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvcmVsYXRvcmlvL251dHJpY2lvbmFsLmpzeD9iYjU0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQmFyIH0gZnJvbSBcInJlYWN0LWNoYXJ0anMtMlwiO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgVnNjQXJyb3dDaXJjbGVMZWZ0IH0gZnJvbSBcInJlYWN0LWljb25zL3ZzY1wiO1xyXG5pbXBvcnQgeyBBaU91dGxpbmVDYWxlbmRhciB9IGZyb20gXCJyZWFjdC1pY29ucy9haVwiO1xyXG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tIFwicmVhY3QtZGF0ZXBpY2tlclwiO1xyXG5pbXBvcnQgXCJyZWFjdC1kYXRlcGlja2VyL2Rpc3QvcmVhY3QtZGF0ZXBpY2tlci5jc3NcIjtcclxuaW1wb3J0IHsgQ2hhcnQgYXMgQ2hhcnRKUywgQ2F0ZWdvcnlTY2FsZSwgTGluZWFyU2NhbGUsIEJhckVsZW1lbnQsIFRpdGxlLCBUb29sdGlwLCBMZWdlbmQgfSBmcm9tIFwiY2hhcnQuanNcIjtcclxuaW1wb3J0IHdpdGhBdXRoIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2F1dGVudGljYWNhb1wiO1xyXG5cclxuQ2hhcnRKUy5yZWdpc3RlcihDYXRlZ29yeVNjYWxlLCBMaW5lYXJTY2FsZSwgQmFyRWxlbWVudCwgVGl0bGUsIFRvb2x0aXAsIExlZ2VuZCk7XHJcblxyXG5jb25zdCBSZWxhdG9yaW9OdXRyaWNpb25hbCA9ICgpID0+IHtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCBzb2Rpb0NoYXJ0UmVmID0gdXNlUmVmKG51bGwpOyAvLyBSZWZlcsOqbmNpYSBwYXJhIG8gZ3LDoWZpY28gZGUgc8OzZGlvXHJcbiAgY29uc3QgW3NlbGVjdGVkRGF0ZSwgc2V0U2VsZWN0ZWREYXRlXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtpc0RhdGVQaWNrZXJPcGVuLCBzZXRJc0RhdGVQaWNrZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZGF0YVNvZGlvLCBzZXREYXRhU29kaW9dID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFttZWRpYXMsIHNldE1lZGlhc10gPSB1c2VTdGF0ZSh7fSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUJhY2tUb01lbnUgPSAoKSA9PiB7XHJcbiAgICByb3V0ZXIucHVzaChcIi9ob21lXCIpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHRvZ2dsZURhdGVQaWNrZXIgPSAoKSA9PiB7XHJcbiAgICBzZXRJc0RhdGVQaWNrZXJPcGVuKCFpc0RhdGVQaWNrZXJPcGVuKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVEYXRlQ2hhbmdlID0gKGRhdGUpID0+IHtcclxuICAgIHNldFNlbGVjdGVkRGF0ZShkYXRlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjb25zdWx0YXJOdXRyaWNpb25hbCA9IGFzeW5jICgpID0+IHtcclxuICAgIGlmICghc2VsZWN0ZWREYXRlKSByZXR1cm47XHJcbiAgICBjb25zdCBtb250aCA9IHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgIGNvbnN0IHllYXIgPSBzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9yZWxhdG9yaW9zL251dHJpY2lvbmFsXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1vbnRoLCB5ZWFyIH0pLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGFkb3MgbnV0cmljaW9uYWlzIHJlY2ViaWRvczpcIiwgZGF0YSk7XHJcblxyXG4gICAgICAgIHNldERhdGFTb2RpbyhkYXRhLm51dHJpY2lvbmFsRGlhcmlvLm1hcCgoZCkgPT4gZC5zb2RpbykpO1xyXG5cclxuICAgICAgICBzZXRNZWRpYXMoe1xyXG4gICAgICAgICAgc29kaW86IHBhcnNlRmxvYXQoZGF0YS5tZWRpYU1lbnNhbC5zb2RpbykudG9GaXhlZCgyKSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcIk5lbmh1bSBjYXJkw6FwaW8gY2FkYXN0cmFkbyBwYXJhIG8gbcOqcy9hbm8gc2VsZWNpb25hZG8uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJybyBhbyBjb25zdWx0YXIgZGFkb3MgbnV0cmljaW9uYWlzOlwiLCBlcnJvcik7XHJcbiAgICAgIGFsZXJ0KFwiRXJybyBhbyBjb25zdWx0YXIgZGFkb3MgbnV0cmljaW9uYWlzLlwiKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3VsdGFyTnV0cmljaW9uYWwoKTtcclxuICB9LCBbc2VsZWN0ZWREYXRlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAvLyBBdHVhbGl6YXIgdMOtdHVsbyBkbyBncsOhZmljbyBkZSBzw7NkaW8gc2VtcHJlIHF1ZSBhIG3DqWRpYSBtdWRhclxyXG4gICAgaWYgKHNvZGlvQ2hhcnRSZWYuY3VycmVudCkge1xyXG4gICAgICBzb2Rpb0NoYXJ0UmVmLmN1cnJlbnQub3B0aW9ucy5wbHVnaW5zLnRpdGxlLnRleHQgPSBgTcOpZGlhIFPDs2RpbzogJHttZWRpYXMuc29kaW8gfHwgXCIwLjAwXCJ9YDtcclxuICAgICAgc29kaW9DaGFydFJlZi5jdXJyZW50LnVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gIH0sIFttZWRpYXMuc29kaW9dKTtcclxuXHJcbiAgY29uc3QgY2hhcnRPcHRpb25zID0ge1xyXG4gICAgcmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgIHBsdWdpbnM6IHtcclxuICAgICAgbGVnZW5kOiB7IGRpc3BsYXk6IHRydWUsIHBvc2l0aW9uOiBcInRvcFwiIH0sXHJcbiAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICB0ZXh0OiBgTcOpZGlhIFPDs2RpbzogJHttZWRpYXMuc29kaW8gfHwgXCIwLjAwXCJ9YCwgLy8gQ29uZmlndXJhw6fDo28gaW5pY2lhbCBkbyB0w610dWxvXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2NhbGVzOiB7XHJcbiAgICAgIHk6IHsgYmVnaW5BdFplcm86IHRydWUgfSxcclxuICAgICAgeDogeyBkaXNwbGF5OiBmYWxzZSB9LFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICBjb25zdCBjaGFydERhdGEgPSB7XHJcbiAgICBsYWJlbHM6IEFycmF5LmZyb20oeyBsZW5ndGg6IGRhdGFTb2Rpby5sZW5ndGggfSwgKF8sIGkpID0+IGBEaWEgJHtpICsgMX1gKSxcclxuICAgIGRhdGFzZXRzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBsYWJlbDogXCJTw7NkaW8gKG1nKVwiLFxyXG4gICAgICAgIGRhdGE6IGRhdGFTb2RpbyxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLCAxMDAsIDE2NiwgMC42KVwiLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiBcIjIwcHhcIiwgZm9udEZhbWlseTogXCJBcmlhbCwgc2Fucy1zZXJpZlwiIH19PlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogXCIyMHB4XCIsIGRpc3BsYXk6IFwiZmxleFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBnYXA6IFwiMTBweFwiIH19PlxyXG4gICAgICAgIDxWc2NBcnJvd0NpcmNsZUxlZnQgc3R5bGU9e3sgZm9udFNpemU6IFwiNDBweFwiLCBjdXJzb3I6IFwicG9pbnRlclwiIH19IG9uQ2xpY2s9e2hhbmRsZUJhY2tUb01lbnV9IC8+XHJcbiAgICAgICAgPGgxPlJlbGF0w7NyaW8gTnV0cmljaW9uYWw8L2gxPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8QWlPdXRsaW5lQ2FsZW5kYXIgc3R5bGU9e3sgZm9udFNpemU6IFwiMzBweFwiLCBjdXJzb3I6IFwicG9pbnRlclwiIH19IG9uQ2xpY2s9e3RvZ2dsZURhdGVQaWNrZXJ9IC8+XHJcbiAgICAgICAge2lzRGF0ZVBpY2tlck9wZW4gJiYgKFxyXG4gICAgICAgICAgPERhdGVQaWNrZXJcclxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkRGF0ZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZURhdGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ9XCJNTS95eXl5XCJcclxuICAgICAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlclxyXG4gICAgICAgICAgICBpbmxpbmVcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxoMz5Nw6lkaWEgZGUgU8OzZGlvOiB7bWVkaWFzLnNvZGlvIHx8IFwiMC4wMFwifTwvaDM+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgey8qIFZpbmN1bGFuZG8gbyBncsOhZmljbyDDoCByZWZlcsOqbmNpYSAqL31cclxuICAgICAgICA8QmFyIHJlZj17c29kaW9DaGFydFJlZn0gb3B0aW9ucz17Y2hhcnRPcHRpb25zfSBkYXRhPXtjaGFydERhdGF9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhBdXRoKFJlbGF0b3Jpb051dHJpY2lvbmFsKTsiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIkJhciIsInVzZVJvdXRlciIsIlZzY0Fycm93Q2lyY2xlTGVmdCIsIkFpT3V0bGluZUNhbGVuZGFyIiwiRGF0ZVBpY2tlciIsIkNoYXJ0IiwiQ2hhcnRKUyIsIkNhdGVnb3J5U2NhbGUiLCJMaW5lYXJTY2FsZSIsIkJhckVsZW1lbnQiLCJUaXRsZSIsIlRvb2x0aXAiLCJMZWdlbmQiLCJ3aXRoQXV0aCIsInJlZ2lzdGVyIiwiUmVsYXRvcmlvTnV0cmljaW9uYWwiLCJyb3V0ZXIiLCJzb2Rpb0NoYXJ0UmVmIiwic2VsZWN0ZWREYXRlIiwic2V0U2VsZWN0ZWREYXRlIiwiaXNEYXRlUGlja2VyT3BlbiIsInNldElzRGF0ZVBpY2tlck9wZW4iLCJkYXRhU29kaW8iLCJzZXREYXRhU29kaW8iLCJtZWRpYXMiLCJzZXRNZWRpYXMiLCJoYW5kbGVCYWNrVG9NZW51IiwicHVzaCIsInRvZ2dsZURhdGVQaWNrZXIiLCJoYW5kbGVEYXRlQ2hhbmdlIiwiZGF0ZSIsImNvbnN1bHRhck51dHJpY2lvbmFsIiwibW9udGgiLCJnZXRNb250aCIsInllYXIiLCJnZXRGdWxsWWVhciIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvayIsImRhdGEiLCJqc29uIiwiY29uc29sZSIsImxvZyIsIm51dHJpY2lvbmFsRGlhcmlvIiwibWFwIiwiZCIsInNvZGlvIiwicGFyc2VGbG9hdCIsIm1lZGlhTWVuc2FsIiwidG9GaXhlZCIsImFsZXJ0IiwiZXJyb3IiLCJjdXJyZW50Iiwib3B0aW9ucyIsInBsdWdpbnMiLCJ0aXRsZSIsInRleHQiLCJ1cGRhdGUiLCJjaGFydE9wdGlvbnMiLCJyZXNwb25zaXZlIiwibGVnZW5kIiwiZGlzcGxheSIsInBvc2l0aW9uIiwic2NhbGVzIiwieSIsImJlZ2luQXRaZXJvIiwieCIsImNoYXJ0RGF0YSIsImxhYmVscyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJpIiwiZGF0YXNldHMiLCJsYWJlbCIsImJhY2tncm91bmRDb2xvciIsImRpdiIsInN0eWxlIiwicGFkZGluZyIsImZvbnRGYW1pbHkiLCJtYXJnaW5Cb3R0b20iLCJhbGlnbkl0ZW1zIiwiZ2FwIiwiZm9udFNpemUiLCJjdXJzb3IiLCJvbkNsaWNrIiwiaDEiLCJzZWxlY3RlZCIsIm9uQ2hhbmdlIiwiZGF0ZUZvcm1hdCIsInNob3dNb250aFllYXJQaWNrZXIiLCJpbmxpbmUiLCJoMyIsInJlZiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/relatorio/nutricional.jsx\n"));

/***/ })

});