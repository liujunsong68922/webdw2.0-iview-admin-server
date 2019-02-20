<template>
  <div>
    <Card>
      <h2>This is an Demo Page</h2>
      <Button @click="setdataobject">Set DataObject</Button>
      <Button @click="retrieve">Retrieve</Button>
      <Button @click="insert">Insert</Button>
      <Button @click="deleterow">Delete</Button>
      <Button @click="update">Update</Button>
    </Card>
    <Card>
      <div id='Picture2' width='600px' height='400px'>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { WebDWUIView } from './CWebDWUIView.js'
// import { setdataobject,retrieve} from '@/api/webdwapi.js'
export default {
  name: 'params',
  webdwui: null,
  methods: {
    ...mapMutations([
      'closeTag'
    ]),

    setdataobject () {
      /**
       * 调用CWebDWUI.setdataobject方法
       */
      alert('call setdataobject function')
      let webdwui = new WebDWUIView('Picture2')
      this.webdwui = webdwui
      console.log(webdwui)
      alert(webdwui)
      let token = ''
      let dwname = 'd_products'
      webdwui.SetDataObject(token, dwname)
    },

    retrieve () {
      /**
       * 调用CWebDWUI.setdataobject方法
       */
      alert('call retrieve function')
      let webdwui = new WebDWUIView('Picture2')
      this.webdwui = webdwui
      console.log(webdwui)
      alert(webdwui)
      let token = ''
      let dwname = 'd_products'
      let args = ''
      alert(dwname)
      console.log('begin call Promise.')
      webdwui.Retrieve(token, dwname, args)
    },

    insert () {
      /**
       * 调用CWebDWUI.setdataobject方法
       */
      alert('call insert function')
      // let webdwui = new WebDWUIView('Picture2')
      // console.log(webdwui)
      alert(this.webdwui)
      alert(this.webdwui.uuid)
      let token = ''
      let uuid = this.webdwui.uuid
      console.log('begin call Promise.')
      this.webdwui.Insert(token, uuid)
    },

    deleterow () {
      /**
       * 调用CWebDWUI.setdataobject方法
       */
      alert('call deleterow function')
      // let webdwui = new WebDWUIView('Picture2')
      // console.log(webdwui)
      alert(this.webdwui)
      alert(this.webdwui.uuid)
      let token = ''
      let uuid = this.webdwui.uuid
      console.log('begin call Promise.')
      this.webdwui.Delete(token, uuid)
    },

    update () {
      /**
       * 调用CWebDWUI.setdataobject方法
       */
      alert('call update function')
      // let webdwui = new WebDWUIView('Picture2')
      // console.log(webdwui)
      alert(this.webdwui)
      alert(this.webdwui.uuid)
      let token = ''
      let uuid = this.webdwui.uuid
      console.log('begin call Promise.')
      this.webdwui.Update(token, uuid)
    }
  }
}
</script>
