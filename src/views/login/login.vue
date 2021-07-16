<template>
  <div class="login-wrapper">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="loginform"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item class="btn-formitem">
        <el-button type="primary" @click="submitForm"> 登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { adminLogin } from "network/login";
import { Message } from "element-ui";
export default {
  data() {
    // console.log("data",this);

    return {
      ruleForm: {
        name: "jjcc",
        password: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请先输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      let that = this;
      this.$refs.loginform.validate().then((valid) => {
        // console.log("验证", valid);
        if (valid) {
          adminLogin(that.ruleForm.name, that.ruleForm.password).then((da) => {
            // console.log("登录结果", da);
            if (da.errMsg == 0) {
              Message({
                showClose: true,
                message: "登录失败",
                type: "warning",
              });

              return;
            }
            sessionStorage.setItem("anglerName",da.anglerName);
           
            Message({
              showClose: true,
              message: "登录成功",
              type: "success",
            });
            setTimeout(()=>{
              that.$router.replace("/home/essay/talk");
            },2000);
          });
        }
      });
    },
  },
};
</script>

<style>
.demo-ruleForm {
  width: 50%;
  margin: 100px auto;
  border: 1px solid #eee;
  padding-top: 40px;
  padding-right: 60px;
}
.btn-formitem {
  margin-left: 42px;
}
</style>