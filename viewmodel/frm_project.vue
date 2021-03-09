<template>
	<el-dialog
	  title="新增项目"
	  :visible.sync="visable"
	  width="30%"
	  :before-close="handleClose">
	  <span>
		  <el-divider content-position="center">项目</el-divider>
		  <el-row>
			  <el-col :span="11" :offset="1">
				  <el-col :span="7" class="label">
					  项目名称：
				  </el-col>
				  <el-col :span="17">
					  <el-input placeholder="输入新项目名称" v-model="projectname"></el-input>
				  </el-col>
			  </el-col>
		  </el-row>
		  <el-divider content-position="center">数据集&预处理</el-divider>
		  <el-row>
			  <el-col :span="11" :offset="1">
				  <el-col :span="7" class = "label">
					  数据集：
				  </el-col>
				  <el-col :span="17">
					  <el-select placeholder="选择数据集类型" v-model="dataset.selected">
						  <el-option
						        v-for="item in dataset.source"
						        :key="item"
						        :label="item"
						        :value="item">
						  </el-option>
					  </el-select>
				  </el-col>
				  
			  </el-col>
			  <el-col :span="11" :offset="1">
			  	<el-col :span="7" class = "label">
			  		预处理：
			  	</el-col>
			  	<el-col :span="17">
			  		<el-select placeholder="选择预处理类型" v-model="preprocess.selected">
						<el-option
						      v-for="item in preprocess.source"
						      :key="item"
						      :label="item"
						      :value="item">
						</el-option>
					</el-select>
			  	</el-col>
			  				  
			  </el-col>
		  </el-row>
		  <el-divider content-position="center">模型&优化器&损失函数</el-divider>
		  <el-row>
		  	<el-col :span="11" :offset="1">
				<el-col :span="7" class = "label">
		  			模型：
		  		</el-col>
		  		<el-col :span="17">
		  			<el-select placeholder="选择模型类型" v-model="model.selected">
						<el-option
						      v-for="item in model.source"
						      :key="item"
						      :label="item"
						      :value="item">
						</el-option>
					</el-select>
		  		</el-col>
		  				  
		  	</el-col>
		  	<el-col :span="11" :offset="1">
		  		<el-col :span="7" class = "label">
		  			优化器：
		  		</el-col>
		  		<el-col :span="17">
					<el-select placeholder="选择优化器类型" v-model="ada.selected">
						<el-option
						      v-for="item in ada.source"
						      :key="item"
						      :label="item"
						      :value="item">
						</el-option>
					</el-select>
		  		</el-col>
		  			  				  
		    </el-col>
			<br>
			<br>
			<br>
			<el-col :span="11" :offset="1">
				<el-col :span="7" class = "label">
					损失函数：
				</el-col>
				<el-col :span="17">
					<el-select placeholder="选择损失函数" size="medium" v-model="loss.selected">
						<el-option
						      v-for="item in loss.source"
						      :key="item"
						      :label="item"
						      :value="item">
						</el-option>
					</el-select>
				</el-col>
					  				  
			</el-col>
		  </el-row>
	  </span>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="visable = false">取 消</el-button>
	    <el-button type="primary" @click="visable = false" :disabled="commitforbid">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	import $ from 'jquery'
	export default{
		name:"frm_projcet",
		data:function(){
			return {
				visable:false,
				projectname:"",
				dataset:{
					source:[],
					selected:""
				},
				model:{
					source:[],
					selected:""
				},
				ada:{
					source:[],
					selected:""
				},
				loss:{
					source:[],
					selected:""
				},
				preprocess:{
					source:["None"],
					selected:"None"
				}
			}
		},
		mounted:function(){
			this.getDatasetNames();
			this.getModelNames();
			this.getAdaNames();
			this.getLossNames();
		},
		methods:{
			show:function(){
				this.visable = true
			},
			
			getDatasetNames:function(){				
				let _ = this;
				let settings =  {
				  "url": "http://127.0.0.1:7738/api/nn/fastcnn",
				  "method": "POST",
				  "data": {
				    "cmd": "getDatasetNames"
				  }
				};
				$.ajax(settings).done(function(response){
					
					if(response.success){
						_.dataset.source = response.data
						if(_.dataset.selected == ""){
							_.dataset.selected = _.dataset.source[0];
						}
					}
				});
			},
			getModelNames:function(){
				let _ = this;
				let settings =  {
				  "url": "http://127.0.0.1:7738/api/nn/fastcnn",
				  "method": "POST",
				  "data": {
				    "cmd": "getModelNames"
				  }
				};
				$.ajax(settings).done(function(response){
					
					if(response.success){
						_.model.source = response.data
						if(_.model.selected == ""){
							_.model.selected = _.model.source[0];
						}
					}
				});
			},
			getAdaNames:function(){
				let _ = this;
				let settings =  {
				  "url": "http://127.0.0.1:7738/api/nn/fastcnn",
				  "method": "POST",
				  "data": {
				    "cmd": "getAdaNames"
				  }
				};
				$.ajax(settings).done(function(response){
					
					if(response.success){
						_.ada.source = response.data
						if(_.ada.selected == ""){
							_.ada.selected = _.ada.source[0];
						}
					}
				});
			},
			getLossNames:function(){
				let _ = this;
				let settings =  {
				  "url": "http://127.0.0.1:7738/api/nn/fastcnn",
				  "method": "POST",
				  "data": {
				    "cmd": "getLossNames"
				  }
				};
				$.ajax(settings).done(function(response){
					
					if(response.success){
						_.loss.source = response.data
						if(_.loss.selected == ""){
							_.loss.selected = _.loss.source[0];
						}
					}
				});
			},
		},
		computed:{
			commitforbid:function(){
				return this.projectname.trim() == "" | this.loss.selected == ""
			}
		}
	}
</script>

<style>
	.label{
		padding-top: 6px;
	}
</style>
