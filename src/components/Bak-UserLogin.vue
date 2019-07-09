<template>
    <v-dialog v-model="dialog" persistent max-width="300px">
        <template v-slot:activator="{ on }">
            <v-btn flat icon >
                <v-icon v-on="on">account_circle</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="title">用户登录</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                        prepend-icon="person"
                        name="login"
                        label="用户名"
                        type="text"
                        v-model="userName"
                        @keydown.enter="userLogin"
                    >
                    </v-text-field>
                    <v-text-field
                        prepend-icon="lock"
                        name="password"
                        label="密码"
                        id="password"
                        :type="show1 ? 'text' : 'password'"
                        counter="6"
                        v-model="password"
                        :append-icon="show1 ? 'visibility' : 'visibility_off'"
                        @click:append="show1 = !show1"
                        @keydown.enter="userLogin"
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="quit">取消</v-btn>
                <v-btn color="blue darken-1" flat @click="userLogin">确定</v-btn>
            </v-card-actions>
            <v-alert
              :value="alert"
              type="error"
            >
              {{ alertInfo }}
            </v-alert>
        </v-card>
    </v-dialog>
</template>

<script>
  const axios = require('axios');

    export default {
        name: "UserLogin",
        data () {
            return {
                show1: false,
                userName: '',
                password: undefined,
                dialog: false,
                rules: {
                  email: v => (v || '').match(/@/) || 'Please enter a valid email',
                  length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
                  password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
                    'Password must contain an upper case letter, a numeric character, and a special character',
                  required: v => !!v || 'This field is required'
                },
              alert: false,
              alertInfo: '',
              color: 'red',
              mode: '',
              timeout: 6000,
            }
        },


        methods: {
            userLogin: function () {
                axios.get('http://localhost:8081/login', {params: {
                    username: this.userName,
                    password: this.password,
                  }
                }).then(response => {
                    if (response.data === 0) {
                      this.dialog = false;
                      this.$store.dispatch('setUser', this.userName);
                      this.alert = false;

                    } else {
                      this.alert = true;
                      this.alertInfo = '用户验证失败！ 错误码: ' + response.data;
                    }
                }).catch(error => {
                  this.alert = true;
                  this.alertInfo = '用户验证失败，请稍后再试！ 错误: ' + error;
                });

            },
            quit: function () {
              // TODO: 应在显示页面时将用户名、密码栏位置空
              this.userName = '';
              this.password = '';
              this.alert = false;
              this.dialog = false;
            }
        }
    }
</script>

<style scoped>

</style>
