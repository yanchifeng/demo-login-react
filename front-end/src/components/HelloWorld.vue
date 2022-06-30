<template>
  <el-form class="my-form" :model="form" label-width="120px">
    <el-form-item label="Name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="form.password" />
    </el-form-item>
    <el-form-item label="verifyCode">
      <el-input type="code" v-model="form.code" />
      <div class="svg-box" v-html="svgCaptcha" @click="getVerify"></div>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit(form)">Login</el-button>
      <el-button>Registry</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from '../axios'
import {jsEncrypt} from '../jsencrypt'

export default {
  name: 'HelloWord',
  data() {
    return {
      // svgCaptcha: null,
    }
  },
  mounted() {
    this.getVerify();
  },
  setup() {
    const svgCaptcha = ref('');
    const form = reactive({
        name: '',
        password: '',
        code: '',
        keyId: ''
    })
    const getVerify = () => {
      axios({
        method: 'post',
        url: 'http://localhost:3001/api/verify',
        data: {}
      }).then((res) => {
        console.log(res)
        svgCaptcha.value = res.data.data.captcha.replace('\\','');
        form.keyId = res.data.data.keyId;
      });
    }
    // do not use same name with ref
    // const form = reactive({
      
    // })
    const onSubmit = (val) => {
      console.log(val, 'submit!')
      axios({
        method: 'post',
        url: 'http://localhost:3001/api/login',
        data: {
          ...val,
          password: jsEncrypt(val.password)
        }
      }).then((res) => {
        console.log(res)
        svgCaptcha.value = res.data.data.captcha.replace('\\','');
        form.keyId = res.data.data.keyId;
      });
    }
    return {
      getVerify, onSubmit, svgCaptcha, form
    }
  }
}
</script>

<style scoped>
.my-form  {
  width: 300px;
}
.svg-box {
  display: inline-block;
}
</style>
