<template>
<div class="catalogue" align="center">
  <div class="top" align="center">
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="margin-left: 17%">
        <img src="../assets/logo.png">
      </el-menu-item>
      <el-menu-item index="1" style="margin-left: 5%">首页</el-menu-item>
      <el-menu-item index="1">辅具目录</el-menu-item>
      <el-menu-item index="1">辅具产品</el-menu-item>
      <el-input v-model="input" style="width: 270px;margin-top: 10px" class="input-with-select" type="text" @keyup.enter.native="enterSerch()">
        <el-button slot="append" style="height: 40px;width: 55px;margin-right: -21px" @click="serch()" id="search" icon="el-icon-search"></el-button>
      </el-input>
    </el-menu>
  </div>
  <el-breadcrumb style="margin-left: 15%;margin-top:10px;font-size: 16px" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/#' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/product'}">产品推荐</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/catalogue'}">分类详情</el-breadcrumb-item>
    <el-breadcrumb-item>产品详情</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="Introduce" v-for="item in productInfo" :key="item">
<!--    图片-->
    <div class="pro_img">
      <img :src=item._source.images width="100%" height="100%" />
    </div>
    <div class="synopsis">
      <table style="text-align: left;width: 100%;margin-top: 25%">
        <tr>
          <td colspan="2" style="font-size: 20px"><b>{{item._source.title}}</b></td>
        </tr>
        <tr>
          <td style="width: 100px">简介</td><td></td>
        </tr>
        <tr>
          <td style="width: 100px">产品编号：</td><td>{{item._source.product_id}}</td>
        </tr>
        <tr>
          <td style="width: 100px">所属支类：</td><td>{{item._source.cat3_desc}}</td>
        </tr>
        <tr style="color: #8c939d">
          <td style="width: 100px">branch：</td><td>{{item._source.cat3_desc_eng}}</td>
        </tr>
        <tr>
          <td style="width: 100px">产品品牌：</td><td>{{item._source.brand_desc}}</td>
        </tr>
        <tr>
          <td style="width: 100px">适用人群：</td><td>{{item._source.attribute4}}</td>
        </tr>
      </table>
    </div>
    <div class="pro_details">
<!--      <style>{{item._source.description}}</style>-->
<!--      <span v-html="asset[item._source.description]"></span>-->
      <span id="details"></span>
    </div>
  </div>
  <div class="foot">
    <div class="tail" align="left">
      <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
          <td><label style="font-size: 10px;color: black"><b>中国残联残疾人辅助器具专项研究课题示范应用</b></label></td>
        </tr>
        <tr>
          <td>
            <label style="font-size: 10px;color: #8c939d;">联系我们：
            </label><i class="el-icon-s-home"></i>
            <label style="font-size: 10px;color: #8c939d;">北京市西城区太平街甲6号 | </label>
            <i class="el-icon-headset"></i><label style="font-size: 10px;color: #8c939d"> 010-63135027</label>
          </td>
        </tr>
        <tr>
          <td><label style="font-size: 10px;color: #8c939d">技术支持：奥思特甲医疗科技（上海）有限公司 |</label></td>
        </tr>
        <tr>
          <td><label style="font-size: 10px;color: #8c939d">版权所有：中国残疾人辅助器具中心© 2021 | 备案信息:京ICP备19038775号</label></td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Particulars',
  msg: '辅具详情页',
  data () {
    return {
      productID: '',
      productInfo: []
    }
  },
  watch: {
    '$router': 'gettingData',
    $route (to, from) {
      // 监测到路由发生跳转时刷新一次页面
      window.location.reload()
    }
  },
  created () {
    this.gettingData()
  },
  mounted: function () {
    let paramInfo = {
      'query': {
        'match': {
          'product_id': this.productID
        }
      }
    }
    this.$http.get('http://43.142.36.139:9220/product/_search', {
      params: {source: JSON.stringify(paramInfo), source_content_type: 'application/json'}}).then(res => {
      this.productInfo = res.data.hits.hits
      document.getElementById('details').innerHTML = res.data.hits.hits[0]._source.description
      // document.getElementsByClassName('pro_details').innerHTML = res.data.hits.hits[0]._source.description
      // console.info(res.data.hits.hits[0]._source.description)
    })
  },
  methods: {
    gettingData () {
      this.productID = this.$route.query.productID
    }
  }
}
</script>

<style scoped>
.catalogue{
  width: 100%;
  background-color: #eef1f6;
  height: auto;
  clear: both;
  overflow:hidden;
}
.Introduce{
  width: 70%;
  height: 700px;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0 0 6px rgba(0,0,0, .12);
  margin-top: 10px;
  background-color: white;
}
.pro_img{
  width: 45%;
  height: 50%;
  box-shadow: 0 0 6px rgba(0,0,0, .12);
  margin-top: 20px;
  margin-left: 2%;
  float: left;
}
.synopsis{
  width: 47%;
  height: 50%;
  float: left;
  margin-top: 20px;
  margin-left: 2%;
}
.pro_details{
  width: 95%;
  height: 35%;
  margin-top: 400px;
  border: 1px solid black;
}
.foot{
  width: 100%;
  height: 150px;
  background-color: white;
}
.tail{
  width: 27%;
  height: 70px;
  /*border: 1px solid black;*/
  margin-top: 50px;
  margin-left: 700px;
}
</style>
