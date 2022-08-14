<template>
  <div class="app">
    <el-backtop :bottom="100">
      <div style="{
        height: 100%;
        width: 100%;
        border-radius: 20px;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #8cc5ff;
      }">
        <b>↑</b>
      </div>
    </el-backtop>
    <div class="head">
      <div class="backImg">
        <br>
        <div style="float: left;width:100%;height: 48px;">
          <div class="HPLogo" @click="GoToHomePage()"></div>
          <div style="width:500px;margin-top: -25px;margin-left: 60%">
            <a href="#" style="text-decoration: none">
              <font style="color: white;size: 15px">主页/home</font>
            </a>&nbsp;&nbsp;&nbsp;
            <a href="#/product" style="text-decoration: none">
              <font style="color: white;size: 15px">辅具产品/product</font>
            </a>&nbsp;&nbsp;&nbsp;
            <a href="#" style="text-decoration: none">
              <font style="color: white;size: 15px">申请加入/join</font>
            </a>&nbsp;&nbsp;&nbsp;
          </div>
          <div id="head2"
            style="float: left;width:100%;height: 60px;background-color: white;display: none;position: fixed;top: 0;z-index: 100;">
            <div class="HPLogo2" @click="GoToHomePage()"></div>
            <div style="width:500px;margin-top: -25px;margin-left: 60%">
              <a href="#" style="text-decoration: none">
                <font style="color: black;size: 15px">主页/home</font>
              </a>&nbsp;&nbsp;&nbsp;
              <a href="#/product" style="text-decoration: none">
                <font style="color: black;size: 15px">辅具产品/product</font>
              </a>&nbsp;&nbsp;&nbsp;
              <a href="#" style="text-decoration: none">
                <font style="color: black;size: 15px">申请加入/join</font>
              </a>&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
        <div class="search" align="center">
          <div>
            <el-input v-model="input" style="width: 470px;" class="input-with-select" type="text"
              @keyup.enter.native="enterSerch()">
              <el-button slot="append" style="height: 40px;width: 100px;margin-right: -21px" @click="serch()"
                @mouseover.native="mouseOver" @mouseleave.native="mouseLeave" id="search">
                <font style="color: white" size="2px" id="searchFont">搜索</font>
              </el-button>
            </el-input>
          </div>
          <br>
          <el-button style="height: 35px;width: 95px; background:none;color: white" id="btn1">辅助器具</el-button>
          <el-button style="height: 35px;width: 95px; background:none;color: white" id="btn2">辅助企业</el-button>
          <el-button style="height: 35px;width: 95px; background:none;color: white" id="btn3">服务机构</el-button>
          <el-button style="height: 35px;width: 95px; background:none;color: white" id="btn4">信息资讯</el-button>
        </div>
      </div>
    </div>
    <div class="body" align="center">
      <el-row :gutter="20" style="width: 70%;">
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
      </el-row>
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
      typeList: []
    }
  },
  watch: {
    $route (to, from) {
      // 监测到路由发生跳转时刷新一次页面
      window.location.reload()
    }
  },
  mounted: function () {
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
      location.href = '#'
    },
    // 滚轮监听事件
    handleScroll: function () {
      // 获取当前滚轮的位置
      this.currentScroll = window.pageYOffset
      // 获取到需要显示的div
      let scrollObj = document.getElementById('head2')
      // 判断当前滚轮所在位置控制div的隐藏和显示
      if (this.currentScroll > 18) {
        scrollObj.style.display = 'block'
      }
      if (this.currentScroll < 19) {
        scrollObj.style.display = 'none'
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
    }
  }
}
</script>

<style scoped>
.head {
  width: 100%;
  height: 480px;
  border: 0px solid black;
  background: url("../assets/home_section_2.jpg");
  background-size: 100% 100%;
}

.body {
  width: 100%;
  height: 480px;
  background-color: #eef3f7;
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

.backImg {
  width: 100%;
  height: 100%;
  /*透明度，首页图片变暗*/
  background: rgba(34, 34, 34, 0.7);
  background-size: 100% 100%;
}

.HPLogo {
  width: 321px;
  height: 45px;
  background: url("../assets/logo_white.png");
  background-size: 100%;
  width: 288px;
  height: 40px;
  margin-left: 260px;
  cursor: pointer;
}

.HPLogo2 {
  width: 321px;
  height: 50px;
  background: url("../assets/logo.png");
  background-size: 100%;
  width: 288px;
  height: 40px;
  margin-left: 260px;
  margin-top: 13px;
  cursor: pointer;
}

.search {
  width: 100%;
  height: 300px;
  margin-top: 170px;
  align: center;
}

.el-select {
  width: 130px;
}

.input-with-select .el-input-group__append button {
  background-color: #409eff;
}

.input-with-select .el-input input {
  height: 145px;
}

.typeInfo {
  width: 100%;
  height: 180px;
  float: left;
  border-radius: 3px;
  margin-top: 50px;
  background-color: white;
  box-shadow: 0 0 5px #8c939d;
  font-size: 13px;
}
</style>
