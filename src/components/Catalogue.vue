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
<!--    <div class="tyPro">-->
<!--      <div style="color: red;float: left;margin:10px 10px 10px 10px;border: 1px solid black">详细分类</div><br><br>-->
<!--        <div class="type2" v-for="item in ty3List" :key="item" v-if="item._source.cat3_desc!= null">-->
<!--          <el-link type="warning" v-bind:id="item._id">{{item._source.cat3_desc}}</el-link>-->
<!--        </div>-->
<!--    成功的-->
    <el-collapse v-model="ty3List" @change="handleChange" style="width: 90%">
      <el-collapse-item title="详细分类" name="1">
        <div class="type2" v-for="item in ty3List" :key="item" v-if="item._source.cat3_desc!= null">
          <el-link type="warning" v-bind:id="item._id" @click="ty3Product(item._source.cat3_desc)">{{ item._source.cat3_desc }}</el-link>
        </div>
      </el-collapse-item>
    </el-collapse>
<!--    <div  class="tyPro">-->
<!--      <div class="type2" v-for="item in ty3List" :key="item" v-if="item._source.cat3_desc!= null">-->
<!--        <el-link type="warning" v-bind:id="item._id">{{ item._source.cat3_desc }}</el-link>-->
<!--      </div>-->
<!--      <div>-->
<!--        <p v-for="item in ty3List" :key="item">-->
<!--          <span  v-html="item._source.cat3_desc"></span>-->
<!--        </p>-->
<!--      </div>-->
<!--      <div v-if="ty3List.length > 5" v-on:click="changeFoldState">-->
<!--        <span style="color: deepskyblue;margin-left: 1000px;" >{{brandFold?'查看更多':'收起'}}</span>-->
<!--      </div>-->
<!--      </div>-->
    <div class="productList">
      <div class="briefIntroduction" v-bind:id="item._id" v-for="item in ty3ProList" @click="toInfo(item._source.product_id)" :key="item" @mouseover="imgMouseOver(item._id)" @mouseleave="imgMouseLeave(item._id)">
        <div class="proImg">
          <img :src=item._source.images width="100%" height="100%" />
        </div>
        <div class="proTitle"><b>{{item._source.title}}</b></div>
        <div style="font-size: 13px;text-align: left;margin-top: 10px">
          <table class="proTbl">
            <tr>
              <td style="width: 60px">品牌：</td><td class="tbl-td">{{item._source.brand_desc}}</td>
            </tr>
            <tr>
              <td>分类：</td><td class="tbl-td">{{item._source.cat3_desc}}</td>
            </tr>
            <tr>
              <td>编码：</td><td>{{item._source.product_id}}</td>
            </tr>
            <tr>
              <td>适用人群：</td><td>{{item._source.attribute4}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
<!--    <div style="width: 90%;height: 50px" align="right">-->
<!--      <el-button type="primary" plain id="btnPlus" @click="Plus()">← 上一页 </el-button>-->
<!--      &nbsp;&nbsp;&nbsp;-->
<!--      <el-button type="primary" plain id="btnSubtract" @click="Subtract()">下一页 →</el-button>-->
<!--    </div>-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total=this.ty3ProList.length
      :page-size="8"
      :current-page.sync="fromPage">
    </el-pagination>
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
  name: 'Catalogue',
  data () {
    return {
      typeName: '',
      ty3List: [],
      brandFold: false,
      ty3ProList: [],
      fromPage: 0,
      ty3Name: ''
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
    // this.$router.go(0)
    // 根据二级分类的id查询所有三级分类
    let threeTypeList = {
      'query': {
        'match': {
          'cat2_desc': this.typeName
        }
      },
      'size': 10000
    }
    this.$http.get('http://43.142.36.139:9220/product/_search', {
      params: {source: JSON.stringify(threeTypeList), source_content_type: 'application/json'}}).then(res => {
      this.ty3ProList = res.data.hits.hits
      let arr = res.data.hits.hits
      const map = new Map()
      // 使用vue中的数组去重
      const newTypeList = arr.filter((arr) => !map.has(arr._source.cat3_desc) && map.set(arr._source.cat3_desc, 1))
      this.ty3List = newTypeList
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    gettingData () {
      console.log(this.$route.query.typeName)
      this.typeName = this.$route.query.typeName
    },
    handleChange (val) {
      console.log(val)
    },
    // 根据选择的三级分类查询所有的商品
    ty3Product (tyName) {
      this.ty3Name = tyName
      // alert(tyName)
      let ThreeTyProduct = {
        'query': {
          'match': {
            'cat3_desc': tyName
          }
        },
        'from': this.fromPage,
        'size': 8
      }
      this.$http.get('http://43.142.36.139:9220/product/_search', {
        params: {source: JSON.stringify(ThreeTyProduct), source_content_type: 'application/json'}}).then(res => {
        this.ty3ProList = res.data.hits.hits
        console.info('woshinibaba', this.ty3ProList)
      })
    },
    Plus () {
      if (this.fromPage > 0) {
        this.fromPage--
      } else {
        // 上一页按钮不可点击
        // eslint-disable-next-line no-unused-expressions
        document.getElementById('btnPlus').disabled
      }
      // alert(this.fromPage)
      this.ty3Product(this.ty3Name)
    },
    Subtract () {
      if (this.fromPage < this.ty3ProList.length) {
        this.fromPage++
      } else {
        // 上一页按钮不可点击
        // eslint-disable-next-line no-unused-expressions
        document.getElementById('btnSubtract').disabled
      }
      // alert(this.fromPage)
      this.ty3Product(this.ty3Name)
    },
    imgMouseOver (id) {
      // alert(id)
      document.getElementById(id).style.boxShadow = '0 0 20px #8c939d'
    },
    imgMouseLeave (id) {
      document.getElementById(id).style.boxShadow = '0 0 5px #8c939d'
    },
    // eslint-disable-next-line camelcase
    toInfo (product_id) {
      this.$router.push({path: '/particulars', query: {productID: product_id}})
    }
    // changeFoldState () {
    //   this.brandFold = !this.brandFold
    // }
  }
  // computed: {
  //   showdetailList: {
  //     get: function () {
  //       if (this.brandFold) {
  //         if (this.ty3List.length < 7) {
  //           return this.ty3List
  //         }
  //         let newArr = []
  //         for (var i = 0; i < 6; i++) {
  //           let item = this.ty3List[i]
  //           newArr.push(item)
  //         }
  //         return newArr
  //       }
  //       return this.ty3List
  //     },
  //     set: function (val) {
  //       this.showdetailList = val
  //     }
  //   }
  // }
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
.type2{
  float: left;
  margin: 10px 15px 10px 10px;
  width: 22%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.productList{
  width: 92.5%;
  margin-top: 10px;
  height: auto;
  clear: both;
  overflow:hidden;
  /*border: 1px solid black;*/
}
.briefIntroduction{
  width: 17.1%;
  height: 310px;
  /*border: 1px solid black;*/
  background-color: white;
  margin: 1.4%;
  float: left;
  border-radius: 3px;
  box-shadow: 0 0 5px #8c939d;;
}
.proImg{
  width: 80%;
  height: 60%;
  /*border: 1px solid black;*/
  margin-top: 10px;
  border-radius: 2px;
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
.proTitle{
  font-size: 16px;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  width: 80%;
  text-overflow: ellipsis
}
.proTbl{
  margin-left: 10px;
  max-width: 98%;
  white-space: nowrap;
  overflow: hidden;
  /*text-overflow: ellipsis;*/
}
.tbl-td{
  max-width:150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
