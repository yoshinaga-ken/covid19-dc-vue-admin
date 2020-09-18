(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0e4b0c"],{

/***/ "90fe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"42f2c550-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/table/index.vue?vue&type=template&id=0f8b7689&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-container"},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.listLoading),expression:"listLoading"}],attrs:{"data":_vm.list,"element-loading-text":"Loading","border":"","fit":"","highlight-current-row":""}},[_c('el-table-column',{attrs:{"align":"center","label":"ID","width":"95"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(" "+_vm._s(scope.$index)+" ")]}}])}),_c('el-table-column',{attrs:{"label":"Title"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(" "+_vm._s(scope.row.title)+" ")]}}])}),_c('el-table-column',{attrs:{"label":"Author","width":"110","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v(_vm._s(scope.row.author))])]}}])}),_c('el-table-column',{attrs:{"label":"Pageviews","width":"110","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(" "+_vm._s(scope.row.pageviews)+" ")]}}])}),_c('el-table-column',{attrs:{"class-name":"status-col","label":"Status","width":"110","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-tag',{attrs:{"type":_vm._f("statusFilter")(scope.row.status)}},[_vm._v(_vm._s(scope.row.status))])]}}])}),_c('el-table-column',{attrs:{"align":"center","prop":"created_at","label":"Display_time","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('i',{staticClass:"el-icon-time"}),_c('span',[_vm._v(_vm._s(scope.row.display_time))])]}}])})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/table/index.vue?vue&type=template&id=0f8b7689&

// EXTERNAL MODULE: ./src/utils/request.js
var request = __webpack_require__("b775");

// CONCATENATED MODULE: ./src/api/table.js

function getList(params) {
  return Object(request["a" /* default */])({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params: params
  });
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/table/index.vue?vue&type=script&lang=js&
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

/* harmony default export */ var tablevue_type_script_lang_js_ = ({
  filters: {
    statusFilter: function statusFilter(status) {
      var statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  data: function data() {
    return {
      list: null,
      listLoading: true
    };
  },
  created: function created() {
    this.fetchData();
  },
  methods: {
    fetchData: function fetchData() {
      var _this = this;

      this.listLoading = true;
      getList().then(function (response) {
        _this.list = response.data.items;
        _this.listLoading = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/table/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_tablevue_type_script_lang_js_ = (tablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/table/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_tablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var table = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chunk-2d0e4b0c.16e1ffa9.js.map