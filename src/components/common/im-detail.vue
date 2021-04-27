<template>
<el-dialog :title="condition.userProfile.nick||condition.toAccount" :visible.sync="showDialogStatus"
    v-dialogDrag="true" width="800px"
  class="tm-b-footer-im-detail-com">

          <ul class="im-box" @scroll="onScroll" v-loading="dataLoadingStatus" ref="messageList">
            <li class="more" :class="{'no-more':condition.isCompleted}" @click="getMoreMessageList">
              <span v-if="condition.isCompleted">没有更多了</span>
              <span v-else>查看更多</span>
            </li>
            <li :class="{'left':condition.toAccount==item.from,'right':condition.toAccount!=item.from,'msg-last':index==messageList.length-1}"
            v-for="(item,index) in messageList" :key="item.ID">
              <div class="user-img">
                <!-- <i class="el-icon-user-solid"></i> -->
                <img style="border-radius: 50%;" v-if="condition.toAccount==item.from" :src="(item.avatar||condition.userProfile.avatar)||'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-2.png'" alt="对方头像">
                <img style="border-radius: 50%;" v-else :src="item.avatar||'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-2.png'" alt="我方头像">
              </div>
              <div class="user-msg">
                <div class="msg">
                  <span class="unread" v-if="condition.toAccount!=item.from">
                    {{item.isRead?'已读':'未读'}}
                  </span>
                  <!-- {{item.type}} -->
                  <p class="text-box" v-if="item.type=='TIMTextElem'">
                    <template v-for="(_item,_index) in decodeText(item.payload)">
                      <span :key="_index" v-if="_item.name=='text'">
                        <em v-if="checkHtml(_item.text)" v-html="decodeURIComponent(_item.text)"></em>
                        <template v-else>{{_item.text}}</template>
                      </span>
                      <img v-else-if="_item.name === 'img'" :src="_item.src"
                      width="20px" height="20px" :key="_index"/>
                    </template>
                  </p>
                  <template v-else-if="item.type=='TIMImageElem'">
                    <template v-for="(_item,index) in item.payload.imageInfoArray" >
                      <!-- <img v-if="index<1" :src="_item.imageUrl" :key="_item.instanceID"> -->
                      <!-- :style="`width: ${_item.width}px; height: ${_item.height}px`" -->
                        <el-image @load="onImageLoaded" v-if="index<1" :key="_item.instanceID"
                          :src="_item.imageUrl"
                          :preview-src-list="imageList">
                        </el-image>
                    </template>
                  </template>
                  <template v-else-if="item.type=='TIMFileElem'">
                    <div class="file-box" @click="downloadFile(item.payload.fileUrl,item.payload.fileName)">
                      <i class="el-icon-document"></i>
                      <p>
                        {{item.payload.fileName}}
                        <small>{{getFileSize(item.payload.fileSize)}}</small>
                      </p>
                    </div>
                  </template>
                  <template v-else-if="item.type=='TIMVideoElem'">
                    <video
                      :src="item.payload.videoUrl"
                      controls
                      class="video"
                      @error="videoError"
                    ></video>
                  </template>
                </div>
                <div class="time">
                  <!-- {{item.nick||item.from}}   -->
                {{item.time|$dateFormat}}</div>
              </div>
            </li>

          </ul>
          <div v-show="isShowScrollButtomTips" class="new-msg-tips" @click="scrollMessageListToButtom">回到最新位置</div>
          <div class="toolbar" :style="focus ? {'backgroundColor': 'white'} : {}">
            <el-popover popper-class="emojis-el-popover" ref="popover" placement="top" width="400" trigger="hover">
              <div class="emojis">
                <div v-for="item in emojiName" class="emoji" :key="item" @click="chooseEmojiEvent(item)">
                  <img :src="emojiUrl + emojiMap[item]" style="width:30px;height:30px" />
                </div>
              </div>
            </el-popover>
            <span v-popover:popover>
              <svg class="icon" title="发表情" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1901"><path d="M401.2 424.281c0-48.799-39.525-88.318-88.318-88.318-48.797 0-88.322 39.574-88.322 88.318 0 48.742 39.579 88.321 88.322 88.321C361.62 512.602 401.2 473.078 401.2 424.281L401.2 424.281zM312.882 482.297c-32.015 0-57.961-26.002-57.961-58.016 0-32.016 25.946-57.958 57.961-57.958s58.012 25.942 58.012 57.958C370.894 456.294 344.897 482.297 312.882 482.297L312.882 482.297zM511.602 71C267.727 71 70 268.727 70 512.602c0 243.871 197.727 441.598 441.602 441.598 243.817 0 441.598-197.727 441.598-441.598C953.199 268.727 755.473 71 511.602 71L511.602 71zM511.602 909.542c-219.255 0-396.943-177.69-396.943-396.94 0-219.2 177.743-396.943 396.943-396.943 219.25 0 396.94 177.743 396.94 396.943C908.542 731.912 730.912 909.542 511.602 909.542L511.602 909.542zM710.322 578.893c-19.432-4.193-26.221 22.028-26.221 22.028-10.879 85.727-83.905 151.909-172.5 151.909-32.899 0-63.314-9.605-89.589-25.445-8.17-7.897-33.785-20.262-42.893-16.063-25.336 11.754-6.347 39.023-6.347 39.023 37.979 30.691 86.166 49.349 138.83 49.349 111.114 0 202.746-82.136 218.203-188.895C731.24 609.199 732.841 583.645 710.322 578.893L710.322 578.893zM599.919 468.495l176.696 0 0-44.214L599.919 424.281 599.919 468.495 599.919 468.495zM599.919 468.495" p-id="1902"></path></svg>
            </span>
            <i class="icon el-icon-picture" @click="handleSendImageClick"></i>
          </div>
          <el-input :style="focus ? {'backgroundColor': 'white'} : {}"
          v-model="condition.msg" type="textarea"
          @focus="focus = true"
          @blur="focus = false"
          @keydown.enter.exact.native.prevent="handleEnter"
          @keyup.ctrl.enter.prevent.exact="handleLine"
          ></el-input>
          <el-tooltip
            popper-class="msg-tooltip"
            effect="dark"
            content="按Enter发送消息，Ctrl+Enter换行"
            placement="top-start"
          >
          <span>
            <i class="el-icon-s-promotion" @click="sendMessageEvent"></i>
          </span>
          </el-tooltip>
          <input
      type="file"
      id="imagePicker"
      ref="imagePicker"
      accept=".jpg, .jpeg, .png, .gif"
      @change="sendImage"
      style="display:none"
    />
    <input type="file" id="filePicker" ref="filePicker" @change="sendFile" style="display:none" />
    <input type="file" id="videoPicker" ref="videoPicker" @change="sendVideo" style="display:none" accept=".mp4"/>
