<template>
  <div class="dashboard-container">
    <div id="container2_dc" class="container2">
      <h4 class="hdr"><i class="fa fa-thermometer-half" />&nbsp;新型コロナウイルス 国内 感染状況</h4>
      <h4 class="hdr_flt">全国の状況</h4>
      <i class="fa fa-filter fa-icon" />
      <a class="btn_clear_all ui-button" title="フィルタリングをリセットします" href="#"><span class="ui-icon ui-icon-closethick" />クリア</a>&nbsp;
      <input id="btn_search" type="search" autocomplete="off" class="btn_clear" value="">
      <input id="btn_date" type="text" value="" style="display: none;">&nbsp;
      <button id="btn_download_csv" title="フィルタリングされたグラフのデータをCSV形式でダウンロードします。" class="btn_export_file"><i class="ui-icon ui-icon-arrowstop-1-s" /><img width="20" src="img/csv.png"></button>
      <div id="toolbar_togwin">
        <B>表示：</B>
        <label for="ch_pnl_map"><input id="ch_pnl_map" v-model="pnl.map.is_show" type="checkbox">地図</label>&nbsp;&nbsp;
        <label for="ch_pnl_name"><input id="ch_pnl_name" v-model="pnl.name.is_show" type="checkbox">都道府県</label>&nbsp;&nbsp;
        <label for="ch_pnl_city"><input id="ch_pnl_city" v-model="pnl.city.is_show" type="checkbox">市区町村</label>&nbsp;&nbsp;
        <label for="ch_pnl_date"><input id="ch_pnl_date" v-model="pnl.date.is_show" type="checkbox"><i class="fa fa-procedures" />感染者数</label>&nbsp;&nbsp;
        <label for="ch_pnl_sex"><input id="ch_pnl_sex" v-model="pnl.sex.is_show" type="checkbox"><i class="fa fa-venus-mars" />性別</label>&nbsp;&nbsp;
        <label for="ch_pnl_week"><input id="ch_pnl_week" v-model="pnl.week.is_show" type="checkbox">曜日</label>&nbsp;&nbsp;
        <label for="ch_pnl_age"><input id="ch_pnl_age" v-model="pnl.age.is_show" type="checkbox">年齢</label>&nbsp;&nbsp;
        <label for="ch_pnl_cond"><input id="ch_pnl_cond" v-model="pnl.cond.is_show" type="checkbox"><i class="fa fa-medkit" />状態</label>&nbsp;&nbsp;
        <label for="ch_pnl_job"><input id="ch_pnl_job" v-model="pnl.job.is_show" type="checkbox"><i class="fa fa-id-card-o" />職業</label>&nbsp;&nbsp;
        <label for="ch_pnl_detail"><input id="ch_pnl_detail" v-model="pnl.detail.is_show" type="checkbox">詳細</label>&nbsp;&nbsp;
      </div>
      <div id="panels" class="row">
        <div v-show="pnl.map.is_show" id="chart_map" class="dc_panel drag">
          <ul v-show="pnl.map.tabs.is_show" class="chart-title">
            <li><a href="#tabs_w" title="世界の感染状況"><i class="fa fa-globe" />世界</a></li>
            <li><a href="#tabs_c" title="感染者数 @日本">感染</a></li>
            <li><a href="#tabs_p" title="入院治療等を要する患者数(累計)。(感染者数-無症状者数-退院者数-死亡者数) @日本">患者</a></li>
            <li><a href="#tabs_pc" title="人口一人あたりのPCR検査率(100*PCR検査数/総人口)% @日本">PCR</a></li>
            <li><a href="#tabs_d" title="死亡者数 - 日本">死亡</a></li>
            <li><a href="#tabs_b" title="対策病床数 - 日本">病床</a></li>
            <span class="ui-icon ui-icon-circle-close sp_icon btn_close" style="top: 8px;" @click="pnl.map.is_show=0" />
          </ul>
          <div id="tabs_w" />
          <div id="tabs_c" />
          <div id="tabs_p" />
          <div id="tabs_pc" />
          <div id="tabs_d" />
          <div id="tabs_b" />
          <div id="japan-map" />
          <div id="world-map" />
          <span class="hdr_flt_map" />
        </div>
        <div v-show="pnl.name.is_show" id="panel_name" class="dc_panel drag">
          <span class="chart-title" v-html="pnl.name.title">都道府県</span>
          <a id="btn_reset_name" class="btn_reset" href="javascript:void(0);" style="display: none;"><span class="ui-icon ui-icon-closethick" /></a>
          <input type="text" class="filter_txt" tt_title="Ctrlを押しながら選択すると単一選択ができます。" readonly style="display: none;">
          <span class="ui-icon ui-icon-circle-close sp_icon btn_close" @click="pnl.name.is_show=0" />
          <div id="div_name">
            <div id="chart_name" />
          </div>
        </div>
        <div v-show="pnl.city.is_show" id="panel_city" class="dc_panel drag">
          <span class="chart-title" v-html="pnl.city.title">市区町村</span>
          <a id="btn_reset_city" class="btn_reset" href="javascript:void(0);" style="display: none;"><span class="ui-icon ui-icon-closethick" /></a>
          <input type="text" class="filter_txt" tt_title="Ctrlを押しながら選択すると単一選択ができます。" readonly style="display: none;">
          <span class="ui-icon ui-icon-circle-close sp_icon btn_close" @click="pnl.city.is_show=0" />
          <div id="div_city">
            <div id="chart_city" />
          </div>
        </div>
        <div v-show="pnl.date.is_show" id="panel_date" class="dc_panel drag">
          <span class="chart-title" v-html="pnl.date.title"><i class="fa fa-procedures" />感染者数</span>
          <span class="btn_brush btn_off" title="ブラシベースの範囲選択をオン/オフします。&#x0A;Ctrlを押しながら日付バーをクリックで追加選択になります。"><span class="ui-icon ui-icon-arrow-2-e-w sp_icon" />選択</span>
          <a id="btn_reset_date" class="btn_reset" href="javascript:void(0);" style="display: none;"><span class="ui-icon ui-icon-closethick" /></a>
          <input type="text" class="filter_txt" readonly style="display: none;">&nbsp;<span class="filter_txt_diff" />
          <img src="img/stack-bar-g.gif" width="20" title="バーのスタック表示のタイプを切り替えます">
          <input id="stack_type_pre" v-model="pnl.date.stack_type" type="radio" value="pre"><label title="バーのスタック表示を都道府県にします" for="stack_type_pre">都道府県</label>
          <input id="stack_type_age" v-model="pnl.date.stack_type" type="radio" value="age"><label title="バーのスタック表示を年齢にします" for="stack_type_age">年齢</label>
          <input id="stack_type_con" v-model="pnl.date.stack_type" type="radio" value="con"><label title="バーのスタック表示を状態にします" for="stack_type_con">状態</label>
          <span class="ui-icon ui-icon-circle-close sp_icon btn_close" @click="pnl.date.is_show=0" />
          <div class="div_total">累計&nbsp;<span class="div_total_cnt" v-text="pnl.date.cnt" />&nbsp;名&nbsp;&nbsp;</div>
          <div class="clearfix" />
          <div class="div_cnt_day"><span v-text="pnl.date.cnt_day">4月15日 12:00時点</span></div>
          <div class="div_cnt_one">前日比 <span v-text="pnl.date.cnt_one" />　　</div>
          <div id="div_date">
            <div id="chart_date" />
          </div>
          <div v-show="pnl.date.chart2.is_show">
            <span class="chart-title" v-html="pnl.date.chart2.title"><i class="fa fa-vials" />PCR検査人数</span>
            <span class="chart-title2" v-html="pnl.date.chart2.title2" />
            <div class="div_total">累計&nbsp;<span class="div_total_cnt" v-text="pnl.date.chart2.cnt">2,123</span>&nbsp;名&nbsp;&nbsp;</div>
            <div id="div_date2" style="overflow-x: auto;width: 100%;">
              <div id="chart_date2" />
            </div>
          </div>
        </div>
        <div v-show="pnl.sex.is_show" id="chart_sex" class="dc_panel drag">
          <span class="chart-title" v-html="pnl.sex.title"><i class="fa fa-venus-mars" />性別</span>
          <a id="btn_reset_sex" class="reset btn_reset" href="javascript:void(0);" style="display: none;"><span class="ui-icon ui-icon-closethick" /></a>
          <span class="reset" style="display: none;"><span class="filter" /></span>&nbsp;
          <span class="ui-icon ui-icon-circle-close sp_icon btn_close" @click="pnl.sex.is_show=0" />
          <div class="clearfix" />
        </div>
        <div v-show="pnl.week.is_show" id="chart_week" class="dc_panel drag">
          <span class="chart-title" v-html="pnl.week.title">曜日</span>
          <a id="btn_reset_week" class="reset btn_reset" href="javascript:void(0);" style="display: none;"><span class="ui-icon ui-icon-closethick" /></a>
          <span class="reset" style="display: none;"><span class="filter" /></span>&nbsp;
          <span class="ui-icon ui-icon-circle-close sp_icon btn_close" @click="pnl.week.is_show=0" />
          <div class="clearfix" />
        </div>
        <div v-show="pnl.age.is_show" id="chart_age" class="dc_panel drag">
          <span class="chart-title" v-html="pnl.age.title">年齢</span>&nbsp;
          <a id="btn_reset_age" class="reset btn_reset" href="javascript:void(0);" style="display: none;"><span class="ui-icon ui-icon-closethick" /></a>
          <span class="reset" style="display: none;"><span class="filter" tt_title="Ctrlを押しながら選択すると単一選択ができます。" /></span>&nbsp;
          <span class="ui-icon ui-icon-circle-close sp_icon btn_close" @click="pnl.age.is_show=0" />
          <div class="clearfix" />
        </div>
        <div v-show="pnl.cond.is_show" id="panel_cond" class="dc_panel drag">
          <span class="chart-title" v-html="pnl.cond.title"><i class="fa fa-medkit" />状態(現在)</span>&nbsp;※公開されている自治体のみ
          <a id="btn_reset_cond" class="btn_reset" href="javascript:void(0);" style="display: none;"><span class="ui-icon ui-icon-closethick" /></a>
          <input type="text" class="filter_txt" tt_title="Ctrlを押しながら選択すると単一選択ができます。" readonly style="display: none;">
          <span class="ui-icon ui-icon-circle-close sp_icon btn_close" @click="pnl.cond.is_show=0" />
          <div style="overflow-x:auto">
            <div id="chart_cond" />
          </div>
        </div>
        <div v-show="pnl.job.is_show" id="panel_job" class="dc_panel drag">
          <span class="chart-title" v-html="pnl.job.title"><i class="fa fa-id-card-o" />職業</span><span id="chart_job_title_sub" />&nbsp;※公開されている自治体のみ
          <a id="btn_reset_job" class="btn_reset" href="javascript:void(0);" style="display: none;"><span class="ui-icon ui-icon-closethick" /></a>
          <input type="text" class="filter_txt" readonly style="display: none;">
          <span class="ui-icon ui-icon-circle-close sp_icon btn_close" @click="pnl.job.is_show=0" />
          <div style="overflow-x:auto">
            <div id="chart_job" />
          </div>
        </div>
        <div v-show="pnl.detail.is_show" id="panel_detail" class="dc_panel drag">
          <span class="chart-title" v-html="pnl.detail.title">詳細</span>
          <span class="ui-icon ui-icon-circle-close sp_icon btn_close" @click="pnl.detail.is_show=0" />
          <div>
            <div id="detail_div1" class="detail" />
            <div id="detail_div2" class="detail" />
            <div id="detail_div3" class="detail" />
            <div id="detail_div4" class="detail" />
            <div id="detail_div5" class="detail" />
          </div>
        </div>
      </div>
    </div><!-- container2 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getList } from '@/api/table'
import g_covid19_assets from '@/data/covid19-assets.json'
import g_covid19_data from '@/data/covid19-data.json'

import jQuery from 'jquery'
global.jquery = jQuery
global.$ = jQuery
window.$ = window.jQuery = require('jquery')

import 'jquery-ui'

const _ = require('lodash')
const moment = require('moment')
moment.locale('ja')

require('jvectormap-next')($)
require('@/data/jquery-jvectormap/data/jquery-jvectormap-jp-merc.js')

import php from '@/utils/phpjs-export.js'
require('@/assets/css/jquery-ui-1.12.1.custom/ui/i18n/jquery.ui.datepicker-ja.js')

