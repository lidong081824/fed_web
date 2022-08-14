<template>
  <div class="app" align="center">
    <el-backtop :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        border-radius: 20px;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #8cc5ff;
      }"
      >
        <b>↑</b>
      </div>
    </el-backtop>
    <!--    <div class="headTop" @click="toHomePage">-->
    <!--      <img src="../assets/productImage/001.png" width="100%" height="80px"  />-->
    <!--    </div>-->
    <!--    <div class="searchDiv">-->
    <!--      <img src="../assets/logo.png" style="float: left;margin-top: 20px;width: 400px;margin-left: 50px;">-->
    <!--      <div style="width: 600px;height: 70px;margin-left: 597px">-->
    <!--        <div>-->
    <!--          <el-input v-model="input" style="width: 470px;margin-top: 20px;border: 1px solid red" class="input-with-select" type="text" @keyup.enter.native="enterSerch()">-->
    <!--            <el-button slot="append" style="height: 40px;width: 100px;margin-right: -21px;background-color: red" @click="serch()" @mouseover.native="mouseOver" @mouseleave.native="mouseLeave" id="search">-->
    <!--              <font style="color: white" size="2px" id="searchFont">搜索</font></el-button>-->
    <!--          </el-input>-->
    <!--          <div style="float:left;margin-left: 64px">-->
    <!--            <a href="#" style="text-decoration: none"><font style="color: #8c939d;font-size: 13px;">普通轮椅</font></a>&nbsp;&nbsp;-->
    <!--            <a href="#" style="text-decoration: none"><font style="color: #8c939d;font-size: 13px;">助行器</font></a>&nbsp;&nbsp;-->
    <!--            <a href="#" style="text-decoration: none"><font style="color: #8c939d;font-size: 13px;">坐便椅</font></a>&nbsp;&nbsp;-->
    <!--            <a href="#" style="text-decoration: none"><font style="color: #8c939d;font-size: 13px;">小腿假肢</font></a>&nbsp;&nbsp;-->
    <!--            <a href="#" style="text-decoration: none"><font style="color: #8c939d;font-size: 13px;">手持阅读器</font></a>&nbsp;&nbsp;-->
    <!--            <a href="#" style="text-decoration: none"><font style="color: #8c939d;font-size: 13px;">盒式助听器</font></a>&nbsp;&nbsp;-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <br>-->
    <!--      <br>-->

    <!--    </div>-->
    <div class="top" align="center" style="position: fixed;top: 0;width: 100%;z-index: 777">
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" style="margin-left: 17%">
          <img src="../assets/logo.png">
        </el-menu-item>
        <el-menu-item index="1" style="margin-left: 5%">首页</el-menu-item>
        <el-menu-item index="1">辅具目录</el-menu-item>
        <el-menu-item index="1" @click="allProduct">辅具产品</el-menu-item>
        <el-input v-model="keyword" style="width: 270px;margin-top: 10px" class="input-with-select" type="text" @keyup.enter.native="enterSerch()">
          <el-button slot="append" style="height: 40px;width: 55px;margin-right: -21px" @click="serch()" id="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-menu>
    </div>
    <div class="input_video" id="video">
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
      ></video-player>
    </div>
    <div class="allClassifications">
      <label style="color: red;font-size: 18px;display: none;float: left" id="count">查询到:{{this.dataCount}}种产品</label>
      <div align="left" id="ProType" style="margin-left: 0px;font-size: 17px">
        <el-tag @click="assistiveType()" style="cursor:pointer">辅具分类</el-tag>
      </div>
      <hr>
      <div class="allClassifications_Right" id="allType">
        <div class="type" v-for="item in allTypeList" :key="item" v-if="item._source.cat1_desc!= null">
          <el-link style="text-align: left" type="warning" v-bind:id="item._id" @mouseover.native="getMouseXY($event,item._source.cat1_desc)" @mouseleave.native="type2ListLose"  >{{item._source.cat1_desc}}</el-link>
        </div>
      </div>
    </div>
    <div id="type2List" @mouseover.native="type2ListBlock" @mouseleave.native="type2ListNone">
      <div class="type2" v-for="item in productType2" :key="item" v-if="item._source.cat2_desc!= null">
        <el-link target="_blank" v-bind:id="item._id" @click="toCatalogue(item._source.cat2_desc)">{{item._source.cat2_desc}}</el-link>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <div class="recommend" align="left">
        <div style="margin-left: 20px;">全部产品</div>
      </div>
      <div class="productList">
        <hr>
        <div class="briefIntroduction" v-bind:id="item._id" v-for="item in allProList" @click="toInfo(item._source.product_id)"
             :key="item" @mouseover="imgMouseOver(item._id)" @mouseleave="imgMouseLeave(item._id)">
          <div>
            <img :src=item._source.images width="100%" height="180px" />
          </div>
          <div class="proTitle"><b>{{item._source.title}}</b></div>
          <div style="font-size: 13px;text-align: left;margin-top: 10px">
            <table class="proTbl">
              <tr>
                <td style="width: 80px">品牌：</td><td class="tbl-td">{{item._source.brand_desc}}</td>
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
    </div>
    <div class="foot">
      <div class="tail2" align="left">
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
  name: 'Product',
  data () {
    return {
      allTypeList: [],
      productType2: [],
      positionX: '',
      positionY: '',
      allProList: [],
      //  视频相关参数开始
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '5:2', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: require('../assets/video/0925.mp4') // url地址
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: false // 全屏按钮
        }
      },
      // 视频相关参数结束
      keyword: '',
      dataCount: ''
    }
  },
  //      视频相关参数结束
  watch: {
    $route (to, from) {
      // 监测到路由发生跳转时刷新一次页面
      window.location.reload()
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll, true)
    // 查询所有一级分类并去重
    let typeListQuery = {
      'query': {
        'match_all': {}
      },
      '_source': ['cat1_desc'],
      'size': 10000
    }
    this.$http.get('http://43.142.36.139:9220/product/_search',
      {params: {source: JSON.stringify(typeListQuery), source_content_type: 'application/json'}}).then(res => {
      let arr = res.data.hits.hits
      const map = new Map()
      // 使用vue中的数组去重
      const newTypeList = arr.filter((arr) => !map.has(arr._source.cat1_desc) && map.set(arr._source.cat1_desc, 1))
      this.allTypeList = newTypeList
      console.log('1111', this.allTypeList)
    })
    this.$http.get('http://43.142.36.139:9220/product/_search?size=10000').then(res => {
      this.allProList = res.data.hits.hits
      console.info('54321', this.allProList)
    })
  },
  methods: {
    // 点击图标回到首页
    toHomePage () {
      alert('1')
      this.$router.push('/#/')
    },
    allProduct () {
      window.location.reload()
    },
    typeOver (id) {
      document.getElementById(id).style.backgroundColor = 'white'
      document.getElementById(id).style.color = 'red'
      document.getElementById('towTypeMune').style.display = 'block'
    },
    typeBtnLeave (id) {
      document.getElementById(id).style.backgroundColor = '#F6F6F6'
      document.getElementById(id).style.color = 'black'
      document.getElementById('towTypeMune').style.display = 'none'
    },
    // 展开收起分类
    assistiveType () {
      if (document.getElementById('allType').style.display === 'none') {
        document.getElementById('allType').style.display = 'block'
      } else {
        document.getElementById('allType').style.display = 'none'
      }
    },
    // eslint-disable-next-line camelcase
    toInfo (product_id) {
      this.$router.push({path: '/particulars', query: {productID: product_id}})
    },
    imgMouseOver (id) {
      // alert(id)
      document.getElementById(id).style.boxShadow = '0 0 20px #8c939d'
    },
    imgMouseLeave (id) {
      document.getElementById(id).style.boxShadow = '0 0 5px #8c939d'
    },
    // 一级分类指针悬停获取参数显示二级分类面板
    getMouseXY (e, name) {
      // 查询当前选择的一级分类下属的二级分类
      let secondLeveltype = {
        'query': {
          'match': {
            'cat1_desc': name
          }
        },
        '_source': ['cat2_desc'],
        'size': 1000
      }
      this.$http.get('http://43.142.36.139:9220/product/_search',
        {params: {source: JSON.stringify(secondLeveltype), source_content_type: 'application/json'}}).then(res => {
        let arr = res.data.hits.hits
        const map = new Map()
        // 使用vue中的数组去重
        const newTypeList = arr.filter((arr) => !map.has(arr._source.cat2_desc) && map.set(arr._source.cat2_desc, 1))
        this.productType2 = newTypeList
      })
      // 获取当前滚轮的位置
      this.currentScroll = window.pageYOffset
      // 获得指针所在的Y坐标
      let y = e.y
      document.getElementById('type2List').style.display = 'block'
      this.positionY = y + this.currentScroll + 2 + 'px'
      document.getElementById('type2List').style.top = this.positionY
      document.getElementById('type2List').style.left = '165px'
    },
    openType () {
      document.getElementById('allType').style.display = 'block'
    },
    closeType () {
      document.getElementById('allType').style.display = 'none'
    },
    // 二级分类面板消失
    // type2ListLose () {
    //   document.getElementById('type2List').style.display = 'none'
    // },
    // 二级分类面板指针悬停面板显示
    type2ListBlock () {
      document.getElementById('type2List').style.display = 'block'
    },
    // 二级分类指针不悬停面板消失
    type2ListNone () {
      document.getElementById('type2List').style.display = 'none'
    },
    // 跳转到三级分类详情界面
    toCatalogue (typeName) {
      this.$router.push({path: '/catalogue', query: {typeName: typeName}})
    },
    //  搜索
    serch () {
      if (this.keyword != null && this.keyword.length > 0) {
        document.getElementById('video').style.display = 'none'
        let keyQuery = {
          'query': {
            'term': {
              'title': this.keyword
            }
          },
          'size': 10000
        }
        this.$http.get('http://43.142.36.139:9220/product/_search?size=10000',
          {params: {source: JSON.stringify(keyQuery), source_content_type: 'application/json'}}).then(res => {
          this.allProList = res.data.hits.hits
          this.dataCount = this.allProList.length
          console.info('54321', this.allProList)
        })
        this.keyword = ''
        document.getElementById('ProType').style.display = 'none'
        document.getElementById('count').style.display = 'block'
      } else {
        this.$message.error('请输入要查询的内容')
      }
    }
  }
}