</el-dialog>
</template>

<script>
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import tmCommon from '@/common/common'
// import { Constants } from '@/common/env'
import TIM from 'tim-js-sdk'
import { emojiMap, emojiName, emojiUrl } from '@/common/emojiMap'
import { decodeText } from '@/common/decodeText'
// eslint-disable-next-line no-undef
const { mapGetters, mapMutations, mapActions } = Vuex

export default {
  name: 'tm-b-footer-clean-detail-com',
  data () {
    return {
      showDialogStatus: false,
      dataLoadingStatus: true,
      isShowScrollButtomTips: false,
      preScrollHeight: 0,
      // detail: {},
      focus: false,
      condition: {
        userProfile: {
          nick: ''
        },
        msg: '',
        toAccount: '',
        conversationID: '',
        nextReqMessageID: '',
        isCompleted: false,
        msgCount: 15
      },
      messageList: [],
      conversationType: TIM.TYPES.CONV_C2C, // （端到端会话）
      emojiMap,
      emojiName,
      emojiUrl,
      decodeText
    }
  },
  mounted () {
    // this.init()
  },
  computed: {
    ...mapGetters({
    }),
    imageList () {
      const { messageList = [] } = this
      const imageList = []
      messageList.forEach(item => {
        const { type = '', payload = {} } = item || {}
        if (type === 'TIMImageElem') {
          const { imageInfoArray = [] } = payload || {}
          const [image = {}] = imageInfoArray || []
          const { imageUrl = '' } = image || {}
          imageList.push(imageUrl)
        }
      })
      return imageList
    }
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      // roomstateApplyCleanInfoAction: 'roomstateApplyCleanInfo'
    }),
    getFileSize (size) {
      if (size > 1024) {
        if (size / 1024 > 1024) {
          return `${this.$toBig(size / 1024 / 1024, 2)} Mb`
        }
        return `${this.$toBig(size / 1024, 2)} Kb`
      }
      return `${this.$toBig(size, 2)}B`
    },
    downloadFile (fileUrl, fileName) {
      tmCommon.downloadFile(fileUrl, fileName)
    },
    checkHtml (htmlStr) {
      const reg = /<[^>]+>/g
      return reg.test(decodeURIComponent(htmlStr))
    },
    sendMessageEvent () {
      const { $vm } = window
      const { tim } = $vm
      const { condition, conversationType = '' } = this
      let { msg = '', toAccount = '' } = condition
      if (
        msg === '' ||
        msg.trim().length === 0
      ) {
        msg = ''
        this.$$msgInfo('不能发送空消息哦！')
        return
      }
      const message = tim.createTextMessage({
        to: toAccount,
        conversationType: conversationType,
        payload: { text: msg }
      })
      // this.$store.commit('pushCurrentMessageList', message)
      this.messageList.push(message)
      this.scrollMessageListToButtom()
      // this.$bus.$emit('scroll-bottom')
      tim.sendMessage(message).catch(err => {
        const { message = '' } = err || {}
        this.$$msgError(message)
      })
      condition.msg = ''
    },
    chooseEmojiEvent (item) {
      const { condition } = this
      condition.msg += item
    },
    handleSendImageClick () {
      this.$refs.imagePicker.click()
    },
    handleSendFileClick () {
      this.$refs.filePicker.click()
    },
    handleSendVideoClick () {
      this.$refs.videoPicker.click()
    },
    handleEnter () {
      this.sendMessageEvent()
    },
    handleLine () {
      const { condition } = this
      condition.msg += '\n'
    },
    getMessageList () {
      const { $vm } = window
      const { tim } = $vm
      const { condition } = this
      const { conversationID = '', msgCount: count = 15 } = condition
      // 打开某个会话时，第一次拉取消息列表
      const promise = tim.getMessageList({ conversationID, count })
      promise.then((imResponse) => {
        const { data = {} } = imResponse || {}
        const { messageList = [], nextReqMessageID = '', isCompleted = false } = data || {}
        this.messageList = messageList // 消息列表。
        tmCommon.log('获取到的消息列表', messageList)
        this.scrollToBottom()
        condition.nextReqMessageID = nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
        condition.isCompleted = isCompleted // 表示是否已经拉完所有消息。
        this.dataLoadingStatus = false
      }).catch(err => {
        tmCommon.error(err)
        this.dataLoadingStatus = false
      })
    },
    scrollToBottom () {
      this.$nextTick(() => {
        const msgObj = document.querySelector('.msg-last')
          msgObj?.scrollIntoViewIfNeeded()
      })
    },
    // 下拉查看更多消息
    getMoreMessageList () {
      const { $vm } = window
      const { tim } = $vm
      const { condition } = this
      const { conversationID = '', msgCount: count = 15, nextReqMessageID = '' } = condition
      // 打开某个会话时，第一次拉取消息列表
      const promise = tim.getMessageList({ conversationID, nextReqMessageID, count })

      this.dataLoadingStatus = true
      promise.then((imResponse) => {
        const { data = {} } = imResponse || {}
        const { messageList = [], nextReqMessageID = '', isCompleted = false } = data || {}
        this.messageList = [...messageList, ...this.messageList] // 消息列表。
        condition.nextReqMessageID = nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
        condition.isCompleted = isCompleted // 表示是否已经拉完所有消息。
        this.dataLoadingStatus = false
      }).catch(err => {
        tmCommon.error(err)
        this.dataLoadingStatus = false
      })
    },

    sendImage () {
      const { $vm } = window
      const { tim } = $vm
      const { condition, conversationType = '' } = this
      const { toAccount = '' } = condition
      const message = tim.createImageMessage({
        to: toAccount,
        conversationType: conversationType,
        payload: {
          file: document.getElementById('imagePicker') // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
        }
      })
      // this.$store.commit('pushCurrentMessageList', message)
      this.messageList.push(message)
      tim
        .sendMessage(message)
        .then(() => {
          this.$refs.imagePicker.value = null
        })
        .catch(imError => {
          const { message = '' } = imError || {}
          this.$$msgError(message)
        })
    },
    sendFile () {
      const { $vm } = window
      const { tim } = $vm
      const { condition, conversationType = '' } = this
      const { toAccount = '' } = condition
      const message = tim.createFileMessage({
        to: toAccount,
        conversationType: conversationType,
        payload: {
          file: document.getElementById('filePicker') // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
        }
      })
      // this.$store.commit('pushCurrentMessageList', message)
      tim
        .sendMessage(message)
        .then(() => {
          this.$refs.filePicker.value = null
        })
        .catch(imError => {
          const { message = '' } = imError || {}
          this.$$msgError(message)
        })
    },
    sendVideo () {
      const { $vm } = window
      const { tim } = $vm
      const { condition, conversationType = '' } = this
      const { toAccount = '' } = condition
      const message = tim.createVideoMessage({
        to: toAccount,
        conversationType: conversationType,
        payload: {
          file: document.getElementById('videoPicker') // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
        }
      })
      // this.$store.commit('pushCurrentMessageList', message)
      tim
        .sendMessage(message)
        .then(() => {
          this.$refs.videoPicker.value = null
        })
        .catch(imError => {
          const { message = '' } = imError || {}
          this.$$msgError(message)
        })
    },
    show (item = {}) {
      // console.log('item===============', item)
      const { condition } = this
      const { toAccount = '', conversationID = '', userProfile = {} } = item
      this.dataLoadingStatus = true
      condition.toAccount = toAccount
      condition.conversationID = conversationID
      condition.userProfile = userProfile
      // this.roomstateApplyCleanInfoFunc((detail = {}) => {
      //   this.detail = detail || {}
      //   this.$emit('success')
      // })
      this.getMessageList()
      this.setMessageRead()
      this.showDialogStatus = true
    },
    // 设置消息为已读
    setMessageRead () {
      const { $vm } = window
      const { tim } = $vm
      const { condition } = this
      const { conversationID = '' } = condition
      tim.setMessageRead({ conversationID })
    },
    pushMessageList (messageList) {
      const { condition } = this
      const { conversationID = '' } = condition
      messageList.forEach(item => {
        const { conversationID: _conversationID = '' } = item || {}
        if (_conversationID === conversationID) {
          this.messageList.push(item)
        }
      })
      this.setMessageRead()
      this.keepMessageListOnButtom()
      // this.scrollToBottom()
    },

    onScroll ({ target: { scrollTop } }) {
      const messageListNode = this.$refs.messageList
      if (!messageListNode) {
        return
      }
      if (this.preScrollHeight - messageListNode.clientHeight - scrollTop < 20) {
        this.isShowScrollButtomTips = false
      }
    },
    // 如果滚到底部就保持在底部，否则提示是否要滚到底部
    keepMessageListOnButtom () {
      const messageListNode = this.$refs.messageList
      if (!messageListNode) {
        return
      }
      // 距离底部20px内强制滚到底部,否则提示有新消息
      if (this.preScrollHeight - messageListNode.clientHeight - messageListNode.scrollTop < 20) {
        this.$nextTick(() => {
          messageListNode.scrollTop = messageListNode.scrollHeight
        })
        this.isShowScrollButtomTips = false
      } else {
        this.isShowScrollButtomTips = true
      }
      this.preScrollHeight = messageListNode.scrollHeight
    },
    // 直接滚到底部
    scrollMessageListToButtom () {
      this.$nextTick(() => {
        const messageListNode = this.$refs.messageList
        if (!messageListNode) {
          return
        }
        messageListNode.scrollTop = messageListNode.scrollHeight
        this.preScrollHeight = messageListNode.scrollHeight
        this.isShowScrollButtomTips = false
      })
    },
    // showMore() {
    //   this.showConversationProfile = !this.showConversationProfile
    // },
    onImageLoaded () {
      this.keepMessageListOnButtom()
    },
    closeEvent () {
      this.showDialogStatus = false
    }
  }
}
</script>
<style lang="less">
@import "../../../../assets/less/components/businesses/roomStatus/realTime/im.detail.less";
</style>