// import '@/utils/colorbrewer.js'
const colorbrewer = { YlGn: { 3: ['#f7fcb9', '#addd8e', '#31a354'], 4: ['#ffffcc', '#c2e699', '#78c679', '#238443'], 5: ['#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837'], 6: ['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#31a354', '#006837'], 7: ['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#005a32'], 8: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#005a32'], 9: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'] }, YlGnBu: { 3: ['#edf8b1', '#7fcdbb', '#2c7fb8'], 4: ['#ffffcc', '#a1dab4', '#41b6c4', '#225ea8'], 5: ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'], 6: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494'], 7: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'], 8: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'], 9: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'] }, GnBu: { 3: ['#e0f3db', '#a8ddb5', '#43a2ca'], 4: ['#f0f9e8', '#bae4bc', '#7bccc4', '#2b8cbe'], 5: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'], 6: ['#f0f9e8', '#ccebc5', '#a8ddb5', '#7bccc4', '#43a2ca', '#0868ac'], 7: ['#f0f9e8', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e'], 8: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e'], 9: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'] }, BuGn: { 3: ['#e5f5f9', '#99d8c9', '#2ca25f'], 4: ['#edf8fb', '#b2e2e2', '#66c2a4', '#238b45'], 5: ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c'], 6: ['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#2ca25f', '#006d2c'], 7: ['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#005824'], 8: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#005824'], 9: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'] }, PuBuGn: { 3: ['#ece2f0', '#a6bddb', '#1c9099'], 4: ['#f6eff7', '#bdc9e1', '#67a9cf', '#02818a'], 5: ['#f6eff7', '#bdc9e1', '#67a9cf', '#1c9099', '#016c59'], 6: ['#f6eff7', '#d0d1e6', '#a6bddb', '#67a9cf', '#1c9099', '#016c59'], 7: ['#f6eff7', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016450'], 8: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016450'], 9: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'] }, PuBu: { 3: ['#ece7f2', '#a6bddb', '#2b8cbe'], 4: ['#f1eef6', '#bdc9e1', '#74a9cf', '#0570b0'], 5: ['#f1eef6', '#bdc9e1', '#74a9cf', '#2b8cbe', '#045a8d'], 6: ['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#2b8cbe', '#045a8d'], 7: ['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#034e7b'], 8: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#034e7b'], 9: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'] }, BuPu: { 3: ['#e0ecf4', '#9ebcda', '#8856a7'], 4: ['#edf8fb', '#b3cde3', '#8c96c6', '#88419d'], 5: ['#edf8fb', '#b3cde3', '#8c96c6', '#8856a7', '#810f7c'], 6: ['#edf8fb', '#bfd3e6', '#9ebcda', '#8c96c6', '#8856a7', '#810f7c'], 7: ['#edf8fb', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#6e016b'], 8: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#6e016b'], 9: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'] }, RdPu: { 3: ['#fde0dd', '#fa9fb5', '#c51b8a'], 4: ['#feebe2', '#fbb4b9', '#f768a1', '#ae017e'], 5: ['#feebe2', '#fbb4b9', '#f768a1', '#c51b8a', '#7a0177'], 6: ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#c51b8a', '#7a0177'], 7: ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177'], 8: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177'], 9: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'] }, PuRd: { 3: ['#e7e1ef', '#c994c7', '#dd1c77'], 4: ['#f1eef6', '#d7b5d8', '#df65b0', '#ce1256'], 5: ['#f1eef6', '#d7b5d8', '#df65b0', '#dd1c77', '#980043'], 6: ['#f1eef6', '#d4b9da', '#c994c7', '#df65b0', '#dd1c77', '#980043'], 7: ['#f1eef6', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#91003f'], 8: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#91003f'], 9: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'] }, OrRd: { 3: ['#fee8c8', '#fdbb84', '#e34a33'], 4: ['#fef0d9', '#fdcc8a', '#fc8d59', '#d7301f'], 5: ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'], 6: ['#fef0d9', '#fdd49e', '#fdbb84', '#fc8d59', '#e34a33', '#b30000'], 7: ['#fef0d9', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#990000'], 8: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#990000'], 9: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'] }, YlOrRd: { 3: ['#ffeda0', '#feb24c', '#f03b20'], 4: ['#ffffb2', '#fecc5c', '#fd8d3c', '#e31a1c'], 5: ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'], 6: ['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#f03b20', '#bd0026'], 7: ['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'], 8: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'], 9: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'] }, YlOrBr: { 3: ['#fff7bc', '#fec44f', '#d95f0e'], 4: ['#ffffd4', '#fed98e', '#fe9929', '#cc4c02'], 5: ['#ffffd4', '#fed98e', '#fe9929', '#d95f0e', '#993404'], 6: ['#ffffd4', '#fee391', '#fec44f', '#fe9929', '#d95f0e', '#993404'], 7: ['#ffffd4', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#8c2d04'], 8: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#8c2d04'], 9: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'] }, Purples: { 3: ['#efedf5', '#bcbddc', '#756bb1'], 4: ['#f2f0f7', '#cbc9e2', '#9e9ac8', '#6a51a3'], 5: ['#f2f0f7', '#cbc9e2', '#9e9ac8', '#756bb1', '#54278f'], 6: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'], 7: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#4a1486'], 8: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#4a1486'], 9: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'] }, Blues: { 3: ['#deebf7', '#9ecae1', '#3182bd'], 4: ['#eff3ff', '#bdd7e7', '#6baed6', '#2171b5'], 5: ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'], 6: ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c'], 7: ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594'], 8: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594'], 9: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'] }, Greens: { 3: ['#e5f5e0', '#a1d99b', '#31a354'], 4: ['#edf8e9', '#bae4b3', '#74c476', '#238b45'], 5: ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'], 6: ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#31a354', '#006d2c'], 7: ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32'], 8: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32'], 9: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'] }, Oranges: { 3: ['#fee6ce', '#fdae6b', '#e6550d'], 4: ['#feedde', '#fdbe85', '#fd8d3c', '#d94701'], 5: ['#feedde', '#fdbe85', '#fd8d3c', '#e6550d', '#a63603'], 6: ['#feedde', '#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603'], 7: ['#feedde', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#8c2d04'], 8: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#8c2d04'], 9: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'] }, Reds: { 3: ['#fee0d2', '#fc9272', '#de2d26'], 4: ['#fee5d9', '#fcae91', '#fb6a4a', '#cb181d'], 5: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'], 6: ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'], 7: ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d'], 8: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d'], 9: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'] }, Greys: { 3: ['#f0f0f0', '#bdbdbd', '#636363'], 4: ['#f7f7f7', '#cccccc', '#969696', '#525252'], 5: ['#f7f7f7', '#cccccc', '#969696', '#636363', '#252525'], 6: ['#f7f7f7', '#d9d9d9', '#bdbdbd', '#969696', '#636363', '#252525'], 7: ['#f7f7f7', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525'], 8: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525'], 9: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'] }, PuOr: { 3: ['#f1a340', '#f7f7f7', '#998ec3'], 4: ['#e66101', '#fdb863', '#b2abd2', '#5e3c99'], 5: ['#e66101', '#fdb863', '#f7f7f7', '#b2abd2', '#5e3c99'], 6: ['#b35806', '#f1a340', '#fee0b6', '#d8daeb', '#998ec3', '#542788'], 7: ['#b35806', '#f1a340', '#fee0b6', '#f7f7f7', '#d8daeb', '#998ec3', '#542788'], 8: ['#b35806', '#e08214', '#fdb863', '#fee0b6', '#d8daeb', '#b2abd2', '#8073ac', '#542788'], 9: ['#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788'], 10: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'], 11: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'] }, BrBG: { 3: ['#d8b365', '#f5f5f5', '#5ab4ac'], 4: ['#a6611a', '#dfc27d', '#80cdc1', '#018571'], 5: ['#a6611a', '#dfc27d', '#f5f5f5', '#80cdc1', '#018571'], 6: ['#8c510a', '#d8b365', '#f6e8c3', '#c7eae5', '#5ab4ac', '#01665e'], 7: ['#8c510a', '#d8b365', '#f6e8c3', '#f5f5f5', '#c7eae5', '#5ab4ac', '#01665e'], 8: ['#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#c7eae5', '#80cdc1', '#35978f', '#01665e'], 9: ['#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e'], 10: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'], 11: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'] }, PRGn: { 3: ['#af8dc3', '#f7f7f7', '#7fbf7b'], 4: ['#7b3294', '#c2a5cf', '#a6dba0', '#008837'], 5: ['#7b3294', '#c2a5cf', '#f7f7f7', '#a6dba0', '#008837'], 6: ['#762a83', '#af8dc3', '#e7d4e8', '#d9f0d3', '#7fbf7b', '#1b7837'], 7: ['#762a83', '#af8dc3', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#7fbf7b', '#1b7837'], 8: ['#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837'], 9: ['#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837'], 10: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'], 11: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'] }, PiYG: { 3: ['#e9a3c9', '#f7f7f7', '#a1d76a'], 4: ['#d01c8b', '#f1b6da', '#b8e186', '#4dac26'], 5: ['#d01c8b', '#f1b6da', '#f7f7f7', '#b8e186', '#4dac26'], 6: ['#c51b7d', '#e9a3c9', '#fde0ef', '#e6f5d0', '#a1d76a', '#4d9221'], 7: ['#c51b7d', '#e9a3c9', '#fde0ef', '#f7f7f7', '#e6f5d0', '#a1d76a', '#4d9221'], 8: ['#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221'], 9: ['#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221'], 10: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'], 11: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'] }, RdBu: { 3: ['#ef8a62', '#f7f7f7', '#67a9cf'], 4: ['#ca0020', '#f4a582', '#92c5de', '#0571b0'], 5: ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'], 6: ['#b2182b', '#ef8a62', '#fddbc7', '#d1e5f0', '#67a9cf', '#2166ac'], 7: ['#b2182b', '#ef8a62', '#fddbc7', '#f7f7f7', '#d1e5f0', '#67a9cf', '#2166ac'], 8: ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'], 9: ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'], 10: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'], 11: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'] }, RdGy: { 3: ['#ef8a62', '#ffffff', '#999999'], 4: ['#ca0020', '#f4a582', '#bababa', '#404040'], 5: ['#ca0020', '#f4a582', '#ffffff', '#bababa', '#404040'], 6: ['#b2182b', '#ef8a62', '#fddbc7', '#e0e0e0', '#999999', '#4d4d4d'], 7: ['#b2182b', '#ef8a62', '#fddbc7', '#ffffff', '#e0e0e0', '#999999', '#4d4d4d'], 8: ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#e0e0e0', '#bababa', '#878787', '#4d4d4d'], 9: ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d'], 10: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'], 11: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'] }, RdYlBu: { 3: ['#fc8d59', '#ffffbf', '#91bfdb'], 4: ['#d7191c', '#fdae61', '#abd9e9', '#2c7bb6'], 5: ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'], 6: ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'], 7: ['#d73027', '#fc8d59', '#fee090', '#ffffbf', '#e0f3f8', '#91bfdb', '#4575b4'], 8: ['#d73027', '#f46d43', '#fdae61', '#fee090', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4'], 9: ['#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4'], 10: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'], 11: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'] }, Spectral: { 3: ['#fc8d59', '#ffffbf', '#99d594'], 4: ['#d7191c', '#fdae61', '#abdda4', '#2b83ba'], 5: ['#d7191c', '#fdae61', '#ffffbf', '#abdda4', '#2b83ba'], 6: ['#d53e4f', '#fc8d59', '#fee08b', '#e6f598', '#99d594', '#3288bd'], 7: ['#d53e4f', '#fc8d59', '#fee08b', '#ffffbf', '#e6f598', '#99d594', '#3288bd'], 8: ['#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd'], 9: ['#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd'], 10: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'], 11: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'] }, RdYlGn: { 3: ['#fc8d59', '#ffffbf', '#91cf60'], 4: ['#d7191c', '#fdae61', '#a6d96a', '#1a9641'], 5: ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'], 6: ['#d73027', '#fc8d59', '#fee08b', '#d9ef8b', '#91cf60', '#1a9850'], 7: ['#d73027', '#fc8d59', '#fee08b', '#ffffbf', '#d9ef8b', '#91cf60', '#1a9850'], 8: ['#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850'], 9: ['#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850'], 10: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'], 11: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'] }, Accent: { 3: ['#7fc97f', '#beaed4', '#fdc086'], 4: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99'], 5: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0'], 6: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f'], 7: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17'], 8: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'] }, Dark2: { 3: ['#1b9e77', '#d95f02', '#7570b3'], 4: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a'], 5: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e'], 6: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02'], 7: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'], 8: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'] }, Paired: { 3: ['#a6cee3', '#1f78b4', '#b2df8a'], 4: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c'], 5: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99'], 6: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c'], 7: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f'], 8: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00'], 9: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6'], 10: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a'], 11: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99'], 12: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'] }, Pastel1: { 3: ['#fbb4ae', '#b3cde3', '#ccebc5'], 4: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4'], 5: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6'], 6: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc'], 7: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd'], 8: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec'], 9: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'] }, Pastel2: { 3: ['#b3e2cd', '#fdcdac', '#cbd5e8'], 4: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4'], 5: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9'], 6: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae'], 7: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc'], 8: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'] }, Set1: { 3: ['#e41a1c', '#377eb8', '#4daf4a'], 4: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3'], 5: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00'], 6: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33'], 7: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'], 8: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf'], 9: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'] }, Set2: { 3: ['#66c2a5', '#fc8d62', '#8da0cb'], 4: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3'], 5: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854'], 6: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f'], 7: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494'], 8: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'] }, Set3: { 3: ['#8dd3c7', '#ffffb3', '#bebada'], 4: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072'], 5: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3'], 6: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462'], 7: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69'], 8: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5'], 9: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9'], 10: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd'], 11: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5'], 12: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'] }}

// import axios from 'axios'
import * as dc from 'dc'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip
import * as crossfilter from 'crossfilter2/crossfilter'

const IS_SP = ('ontouchstart' in window) || window.innerWidth <= 768

const D_YMD = 0 // 日付。 例:2020-01-30
const D_SEX = 1 // 性別ID。INT。
const D_AGE = 2 // 年齢。INT。
const D_LV = 3 // 状態。 例:無症,退院,感染
const D_PL1 = 4 // 都道府県。 例:福岡県
const D_PL2 = 5 // 市区町村。 例:福岡市
const D_JOB = 6 // 職業。 例:会社員
const D_JOBCAT = 7 // ジョブカテゴリID。 INT。例:'教職員'=>['教職員','大学職員','小学校教諭','専門学校職員...]
const D_CNT = 8 // カウント。INT。(未必須:ない場合:1)
const D_OPT = 9 // CSVデータタイプオプション(未必須,ヘッダのみ,ユーザー定義)

const D3_YMD = 0
const D3_PL1 = 1
const D3_CNT = 2
const D3_TYP = 3
const DT_PCR = 0
const DT_DEA = 1
const DT_PAT = 2

const DN_SEX = 0; const DN_SEX_STR = '不明'
const DN_AGE = -1; const DN_AGE_STR = '不明'
const DN_LV = ''; const DN_LV_STR = '調査中'
// const DN_PL1='';  const DN_PL1_STR='';
const DN_PL2 = ''; const DN_PL2_STR = '不明'
const DN_JOB = ''; const DN_JOB_STR = '不明'
const DN_JOBCAT = 0

const DI_AGE_INFA = 0// 1 :幼児 (0歳,1歳未満,男児,女児,幼児,未就学児)
const DI_AGE_LT10 = 1 // 0 :10歳未満(小学生、園児)
// const DI_AGE_10  =2; //10 :10代 ※以後1ずらす
// const DI_AGE_20  =3; //20 :20代
// const DI_AGE_100 =11;//100 :100歳
const DI_AGE_NONE = 12// -1:不明
const DI_AGE_MAX = 13// EOD

const CND_LV_A = '無症,退院'
const CND_LV_B = '感染'
const CND_LV_C = '肺炎,入院'
const CND_LV_D = '酸投,重症'
const CND_LV_E = '死亡'

const COL_CND = ['#2ca02c', '#1f77b4', '#ff7f0e', '#d62728', '#9467bd']
const COL_CND_A = COL_CND[0]
const COL_CND_B = COL_CND[1]
const COL_CND_C = COL_CND[2]
const COL_CND_D = COL_CND[3]
const COL_CND_E = COL_CND[4]
const COL_NAME = colorbrewer.Set2[5]
// 0        1         2     3       4      5     6       7     8     9      10     11   12
// '幼児','10歳未満','10代','20代','30代','40代','50代','60代','70代','80代','90代','100代',DN_AGE_STR
// green                  |  blue                     | yellow-orange
const COL_AGE = d3.schemeGreens[4].slice(1).concat(d3.schemeBlues[4].slice(1)).concat(d3.schemeYlOrRd[7].slice(1)).concat(['#B0B0B0'])

const CHART_DATE_STACK_GRP = [
  [CND_LV_A, CND_LV_B, CND_LV_C, CND_LV_D, CND_LV_E],
  ['S:0', 'S:1', 'S:2', 'S:3', 'S:4'],
  ['幼児', '10歳未満', '10代', '20代', '30代', '40代', '50代', '60代', '70代', '80代', '90代', '100代', DN_AGE_STR]
]
const CHART_DATE_STACK1_N = CHART_DATE_STACK_GRP[0].length; const CHART_DATE_STACK2_N = CHART_DATE_STACK_GRP[1].length; const CHART_DATE_STACK3_N = CHART_DATE_STACK_GRP[2].length
const DT_COL = ['#20b2aa', COL_CND_E, COL_CND_B]
const CHART_DATE2_STACK1_N = 3; const CHART_DATE2_STACK2_N = 5 + 1
const COL_SEX = ['#B0B0B0', '#8dd3c7', 'pink']
const SEX_LABEL = ['不明', '男性', '女性']
const WEEK_LABEL = moment.weekdaysMin()
const IMG_NO = 'img/noimage.png'

const YMD_ED_F = [['2020-04-07', '【緊急事態宣言】\n発令。７都府県\n対象：東京・埼玉・千葉・神奈川・大阪・兵庫・福岡'], ['2020-04-16', '【緊急事態宣言】\n対象を｢全国｣に拡大'], ['2020-05-14', '【緊急事態宣言】\n39県で解除\n継続：北海道・東京・埼玉・千葉・神奈川・大阪・京都・兵庫'], ['2020-05-21', '【緊急事態宣言】\n大阪・京都・兵庫を解除\n継続：北海道・東京・埼玉・千葉・神奈川'], ['2020-05-25', '【緊急事態宣言】\n全都道府県で解除']]

const PREF_EN = { '北海道': 'hokkaido', '青森県': 'aomori', '岩手県': 'iwate', '宮城県': 'miyagi', '秋田県': 'akita', '山形県': 'yamagata', '福島県': 'fukushima', '茨城県': 'ibaraki', '栃木県': 'tochigi', '群馬県': 'gunma', '埼玉県': 'saitama', '千葉県': 'chiba', '東京都': 'tokyo', '神奈川県': 'kanagawa', '新潟県': 'niigata', '富山県': 'toyama', '石川県': 'ishikawa', '福井県': 'fukui', '山梨県': 'yamanashi', '長野県': 'nagano', '岐阜県': 'gifu', '静岡県': 'shizuoka', '愛知県': 'aichi', '三重県': 'mie', '滋賀県': 'shiga', '京都府': 'kyoto', '大阪府': 'osaka', '兵庫県': 'hyogo', '奈良県': 'nara', '和歌山県': 'wakayama', '鳥取県': 'tottori', '島根県': 'shimane', '岡山県': 'okayama', '広島県': 'hiroshima', '山口県': 'yamaguchi', '徳島県': 'tokushima', '香川県': 'kagawa', '愛媛県': 'ehime', '高知県': 'kochi', '福岡県': 'fukuoka', '佐賀県': 'saga', '長崎県': 'nagasaki', '熊本県': 'kumamoto', '大分県': 'oita', '宮崎県': 'miyazaki', '鹿児島県': 'kagoshima', '沖縄県': 'okinawa' }
const PREF_HIRA = { '北海道': 'ほっかいどう', '青森県': 'あおもり', '岩手県': 'いわて', '宮城県': 'みやぎ', '秋田県': 'あきた', '山形県': 'やまがた', '福島県': 'ふくしま', '茨城県': 'いばらき', '栃木県': 'とちぎ', '群馬県': 'ぐんま', '埼玉県': 'さいたま', '千葉県': 'ちば', '東京都': 'とうきょうと', '神奈川県': 'かながわ', '新潟県': 'にいがた', '富山県': 'とやま', '石川県': 'いしかわ', '福井県': 'ふくい', '山梨県': 'やまなし', '長野県': 'ながの', '岐阜県': 'ぎふ', '静岡県': 'しずおか', '愛知県': 'あいち', '三重県': 'みえ', '滋賀県': 'しが', '京都府': 'きょうとふ', '大阪府': 'おおさかふ', '兵庫県': 'ひょうご', '奈良県': 'なら', '和歌山県': 'わかやま', '鳥取県': 'とっとり', '島根県': 'しまね', '岡山県': 'おかやま', '広島県': 'ひろしま', '山口県': 'やまぐち', '徳島県': 'とくしま', '香川県': 'かがわ', '愛媛県': 'えひめ', '高知県': 'こうち', '福岡県': 'ふくおか', '佐賀県': 'さが', '長崎県': 'ながさき', '熊本県': 'くまもと', '大分県': 'おおいた', '宮崎県': 'みやざき', '鹿児島県': 'かごしま', '沖縄県': 'おきなわ' }
const PREF_IMG = { '北海道': 'commons\/thumb\/6\/66\/Tokachi_plain_01.jpg\/560px-Tokachi_plain_01.jpg', '青森県': 'commons\/thumb\/3\/3d\/OiraseValley2.JPG\/560px-OiraseValley2.JPG', '岩手県': 'commons\/thumb\/2\/2e\/Konjikido-Ooido.jpg\/560px-Konjikido-Ooido.jpg', '宮城県': 'commons\/thumb\/f\/fc\/MatsushimaYondaikanOotakamori2.JPG\/560px-MatsushimaYondaikanOotakamori2.JPG', '秋田県': 'ja\/thumb\/d\/d5\/Hiru_kanto_1.jpg\/560px-Hiru_kanto_1.jpg', '山形県': 'commons\/thumb\/f\/f8\/Precincts_of_Gassan_jinja.JPG\/560px-Precincts_of_Gassan_jinja.JPG', '福島県': 'ja\/thumb\/2\/2a\/Miharu_Miharu-Takizakura_Front_1.JPG\/306px-Miharu_Miharu-Takizakura_Front_1.JPG', '茨城県': 'commons\/thumb\/d\/da\/Fukuroda_Falls_38.jpg\/560px-Fukuroda_Falls_38.jpg', '栃木県': 'commons\/thumb\/8\/88\/20100727_Nikko_Tosho-gu_Yomeimon_5889.jpg\/560px-20100727_Nikko_Tosho-gu_Yomeimon_5889.jpg', '群馬県': 'commons\/thumb\/8\/85\/Kusatsu_Yubatake_04.JPG\/560px-Kusatsu_Yubatake_04.JPG', '埼玉県': 'ja\/9\/9a\/Saitamanogazou.jpg', '千葉県': 'commons\/thumb\/e\/e1\/Photo_montage_of_Chiba.png\/560px-Photo_montage_of_Chiba.png', '東京都': 'commons\/thumb\/b\/bf\/Tokyo_Montage_2015.jpg\/560px-Tokyo_Montage_2015.jpg', '神奈川県': 'commons\/thumb\/0\/06\/Yokohama_MinatoMirai21.jpg\/274px-Yokohama_MinatoMirai21.jpg', '新潟県': 'commons\/thumb\/a\/a6\/Myokousan_from_hiutiyama_1996_6_29.jpg\/600px-Myokousan_from_hiutiyama_1996_6_29.jpg', '富山県': 'commons\/thumb\/b\/bd\/Montage_toyama_2019.png\/560px-Montage_toyama_2019.png', '石川県': 'commons\/thumb\/e\/ed\/Montages_of_Ishikawa_prefecture.jpg\/600px-Montages_of_Ishikawa_prefecture.jpg', '福井県': 'commons\/thumb\/b\/bd\/Japan_Tojinbo02n4592.jpg\/560px-Japan_Tojinbo02n4592.jpg', '山梨県': 'commons\/thumb\/9\/95\/Lake_Kawaguchiko_Sakura_Mount_Fuji_3.JPG\/560px-Lake_Kawaguchiko_Sakura_Mount_Fuji_3.JPG', '長野県': 'commons\/thumb\/4\/4c\/Mount_Shirouma_from_Mount_Korenge_2000-7-31.jpg\/600px-Mount_Shirouma_from_Mount_Korenge_2000-7-31.jpg', '岐阜県': 'commons\/thumb\/e\/e6\/Ogi_Shirakawa-g%C5%8D%2C_Gifu%2C_Japan.jpg\/560px-Ogi_Shirakawa-g%C5%8D%2C_Gifu%2C_Japan.jpg', '静岡県': 'ja\/thumb\/3\/3e\/MtFuji_FujiCity.jpg\/560px-MtFuji_FujiCity.jpg', '愛知県': 'commons\/thumb\/1\/18\/Tenshuhonmaru.jpg\/560px-Tenshuhonmaru.jpg', '三重県': 'commons\/thumb\/1\/18\/Tenshuhonmaru.jpg\/560px-Tenshuhonmaru.jpg', '滋賀県': 'commons\/thumb\/1\/18\/Tenshuhonmaru.jpg\/560px-Tenshuhonmaru.jpg', '京都府': 'commons\/thumb\/7\/7c\/Amanohashidate_view_from_Mt_Moju02s3s4592.jpg\/300px-Amanohashidate_view_from_Mt_Moju02s3s4592.jpg', '大阪府': 'commons\/thumb\/c\/ca\/Osaka_Castle_03bs3200.jpg\/318px-Osaka_Castle_03bs3200.jpg', '兵庫県': 'commons\/thumb\/a\/a7\/Kobe_Port_Tower03bs3200.jpg\/480px-Kobe_Port_Tower03bs3200.jpg', '奈良県': 'commons\/thumb\/2\/2f\/T%C5%8Ddai-ji_Kon-d%C5%8D.jpg\/560px-T%C5%8Ddai-ji_Kon-d%C5%8D.jpg', '和歌山県': 'commons\/thumb\/1\/17\/Danjogaran_Koyasan12n3200.jpg\/560px-Danjogaran_Koyasan12n3200.jpg', '鳥取県': 'commons\/thumb\/e\/e1\/Tottori-Sakyu_Tottori_Japan.JPG\/560px-Tottori-Sakyu_Tottori_Japan.JPG', '島根県': 'commons\/thumb\/7\/73\/Izumo-taisha16nt3200.jpg\/560px-Izumo-taisha16nt3200.jpg', '岡山県': 'commons\/thumb\/4\/4b\/Okayama_Korakuen_Garden01.jpg\/560px-Okayama_Korakuen_Garden01.jpg', '広島県': 'commons\/thumb\/d\/da\/Montages_of_Hiroshima_prefecture.jpg\/560px-Montages_of_Hiroshima_prefecture.jpg', '山口県': 'ja\/thumb\/7\/7e\/%E7%A7%8B%E5%90%89%E5%8F%B0%E9%A2%A8%E6%99%AF.JPG\/560px-%E7%A7%8B%E5%90%89%E5%8F%B0%E9%A2%A8%E6%99%AF.JPG', '徳島県': 'commons\/thumb\/2\/29\/Onaruto-bridge_and_Naruto_Channel%2CNaruto-city%2CJapan.JPG\/560px-Onaruto-bridge_and_Naruto_Channel%2CNaruto-city%2CJapan.JPG', '香川県': 'commons\/thumb\/8\/8b\/%E9%A6%99%E5%B7%9D%E7%9C%8C%E3%81%AE%E9%A2%A8%E6%99%AF.jpg\/560px-%E9%A6%99%E5%B7%9D%E7%9C%8C%E3%81%AE%E9%A2%A8%E6%99%AF.jpg', '愛媛県': 'commons\/thumb\/8\/83\/D%C5%8Dgo_Onsen.jpg\/560px-D%C5%8Dgo_Onsen.jpg', '高知県': 'ja\/thumb\/c\/c1\/Shimanto_River_And_Iwama_Bridge_1.JPG\/560px-Shimanto_River_And_Iwama_Bridge_1.JPG', '福岡県': 'commons\/thumb\/8\/8b\/20100719_Dazaifu_Tenmangu_Shrine_3328.jpg\/560px-20100719_Dazaifu_Tenmangu_Shrine_3328.jpg', '佐賀県': 'commons\/thumb\/3\/38\/Yoshinogari-iseki_zenkei.JPG\/560px-Yoshinogari-iseki_zenkei.JPG', '長崎県': 'commons\/thumb\/a\/a4\/Nagasaki-Glover-Garden-5415.jpg\/560px-Nagasaki-Glover-Garden-5415.jpg', '熊本県': 'ja\/thumb\/a\/a1\/20140516%E9%98%BF%E8%98%87%E5%B1%B1%E5%BA%83%E5%9F%9F.jpg\/560px-20140516%E9%98%BF%E8%98%87%E5%B1%B1%E5%BA%83%E5%9F%9F.jpg', '大分県': 'commons\/thumb\/a\/af\/Beppu_Umi-jigoku04n4272.jpg\/560px-Beppu_Umi-jigoku04n4272.jpg', '宮崎県': 'commons\/thumb\/5\/51\/Takachihokyou55.jpg\/560px-Takachihokyou55.jpg', '鹿児島県': 'ja\/thumb\/a\/ac\/Kagoshima_and_Sakurajima.jpg\/560px-Kagoshima_and_Sakurajima.jpg', '沖縄県': 'commons\/thumb\/9\/99\/Naha_Shuri_Castle16s5s3200.jpg\/560px-Naha_Shuri_Castle16s5s3200.jpg' }
const PREF_IMG_PATH = 'https://upload.wikimedia.org/wikipedia/'
const JOB_HIRA = { '無職': 'むしょく', '教職員': 'きょうしょくいん', '学生': 'がくせい', '保育園児': 'ほいくえんじ', '入所者': 'にゅうしょしゃ', '医師': 'いし', '看護師': 'かんごし', '看護職員': 'かんごしょくいん', '医療従事者': 'いりょうじゅうじしゃ', '介護職員': 'かいごしょくいん', '福祉事業従事者': 'ふくしじぎょうじゅうじしゃ', '保育園職員': 'ほいくえんしょくいん', '歯医者勤務': 'はいしゃきんむ', '公務員': 'こうむいん', '団体職員': 'だんたいしょくいん', '自衛・消防官': 'じえいしょうぼうかん', '経営者・役員': 'けいえいしゃやくいん', '会社員': 'かいしゃいん', '事務職員': 'じむしょくいん', '運転手': 'うんてんしゅ', '運送業': 'うんそうぎょう', '接客業': 'せっきゃくぎょう', '飲食業': 'いんしょくぎょう', '飲食店従業員': 'いんしょくてんじゅうぎょういん', '自営業': 'じえいぎょう', 'パート・アルバイト': 'パートアルバイト', 'サービス業': 'さーびすぎょう', '製造業': 'せいぞうぎょう', '土木建築業': 'どぼくけんちくぎょう', 'スポーツ選手': 'スポーツせんしゅ' }
const LV_HIRA = { '退院': 'たいいん', '無症状': 'むしょうじょう', '重症': 'じゅうしょう', '死亡': 'しぼう', '軽症': 'けいしょう', '中等度': 'ちゅうとうど', '肺炎入院': 'はいえんにゅういん', '入院予定': 'にゅういんよてい', '入院': 'にゅういん', '肺炎': 'はいえん', '自宅待機': 'じたくたいき', '酸投': 'さんとう', '肺炎入院予定': 'はいえんにゅういんよてい', '再発入院': 'さいはつにゅういん' }
const SPARK_SX = IS_SP ? 60 : 25
const MAP_COL_TBL = [['1000人以上', '#8c0a00'], ['500人以上', '#ea5432'], ['100人以上', '#ff781d'], ['50人以上', '#ff9d57'], ['10人以上', '#ffceab'], ['1人以上', '#f5deb3'], ['0人', '#dadada'], ['選択中', '#ffffff']]

colorbrewer.Set3[12][8] = colorbrewer.Set2[8][6]// Set3[12][8]:gray-> light gold
colorbrewer.Set2[8][7] = colorbrewer.Set1[8][6]// Set3[12][8]:gray-> light gold

var app
const m_ = {
  config: {
    url_param_data_replace: !IS_SP, cDateYm: {
      is_elasticY: 1
    },
    cJob: {
      TD: 750, // transitionDuration
      barWidth: 40
    }
  },
  get: php.location_get_query(),
  url_data: { 'path': 'data\/', 'assets': 'covid19-assets.json', 'data': 'covid19-data.json' },
  url_name: 'https://ja.wikipedia.org/wiki',

  //
  // charts
  //
  composite: null,
  chartDate: null,
  chartLine: null,

  composite2: null,
  chartDate2: null,
  chartLine2: null,

  chartName: null,
  chartCity: null,
  chartSex: null,
  chartWeek: null,
  chartAge: null,
  chartCond: null,
  chartJob: null,

  ndx: {},
  data_type: 1, // 感染者情報のデータタイプ。1:感染者情報 0:それ以外
  data_hdr: [],
  data: [], // 感染者情報のデータ
  names: {},
  citys: [],
  conds: [],
  jobcates: [],
  data3: [], // (感染・PCR・死亡・病床)のデータ

  pref_tbl_last_m1: [], pref_tbl_last_m2: [], pref_tbl_last_cnt: {}, // pref_tbl_city_cnt:{},
  spk: {},
  ac_data: [],
  ac_data_tbl: [],

  dimJob: null,
  dimJobCat: null,

  dimName: null,
  gpName: null,
  gpName_all: {},

  dimName2: null,

  // gpCity_all:{},
  domainDate: null,
  gpDate: null,
  gpDate2: null,

  chartDate2Mode: DT_PCR,
  gpJob: null,
  is_job_cate: 1,
  gpJobCat: null,

  dateCnt: {},
  datePick: null,
  dateCntMax: 0,
  dateCntTo: 'YYYYMMDD',

  dateCntMax2: 0,
  dateCntTo2: 'YYYYMMDD',

  tab: null,
  sel_tab: 'tabs_c',

  tip: null,
  tipRow: null,

  tbl_pref: null,
  tbl_pref_isearch: null,
  // gpDateYMMax:{},

  chartAllFilterByKW_render: 0,
  line: d3.line().curve(d3.curveLinear),
  last_fth: '',
  is_drawJapanMap: 1,
  is_filter_region_sel: 0,
  group_reduce: {
    add: function(p, v, dir) {
      const c = dir * (v[D_CNT] || 1)
      p = m_.group_reduce_lv_set(p, v[D_LV], c)

      const nm = v[D_PL1]
      if (p.nmcnt[nm] === undefined) p.nmcnt[nm] = 0; p.nmcnt[nm] += c

      p = m_.group_reduce_age_set(p, v[D_AGE], c)

      p.total += c
      return p
    },
    append: (p, v) => m_.group_reduce.add(p, v, 1),
    remove: (p, v) => m_.group_reduce.add(p, v, -1),
    init: (p, v) => {
      return { lv_a: 0, lv_b: 0, lv_c: 0, lv_d: 0, lv_e: 0, nmcnt: {}, agcnt: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 0 }
    }
  },
  group_reduce_light: {
    add: function(p, v, dir) {
      const c = dir * (v[D_CNT] || 1)
      const l = v[D_LV]
      p = m_.group_reduce_lv_set(p, l, c)
      p.total += c
      return p
    },
    append: (p, v) => m_.group_reduce_light.add(p, v, 1),
    remove: (p, v) => m_.group_reduce_light.add(p, v, -1),
    init: function(p, v) {
      return { lv_a: 0, lv_b: 0, lv_c: 0, lv_d: 0, lv_e: 0, total: 0 }
    }
  },
  date_stk_nm: [],

  dateCntCreate: function() {
    m_.dateCnt = {}
    m_.dateCntMax = -1
    m_.dateCntTo = '00000000'
    _.forEach(m_.gpDate.all(), (d) => {
      const ymd = moment(d.key).format('YYYYMMDD')
      m_.dateCnt[ymd] = d.value
      if (d.value > m_.dateCntMax) m_.dateCntMax = d.value
      if (d.value > 0 && ymd > m_.dateCntTo) m_.dateCntTo = ymd
    })
  },
  ageTickFormat: function(s) {
    if (s === 1) return '幼児'
    return s === DN_AGE ? DN_AGE_STR : (s === 0 ? '10歳未満' : s + '代')
  },
  getChartnameTitle: function(pre_name, br) {
    const p = m_.pref_tbl_last_m1[pre_name]
    if (p === undefined) return ''
    const n = m_.names[pre_name] ? m_.names[pre_name] : 0
    const patient = n - p.discharged - p.deaths// 現患者数=感染者数-退院者数-死亡者数
    const ret = pre_name + br +
            '総人口　: ' + php.number_format(p.n) + '名' + br +
            '感染者数: ' + php.number_format(n) + '名 (' + (_.round(100 * n / p.n, 3)) + '%)' + br +
            '患者数　: ' + php.number_format(patient) + '名' + br +
            'PCR検査: ' + php.number_format(p.pcrtested) + '名 (' + p.pcrtested_p + '%)' + br +
            '死亡者数: ' + p.deaths + '名' + br +
            '退院者数: ' + php.number_format(p.discharged) + '名' + br +
            '対策病床数: ' + php.number_format(p.bed) + '床 (' + (_.round(100 * patient / p.bed, 2)) + '%)' + br
    return ret
  },
  getFilterTxt: function() {
    const name = $('#panel_name .filter_txt').val()
    const city = $('#panel_city .filter_txt').val()
    const date = $('#panel_date .filter_txt').val()
    const week = $('#chart_week .filter').text()
    const age = $('#chart_age .filter').text()
    const sex = $('#chart_sex .filter').text()
    const cond = m_.chartCond.filters().join(',')
    const job = m_.chartJob.filters().join(',')
    const txt = _.fill(Array(8), '')
    const PL = 'と'

    if (name !== '') {
      let t = ''; const sp = name.split(',')
      for (const i of sp) {
        t += i.trim() + PL
      }
      txt[1] = (sp.length == 1 ? '' : '【') + php.trim(t, PL) + (sp.length == 1 ? '' : '】')
    }

    if (city !== '') {
      const is = city.indexOf(',') !== -1
      txt[2] = (is ? '【' : '') + city + (is ? '】' : '')
    }

    if (date != '') {
      if (m_.chartDate.filters().length) {
        if (m_.chartDate.brushOn()) {
          txt.push(date)
        } else {
          let t = ''; const sp = date.split(',')
          for (const i of sp) {
            t += i + PL
          }
          txt[0] = (sp.length == 1 ? '' : '【') + php.trim(t, PL) + (sp.length == 1 ? '' : '】')
        }
      }
    }
    if (week != '') {
      const is = week.indexOf(',') !== -1
      txt[3] = '曜日:' + (is ? '【' : '') + week + (is ? '】' : '')
    }
    if (age != '') {
      let t = ''; const sp = age.split(',')
      for (const i of sp) t += m_.ageTickFormat(+i) + PL
      txt[4] = '年齢:' + (sp.length == 1 ? '' : '【') + php.trim(t, PL) + (sp.length == 1 ? '' : '】')
    }
    if (sex != '') {
      let t = ''; const sp = sex.split(',')
      if (sp.length !== 3) {
        for (const i of sp) {
          t += i.trim() + PL
        }
        txt[5] = '性別:' + (sp.length == 1 ? '' : '【') + php.trim(t, PL) + (sp.length == 1 ? '' : '】')
      }
    }
    if (cond != '') {
      const is = cond.indexOf(',') !== -1
      txt[6] = '状態:' + (is ? '【' : '') + cond + (is ? '】' : '')
    }
    if (job != '') {
      const is = job.indexOf(',') !== -1
      txt[7] = '職業:' + (is ? '【' : '') + job + (is ? '】' : '')
    }
    return txt
  },
  chartNameFilters: function(pre0) {
    // m_.chartNameにない物は除外
    const pre_names = _.keys(m_.names)
    const pre = []
    for (const i of pre0) {
      if (_.indexOf(pre_names, i) !== -1) pre.push(i)
    }
    if (pre.length === 0) {
      m_.chartName.filterAll()
      m_.renderAllChart()
      return
    }

    const f = m_.chartName.filters()
    const diff = pre.length > f.length ? _.difference(pre, f) : _.difference(f, pre)
    m_.chartName.filter(diff[0])// 差分をadd

    m_.renderAllChart()
  },
  chartAllFilterByKW: function(pre0) {
    // 日付
    if (!isNaN(pre0[0])) {
      let d = moment(pre0)
      if (d.isValid()) {
        const a = d.format('YYYY-MM-DD')
        if (a.indexOf('2001') !== -1) {
          const s = a.split('-')
          d = moment('2020-' + s[1] + '-' + s[2])
        }
        m_.composite.filterAll().filter(d.toDate())
        m_.renderAllChart()
        m_.barChartRedrawGroup(m_.chartDate); return 1
      }
    }
    // 職業
    if (_.indexOf(m_.jobcates, pre0) !== -1) {
      m_.chartJob.filterAll().filter(pre0)
      m_.renderAllChart()
      return 1
    }
    // 状態
    if (_.indexOf(m_.conds, pre0) !== -1) {
      m_.chartCond.filterAll().filter(pre0)
      m_.renderAllChart()
      return 1
    }

    // m_.chartNameにない物は除外 前方一致
    const pre_names = _.keys(m_.names); let city = ''; let is_pre_find = 0
    const AC_SPLIT_WD = /\s+/
    const names = []
    for (const pre1 of pre0.split(AC_SPLIT_WD)) {
      for (const nm of pre_names) {
        if (pre1 === nm) {
          if (names.length === 0) city = pre1.replace(nm, '')
          names.push(nm)
          is_pre_find = 1
        }
      }
    }

    // 都道府県
    if (is_pre_find) {
      m_.chartName.filterAll().filter(names.length === 1 ? names[0] : [names])
      m_.chartCity.filterAll()
      m_.renderAllChart()
      m_.chartScroll('#div_name', names[0], 300)
      return 1
    }

    city = pre0
    for (const nm of pre_names) {
      if (pre0.indexOf(nm) === 0) {
        city = pre0.replace(nm, '')
      }
    }
    if (city === '') return 0

    // 市区町村
    // m_.chartCity.filterAll().filter(city);//single
    const citys = _.filter(m_.citys, (d) => { return d.indexOf(city) === 0 })// multi
    if (citys.length) {
      m_.chartName.filterAll()
      m_.chartCity.filterAll().filter([citys])
      m_.renderAllChart()
      $('#ch_pnl_city').prop('checked', true).trigger('ch_pnl_update')
      m_.chartScroll('#div_city', city, 300)
      return 1
    }
    return 0
  },
  parseURLParams: function() {
    let is_trigger_search
    // 都道府県指定
    // 例:
    // name=福岡県
    // name=福岡県+佐賀県
    if (m_.get.name) {
      const names = m_.get.name.split(' ')
      const flt = names.length === 1 ? names[0] : [names]
      m_.chartName.filterAll().filter(flt)
      $('#btn_search').val(names.join(' '))
      drawJapanMap()
      is_trigger_search = 0
    }
    // Keyword指定
    if (m_.get.q) {
      $('#btn_search').val(m_.get.q.trim())
      is_trigger_search = 1
    }
    // 日付指定
    // date=3-4      //単一日 4月4日
    // date=3-4+3-8  //範囲日 4月4日~4月8日
    // date=3-4+3    //範囲日 4月4日 + 3day
    if (m_.get.date) {
      const date_get = (s) => { // [YYYY]-MM-DD
        let ret
        const s2 = s.split('-')
        switch (s2.length) {
          case 3: ret = moment(s2[0] + '-' + php.printf02d(s2[1]) + '-' + php.printf02d(s[2])); break
          case 2: ret = moment(moment().format('YYYY') + '-' + php.printf02d(s2[0]) + '-' + php.printf02d(s2[1])); break
          case 1: ret = s; break
        }
        return ret
      }
      const from_to = m_.get.date.split(' '); let from; let to
      let fsel = 0
      switch (from_to.length) {
        case 1:// 4-4 => 単一日 4月4日
          from = date_get(from_to[0])
          if (isNaN(parseInt(from))) {
            fsel = dc.filters.RangedFilter(from.toDate(), from.add(1, 'days').toDate())
          }
          break
        case 2:
          from = date_get(from_to[0])
          to = date_get(from_to[1])
          if (isNaN(parseInt(to))) { // 4-4+4-8 => 範囲日 4月4日~4月8日
            fsel = dc.filters.RangedFilter(from.toDate(), to.toDate())
          } else { // 4-4+3 => 範囲日 4月4日 + 3day
            fsel = dc.filters.RangedFilter(from.toDate(), from.add(to, 'days').toDate())
          }
          break
      }
      if (fsel) {
        m_.composite.brushOn(true).render()
        m_.composite.filter(fsel)
        $('.btn_brush').trigger('my_update', 0)// on
      }
    }

    if (is_trigger_search) {
      $('#btn_search').trigger('btn_search_update')
    }
  },
  showFilterUi: function(panel_sel, chart, func) {
    const flt = chart.filters()
    const pnl = $(panel_sel)
    if (flt.length) {
      const is_range = $.isArray(flt[0])
      if (is_range) {
        const t = func(flt[0][0]) + '～' + func(flt[0][1])
        pnl.find('.filter_txt').show().val(t).attr('title', t)
        pnl.find('.filter_txt_diff').text((moment(flt[0][1]).diff(flt[0][0], 'days') + 1) + '日間')
      } else {
        const flt2 = []
        for (let f of flt) {
          if (func) f = func(f)
          flt2.push(f)
        }
        const t = flt2.join(',')
        pnl.find('.filter_txt').show().val(t).attr('title', t)
        pnl.find('.filter_txt_diff').text('')
      }
      pnl.find('.btn_reset').show()
    } else {
      pnl.find('.filter_txt').hide()
      pnl.find('.btn_reset').hide()
    }
  },
  // MAPの選択Nameのエリア枠を描画
  mapSetSelectedRegions: function() {
    const f = m_.chartName.filters()
    if (f.length && map) {
      m_.is_filter_region_sel = 1
      map.clearSelectedRegions()
      const sels = []
      for (var i = 0; i < f.length; i++) {
        sels[i] = _.capitalize(PREF_EN[f[i]])
      }
      map.setSelectedRegions(sels)
      m_.is_filter_region_sel = 0
    }
  },
  renderVLine: function(chart, hz) {
    chart.g().select('g.chart-body')
      .selectAll('path.line').data(hz).enter()
      .append('path').attr('class', function(d) { return d.cls.concat(['line']).join(' ') })
      .attr('d', function(d) {
        const x = chart.x()(d.x)
        return m_.line([[x, chart.y().range()[0]], [x, chart.y().range()[1]]])
      })
  },
  barChartRedrawGroup: function(_chart) {
    const b = _chart.selectAll('rect.bar')
    if (b.size() == 0) return
    const filters = _chart.filters()
    if (filters.length == 0) {
      b.classed('deselected', false).classed('selected', true)
    } else {
      b.classed('deselected', true).classed('selected', false)
      b.each(function(val) {
        for (var j = 0; j < filters.length; j++) {
          if (moment(val.x).isSame(filters[j])) {
            $(this).removeClass('deselected').addClass('selected')
          }
        }
      })
    }
  },
  addFilterHandlerSingle: function(filters, filter) {
    if (window.event && (window.event.ctrlKey || window.event.shiftKey)) {
      filters.push(filter); return filters // add select
    } else {
      return [filter] // single select
    }
  },
  addFilterHandlerSingleR: function(filters, filter) {
    if (window.event && (window.event.ctrlKey || window.event.shiftKey)) {
      return [filter] // single select
    } else {
      filters.push(filter); return filters // add select
    }
  },
  on_chartDate_pretransition: function(chart) {
    const ci = chart.chartID()
    // console.log('on_chartDate_pretransition() id:'+ci);

    const is_comp = m_.composite.chartID() === ci
    const flt = m_.chartName.filters()
    const pref_mode = flt.length > 1
    if (is_comp) {
      m_.chartLegendUpdate(chart)
      const o = $('#chart_date g.dc-legend-item')
      o.filter(':contains("週間")').show().attr('transform', 'translate(90,0)')
    } else {
      const o2 = $('#chart_date2 g.dc-legend-item')
      if (pref_mode) {
        for (var i = 0; i < flt.length; i++) {
          o2.filter(':contains("' + flt[i] + '")').show()
        }
      } else {
        // chart_date2 の県名表示
        for (var i = 0; i < flt.length; i++) {
          o2.filter(':contains("' + flt[i] + '")').show()
        }
      }
    }

    if (m_.data_type) {
      // 緊急事態宣言 縦ライン表示
      m_.renderVLine(chart, [
        { cls: ['s1'], x: new Date(YMD_ED_F[0][0]) },
        { cls: ['s2'], x: new Date(YMD_ED_F[1][0]) },
        { cls: ['s2'], x: new Date(YMD_ED_F[2][0]) },
        { cls: ['s2'], x: new Date(YMD_ED_F[3][0]) },
        { cls: ['s3'], x: new Date(YMD_ED_F[4][0]) }
      ])
    }

    if (!is_comp) return

    // StackBarチャートを選択したらフィルタがかかるようにする
    chart.selectAll('rect.bar').on('click', function(d) {
      // chart.filter(null).filter(d.data.key).redrawGroup();//単一選択
      chart.filter(d.data.key).redrawGroup()// 追加選択
      // chart.filter(multikey(d.x, d.layer));//子供項目選択
      m_.barChartRedrawGroup(chart)
    })

    if (m_.is_drawJapanMap) drawJapanMap()
    m_.is_drawJapanMap = 1

    const ft = m_.getFilterTxt()

    let fth = ft.join(' ').trim()
    $('.hdr_flt').text((fth === '' ? '全国' : fth) + 'の状況')
    if (m_.get.light !== undefined) {
      $('head title').text((fth === '' ? '全国' : fth) + 'の状況 - 新型コロナウイルス感染状況')
    }
    if (m_.sel_tab === 'tabs_c') {
      ft[1] = ''; fth = ft.join(' ').trim()
      $('.hdr_flt_map').text(fth === '' ? '' : fth + 'の状況')
    }

    ft[2] = ''; ft[0] = ''; fth = ft.join(' ').trim()
    // if (fth !== '') {//COMMENT_VUE
    //     if (m_.last_fth !== fth) {
    //         $('#chk_tbl_spkflt')
    //             .checkboxradio({ label: '<i class="fa fa-filter"></i>[' + fth + ' ]' + (IS_SP ? '<BR>' : '') + 'でフィルタ' })
    //             //.checkboxradio('refresh')
    //             .prop('checked', true).trigger('click') //off
    //             ;
    //     }
    //     $('#chk_tbl_spkflt_l').show();
    // } else {
    //     $('#chk_tbl_spkflt_l').hide();
    // }
    m_.last_fth = fth

    app.pnl.date.cnt = php.number_format(m_.ndx.groupAll().reduceSum(d => { return d[D_CNT] || 1 }).value())

    const all = m_.gpDate.all()
    if (all.length >= 1) {
      let d, d1
      if (1) {
        for (i = all.length - 1; i >= 0; i--) if (all[i].value !== 0) break // 最終更新日付の場合
        d = all[i]
        d1 = all[i - 1]
      } else {
        d = all[all.length - 1]// 最終日
        d1 = all[all.length - 2]// 最終日-1
      }
      if (d) {
        app.pnl.date.cnt_day = moment(d.key).format('YYYY/M/D(ddd)') + '時点'
        const h = d.value - d1.value
        app.pnl.date.cnt_one = (h >= 0 ? '+' : '') + php.number_format(h)// 前日比：日別
      }
    } else {
      app.pnl.date.cnt_one = ''
      app.pnl.date.cnt_day = ''
    }
    // m_.gpDateYMMax=_.maxBy(all, function(o) { return o.value; });
  },
  on_chart_filtered: function(chart, v) {
    const ci = chart.chartID()
    // console.log('on_chart_filtered() id:'+ci);

    if (chart.filters().length && $('#ui-datepicker-div').is(':visible')) {
      m_.datePick.datepicker('show')
    }

    // 職業チャートの(カテゴリ表示|詳細表示)の切り替え
    if (ci === m_.chartName.chartID() || ci === m_.chartCity.chartID() || ci === m_.chartDate.chartID()) {
      if (m_.is_job_cate) {
        const fn = m_.chartName.filters()
        const fc = m_.chartCity.filters()
        const fd = m_.chartDate.filters()
        if (fn.length || fc.length || fd.length) {
          const o = $('#chart_job_title_sub')
          if (o.text() === '') {
            $('#chart_job_title_sub').text('(詳細)')
            m_.chartJob.dimension(m_.dimJob).group(m_.gpJob).render()
          }
        } else {
          const o = $('#chart_job_title_sub')
          if (o.text() === '(詳細)') {
            $('#chart_job_title_sub').text('')
            m_.chartJob.dimension(m_.dimJobCat).group(m_.gpJobCat).render()
          }
        }
      }
    }

    if (ci === m_.chartName.chartID()) {
      m_.chartCity.filterAll()
      m_.mapSetSelectedRegions()
    }
    $('.jvectormap-tip').hide()
  },
  on_chart_postRedraw: function(chart) {
    chart.transitionDuration(m_.config.cJob.TD)
    chart.render()
  },
  chartDateLegendUpdate2: function() {
    const flt_len = m_.chartName.filters().length
    const pref_mode = flt_len !== 0
    m_.composite2.legend().y(pref_mode ? -30 : 0)
  },
  renderAllChart: function() {
    if (!m_.config.cDateYm.is_elasticY) {
      m_.chartDate.y(d3.scaleLinear().domain([0, _.max(_.map(m_.gpDate.all(), 'value')) + 10])) // 高さ範囲再計算
    }

    dc.renderAll('chartGroup')

    m_.on_chart_postRedraw(m_.chartJob)

    // クリック時のツールチップの表示
    if (IS_SP && m_.tip) {
      // rowChartTip
      // d3.selectAll("g.row").call(m_.tipRow);
      // d3.selectAll("g.row").on('mouseover', m_.tipRow.show).on('mouseout', m_.tipRow.hide);

      // pieChartTip
      d3.selectAll('.pie-slice').call(m_.tip)
      d3.selectAll('.pie-slice').on('mouseover', m_.tip.show).on('mouseout', m_.tip.hide)

      // barChartTip
      d3.selectAll('.bar').call(m_.tip)
      d3.selectAll('.bar').on('mouseover', m_.tip.show).on('mouseout', m_.tip.hide)
    }
  },
  groupRemoveEmpty: function(group) {
    return {
      all: function() {
        return group.all().filter(function(d) {
          return d.value != 0
        })
      }
    }
  },
  group_reduce_age_set(p, age, c) {
    switch (age) {
      case DN_AGE: p.agcnt[DI_AGE_NONE] += c; break
      case 1: p.agcnt[DI_AGE_INFA] += c; break
      case 0: p.agcnt[DI_AGE_LT10] += c; break
      default: p.agcnt[(age / 10) + 1] += c; break
    }
    return p
  },
  group_reduce_lv_set(p, l, c) {
    while (1) {
      if (l.indexOf('死亡') !== -1) { p.lv_e += c; break }
      if (l.indexOf('酸投') !== -1 || l.indexOf('重症') !== -1) { p.lv_d += c; break }
      if (l.indexOf('入院') !== -1 || l.indexOf('肺炎') !== -1 || l.indexOf('中等') !== -1) { p.lv_c += c; break }
      if (l.indexOf('無症状') !== -1 || l.indexOf('退院') !== -1) { p.lv_a += c; break }
      p.lv_b += c; break
    }
    return p
  },
  chartLegendUpdate: function(chart) {
    // hideStack()したlegendは表示しない && translate() 整列
    const item = chart.legendables()
    const h = chart.legend()._legendItemHeight()
    const o2 = $(chart.anchor()).find('g.dc-legend-item'); let k = 0
    // o2=o2.filter(':not(:contains("週間"))')
    const LEGEND_HIDE_Y = -100
    item.forEach((d, i) => {
      o2.eq(i).attr('transform', `translate(${d.hidden ? -100 : 0},${d.hidden ? LEGEND_HIDE_Y : k * h})`)
      k += d.hidden ? 0 : 1
    })
  },
  dateStakShow: function(no) {
    for (var i = 0; i < CHART_DATE_STACK_GRP.length; i++) {
      for (var j = 0; j < CHART_DATE_STACK_GRP[i].length; j++) {
        if (i === no) m_.chartDate.showStack(CHART_DATE_STACK_GRP[i][j])
        else m_.chartDate.hideStack(CHART_DATE_STACK_GRP[i][j])
      }
    }
  },
  dateStack2Accessor: function(chart, no) {
    return function(d, i) {
      const flt = m_.chartName.filters()
      const pref_mode = flt.length > 1 && flt.length <= CHART_DATE_STACK2_N
      if (pref_mode) {
        m_.date_stk_nm[no] = flt[no]
        return d.value.nmcnt[flt[no]] === undefined ? 0 : d.value.nmcnt[flt[no]]
      } else {
        m_.date_stk_nm[no] = '(選択' + (no + 1) + ')'
        return 0
      }
    }
  },
  dateStack3Accessor: function(no) {
    return function(d, i) {
      return d.value.agcnt[no]
    }
  },
  chartScroll: function(sel, name, duration) {
    name = name || ''
    duration = duration === undefined ? 300 : duration
    const o = $(sel)
    if (name == '') {
      o.scrollTop(0); return
    }
    const pl = o.find('g.row:contains("' + name + '")')
    if (pl.length) {
      let top
      if (IS_SP) {
        top = pl.attr('transform').replace(')', '').split(',')[1] - 40
      } else {
        // not work iOS Safari
        const p0 = o.find('g.row:eq(0)').position()
        const p1 = pl.position()
        top = p1.top - p0.top - 40
      }
      if (duration === 0) o.scrollTop(top)
      else o.animate({ scrollTop: top }, duration, 'swing')
    }
  },
  createFilteredBarStacksData: function() {
    const prefs = _.keys(PREF_EN)
    const dimName = m_.chartName.dimension()
    // stacks[]の日付ドメインを合わせる
    m_.chartDate.x(d3.scaleTime().domain([moment(m_.spk.min_ymd).toDate(), moment(m_.spk.max_ymd).toDate()]))

    const stacks = []// stacks[pref][ymd]
    const grp = m_.chartDate.group()
    for (var i = 0; i < prefs.length; i++) {
      dimName.filter(prefs[i])
      stacks[i] = []
      _.forEach(grp.all(), (d) => {
        const ymd = moment(d.key).format('YYMD')
        stacks[i][ymd] = [d.value.lv_a, d.value.lv_b, d.value.lv_c, d.value.lv_d, d.value.lv_e]
      })
    }

    const stacks2 = []
    let from = moment(m_.spk.min_ymd); const to = moment(m_.spk.max_ymd)
    const nday = to.diff(from, 'days')
    for (var i = 0; i < prefs.length; i++) {
      stacks2[i] = []
      from = moment(m_.spk.min_ymd)
      for (var j = 0; j <= nday; j++) {
        const ymd = j == 0 ? from.format('YYMD') : from.add(1, 'days').format('YYMD')
        if (stacks[i][ymd] !== undefined) {
          stacks2[i][j] = stacks[i][ymd]
        } else {
          stacks2[i][j] = [0, 0, 0, 0, 0]
        }
      }
      stacks2[i] = stacks2[i].slice(SPARK_SX)
    }

    // rollback
    dimName.filterAll()
    if (m_.domainDate) m_.chartDate.x(d3.scaleTime().domain(m_.domainDate))

    return stacks2
  },
  getPrefCntTbl: function() {
    const pref_cnt_tbl = {}
    switch (m_.sel_tab) {
      case 'tabs_c':// 感染者数(crossfilterの影響受ける)
        const pref_cnt = m_.gpName.all()
        for (var i = 0; i < pref_cnt.length; i++) {
          pref_cnt_tbl[pref_cnt[i].key] = pref_cnt[i].value
        }
        break
      case 'tabs_p':// 現患者数
        _.forEach(m_.pref_tbl_last_m1, (p, pre_name) => {
          const n = m_.names[pre_name] ? m_.names[pre_name] : 0// 感染者数
          const patient = n - p.discharged - p.deaths// 患者数=感染者数-退院者数-死亡者数
          pref_cnt_tbl[pre_name] = patient
        })
        break
      case 'tabs_pc': // PCR検査
        _.forEach(m_.pref_tbl_last_m1, (p, pre_name) => {
          pref_cnt_tbl[pre_name] = p.pcrtested
          // PCR検査% (PCR検査数/総人口)
          pref_cnt_tbl[pre_name] = 2500 * p.pcrtested_p// ave:_.sum(_.map(m_.pref_tbl_last_m1,'pcrtested_p'))/47=0.2002127659574468% like 500 ;0.2*x=500
        })
        break
      case 'tabs_d': _.forEach(m_.pref_tbl_last_m1, (p, pre_name) => { pref_cnt_tbl[pre_name] = p.deaths }); break// 死亡者数
      case 'tabs_b': _.forEach(m_.pref_tbl_last_m1, (p, pre_name) => { pref_cnt_tbl[pre_name] = p.bed }); break// 対策病床数
    }
    return pref_cnt_tbl
  },
  loadDcData: (name) => {
    m_.get.data = name

    const get_ext = (s) => { s = s.replace(/\?.*$/, ''); return s.substr(s.lastIndexOf('.') + 1) }
    const url_query_replace = () => {
      const copy = Object.assign({}, m_.get)
      delete copy.data
      if (copy.date) copy.date = copy.date.replace(' ', '+')
      let query = 'data=' + m_.get.data.replace(/\?.*$/, '') + (_.size(m_.get) > 1 ? '&' + php.http_build_query(copy) : '')

      if (location.href.indexOf('?') !== -1 || location.href.toLowerCase().indexOf('.html') !== -1) {
        query = location.pathname + '?' + query
      } else {
        const get_ci_pathname = (pathname) => {
          if (location.pathname.indexOf('=') === -1) {
            pathname = pathname + (_.last(pathname) === '/' ? '' : '/')
          } else {
            pathname = pathname.substr(0, pathname.lastIndexOf('/') + 1)
          }
          return pathname
        }
        query = get_ci_pathname(location.pathname) + query
      }
      history.replaceState(null, null, query)
    }
    const is_csv = get_ext(m_.get.data).toLowerCase() === 'csv'
    const is_http = m_.get.data.indexOf('http') !== -1; let path = is_http ? m_.get.data : m_.url_data.path + m_.get.data

    path += ''
    let def
    if (is_csv) {
      def = d3.csv(path, (data) => {
        const row = Object.values(data)
        row[D_SEX] = parseInt(row[D_SEX])
        row[D_AGE] = parseInt(row[D_AGE])
        row[D_JOBCAT] = parseInt(row[D_JOBCAT])
        row[D_CNT] = parseInt(row[D_CNT])
        return row
      })
        .then((data) => {
          data.unshift(data.columns)
          initDc(data)
        })
        .then(() => {
          if (m_.config.url_param_data_replace) url_query_replace()
        })
    } else { // json
      def = d3.json(path)
        .then(initDc)
        .then(() => {
          if (m_.config.url_param_data_replace) url_query_replace()
        })
    }
    return def
  },
  loadAllData: () => {
    // const is_local_html = location.protocol === 'file:';
    const is_local_html = 1

    m_.composite = new dc.CompositeChart('#chart_date', 'chartGroup')
    m_.chartDate = new dc.BarChart(m_.composite)
    m_.chartLine = new dc.LineChart(m_.composite)

    m_.composite2 = new dc.CompositeChart('#chart_date2', 'chartGroup')
    m_.chartDate2 = new dc.BarChart(m_.composite2)
    m_.chartLine2 = new dc.LineChart(m_.composite2)

    m_.chartName = new dc.RowChart('#chart_name', 'chartGroup')
    m_.chartCity = new dc.RowChart('#chart_city', 'chartGroup')
    m_.chartSex = new dc.PieChart('#chart_sex', 'chartGroup')
    m_.chartWeek = new dc.BarChart('#chart_week', 'chartGroup')
    m_.chartAge = new dc.BarChart('#chart_age', 'chartGroup')
    m_.chartCond = new dc.BarChart('#chart_cond', 'chartGroup')
    m_.chartJob = new dc.BarChart('#chart_job', 'chartGroup')

    const load = (d) => {
      m_.data3 = d.data3
      m_.jobcates = d.jobcates
      m_.pref_tbl_last_m1 = d.pref_tbl_last_m1
      m_.pref_tbl_last_m2 = d.pref_tbl_last_m2

      m_.spk = d.spk

      m_.ac_data = d.ac_data
      m_.ac_data_tbl = d.ac_data_tbl

      m_.init()

      if (!is_local_html) {
        const name = m_.get.data || m_.url_data.data; m_.loadDcData(name)
      }
    }

    if (is_local_html) {
      load(g_covid19_assets)
      initDc(g_covid19_data)
    } else {
      d3.json(m_.url_data.path + m_.url_data.assets).then(load)
    }
  },
  reLoadDcData: function(name) {
    // Free memory
    m_.ndx.remove()
    m_.ndx = null

    m_.get = {}

    m_.loadDcData(name).then(() => {
      $('.btn_clear_all').trigger('click')
    })
  },
  init: function() {
    if (IS_SP && d3.tip) {
      m_.tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function() {
          return $(this).find('title').text().replace(/\n/g, '<BR>')
        })

      // m_.tipRow = d3.tip()
      //       .attr('class', 'd3-tip')
      //       .offset([-200, 10])
      //       .html(function () {
      //         return $(this).find('title').text().replace(/\n/g,'<BR>');
      //       });
    }

    initAutoComplete()

    $('#btn_search').autocomplete_ex({
      user_opt: {
        data: m_.ac_data,
        multiple: 1,
        select: function(event, ui) {
          if (ui.item[0] === '職業' || ui.item[0] === '状態') {
            $('#btn_search').val(ui.item[1]).trigger('btn_search_update')
          } else {
            const o = $('#btn_search')
            const AC_SPLIT_WD = /\s+/
            const wd = o.val().trim().split(AC_SPLIT_WD)
            if (wd.length === 1) {
              const is_pref = ui.item[0] === ui.item[1]
              o.val((is_pref ? ui.item[0] : ui.item[0] + ui.item[1]) + ' ')
            }
            o.trigger('btn_search_update')
          }
        }
      }
    })

    if (m_.get.light === undefined) {
      //initPrefTable()
    }
  }
}

const initDc = (data) => {
  m_.data_hdr = data.shift()
  m_.data = data

  // ヘッダの最終カラムから、データオプションを取得
  if (m_.data_hdr[D_OPT]) {
    const opt = {}
    php.parse_str(m_.data_hdr[D_OPT], opt)
    m_.data_type = parseInt(opt.data_type)
  } else {
    m_.data_type = 0
  }

  if (m_.data_type) {
    m_.domainDate = [moment('2020-03-20').subtract(1, 'days').toDate(), moment(m_.spk.max_ymd).add(3, 'days').toDate()]
  } else {
    const ymds = _.uniq(_.map(m_.data, D_YMD))
    m_.domainDate = [moment(_.min(ymds)).subtract(1, 'days').toDate(), moment(_.max(ymds)).add(3, 'days').toDate()]
  }

  const pl1 = _.map(data, D_PL1)
  const names_length = _.uniq(pl1).length
  m_.names = _.countBy(pl1)
  m_.citys = _.uniq(_.map(data, D_PL2))
  m_.conds = _.uniq(_.map(data, D_LV))

  const ndx = crossfilter(m_.data)
  m_.ndx = ndx
  const ndx3 = crossfilter(m_.data3)

  // ===========================================================================
  // CHART 都道府県 rowChart chartName_init
  // ===========================================================================
  m_.dimName = ndx.dimension(function(d) {
    return d[D_PL1]
  })
  m_.gpName = m_.dimName.group().reduceSum(function(d) { return d[D_CNT] || 1 })
  m_.gpName.all().forEach(v => m_.gpName_all[v.key] = v.value)

  m_.dimName2 = ndx3.dimension(function(d) {
    return d[D3_PL1]
  })

  m_.chartName
    .width(IS_SP ? parseInt(window.innerWidth / 2) + 15 : 205)
    .titleLabelOffsetX(50)
    .height(24 + (names_length * 29))
    .fixedBarHeight(24)
    .margins({ top: 0, left: 10, right: 10, bottom: 20 })
    .transitionDuration(750)
    .dimension(m_.dimName)
  // .group(m_.gpName)
    .group(m_.groupRemoveEmpty(m_.gpName)) // yAxis0件は表示しない
    .addFilterHandler(m_.addFilterHandlerSingleR)
    .on('filtered', function(chart, v) {
      const filters = chart.filters()

      // 表示スタックを切り替える
      if (app.pnl.date.stack_type !== 'age') {
        const pref_mode = filters.length > 1 && filters.length <= CHART_DATE_STACK2_N
        if (pref_mode) {
          m_.dateStakShow(1)
          app.pnl.date.stack_type = 'pre'
        } else {
          m_.dateStakShow(0)
          app.pnl.date.stack_type = 'con'
        }
      }

      // 詳細パネル
      $('#detail_div1,#detail_div2,#detail_div3,#detail_div4,#detail_div5').hide()
      const p_max = m_.names['東京都'] // == _.max(_.values(m_.names));
      for (var i = 0; i < filters.length; i++) {
        const no = i + 1
        const name = filters[i]
        const p = m_.pref_tbl_last_m1[name]
        if (p === undefined) continue

        const n = m_.names[name] ? m_.names[name] : 0
        const patient = n - p.discharged - p.deaths// 患者数=感染者数-退院者数-死亡者数
        const icon = '<img src="img/japan/' + PREF_EN[name] + '.gif">'
        const per = parseInt(100 * n / p_max)
        const bar_style = 'background: linear-gradient(to right, rgb(31, 119, 180, 0.3) ' + per + '%, #fffacd ' + per + '%, #fffacd ' + (100 - per) + '%) center center / 100% 100% no-repeat;'
        const ret = '<B>' + icon + '<a target="_blank" title="' + name + 'の wikipediaへ" href="' + m_.url_name + '/' + name + '">' + name + '</a></B><BR>' +
                    '<img style="width:180px;height:120px;object-fit: cover;object-position:0% 0%;" src="' + PREF_IMG_PATH + PREF_IMG[name] + '"><BR>' +
                    (p === undefined ? 'なし<BR>' : (
                      '<table><tbody>' +
                        '<tr><td>総人口　:</td><td>' + php.number_format(p.n) + '名</tr>' +
                        '<tr><td>感染者数:</td><td style="' + bar_style + '"> ' + php.number_format(n) + '名 <a title="人口に対する感染者率。感染者数 ÷ 総人口。">(' + (_.round(100 * n / p.n, 3)) + '%)</a></td></tr>' +
                        '<tr><td>患者数　:</td><td> ' + php.number_format(patient) + '名</td></tr>' +
                        '<tr><td>PCR検査:</td><td> ' + php.number_format(p.pcrtested) + '名 <a title="人口に対するPCR検査率。PCR検査数 ÷ 総人口。">(' + p.pcrtested_p + '%)</a></td></tr>' +
                        '<tr><td>死亡者数:</td><td> ' + p.deaths + '名</td></tr>' +
                        '<tr><td>退院者数:</td><td> ' + php.number_format(p.discharged) + '名<BR>' +
                        '<tr><td>対策病床数:</td><td> ' + php.number_format(p.bed) + '床 <a title="対策病床使用率。患者数/対策病床数。">(' + (_.round(100 * patient / p.bed, 2)) + '%)</a></td></tr>' +
                        '</tbody></table>'
                    )) +
                    '<a target="_blank" href="https://hazard.yahoo.co.jp/article/covid19' + PREF_EN[name] + '">' + name + 'コロナまとめサイト</a>'

        $('#detail_div' + no).html(ret).hide().show()
      }

      // 都道府県を一覧テーブルにもフィルタを適応
      $('#tbl_flt').val(filters.join(' ')).trigger('change')

      m_.showFilterUi('#panel_name', chart)
      m_.dateCntCreate()
      m_.on_chart_filtered(chart, v)
    })
    .on('pretransition', function(chart) {
      chart.selectAll('text.row').attr('x', 32)
      chart.selectAll('rect').attr('x', 28)
      chart.selectAll('g.row')
        .append('svg:image')
        .attr('width', '26')
        .attr('class', 'pl')
        .attr('xlink:href', function(d, i) {
          return PREF_EN[d.key] ? 'img/japan/' + PREF_EN[d.key] + '.gif' : IMG_NO
        })
        .on('click', function(d) {
          next = m_.url_name + '/' + d.key
          window.open(next)
        })
    })
    .ordinalColors(colorbrewer.Set2[8])
  // .gap(10) //default:5
    .renderLabel(true) // LeftLabel & tooltip
    .label(function(d) {
      let s = d.key
      for (var i = 0; i < 4 - d.key.length; i++) s += '　'
      s += ' '
      const is_filtered = m_.gpName_all[d.key] !== d.value
      // let p=m_.pref_tbl_last_m1[d.key];
      //       'PCR検査: '+php.number_format(p.pcrtested)+'名 ('+p.pcrtested_p+'%)<BR>'+
      //       '死亡者数: '+p.deaths+'名<BR>'+
      //       '退院者数: '+php.number_format(p.discharged)+'名<BR>'+
      //       '対策病床数: '+php.number_format(p.bed)+'床 ('+(_.round(100*patient/p.bed,2)) + '%)<BR>'

      return s + php.number_format(d.value) + (is_filtered ? '' : (m_.pref_tbl_last_cnt[d.key] ? '▲' + m_.pref_tbl_last_cnt[d.key] : ''))
    })
    .renderTitleLabel(false) // RightLabel & tooltip
    .title(function(d) {
      const ret = m_.getChartnameTitle(d.key, '\n')
      return ret === '' ? d.value : ret
    })
    .elasticX(true)

  m_.chartName.xAxis().ticks(0)// .tickFormat(d3.format("s"));

  // ===========================================================================
  // CHART 市区町村 rowChart chartCity_init
  // ===========================================================================
  const dimCity = ndx.dimension(function(d) {
    return d[D_PL2]
  })
  const gpCity = dimCity.group().reduceSum(function(d) {
    return d[D_PL2] === DN_PL2 ? 0 : d[D_CNT] || 1
  })
  // gpCity.all().forEach( v=>m_.gpCity_all[v.key]=v.value );

  m_.chartCity
    .width(IS_SP ? parseInt(window.innerWidth / 2) - 30 : 190)
    .height(24 + (Object.keys(gpCity.all()).length * 29))
    .fixedBarHeight(24)
    .margins({ top: 0, left: 10, right: 10, bottom: 20 })
    .transitionDuration(750)
    .dimension(dimCity)
    .group(m_.groupRemoveEmpty(gpCity)) // yAxis0件は表示しない
  // .group(gpCity) //yAxisすべて表示
    .addFilterHandler(m_.addFilterHandlerSingleR)
    .ordinalColors(colorbrewer.Paired[9]) // Set3[12] //Set2[8] //Set1[9]
    .renderLabel(true) // LeftLabel
  // .label(function(d) {
  //     let is_filtered = m_.gpCity_all[d.key]!==d.value;
  //     const n=is_filtered?8:6;
  //     let s=d.key.substr(0,n);
  //     for (var i = s.length; i < n+1; i++) s+='　';
  //     return s+d.value + (is_filtered ? '' : (m_.pref_tbl_city_cnt[d.key] ? '▲'+m_.pref_tbl_city_cnt[d.key] : '' ));
  // })
    .renderTitleLabel(true) // RightLabel & tooltip
    .titleLabelOffsetX(20)
    .title(function(d) {
      return d.value
    })
    .elasticX(true)
    .on('filtered', function(chart, v) {
      m_.showFilterUi('#panel_city', chart)//, (f)=>moment(f).format('M/D(ddd)'));
      m_.dateCntCreate()
      m_.on_chart_filtered(chart, v)
    })

  m_.chartCity.xAxis().ticks(0) // .tickFormat(d3.format("d"))

  // ===========================================================================
  // CHART 感染者数(YYYY-MM-DD) barChart chartDate_init
  // ===========================================================================
  const dimDate = ndx.dimension(function(d) {
    return d3.timeDay(new Date(d[D_YMD]))
  })
  m_.gpDate = dimDate.group().reduceSum(function(d) { return d[D_CNT] || 1 })
  m_.dateCntCreate()

  const gpDateStk = dimDate.group().reduce(m_.group_reduce.append, m_.group_reduce.remove, m_.group_reduce.init)
  // .order(function(d) {return d.total;});

  m_.chartDate
    .centerBar(false)
    .transitionDuration(750)
    .dimension(dimDate)
    .group(gpDateStk, CND_LV_A, (d) => d.value.lv_a)
    .stack(gpDateStk, CND_LV_B, (d) => d.value.lv_b)
    .stack(gpDateStk, CND_LV_C, (d) => d.value.lv_c)
    .stack(gpDateStk, CND_LV_D, (d) => d.value.lv_d)
    .stack(gpDateStk, CND_LV_E, (d) => d.value.lv_e)
    .hidableStacks(false) // stackNameLegend click でタックを非表示または表示
    .yAxisPadding('12%')
  // .useRightYAxis(IS_SP)         // .elasticX(true)
  // .xAxisPadding(2)
  // .xAxisPaddingUnit()
    .renderLabel(true)
    .label(function(d, i) {
      const ymd = moment(d.x).format('YYYYMMDD')

      return (d.data.value.total === m_.dateCntMax || // 最大
                ymd === m_.dateCntTo // 最新日付
                //  ||ymd===moment(m_.dateCntTo).subtract(1, 'days').format('YYYYMMDD') //最新日付-1days
      ) ? (d.data.value.total === 0 ? '' : php.number_format(d.data.value.total)) : ''
      // return m_.gpDateYMMax.value===d.data.value.total ? d.data.value.total : '';
    })
  // .title(function(d) {//mouseホバーしたときの表示される文字
  //     return moment(d.key).format('YYYY/MM/DD')+' : '+d.value+'名';
  // })
  // .y(d3.scaleLinear().domain([0, 50]))
    .ordinalColors(COL_CND.concat(COL_NAME).concat(COL_AGE))
    .gap(!IS_SP ? -6 : -4).on('filtered', function(chart, v) {
      // m_.showFilterUi('#panel_date',chart,(f)=>moment(f).format('M/D(ddd)'));
      m_.on_chart_filtered(chart, v)
    })

  // m_.chartDate.yAxis().ticks(5); //tickFormat(d3.format("s"));

  for (var no = 0; no < CHART_DATE_STACK2_N; no++) {
    m_.date_stk_nm[no] = '(選択' + (no + 1) + ')'
    m_.chartDate.stack(gpDateStk, CHART_DATE_STACK_GRP[1][no], m_.dateStack2Accessor(m_.chartDate, no))
  }
  for (var no = 0; no < DI_AGE_MAX; no++) {
    m_.chartDate.stack(gpDateStk, CHART_DATE_STACK_GRP[2][no], m_.dateStack3Accessor(no))
  }

  m_.dateStakShow(0)
  m_.pref_tbl_last_cnt = _.last(m_.chartDate.group().all()).value.nmcnt

  // ===========================================================================
  // CHART lineChart chartLine_init
  // ===========================================================================
  m_.chartLine
    .dimension(dimDate)
    .colors('red')
    .group(m_.gpDate, '週間移動平均')
  // .useRightYAxis(IS_SP)
  // .yAxisPadding('40%')
    .valueAccessor(function(d, no) {
      const N = 7// N日 移動平均
      if (no === 0) {
        m_.work = _.values(_.mapValues(m_.gpDate.all(), d => d.value))
      }
      const i = no - N + 1
      const v = m_.work.slice(i < 0 ? 0 : i, i + N)
      const ave = Math.round(_.sum(v) / N)
      return ave
    })
  // .dashStyle([2,2])

  // m_.chartLine.yAxis().ticks(5);

  // ===========================================================================
  // CHART composite_init
  // ===========================================================================
  let chartDateW = 1290
  if (IS_SP) chartDateW = window.innerWidth + 500

  m_.composite
    .width(chartDateW)
    .height(250)
  // 左
  // .margins({top: 0, right: 0, bottom: 20, left: 30})
  // .legend(dc.legend().x(40).y(0))
  // 右
    .margins({ top: 0, right: 0, bottom: 20, left: 35 })
    .legend(dc.legend().x(IS_SP ? chartDateW - 350 : 60).y(0).legendText((d) => {
      const sel_no = d.name.split(':')
      return sel_no.length === 2 ? m_.date_stk_nm[sel_no[1]] : d.name
    }))
    .x(m_.domainDate ? d3.scaleTime().domain(m_.domainDate) : d3.scaleTime())
    .elasticX(false)
  // .round(d3.timeDay.round)
    .mouseZoomable(false)
    .xUnits(d3.timeDay)
    .renderHorizontalGridLines(true)
    .brushOn(false)
    .elasticY(m_.config.cDateYm.is_elasticY) // yAxisの高さを動的に変化させる
    .title(function(d) {
      const is_bar = isNaN(d.value)
      let s_suf = ''
      // let ymd2=moment(d.key).format('YYYYMMDD');
      // s='累計: '+m_.dateCnt[ymd2]+'名\n'; //TODO:
      while (1) {
        const ymd = moment(d.key).format('YYYY-MM-DD')
        if (ymd === YMD_ED_F[0][0]) { s_suf = YMD_ED_F[0][1]; break }
        if (ymd === YMD_ED_F[1][0]) { s_suf = YMD_ED_F[1][1]; break }
        if (ymd === YMD_ED_F[2][0]) { s_suf = YMD_ED_F[2][1]; break }
        if (ymd === YMD_ED_F[3][0]) { s_suf = YMD_ED_F[3][1]; break }
        if (ymd === YMD_ED_F[4][0]) { s_suf = YMD_ED_F[4][1]; break }
        break
      }
      const date_str = typeof (d.key) === 'object' ? moment(d.key).format('YYYY/M/D(ddd)') : d.key
      if (!is_bar) {
        // N日 移動平均
        return date_str + '\n週間移動平均: ' + php.number_format(d.value) + '名'
      }

      const flt = m_.chartName.filters()
      const pref_mode = flt.length > 1 && flt.length <= CHART_DATE_STACK2_N
      if (pref_mode) {
        let s = ''
        for (const f of flt) {
          s += d.value.nmcnt[f] ? (f + ': ' + d.value.nmcnt[f] + '名\n') : ''
        }
        return date_str + '\n────────\n' + s + (flt.length > 1 ? '────────\n計: ' + d.value.total + '名' : '') + '\n' + s_suf
      } else if (app.pnl.date.stack_type === 'age') {
        let s = ''
        for (var i = 0; i < d.value.agcnt.length; i++) {
          const per = _.round(100 * d.value.agcnt[i] / d.value.total, 1) + '%'
          const nm = CHART_DATE_STACK_GRP[2][i]
          s += php.sprintf("%' -8s", nm) + ': ' + php.sprintf("%' 3s", d.value.agcnt[i]) + '名 (' + per + ')\n'
        }
        return date_str + '\n──────────\n' + s + '──────────\n計: ' + php.number_format(d.value.total) + '名' + '\n' + s_suf
      } else {
        return date_str + '\n────────\n' +
                    (d.value.lv_a === 0 ? '' : CND_LV_A + ': ' + d.value.lv_a + '名\n') +
                    (d.value.lv_b === 0 ? '' : CND_LV_B + ': ' + d.value.lv_b + '名\n') +
                    (d.value.lv_c === 0 ? '' : CND_LV_C + ': ' + d.value.lv_c + '名\n') +
                    (d.value.lv_d === 0 ? '' : CND_LV_D + ': ' + d.value.lv_d + '名\n') +
                    (d.value.lv_e === 0 ? '' : CND_LV_E + ': ' + d.value.lv_e + '名\n') +
                    '────────\n計: ' + php.number_format(d.value.total) + '名' + '\n' + s_suf
      }
    })
    .on('renderlet', function(chart, filter) { })
    .on('pretransition', m_.on_chartDate_pretransition)
    .addFilterHandler(m_.addFilterHandlerSingle)
    .on('preRedraw', function(chart) {
      m_.chartDate.filterAll().filter([m_.composite.filters()])
    })
    .on('filtered', function(chart, v) {
      m_.showFilterUi('#panel_date', chart, (f) => moment(f).format('M/D(ddd)'))
      m_.on_chart_filtered(chart, v)
    })
    .compose([m_.chartDate, m_.chartLine])

  m_.composite.xAxis().ticks(7).tickFormat(function(s) {
    return moment(s).format('M/Dddd')
  })
  m_.composite.yAxis().ticks(5) // .tickFormat(d3.format("d"));

  // ===========================================================================
  // CHART 感染者数(YYYY-MM-DD) barChart chartDate2_init
  // ===========================================================================
  const dimDate2 = ndx3.dimension(function(d) {
    return d3.timeDay(new Date(d[D3_YMD]))
  })
  m_.gpDate2 = dimDate2.group().reduceSum(function(d) { return d[D3_CNT] })

  const gpDateStk2 = dimDate2.group().reduce(
    function date2_grp_add(p, v) {
      const pl = v[D3_PL1]; const cnt = v[D3_CNT]; const type = v[D3_TYP]
      p.all[type] += cnt
      p.pre[type][pl] = (p.pre[type][pl] || 0) + cnt
      return p
    },
    function date2_grp_remove(p, v) {
      const pl = v[D3_PL1]; const cnt = v[D3_CNT]; const type = v[D3_TYP]
      p.all[type] -= cnt
      p.pre[type][pl] = (p.pre[type][pl] || 0) - cnt
      return p
    },
    function date2_grp_init(p, v) { return { all: [0, 0, 0], pre: [{}, {}, {}] } }
  )

  m_.chartDate2
    .centerBar(false)
    .transitionDuration(750)
    .dimension(dimDate2)
    .elasticY(true)
    .group(gpDateStk2, 'PCR', function(d) {
      const flt_len = m_.chartName.filters().length
      return (flt_len == 0 && m_.chartDate2Mode === DT_PCR) ? d.value.all[DT_PCR] : 0
    })
    .stack(gpDateStk2, '死亡', function(d) {
      const flt_len = m_.chartName.filters().length
      return (flt_len === 0 && m_.chartDate2Mode === DT_DEA) ? d.value.all[DT_DEA] : 0
    })
    .stack(gpDateStk2, '患者', function(d) {
      const flt_len = m_.chartName.filters().length
      return (flt_len === 0 && m_.chartDate2Mode === DT_PAT) ? d.value.all[DT_PAT] : 0
    })
    .hidableStacks(false) // stackNameLegend click でタックを非表示または表示
    .yAxisPadding('12%')
    .renderLabel(true)
    .label(function(d, i) {
      const ymd = moment(d.x).format('YYYYMMDD')
      const flt = m_.chartName.filters()
      let total
      if (flt.length) {
        const f = _.filter(d.data.value.pre[m_.chartDate2Mode], (k, v) => flt.includes(v))// m_.chartNameフィルタでされた物だけ抽出
        total = _.sum(f)
      } else {
        total = d.data.value.all[m_.chartDate2Mode]
      }
      if (total === 0) return ''
      // 最大                     最新日付
      return (m_.dateCntMax2Ymd.includes(ymd) || ymd === m_.dateCntTo2) ? php.number_format(total) : ''
    })
    .ordinalColors(_.concat(DT_COL, _.concat(colorbrewer.Set1[3], colorbrewer.Set1[6])))
    .gap(!IS_SP ? -6 : -4).on('filtered', function(chart, v) {
      // m_.showFilterUi('#panel_date',chart,(f)=>moment(f).format('M/D(ddd)'));
      m_.on_chart_filtered(chart, v)
    })

  // m_.chartDate.yAxis().ticks(5); //tickFormat(d3.format("s"));
  function date2_sel_stack(chart, no) {
    return function(d, i) {
      const flt = m_.chartName.filters()
      const pref_mode = flt.length > 0
      if (pref_mode) {
        const flt_name = flt[no - 1]
        chart.stack()[CHART_DATE2_STACK1_N + no - 1].name = flt_name
        return (d.value.pre[m_.chartDate2Mode][flt_name] || 0)
      } else {
        chart.stack()[CHART_DATE2_STACK1_N + no - 1].name = '(選択' + no + ')'
        return 0
      }
    }
  }

  for (var no = 1; no < CHART_DATE2_STACK2_N; no++) {
    m_.chartDate2.stack(gpDateStk2, '(選択' + no + ')', date2_sel_stack(m_.chartDate2, no))
  }

  // ===========================================================================
  // CHART lineChart chartLine2_init
  // ===========================================================================
  m_.chartLine2
    .dimension(dimDate2)
    .colors('red')
    .group(m_.gpDate2, '週間移動平均')
  // .useRightYAxis(IS_SP)
  // .yAxisPadding('40%')
    .valueAccessor(function(d, no) {
      const N = 7// N日 移動平均
      if (no === 0) {
        const flt = m_.chartName.filters()
        m_.work = []
        m_.dateCntTo2 = '00000000'
        m_.dateCntMax2Ymd = []

        if (flt.length) {
          m_.chartDate2.group().all().forEach((v) => {
            const f = _.filter(v.value.pre[m_.chartDate2Mode], (k, v) => flt.includes(v))// m_.chartNameフィルタでされた物だけ抽出
            const s = _.sum(f)
            m_.work.push(s)

            const ymd = moment(v.key).format('YYYYMMDD')
            if (s > 0 && ymd > m_.dateCntTo2) m_.dateCntTo2 = ymd

            if (s === m_.dateCntMax2) {
              m_.dateCntMax2Ymd.push(ymd)
            }
          })
        } else {
          m_.chartDate2.group().all().forEach((v) => {
            const s = v.value.all[m_.chartDate2Mode]
            m_.work.push(s)
            const ymd = moment(v.key).format('YYYYMMDD')
            if (s > 0 && ymd > m_.dateCntTo2) m_.dateCntTo2 = ymd
          })
        }
        if (m_.chartDate2Mode === DT_PAT) {
          app.pnl.date.chart2.cnt = php.number_format(_.last(m_.work))
        } else {
          app.pnl.date.chart2.cnt = php.number_format(_.sum(m_.work))
        }
        m_.dateCntMax2 = _.max(m_.work)
      }
      const i = no - N + 1
      const v = m_.work.slice(i < 0 ? 0 : i, i + N)
      const ave = Math.round(_.sum(v) / N)
      return ave
    })
  // .dashStyle([2,2])

  // m_.chartLine.yAxis().ticks(5);

  // ===========================================================================
  // CHART composite2_init
  // ===========================================================================
  m_.composite2
    .width(chartDateW)
    .height(160)
  // 左
  // .margins({top: 0, right: 0, bottom: 20, left: 30})
  // .legend(dc.legend().x(40).y(0))
  // 右
    .margins({ top: 0, right: 0, bottom: 20, left: 30 })
    .legend(dc.legend().x(IS_SP ? chartDateW - 350 : 60).y(0))
    .x(m_.domainDate ? d3.scaleTime().domain(m_.domainDate) : d3.scaleTime())
    .elasticX(false)
  // .round(d3.timeDay.round)
    .mouseZoomable(false)
    .xUnits(d3.timeDay)
    .renderHorizontalGridLines(true)
    .brushOn(false)
    .elasticY(m_.config.cDateYm.is_elasticY) // yAxisの高さを動的に変化させる
    .title(function(d) {
      const is_bar = isNaN(d.value)
      let s_suf = ''
      while (1) {
        const ymd = moment(d.key).format('YYYY-MM-DD')
        if (ymd === YMD_ED_F[0][0]) { s_suf = YMD_ED_F[0][1]; break }
        if (ymd === YMD_ED_F[1][0]) { s_suf = YMD_ED_F[1][1]; break }
        if (ymd === YMD_ED_F[2][0]) { s_suf = YMD_ED_F[2][1]; break }
        if (ymd === YMD_ED_F[3][0]) { s_suf = YMD_ED_F[3][1]; break }
        if (ymd === YMD_ED_F[4][0]) { s_suf = YMD_ED_F[4][1]; break }
        break
      }
      const date_str = typeof (d.key) === 'object' ? moment(d.key).format('YYYY/M/D(ddd)') : d.key
      if (!is_bar) {
        return date_str + '\n週間移動平均: ' + php.number_format(d.value) + '名'
      }

      const flt = m_.chartName.filters()
      if (flt.length > 0) {
        let s = ''
        const nmcnt = d.value.pre[m_.chartDate2Mode]
        let total = 0
        for (const f of flt) {
          s += nmcnt[f] ? (f + ': ' + php.number_format(nmcnt[f]) + '名\n') : ''
          total += nmcnt[f]
        }
        return date_str + '\n────────\n' + s + (flt.length > 1 ? '────────\n計: ' + php.number_format(total) + '名' : '') + '\n' + s_suf
        // }else if(flt.length==0){
        //     return date_str+'\n:'+d.value.total+'名 (全国)'+'\n'+s;
      } else {
        return date_str + '\n────────\n' +
                    '全国 計: ' + (d.value.all[m_.chartDate2Mode] === 0 ? '' : php.number_format(d.value.all[m_.chartDate2Mode]) + '名\n') + s_suf
      }
    })
    .on('renderlet', function(chart, filter) { })
    .on('pretransition', m_.on_chartDate_pretransition)
    .addFilterHandler(m_.addFilterHandlerSingle)
    .on('preRedraw', function(chart) {
      // フィルタを追加選択(CTRL+)した時、chartDateのフィルタには追加されない(bug?)ので、ここでcompositeのフィルタをコピー
      m_.chartDateLegendUpdate2()
      m_.chartDate2.filterAll().filter([m_.composite2.filters()])
    })
    .on('filtered', function(chart, v) {
      m_.showFilterUi('#panel_date', chart, (f) => moment(f).format('M/D(ddd)'))
      m_.on_chart_filtered(chart, v)
    })
    .compose([m_.chartDate2, m_.chartLine2])

  m_.composite2.xAxis().ticks(7).tickFormat(function(s) {
    return moment(s).format('M/Dddd')
  })
  m_.composite2.yAxis().ticks(5).tickFormat(d3.format('~s'))// 1.5k

  // ===========================================================================
  // CHART 性別 pie chartSex_init
  // ===========================================================================
  const dimSex = ndx.dimension(function(d) {
    return d[D_SEX]
  })
  const gpSex = dimSex.group().reduceSum(function(d) { return 1 /* d.cnt*;*/ })

  const chartSexW = 148
  const chartSexH = 158

  m_.chartSex
    .width(chartSexW)
    .height(chartSexH)
    .cx(parseInt(chartSexW / 2))
    .externalRadiusPadding(18)
    .innerRadius(15)
    .slicesCap(3) // 分割数
    .dimension(dimSex)
    .group(gpSex)
    .addFilterHandler(m_.addFilterHandlerSingle)
    .filterPrinter(function(filters) {
      return filters.map(function(f) { return SEX_LABEL[f] }).join(', ')
    })
    .on('filtered', function(chart, v) {
      m_.dateCntCreate()
      m_.on_chart_filtered(chart, v)
    })
    .ordering(function(t) {
      return -t.value // 昇順
    })
    .colors(function(d) { return COL_SEX[d] })
    .renderLabel(true)
    .label(function(d) {
      if (d.key === 'empty') return ''
      return SEX_LABEL[d.key] + ':' + php.number_format(d.value)
    })
    .title(function(d) {
      if (d.key === 'empty') return ''
      return SEX_LABEL[d.key] + ': ' + php.number_format(d.value) + '名'
    })
  // .legend(dc.legend())

  // ===========================================================================
  // CHART 曜日 chartWeek_init
  // ===========================================================================
  const dimWeek = ndx.dimension(function(d) {
    return new Date(d[D_YMD]).getDay() // 0~6 日~
  })
  const gpWeek = dimWeek.group().reduce(m_.group_reduce_light.append, m_.group_reduce_light.remove, m_.group_reduce_light.init).order(function(d) {
    return d.total
  })
  // gpWeek=m_.groupRemoveEmpty(gpWeek);//xAxis0件は表示しない

  let chartWeekW = 350
  if (IS_SP) {
    chartWeekW = window.innerWidth - $('#chart_sex').width() - 40
    $('#chart_week').css('width', (chartWeekW + 5) + 'px')
  }
  const chartWeekH = 148

  m_.chartWeek
    .width(chartWeekW)
    .height(chartWeekH)
    .margins({ top: 0, right: 0, bottom: 20, left: 40 })
    .gap(6)
    .transitionDuration(750)
    .dimension(dimWeek)
    .group(gpWeek, CND_LV_A, d => d.value.lv_a)
    .stack(gpWeek, CND_LV_B, d => d.value.lv_b)
    .stack(gpWeek, CND_LV_C, d => d.value.lv_c)
    .stack(gpWeek, CND_LV_D, d => d.value.lv_d)
    .stack(gpWeek, CND_LV_E, d => d.value.lv_e)
    .xUnits(dc.units.ordinal)
    .elasticX(true)
    .filterPrinter(function(filters) {
      return filters.map(function(f) { return WEEK_LABEL[f] }).join(', ')
    })
    .x(d3.scaleOrdinal())
    .y(d3.scaleLinear().domain([0, 100000]))
    .elasticY(true)
    .yAxisPadding('25%')
    .on('filtered', function(chart, v) {
      // m_.showFilterUi('#panel_job',chart);
      m_.dateCntCreate()
      m_.on_chart_filtered(chart, v)
    })
  // .mouseZoomable(true)
  // .ordering(function(t){return -t.value.count;})//desc
    .renderHorizontalGridLines(true)
    .ordinalColors(COL_CND)
    .renderLabel(true)
    .label(function(d) {
      return d.data.value.total
    })
    .title(function(d) { // mouseホバーしたときの表示される文字
      return WEEK_LABEL[d.key] + '\n────────\n' +
                (d.value.lv_a === 0 ? '' : CND_LV_A + ': ' + d.value.lv_a + '名\n') +
                (d.value.lv_b === 0 ? '' : CND_LV_B + ': ' + d.value.lv_b + '名\n') +
                (d.value.lv_c === 0 ? '' : CND_LV_C + ': ' + d.value.lv_c + '名\n') +
                (d.value.lv_d === 0 ? '' : (CND_LV_D + ': ' + d.value.lv_d + '名\n')) +
                (d.value.lv_e === 0 ? '' : (CND_LV_E + ': ' + d.value.lv_e + '名\n')) +
                '────────\n計: ' + d.value.total + '名'
    })
  // .legend(dc.legend())

  m_.chartWeek.xAxis().tickFormat((d) => WEEK_LABEL[d])
  m_.chartWeek.yAxis().ticks(4)

  // ===========================================================================
  // CHART 年齢 barChart chartAge_init
  // ===========================================================================
  const dimAge = ndx.dimension(function(d) {
    return d[D_AGE]
  })

  const gpAge = dimAge.group().reduce(m_.group_reduce_light.append, m_.group_reduce_light.remove, m_.group_reduce_light.init).order(function(d) {
    return d.total
  })

  let chartAgeW = 504
  if (IS_SP) chartAgeW = window.innerWidth - 20

  m_.chartAge
    .width(chartAgeW)
    .height(chartSexH)
    .transitionDuration(750)
    .margins({ top: 0, right: 0, bottom: 20, left: 40 })
    .dimension(dimAge)
    .on('filtered', function(chart, v) {
      m_.dateCntCreate()

      // 表示スタックを切り替える
      // if(m_.chartName.filters().length === 0)
      {
        if (m_.chartAge.filters().length === 0) {
          app.pnl.date.stack_type = 'con'
        } else {
          app.pnl.date.stack_type = 'age'
        }
      }
      m_.on_chart_filtered(chart, v)
    })
    .group(gpAge, CND_LV_A, (d) => d.value.lv_a)
    .addFilterHandler(m_.addFilterHandlerSingleR)
    .stack(gpAge, CND_LV_B, (d) => d.value.lv_b)
    .stack(gpAge, CND_LV_C, (d) => d.value.lv_c)
    .stack(gpAge, CND_LV_D, (d) => d.value.lv_d)
    .stack(gpAge, CND_LV_E, (d) => d.value.lv_e)
    .renderLabel(true)
  // .label(function(d) {return php.number_format(d.data.value.total);})
    .legend(dc.legend().x(60).y(0)) // 左
    .title(function(d) {
      return m_.ageTickFormat(d.key) + '\n────────\n' +
                (d.value.lv_a === 0 ? '' : CND_LV_A + ': ' + d.value.lv_a + '名\n') +
                (d.value.lv_b === 0 ? '' : CND_LV_B + ': ' + d.value.lv_b + '名\n') +
                (d.value.lv_c === 0 ? '' : CND_LV_C + ': ' + d.value.lv_c + '名\n') +
                (d.value.lv_d === 0 ? '' : (CND_LV_D + ': ' + d.value.lv_d + '名\n')) +
                (d.value.lv_e === 0 ? '' : (CND_LV_E + ': ' + d.value.lv_e + '名\n')) +
                '────────\n計: ' + d.value.total + '名'
    })
  // .centerBar(true)
    .brushOn(false)
    .gap(6)
    .ordinalColors(COL_CND)
    .xUnits(dc.units.ordinal)
    .x(d3.scaleOrdinal()) // .domain(m_.places))
    .y(d3.scaleLinear().domain([0, 100000]))
    .elasticY(true)
    .yAxisPadding('20%')
    .renderHorizontalGridLines(true)
    .addFilterHandler(m_.addFilterHandlerSingleR)

  m_.chartAge.xAxis().tickFormat(m_.ageTickFormat)
  m_.chartAge.yAxis().ticks(5) // tickFormat(d3.format("s")) //Y軸の単位表記

  // ===========================================================================
  // CHART 状態 barChart chartCond_init
  // ===========================================================================
  const dimCond = ndx.dimension(function(d) {
    return d[D_LV]
  })
  const gpCond = dimCond.group().reduceSum(function(d) {
    return (d[D_LV] === DN_LV || d[D_LV] === '調査中') ? 0 : d[D_CNT] || 1
  })

  let chartCondW = 620
  if (IS_SP) chartCondW = window.innerWidth + 200

  m_.chartCond
    .width(chartCondW)
    .height(chartSexH)
    .gap(6)
    .transitionDuration(750)
    .dimension(dimCond)
    .group(m_.groupRemoveEmpty(gpCond)) // xAxis0件は表示しない
    .addFilterHandler(m_.addFilterHandlerSingleR)
    .margins({ top: 0, right: 0, bottom: 70, left: 45 })
    .xUnits(dc.units.ordinal)
    .elasticX(true)
    .x(d3.scaleOrdinal())
    .y(d3.scaleLinear().domain([0, 100000]))
    .elasticY(true)
    .yAxisPadding('18%')
    .on('postRedraw', function(chart) {
      // m_.on_chart_postRedraw(chart);
    })
    .on('renderlet', function(chart, filter) {
      _.delay(() => {
        $('#chart_cond rect.selected title').each((i, v) => {
          const a = v.textContent.split(':')
          const job = a[0].trim()
          $('#chart_cond g.axis.x text').filter(function() { return $(this).text() === job }).addClass('sel')
        })
      }, 10)
    })
  // .on('postRender', function(chart, filter){console.log('postRender');})
  // .on('preRedraw', function(chart){console.log('postRender')})
  // .on('postRedraw', function(chart){console.log('postRedraw');})
    .on('filtered', function(chart, v) {
      m_.showFilterUi('#panel_cond', chart)
      m_.dateCntCreate()
      m_.on_chart_filtered(chart, v)
    })
  // .on('zoomed', function(chart, filter){console.log('zoomed');})
  // .mouseZoomable(true)
    .ordering(function(t) {
      return -t.value
    })
    .renderHorizontalGridLines(true)
    .renderLabel(true)
  // .label(function(d) { return php.number_format(d.data.value);})
    .title(function(d) { // mouseホバーしたときの表示される文字
      return d.key + ' : ' + d.value + '名'
    })
  // .legend(dc.legend())

  if (m_.data_type) {
    m_.chartCond
      .colorAccessor(function(d) {
        const is1 = d.key.indexOf('無症状') !== -1
        const is2 = d.key.indexOf('退院') !== -1
        const is3 = d.key.indexOf('入院') !== -1
        const is4 = d.key.indexOf('肺炎') !== -1
        const is41 = d.key.indexOf('中等') !== -1
        const is5 = d.key.indexOf('酸投') !== -1
        const is6 = d.key.indexOf('重症') !== -1
        const is7 = d.key.indexOf('死亡') !== -1
        let lv
        while (1) {
          if (is7) { lv = 4; break }
          if (is5 || is6) { lv = 3; break }
          if (is4 || is3 || is41) { lv = 2; break }
          if (is2 || is1) { lv = 0; break }
          lv = 1; break
          break
        }
        return lv
      })
      .colors(function(i) {
        return COL_CND[i]
      })
  } else {
    m_.chartCond
      .colorAccessor(function(d, i) { return i })
      .colors(function(d) {
        return colorbrewer.Set3[9][d % 9]
      })
  }

  m_.chartCond.xAxis().tickFormat((d) => { return d === DN_LV ? DN_LV_STR : d })
  m_.chartCond.yAxis().ticks(4)

  // ===========================================================================
  // CHART 職業 barChart chartJob_init
  // ===========================================================================
  m_.dimJob = ndx.dimension(function(d) {
    return d[D_JOB]
  })
  m_.gpJob = m_.dimJob.group().reduceSum(function(d) {
    return d[D_JOB] === DN_JOB ? 0 : d[D_CNT] || 1
  })
  m_.gpJob = m_.groupRemoveEmpty(m_.gpJob)// xAxis0件は表示しない

  const j = _.uniq(_.map(m_.data, D_JOBCAT))
  m_.is_job_cate = !(j.length === 1 && j[0] === DN_JOBCAT)

  let chartJobW
  if (m_.is_job_cate) {
    m_.dimJobCat = ndx.dimension(function(d) {
      return m_.jobcates[d[D_JOBCAT]]
    })
    m_.gpJobCat = m_.dimJobCat.group().reduceSum(function(d) {
      return d[D_JOBCAT] === DN_JOBCAT ? 0 : d[D_CNT] || 1
    })
    m_.gpJobCat = m_.groupRemoveEmpty(m_.gpJobCat)// xAxis0件は表示しない
    chartJobW = m_.gpJobCat.all().length * m_.config.cJob.barWidth
  } else {
    chartJobW = m_.gpJob.all().length * m_.config.cJob.barWidth
  }

  m_.chartJob
    .width(chartJobW)
    .height(200)
    .gap(4)
    .transitionDuration(m_.config.cJob.TD)
    .dimension(m_.is_job_cate ? m_.dimJobCat : m_.dimJob)
    .group(m_.is_job_cate ? m_.gpJobCat : m_.gpJob)
    .margins({ top: 0, right: 0, bottom: 100, left: 40 })
    .xUnits(dc.units.ordinal)
    .elasticX(true)
    .x(d3.scaleOrdinal())
    .y(d3.scaleLinear().domain([0, 100000]))
    .elasticY(true)
    .yAxisPadding('15%')
    .controlsUseVisibility(false)
    .on('postRedraw', function(chart) {
      m_.on_chart_postRedraw(chart)
    })
    .on('renderlet', function(chart) {
      _.delay(() => {
        $('#chart_job rect.selected title').each((i, v) => {
          const a = v.textContent.split(':')// 会社員: 2207名
          const job = a[0].trim()
          $('#chart_job g.axis.x text').filter(function() { return $(this).text() === job }).addClass('sel')
        })
      }, 10)
    })
    .on('pretransition', function(chart) {
      chart.transitionDuration(0)
      chart.width((chart.xUnitCount() + 1) * m_.config.cJob.barWidth)
    })
    .on('filtered', function(chart, v) {
      m_.showFilterUi('#panel_job', chart)
      m_.dateCntCreate()
      m_.on_chart_filtered(chart, v)
    })
  // .mouseZoomable(true)
    .ordering(function(t) {
      return -t.value
    })
    .renderHorizontalGridLines(true)
    .renderLabel(true)
    .colorAccessor(function(d, i) { return i })
    .colors(function(d) {
      return colorbrewer.Set3[9][d % 9]
    })
    .title(function(d) { // mouseホバーしたときの表示される文字
      return d.key + ': ' + d.value + '名'
    })
    .addFilterHandler(m_.addFilterHandlerSingle)

  m_.chartJob.xAxis().tickFormat((d) => { return d === DN_JOB ? DN_JOB_STR : d })
  m_.chartJob.yAxis().ticks(3)

  if (IS_SP) {
    $('#btn_search')
      .attr({ placeholder: 'フィルタ', title: '都道府県や市区町村、職業、状態、日付等の入力でグラフのフィルタリングが行えます。' })
      .on('focus', function(event) {
        event.preventDefault()
        $(this).css('width', '10em')
      })
      .on('blur', function(event) {
        event.preventDefault()
        $(this).css('width', '6em')
      })
  } else {
    $('#btn_search').attr({ placeholder: '都道府県や市区町村、職業、状態、日付でフィルタ', title: '都道府県や市区町村、職業、状態、日付等の入力でグラフのフィルタリングが行えます。\nショートカットキー\n　フォーカス : Ctrl+Shift+F\n　全クリア : Ctrl+Shift+L' })
  }

  m_.parseURLParams()

  if (!m_.chartAllFilterByKW_render) m_.renderAllChart()

  $('#btn_search').on('focus', function(e) {
    _.delay(() => $(this).select(), 7)
  })

  $('#div_date').scrollLeft(800)

  //
  // data_typeによる UI制御
  //
  if (m_.data_type) {
    app.pnl.map.tabs.is_show = 1
    m_.chartCity.addFilterHandler(m_.addFilterHandlerSingleR)
    m_.chartCond.addFilterHandler(m_.addFilterHandlerSingleR)
  } else {
    m_.sel_tab = 'tabs_c'
    app.pnl.date.chart2.is_show = 0
    app.pnl.city.is_show = 1
    app.pnl.week.is_show = 1

    app.pnl.map.tabs.is_show = 0
    m_.chartCity.addFilterHandler(m_.addFilterHandlerSingle)
    m_.chartCond.addFilterHandler(m_.addFilterHandlerSingle)
  }
  // タイトル変更
  app.pnl.name.title = m_.data_hdr[D_PL1]
  app.pnl.city.title = m_.data_hdr[D_PL2]
  app.pnl.date.title = m_.data_type ? '<i class="fa fa-procedures"></i>感染者数' : m_.data_hdr[D_YMD]
  app.pnl.cond.title = m_.data_hdr[D_LV]
  app.pnl.job.title = m_.data_hdr[D_JOB]

  if (m_.data_type) {
    app.pnl.date.stack_type = 'con'
  } else {
    app.pnl.date.stack_type = 'age'
  }

  if (!IS_SP) $('#btn_search').focus() // .select();
}

const initTabs = () => {
  const TAB_NO = { 'c': 1, 'p': 2, 'pc': 3, 'd': 4, 'b': 5 }

  m_.tab = $('#chart_map').tabs({
    active: m_.get['tab'] ? TAB_NO[m_.get['tab']] : 1,
    activate: function(event, ui, sel_tab/* <=user_opt*/) {
      m_.sel_tab = sel_tab || ui.newPanel.attr('id')
      switch (m_.sel_tab) {
        case 'tabs_c':
          app.pnlShowsLoadStore(1)

          m_.chartName.group(m_.gpName).render()
          app.pnl.name.title = '都道府県'
          app.pnl.date.chart2.is_show = 0
          app.pnl.date.chart2.title2 = ''
          $('#world-map').hide()
          $('#japan-map').show()
          drawJapanMap()
          const ft = m_.getFilterTxt()
          ft[1] = ''; fth = ft.join(' ').trim()
          $('.hdr_flt_map').text(fth === '' ? '' : fth + 'の状況')
          $('#legend_n').show()
          $('#legend_p').hide()
          break

        default:
          // case 'tabs_p':
          // case 'tabs_pc':
          // case 'tabs_d':

          app.pnlShowsLoadStore(0)
          app.pnl.name.is_show = 1
          app.pnl.city.is_show = 0
          app.pnl.sex.is_show = 0
          app.pnl.week.is_show = 0
          app.pnl.age.is_show = 0
          app.pnl.cond.is_show = 0
          app.pnl.job.is_show = 0

          if (m_.sel_tab === 'tabs_b') { // 病床
            app.pnl.date.is_show = 0
            app.pnl.date.chart2.is_show = 0

            gpName2 = m_.dimName2.group().reduce((p, v) => m_.pref_tbl_last_m1[v[D3_PL1]].bed, (p, v) => m_.pref_tbl_last_m1[v[D3_PL1]].bed, (p, v) => 0)
            m_.chartName.group(gpName2).render()
          } else {
            app.pnl.date.is_show = 1
            let gpName2
            switch (m_.sel_tab) {
              case 'tabs_p':
                m_.chartDate2Mode = DT_PAT
                gpName2 = m_.dimName2.group().reduce((p, v) => v[D3_CNT], (p, v) => v[D3_CNT], (p, v) => 0)
                app.pnl.name.title = '都道府県(患者)'
                app.pnl.date.chart2.title = '<i class="fa fa-procedures"></i>患者数(累計)'
                app.pnl.date.chart2.title2 = '※入院治療等を要する患者数。(感染者数から無症状、退院、死亡者数を引いた値)'
                break
              case 'tabs_pc':
                m_.chartDate2Mode = DT_PCR
                gpName2 = m_.dimName2.group().reduceSum(function(d) { return d[D3_TYP] === DT_PCR ? d[D3_CNT] : 0 })
                app.pnl.name.title = '都道府県(PCR)'
                app.pnl.date.chart2.title = '<i class="fa fa-vials"></i>PCR検査人数'
                app.pnl.date.chart2.title2 = ''
                break
              case 'tabs_d':
                m_.chartDate2Mode = DT_DEA
                gpName2 = m_.dimName2.group().reduceSum(function(d) { return d[D3_TYP] === DT_DEA ? d[D3_CNT] : 0 })
                app.pnl.name.title = '都道府県(死亡)'
                app.pnl.date.chart2.title = '死亡者数'
                app.pnl.date.chart2.title2 = ''
                break
            }
            app.pnl.date.chart2.is_show = 1
            $('#div_date2').scrollLeft($('#div_date').scrollLeft())

            m_.chartName.group(gpName2)

            // 市区町村フィルタのみの場合,都道府県フィルタないので表示より取得し設定
            const flt = m_.chartName.filters()
            const flta = m_.chartCity.filters()
            if (flt.length === 0 && flta.length) {
              const flt_from_city = []
              $('#chart_name g.row text').each(function(index, el) {
                const ken_cnt = this.textContent.replace(/[　\s]+/, ',').split(',') // ["福島県", "0"]
                if (ken_cnt[1] != 0) flt_from_city.push(ken_cnt[0])
              })
              m_.chartName.filter([flt_from_city])
            }

            m_.chartName.render()
            m_.composite2.render()
          }

          $('#world-map').hide()
          $('#japan-map').show()
          drawJapanMap()
          $('.hdr_flt_map').text('～' + moment(m_.chartDate.xAxisMax()).format('MM/DD(ddd)') + 'の状況')
          if (m_.sel_tab === 'tabs_pc') {
            $('#legend_n').hide()
            $('#legend_p').show()
          } else {
            $('#legend_n').show()
            $('#legend_p').hide()
          }
          break
        case 'tabs_w':
          location.href = 'covid19-world.html'
          break
      }
      if (!IS_SP) $('#btn_search').focus().select()
    }
  })
}

const initAutoComplete = () => {
  /**
     * class $.ui.autocomplete_ex extends $.ui.autocomplete
     */
  $.widget('ui.autocomplete_ex', $.ui.autocomplete, {
    // デフォルトオプション
    options: {
      itemMax: 16,
      minLength: 1,
      delay: 500,
      position: { my: 'left top', at: 'left bottom+12', collision: 'none' },

      _usr: {
        AC_SPLIT_WD: /\s+/
      }
    },

    _create: function() {
      this._super()
      this.widget().menu('option', 'items', '> :not(.ac_ex-cate)')
    },
    _init: function() {
      // var o=$(this.element);
      var _this = this
      // 一覧取得
      _this.source = _this.options.source = function(request, response) {
        const itemMax = this.option('itemMax')

        let kw
        if (_this.options.user_opt.multiple) {
          kw = request.term.split(_this.options._usr.AC_SPLIT_WD).pop()
        } else {
          kw = request.term
        }

        // //$.post('/api/get_pref_auto_src', request, function (d){response(d);},'json');
        // 全部表示されるのでここでfilter&slice roma考慮
        if (!kw.length) return

        response(_.filter(_this.options.user_opt.data, (d) => {
          const al = kw[0].match(/[a-z]/i) ? 1 : 0
          let hira = ''
          switch (d[0]) {
            case '職業': hira = JOB_HIRA[d[1]] || ''; break
            case '状態': hira = LV_HIRA[d[1]] || ''; break
            default: hira = PREF_HIRA[d[0] === '' ? d[1] : d[0]] || ''; break
          }
          return al ? (PREF_EN[d[0]] !== undefined && PREF_EN[d[0]].indexOf(kw) !== -1) || d[2].indexOf(kw) !== -1 : (d[0] + hira).indexOf(kw) !== -1 || d[1].indexOf(kw) !== -1
        }).slice(0, itemMax))
      }

      _this.options.focus = function(event, ui) {
        if (_this.options.user_opt.multiple) {
          const terms = this.value.trim().split(_this.options._usr.AC_SPLIT_WD)
          terms.pop()
          terms.push(ui.item[1])
          terms.push('')
          this.value = terms.join(' ')
        } else {
          this.value = ui.item[1]
        }
        return false
      }

      // 選択
      _this.options.select = function(event, ui) {
        event.preventDefault()
        let ret = ''
        if (_this.options.user_opt.select) ret = _this.options.user_opt.select(event, ui)
        // $('.ui-menu').hide();
        return ret
      }
    },
    _renderMenu: function(ul, items) {
      const that = this; let currentType = ''
      $.each(items, function(index, item) {
        let li
        if (item[0] != currentType) {
          let icon = ''
          switch (item[0]) {
            case '職業': icon = '<i class="fa fa-id-card-o" style="padding:4px"></i>'; break
            case '状態': icon = '<i class="fa fa-medkit" style="padding:4px"></i>'; break
            default:
              const src = 'img/japan/' + PREF_EN[item[0]] + '.gif'
              icon = '<img width="40" height="40" src="' + src + '" onerror="this.src=\'/' + IMG_NO + '\'" />'
              break
          }
          ul.append("<li class='ac_ex-cate'>" + icon + item[0] + '</li>')
          currentType = item[0]
        }
        li = that._renderItemData(ul, item)
        // if (item[0]) {li.attr("aria-label", item[0] + " : " + item.label);}
      })
    },
    _renderItem: function(ul, row) {
      // var o = $(this.element);
      let v = this.element.val().trim()
      if (this.options.user_opt.multiple) v = _.last(v.split(this.options._usr.AC_SPLIT_WD))
      const is_cate_none = row[0] === ''
      let html = row[1]
      const bv = '<span class="ac_ex-kwd">' + v.toUpperCase() + '</span>'
      html = html.replace(new RegExp(v, 'gi'), bv)
      if (is_cate_none) {
        const src = 'img/japan/' + PREF_EN[row[1]] + '.gif'
        icon = '<img width="40" height="40" src="' + src + '" onerror="this.src=\'/' + IMG_NO + '\'" />'
        html = icon + html
      }
      return $("<li class='ac_ex-item'>").append($('<div>').html(html + '(' + row[3] + ')')).appendTo(ul)
    }
  })
}

var map

// vectorMap
const drawJapanMap = () => {
  $('#japan-map').empty()

  const series_scale = m_.sel_tab === 'tabs_pc' ? { '0.4%以上': '#8c0a00', '0.2%以上': '#ea5432', '0.1%以上': '#ff781d', '0.05%以上': '#ff9d57', '0.01%以上': '#ffceab', '0%以上': '#ffffe0', '0%': '#dadada', '選択中': '#ffffff' } : { '1000人以上': '#8c0a00', '500人以上': '#ea5432', '100人以上': '#ff781d', '50人以上': '#ff9d57', '10人以上': '#ffceab', '1人以上': '#f5deb3', '0人': '#dadada', '選択中': '#ffffff' }

  const pref_cnt_tbl = m_.getPrefCntTbl()
  const colors = {}
  _.keys(m_.pref_tbl_last_m1).forEach(function(pre) {
    let col; const v = pref_cnt_tbl[pre]
    while (1) {
      if (v > 999) { col = MAP_COL_TBL[0][1]; break }
      if (v > 499) { col = MAP_COL_TBL[1][1]; break }
      if (v > 99) { col = MAP_COL_TBL[2][1]; break }
      if (v > 49) { col = MAP_COL_TBL[3][1]; break }
      if (v > 9) { col = MAP_COL_TBL[4][1]; break }
      if (v > 0) { col = MAP_COL_TBL[5][1]; break }
      col = MAP_COL_TBL[6][1]
      break
    }
    colors[_.capitalize(PREF_EN[pre])] = col
  })

  // param: https://jvectormap.com/documentation/javascript-api/jvm-dataseries/
  map = $('#japan-map').vectorMap({
    map: 'jp_merc',
    panOnDrag: !IS_SP,
    focusOn: {
      x: 0.45, y: 0.48,
      scale: !IS_SP ? 1.7 : 1,
      animate: false
    },
    backgroundColor: null,
    zoomOnScroll: true,
    zoomOnScrollSpeed: 1, // def:3
    zoomStep: 1.4,
    regionsSelectable: true,
    // markersSelectable: true,
    hoverOpacity: 0.7,
    regionStyle: {
      selected: {
        // fill: '#0000FF',
        // 'fill-opacity':0,
        // 'fill-rule':'evenodd',
        stroke: '#1a75ff',
        'stroke-width': 3
      }
    },
    series: {
      // case linearColor
      // regions: [{
      //   values: sample_dataJ,
      //   scale: ["#c8eeff", "#0071a4"],//blue
      //   //normalizeFunction: "polynomial" //linear|polynomial
      // }],
      // case OriginalColor
      regions: [{
        // values: sample_dataJ,
        attribute: 'fill'
      },
      // legend
      {
        scale: series_scale,
        attribute: 'fill',
        // values: {},
        legend: {
          // horizontal: true,
          vertical: true
          // title: 'Color'
        }
      }

      ]

    },

    onRegionTipShow:
            !IS_SP ? (e, el, code) => { // hover
              const pre_name = map.mapData.paths[code].name
              const html = m_.getChartnameTitle(pre_name, '<BR>')
              el.html(html)
            } : false,

    onRegionSelected: (/* e,name,is_on*/) => {
      if (m_.is_filter_region_sel) return
      // 選択を取得
      const xs = map.getSelectedRegions()
      const a = xs.map(x => map.mapData.paths[x].name)
      // 名前チャートフィルタ
      m_.chartNameFilters(a)
      m_.is_drawJapanMap = 0

      if (m_.chartName.filters().length && $('#ui-datepicker-div').is(':visible')) {
        m_.datePick.datepicker('hide')
        m_.datePick.datepicker('show')
      }
    }
    // onMarkerTipShow:(e, el, code) =>{},
    // onMarkerClick: (e, code) => {}
  })
    .vectorMap('get', 'mapObject')

  map.series.regions[0].setValues(colors)
  $('.jvectormap-legend-tick-sample:last').css({ 'border': '3px solid #1a75ff' })
  // d3.selectAll("path").call(mapTip);
  // d3.selectAll("path").on('mouseover', mapTip.show).on('mouseout', mapTip.hide);

  m_.mapSetSelectedRegions()
}

const onDocumentReady = () => {
  if (IS_SP) {
    $('#toolbar_togwin').insertAfter('#panels')
  }

  if (m_.data_type) {
    initTabs()
  }

  $('.btn_clear_all').on('click', function(e) {
    e.preventDefault()

    $('#btn_search').val('')
    $('.filter_txt').val('')
    $('.btn_brush').trigger('my_update', 1)// off

    m_.dimJob.filterAll()
    dc.filterAll('chartGroup')

    m_.is_drawJapanMap = 1
    m_.renderAllChart()

    document.querySelector('#div_name').scrollTop = 0
    document.querySelector('#div_city').scrollTop = 0

    if ($('#ui-datepicker-div').is(':visible')) m_.datePick.datepicker('show')
    if (!IS_SP) $('#btn_search').focus()
  })

  $('#btn_search')
    .on('keyup btn_search_update', function(e) {
      e.preventDefault()
      if (e.type === 'btn_search_update' || e.keyCode === $.ui.keyCode.ENTER) {
        // TODO:multiple
        const t = this.value.trim()
        if (t !== '') {
          m_.chartAllFilterByKW_render = m_.chartAllFilterByKW(t)
          _.delay(() => $('.ui-menu').hide(), 200)
        }
      }
    })

  m_.datePick = $('#btn_date').val(moment().format('YYYY/MM/DD')).datepicker({
    showOn: 'button',
    buttonText: '<i class="ui-icon ui-icon-calendar-day ui-icon-big"></i>',
    // showAnim:'fadeIn',
    // showOptions: {effect: "show",duration:3000,easing:'easeOutQuart'},
    // duration: 200,
    showOtherMonths: true,
    numberOfMonths: IS_SP ? [1, 3] : [2, 4],
    showCurrentAtPos: IS_SP ? 2 : 4 + 3,
    stepMonths: IS_SP ? 3 : 4,
    position: { // 左
      of: $(window),
      my: 'center',
      at: 'center',
      collision: 'fit fit'
    },
    onSelect: function(dateText, inst) {
      $('#btn_search').val(dateText).trigger('btn_search_update')
    },
    beforeShowDay: function(date) {
      const ret = []
      const y = date.getFullYear()
      const m = printf02d(date.getMonth() + 1)
      const d = printf02d(date.getDate())
      const ymd = y + m + d

      ret[0] = 1// is_selectable

      // 休日であれば休日のスタイルにする
      ret[1] = ($.datepicker.regional['ja'] && $.datepicker.regional['ja'].holidays[ymd] !== undefined) ? 'holiday' : ''
      const n = m_.dateCnt[ymd] || 0
      while (1) {
        if (n > 999) { ret[1] += ' c1000'; break }
        if (n > 499) { ret[1] += ' c500'; break }
        if (n > 99) { ret[1] += ' c100'; break }
        if (n > 49) { ret[1] += ' c50'; break }
        if (n > 9) { ret[1] += ' c10'; break }
        if (n > 0) { ret[1] += ' c1'; break }
        break
      }
      if (n !== 0) { ret[2] = m_.dateCnt[ymd] + '名' } // tooltip
      return ret
    },
    beforeShow: function(input, inst) {
      m_.dateCntCreate()
      // 位置を調整
      // if(!IS_SP)
      {
        var calendar = inst.dpDiv
        setTimeout(function() {
          calendar.position(
            IS_SP
              ? { my: 'left top', at: 'left bottom', collision: 'fit none', of: $('#btn_search') }
              : { my: 'left bottom', at: 'right+280 bottom', collision: 'fit fit', of: input }
          )
        }, !IS_SP ? 5 : 100)
      }
    }
  })
  $('.ui-datepicker-trigger').addClass('ui-button ui-corner-all ui-widget')

  $('.btn_reset').on('click', function(event) {
    switch ($(this).attr('id')) {
      case 'btn_reset_name': m_.chartName.filterAll(); $('#panel_name .filter_txt').text(''); m_.is_drawJapanMap = 1; dc.redrawAll('chartGroup'); break
      case 'btn_reset_city': m_.chartCity.filterAll(); $('#panel_city .filter_txt').text(''); dc.redrawAll('chartGroup'); break
      case 'btn_reset_date': m_.composite.filterAll(); m_.chartDate.filterAll(); m_.renderAllChart(); break
      case 'btn_reset_sex': m_.chartSex.filterAll(); dc.redrawAll('chartGroup'); break
      case 'btn_reset_week': m_.chartWeek.filterAll(); dc.redrawAll('chartGroup'); break
      case 'btn_reset_age': m_.chartAge.filterAll(); dc.redrawAll('chartGroup'); break
      case 'btn_reset_cond': m_.chartCond.filterAll(); dc.redrawAll('chartGroup'); break
      case 'btn_reset_job': m_.chartJob.filterAll(); dc.redrawAll('chartGroup'); break
    }
  })

  $('.btn_close').button()

  $('.btn_brush').button().on('click', function(event) {
    event.preventDefault()
    const b = m_.composite.brushOn()
    if (b) {
      $('#btn_reset_date').trigger('click')
      $('#panel_date .filter_txt_diff').text('')
    } else {
      const f = m_.composite.filters()
      if (f.length) { // 選択がある場合,最初~最後+1を選択
        const fsel = [[[f[0], moment(_.last(f)).add(1, 'days').toDate()]]]
        m_.composite.filter(fsel)
        m_.chartDate.filter(fsel)
      }
    }
    $(this).trigger('my_update', b)
  })
    .on('my_update', function(event, is_off) {
      $(this).removeClass('btn_off btn_on').addClass(is_off ? 'btn_off' : 'btn_on')
      m_.composite.brushOn(!is_off).render()
    })

  if (!IS_SP) {
    $('.drag').draggable({
      snap: true,
      snapTolerance: IS_SP ? 80 : 20,
      cursor: 'move',
      handle: '.chart-title'
    })
  }
  // $('#chart_map').resizable();

  $('#btn_download_csv').button().on('click', function(event) {
    event.preventDefault()

    const dt = m_.ndx.allFiltered()// order by pref
    // let dt=_.sortBy(m_.ndx.allFiltered(),d=>d[D_YMD]);//order by date
    let csv = m_.data_hdr.join(',') + '\n'
    const ni = m_.data_hdr.findIndex(d => d === '年齢')
    const si = m_.data_hdr.findIndex(d => d === '性別')

    for (var i = 0; i < dt.length; i++) {
      //          0    1   2   3         4       5     6        7:jobcates 8:cnt(optional)
      // ["2020-03-27", 2, 60, "退院", "東京都", "都内", "会社員", 0, 10]
      for (var j = 0; j < dt[i].length; j++) {
        csv += (j === 0 ? '' : ',')
        while (1) {
          if (j === ni) { csv += dt[i][j] === DN_AGE ? DN_AGE_STR : dt[i][1]; break }
          if (j === si) { csv += SEX_LABEL[dt[i][j]]; break }
          csv += dt[i][j]
          break
        }
      }
      if (dt[i].length === 8) csv += ',1'
      csv += '\n'
    }

    const flt_name = $('.hdr_flt').text().replace('の状況', '')
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
    const filename = (m_.data_type ? 'covid19' : 'data') + ' - [' + flt_name + '].csv'
    const blob = new Blob([bom, csv], { type: 'text/csv' })

    // IE10/11用
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, filename)
      // その他ブラウザ
    } else {
      const url = (window.URL || window.webkitURL).createObjectURL(blob)
      const download = document.createElement('a')
      download.href = url
      download.download = filename
      download.click();
      (window.URL || window.webkitURL).revokeObjectURL(url)// 開放
    }
  })

  // スクロール同期
  if (IS_SP) {
    const wL = '#div_date'
    const wR = '#div_date2'
    $(wL).on('scroll', function(event) { // wL wR sync scroll
      const wl = $(wL)
      $(wR).scrollLeft(wl.scrollLeft())
    })
    $(wR).on('scroll', function(event) { // wL wR sync scroll
      const wr = $(wR)
      $(wL).scrollLeft(wr.scrollLeft())
    })
  }

  $('.filter_txt').on('focus', function(event) {
    event.preventDefault()
    $(this).select()
  })

  $('#btn_ana').on('click', function(event) {
    event.preventDefault()
    $('#ana_diff_ls').hide().fadeIn()
  })
  $('.wopen').button().on('click', function(event) {
    event.preventDefault()
    const o = $(this)
    const w2 = parseInt(screen.width / 2) - 20
    const top = 50// for parent title bar
    if (o.find('span').hasClass('ui-icon-arrow-2-e-w')) {
      const td = o.closest('td')
      const a = td.prev().find('a')
      const b = td.next().find('a')
      const wL = window.open(a.attr('href'), 1, 'top=' + top + ',left=0,height=' + (screen.height - top * 4) + ',width=' + w2)
      const wR = window.open(b.attr('href'), 2, 'top=' + top + ',left=' + (w2 + 20) + ',height=' + (screen.height - top * 4) + ',width=' + w2)
      $(wL).on('scroll', function(event) { // wL wR sync scroll
        const wl = $(wL)
        $(wR).scrollTop(wl.scrollTop()).scrollLeft(wl.scrollLeft())
      })
      $(wR).on('scroll', function(event) { // wL wR sync scroll
        const wr = $(wR)
        $(wL).scrollTop(wr.scrollTop()).scrollLeft(wr.scrollLeft())
      })
    } else if (o.find('span').hasClass('ui-icon-arrow-2-n-s')) {
      const idx = o.closest('td').index()
      const tr = o.closest('tr')
      const a = tr.prev().find('td').eq(idx).find('a')
      const b = tr.next().find('td').eq(idx).find('a')
      const wL = window.open(a.attr('href'), 1, 'top=' + top + ',left=0,height=' + (screen.height - top * 4) + ',width=' + w2)
      const wR = window.open(b.attr('href'), 2, 'top=' + top + ',left=' + (w2 + 20) + ',height=' + (screen.height - top * 4) + ',width=' + w2)
      $(wL).on('scroll', function(event) { // wL wR sync scroll
        const wl = $(wL)
        $(wR).scrollTop(wl.scrollTop()).scrollLeft(wl.scrollLeft())
      })
      $(wR).on('scroll', function(event) { // wL wR sync scroll
        const wr = $(wR)
        $(wL).scrollTop(wr.scrollTop()).scrollLeft(wr.scrollLeft())
      })
    } else {
      const idx = o.closest('td').index()
      window.open(o.attr('href'), (idx === 0 ? 1 : 2), 'left=' + (idx === 0 ? 0 : w2 + 20) + ',top=' + top + ',height=' + (screen.height - top * 4) + ',width=' + w2)
    }
  })

  // ShortCutKey
  $(document)
    .keyup(function(e) {
      switch (e.keyCode) {
        // case $.ui.keyCode.LEFT:
        // case $.ui.keyCode.RIGHT:
        //      break;
        case 76:// Ctrl+Shift+L
          if (e.ctrlKey && e.shiftKey) {
            if (document.activeElement && document.activeElement.id === 'tbl_flt') {
              $(id).val('').trigger('change')
            } else {
              $('.btn_clear_all').trigger('click')
            }
          }
          break
        case 70:// Ctrl+Shift+F
          if (e.ctrlKey && e.shiftKey) {
            const id = document.activeElement && document.activeElement.id === 'tbl_flt' ? '#tbl_flt' : '#btn_search'
            $(id).focus().select()
          }
          break
      }
    })

  $('body')
  // titleをHTMLでpopupさせたい時
    .tooltip({
      items: '[tt_title],.tt_img',
      show: { effect: 'show', delay: 500 },
      hide: 0,
      content: function() {
        const o = $(this)
        if (o.is('.tt_img')) {
          return '<img src="' + o.attr('src') + '">'
        }
        return o.attr('tt_title')
      }
    })
}