</script>
<style scoped>
.headTop{
  width: 100%;
  height: 70px;
}
.searchDiv{
  width: 90%;
  height: 70px;
}
.allClassifications{
  width: 90%;
  height: auto;
  margin-top: 60px;
  clear: both;
  overflow:hidden;
}
.allClassifications_Right{
  width: 100%;
  text-align: center;
  font-size: 15px;
  float: left;
  border-radius: 3px;
  box-shadow: 0 0 5px #8c939d;
  clear: both;
  overflow:hidden;
  display: none;
}
.type{
  float: left;
  margin: 10px 5px 10px 10px;
  width: 212px;
  text-align: left;
  max-width: 212px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /*border: 1px solid red;*/
}
.type2{
  float: left;
  margin: 10px 5px 10px 10px;
  width: 220px;
  text-align: left;
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#towTypeMune{
  width: 300%;
  height: 375px;
  background-color: #8cc5ff;
  margin-top: -290px;
  margin-left: 175px;
  display: none;
  z-index: 9999;
}
.el-carousel__item h3 {
  /*color: #475669;*/
  font-size: 18px;
  opacity: 0.75;
  line-height: 370px;
  margin: 0;
}
.recommend {
  width: 90%;
  height: 51px;
  background-image: url("../assets/productImage/002.jpg");
  font-size: 30px;
}
.foot{
  width: 100%;
  height: 150px;
  border-top: 1px solid black;
}
.tail2{
  width: 420px;
  margin: 0 auto;
}
#type2List{
  width: 78%;
  background-color: white;
  display: none;
  z-index: 999;
  color: black;
  position: absolute;
  box-shadow: 0 0 5px #8c939d;
}
.productList{
  width: 90%;
  margin-top: 10px;
  height: auto;
  clear: both;
  overflow:hidden;
}
.briefIntroduction{
  width: 17.8%;
  height: 370px;
  background-color: white;
  margin: 1%;
  float: left;
  border-radius: 3px;
  box-shadow: 0 0 5px #8c939d;;
}
.proTitle{
  font-size: 16px;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  width: 80%;
  text-overflow: ellipsis;
  margin-top: 5px;
}
.proTbl{
  margin-left: 10px;
  width: 98%;
  margin-top: 5px;
}
.tbl-td{
  max-width:150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/*视频相关div*/
.input_video{
  width: 90%;
  height: 500px;
}

</style>
