<template>
  <div class="app">
    <div class="head">
      <div class="backImg">
        <div class="headerContainer">
          <div class="HPLogo" @click="GoToHomePage()">
            <img :src="imgSrc" height="50" alt="图片">
          </div>
          <div class="rightLink">
            <a href="#" style="text-decoration: none">
              <font class="a-font">主页/home</font>
            </a>
            <a href="#/product" style="text-decoration: none">
              <font class="a-font">辅具产品/product</font>
            </a>
            <a href="#" style="text-decoration: none">
              <font class="a-font">申请加入/join</font>
            </a>
          </div>
        </div>
        <div class="search" align="center">
          <div>
            <!-- <el-input v-model="input" size="medium" class="input-with-select" type="text"
              @keyup.enter.native="enterSerch()">
              <el-button slot="append" @click="serch()"
                @mouseover.native="mouseOver" @mouseleave.native="mouseLeave" id="search">
                <font style="color: white" size="2px" id="searchFont">搜索</font>
              </el-button>
            </el-input> -->
            <div>
              <!-- 千万不要删除  style="" 神奇的bug -->
              <el-input style="" style="height: 50px;" placeholder="请输入内容" v-model="input" class="input-with-select">
                <el-button class="btn" slot="append">搜索</el-button>
              </el-input>
            </div>
          </div>
          <br>
          <el-button class="tab_btn" id="btn1">辅助器具</el-button>
          <el-button class="tab_btn" id="btn2">辅助企业</el-button>
          <el-button class="tab_btn" id="btn3">服务机构</el-button>
          <el-button class="tab_btn" id="btn4">信息资讯</el-button>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- <el-row :gutter="20" style="width: 70%;">
        <el-col :span="4" v-for="item in typeList" :key="item">
          <div class="typeInfo" v-bind:id="item._id" @mouseover="imgMouseOver(item._id)"
            @mouseleave="imgMouseLeave(item._id)">
            <div style="width: 100px;height: 100px;margin-top: 10px;">
              <img :src=item._source.img_path width="100px" height="100px" />
            </div>
            <br />
            <font style="size: 1px;color: #8c939d">{{ item._source.cate_name }}</font>
          </div>
        </el-col>
      </el-row> -->
      <div class="container" style="">
        <div style="">
          <div v-for="item in typeList" :key="item" class="item">
            <div class="content">
              <!-- item._source.img_path -->
              <img style="margin-top: 12px;" :src=getImgSrc(item._source.img_path) width="100px" height="100px" />
              <p style="padding: 0 10px;font-weight: 600;color: #777;">{{ item._source.cate_name }}</p>
            </div>
          </div>
        </div>
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
  name: 'HomePage',
  data () {
    return {
      msg: 'Welcome to 中辅具首页',
      value: [0, 4],
      activeIndex: '1',
      input: '',
      active: '',
      typeList: [],
      logoWhite: require('../assets/logo_white.png'),
      logo: require('../assets/logo.png'),
      imgSrc: undefined,
    }
  },
  watch: {
    $route (to, from) {
      // 监测到路由发生跳转时刷新一次页面
      window.location.reload()
    }
  },
  mounted: function () {
    this.imgSrc = this.logoWhite;
    // 每次进入刷新页面
    //  监听（绑定）滚轮滚动事件
    window.addEventListener('scroll', this.handleScroll, true)
    let listQuery = {
      'sort': [
        {
          'id': {
            'order': 'asc'
          }
        }
      ]
    }
    // 页面加载的时候查询数据库
    this.$http.get('http://43.142.36.139:9220/assistance_type/_search?size=12',
      { params: { source: JSON.stringify(listQuery), source_content_type: 'application/json' } }).then(res => {
        console.log(res.data.hits.hits)
        this.typeList = res.data.hits.hits
        console.log(this.typeList)
      })

  },
  methods: {
    // 搜索按钮
    serch () {
      if (this.input != null) {
        alert('搜索')
      }
    },
    // 使用回车键进行搜索
    enterSerch () {
      document.onkeydown = function (e) {
        let that = this
        e = window.event || e
        // 使用回车键
        if (that.input != null && that.$route.path === '/localhost' && (e.code === 'Enter' || e.code === 'enter')) {
          // 登录事件
          that.serch()
        }
      }
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    GoToHomePage () {
      console.log(123);
      location.href = '#'
    },
    // 滚轮监听事件
    handleScroll: function () {
      // 获取当前滚轮的位置
      this.currentScroll = window.pageYOffset
      // 获取到需要显示的div
      let headerContainer = document.getElementsByClassName('headerContainer')[0];
      let rightLink = document.getElementsByClassName('a-font');
      console.log('rightLink', rightLink)
      // 判断当前滚轮所在位置控制div的隐藏和显示
      if (this.currentScroll > 18) {
        this.imgSrc = this.logo;
        headerContainer.style.cssText = `
        background-color:white;
        position: sticky;
        top:0;
        `
        Array.from(rightLink).forEach(item => {
          item.style.cssText = `
          color: black
          `
        });
      }
      if (this.currentScroll < 19) {
        this.imgSrc = this.logoWhite;
        headerContainer.style.cssText = `
        background-color:unset;
        `
        Array.from(rightLink).forEach(item => {
          item.style.cssText = `
          color: white
          `
        });
      }
    },
    destroyed: function () {
      //  离开页面清除（移除）滚轮滚动事件
      window.removeEventListener('scroll', this.handleScroll)
    },
    GoTop () {
      window.pageYOffset = 0
    },
    // 搜索按钮指针悬停
    mouseOver () {
      document.getElementById('search').style.backgroundColor = 'yellow'
      document.getElementById('searchFont').style.color = 'black'
    },
    // 搜索按钮指失焦
    mouseLeave () {
      document.getElementById('search').style.backgroundColor = '#409eff'
      document.getElementById('searchFont').style.color = 'white'
    },
    imgMouseOver (id) {
      document.getElementById(id).style.backgroundColor = '#f2f5f6'
    },
    imgMouseLeave (id) {
      document.getElementById(id).style.backgroundColor = 'white'
    },
    getImgSrc (path) {
      console.log('path', path);
      return 'http://cate.shast.cn/cate' + path
    }
  }
}
</script>

