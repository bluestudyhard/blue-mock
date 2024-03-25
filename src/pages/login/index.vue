<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import type { Rules } from 'async-validator'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { reactive, ref } from 'vue'
import userStore from '~/stores/user'

const store = userStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const email = ref('')
const form = reactive({
  username,
  password,
  email,
})

const rules: Rules = {
  // 规则在不输入时不生效，即文本框不输入时不会改变颜色
  username: [
    { required: true, message: 'Please input name' },
    { min: 3, max: 12, message: 'Length should be 3 to 12' },
  ],
  email: [
    { required: true, message: 'Please input email' },
    { type: 'email', message: 'Please input correct email' },
  ],
}
const { errorFields, pass } = useAsyncValidator(form, rules)
async function signup() {
  // 用户名和密码不能为空
  if (!username.value || !password.value) {
    ElMessage.error('用户名和密码不能为空')
    return
  }
  const res = await store.register(form)
  if (res.status === 202) {
    ElMessage.success('注册成功')
    router.replace('/')
  }

  else { ElMessage.error('注册失败') }
}

async function login() {
  // 用户名和密码不能为空
  if (!username.value || !password.value) {
    ElMessage.error('用户名和密码不能为空')
    return
  }
  const token = store.getToken()
  console.log(token)
  const res = await store.login({ username: username.value, password: password.value, token })
  console.log(res)
  if (res.status === 202) {
    ElMessage.success('登录成功')
    router.replace('/')
  }

  else { ElMessage.error('登录失败') }
}
</script>

<template>
  <div class="header">
    <div class="inner-header flex flex-col">
      <h1>Login Here</h1>
      <div class="user-login">
        <form>
          <div class="user-name">
            <input
              v-model="username"
              type="text"
              placeholder="Please input your name"
            >
            <label class="label" for="input">
              <span
                v-if="errorFields?.username?.length"
              >
                {{ errorFields?.username[0]?.message }}
              </span>
            </label>
          </div>
          <div class="user-name">
            <input
              v-model="email"
              type="text"
              placeholder="Please input your email"
            >
            <label class="label" for="input">
              <span
                v-if="errorFields?.email?.length"
              >
                {{ errorFields?.email[0]?.message }}
              </span>
            </label>
          </div>
          <div class="user-password">
            <input v-model="password" type="password" placeholder="Please input password">
          </div>

          <div flex-auto>
            <button type="button" @click="signup">
              <span>
                SignUp
              </span>
            </button>
            <button type="button" @click="login">
              <span>
                Login
              </span>
            </button>
            <span :class="pass ? 'correct' : ''">{{ pass }}</span>
          </div>
        </form>
      </div>
    </div>

    <!-- Waves Container -->
    <div>
      <svg
        class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
    <!-- Waves end -->
  </div>
  <!-- Header ends -->

  <!-- Content starts -->
  <div class="content flex">
    <p>melingblue </p>
  </div>
  <!-- Content ends -->
</template>

<style scoped lang="scss">
.user-login {
  width: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2rem;
  border-radius: 1rem;
  // box-shadow: 3px 2px 1rem 0px #dfe7ff;
  box-shadow:
    10px 10px 20px #dfe7fc75,
    -15px -15px 30px #ededed1e;

  background: #f1f3f9;
  backdrop-filter: blur(10px);
  // background: linear-gradient(315deg, #fafbff, #fefeff) background-blend-mode: normal, normal, screen, overlay, normal;

  form {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}

input {
  width: 18rem;
  padding: 1rem;
  border-radius: 10px;
  background: linear-gradient(315deg, #fafbff, #fefeff);
  border: none;
  outline: none;
  margin: 0.5rem;
  margin-bottom: 1rem;
  box-shadow:
    0px 2px 8px 1px #dde4f7,
    inset 0px -1px 1px #e3eaff;
}

.user-name {
  position: relative;

  .label {
    position: absolute;
    pointer-events: none;
    top: 0rem;
    left: 1rem;

    span {
      display: inline-block;
      font-size: 14px;
      min-width: 5px;
      color: transparent;
      background: none;
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 0.55);
    }
  }

  input:focus + label span {
    background: linear-gradient(135deg, #396af1 10%, #a665f6 90%);
    color: transparent;
    -webkit-background-clip: text;
    transform: translateY(-1rem);
  }
}

.user-password {
  position: relative;

  .label {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 1rem;

    > span {
      display: inline-block;
      font-size: 14px;
      min-width: 5px;
      color: transparent;
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 0.55);
    }
  }

  input:focus + label span {
    background: linear-gradient(135deg, #396af1 10%, #a665f6 90%);
    color: transparent;
    -webkit-background-clip: text;
    transform: translateY(-1rem);
  }
}

.password-check {
  display: flex;

  color: #525252;

  > span {
    border: 1px solid #dddada2a;
    box-shadow: 0 0 2px 1px #efeded2a;
    margin: 0.1rem;
    padding: 0.2rem;
    font-size: 12px;
    border-radius: 0.4rem;
  }

  transition: 0.8s all ease-in-out;
}

.border-red {
  border: 1px solid red;
}

.correct {
  color: #fff;
  background-color: #396af1;
  transition: all 0.3s ease-in-out;
}

button {
  position: relative;
  overflow: hidden;
  height: 2rem;
  width: 6rem;
  padding: 0rem 1rem;
  border-radius: 12px;
  background: #7dd9fd;
  margin-right: 1rem;
  color: #fff;
  border: none;

  span {
    position: relative;
    z-index: 1;
  }
}

button:hover::before {
  transform: scaleX(1);
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0 50%;
  width: 100%;
  height: inherit;
  border-radius: inherit;
  background-image: linear-gradient(135deg, #396af1 10%, #a665f6 90%);
  transition: all 0.475s;
}

h1 {
  font-family: 'Kalnia', serif;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 48px;
}

p {
  font-family: 'Kalnia', serif;
  letter-spacing: 1px;
  font-size: 14px;
  color: #333333;
}

.header {
  position: relative;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgba(84, 58, 183, 1) 0%,
    rgba(0, 172, 193, 1) 100%
  );
  color: white;
}

.inner-header {
  height: 65vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex {
  /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}

.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }

  .content {
    height: 30vh;
  }

  h1 {
    font-size: 24px;
  }
}
</style>
