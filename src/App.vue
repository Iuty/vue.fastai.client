<template>
  <div id="app">
    <el-row>
    <el-col :span="frameSpan">
        
		<img v-show="showImg" 
		src="./assets/background.jpg" 
		class="background"
		:style="{width:frameWidth,height:frameHeight,marginWidth:frameWidth}"></img>
        <iframe id="frame" frameborder=0 v-show="showBoard"
        src="http://localhost:6006" 
        :style="{width:frameWidth,height:frameHeight,marginWidth:frameWidth}"
        ></iframe>
	</el-col>
    
    <el-col :span="controlSpan" id="ai-control">
		<el-row>
			<el-col :span="6">
				<img src="./assets/logo.png" style="{width: 80px;height: 80px;}"></img>
			</el-col>
		</el-row>
        <el-row>
            <el-col class="controlSwitch">
                <el-switch
                  v-model="showControl"
				  :width="50"
                  active-color="#13ce66"
                  inactive-color="#4949ff">
                </el-switch>
            </el-col>
        </el-row>
        <el-row>
        <controlpanel v-show="showControl" @showTensorboard="onShowTensorboard"></controlpanel>
        </el-row>
		<el-row>
			<testresult :result="testreturn"></testresult>
		</el-row>
    </el-col>
    </el-row>
  </div>
</template>

<script>

import controlpanel from "../viewmodel/control.vue"
import testresult from"../viewmodel/testresult.vue"
export default {
  name: 'app',
  components: {
    controlpanel,
	testresult
  },
  computed:{
      frameHeight:function(){
          return window.innerHeight+"px"
      },
      frameWidth:function(){
          let w = window.innerWidth 
          if(this.showControl){
              w *= 0.8;
          }
          return w+"px"
      },
      frameSpan:function(){
          let s = 23
          if(this.showControl){
              s = 20
          }
          return s
      },
      controlSpan:function(){
          let s = 1
          if(this.showControl){
              s = 4
          }
          return s
      }
  },
  data:function(){
      return {
          showControl:false,
          showImg:true,
		  showBoard:false
          
      }
  },
  methods:{
	  onShowTensorboard:function(bshow){
		  this.showImg = !bshow;
		  this.showBoard=bshow;
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
  
}

#show{
    z-index:1;
    
}
.background{
	
}
.controlSwitch{
    text-align:end;
}
#ai-control{
	padding-top: 10px;
}
body{
    height: 100%;
}
</style>
