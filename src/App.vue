<template>
  <div id="app">
    <el-row>
    <el-col :span="frameSpan">
        <iframe id="frame" frameborder=0 src="http://www.baidu.com" :style="{width:frameWidth,height:frameHeight,marginWidth:frameWidth}"></iframe>
    </el-col>
    
    <el-col :span="controlSpan">
        <el-row>
            <el-col class="controlSwitch">
                <el-switch
                  v-model="showControl"
                  active-color="#13ce66"
                  inactive-color="#4949ff">
                </el-switch>
            </el-col>
        </el-row>
        <el-row>
        <controlpanel v-show="showControl"></controlpanel>
        </el-row>
    </el-col>
    </el-row>
  </div>
</template>

<script>

import controlpanel from "../viewmodel/control.vue"
export default {
  name: 'app',
  components: {
    controlpanel
  },
  computed:{
      frameHeight:function(){
          return window.innerHeight+"px"
      },
      frameWidth:function(){
          let w = window.innerWidth * 23/24
          if(this.showControl){
              w *= 0.8;
          }
          return w+"px"
      },
      frameSpan:function(){
          let s = 23
          if(this.showControl){
              s = 18
          }
          return s
      },
      controlSpan:function(){
          let s = 1
          if(this.showControl){
              s = 6
          }
          return s
      }
  },
  data:function(){
      return {
          showControl:false,
          
          
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  padding-top: 30px;
}
#show{
    z-index:1;
    
}
.controlSwitch{
    text-align:end;
}
body{
    height: 100%;
}
</style>
