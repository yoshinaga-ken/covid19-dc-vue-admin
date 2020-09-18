(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-7a968e41"],{

/***/ "371d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"42f2c550-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/form/index.vue?vue&type=template&id=32c0383a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-container"},[_c('el-form',{ref:"form",attrs:{"model":_vm.form,"label-width":"120px"}},[_c('el-form-item',{attrs:{"label":"Activity name"}},[_c('el-input',{model:{value:(_vm.form.name),callback:function ($$v) {_vm.$set(_vm.form, "name", $$v)},expression:"form.name"}})],1),_c('el-form-item',{attrs:{"label":"Activity zone"}},[_c('el-select',{attrs:{"placeholder":"please select your zone"},model:{value:(_vm.form.region),callback:function ($$v) {_vm.$set(_vm.form, "region", $$v)},expression:"form.region"}},[_c('el-option',{attrs:{"label":"Zone one","value":"shanghai"}}),_c('el-option',{attrs:{"label":"Zone two","value":"beijing"}})],1)],1),_c('el-form-item',{attrs:{"label":"Activity time"}},[_c('el-col',{attrs:{"span":11}},[_c('el-date-picker',{staticStyle:{"width":"100%"},attrs:{"type":"date","placeholder":"Pick a date"},model:{value:(_vm.form.date1),callback:function ($$v) {_vm.$set(_vm.form, "date1", $$v)},expression:"form.date1"}})],1),_c('el-col',{staticClass:"line",attrs:{"span":2}},[_vm._v("-")]),_c('el-col',{attrs:{"span":11}},[_c('el-time-picker',{staticStyle:{"width":"100%"},attrs:{"type":"fixed-time","placeholder":"Pick a time"},model:{value:(_vm.form.date2),callback:function ($$v) {_vm.$set(_vm.form, "date2", $$v)},expression:"form.date2"}})],1)],1),_c('el-form-item',{attrs:{"label":"Instant delivery"}},[_c('el-switch',{model:{value:(_vm.form.delivery),callback:function ($$v) {_vm.$set(_vm.form, "delivery", $$v)},expression:"form.delivery"}})],1),_c('el-form-item',{attrs:{"label":"Activity type"}},[_c('el-checkbox-group',{model:{value:(_vm.form.type),callback:function ($$v) {_vm.$set(_vm.form, "type", $$v)},expression:"form.type"}},[_c('el-checkbox',{attrs:{"label":"Online activities","name":"type"}}),_c('el-checkbox',{attrs:{"label":"Promotion activities","name":"type"}}),_c('el-checkbox',{attrs:{"label":"Offline activities","name":"type"}}),_c('el-checkbox',{attrs:{"label":"Simple brand exposure","name":"type"}})],1)],1),_c('el-form-item',{attrs:{"label":"Resources"}},[_c('el-radio-group',{model:{value:(_vm.form.resource),callback:function ($$v) {_vm.$set(_vm.form, "resource", $$v)},expression:"form.resource"}},[_c('el-radio',{attrs:{"label":"Sponsor"}}),_c('el-radio',{attrs:{"label":"Venue"}})],1)],1),_c('el-form-item',{attrs:{"label":"Activity form"}},[_c('el-input',{attrs:{"type":"textarea"},model:{value:(_vm.form.desc),callback:function ($$v) {_vm.$set(_vm.form, "desc", $$v)},expression:"form.desc"}})],1),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.onSubmit}},[_vm._v("Create")]),_c('el-button',{on:{"click":_vm.onCancel}},[_vm._v("Cancel")])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/form/index.vue?vue&type=template&id=32c0383a&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/form/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var formvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    };
  },
  methods: {
    onSubmit: function onSubmit() {
      this.$message('submit!');
    },
    onCancel: function onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/form/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_formvue_type_script_lang_js_ = (formvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/form/index.vue?vue&type=style&index=0&id=32c0383a&scoped=true&lang=css&
var formvue_type_style_index_0_id_32c0383a_scoped_true_lang_css_ = __webpack_require__("7275");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/form/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_formvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "32c0383a",
  null
  
)

/* harmony default export */ var views_form = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "7275":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_32c0383a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("da52");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_32c0383a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_32c0383a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_32c0383a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "da52":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=chunk-7a968e41.98b638cc.js.map