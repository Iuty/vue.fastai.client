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
                    <el-select :disabled="serverRun"
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
                    <el-button>+</el-button>
                </el-col>
            </el-row>
            <el-row class="model-section">
                <el-col class="label" :span="4" :offset="1">
                    <a >模型：</a>
                </el-col>
                <el-col :span="12" :offset="1">
                    <el-select v-model="selectedtag"
                    placeholder="请选择模型"
                    :disabled="serverRun">
                        <el-option
                              v-for="item in tags"
                              :key="item"
                              :label="item"
                              :value="item">
                            </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button>+</el-button>
                </el-col>
            </el-row>
        </el-row>
        <br>
        <br>

        <el-divider content-position="left">训练模型：</el-divider>
        <el-row id="train-control">
            
            <el-col :span="6" :offset="16">
                <el-button type="danger" v-if="serverRun" icon="el-icon-video-pause" @click.native="stop">停止</el-button>
                <el-button type="primary" v-else icon="el-icon-video-play" @click.native="start">启动</el-button>
            </el-col>
        </el-row>
        <br>
        <br>


        <el-divider content-position="left">测试模型：</el-divider>
        <el-row id="test-directory">
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-input type="file" accept=".jpg" 
                    v-model="filePath" @change="pathChange"
                    :disabled="serverRun"></el-input>
                </el-col>
                
            </el-row>
            <el-row class="model-section">
                <el-col :span="4" :offset="2">
                    <el-checkbox v-model="checked"
                    :disabled="serverRun">目录测试</el-checkbox>
                </el-col>
                <el-col :span="6" :offset="10">
                    <el-button type="success" icon="el-icon-money" @click="testDirectory"
                    :disabled="serverRun">测试</el-button>
                </el-col>
            </el-row>
        </el-row>
        <br>
        <br>
        <br>
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
                server:"http://192.168.0.245:7738/api/nn/fastcnn",
                projects:[],
                selectedproject:"",
                tags:[],
                selectedtag:""
            }
        },
        mounted:function(){
            this.getStatus();
            this.getProjects();
        },
        computed:{
            ctrenabled:function(){
                return !this.serverRun;
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
                        _.selectedtag = "";
                    }
                });
            },
            pathChange:function(path){
                this.filePath = path
            },
            testDirectory:function(){
                alert(this.filePath)
            },
            start:function(){
                let _ = this;
                let settings =  {
                  "url": _.server,
                  "method": "POST",
                  "data": {
                    "cmd": "start",
                    "projectname": _.selectedproject,
                    "tag":_.selectdtag
                  }
                };
                $.ajax(settings).done(function(response){
                    if(response.success){
                        _.serverRun = response.status;
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
    
</style>