export default {
  name: 'Dashboard',
  data() {
    return {
      pnl: {
        map: {
          is_show: IS_SP ? 1 : 1,
          title: '地図',
          // filter:''
          tabs: {
            is_show: 1
          }
        },
        name: {
          is_show: IS_SP ? 1 : 1,
          title: '都道府県'
          // filter:''
        },
        city: {
          is_show: IS_SP ? 1 : 1,
          title: '市区町村'
          // filter:''
        },
        date: {
          is_show: IS_SP ? 1 : 1,
          title: '<i class="fa fa-procedures"></i>感染者数',
          // filter:''
          stack_type: 'con', // pre|age|con
          cnt_day: '',
          cnt_one: '',
          cnt: '',
          chart2: {
            is_show: 0,
            title: '<i class="fa fa-vials"></i>PCR検査人数</span>',
            title2: '',
            cnt: ''
          }
        },
        sex: {
          is_show: IS_SP ? 0 : 1,
          title: '<i class="fa fa-venus-mars"></i>性別'
          // filter:''
        },
        week: {
          is_show: IS_SP ? 0 : 0,
          title: '曜日'
          // filter:''
        },
        age: {
          is_show: IS_SP ? 1 : 1,
          title: '年齢'
          // filter:''
        },
        cond: {
          is_show: IS_SP ? 1 : 1,
          title: '<i class="fa fa-medkit"></i>状態(現在)'
          // filter:''
        },
        job: {
          is_show: IS_SP ? 1 : 1,
          title: '<i class="fa fa-id-card-o"></i>職業'
          // filter:''
        },
        detail: {
          is_show: IS_SP ? 1 : 1,
          title: '詳細'
          // filter:''
        },
        ana: {
          is_show: IS_SP ? 0 : 0,
          is_chk_show: 1,
          title: '<i class="fa fa-eye"></i>分析'
          // filter:''
        }
      },
      pnl_shows: null
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    settingsName: () => {
      const get_pathname_trimr = (pn) => {
        const a = pn.split('/')
        return a.slice(0, a.length - 1).join('/')
      }
      return 'covid19' + get_pathname_trimr(location.pathname)
    }
  },
  watch: {
    // pnl: {
    //   handler: function (v, old){
    //     this.settingsSave();
    //   },
    //   deep: true
    // },
    'pnl.map.is_show': function() { this.settingsSave() },
    'pnl.name.is_show': function() { this.settingsSave() },
    'pnl.city.is_show': function() { this.settingsSave() },
    'pnl.date.is_show': function() { this.settingsSave() },
    'pnl.sex.is_show': function() { this.settingsSave() },
    'pnl.week.is_show': function() { this.settingsSave() },
    'pnl.age.is_show': function() { this.settingsSave() },
    'pnl.cond.is_show': function() { this.settingsSave() },
    'pnl.job.is_show': function() { this.settingsSave() },
    'pnl.detail.is_show': function() { this.settingsSave() },
    'pnl.ana.is_show': function() { this.settingsSave() },
    'pnl.date.stack_type': function(v, old) {
      switch (v) {
        case 'con': m_.dateStakShow(0); break
        case 'pre': m_.dateStakShow(1); break
        case 'age': m_.dateStakShow(2); break
      }
      m_.composite.render()
    }
  },
  mounted: function() {
    app = this
    m_.loadAllData()
    onDocumentReady()
    this.settingsLoad()
  },
  methods: {
    getPanelShows: function() {
      const o = {}
      _.forEach(this.pnl, (v, k) => {
        o[k] = { is_show: v.is_show ? 1 : 0 }
      })
      return o
    },
    settingsSave: function() {
      const shows = this.getPanelShows()
      localStorage.setItem(this.settingsName, JSON.stringify(shows))
    },
    settingsLoad: function() {
      // UI_Settings_Load
      const settings = JSON.parse(localStorage.getItem(this.settingsName))
      if (settings) {
        _.merge(this.pnl, settings)
      }
      if (m_.get.light !== undefined) {
        this.pnl.week.is_show = 1
        this.pnl.ana.is_show = 0
        this.pnl.ana.is_chk_show = 0
      }
    },
    pnlShowsLoadStore: function(is_load) {
      if (is_load) {
        const o = {}
        _.forEach(this.pnl_shows, (v, k) => {
          this.pnl[k].is_show = v.is_show
        })
        this.pnl_shows = null
      } else {
        if (this.pnl_shows === null) {
          this.pnl_shows = this.getPanelShows()
        }
      }
    }
  }
}
</script>

<style>
@import "../../../node_modules/dc/dist/style/dc.min.css"
</style>

<style>
@import "../../assets/css/jquery-ui-1.12.1.custom/themes/blitzer/jquery-ui.min.css"
</style>

<style>
@import "../../assets/css/jquery-ui-iconfont/jquery-ui-1.12.icon-font.min.css"
</style>

<style>
@import "../../assets/css/font-awesome/css/all.min.css"
</style>
<style>
@import "../../assets/css/font-awesome/css/v4-shims.min.css"
</style>

<style>
@import "../../../node_modules/jvectormap-next/jquery-jvectormap.css"
</style>
<style>
.jvectormap-container svg {
  background: #EEEEFF;
}
.jvectormap-zoomout,
.jvectormap-zoomin {
  width: 2em;
  height: 2em;
  line-height: 2em;
}

.jvectormap-zoomout {
  top: 3.5em;
}

.jvectormap-legend {
  background: rgba(128, 128, 128, 0.2);
  color: #444;
}

.jvectormap-legend-cnt-v {
  bottom: 0;
  left: auto;
  right: 0;
  top: auto;
}
#japan-map svg{
    height: 450px;
}

</style>

<style>
@import "../../assets/css/covid19.css"
</style>

<style>
.h4, h4 {
    font-size: 18px;
}
.h4, .h5, .h6, h4, h5, h6 {
    margin-top: 10px;
    margin-bottom: 10px;
}
.hdr_flt {
    margin-top: 5px;
    margin-bottom: 5px;
}
.ui-widget {
  font-size:1em;
}
</style>

<style lang="scss" scoped>
.dashboard {
  &-container {
  }
}
</style>
