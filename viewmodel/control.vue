<template>
    <div id="controlpanel">
        <el-row id="title">
            <h2>法视特AI训练客户端</h2>
        </el-row>
        <br>
        <br>
        <el-divider content-position="left">选择模型：</el-divider>
        <el-row id="model-select">
            <el-row class="model-section">
                <el-col class="label" :span="4" :offset="1">
                    <a >项目：</a>
                </el-col>
                <el-col :span="12" :offset="1" >
                    <el-select :disabled="ctrlforbid"
                    v-model="selectedproject" @change="getProjectTags"
                    placeholder="请选择项目">
                        <el-option
                              v-for="item in projects"
                              :key="item"
                              :label="item"
                              :value="item">
                            </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button :disabled="ctrlforbid"
					icon="el-icon-plus"></el-button>
                </el-col>
            </el-row>
            <el-row class="model-section">
                <el-col class="label" :span="4" :offset="1">
                    <a >模型：</a>
                </el-col>
                <el-col :span="12" :offset="1">
                    <el-select v-model="selectedtag"
                    placeholder="请选择模型"
                    :disabled="ctrlforbid">
                        <el-option
                              v-for="item in tags"
                              :key="item"
                              :label="item"
                              :value="item">
                            </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button icon="el-icon-delete" :disabled="ctrlforbid"
					@click.native="clearTag"></el-button>
                </el-col>
            </el-row>
        </el-row>
        <br>
        <br>

        <el-divider content-position="left">训练模型：</el-divider>
        <el-row id="train-control">
            
            <el-col :span="6" :offset="16">
                <el-button type="danger" v-if="serverRun" icon="el-icon-video-pause" @click.native="stop">停止</el-button>
                <el-button type="primary" v-else icon="el-icon-video-play" @click.native="start" :disabled="ctrlforbid">启动</el-button>
            </el-col>
        </el-row>
        <br>
        <br>


        <el-divider content-position="left">测试模型：</el-divider>
        <el-row id="test-directory">
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-input type="text" accept=".bmp" 
					placeholder="粘贴文件/文件夹路径"
                    v-model="filePath" @change="pathChange"
                    :disabled="ctrlforbid"></el-input>
                </el-col>
                
            </el-row>
            <el-row class="model-section">
                <el-col :span="4" :offset="2">
                    <el-checkbox v-model="checked"
                    :disabled=true>单个文件测试</el-checkbox>
                </el-col>
                <el-col :span="6" :offset="10">
                    <el-button type="success" icon="el-icon-money" @click="testDirectory"
                    :disabled="testforbid">测试</el-button>
                </el-col>
            </el-row>
			
        </el-row>
		<br>
		<br>
		
		
		<el-divider content-position="left">同步模型：</el-divider>
		<el-row id="update-model">
		    
		    <el-row class="model-section">
		        
		        <el-col :span="6" :offset="16">
		            <el-button type="warning" icon="el-icon-document-copy" @click="updateModel"
		            :disabled="ctrlforbid">同步</el-button>
		        </el-col>
		    </el-row>
			
		</el-row>
        <br>
        <br>
        <br>
		<el-dialog
		  title="测试结果"
		  :visible.sync="resultVisible"
		  width="50%"
		  >
			  <span class="details">统计：{{details}}</span>
			  <br>
			  <br>
			  <br>
			  <span>
				  <el-col v-for="(d,i) in result">
					<el-col :span="20" class="path">{{i}}:</el-col>
					
				  	<el-col :span="4" class="rst">{{d}}</el-col>			
				  </el-col>
			  
			  </span>
			  <br>
			  <br>
			  <br>
		    <span>
		      <el-button @click="resultVisible = false">取 消</el-button>
		    </span>
		</el-dialog>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default{
        name:"controlpanel",
        data:function(){
            return {
                serverRun:false,
                filePath:"",
                server:"http://127.0.0.1:7738/api/nn/fastcnn",
                projects:[],
                selectedproject:"",
                tags:[],
                selectedtag:"",
				result:{},
				details:"",
				ctrling:false,
				resultVisible:false,
            }
        },
        mounted:function(){
            this.getStatus();
            this.getProjects();
        },
        computed:{
            ctrlforbid:function(){
                return this.serverRun | this.ctrling;
            },
			testforbid:function(){
				return this.ctrlforbid | this.selectedtag == "";
			}
        },
        methods:{
            getStatus:function(){
                let _ = this;
                let settings =  {
                  "url": _.server,
                  "method": "POST",
                  "data": {
                    "cmd": "status"
                  }
                };
                $.ajax(settings).done(function(response){
                    if(response.success){
                        _.serverRun = response.status;
                    }
                });
            },
            getProjects:function(){
                let _ = this;
                let settings =  {
                  "url": this.server,
                  "method": "POST",
                  "data": {
                    "cmd": "getProjectNames"
                  }
                };
                $.ajax(settings).done(function(response){
                    if(response.success){
                        _.projects = response.data;
                        if (_.selectedproject == ""){
                            if (_.projects.length > 0){
                                _.selectedproject = _.projects[0]
                                _.getProjectTags()
                            }
                        }
                    }
                });
            },
            
            getProjectTags:function(){
                let _ = this;
                let settings =  {
                  "url": _.server,
                  "method": "POST",
                  "data": {
                    "cmd": "getProjectTags",
                    "projectname": _.selectedproject
                  }
                };
                $.ajax(settings).done(function(response){
                    if(response.success){
                        _.tags = response.data;
                        //_.selectedtag = "";
                    }
                });
            },
			clearTag:function(){
				this.selectedtag = "";
			},
            pathChange:function(path){
                this.filePath = path
				
				
            },
            testDirectory:function(){
                let _ = this;
				_.ctrling = true;
				let isfile = "False";
				if (_.checked){
					isfile = "True";
				}
                let settings =  {
                  "url": "http://127.0.0.1:7738/api/nn/fastcnn",
                  "method": "POST",
                  "data": {
                    "path": _.filePath,
                    "cmd": "testPictures",
                    "isfile": isfile,
                    "projectname": _.selectedproject,
                    "tag": _.selectedtag,
                  }
                };
                $.ajax(settings).done(function(response){
					_.ctrling = false
					
					if(response.success){
						
						_.result = response.data
						_.details = JSON.stringify(response.details)
						_.resultVisible = true
					}
                });
            },
            start:function(){
                let _ = this;
                let settings =  {
                  "url": _.server,
                  "method": "POST",
                  "data": {
                    "cmd": "start",
                    "projectname": _.selectedproject,
                    "tag":_.selectedtag
                  }
                };
                $.ajax(settings).done(function(response){
                    if(response.success){
                        _.serverRun = response.status;
						_.getProjectTags()
                    }
                });
            },
            stop:function(){
                let _ = this;
                let settings =  {
                  "url": _.server,
                  "method": "POST",
                  "data": {
                    "cmd": "stop"
                  }
                };
                $.ajax(settings).done(function(response){
                    if(response.success){
                        _.serverRun = response.status
                    }
                });
            }
        }
    }
</script>

<style>
    #controlpanel{
        background-color: #eee;
		
    }
    .label{
        padding-top: 8px;
        font-weight: 700;
        font-size: 16px;
    }
    .model-section{
        padding-top: 6px;
    }
	.details{
		color:seagreen;
	}
    .path{
		color:darkblue;
	}
	.rst{
		color:orange;
	}
</style>