<style scoped>
@keyframes example {
  from {
    height: 85px
  }

  to {
    height: 70px
  }
}

.head {
  width: 100%;
  height: 50vh;
  background: #222 url(../assets/home_section_2.jpg);
  background-size: 100% 100%;
}

.head2 {
  float: left;
  width: 100%;
  height: 75px;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.main {
  /* width: 100%;
  height: 480px; */
  background-color: #eef3f7;
}

.main .container {
  width: 60vw;
  margin: 0px auto;
  overflow: hidden;
  padding: 6vh 0;
}

.main .container .item {
  width: 160px;
  height: 180px;
  float: left;
  padding: 20px;
}

.main .container .item .content {
  background-color: #fff;
  width: 180px;
  height: 200px;
  border-radius: 3px;
  text-align: center;
}

.main .container .item .content:hover {
  box-shadow: 0 10px 20px rgb(3 27 78 / 10%);
  cursor: pointer;
}

.foot {
  width: 100%;
  height: 150px;
  background-color: white;
}

.tail {
  width: 27%;
  height: 70px;
  /*border: 1px solid black;*/
  margin-top: 50px;
  margin-left: 1000px;
}

.headerContainer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 70px;
  z-index: 1000;
}

.backImg {
  /* width: 100%;
  height: 100%;
  background: rgba(34, 34, 34, 0.7);
  background-size: 100% 100%; */
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.search {
  margin-top: 10vh;
}

.search .btn {
  width: 105px;
  height: 50px;
  background-color: #3578fa;
  color: #fff;
  margin: -10px -21px;
  border-radius: 1px;
  border: 1px solid #3578fa;
  font-weight: 600;
}

.search .btn:hover {
  background-color: #FFC107;
  color: black;
  border: 1px solid #FFC107;
}

.search .tab_btn {
  height: 35px;
  width: 95px;
  background: none;
  color: white
}

.search .tab_btn:hover {
  background-color: #6c757d;
  border-color: #6c757d;
}


.HPLogo {
  cursor: pointer
    /* background: url("../assets/logo_white.png"); */
    /* width: 321px;
  background-size: 100%;
  width: 288px;
  height: 40px;
  margin-left: 260px;
  cursor: pointer; */
}

.rightLink a {
  margin-right: 20px;
  color: white;
  size: 15px;
}

.HPLogo2 {
  /* width: 321px;
  height: 50px;
  background: url("../assets/logo.png");
  background-size: 100%;
  width: 288px;
  height: 40px;
  margin-left: 260px;
  margin-top: 13px;
  cursor: pointer; */
}


.el-select {
  width: 130px;
}

.input-with-select {
  width: 30%;
  min-width: 500px;
}

.el-select .el-input {
  /* width: 130px; */
  /* height: 50px; */
}

/* .input-with-select .el-input-group__append {
  background-color: #3578fa;
  height: 48px;
  width: 120px;
  border: 1px solid #3578fa;
} */

.input-with-select .el-input-group__append {
  background-color: #3578fa;
  height: 48px;
  width: 120px;
  border: 1px solid #3578fa;
}

/* 
.input-with-select .el-input input {
  height: 145px;
} */

.typeInfo {
  /* width: 100%;
  height: 180px;
  float: left;
  border-radius: 3px;
  margin-top: 50px;
  background-color: white;
  box-shadow: 0 0 5px #8c939d;
  font-size: 13px; */
}
</style>
