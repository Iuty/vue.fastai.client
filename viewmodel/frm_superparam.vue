<template>
	<el-dialog
	  title="调整超参数"
	  :visible.sync="visable"
	  width="20%"
	  :before-close="handleClose">
	  <span>
		  <el-divider content-position="center">批数量&学习率&训练步数</el-divider>
		  <el-row>
  			  <el-col :span="22" :offset="1">
  				  <el-col :span="7" class="label">
  					  batch size：
  				  </el-col>
  				  <el-col :span="15">
  					  <el-input placeholder="batch size" v-model="batch"></el-input>
  				  </el-col>
  			  </el-col>
		  </el-row>
		  <br>
		  <el-row>
   			  <el-col :span="22" :offset="1">
				  <el-col :span="7" class="label">
					  learn rate：
				  </el-col>
				  <el-col :span="15">
					<el-input placeholder="learn rate" v-model="learnrate"></el-input>
				  </el-col>
			  </el-col>
		  </el-row>
		  <br>
		  <el-row>
   			  <el-col :span="22" :offset="1">
				  <el-col :span="7" class="label">
  					  max epcho：
  				  </el-col>
  				  <el-col :span="15">
  					<el-input placeholder="max epcho" v-model="maxperiod"></el-input>
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
		name:"frm_superparam",
		data:function(){
			return {
				visable:false,
				batch:"",
				learnrate:"",
				maxperiod:""
			}
		},
		mounted:function(){
			this.getSuperParam()
		},
		computed:{
			commitforbid:function(){
				return this.batch.trim() == "" | this.learnrate.trim() == "" | this.maxperiod.trim() == ""
			}
		},
		methods:{
			show:function(){
				
				this.visable = true
			},
			getSuperParam:function(){
				let _ = this;
				let settings =  {
				  "url": "http://127.0.0.1:7738/api/nn/fastcnn",
				  "method": "POST",
				  "data": {
				    "cmd": "getSuperParam",
				    "projectname": "Lightning"
				  }
				};
				$.ajax(settings).done(function(response){
					if(response.success){
						_.batch = response.data.Batch;
						_.learnrate = response.data.LearnRate;
						_.maxperiod = response.data.MaxPeriod;
					}
				});
			}
		}
	}
</script>

<style>
</style>